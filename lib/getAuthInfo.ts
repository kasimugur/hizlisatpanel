import { NextRequest } from "next/server";
import { verifyToken } from "./auth";

export function getAuthInfo(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) throw new Error("Token eksik.");
  const token = authHeader.replace("Bearer ", "");
  const user = verifyToken(token);
  const userId = user.sub;
  return { userId };
}