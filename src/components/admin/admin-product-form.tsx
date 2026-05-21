"use client";

import { useState } from "react";
import { Plus, Save } from "lucide-react";
import { z } from "zod";
import type { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";

const adminProductSchema = z.object({
  name: z.string().min(2, "Nombre obligatorio."),
  description: z.string().optional(),
  category: z.string().min(1, "Categoria obligatoria."),
  format: z.string().min(1, "Formato obligatorio."),
  conservation: z.enum(["Congelado", "Refrigerado", "Ambiente", "Consultar"]),
  code: z.string().optional(),
  price: z.string().default("Consultar"),
  observation: z.string().optional(),
  imageUrl: z.string().optional(),
  status: z.enum(["available", "ask"]),
  isActive: z.boolean(),
  featured: z.boolean(),
});

const inputClass = "min-h-12 rounded-xl border border-interagro-border px-4 outline-none focus:border-interagro-red";

export function AdminProductForm({ products }: { products: Product[] }) {
  const [localProducts, setLocalProducts] = useState(products);
  const [error, setError] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const parsed = adminProductSchema.safeParse({
      name: formData.get("name"),
      description: formData.get("description"),
      category: formData.get("category"),
      format: formData.get("format"),
      conservation: formData.get("conservation"),
      code: formData.get("code"),
      price: formData.get("price") || "Consultar",
      observation: formData.get("observation"),
      imageUrl: formData.get("imageUrl"),
      status: formData.get("status"),
      isActive: formData.get("isActive") === "on",
      featured: formData.get("featured") === "on",
    });

    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message || "Revisa los datos del producto.");
      return;
    }

    setError("");
    const now = new Date().toISOString();
    const slug = parsed.data.name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const product: Product = {
      id: `mock-${Date.now()}`,
      slug,
      name: parsed.data.name,
      description: parsed.data.description || "Producto disponible para solicitud comercial.",
      category: parsed.data.category,
      format: parsed.data.format,
      conservation: parsed.data.conservation as Product["conservation"],
      code: parsed.data.code || "Consultar codigo",
      price: parsed.data.price || "Consultar",
      observation: parsed.data.observation || "Consultar disponibilidad directamente con Hugo.",
      imageUrl: parsed.data.imageUrl || undefined,
      status: parsed.data.status,
      isActive: parsed.data.isActive,
      featured: parsed.data.featured,
      createdAt: now,
      updatedAt: now,
    };

    setLocalProducts((current) => [product, ...current]);
    event.currentTarget.reset();
  }

  return (
    <div className="space-y-5">
      <form onSubmit={handleSubmit} className="rounded-2xl border border-interagro-border bg-white p-4 shadow-sm">
        <h2 className="text-xl font-bold text-interagro-text">Nuevo producto</h2>
        <p className="mt-1 text-sm text-interagro-muted">Formulario mock listo para conectar con Supabase.</p>
        {error ? <p className="mt-3 rounded-xl bg-red-50 p-3 text-sm font-bold text-red-700">{error}</p> : null}
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <input name="name" className={inputClass} placeholder="Nombre del producto" />
          <input name="category" className={inputClass} placeholder="Categoria" />
          <input name="format" className={inputClass} placeholder="Formato: Caja, Bolsa, Kg..." />
          <select name="conservation" className={inputClass} defaultValue="Congelado">
            <option>Congelado</option>
            <option>Refrigerado</option>
            <option>Ambiente</option>
            <option>Consultar</option>
          </select>
          <input name="code" className={inputClass} placeholder="Codigo interno" />
          <input name="price" className={inputClass} placeholder="Precio" defaultValue="Consultar" />
          <input name="imageUrl" className={inputClass} placeholder="/images/productos/producto.png" />
          <select name="status" className={inputClass} defaultValue="available">
            <option value="available">Disponible</option>
            <option value="ask">Consultar disponibilidad</option>
          </select>
          <textarea name="description" className={`${inputClass} min-h-24 sm:col-span-2`} placeholder="Descripcion comercial" />
          <textarea name="observation" className={`${inputClass} min-h-24 sm:col-span-2`} placeholder="Observacion comercial" />
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <label className="flex min-h-12 items-center gap-3 rounded-xl border border-interagro-border px-4 font-semibold text-interagro-text">
            <input name="isActive" type="checkbox" defaultChecked />
            Producto activo
          </label>
          <label className="flex min-h-12 items-center gap-3 rounded-xl border border-interagro-border px-4 font-semibold text-interagro-text">
            <input name="featured" type="checkbox" />
            Producto destacado
          </label>
        </div>
        <Button type="submit" className="mt-4 w-full sm:w-auto">
          <Plus size={20} />
          Agregar producto
        </Button>
      </form>
      <section className="space-y-3">
        {localProducts.map((product) => (
          <article key={product.id} className="rounded-2xl border border-interagro-border bg-white p-4 shadow-sm">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-bold text-interagro-text">{product.name}</h3>
                <p className="text-sm text-interagro-muted">
                  {product.category} · {product.format} · {product.conservation} · {product.price}
                </p>
                <p className="mt-1 text-sm text-interagro-muted">{product.observation}</p>
              </div>
              <Button variant="secondary">
                <Save size={18} />
                Guardar
              </Button>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
