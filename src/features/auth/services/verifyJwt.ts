import jwt, { JwtPayload } from "jsonwebtoken";

interface LoginTokenPayload extends JwtPayload {
  role?: "admin" | "participant";
  teamId?: string;
}

type TokenChecks = Partial<{
  role: LoginTokenPayload["role"];
  teamId: true; // must exist
}>;

export function validateJwt(
  token: string,
  checks?: TokenChecks
): LoginTokenPayload | null {
  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as LoginTokenPayload;

    if (checks?.role && payload.role !== checks.role) {
      return null;
    }

    if (checks?.teamId && !payload.teamId) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}
