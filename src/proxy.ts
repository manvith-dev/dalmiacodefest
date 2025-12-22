import { NextRequest, NextResponse } from "next/server";
import { verifyJwt } from "@/features/auth/services/verifyJwt";
import { getToken } from "@/features/auth/services/getToken";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Participants area
  if (pathname.startsWith("/participants")) {
    const token = getToken(req, "participant");

    if (!token || !verifyJwt(token, "participant")) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // Admin area
  if (pathname.startsWith("/admin")) {
    const token = getToken(req, "admin");

    if (!token || !verifyJwt(token, "admin")) {
      return NextResponse.redirect(new URL("/admin_login", req.url));
    }
  }

  return NextResponse.next();
}
