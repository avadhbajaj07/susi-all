import { NextResponse } from "next/server";

export async function GET() {
  try {
    const apiKey = process.env.RESEND_API_KEY || process.env.NEXT_PUBLIC_RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "RESEND_API_KEY is missing" }, { status: 500 });
    }

    const res = await fetch("https://api.resend.com/emails", {
      headers: { Authorization: `Bearer ${apiKey}` },
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch Resend logs" }, { status: res.status });
    }

    const data = await res.json();
    const emails: any[] = data.data || [];

    // Group emails by clean subject
    const campaignMap: { [subject: string]: { total: number; delivered: number; opened: number; clicked: number; sentDate: string } } = {};

    for (const e of emails) {
      const subject = (e.subject || "Untitled Broadcast").trim();
      if (!campaignMap[subject]) {
        const rawDate = e.created_at ? new Date(e.created_at) : new Date();
        campaignMap[subject] = {
          total: 0,
          delivered: 0,
          opened: 0,
          clicked: 0,
          sentDate: rawDate.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
        };
      }

      campaignMap[subject].total += 1;

      if (e.last_event === "delivered") {
        campaignMap[subject].delivered += 1;
      } else if (e.last_event === "opened") {
        campaignMap[subject].delivered += 1;
        campaignMap[subject].opened += 1;
      } else if (e.last_event === "clicked") {
        campaignMap[subject].delivered += 1;
        campaignMap[subject].opened += 1;
        campaignMap[subject].clicked += 1;
      }
    }

    const campaigns = Object.keys(campaignMap).map((subject, idx) => {
      const item = campaignMap[subject];
      const openPct = item.total > 0 ? Math.round((item.opened / item.total) * 100) : 0;
      const clickPct = item.total > 0 ? Math.round((item.clicked / item.total) * 100) : 0;

      return {
        id: `CMP-0${idx + 1}`,
        subject: subject,
        segment: item.total > 1 ? `All Subscribers (${item.total} Sent)` : "Direct Email",
        status: item.delivered > 0 ? "Sent & Delivered" : "Sent",
        sentDate: item.sentDate,
        opens: `${openPct}%`,
        clicks: `${clickPct}%`,
        deliveredCount: item.delivered,
        openedCount: item.opened,
        clickedCount: item.clicked,
        totalSent: item.total,
      };
    });

    return NextResponse.json({ campaigns });
  } catch (err: any) {
    console.error("GET /api/campaigns/stats error:", err);
    return NextResponse.json({ error: err.message || "Failed to calculate campaign stats" }, { status: 500 });
  }
}
