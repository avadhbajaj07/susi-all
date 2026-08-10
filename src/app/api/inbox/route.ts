import { NextResponse } from "next/server";

// Shared in-memory inbox store for received and sent emails
let studioInboxMessages: any[] = [];

export async function GET() {
  return NextResponse.json({ messages: studioInboxMessages });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    const newMessage = {
      id: `MSG-${Math.floor(1000 + Math.random() * 9000)}`,
      fromName: body.fromName || "Susi Davies",
      fromEmail: body.fromEmail || "hello@susidavies.com",
      to: body.to || "hello@susidavies.com",
      subject: body.subject || "Studio Email Message",
      body: body.body || "",
      date: new Date().toLocaleString("en-US", { month: "short", day: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" }),
      read: true,
      folder: body.folder || "inbox",
      attachments: body.attachments || [],
    };

    studioInboxMessages.unshift(newMessage);

    return NextResponse.json({ success: true, message: newMessage });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to process inbox message" }, { status: 500 });
  }
}
