import { notFound } from "next/navigation";
import { OrderDetailActions } from "@/components/orders/order-detail-actions";
import { orders } from "@/lib/mock-data";
import { formatDate } from "@/lib/order-utils";
import { LogoutButton } from "@/components/auth/logout-button";
import { BackButton } from "@/components/ui/back-button";

type HugoOrderDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function HugoOrderDetailPage({ params }: HugoOrderDetailPageProps) {
  const { id } = await params;
  const order = orders.find((item) => item.id === id);

  if (!order) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <BackButton href="/hugo/pedidos" label="Volver a pedidos" />
        <LogoutButton />
      </div>
      <OrderDetailActions order={order} />

      <section className="rounded-2xl border border-interagro-border bg-white p-5 shadow-sm">
        <h2 className="text-xl font-bold text-interagro-text">Datos del cliente</h2>
        <div className="mt-3 grid gap-2 text-interagro-muted sm:grid-cols-2">
          <p>Negocio: {order.customer.businessName}</p>
          <p>Contacto: {order.customer.contactName}</p>
          <p>Telefono: {order.customer.phone}</p>
          <p>Comuna: {order.customer.commune}</p>
          <p className="sm:col-span-2">Direccion: {order.customer.address}</p>
        </div>
      </section>

      <section className="rounded-2xl border border-green-200 bg-green-50 p-5 shadow-sm">
        <h2 className="text-xl font-bold text-green-900">Fecha deseada del pedido</h2>
        <div className="mt-3 grid gap-2 text-green-800 sm:grid-cols-2">
          <p>Fecha: {formatDate(order.desiredDate)}</p>
          <p>Horario preferido: {order.desiredTimeRange}</p>
        </div>
      </section>

      <section className="rounded-2xl border border-interagro-border bg-white p-5 shadow-sm">
        <h2 className="text-xl font-bold text-interagro-text">Productos solicitados</h2>
        <div className="mt-4 space-y-3">
          {order.items.map((item) => (
            <div key={item.id} className="rounded-xl bg-interagro-bg p-4">
              <div className="flex justify-between gap-3">
                <div>
                  <p className="font-bold text-interagro-text">{item.productName}</p>
                  <div className="mt-2 grid gap-2 text-sm text-interagro-muted sm:grid-cols-2">
                    <p>Formato: {item.format}</p>
                    <p>Conservacion: {item.conservation}</p>
                    <p>Codigo: {item.code}</p>
                    <p>Precio: {item.price}</p>
                  </div>
                  {item.observation ? <p className="mt-2 text-sm text-interagro-muted">{item.observation}</p> : null}
                </div>
                <p className="text-lg font-bold text-interagro-red">x {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-interagro-border bg-white p-5 shadow-sm">
        <h2 className="text-xl font-bold text-interagro-text">Comentario</h2>
        <p className="mt-2 text-interagro-muted">{order.comment || "Sin comentario adicional."}</p>
      </section>
    </div>
  );
}
