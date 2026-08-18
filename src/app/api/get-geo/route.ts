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

export async function GET(req: Request) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "Unknown IP";

    const countryCode = (req.headers.get("x-vercel-ip-country") || "CH").toUpperCase();
    const city = req.headers.get("x-vercel-ip-city") || "";

    const countryName = countryNameMap[countryCode] || `${countryCode} Location`;

    return NextResponse.json({
      ip,
      countryCode,
      countryName,
      city,
      formattedGeo: `${countryName}${city ? ` (${city})` : ""}`,
    });
  } catch (err: any) {
    return NextResponse.json({
      ip: "127.0.0.1",
      countryCode: "CH",
      countryName: "Switzerland 🇨🇭",
      city: "",
      formattedGeo: "Switzerland 🇨🇭",
    });
  }
}
