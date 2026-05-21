import { CatalogView } from "@/components/catalog/catalog-view";
import { PageTitle } from "@/components/ui/page-title";
import { BackButton } from "@/components/ui/back-button";
import { categories, products } from "@/lib/mock-data";

export default function CatalogPage() {
  return (
    <div className="space-y-5">
      <PageTitle
        eyebrow="Catalogo Interagro"
        title="Productos para tu negocio"
        description="Busca productos, revisa datos comerciales y arma una solicitud. Hugo confirmara disponibilidad por WhatsApp."
        action={<BackButton href="/" label="Volver al inicio" />}
      />
      <CatalogView products={products} categories={categories} />
    </div>
  );
}
