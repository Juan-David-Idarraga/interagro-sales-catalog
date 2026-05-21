"use client";

import { useState } from "react";
import { CheckCircle, MessageCircle, PackageCheck, XCircle } from "lucide-react";
import { Button, LinkButton } from "@/components/ui/button";
import { OrderStatusBadge } from "@/components/orders/order-status-badge";
import type { Order, OrderStatus } from "@/lib/types";
import { buildOrderWhatsAppMessage, createWhatsAppLink } from "@/lib/whatsapp";

export function OrderDetailActions({ order }: { order: Order }) {
  const [status, setStatus] = useState<OrderStatus>(order.status);
  const whatsappLink = createWhatsAppLink(order.customer.phone, buildOrderWhatsAppMessage({ ...order, status }));

  return (
    <>
      <section className="rounded-3xl border border-interagro-border bg-white p-5 shadow-soft">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-bold uppercase text-interagro-red">Detalle de pedido</p>
            <h1 className="mt-1 text-3xl font-bold text-interagro-text">{order.code}</h1>
          </div>
          <OrderStatusBadge status={status} />
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2">
        <Button size="lg" variant="success" onClick={() => setStatus("confirmed")}>
          <CheckCircle size={22} />
          Confirmar pedido
        </Button>
        <LinkButton href={whatsappLink} target="_blank" size="lg" variant="secondary">
          <MessageCircle size={22} />
          Hablar por WhatsApp
        </LinkButton>
        <Button size="lg" variant="danger" onClick={() => setStatus("rejected")}>
          <XCircle size={22} />
          Rechazar pedido
        </Button>
        <Button size="lg" variant="secondary" onClick={() => setStatus("delivered")}>
          <PackageCheck size={22} />
          Marcar como entregado
        </Button>
      </section>
    </>
  );
}
