export interface SusiEmailOptions {
  title?: string;
  preheader?: string;
  bodyHtml: string;
  recipientName?: string;
}

export function renderSusiEmailTemplate({ title, preheader, bodyHtml, recipientName }: SusiEmailOptions): string {
  const logoUrl = "https://susidavies.com/images/susi-davies-logo-white-official.png";

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title || "Susi Davies Studio"}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Alex+Brush&family=Crimson+Pro:ital,wght@0,400;0,600;0,700;1,400&family=Open+Sans:wght@400;600;700&display=swap');
    body {
      margin: 0;
      padding: 0;
      background-color: #F4F7F9;
      font-family: 'Open Sans', Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
    }
  </style>
</head>
<body style="margin:0; padding:30px 10px; background-color:#F4F7F9;">
  ${preheader ? `<div style="display:none;font-size:1px;color:#F4F7F9;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">${preheader}</div>` : ""}

  <div style="max-width: 640px; margin: 0 auto; background-color: #ffffff; border-radius: 18px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.08); border: 1px solid #E2DDD3;">
    
    <!-- Top Header Bar with Logo -->
    <div style="background-color: #1f78b4; padding: 25px 30px; text-align: center;">
      <a href="https://susidavies.com" target="_blank" style="text-decoration: none; display: inline-block;">
        <img src="${logoUrl}" alt="Susi Davies Logo" height="52" style="height: 52px; width: auto; border: 0; display: block; margin: 0 auto;" />
      </a>
      <div style="font-family: 'Open Sans', sans-serif; font-size: 11px; text-transform: uppercase; letter-spacing: 0.18em; color: rgba(255,255,255,0.85); margin-top: 8px;">
        Movement · Breathwork · Remedial Therapy · Mentoring
      </div>
    </div>

    <!-- Main Message Body -->
    <div style="padding: 35px 40px; color: #2C3E50; font-size: 15px; line-height: 1.7; font-family: 'Open Sans', Helvetica, Arial, sans-serif;">
      ${recipientName ? `<p style="margin-top: 0; font-size: 16px;">Dear <strong>${recipientName}</strong>,</p>` : ""}
      ${bodyHtml}
    </div>

    <!-- Outstanding Susi Davies Signature Footer (Exact match to Invoice) -->
    <div style="background-color: #FBF9F4; border-top: 1px solid #E2DDD3; padding: 35px 30px 30px; text-align: center;">
      
      <!-- Lotus Divider -->
      <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 14px;">
        <tr>
          <td align="right" style="padding-right: 15px;"><div style="height: 1px; background-color: #BCD4E3; width: 80px; display: inline-block;"></div></td>
          <td align="center" width="30">
            <svg width="24" height="24" viewBox="0 0 50 50" fill="none" stroke="#1f78b4" stroke-width="1.6" style="vertical-align: middle;">
              <path d="M25 35 C16 25 8 20 8 15 C8 10 15 8 25 20 C35 8 42 10 42 15 C42 20 34 25 25 35 Z" />
              <path d="M25 35 C12 30 4 24 4 17 C4 12 12 12 25 24 C38 12 46 12 46 17 C46 24 38 30 25 35 Z" />
            </svg>
          </td>
          <td align="left" style="padding-left: 15px;"><div style="height: 1px; background-color: #BCD4E3; width: 80px; display: inline-block;"></div></td>
        </tr>
      </table>

      <!-- Namaste Heading -->
      <div style="font-family: Georgia, 'Crimson Pro', serif; font-size: 26px; color: #1f78b4; margin-bottom: 4px; font-weight: 400;">
        Namaste
      </div>

      <!-- Inspirational Quote -->
      <div style="font-family: Georgia, 'Crimson Pro', serif; font-style: italic; font-size: 15px; color: #1f78b4; margin-bottom: 14px;">
        &ldquo;May you move with grace, breathe with ease, and live with intention.&rdquo;
      </div>

      <!-- Cursive Signature -->
      <div style="font-family: 'Alex Brush', cursive, Georgia, serif; font-size: 34px; color: #1f78b4; margin-bottom: 22px;">
        &mdash; Susi Davies
      </div>

      <!-- Contact Info Bar with Vertical Dividers -->
      <table role="presentation" align="center" border="0" cellspacing="0" cellpadding="0" style="margin: 0 auto; font-family: 'Open Sans', Helvetica, Arial, sans-serif; font-size: 13px; color: #1f78b4; font-weight: 600;">
        <tr>
          <td style="padding: 0 10px; color: #1f78b4;">
            <a href="tel:+41798549752" style="color: #1f78b4; text-decoration: none;">&#128222; +41 79 854 97 52</a>
          </td>
          <td style="color: #AED0E4; font-weight: 300;">|</td>
          <td style="padding: 0 10px; color: #1f78b4;">
            <a href="mailto:hello@susidavies.com" style="color: #1f78b4; text-decoration: none;">&#9993; hello@susidavies.com</a>
          </td>
          <td style="color: #AED0E4; font-weight: 300;">|</td>
          <td style="padding: 0 10px; color: #1f78b4;">
            <a href="https://susidavies.com" target="_blank" style="color: #1f78b4; text-decoration: none;">&#127760; susidavies.com</a>
          </td>
        </tr>
      </table>

    </div>

  </div>
</body>
</html>
  `;
}
