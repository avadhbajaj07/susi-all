import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { to, subject, body, fromName } = await req.json();

    if (!to || !subject || !body) {
      return NextResponse.json({ error: "Missing required fields: to, subject, body" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "RESEND_API_KEY environment variable is not configured" }, { status: 500 });
    }

    // Clean email recipient if format is "Name <email@domain.com>"
    let recipientEmail = to.trim();
    if (recipientEmail.includes("<") && recipientEmail.includes(">")) {
      const match = recipientEmail.match(/<([^>]+)>/);
      if (match) {
        recipientEmail = match[1];
      }
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: `${fromName || "Susi Davies Studio"} <hello@susidavies.com>`,
        to: [recipientEmail],
        subject: subject,
        text: body,
        html: `
          <div style="font-family: 'Open Sans', Helvetica, Arial, sans-serif; line-height: 1.7; color: #2C3E50; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #E2DDD3; border-radius: 12px;">
            <div style="text-align: center; padding-bottom: 16px; border-bottom: 2px solid #1f78b4; margin-bottom: 24px;">
              <h2 style="color: #1f78b4; margin: 0; font-family: Georgia, serif;">Susi Davies Studio</h2>
              <span style="font-size: 12px; color: #6B7A70; text-transform: uppercase; letter-spacing: 0.1em;">Movement · Breathwork · Remedial Therapy</span>
            </div>
            <div style="font-size: 15px; white-space: pre-line;">
              ${body}
            </div>
            <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #eee; font-size: 12px; color: #888; text-align: center;">
              Sent via Susi Davies Studio (<a href="https://susidavies.com" style="color: #1f78b4; text-decoration: none;">susidavies.com</a>)
            </div>
          </div>
        `,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Resend API delivery error:", data);
      return NextResponse.json({ error: data.message || "Resend email delivery failed" }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error("Resend API exception:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
