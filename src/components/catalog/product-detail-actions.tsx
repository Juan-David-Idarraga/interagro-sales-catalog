"use client";

import { MessageCircle, Plus, ShoppingBag } from "lucide-react";
import { Button, LinkButton } from "@/components/ui/button";
import { QuantitySelector } from "@/components/orders/quantity-selector";
import type { Product } from "@/lib/types";
import { buildQuickProductMessage, createWhatsAppLink, HUGO_PHONE } from "@/lib/whatsapp";
import { useOrderStore } from "@/store/use-order-store";

export function ProductDetailActions({ product }: { product: Product }) {
  const { addProduct, increaseItem, decreaseItem, items } = useOrderStore();
  const orderItem = items.find((item) => item.productId === product.id);
  const whatsAppLink = createWhatsAppLink(HUGO_PHONE, buildQuickProductMessage(product.name));

  return (
    <div className="mt-5 space-y-3">
      {orderItem ? (
        <div className="flex flex-col gap-3 rounded-2xl bg-red-50 p-4 sm:flex-row sm:items-center sm:justify-between">
          <span className="flex items-center gap-2 font-bold text-interagro-red">
            <ShoppingBag size={20} />
            En solicitud
          </span>
          <QuantitySelector
            quantity={orderItem.quantity}
            onIncrease={() => increaseItem(product.id)}
            onDecrease={() => decreaseItem(product.id)}
          />
        </div>
      ) : (
        <Button onClick={() => addProduct(product)} size="lg" className="w-full">
          <Plus size={22} />
          Agregar a solicitud
        </Button>
      )}
      <LinkButton href={whatsAppLink} target="_blank" variant="secondary" size="lg" className="w-full">
        <MessageCircle size={20} />
        Consultar por WhatsApp
      </LinkButton>
    </div>
  );
}
