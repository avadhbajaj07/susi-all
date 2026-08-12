import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { renderSusiEmailTemplate } from "@/lib/email-template";
import { generateInvoicePdfBuffer } from "@/lib/pdf-generator";

// In-memory invoice fallback store in case Supabase credentials are unavailable locally
let fallbackInvoices: any[] = [];

export async function GET() {
  try {
    const supabase = getSupabase();
    if (supabase) {
      const { data, error } = await supabase
        .from("invoices")
        .select(`
          *,
          items:invoice_items(*)
        `)
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        const formatted = data.map((inv: any) => ({
          id: inv.invoice_number || inv.id,
          number: inv.invoice_number,
          clientName: inv.client_name || "Valued Client",
          clientEmail: inv.client_email || "",
          issued: inv.issue_date,
          due: inv.due_date,
          status: inv.status || "Due",
          total: Number(inv.total || 0),
          emailSent: inv.email_sent || false,
          paymentNotice: "Payment due within 14 days via TWINT (+41 79 854 97 52) or IBAN.",
          items: inv.items?.map((it: any) => ({
            desc: it.description,
            qty: Number(it.quantity || 1),
            rate: Number(it.unit_price || 0),
            amount: Number(it.amount || 0),
          })) || [{ desc: "Studio Session", qty: 1, rate: Number(inv.total || 0), amount: Number(inv.total || 0) }],
        }));
        return NextResponse.json({ invoices: formatted });
      }
    }
  } catch (err) {
    console.error("GET /api/invoices error:", err);
  }

  return NextResponse.json({ invoices: fallbackInvoices });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, invoice } = body;

    // Action 1: Send Invoice via Resend Email with Official PDF Attachment
    if (action === "send-email" && invoice) {
      const apiKey = process.env.RESEND_API_KEY;
      if (!apiKey) {
        return NextResponse.json({ error: "RESEND_API_KEY environment variable is missing" }, { status: 500 });
      }
      const recipient = invoice.clientEmail || invoice.client || invoice.email;

      if (!recipient) {
        return NextResponse.json({ error: "Recipient email address is missing." }, { status: 400 });
      }

      // Render Email HTML Body Content
      const itemsHtml = (invoice.items || [])
        .map(
          (it: any) => `
          <tr>
            <td style="padding: 10px 12px; border-bottom: 1px dashed #E2DDD3; text-align: left;">${it.desc}</td>
            <td style="padding: 10px 12px; border-bottom: 1px dashed #E2DDD3; text-align: center;">${it.qty}</td>
            <td style="padding: 10px 12px; border-bottom: 1px dashed #E2DDD3; text-align: right;">CHF ${(Number(it.rate) || 0).toFixed(2)}</td>
            <td style="padding: 10px 12px; border-bottom: 1px dashed #E2DDD3; text-align: right; font-weight: bold;">CHF ${(Number(it.amount) || 0).toFixed(2)}</td>
          </tr>`
        )
        .join("");

      const invoiceContentHtml = `
        <p style="font-size: 16px; color: #2c3e50; line-height: 1.6; margin-bottom: 20px;">
          Dear ${invoice.clientName || "Valued Client"},
        </p>
        <p style="font-size: 15px; color: #2c3e50; line-height: 1.6; margin-bottom: 25px;">
          Thank you for choosing Susi Davies. Please find attached your official invoice <strong>#${invoice.number}</strong> for <strong>CHF ${Number(invoice.total).toFixed(2)}</strong>.
        </p>

        <div style="background-color: #F4F9FC; border-left: 4px solid #1f78b4; padding: 18px 20px; border-radius: 0 10px 10px 0; margin-bottom: 25px;">
          <h3 style="margin: 0 0 10px 0; color: #1f78b4; font-size: 16px;">Invoice Summary</h3>
          <p style="margin: 3px 0; font-size: 14px;"><strong>Invoice Number:</strong> ${invoice.number}</p>
          <p style="margin: 3px 0; font-size: 14px;"><strong>Issue Date:</strong> ${invoice.issued}</p>
          ${invoice.status?.toLowerCase() !== "paid" ? `<p style="margin: 3px 0; font-size: 14px; color: #D68910;"><strong>Due Date:</strong> ${invoice.due}</p>` : ""}
          <p style="margin: 3px 0; font-size: 14px;"><strong>Status:</strong> <span style="text-transform: uppercase; font-weight: bold; color: ${invoice.status?.toLowerCase() === "paid" ? "#45A027" : "#D68910"};">${invoice.status}</span></p>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
          <thead>
            <tr style="background-color: #1f78b4; color: #ffffff;">
              <th style="padding: 12px; text-align: left;">Service Description</th>
              <th style="padding: 12px; text-align: center;">Qty</th>
              <th style="padding: 12px; text-align: right;">Rate</th>
              <th style="padding: 12px; text-align: right;">Amount</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>
      `;

      const emailHtml = renderSusiEmailTemplate({
        title: `Invoice ${invoice.number} — Susi Davies`,
        bodyHtml: invoiceContentHtml,
        recipientName: invoice.clientName,
      });

      // Generate Genuine PDF Buffer
      const pdfBuffer = await generateInvoicePdfBuffer({
        number: invoice.number || "SD-2026-001",
        issued: invoice.issued || "",
        due: invoice.due || "",
        status: invoice.status || "DUE",
        clientName: invoice.clientName || "Valued Client",
        clientEmail: recipient,
        paymentNotice: invoice.paymentNotice || "Payment due within 14 days via TWINT (+41 79 854 97 52) or bank transfer.",
        paymentMethod: invoice.paymentMethod || "TWINT (+41 79 854 97 52)",
        items: (invoice.items || []).map((it: any) => ({
          desc: it.desc || "Studio Session",
          qty: Number(it.qty || 1),
          rate: Number(it.rate || 0),
          amount: Number(it.amount || (it.qty * it.rate) || 0),
        })),
        subtotal: Number(invoice.total || 0),
        total: Number(invoice.total || 0),
      });

      const pdfBase64 = pdfBuffer.toString("base64");

      const resendRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          from: "Susi Davies <hello@susidavies.com>",
          to: [recipient],
          subject: `Invoice ${invoice.number} from Susi Davies`,
          html: emailHtml,
          attachments: [
            {
              filename: `Invoice-${invoice.number}.pdf`,
              content: pdfBase64,
            },
          ],
        }),
      });

      const resendData = await resendRes.json();

      if (!resendRes.ok) {
        return NextResponse.json({ error: resendData.message || "Failed to send email via Resend" }, { status: 500 });
      }

      // Update Supabase CRM & email_sent status
      const supabase = getSupabase();
      if (supabase) {
        await supabase
          .from("invoices")
          .update({ email_sent: true })
          .eq("invoice_number", invoice.number);
      }

      // Update fallback
      const existing = fallbackInvoices.find((i) => i.number === invoice.number);
      if (existing) existing.emailSent = true;

      return NextResponse.json({ success: true, message: `Invoice sent to ${recipient} via hello@susidavies.com!`, resendData });
    }

    // Action 2: Save Invoice & Update Supabase CRM Client Record
    const supabase = getSupabase();
    if (supabase && invoice) {
      // 1. Create or update Contact in Supabase CRM
      const { data: contact } = await supabase
        .from("contacts")
        .upsert(
          {
            full_name: invoice.clientName,
            email: invoice.clientEmail,
            source: "admin_invoice",
            consent_marketing: true,
          },
          { onConflict: "email" }
        )
        .select()
        .single();

      // 2. Insert Invoice
      await supabase.from("invoices").upsert({
        contact_id: contact?.id || null,
        invoice_number: invoice.number,
        client_name: invoice.clientName,
        client_email: invoice.clientEmail,
        issue_date: invoice.issued,
        due_date: invoice.due,
        status: invoice.status,
        subtotal: invoice.total,
        total: invoice.total,
        currency: "CHF",
        email_sent: invoice.emailSent || false,
      }, { onConflict: "invoice_number" });
    }

    // Update fallback array
    const newInv = {
      id: invoice.number,
      number: invoice.number,
      clientName: invoice.clientName,
      clientEmail: invoice.clientEmail,
      issued: invoice.issued,
      due: invoice.due,
      status: invoice.status,
      total: Number(invoice.total),
      emailSent: invoice.emailSent || false,
      paymentNotice: invoice.paymentNotice || "Payment notice: TWINT (+41 79 854 97 52) or Bank Transfer",
      items: invoice.items || [],
    };
    const idx = fallbackInvoices.findIndex((i) => i.number === invoice.number);
    if (idx >= 0) {
      fallbackInvoices[idx] = newInv;
    } else {
      fallbackInvoices.unshift(newInv);
    }

    return NextResponse.json({ success: true, invoice: newInv });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Invoice processing failed" }, { status: 500 });
  }
}
