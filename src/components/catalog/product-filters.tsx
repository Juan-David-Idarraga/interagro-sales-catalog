"use client";

import { Search } from "lucide-react";
import type { Category } from "@/lib/types";
import { cn } from "@/lib/utils";

type ProductFiltersProps = {
  categories: Category[];
  query: string;
  selectedCategory: string;
  onQueryChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
};

export function ProductFilters({ categories, query, selectedCategory, onQueryChange, onCategoryChange }: ProductFiltersProps) {
  return (
    <section className="rounded-2xl border border-interagro-border bg-white p-4 shadow-sm">
      <label className="text-sm font-bold text-interagro-text" htmlFor="search-products">
        Buscar producto
      </label>
      <div className="relative mt-2">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-interagro-muted" size={20} />
        <input
          id="search-products"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Ej: pollo, papas, longanizas"
          className="min-h-12 w-full rounded-xl border border-interagro-border bg-white py-3 pl-12 pr-4 outline-none focus:border-interagro-red"
        />
      </div>
      <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
        <button
          className={cn(
            "min-h-11 shrink-0 rounded-full border px-4 text-sm font-bold",
            selectedCategory === "todos"
              ? "border-interagro-red bg-interagro-red text-white"
              : "border-interagro-border bg-white text-interagro-muted",
          )}
          onClick={() => onCategoryChange("todos")}
        >
          Todos
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            className={cn(
              "min-h-11 shrink-0 rounded-full border px-4 text-sm font-bold",
              selectedCategory === category.name
                ? "border-interagro-red bg-interagro-red text-white"
                : "border-interagro-border bg-white text-interagro-muted",
            )}
            onClick={() => onCategoryChange(category.name)}
          >
            {category.name}
          </button>
        ))}
      </div>
    </section>
  );
}
