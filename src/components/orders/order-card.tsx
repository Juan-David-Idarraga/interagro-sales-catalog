import { CalendarDays, Clock, MessageCircle, Package } from "lucide-react";
import type { Order } from "@/lib/types";
import { buildOrderWhatsAppMessage, createWhatsAppLink, HUGO_PHONE } from "@/lib/whatsapp";
import { LinkButton } from "@/components/ui/button";
import { OrderStatusBadge } from "./order-status-badge";
import { formatDate } from "@/lib/order-utils";

export function OrderCard({ order }: { order: Order }) {
  const whatsappLink = createWhatsAppLink(order.customer.phone || HUGO_PHONE, buildOrderWhatsAppMessage(order));

  return (
    <article className="rounded-2xl border border-interagro-border bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-bold text-interagro-text">{order.code}</h2>
        <OrderStatusBadge status={order.status} />
      </div>
      <div className="mt-4 space-y-2 text-sm text-interagro-muted">
        <p className="text-base font-bold text-interagro-text">{order.customer.businessName}</p>
        <p>{order.customer.contactName}</p>
        <p className="flex items-center gap-2">
          <CalendarDays size={18} className="text-interagro-red" />
          Pedido deseado: {formatDate(order.desiredDate)}
        </p>
        <p className="flex items-center gap-2">
          <Clock size={18} className="text-interagro-red" />
          {order.desiredTimeRange}
        </p>
        <p className="flex items-center gap-2">
          <Package size={18} className="text-interagro-green" />
          {order.items.length} productos
        </p>
      </div>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <LinkButton href={`/hugo/pedidos/${order.id}`} className="w-full">
          Ver pedido
        </LinkButton>
        <LinkButton href={whatsappLink} target="_blank" variant="secondary" className="w-full">
          <MessageCircle size={20} />
          Hablar por WhatsApp
        </LinkButton>
      </div>
    </article>
  );
}
