import { AdminProductForm } from "@/components/admin/admin-product-form";
import { PageTitle } from "@/components/ui/page-title";
import { BackButton } from "@/components/ui/back-button";
import { products } from "@/lib/mock-data";
import { LogoutButton } from "@/components/auth/logout-button";

export default function AdminProductsPage() {
  return (
    <div className="space-y-5">
      <PageTitle
        eyebrow="Admin"
        title="Productos"
        description="CRUD simple mockeado. La estructura esta lista para reemplazar por Supabase."
        action={
          <div className="flex flex-wrap gap-2">
            <BackButton href="/admin" label="Volver al admin" />
            <LogoutButton />
          </div>
        }
      />
      <AdminProductForm products={products} />
    </div>
  );
}
