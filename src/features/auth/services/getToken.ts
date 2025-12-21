import { NextRequest } from "next/server";

export function getToken(req: NextRequest, role: "admin" | "participant") {
  const cookieName = role === "admin" ? "admin_token" : "participant_token";

  return req.cookies.get(cookieName)?.value;
}
