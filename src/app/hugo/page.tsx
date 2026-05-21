import { CalendarDays, ClipboardList, Share2, ShoppingBag, Users } from "lucide-react";
import type { ReactNode } from "react";
import { InteragroLogo } from "@/components/layout/interagro-logo";
import { LinkButton } from "@/components/ui/button";
import { orders, customers } from "@/lib/mock-data";
import { LogoutButton } from "@/components/auth/logout-button";

export default function HugoPage() {
  const pendingOrders = orders.filter((order) => order.status === "pending").length;
  const today = new Date().toISOString().split("T")[0];
  const pendingToday = orders.filter((order) => order.status === "pending" && order.desiredDate === today).length;
  const upcomingOrders = orders.filter((order) => order.status !== "delivered" && order.status !== "rejected").length;

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-interagro-border bg-white p-5 shadow-soft">
        <div className="flex items-start justify-between gap-3">
          <InteragroLogo className="w-44" />
          <LogoutButton />
        </div>
        <h1 className="mt-5 text-3xl font-bold text-interagro-text">Hola, Hugo 👋</h1>
        <p className="mt-2 text-interagro-muted">Panel simple para revisar solicitudes, clientes y compartir el catálogo.</p>
      </section>
      <section className="grid gap-3 sm:grid-cols-4">
        <SummaryCard label="Pedidos nuevos" value={pendingOrders} icon={<ClipboardList />} />
        <SummaryCard label="Clientes registrados" value={customers.length} icon={<Users />} />
        <SummaryCard label="Solicitudes pendientes" value={pendingOrders} icon={<ShoppingBag />} />
        <SummaryCard label="Pendientes de hoy" value={pendingToday} icon={<CalendarDays />} />
      </section>
      <section className="rounded-2xl border border-green-200 bg-green-50 p-4">
        <p className="text-sm font-bold text-green-900">Próximos pedidos</p>
        <p className="mt-1 text-2xl font-bold text-green-900">{upcomingOrders}</p>
        <p className="mt-1 text-sm text-green-800">Revisa el calendario para ordenar llamadas y confirmaciones.</p>
      </section>
      <section className="grid gap-3 sm:grid-cols-2">
        <LinkButton href="/hugo/pedidos" size="lg" className="w-full justify-start">
          <ClipboardList size={22} />
          Ver pedidos nuevos
        </LinkButton>
        <LinkButton href="/hugo/calendario" size="lg" variant="secondary" className="w-full justify-start">
          <CalendarDays size={22} />
          Ver calendario
        </LinkButton>
        <LinkButton href="/hugo/clientes" size="lg" variant="secondary" className="w-full justify-start">
          <Users size={22} />
          Mis clientes
        </LinkButton>
        <LinkButton href="/hugo/compartir" size="lg" variant="secondary" className="w-full justify-start">
          <Share2 size={22} />
          Compartir catálogo
        </LinkButton>
        <LinkButton href="/catalogo" size="lg" variant="secondary" className="w-full justify-start">
          <ShoppingBag size={22} />
          Ver catálogo
        </LinkButton>
      </section>
    </div>
  );
}

function SummaryCard({ label, value, icon }: { label: string; value: number; icon: ReactNode }) {
  return (
    <article className="rounded-2xl border border-interagro-border bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold text-interagro-muted">{label}</p>
        <div className="text-interagro-red">{icon}</div>
      </div>
      <p className="mt-2 text-3xl font-bold text-interagro-text">{value}</p>
    </article>
  );
}
