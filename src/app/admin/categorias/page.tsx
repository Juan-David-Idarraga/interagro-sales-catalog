import { Layers } from "lucide-react";
import { PageTitle } from "@/components/ui/page-title";
import { BackButton } from "@/components/ui/back-button";
import { categories } from "@/lib/mock-data";
import { LogoutButton } from "@/components/auth/logout-button";

export default function AdminCategoriesPage() {
  return (
    <div className="space-y-5">
      <PageTitle
        eyebrow="Admin"
        title="Categorias"
        description="Gestion basica mockeada para ordenar productos del catalogo."
        action={
          <div className="flex flex-wrap gap-2">
            <BackButton href="/admin" label="Volver al admin" />
            <LogoutButton />
          </div>
        }
      />
      <div className="grid gap-3 sm:grid-cols-2">
        {categories.map((category) => (
          <article key={category.id} className="rounded-2xl border border-interagro-border bg-white p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-interagro-green">
                <Layers size={22} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-interagro-text">{category.name}</h2>
                <p className="text-sm text-interagro-muted">{category.slug}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
