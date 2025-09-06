import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // ✅ Match Appwrite session cookie
  const hasSession = request.cookies
    .getAll()
    .some(cookie => cookie.name.startsWith("a_session"));

  const isAuthPage =
    pathname.startsWith("/login") || pathname.startsWith("/signup");

  if (!hasSession && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (hasSession && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/signup"],
};
