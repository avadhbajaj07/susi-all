import { NextResponse } from "next/server";
import { renderSusiEmailTemplate } from "@/lib/email-template";

export async function POST(req: Request) {
  try {
    const { to, subject, body, fromName, imageUrl } = await req.json();

    if (!to || !subject || !body) {
      return NextResponse.json({ error: "Missing required fields: to, subject, body" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY || process.env.NEXT_PUBLIC_RESEND_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "RESEND_API_KEY is not configured in environment variables." }, { status: 500 });
    }

    // Clean email recipient if format is "Name <email@domain.com>"
    let recipientEmail = to.trim();
    let recipientName = "";
    if (recipientEmail.includes("<") && recipientEmail.includes(">")) {
      const match = recipientEmail.match(/(.*?)\s*<([^>]+)>/);
      if (match) {
        recipientName = match[1].replace(/"/g, "").trim();
        recipientEmail = match[2].trim();
      }
    }

    // Wrap email body in outstanding Susi Davies template & footer
    const formattedBodyHtml = `<div style="white-space: pre-line;">${body}</div>`;
    const fullHtml = renderSusiEmailTemplate({
      title: subject,
      bodyHtml: formattedBodyHtml,
      recipientName,
      headerImage: imageUrl,
    });

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: `${fromName || "Susi Davies"} <hello@susidavies.com>`,
        to: [recipientEmail],
        subject: subject,
        text: body,
        html: fullHtml,
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
