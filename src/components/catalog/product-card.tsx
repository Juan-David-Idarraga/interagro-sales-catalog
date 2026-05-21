"use client";

import Link from "next/link";
import { MessageCircle, Plus, CheckCircle, ShoppingBag } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/lib/types";
import { createWhatsAppLink, HUGO_PHONE, buildQuickProductMessage } from "@/lib/whatsapp";
import { useOrderStore } from "@/store/use-order-store";
import { Button, LinkButton } from "@/components/ui/button";
import { ProductImage } from "./product-image";
import { QuantitySelector } from "@/components/orders/quantity-selector";
import { ConservationBadge, ProductCommercialGrid, ProductStatusBadge } from "./product-badges";

export function ProductCard({ product }: { product: Product }) {
  const [showToast, setShowToast] = useState(false);
  const { addProduct, increaseItem, decreaseItem, items } = useOrderStore();
  const orderItem = items.find((item) => item.productId === product.id);
  const whatsAppLink = createWhatsAppLink(HUGO_PHONE, buildQuickProductMessage(product.name));

  function handleAddProduct() {
    addProduct(product);
    setShowToast(true);
    window.setTimeout(() => setShowToast(false), 2600);
  }

  return (
    <article className="relative overflow-hidden rounded-2xl border border-interagro-border bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-soft">
      {showToast ? (
        <div className="absolute left-3 right-3 top-3 z-10 rounded-2xl border border-green-200 bg-white p-3 shadow-soft">
          <p className="flex items-center gap-2 text-sm font-bold text-green-800">
            <CheckCircle size={18} />
            Producto agregado a tu solicitud
          </p>
          <Link className="mt-1 inline-flex text-sm font-bold text-interagro-red" href="/solicitud">
            Ver solicitud
          </Link>
        </div>
      ) : null}
      <Link href={`/producto/${product.slug}`} className="relative block aspect-[4/3] overflow-hidden">
        <ProductImage product={product} />
      </Link>
      <div className="space-y-4 p-4">
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-bold text-interagro-muted">{product.category}</span>
            {orderItem ? (
              <span className="flex items-center gap-1 rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-interagro-red">
                <CheckCircle size={14} />
                En solicitud
              </span>
            ) : (
              <ProductStatusBadge status={product.status} />
            )}
          </div>
          <Link href={`/producto/${product.slug}`}>
            <h2 className="mt-3 text-xl font-bold text-interagro-text">{product.name}</h2>
          </Link>
          <div className="mt-3 flex flex-wrap gap-2">
            <ConservationBadge value={product.conservation} />
            <span className="rounded-full border border-interagro-border bg-interagro-bg px-3 py-1 text-xs font-bold text-interagro-muted">
              {product.format}
            </span>
          </div>
          <div className="mt-3">
            <ProductCommercialGrid product={product} compact />
          </div>
          {product.observation ? <p className="mt-3 text-sm leading-6 text-interagro-muted">{product.observation}</p> : null}
        </div>
        <div className="grid gap-2">
          {orderItem ? (
            <div className="flex items-center justify-between rounded-xl bg-red-50 p-3">
              <span className="flex items-center gap-2 text-sm font-bold text-interagro-red">
                <ShoppingBag size={18} />
                Agregado
              </span>
              <QuantitySelector
                quantity={orderItem.quantity}
                onIncrease={() => increaseItem(product.id)}
                onDecrease={() => decreaseItem(product.id)}
              />
            </div>
          ) : (
            <Button onClick={handleAddProduct} className="w-full">
              <Plus size={20} />
              Agregar a solicitud
            </Button>
          )}
          <LinkButton href={whatsAppLink} target="_blank" variant="secondary" className="w-full">
            <MessageCircle size={20} />
            Consultar por WhatsApp
          </LinkButton>
        </div>
      </div>
    </article>
  );
}
