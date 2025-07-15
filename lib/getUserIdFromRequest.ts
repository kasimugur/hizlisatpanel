import { verifyToken } from "@/lib/auth";
import { NextRequest } from "next/server";

export function getUserIdFromRequest(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) throw new Error("Giriş yapılmamış!");
  const { sub: userId } = verifyToken(token);
  return userId;
}
