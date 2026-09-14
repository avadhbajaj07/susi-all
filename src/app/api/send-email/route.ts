import { NextResponse } from "next/server";
import { sendBrandedEmail } from "@/lib/email-service";

function isAdminRequest(req: Request) {
  const host = req.headers.get("host")?.split(":")[0].toLowerCase() || "";
  const origin = req.headers.get("origin");

  if ((host === "localhost" || host === "127.0.0.1") && origin) {
    try {
      return new URL(origin).hostname === host;
    } catch {
      return false;
    }
  }

  if (host !== "admin.susidavies.com" || !origin) return false;
  try {
    return new URL(origin).origin === "https://admin.susidavies.com";
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  // Public forms use /api/forms. This generic sender is retained only for the
  // existing admin composer and can no longer be called from the public site.
  if (!isAdminRequest(req)) {
    return NextResponse.json({ error: "Email sending is restricted." }, { status: 403 });
  }
  if (!req.headers.get("content-type")?.startsWith("application/json")) {
    return NextResponse.json({ error: "Invalid content type." }, { status: 415 });
  }
  if (Number(req.headers.get("content-length") || 0) > 7_000_000) {
    return NextResponse.json({ error: "Request too large." }, { status: 413 });
  }

  try {
    const { to, subject, body, fromName, imageUrl } = await req.json();
    if (
      typeof to !== "string" ||
      typeof subject !== "string" ||
      typeof body !== "string" ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(to.trim()) ||
      subject.length > 200 ||
      body.length > 100_000
    ) {
      return NextResponse.json({ error: "Invalid email details." }, { status: 400 });
    }

    const data = await sendBrandedEmail({
      to: to.trim(),
      subject: subject.trim(),
      body,
      fromName: typeof fromName === "string" ? fromName.slice(0, 100) : undefined,
      imageUrl: typeof imageUrl === "string" ? imageUrl : undefined,
    });
    return NextResponse.json({ success: true, data });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal server error";
    console.error("Admin email send failed:", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
