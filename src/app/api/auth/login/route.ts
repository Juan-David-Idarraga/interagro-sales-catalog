import { NextResponse } from "next/server";
import { createSessionToken, AUTH_COOKIE, type UserRole } from "@/lib/session";
import { verifyPassword } from "@/lib/password";

const oneDay = 60 * 60 * 24;

export async function POST(request: Request) {
  const { user, password } = (await request.json()) as { user?: string; password?: string };
  const normalizedUser = user?.trim().toLowerCase();

  const users: Array<{ username: string | undefined; hash: string | undefined; role: UserRole; home: string }> = [
    {
      username: process.env.HUGO_PANEL_USER?.toLowerCase(),
      hash: process.env.HUGO_PANEL_PASSWORD_HASH,
      role: "hugo",
      home: "/hugo",
    },
    {
      username: process.env.ADMIN_PANEL_USER?.toLowerCase(),
      hash: process.env.ADMIN_PANEL_PASSWORD_HASH,
      role: "admin",
      home: "/admin",
    },
  ];

  const account = users.find((item) => item.username === normalizedUser);

  if (!account || !password || !verifyPassword(password, account.hash)) {
    return NextResponse.json({ error: "Usuario o contraseña incorrectos." }, { status: 401 });
  }

  const token = await createSessionToken(
    {
      user: account.username || normalizedUser || "",
      role: account.role,
      exp: Date.now() + oneDay * 1000,
    },
    process.env.AUTH_SECRET || "",
  );

  const response = NextResponse.json({ role: account.role, redirectTo: account.home });
  response.cookies.set(AUTH_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: oneDay,
    path: "/",
  });

  return response;
}
