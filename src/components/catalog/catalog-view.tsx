"use client";

import { useMemo, useState } from "react";
import type { Category, Product } from "@/lib/types";
import { EmptyState } from "@/components/ui/empty-state";
import { ProductCard } from "./product-card";
import { ProductFilters } from "./product-filters";

type CatalogViewProps = {
  products: Product[];
  categories: Category[];
};

export function CatalogView({ products, categories }: CatalogViewProps) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("todos");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesQuery = product.name.toLowerCase().includes(query.toLowerCase().trim());
      const matchesCategory = selectedCategory === "todos" || product.category === selectedCategory;
      return product.isActive && matchesQuery && matchesCategory;
    });
  }, [products, query, selectedCategory]);

  return (
    <div className="space-y-5">
      <ProductFilters
        categories={categories}
        query={query}
        selectedCategory={selectedCategory}
        onQueryChange={setQuery}
        onCategoryChange={setSelectedCategory}
      />
      {filteredProducts.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <EmptyState title="No encontramos productos" description="Prueba con otra busqueda o selecciona otra categoria." />
      )}
    </div>
  );
}
