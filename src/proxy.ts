import { NextRequest, NextResponse } from "next/server";
import { validateJwt } from "@/features/auth/services/verifyJwt";
import { getToken } from "@/features/auth/services/getToken";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // if (pathname.startsWith("/participants")) {
  //   const token = getToken(req, "participant_token");
  //   const payload = token && validateJwt(token, { teamId: true });

  //   if (!payload) {
  //     return NextResponse.redirect(new URL("/login", req.url));
  //   }
  // }

  if (pathname.startsWith("/admin")) {
    const token = getToken(req, "admin_token");
    const payload = token && validateJwt(token, { role: "admin" });

    if (!payload) {
      return NextResponse.redirect(new URL("/login-admin", req.url));
    }
  }

  if (pathname.startsWith("/round1/quiz")) {
    const token = getToken(req, "round1_token");
    const payload = token && validateJwt(token, { teamId: true });

    if (!payload) {
      return NextResponse.redirect(new URL("/round1/login", req.url));
    }
  }

  if (pathname.startsWith("/round2/game")) {
    const token = getToken(req, "round2_token");
    const payload = token && validateJwt(token, { teamId: true });

    if (!payload) {
      return NextResponse.redirect(new URL("/round2/login", req.url));
    }
  }

  if (pathname.startsWith("/round3/game")) {
    const token = getToken(req, "round3_token");
    const payload = token && validateJwt(token, { teamId: true });

    if (!payload) {
      return NextResponse.redirect(new URL("/round3/login", req.url));
    }
  }

  return NextResponse.next();
}
