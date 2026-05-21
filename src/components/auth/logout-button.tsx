import { LogOut } from "lucide-react";
import { LinkButton } from "@/components/ui/button";

export function LogoutButton() {
  return (
    <LinkButton href="/api/auth/logout" variant="ghost">
      <LogOut size={20} />
      Cerrar sesión
    </LinkButton>
  );
}
