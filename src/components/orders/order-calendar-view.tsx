"use client";

import { useMemo, useState } from "react";
import { CalendarDays, Clock, MessageCircle, Package } from "lucide-react";
import type { Order, OrderStatus } from "@/lib/types";
import { buildOrderWhatsAppMessage, createWhatsAppLink } from "@/lib/whatsapp";
import { formatDate, getRelativeDateLabel } from "@/lib/order-utils";
import { LinkButton } from "@/components/ui/button";
import { OrderStatusBadge } from "./order-status-badge";
import { cn } from "@/lib/utils";

const filters: Array<{ label: string; value: "all" | OrderStatus }> = [
  { label: "Todos", value: "all" },
  { label: "Pendientes", value: "pending" },
  { label: "Confirmados", value: "confirmed" },
  { label: "Entregados", value: "delivered" },
];

export function OrderCalendarView({ orders }: { orders: Order[] }) {
  const [filter, setFilter] = useState<"all" | OrderStatus>("all");

  const groupedOrders = useMemo(() => {
    const filteredOrders = orders
      .filter((order) => filter === "all" || order.status === filter)
      .sort((a, b) => a.desiredDate.localeCompare(b.desiredDate));

    return filteredOrders.reduce<Record<string, Order[]>>((groups, order) => {
      groups[order.desiredDate] = [...(groups[order.desiredDate] || []), order];
      return groups;
    }, {});
  }, [orders, filter]);

  return (
    <div className="space-y-5">
      <div className="flex gap-2 overflow-x-auto pb-1">
        {filters.map((item) => (
          <button
            key={item.value}
            className={cn(
              "min-h-11 shrink-0 rounded-full border px-4 text-sm font-bold",
              filter === item.value
                ? "border-interagro-red bg-interagro-red text-white"
                : "border-interagro-border bg-white text-interagro-muted",
            )}
            onClick={() => setFilter(item.value)}
          >
            {item.label}
          </button>
        ))}
      </div>

      {Object.entries(groupedOrders).map(([date, dayOrders]) => (
        <section key={date} className="rounded-3xl border border-interagro-border bg-white p-4 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-interagro-red">
              <CalendarDays size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-interagro-text">{getRelativeDateLabel(date)}</h2>
              <p className="text-sm text-interagro-muted">{dayOrders.length} solicitudes programadas</p>
            </div>
          </div>

          <div className="space-y-3">
            {dayOrders.map((order) => {
              const whatsappLink = createWhatsAppLink(order.customer.phone, buildOrderWhatsAppMessage(order));

              return (
                <article key={order.id} className="rounded-2xl border border-interagro-border bg-interagro-bg p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-bold text-interagro-text">{order.code}</p>
                      <p className="mt-1 text-sm text-interagro-muted">{order.customer.businessName}</p>
                      <p className="text-sm text-interagro-muted">
                        {order.customer.contactName} · {order.customer.phone}
                      </p>
                    </div>
                    <OrderStatusBadge status={order.status} />
                  </div>
                  <div className="mt-3 grid gap-2 text-sm text-interagro-muted sm:grid-cols-3">
                    <p className="flex items-center gap-2">
                      <CalendarDays size={17} className="text-interagro-red" />
                      {formatDate(order.desiredDate)}
                    </p>
                    <p className="flex items-center gap-2">
                      <Clock size={17} className="text-interagro-red" />
                      {order.desiredTimeRange}
                    </p>
                    <p className="flex items-center gap-2">
                      <Package size={17} className="text-interagro-green" />
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
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
