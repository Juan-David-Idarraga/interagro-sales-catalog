import { CheckCircle, Snowflake, Thermometer, HelpCircle, Sun, Tag, DollarSign, Package } from "lucide-react";
import type { Product, ProductStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

const conservationStyles: Record<string, string> = {
  Congelado: "bg-blue-50 text-blue-800 border-blue-100",
  Refrigerado: "bg-green-50 text-green-800 border-green-100",
  Ambiente: "bg-orange-50 text-orange-800 border-orange-100",
  Consultar: "bg-gray-100 text-gray-700 border-gray-200",
};

const statusStyles: Record<ProductStatus, string> = {
  available: "bg-green-50 text-green-800 border-green-100",
  ask: "bg-yellow-50 text-yellow-800 border-yellow-100",
};

export function ConservationBadge({ value }: { value: string }) {
  const Icon = value === "Congelado" ? Snowflake : value === "Refrigerado" ? Thermometer : value === "Ambiente" ? Sun : HelpCircle;

  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-bold", conservationStyles[value] || conservationStyles.Consultar)}>
      <Icon size={14} />
      {value}
    </span>
  );
}

export function ProductStatusBadge({ status }: { status: ProductStatus }) {
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-bold", statusStyles[status])}>
      <CheckCircle size={14} />
      {status === "available" ? "Disponible" : "Consultar disponibilidad"}
    </span>
  );
}

export function ProductCommercialGrid({ product, compact = false }: { product: Product; compact?: boolean }) {
  const items = [
    { label: "Categoria", value: product.category, icon: <Tag size={16} /> },
    { label: "Formato", value: product.format, icon: <Package size={16} /> },
    { label: "Precio", value: product.price, icon: <DollarSign size={16} /> },
  ];

  return (
    <div className={cn("grid gap-2", compact ? "text-xs" : "text-sm sm:grid-cols-3")}>
      {items.map((item) => (
        <div key={item.label} className="rounded-xl border border-interagro-border bg-interagro-bg p-3">
          <p className="flex items-center gap-1 font-bold text-interagro-muted">
            {item.icon}
            {item.label}
          </p>
          <p className="mt-1 font-bold text-interagro-text">{item.value}</p>
        </div>
      ))}
    </div>
  );
}
