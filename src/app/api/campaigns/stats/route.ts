import { NextResponse } from "next/server";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://bszyzttyashekzqmehxg.supabase.co";
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const RESEND_API_KEY = process.env.RESEND_API_KEY || process.env.NEXT_PUBLIC_RESEND_API_KEY;

export async function GET() {
  try {
    // 1. Fetch Resend logs for open/click stats
    let emails: any[] = [];
    if (RESEND_API_KEY) {
      try {
        const resResend = await fetch("https://api.resend.com/emails", {
          headers: { Authorization: `Bearer ${RESEND_API_KEY}` },
          cache: "no-store",
        });
        if (resResend.ok) {
          const dataResend = await resResend.json();
          emails = dataResend.data || [];
        }
      } catch {}
    }

    // Map open/click stats by subject
    const statsBySubject: { [subj: string]: { total: number; opened: number; clicked: number } } = {};
    for (const e of emails) {
      const subj = (e.subject || "").trim().toLowerCase();
      if (!statsBySubject[subj]) {
        statsBySubject[subj] = { total: 0, opened: 0, clicked: 0 };
      }
      statsBySubject[subj].total += 1;
      if (e.last_event === "opened") statsBySubject[subj].opened += 1;
      if (e.last_event === "clicked") {
        statsBySubject[subj].opened += 1;
        statsBySubject[subj].clicked += 1;
      }
    }

    // 2. Fetch Supabase queue data
    let queueItems: any[] = [];
    if (SUPABASE_KEY) {
      try {
        const resQueue = await fetch(`${SUPABASE_URL}/rest/v1/email_campaign_queue?select=*&order=created_at.desc&limit=5000`, {
          headers: {
            apikey: SUPABASE_KEY,
            Authorization: `Bearer ${SUPABASE_KEY}`,
          },
          cache: "no-store",
        });
        if (resQueue.ok) {
          queueItems = await resQueue.json();
        }
      } catch {}
    }

    // Group queue items by campaign_id or subject
    const campaignMap: {
      [key: string]: {
        id: string;
        subject: string;
        total: number;
        sent: number;
        pending: number;
        failed: number;
        createdDate: string;
        nextScheduledDate?: string;
        batches: number;
      };
    } = {};

    if (Array.isArray(queueItems) && queueItems.length > 0) {
      for (const q of queueItems) {
        const key = q.campaign_id || q.subject;
        if (!campaignMap[key]) {
          const rawDate = q.created_at ? new Date(q.created_at) : new Date();
          campaignMap[key] = {
            id: q.campaign_id || `CMP-${Math.random().toString(36).substr(2, 6)}`,
            subject: q.subject,
            total: 0,
            sent: 0,
            pending: 0,
            failed: 0,
            createdDate: rawDate.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
            batches: 1,
          };
        }

        campaignMap[key].total += 1;
        if (q.status === "sent") campaignMap[key].sent += 1;
        else if (q.status === "pending") {
          campaignMap[key].pending += 1;
          if (q.scheduled_date && (!campaignMap[key].nextScheduledDate || q.scheduled_date < campaignMap[key].nextScheduledDate)) {
            campaignMap[key].nextScheduledDate = q.scheduled_date;
          }
        } else if (q.status === "failed") campaignMap[key].failed += 1;

        if (q.batch_number && q.batch_number > campaignMap[key].batches) {
          campaignMap[key].batches = q.batch_number;
        }
      }
    }

    const campaigns = Object.keys(campaignMap).map((key, idx) => {
      const item = campaignMap[key];
      const subjKey = item.subject.trim().toLowerCase();
      const resendStats = statsBySubject[subjKey] || { total: item.sent, opened: 0, clicked: 0 };

      const openPct = resendStats.total > 0 ? Math.round((resendStats.opened / resendStats.total) * 100) : 0;
      const clickPct = resendStats.total > 0 ? Math.round((resendStats.clicked / resendStats.total) * 100) : 0;

      let statusText = "Sent";
      if (item.pending > 0) {
        const nextDateStr = item.nextScheduledDate
          ? new Date(item.nextScheduledDate).toLocaleDateString("en-US", { month: "short", day: "2-digit" })
          : "Tomorrow";
        statusText = `Batch 1 Sent (${item.sent}/${item.total} Sent • Next 80 Scheduled for ${nextDateStr})`;
      } else if (item.sent > 0) {
        statusText = `Completed (${item.sent}/${item.total} Sent Across ${item.batches} Days)`;
      }

      return {
        id: item.id || `CMP-0${idx + 1}`,
        subject: item.subject,
        segment: `All Subscribers (${item.total} Recipients)`,
        status: statusText,
        sentDate: item.createdDate,
        opens: `${openPct}%`,
        clicks: `${clickPct}%`,
        total: item.total,
        sent: item.sent,
        pending: item.pending,
        failed: item.failed,
      };
    });

    // Fallback to Resend log stats if queue is empty
    if (campaigns.length === 0 && emails.length > 0) {
      const resendCampaignsMap: { [subj: string]: any } = {};
      for (const e of emails) {
        const subject = (e.subject || "Untitled Broadcast").trim();
        if (!resendCampaignsMap[subject]) {
          const rawDate = e.created_at ? new Date(e.created_at) : new Date();
          resendCampaignsMap[subject] = {
            id: `CMP-0${Object.keys(resendCampaignsMap).length + 1}`,
            subject,
            segment: "All Subscribers",
            status: "Sent & Delivered",
            sentDate: rawDate.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
            opens: "0%",
            clicks: "0%",
          };
        }
      }
      return NextResponse.json({ campaigns: Object.values(resendCampaignsMap) });
    }

    return NextResponse.json({ campaigns });
  } catch (err: any) {
    console.error("GET /api/campaigns/stats error:", err);
    return NextResponse.json({ error: err.message || "Failed to calculate campaign stats" }, { status: 500 });
  }
}
