import { CustomerCard } from "@/components/customers/customer-card";
import { PageTitle } from "@/components/ui/page-title";
import { BackButton } from "@/components/ui/back-button";
import { customers, orders } from "@/lib/mock-data";
import { LogoutButton } from "@/components/auth/logout-button";

export default function HugoCustomersPage() {
  return (
    <div className="space-y-5">
      <PageTitle
        eyebrow="Clientes"
        title="Mis clientes"
        description="Listado simple para contactar negocios por WhatsApp."
        action={
          <div className="flex flex-wrap gap-2">
            <BackButton href="/hugo" label="Volver al panel" />
            <LogoutButton />
          </div>
        }
      />
      <div className="grid gap-4 lg:grid-cols-2">
        {customers.map((customer) => {
          const lastOrder = orders.find((order) => order.customer.id === customer.id);
          return <CustomerCard key={customer.id} customer={customer} lastOrder={lastOrder?.code} />;
        })}
      </div>
    </div>
  );
}
