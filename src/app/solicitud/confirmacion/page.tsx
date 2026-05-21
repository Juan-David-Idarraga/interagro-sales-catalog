"use client";

import { CheckCircle, MessageCircle, RotateCcw } from "lucide-react";
import { LinkButton } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { BackButton } from "@/components/ui/back-button";
import { buildOrderWhatsAppMessage, createWhatsAppLink, HUGO_PHONE } from "@/lib/whatsapp";
import { useOrderStore } from "@/store/use-order-store";
import { formatDate } from "@/lib/order-utils";

export default function ConfirmationPage() {
  const order = useOrderStore((state) => state.currentOrder);

  if (!order) {
    return (
      <EmptyState
        title="No hay una solicitud reciente"
        description="Arma una solicitud desde el catalogo para generar tu codigo."
        action={<LinkButton href="/catalogo">Ver catalogo</LinkButton>}
      />
    );
  }

  const whatsappLink = createWhatsAppLink(HUGO_PHONE, buildOrderWhatsAppMessage(order));

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <div className="flex flex-wrap gap-2">
        <BackButton href="/catalogo" label="Volver al catalogo" />
        <LinkButton href="/catalogo" variant="secondary">
          <RotateCcw size={18} />
          Crear nueva solicitud
        </LinkButton>
      </div>
      <section className="rounded-3xl border border-green-200 bg-white p-6 text-center shadow-soft">
        <CheckCircle className="mx-auto text-interagro-green" size={54} />
        <p className="mt-4 text-sm font-bold uppercase text-interagro-green">Solicitud generada</p>
        <h1 className="mt-2 text-3xl font-bold text-interagro-text">{order.code}</h1>
        <p className="mt-3 text-interagro-muted">
          Tu solicitud fue generada correctamente. Hugo revisara disponibilidad y confirmara el pedido por WhatsApp.
        </p>
        <LinkButton href={whatsappLink} target="_blank" size="lg" className="mt-6 w-full">
          <MessageCircle size={22} />
          Enviar por WhatsApp
        </LinkButton>
      </section>
      <section className="rounded-2xl border border-interagro-border bg-white p-5">
        <h2 className="text-xl font-bold text-interagro-text">Resumen</h2>
        <div className="mt-4 space-y-3">
          <div className="rounded-xl bg-green-50 p-4 text-sm text-green-900">
            <p className="font-bold">Fecha deseada: {formatDate(order.desiredDate)}</p>
            <p>Horario preferido: {order.desiredTimeRange}</p>
          </div>
          {order.items.map((item) => (
            <div key={item.id} className="border-b border-interagro-border pb-3 text-sm">
              <div className="flex justify-between gap-3">
                <span className="font-semibold text-interagro-text">{item.productName}</span>
                <span className="text-interagro-muted">x {item.quantity}</span>
              </div>
              <div className="mt-2 grid gap-1 text-xs text-interagro-muted sm:grid-cols-2">
                <p>Formato: {item.format}</p>
                <p>Conservacion: {item.conservation}</p>
                <p>Codigo: {item.code}</p>
                <p>Precio: {item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
