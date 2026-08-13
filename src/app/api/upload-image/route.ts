import { NextResponse } from "next/server";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://bszyzttyashekzqmehxg.supabase.co";
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJzenl6dHR5YXNoZWt6cW1laHhnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NjAwNDI4NiwiZXhwIjoyMTAxNTgwMjg2fQ.XNR9JAKg6ZZubrMpH5lyN3A0_f8lpubWyJ8qTfrQDSM";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Generate unique filename with timestamp and clean extension
    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const fileName = `broadcast-${Date.now()}-${Math.floor(Math.random() * 1000)}.${ext}`;

    // Upload to Supabase Storage bucket 'email-images'
    const uploadRes = await fetch(`${SUPABASE_URL}/storage/v1/object/email-images/${fileName}`, {
      method: "POST",
      headers: {
        "apikey": SUPABASE_KEY,
        "Authorization": `Bearer ${SUPABASE_KEY}`,
        "Content-Type": file.type || "image/jpeg",
        "x-upsert": "true",
      },
      body: buffer,
    });

    if (!uploadRes.ok) {
      const errData = await uploadRes.json().catch(() => ({}));
      console.error("Supabase Storage upload error:", errData);
      return NextResponse.json({ error: errData.message || "Failed to upload image to storage" }, { status: 500 });
    }

    // Public URL
    const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/email-images/${fileName}`;

    return NextResponse.json({ success: true, url: publicUrl, fileName });
  } catch (err: any) {
    console.error("POST /api/upload-image exception:", err);
    return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 });
  }
}
