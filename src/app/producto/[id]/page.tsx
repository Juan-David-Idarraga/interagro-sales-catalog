import { notFound } from "next/navigation";
import { ProductCard } from "@/components/catalog/product-card";
import { ProductImage } from "@/components/catalog/product-image";
import { ConservationBadge, ProductCommercialGrid, ProductStatusBadge } from "@/components/catalog/product-badges";
import { ProductDetailActions } from "@/components/catalog/product-detail-actions";
import { BackButton } from "@/components/ui/back-button";
import { products } from "@/lib/mock-data";

type ProductDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params;
  const product = products.find((item) => item.slug === id || item.id === id);

  if (!product) {
    notFound();
  }

  const related = products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 3);

  return (
    <div className="space-y-8">
      <BackButton href="/catalogo" label="Volver al catalogo" />
      <section className="grid gap-6 rounded-3xl border border-interagro-border bg-white p-4 shadow-soft md:grid-cols-2 md:p-6">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-interagro-border">
          <ProductImage product={product} />
        </div>
        <div className="flex flex-col justify-center">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-red-50 px-3 py-1 text-sm font-bold text-interagro-red">{product.category}</span>
            <ConservationBadge value={product.conservation} />
            <ProductStatusBadge status={product.status} />
          </div>
          <h1 className="mt-4 text-3xl font-bold text-interagro-text sm:text-4xl">{product.name}</h1>
          <p className="mt-3 text-lg leading-8 text-interagro-muted">{product.description}</p>

          <div className="mt-5 rounded-2xl bg-interagro-bg p-4">
            <ProductCommercialGrid product={product} />
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <InfoBlock label="Codigo" value={product.code} />
              <InfoBlock label="Observacion" value={product.observation || "Consultar disponibilidad directamente con Hugo."} />
            </div>
          </div>

          <ProductDetailActions product={product} />
        </div>
      </section>
      {related.length > 0 ? (
        <section>
          <h2 className="text-2xl font-bold text-interagro-text">Tambien puede servirte</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}

function InfoBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-interagro-border bg-white p-3">
      <p className="text-xs font-bold uppercase text-interagro-muted">{label}</p>
      <p className="mt-1 text-sm font-bold text-interagro-text">{value}</p>
    </div>
  );
}
