import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check for Appwrite session cookies
  const hasSession = request.cookies
    .getAll()
    .some(cookie => 
      cookie.name.startsWith("a_session") || 
      cookie.name.includes("session")
    );

  const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/signup");
  const isDashboard = pathname.startsWith("/dashboard");

  // Redirect to login if accessing dashboard without session
  if (!hasSession && isDashboard) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redirect to dashboard if accessing auth pages with session
  if (hasSession && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/signup"],
};
