import jwt, { JwtPayload } from "jsonwebtoken";

interface loginTokenPayload extends JwtPayload {
  teamId?: string;
}

export function verifyJwt(
  token: string,
  role: "admin" | "participant"
): boolean {
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as loginTokenPayload;

    if (role === "admin") {
      return decoded.role === "admin";
    }

    return true;
  } catch {
    return false;
  }
}
