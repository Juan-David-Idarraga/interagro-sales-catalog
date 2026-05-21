import { NextResponse } from "next/server";
import { AUTH_COOKIE } from "@/lib/session";

function clearSession(response: NextResponse) {
  response.cookies.set(AUTH_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
    path: "/",
  });

  return response;
}

export async function GET(request: Request) {
  const response = NextResponse.redirect(new URL("/login", request.url));
  return clearSession(response);
}

export async function POST() {
  const response = NextResponse.json({ ok: true });
  clearSession(response);
  return response;
}
