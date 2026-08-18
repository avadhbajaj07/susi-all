import { NextResponse } from "next/server";
import {
  fetchSupabaseContacts,
  insertSupabaseContact,
  updateSupabaseContactStatus,
  deleteSupabaseContact,
} from "@/lib/supabase-api";

export async function GET() {
  const subscribers = await fetchSupabaseContacts();
  return NextResponse.json({ subscribers });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, segment } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const saved = await insertSupabaseContact({ name, email, segment });
    return NextResponse.json({ success: true, subscriber: saved });
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

    await updateSupabaseContactStatus(email, status);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("PATCH /api/subscribers error:", err);
    return NextResponse.json({ error: err.message || "Failed to update status" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email") || searchParams.get("id");

    if (!email) {
      return NextResponse.json({ error: "Email or ID is required" }, { status: 400 });
    }

    await deleteSupabaseContact(email);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("DELETE /api/subscribers error:", err);
    return NextResponse.json({ error: err.message || "Failed to delete subscriber" }, { status: 500 });
  }
}
