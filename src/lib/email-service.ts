import "server-only";

import { renderSusiEmailTemplate } from "@/lib/email-template";

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

export type EmailMessage = {
  to: string;
  subject: string;
  body: string;
  fromName?: string;
  imageUrl?: string;
  recipientName?: string;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function sendBrandedEmail(message: EmailMessage) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY is not configured.");

  let attachment: { filename: string; content: string; content_id: string } | undefined;
  let headerImage = message.imageUrl;

  if (message.imageUrl?.startsWith("data:image/")) {
    const [metadata, content] = message.imageUrl.split(",", 2);
    if (content && Buffer.byteLength(content, "base64") <= MAX_IMAGE_BYTES) {
      const extension = metadata.match(/data:image\/([a-zA-Z0-9]+)/)?.[1] || "jpg";
      attachment = {
        filename: `header-banner.${extension === "jpeg" ? "jpg" : extension}`,
        content,
        content_id: "header_image",
      };
      headerImage = "cid:header_image";
    }
  }

  const payload = {
    from: `${message.fromName || "Susi Davies"} <hello@susidavies.com>`,
    to: [message.to],
    subject: message.subject,
    text: message.body,
    html: renderSusiEmailTemplate({
      title: message.subject,
      bodyHtml: `<div style="white-space: pre-line;">${escapeHtml(message.body)}</div>`,
      recipientName: message.recipientName,
      headerImage,
    }),
    ...(attachment ? { attachments: [attachment] } : {}),
  };

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(payload),
  });
  const data = await response.json();

  if (!response.ok) {
    console.error("Resend API delivery error:", data);
    throw new Error(data.message || "Resend email delivery failed");
  }

  return data;
}
