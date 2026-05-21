"use client";

import Link from "next/link";
import { MessageCircle, ShoppingBag } from "lucide-react";
import { useOrderStore } from "@/store/use-order-store";
import { InteragroLogo } from "./interagro-logo";
import { LinkButton } from "@/components/ui/button";
import { createWhatsAppLink, HUGO_PHONE } from "@/lib/whatsapp";

export function Header() {
  const count = useOrderStore((state) => state.items.reduce((total, item) => total + item.quantity, 0));
  const whatsappLink = createWhatsAppLink(HUGO_PHONE, "Hola Hugo, quiero consultar por productos del catálogo Interagro.");

  return (
    <header className="sticky top-0 z-30 border-b border-interagro-border bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" aria-label="Ir al inicio">
          <InteragroLogo />
        </Link>
        <nav className="hidden items-center gap-2 md:flex">
          <Link className="rounded-xl px-4 py-3 font-semibold text-interagro-muted hover:bg-gray-50" href="/catalogo">
            Catálogo
          </Link>
          <LinkButton href="/solicitud" variant="primary" className="relative shadow-sm">
            <ShoppingBag size={20} />
            Ver solicitud
            {count > 0 ? <span className="rounded-full bg-white px-2 py-0.5 text-xs text-interagro-red">{count}</span> : null}
          </LinkButton>
          <LinkButton href={whatsappLink} target="_blank" variant="secondary">
            <MessageCircle size={20} />
            Contactar
          </LinkButton>
        </nav>
      </div>
    </header>
  );
}
