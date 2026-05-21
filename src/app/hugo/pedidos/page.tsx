import { OrderCard } from "@/components/orders/order-card";
import { PageTitle } from "@/components/ui/page-title";
import { BackButton } from "@/components/ui/back-button";
import { orders } from "@/lib/mock-data";
import { LogoutButton } from "@/components/auth/logout-button";

export default function HugoOrdersPage() {
  return (
    <div className="space-y-5">
      <PageTitle
        eyebrow="Panel Hugo"
        title="Pedidos recibidos"
        description="Cada pedido aparece como solicitud pendiente hasta que Hugo confirme disponibilidad."
        action={
          <div className="flex flex-wrap gap-2">
            <BackButton href="/hugo" label="Volver al panel" />
            <LogoutButton />
          </div>
        }
      />
      <div className="grid gap-4 lg:grid-cols-2">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}
