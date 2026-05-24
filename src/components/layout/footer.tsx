import { MapPin, Phone } from "lucide-react";
import { InteragroLogo } from "./interagro-logo";

export function Footer() {
  return (
    <footer className="border-t border-interagro-border bg-white">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:grid-cols-[1fr_1.4fr] sm:items-center">
        <div>
          <InteragroLogo className="w-40" />
          <p className="mt-3 text-sm text-interagro-muted">Catálogo digital Interagro con atención directa de Hugo Idarraga.</p>
        </div>
        <div className="grid gap-3 text-sm text-interagro-muted sm:grid-cols-2">
          <p className="flex items-center gap-2">
            <MapPin size={18} className="text-interagro-red" />
            Kennedy 3781, Rancagua, O&apos;Higgins
          </p>
          <p className="flex items-center gap-2">
            <Phone size={18} className="text-interagro-green" />
            +56 9 3718 1027
          </p>
        </div>
      </div>
    </footer>
  );
}
