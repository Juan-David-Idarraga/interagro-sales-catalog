"use client";

import Link from "next/link";
import { Trash2 } from "lucide-react";
import { useOrderStore } from "@/store/use-order-store";
import { Button, LinkButton } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { QuantitySelector } from "./quantity-selector";

export function CartSummary() {
  const { items, increaseItem, decreaseItem, removeItem } = useOrderStore();

  if (items.length === 0) {
    return (
      <EmptyState
        title="Aun no has agregado productos"
        description="Revisa el catalogo y selecciona los productos que quieres solicitar a Hugo."
        action={<LinkButton href="/catalogo">Ver catalogo</LinkButton>}
      />
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <article key={item.productId} className="rounded-2xl border border-interagro-border bg-white p-4 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-interagro-text">{item.productName}</h2>
              <div className="mt-2 grid gap-2 text-sm text-interagro-muted sm:grid-cols-2">
                <p>
                  Formato: <span className="font-bold text-interagro-text">{item.format}</span>
                </p>
                <p>
                  Conservacion: <span className="font-bold text-interagro-text">{item.conservation}</span>
                </p>
                <p>
                  Codigo: <span className="font-bold text-interagro-text">{item.code}</span>
                </p>
                <p>
                  Precio: <span className="font-bold text-interagro-text">{item.price}</span>
                </p>
              </div>
              {item.observation ? <p className="mt-2 text-sm text-interagro-muted">{item.observation}</p> : null}
            </div>
            <button
              aria-label="Eliminar producto"
              onClick={() => removeItem(item.productId)}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-red-600 hover:bg-red-50"
            >
              <Trash2 size={20} />
            </button>
          </div>
          <div className="mt-4 flex items-center justify-between gap-3">
            <QuantitySelector
              quantity={item.quantity}
              onIncrease={() => increaseItem(item.productId)}
              onDecrease={() => decreaseItem(item.productId)}
            />
            <Link className="text-sm font-bold text-interagro-green" href={`/producto/${item.productId}`}>
              Ver detalle
            </Link>
          </div>
        </article>
      ))}
      <div className="sticky bottom-24 rounded-2xl border border-interagro-border bg-white p-4 shadow-soft md:bottom-4">
        <p className="mb-3 rounded-xl bg-yellow-50 p-3 text-sm font-semibold text-yellow-800">
          Esta solicitud no corresponde a una compra final. Hugo revisara disponibilidad y confirmara el pedido por WhatsApp.
        </p>
        <p className="text-sm text-interagro-muted">Productos en la solicitud</p>
        <p className="text-2xl font-bold text-interagro-text">{items.reduce((total, item) => total + item.quantity, 0)}</p>
        <LinkButton href="/solicitud/datos" size="lg" className="mt-4 w-full">
          Continuar con mis datos
        </LinkButton>
        <Button variant="ghost" className="mt-2 w-full" onClick={() => window.history.back()}>
          Seguir revisando
        </Button>
      </div>
    </div>
  );
}
