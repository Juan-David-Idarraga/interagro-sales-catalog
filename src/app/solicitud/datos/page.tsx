import { CustomerForm } from "@/components/orders/customer-form";
import { PageTitle } from "@/components/ui/page-title";
import { BackButton } from "@/components/ui/back-button";

export default function RequestDataPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <PageTitle
        eyebrow="Datos del negocio"
        title="A quien debe responder Hugo?"
        description="Completa estos datos para que Hugo pueda confirmar disponibilidad y coordinar por WhatsApp."
        action={<BackButton href="/solicitud" label="Volver a solicitud" />}
      />
      <CustomerForm />
    </div>
  );
}
