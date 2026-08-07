import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY || "";
const resend = new Resend(resendApiKey);

export interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
}

export async function sendEmail({ to, subject, html, from }: SendEmailOptions) {
  try {
    const sender = from || "Susi Davies Studio <hello@susidavies.com>";
    const data = await resend.emails.send({
      from: sender,
      to,
      subject,
      html,
    });
    return { success: true, data };
  } catch (error: any) {
    console.error("Resend Email Dispatch Error:", error);
    return { success: false, error: error.message || error };
  }
}

export async function sendBookingConfirmation({ clientName, clientEmail, serviceName, date, time }: any) {
  const html = `
    <div style="font-family: 'Crimson Pro', Georgia, serif; max-width: 600px; margin: 0 auto; color: #1c313a; padding: 25px;">
      <h2 style="color: #1f78b4;">SUSI DAVIES STUDIO</h2>
      <p>Dear ${clientName},</p>
      <p>Thank you for booking your session. Your reservation has been confirmed with the following details:</p>
      <div style="background-color: #eef8fc; padding: 18px; border-radius: 10px; margin: 20px 0;">
        <p style="margin: 4px 0;"><strong>Service:</strong> ${serviceName}</p>
        <p style="margin: 4px 0;"><strong>Date & Time:</strong> ${date} at ${time}</p>
        <p style="margin: 4px 0;"><strong>Location:</strong> Gewerbestrasse 24, 8800 Thalwil (or Online link)</p>
      </div>
      <p>Namaste,<br/>Susi Davies</p>
    </div>
  `;
  return sendEmail({
    to: clientEmail,
    subject: `Booking Confirmation — ${serviceName}`,
    html,
  });
}

export async function sendBroadcastNewsletter({ subject, content, recipientEmails }: { subject: string; content: string; recipientEmails: string[] }) {
  const html = `
    <div style="font-family: 'Crimson Pro', Georgia, serif; max-width: 600px; margin: 0 auto; color: #1c313a; padding: 25px;">
      <h2 style="color: #1f78b4; border-bottom: 2px solid #1f78b4; padding-bottom: 10px;">SUSI DAVIES STUDIO</h2>
      <div style="font-size: 16px; line-height: 1.6; color: #2c3e50; margin: 25px 0;">
        ${content.replace(/\n/g, "<br/>")}
      </div>
      <div style="border-top: 1px solid #d5e3ec; padding-top: 15px; font-size: 13px; color: #666; text-align: center;">
        <p>Namaste — May you move with grace, breathe with ease, and live with intention.</p>
        <p><a href="https://susidavies.com" style="color: #1f78b4; text-decoration: none;">susidavies.com</a> · Gewerbestrasse 24, 8800 Thalwil</p>
      </div>
    </div>
  `;

  return sendEmail({
    to: recipientEmails,
    subject,
    html,
  });
}
