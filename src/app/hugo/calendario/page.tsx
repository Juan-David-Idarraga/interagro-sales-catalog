import { OrderCalendarView } from "@/components/orders/order-calendar-view";
import { PageTitle } from "@/components/ui/page-title";
import { BackButton } from "@/components/ui/back-button";
import { orders } from "@/lib/mock-data";
import { LogoutButton } from "@/components/auth/logout-button";

export default function HugoCalendarPage() {
  return (
    <div className="space-y-5">
      <PageTitle
        eyebrow="Panel Hugo"
        title="Calendario de pedidos"
        description="Solicitudes agrupadas por fecha deseada para revisar pendientes y confirmados sin complicarse."
        action={
          <div className="flex flex-wrap gap-2">
            <BackButton href="/hugo" label="Volver al panel" />
            <LogoutButton />
          </div>
        }
      />
      <OrderCalendarView orders={orders} />
    </div>
  );
}
