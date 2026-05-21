import { Boxes, ImageIcon, Layers } from "lucide-react";
import { InteragroLogo } from "@/components/layout/interagro-logo";
import { LinkButton } from "@/components/ui/button";
import { LogoutButton } from "@/components/auth/logout-button";

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-interagro-border bg-white p-5 shadow-soft">
        <div className="flex items-start justify-between gap-3">
          <InteragroLogo className="w-44" />
          <LogoutButton />
        </div>
        <p className="mt-5 text-sm font-bold uppercase text-interagro-red">Panel técnico</p>
        <h1 className="mt-2 text-3xl font-bold text-interagro-text">Administración para Juan</h1>
        <p className="mt-2 text-interagro-muted">Espacio simple para mantener productos, categorías, imágenes y estados.</p>
      </section>
      <section className="grid gap-3 sm:grid-cols-3">
        <LinkButton href="/admin/productos" size="lg" className="w-full justify-start">
          <Boxes size={22} />
          Productos
        </LinkButton>
        <LinkButton href="/admin/categorias" size="lg" variant="secondary" className="w-full justify-start">
          <Layers size={22} />
          Categorías
        </LinkButton>
        <LinkButton href="/admin/productos" size="lg" variant="secondary" className="w-full justify-start">
          <ImageIcon size={22} />
          Imágenes
        </LinkButton>
      </section>
    </div>
  );
}
