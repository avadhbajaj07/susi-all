import { NextResponse } from "next/server";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://bszyzttyashekzqmehxg.supabase.co";
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const RESEND_API_KEY = process.env.RESEND_API_KEY || process.env.NEXT_PUBLIC_RESEND_API_KEY;

export async function GET() {
  try {
    const todayStr = new Date().toISOString().split("T")[0];

    if (!SUPABASE_KEY || !RESEND_API_KEY) {
      return NextResponse.json({ error: "Missing required API keys" }, { status: 500 });
    }

    // 1. Query pending emails scheduled for today or earlier
    const resQueue = await fetch(
      `${SUPABASE_URL}/rest/v1/email_campaign_queue?status=eq.pending&scheduled_date=lte.${todayStr}&limit=80&order=batch_number.asc,created_at.asc`,
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
        },
        cache: "no-store",
      }
    );

    if (!resQueue.ok) {
      return NextResponse.json({ error: "Failed to fetch email queue from Supabase" }, { status: 500 });
    }

    const pendingQueue: any[] = await resQueue.json();

    if (!Array.isArray(pendingQueue) || pendingQueue.length === 0) {
      return NextResponse.json({
        success: true,
        message: "No pending email batches scheduled for today.",
        dispatchedCount: 0,
        timestamp: new Date().toISOString(),
      });
    }

    let sentCount = 0;
    let failedCount = 0;
    const details: string[] = [];

    for (const item of pendingQueue) {
      try {
        // Send email via Resend API
        const emailRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Susi Davies <hello@susidavies.com>",
            to: [item.recipient_email],
            subject: item.subject,
            html: `
              <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 30px; color: #1F2937; line-height: 1.6; background-color: #FAFAFA;">
                <div style="text-align: center; margin-bottom: 25px;">
                  <h1 style="color: #2691BA; font-size: 26px; margin: 0; font-weight: normal;">SUSI DAVIES</h1>
                  <p style="color: #6B7A70; font-size: 13px; margin-top: 4px; letter-spacing: 1px;">YOGA &bull; MOVEMENT &bull; MINDFULNESS</p>
                </div>
                ${item.image_url ? `<img src="${item.image_url}" alt="Header Image" style="width: 100%; height: auto; border-radius: 12px; margin-bottom: 20px;" />` : ""}
                <div style="background-color: #FFFFFF; padding: 25px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); white-space: pre-wrap; font-size: 16px;">
                  ${item.body}
                </div>
                <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #E5E7EB; font-size: 12px; color: #9CA3AF;">
                  <p>&copy; 2026 Susi Davies Studio. All rights reserved.</p>
                  <p>Sent to ${item.recipient_email} | <a href="https://susidavies.com" style="color: #2691BA; text-decoration: none;">Visit Website</a></p>
                </div>
              </div>
            `,
          }),
        });

        if (emailRes.ok) {
          sentCount++;
          details.push(`✓ ${item.recipient_email} (Sent)`);

          // Update Supabase queue item status to 'sent'
          await fetch(`${SUPABASE_URL}/rest/v1/email_campaign_queue?id=eq.${item.id}`, {
            method: "PATCH",
            headers: {
              apikey: SUPABASE_KEY,
              Authorization: `Bearer ${SUPABASE_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              status: "sent",
              sent_at: new Date().toISOString(),
            }),
          }).catch(() => {});
        } else {
          failedCount++;
          const errData = await emailRes.json().catch(() => ({}));
          const errMsg = errData.message || `HTTP ${emailRes.status}`;
          details.push(`✗ ${item.recipient_email} (${errMsg})`);

          // Update Supabase queue item status to 'failed'
          await fetch(`${SUPABASE_URL}/rest/v1/email_campaign_queue?id=eq.${item.id}`, {
            method: "PATCH",
            headers: {
              apikey: SUPABASE_KEY,
              Authorization: `Bearer ${SUPABASE_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              status: "failed",
              error_message: errMsg,
            }),
          }).catch(() => {});
        }
      } catch (err: any) {
        failedCount++;
        details.push(`✗ ${item.recipient_email} (${err.message})`);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Daily batch runner executed. ${sentCount} sent, ${failedCount} failed out of ${pendingQueue.length} queued.`,
      dispatchedCount: sentCount,
      failedCount,
      totalProcessed: pendingQueue.length,
      timestamp: new Date().toISOString(),
      details,
    });
  } catch (err: any) {
    console.error("GET /api/campaigns/batch-runner error:", err);
    return NextResponse.json({ error: err.message || "Batch runner failed" }, { status: 500 });
  }
}

export async function POST() {
  return GET();
}
