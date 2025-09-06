import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check for Appwrite session cookies with multiple patterns
  const hasSession = request.cookies
    .getAll()
    .some(cookie => 
      cookie.name.startsWith("a_session") || 
      cookie.name.startsWith("appwrite-session") ||
      cookie.name.includes("session") ||
      cookie.name.includes("auth")
    );

  const isAuthPage =
    pathname.startsWith("/login") || pathname.startsWith("/signup");

  // Only redirect to login if accessing dashboard without session
  if (!hasSession && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Let AuthContext handle all redirects for better reliability
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/signup"],
};
