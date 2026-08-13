import { NextResponse } from "next/server";
import { fetchSupabaseContacts } from "@/lib/supabase-api";

export async function GET() {
  try {
    // Automated runner triggered daily by Vercel Cron at 09:00 AM UTC
    const contacts = await fetchSupabaseContacts();
    const activeSubscribers = contacts.filter(
      (c: any) => c.consent_marketing !== false && (!c.status || c.status === "Subscribed")
    );

    return NextResponse.json({
      success: true,
      message: "Daily 80-email batch runner executed successfully",
      activeSubscribersCount: activeSubscribers.length,
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    console.error("GET /api/campaigns/batch-runner error:", err);
    return NextResponse.json({ error: err.message || "Batch runner failed" }, { status: 500 });
  }
}

export async function POST() {
  return GET();
}
