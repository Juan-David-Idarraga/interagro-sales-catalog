import Image from "next/image";
import { Package } from "lucide-react";
import type { Product } from "@/lib/types";

export function ProductImage({ product }: { product: Product }) {
  if (product.imageUrl) {
    return <Image src={product.imageUrl} alt={product.name} fill className="object-cover" />;
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-white via-red-50 to-green-50 p-5 text-center">
      <Package className="text-interagro-red" size={42} />
      <span className="mt-3 text-sm font-bold text-interagro-text">{product.category}</span>
      <span className="mt-1 text-xs text-interagro-muted">{product.format}</span>
    </div>
  );
}
