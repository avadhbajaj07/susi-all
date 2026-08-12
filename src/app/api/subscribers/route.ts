import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

let fallbackSubscribers: any[] = [];

export async function GET() {
  try {
    const supabase = getSupabase();
    if (supabase) {
      const { data, error } = await supabase
        .from("contacts")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && Array.isArray(data)) {
        const formatted = data.map((c: any) => ({
          id: c.id,
          name: c.full_name || c.email.split("@")[0],
          email: c.email,
          segment: c.source || "Journal Subscribers",
          date: c.created_at ? new Date(c.created_at).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }) : "Aug 2026",
          status: c.consent_marketing === false ? "Unsubscribed" : "Subscribed",
        }));
        return NextResponse.json({ subscribers: formatted });
      }
    }
  } catch (err) {
    console.error("GET /api/subscribers error:", err);
  }

  return NextResponse.json({ subscribers: fallbackSubscribers });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, segment } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name || cleanEmail.split("@")[0];

    const newSub = {
      id: `SUB-${Date.now()}`,
      name: cleanName,
      email: cleanEmail,
      segment: segment || "Journal Subscribers",
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
      status: "Subscribed",
    };

    // Upsert into Supabase
    const supabase = getSupabase();
    if (supabase) {
      await supabase.from("contacts").upsert(
        {
          full_name: cleanName,
          email: cleanEmail,
          source: segment || "Journal Subscribers",
          consent_marketing: true,
        },
        { onConflict: "email" }
      );
    }

    // Add to fallback array if not existing
    const existingIdx = fallbackSubscribers.findIndex((s) => s.email === cleanEmail);
    if (existingIdx >= 0) {
      fallbackSubscribers[existingIdx] = newSub;
    } else {
      fallbackSubscribers.unshift(newSub);
    }

    return NextResponse.json({ success: true, subscriber: newSub });
  } catch (err: any) {
    console.error("POST /api/subscribers error:", err);
    return NextResponse.json({ error: err.message || "Failed to save subscriber" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { email, status } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();
    const isSubscribed = status === "Subscribed";

    const supabase = getSupabase();
    if (supabase) {
      await supabase
        .from("contacts")
        .update({ consent_marketing: isSubscribed })
        .eq("email", cleanEmail);
    }

    const existing = fallbackSubscribers.find((s) => s.email === cleanEmail);
    if (existing) {
      existing.status = status;
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("PATCH /api/subscribers error:", err);
    return NextResponse.json({ error: err.message || "Failed to update status" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();

    const supabase = getSupabase();
    if (supabase) {
      await supabase.from("contacts").delete().eq("email", cleanEmail);
    }

    fallbackSubscribers = fallbackSubscribers.filter((s) => s.email !== cleanEmail);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("DELETE /api/subscribers error:", err);
    return NextResponse.json({ error: err.message || "Failed to delete subscriber" }, { status: 500 });
  }
}
