import { NextResponse } from "next/server";

const countryNameMap: { [code: string]: string } = {
  CH: "Switzerland 🇨🇭",
  DE: "Germany 🇩🇪",
  AT: "Austria 🇦🇹",
  FR: "France 🇫🇷",
  IT: "Italy 🇮🇹",
  GB: "United Kingdom 🇬🇧",
  US: "United States 🇺🇸",
  CA: "Canada 🇨🇦",
  IN: "India 🇮🇳",
  ES: "Spain 🇪🇸",
  NL: "Netherlands 🇳🇱",
  SE: "Sweden 🇸🇪",
  NO: "Norway 🇳🇴",
  DK: "Denmark 🇩🇰",
  FI: "Finland 🇫🇮",
  BE: "Belgium 🇧🇪",
  PT: "Portugal 🇵🇹",
  IE: "Ireland 🇮🇪",
  AU: "Australia 🇦🇺",
  NZ: "New Zealand 🇳🇿",
  SG: "Singapore 🇸🇬",
  AE: "United Arab Emirates 🇦🇪",
};

let studioInboxMessages: any[] = [];

export async function GET() {
  return NextResponse.json({ messages: studioInboxMessages });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      body.ip ||
      "Unknown IP";

    const countryCode = (req.headers.get("x-vercel-ip-country") || body.countryCode || "CH").toUpperCase();
    const city = req.headers.get("x-vercel-ip-city") || body.city || "";
    const countryName = countryNameMap[countryCode] || `${countryCode} Location`;
    const formattedGeo = body.formattedGeo || `${countryName}${city ? ` (${city})` : ""}`;

    const newMessage = {
      id: `MSG-${Math.floor(1000 + Math.random() * 9000)}`,
      fromName: body.fromName || "Website Guest",
      fromEmail: body.fromEmail || "hello@susidavies.com",
      to: body.to || "hello@susidavies.com",
      subject: body.subject || "Studio Inquiry",
      body: body.body || "",
      ip,
      country: formattedGeo,
      date: new Date().toLocaleString("en-US", { month: "short", day: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" }),
      read: false,
      folder: body.folder || "inbox",
      attachments: body.attachments || [],
    };

    studioInboxMessages.unshift(newMessage);

    return NextResponse.json({ success: true, message: newMessage });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to process inbox message" }, { status: 500 });
  }
}
