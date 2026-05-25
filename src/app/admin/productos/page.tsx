import { AdminProductForm } from "@/components/admin/admin-product-form";
import { PageTitle } from "@/components/ui/page-title";
import { BackButton } from "@/components/ui/back-button";
import { categories } from "@/lib/mock-data";
import { getAdminProducts } from "@/lib/services/products";
import { LogoutButton } from "@/components/auth/logout-button";

export default async function AdminProductsPage() {
  const { products, isDemoMode } = await getAdminProducts();

  return (
    <div className="space-y-5">
      <PageTitle
        eyebrow="Admin"
        title="Gestionar productos"
        description="Cambia precios, revisa datos comerciales y controla que productos se ven en el catalogo."
        action={
          <div className="flex flex-wrap gap-2">
            <BackButton href="/admin" label="Volver al admin" />
            <LogoutButton />
          </div>
        }
      />
      <AdminProductForm products={products} categories={categories} isDemoMode={isDemoMode} />
    </div>
  );
}
