import { NextResponse } from "next/server";

// Shared in-memory inbox store for received and sent emails
let studioInboxMessages = [
  {
    id: "MSG-101",
    fromName: "Elena Rossi",
    fromEmail: "elena@example.ch",
    to: "hello@susidavies.com",
    subject: "Inquiry about 1-on-1 Movement Therapy Session in Thalwil",
    body: "Dear Susi,\n\nI was recommended your studio by a friend in Zurich. I would love to know more about your 1-on-1 posture and alignment sessions. Do you have availability on Thursday afternoons?\n\nWarm regards,\nElena Rossi",
    date: "Aug 06, 2026, 14:30",
    read: false,
    folder: "inbox",
    attachments: [],
  },
  {
    id: "MSG-102",
    fromName: "Marcus Weber",
    fromEmail: "marcus.weber@swiss-tech.ch",
    to: "hello@susidavies.com",
    subject: "Greece Peloponnese Retreat 2026 Registration Question",
    body: "Hi Susi,\n\nMy wife and I are planning to join your autumn retreat in Greece. Could you confirm if dietary preferences (gluten-free & vegetarian) are fully catered for at the retreat venue?\n\nBest regards,\nMarcus",
    date: "Aug 08, 2026, 11:15",
    read: true,
    folder: "inbox",
    attachments: [],
  },
  {
    id: "MSG-103",
    fromName: "Susi Davies Studio",
    fromEmail: "hello@susidavies.com",
    to: "elena@example.ch",
    subject: "Re: Inquiry about 1-on-1 Movement Therapy Session in Thalwil",
    body: "Dear Elena,\n\nThank you for reaching out! I would be delighted to welcome you to the Thalwil studio. Thursday afternoons work wonderfully—I have an opening at 14:00 or 15:30.\n\nLooking forward to working together.\n\nWarmly,\nSusi Davies",
    date: "Aug 06, 2026, 15:10",
    read: true,
    folder: "sent",
    attachments: [],
  },
  {
    id: "MSG-104",
    fromName: "Susi Davies Studio",
    fromEmail: "hello@susidavies.com",
    to: "marcus.weber@swiss-tech.ch",
    subject: "Invoice SD-2026-002 & Greece Retreat Confirmation",
    body: "Dear Marcus,\n\nThank you for registering for the Greece Peloponnese Autumn Retreat 2026! Attached is your official receipt and studio invoice SD-2026-002.\n\nDietary preferences (vegetarian, gluten-free, vegan) are 100% catered for by our organic retreat chef.\n\nNamaste,\nSusi Davies",
    date: "Aug 08, 2026, 12:00",
    read: true,
    folder: "sent",
    attachments: [{ name: "Invoice-SD-2026-002.pdf", size: "180 KB" }],
  },
  {
    id: "MSG-105",
    fromName: "Susi Davies Studio",
    fromEmail: "hello@susidavies.com",
    to: "avadhbajaj07@gmail.com",
    subject: "Your Studio Invoice SD-2026-001 & Session Preparation",
    body: "Dear Client,\n\nThank you for booking your private breathwork and movement session. Attached is your studio invoice SD-2026-001.\n\nPlease let me know if you have any questions.\n\nNamaste,\nSusi Davies",
    date: "Aug 05, 2026, 09:00",
    read: true,
    folder: "sent",
    attachments: [{ name: "Invoice-SD-2026-001.pdf", size: "142 KB" }],
  },
];

export async function GET() {
  return NextResponse.json({ messages: studioInboxMessages });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    const newMessage = {
      id: `MSG-${Math.floor(1000 + Math.random() * 9000)}`,
      fromName: body.fromName || "Susi Davies Studio",
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
