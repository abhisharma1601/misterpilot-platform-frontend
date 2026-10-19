import { NextResponse, type NextRequest } from "next/server";
import { isAdminJwt, isJwtUsable } from "@/lib/jwt";

const ADMIN_LOGIN_PATH = "/admin/login";

// Server-side gate for the admin panel: without a usable mp_jwt cookie, never
// serve admin pages — send the request straight to the admin login screen.
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname === ADMIN_LOGIN_PATH) return NextResponse.next();

  const token = req.cookies.get("mp_jwt")?.value;
  if (!isJwtUsable(token)) {
    const res = NextResponse.redirect(new URL(ADMIN_LOGIN_PATH, req.url));
    res.cookies.delete("mp_jwt");
    return res;
  }

  // Signed in, but not an admin — send them to the regular user login
  if (!isAdminJwt(token)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (pathname === "/admin") {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
