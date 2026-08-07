import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const hostname = request.headers.get("host")?.split(":")[0] ?? "";
  const pathname = request.nextUrl.pathname;

  // Subdomain routing for admin.susidavies.com
  if (hostname === "admin.susidavies.com" || hostname.startsWith("admin.")) {
    if (!pathname.startsWith("/admin")) {
      const url = request.nextUrl.clone();
      url.pathname = `/admin${pathname === "/" ? "" : pathname}`;
      return NextResponse.rewrite(url);
    }
  }

  // Redirect susidavies.com/admin -> https://admin.susidavies.com/
  if (pathname === "/admin" && hostname === "susidavies.com") {
    return NextResponse.redirect(new URL("https://admin.susidavies.com/"));
  }

  return NextResponse.next();
}

export const config = { matcher: ["/((?!_next|api|favicon.ico|images|music).*)"] };
