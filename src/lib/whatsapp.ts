import type { Order } from "./types";

export const HUGO_PHONE = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "56974464827";

export function cleanPhoneNumber(phone: string): string {
  return phone.replace(/\D/g, "");
}

export function createWhatsAppLink(phone: string, message: string): string {
  return `https://wa.me/${cleanPhoneNumber(phone)}?text=${encodeURIComponent(message)}`;
}

export function buildOrderWhatsAppMessage(order: Order): string {
  const products = order.items
    .map(
      (item) => `- ${item.productName} x ${item.quantity}
  Formato: ${item.format}
  Conservacion: ${item.conservation}
  Codigo: ${item.code}
  Precio: ${item.price}`,
    )
    .join("\n");

  return `Hola Hugo, soy ${order.customer.contactName} del negocio ${order.customer.businessName}.
Quiero realizar una solicitud de productos desde tu catalogo digital Interagro.

Codigo de solicitud: ${order.code}

Productos solicitados:
${products}

Fecha deseada:
${order.desiredDate}

Horario preferido:
${order.desiredTimeRange}

Datos del negocio:
Telefono: ${order.customer.phone}
Comuna: ${order.customer.commune}
Direccion: ${order.customer.address}

Comentario:
${order.comment || "Sin comentario adicional"}

Quedo atento/a a confirmacion de disponibilidad. Gracias.`;
}

export function buildQuickProductMessage(productName: string): string {
  return `Hola Hugo, quisiera consultar disponibilidad de ${productName} del catalogo Interagro.`;
}

export function buildShareCatalogMessage(catalogUrl: string): string {
  return `Hola, te comparto mi catalogo digital de productos Interagro. Puedes revisar productos y enviar tu solicitud directamente aqui:
${catalogUrl}`;
}
