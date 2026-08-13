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

    // Process optional header image into inline CID attachment for 100% Gmail & Apple Mail display
    let resendAttachments: any[] = [];
    let templateHeaderImage = imageUrl || undefined;

    if (imageUrl && typeof imageUrl === "string" && imageUrl.trim()) {
      const trimmedUrl = imageUrl.trim();
      let base64Data = "";
      let fileName = "header-banner.jpg";

      if (trimmedUrl.startsWith("data:image/")) {
        const parts = trimmedUrl.split(",");
        if (parts.length > 1) {
          base64Data = parts[1];
          const mimeMatch = trimmedUrl.match(/data:image\/([a-zA-Z0-9]+);/);
          if (mimeMatch && mimeMatch[1]) {
            fileName = `header-banner.${mimeMatch[1] === "jpeg" ? "jpg" : mimeMatch[1]}`;
          }
        }
      } else if (trimmedUrl.startsWith("http://") || trimmedUrl.startsWith("https://")) {
        try {
          const imgRes = await fetch(trimmedUrl);
          if (imgRes.ok) {
            const buffer = await imgRes.arrayBuffer();
            base64Data = Buffer.from(buffer).toString("base64");
            const ext = trimmedUrl.split(".").pop()?.split("?")[0].toLowerCase() || "jpg";
            fileName = `header-banner.${ext}`;
          }
        } catch (fetchErr) {
          console.error("Failed to fetch image URL for CID embedding:", fetchErr);
        }
      }

      if (base64Data) {
        resendAttachments.push({
          filename: fileName,
          content: base64Data,
          content_id: "header_image",
        });
        templateHeaderImage = "cid:header_image";
      }
    }

    // Wrap email body in Susi Davies template & signature
    const formattedBodyHtml = `<div style="white-space: pre-line;">${body}</div>`;
    const fullHtml = renderSusiEmailTemplate({
      title: subject,
      bodyHtml: formattedBodyHtml,
      recipientName,
      headerImage: templateHeaderImage,
    });

    const emailPayload: any = {
      from: `${fromName || "Susi Davies"} <hello@susidavies.com>`,
      to: [recipientEmail],
      subject: subject,
      text: body,
      html: fullHtml,
    };

    if (resendAttachments.length > 0) {
      emailPayload.attachments = resendAttachments;
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(emailPayload),
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
