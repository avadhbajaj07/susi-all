import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const hostname = request.headers.get("host")?.split(":")[0] ?? "";
  if (hostname === "admin.susidavies.com" || hostname === "admin.localhost") {
    if (!request.nextUrl.pathname.startsWith("/admin")) {
      const url = request.nextUrl.clone();
      url.pathname = `/admin${request.nextUrl.pathname === "/" ? "" : request.nextUrl.pathname}`;
      return NextResponse.rewrite(url);
    }
  }
  return NextResponse.next();
}

export const config = { matcher: ["/((?!_next|api|favicon.ico|images|music).*)"] };
