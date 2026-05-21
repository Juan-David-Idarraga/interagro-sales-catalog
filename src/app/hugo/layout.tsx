import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AUTH_COOKIE, verifySessionToken } from "@/lib/session";

export default async function HugoPrivateLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const session = await verifySessionToken(cookieStore.get(AUTH_COOKIE)?.value, process.env.AUTH_SECRET || "");

  if (!session) {
    redirect("/login?next=/hugo");
  }

  return children;
}
