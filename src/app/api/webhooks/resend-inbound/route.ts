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
    description: "Resend Inbound Email Webhook Receiver for Susi Davies Studio",
  });
}
