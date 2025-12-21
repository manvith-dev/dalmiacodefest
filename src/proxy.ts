import { NextRequest, NextResponse } from "next/server";
import { verifyJwt } from "@/lib/auth/verifyJwt";
import { getToken } from "@/lib/auth/getToken";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Participants area
  if (pathname.startsWith("/pages/participants")) {
    const token = getToken(req, "participant");

    if (!token || !verifyJwt(token, "participant")) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // Admin area
  if (pathname.startsWith("/pages/admin")) {
    const token = getToken(req, "admin");

    if (!token || !verifyJwt(token, "admin")) {
      return NextResponse.redirect(new URL("/login/admin", req.url));
    }
  }

  return NextResponse.next();
}
