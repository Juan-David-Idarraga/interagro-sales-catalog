"use client";

import Link from "next/link";
import { Home, LayoutGrid, MessageSquare, ShoppingBag } from "lucide-react";
import { useOrderStore } from "@/store/use-order-store";

export function MobileNav() {
  const count = useOrderStore((state) => state.items.reduce((total, item) => total + item.quantity, 0));

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-interagro-border bg-white/95 px-2 py-2 shadow-soft backdrop-blur md:hidden">
      <div className="grid grid-cols-4 text-xs font-semibold text-interagro-muted">
        <Link className="flex flex-col items-center gap-1 rounded-xl p-2" href="/">
          <Home size={20} />
          Inicio
        </Link>
        <Link className="flex flex-col items-center gap-1 rounded-xl p-2" href="/catalogo">
          <LayoutGrid size={20} />
          Catálogo
        </Link>
        <Link className="relative flex flex-col items-center gap-1 rounded-xl p-2" href="/solicitud">
          <ShoppingBag size={20} />
          Solicitud
          {count > 0 ? (
            <span className="absolute right-4 top-1 rounded-full bg-interagro-red px-1.5 text-[10px] text-white">{count}</span>
          ) : null}
        </Link>
        <a className="flex flex-col items-center gap-1 rounded-xl p-2" href="https://wa.me/56974464827" target="_blank">
          <MessageSquare size={20} />
          WhatsApp
        </a>
      </div>
    </nav>
  );
}
