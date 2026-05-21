import { CartSummary } from "@/components/orders/cart-summary";
import { PageTitle } from "@/components/ui/page-title";
import { BackButton } from "@/components/ui/back-button";

export default function RequestPage() {
  return (
    <div className="space-y-5">
      <PageTitle
        eyebrow="Solicitud"
        title="Tu solicitud de pedido"
        description="Revisa los productos antes de enviar tu solicitud a Hugo."
        action={<BackButton href="/catalogo" label="Volver al catalogo" />}
      />
      <CartSummary />
    </div>
  );
}
