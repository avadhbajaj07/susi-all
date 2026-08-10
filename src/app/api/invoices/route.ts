import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { renderSusiEmailTemplate } from "@/lib/email-template";

// In-memory invoice fallback store in case Supabase credentials are unavailable locally
let fallbackInvoices = [
  {
    id: "SD-2026-001",
    number: "SD-2026-001",
    clientName: "Elena Rossi",
    clientEmail: "elena@example.ch",
    issued: "06 Aug 2026",
    due: "20 Aug 2026",
    status: "Due",
    total: 180.00,
    emailSent: true,
    paymentNotice: "Payment due within 14 days via TWINT or IBAN.",
    items: [
      { desc: "1-on-1 Movement & Alignment Session (Thalwil Studio)", qty: 1, rate: 180.00, amount: 180.00 }
    ]
  },
  {
    id: "SD-2026-002",
    number: "SD-2026-002",
    clientName: "Marcus Weber",
    clientEmail: "marcus.weber@swiss-tech.ch",
    issued: "08 Aug 2026",
    due: "08 Aug 2026",
    status: "Paid",
    total: 2400.00,
    emailSent: true,
    paymentNotice: "Payment received with thanks. Receipt confirmed.",
    items: [
      { desc: "Greece Peloponnese Autumn Retreat 2026 Deposit", qty: 1, rate: 2400.00, amount: 2400.00 }
    ]
  }
];

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
          items: inv.items ? inv.items.map((it: any) => ({ desc: it.description, qty: Number(it.quantity), rate: Number(it.unit_price), amount: Number(it.quantity) * Number(it.unit_price) })) : []
        }));
        return NextResponse.json({ invoices: formatted });
      }
    }
    return NextResponse.json({ invoices: fallbackInvoices });
  } catch (err) {
    return NextResponse.json({ invoices: fallbackInvoices });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, invoice } = body;

    // Action 1: Send Invoice via Resend Email API
    if (action === "send-email") {
      const apiKey = process.env.RESEND_API_KEY;
      if (!apiKey) {
        return NextResponse.json({ error: "RESEND_API_KEY environment variable is missing" }, { status: 500 });
      }
      const recipient = invoice.clientEmail || invoice.email;

      if (!recipient) {
        return NextResponse.json({ error: "Missing client email address" }, { status: 400 });
      }

      // Format items table for HTML email
      const itemsHtml = invoice.items.map((it: any) => `
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${it.desc}</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${it.qty}</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">CHF ${Number(it.rate).toFixed(2)}</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right; font-weight: bold;">CHF ${(Number(it.qty) * Number(it.rate)).toFixed(2)}</td>
        </tr>
      `).join("");

      const dateHtml = invoice.status?.toLowerCase() === "paid" 
        ? `<div><strong>Invoice Date:</strong> ${invoice.issued}</div>`
        : `<div><strong>Invoice Date:</strong> ${invoice.issued}</div><div><strong>Payment Due Date:</strong> ${invoice.due}</div>`;

      const invoiceContentHtml = `
        <p>Thank you for choosing Susi Davies Studio. Below is your official invoice summary:</p>

        <div style="background-color: #F8FCFD; padding: 16px 20px; border-radius: 10px; border: 1px solid #E2DDD3; margin-bottom: 24px; font-size: 14px;">
          <div style="margin-bottom: 4px;"><strong>Invoice Number:</strong> ${invoice.number}</div>
          ${dateHtml}
          <div style="margin-top: 4px;"><strong>Payment Status:</strong> <span style="color: ${invoice.status?.toLowerCase() === "paid" ? "#45A027" : "#D68910"}; font-weight: bold; text-transform: uppercase;">${invoice.status}</span></div>
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

        <div style="text-align: right; font-size: 20px; font-weight: bold; color: #1f78b4; margin-bottom: 25px;">
          Total: CHF ${Number(invoice.total).toFixed(2)}
        </div>

        <div style="background-color: #EEF8FC; padding: 16px; border-radius: 10px; font-size: 13px; margin-bottom: 25px; border: 1px solid #C5E3F3;">
          <strong style="color: #1f78b4; text-transform: uppercase; font-size: 11px; letter-spacing: 0.1em; display: block; margin-bottom: 4px;">Payment Instructions</strong>
          <strong>Payment Method:</strong> TWINT (+41 79 854 97 52) or Bank Transfer.<br/>
          ${invoice.paymentNotice || ""}
        </div>
      `;

      const emailHtml = renderSusiEmailTemplate({
        title: `Invoice ${invoice.number} — Susi Davies Studio`,
        bodyHtml: invoiceContentHtml,
        recipientName: invoice.clientName,
      });

      const resendRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          from: "Susi Davies Studio <hello@susidavies.com>",
          to: [recipient],
          subject: `Invoice ${invoice.number} from Susi Davies Studio`,
          html: emailHtml,
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
