import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    console.log("Received Resend Inbound Email Webhook Payload:", JSON.stringify(payload, null, 2));

    // Extract inbound email fields from Resend payload
    const fromRaw = payload.from || payload.data?.from || "Client <client@example.com>";
    const toRaw = payload.to || payload.data?.to || "hello@susidavies.com";
    const subject = payload.subject || payload.data?.subject || "New Inbound Email";
    const emailBody = payload.text || payload.data?.text || payload.html || payload.data?.html || "No body content";

    // Extract sender name and email address
    let fromName = "Client";
    let fromEmail = "client@example.com";

    if (typeof fromRaw === "string") {
      if (fromRaw.includes("<") && fromRaw.includes(">")) {
        const match = fromRaw.match(/(.*?)\s*<([^>]+)>/);
        if (match) {
          fromName = match[1].replace(/"/g, "").trim() || "Client";
          fromEmail = match[2].trim();
        }
      } else {
        fromEmail = fromRaw.trim();
        fromName = fromEmail.split("@")[0];
      }
    }

    // Format recipient
    const recipient = Array.isArray(toRaw) ? toRaw.join(", ") : toRaw;

    // Dispatch to Studio Inbox endpoint so it appears live in admin.susidavies.com
    const origin = req.headers.get("origin") || "https://admin.susidavies.com";
    await fetch(`${origin}/api/inbox`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fromName,
        fromEmail,
        to: recipient,
        subject,
        body: emailBody,
        folder: "inbox",
        attachments: payload.attachments || [],
      }),
    }).catch((err) => console.error("Internal inbox POST error:", err));

    // Forward incoming email directly to Susi's Gmail inbox via Resend
    const apiKey = process.env.RESEND_API_KEY || process.env.NEXT_PUBLIC_RESEND_API_KEY;
    const targetGmail = process.env.SUSI_GMAIL_ADDRESS || "susidavies@gmail.com";

    if (apiKey && targetGmail) {
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          from: "Susi Davies Website <hello@susidavies.com>",
          to: [targetGmail],
          subject: `📩 Inbound Email from ${fromName}: ${subject}`,
          html: `<div style="font-family: Arial, sans-serif; padding: 20px; border-left: 4px solid #1f78b4; background-color: #f9fbfd; border-radius: 8px;">
            <p style="margin-top:0; font-weight: bold; color: #1f78b4; font-size: 16px;">📩 New Email Received for hello@susidavies.com</p>
            <p><strong>From:</strong> ${fromName} &lt;${fromEmail}&gt;</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <hr style="border: none; border-top: 1px solid #e2ddd3; margin: 15px 0;" />
            <div style="white-space: pre-line; color: #2c3e50; font-size: 15px; line-height: 1.6;">${emailBody}</div>
            <hr style="border: none; border-top: 1px solid #e2ddd3; margin: 15px 0;" />
            <p style="font-size: 12px; color: #888;">You can reply directly to ${fromEmail} or reply from your Gmail as hello@susidavies.com.</p>
          </div>`,
        }),
      }).catch((err) => console.error("Inbound forwarding error:", err));
    }

    return NextResponse.json({ success: true, message: "Inbound email received and added to Studio Inbox" });
  } catch (error: any) {
    console.error("Resend Inbound Webhook Exception:", error);
    return NextResponse.json({ error: error.message || "Failed to process inbound email" }, { status: 500 });
  }
}

// Allow GET for webhook endpoint verification
export async function GET() {
  return NextResponse.json({
    status: "Active",
    endpoint: "https://admin.susidavies.com/api/webhooks/resend-inbound",
    description: "Resend Inbound Email Webhook Receiver for Susi Davies",
  });
}
