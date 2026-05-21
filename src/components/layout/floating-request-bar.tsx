"use client";

import { ShoppingBag } from "lucide-react";
import { LinkButton } from "@/components/ui/button";
import { useOrderStore } from "@/store/use-order-store";

export function FloatingRequestBar() {
  const count = useOrderStore((state) => state.items.reduce((total, item) => total + item.quantity, 0));

  if (count === 0) return null;

  return (
    <div className="fixed inset-x-3 bottom-20 z-30 rounded-2xl border border-interagro-border bg-white p-3 shadow-soft md:hidden">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-interagro-red">
          <ShoppingBag size={22} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-interagro-text">Tienes {count} productos en tu solicitud</p>
          <p className="text-xs text-interagro-muted">Revísalos antes de enviar a Hugo.</p>
        </div>
        <LinkButton href="/solicitud" size="sm" className="shrink-0">
          Revisar
        </LinkButton>
      </div>
    </div>
  );
}
