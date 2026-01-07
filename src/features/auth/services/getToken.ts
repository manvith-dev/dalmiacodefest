import { NextRequest } from "next/server";

export function getToken(req: NextRequest, cookieName: string) {
  return req.cookies.get(cookieName)?.value;
}
