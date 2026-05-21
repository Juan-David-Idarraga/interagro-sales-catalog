import { MessageCircle } from "lucide-react";
import type { Customer } from "@/lib/types";
import { createWhatsAppLink } from "@/lib/whatsapp";
import { LinkButton } from "@/components/ui/button";

export function CustomerCard({ customer, lastOrder }: { customer: Customer; lastOrder?: string }) {
  const link = createWhatsAppLink(customer.phone, `Hola ${customer.contactName}, soy Hugo de Interagro. Queria contactarte por el catalogo digital.`);

  return (
    <article className="rounded-2xl border border-interagro-border bg-white p-4 shadow-sm">
      <h2 className="text-xl font-bold text-interagro-text">{customer.businessName}</h2>
      <div className="mt-3 space-y-1 text-sm text-interagro-muted">
        <p>Contacto: {customer.contactName}</p>
        <p>Teléfono: {customer.phone}</p>
        <p>Comuna: {customer.commune}</p>
        <p>Último pedido: {lastOrder || "Sin pedidos recientes"}</p>
      </div>
      <LinkButton href={link} target="_blank" variant="secondary" className="mt-4 w-full">
        <MessageCircle size={20} />
        Hablar por WhatsApp
      </LinkButton>
    </article>
  );
}
