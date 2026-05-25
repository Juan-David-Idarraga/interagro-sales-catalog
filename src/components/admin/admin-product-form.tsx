"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { CheckCircle, Eye, EyeOff, Pencil, Save, Search } from "lucide-react";
import type { Category, Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { saveAdminProduct, type AdminProductInput } from "@/app/admin/productos/actions";

type AdminProductFormProps = {
  products: Product[];
  categories: Category[];
  isDemoMode: boolean;
};

type Notice = {
  type: "success" | "error" | "info";
  text: string;
};

const inputClass =
  "min-h-12 w-full rounded-xl border border-interagro-border bg-white px-4 py-3 outline-none focus:border-interagro-red";

const statusFilters = [
  { label: "Visibles", value: "visible" },
  { label: "Ocultos", value: "hidden" },
  { label: "Todos", value: "all" },
] as const;

export function AdminProductForm({ products, categories, isDemoMode }: AdminProductFormProps) {
  const [localProducts, setLocalProducts] = useState(products);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("todas");
  const [statusFilter, setStatusFilter] = useState<(typeof statusFilters)[number]["value"]>("visible");
  const [editingId, setEditingId] = useState<string | null>(products[0]?.id || null);
  const [notice, setNotice] = useState<Notice | null>(
    isDemoMode
      ? {
          type: "info",
          text: "Modo de prueba: puedes revisar y practicar cambios. Para guardarlos definitivamente, activa el modo conectado.",
        }
      : null,
  );
  const [fieldErrors, setFieldErrors] = useState<Record<string, Partial<Record<keyof AdminProductInput, string>>>>({});
  const [savingId, setSavingId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const filteredProducts = useMemo(() => {
    return localProducts.filter((product) => {
      const matchesQuery = product.name.toLowerCase().includes(query.trim().toLowerCase());
      const matchesCategory = category === "todas" || product.category === category;
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "visible" && product.isActive) ||
        (statusFilter === "hidden" && !product.isActive);

      return matchesQuery && matchesCategory && matchesStatus;
    });
  }, [category, localProducts, query, statusFilter]);

  function updateLocalProduct(input: AdminProductInput, savedProduct?: Product) {
    setLocalProducts((current) =>
      current.map((product) => {
        if (product.id !== input.id) return product;

        return {
          ...product,
          ...(savedProduct || {}),
          name: savedProduct?.name || input.name,
          description: savedProduct?.description || input.description || "Producto disponible para solicitud comercial.",
          category: savedProduct?.category || input.category,
          format: savedProduct?.format || input.format,
          conservation: savedProduct?.conservation || input.conservation,
          code: savedProduct?.code || input.code || "Consultar codigo",
          price: savedProduct?.price || input.price || "Consultar",
          observation: savedProduct?.observation || input.observation || "Consultar disponibilidad directamente con Hugo.",
          status: savedProduct?.status || input.status,
          isActive: savedProduct?.isActive ?? input.isActive,
          featured: savedProduct?.featured ?? input.featured,
          updatedAt: savedProduct?.updatedAt || new Date().toISOString(),
        };
      }),
    );
  }

  function handleSave(input: AdminProductInput) {
    setSavingId(input.id);
    setNotice(null);

    startTransition(async () => {
      const result = await saveAdminProduct(input);
      setSavingId(null);

      if (!result.ok) {
        setFieldErrors((current) => ({ ...current, [input.id]: result.fieldErrors || {} }));
        setNotice({ type: "error", text: result.message });
        return;
      }

      setFieldErrors((current) => ({ ...current, [input.id]: {} }));
      updateLocalProduct(input, result.product);
      setNotice({ type: result.isDemoMode ? "info" : "success", text: result.message });
    });
  }

  return (
    <div className="space-y-5">
      {notice ? <NoticeBox notice={notice} /> : null}

      <section className="rounded-2xl border border-interagro-border bg-white p-4 shadow-sm">
        <div className="grid gap-3 lg:grid-cols-[1.4fr_1fr_1fr]">
          <label className="block">
            <span className="mb-2 block text-sm font-bold text-interagro-text">Buscar producto</span>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-interagro-muted" size={20} />
              <input
                className={`${inputClass} pl-12`}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Ej: hamburguesa, papas, pollo"
              />
            </div>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-bold text-interagro-text">Categoria</span>
            <select className={inputClass} value={category} onChange={(event) => setCategory(event.target.value)}>
              <option value="todas">Todas</option>
              {categories.map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>

          <div>
            <span className="mb-2 block text-sm font-bold text-interagro-text">Estado</span>
            <div className="flex min-h-12 gap-2 overflow-x-auto">
              {statusFilters.map((item) => (
                <button
                  key={item.value}
                  className={cn(
                    "shrink-0 rounded-xl border px-4 text-sm font-bold transition",
                    statusFilter === item.value
                      ? "border-interagro-red bg-interagro-red text-white"
                      : "border-interagro-border bg-white text-interagro-muted hover:bg-gray-50",
                  )}
                  type="button"
                  onClick={() => setStatusFilter(item.value)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {filteredProducts.length === 0 ? (
        <section className="rounded-2xl border border-dashed border-interagro-border bg-white p-8 text-center">
          <p className="text-xl font-bold text-interagro-text">No encontramos productos</p>
          <p className="mt-2 text-interagro-muted">Prueba con otro nombre, categoria o estado.</p>
        </section>
      ) : (
        <section className="space-y-3">
          {filteredProducts.map((product) => {
            const isEditing = editingId === product.id;

            return (
              <article key={product.id} className="rounded-2xl border border-interagro-border bg-white p-4 shadow-sm">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-xl font-bold text-interagro-text">{product.name}</h2>
                      <VisibilityBadge isActive={product.isActive} />
                    </div>
                    <div className="mt-2 grid gap-2 text-sm text-interagro-muted sm:grid-cols-3">
                      <p>
                        Precio: <span className="font-bold text-interagro-text">{product.price}</span>
                      </p>
                      <p>
                        Presentacion: <span className="font-bold text-interagro-text">{product.format}</span>
                      </p>
                      <p>
                        Categoria: <span className="font-bold text-interagro-text">{product.category}</span>
                      </p>
                    </div>
                  </div>
                  <Button
                    variant={isEditing ? "ghost" : "secondary"}
                    onClick={() => setEditingId(isEditing ? null : product.id)}
                    className="w-full lg:w-auto"
                  >
                    <Pencil size={18} />
                    {isEditing ? "Cerrar" : "Editar"}
                  </Button>
                </div>

                {isEditing ? (
                  <ProductEditor
                    product={product}
                    categories={categories}
                    errors={fieldErrors[product.id] || {}}
                    isSaving={(isPending && savingId === product.id) || savingId === product.id}
                    onSave={handleSave}
                  />
                ) : null}
              </article>
            );
          })}
        </section>
      )}
    </div>
  );
}

function ProductEditor({
  product,
  categories,
  errors,
  isSaving,
  onSave,
}: {
  product: Product;
  categories: Category[];
  errors: Partial<Record<keyof AdminProductInput, string>>;
  isSaving: boolean;
  onSave: (input: AdminProductInput) => void;
}) {
  const [draft, setDraft] = useState<AdminProductInput>({
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    format: product.format,
    conservation: product.conservation,
    code: product.code,
    price: product.price,
    observation: product.observation || "",
    status: product.status,
    isActive: product.isActive,
    featured: product.featured,
  });

  useEffect(() => {
    setDraft({
      id: product.id,
      name: product.name,
      description: product.description,
      category: product.category,
      format: product.format,
      conservation: product.conservation,
      code: product.code,
      price: product.price,
      observation: product.observation || "",
      status: product.status,
      isActive: product.isActive,
      featured: product.featured,
    });
  }, [product]);

  function updateField<Key extends keyof AdminProductInput>(field: Key, value: AdminProductInput[Key]) {
    setDraft((current) => ({ ...current, [field]: value }));
  }

  function hideOrShowProduct() {
    if (draft.isActive) {
      const confirmed = window.confirm("Si ocultas este producto, dejara de aparecer en el catalogo. No se borrara.");
      if (!confirmed) return;
      onSave({ ...draft, isActive: false });
      return;
    }

    onSave({ ...draft, isActive: true });
  }

  return (
    <div className="mt-4 rounded-2xl border border-interagro-border bg-interagro-bg p-4">
      <div className="mb-4 rounded-xl bg-white p-4 text-sm text-interagro-muted">
        Los cambios se veran reflejados en el catalogo despues de guardar.
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Field label="Nombre del producto" error={errors.name}>
          <input className={inputClass} value={draft.name} onChange={(event) => updateField("name", event.target.value)} />
        </Field>
        <Field label="Precio" error={errors.price}>
          <input className={inputClass} value={draft.price} onChange={(event) => updateField("price", event.target.value)} />
        </Field>
        <Field label="Presentacion" error={errors.format}>
          <input className={inputClass} value={draft.format} onChange={(event) => updateField("format", event.target.value)} />
        </Field>
        <Field label="Categoria" error={errors.category}>
          <select className={inputClass} value={draft.category} onChange={(event) => updateField("category", event.target.value)}>
            {categories.map((item) => (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Conservacion" error={errors.conservation}>
          <select
            className={inputClass}
            value={draft.conservation}
            onChange={(event) => updateField("conservation", event.target.value as AdminProductInput["conservation"])}
          >
            <option value="Congelado">Congelado</option>
            <option value="Refrigerado">Refrigerado</option>
            <option value="Ambiente">Ambiente</option>
            <option value="Consultar">Consultar</option>
          </select>
        </Field>
        <Field label="Estado comercial" error={errors.status}>
          <select
            className={inputClass}
            value={draft.status}
            onChange={(event) => updateField("status", event.target.value as AdminProductInput["status"])}
          >
            <option value="available">Disponible</option>
            <option value="ask">Consultar disponibilidad</option>
          </select>
        </Field>
        <Field label="Codigo interno" error={errors.code}>
          <input className={inputClass} value={draft.code} onChange={(event) => updateField("code", event.target.value)} />
        </Field>
        <label className="flex min-h-12 items-center gap-3 rounded-xl border border-interagro-border bg-white px-4 font-semibold text-interagro-text">
          <input
            checked={draft.featured}
            type="checkbox"
            onChange={(event) => updateField("featured", event.target.checked)}
          />
          Mostrar en inicio
        </label>
        <Field label="Descripcion breve" error={errors.description} className="lg:col-span-2">
          <textarea
            className={`${inputClass} min-h-24`}
            value={draft.description}
            onChange={(event) => updateField("description", event.target.value)}
          />
        </Field>
        <Field label="Observacion comercial" error={errors.observation} className="lg:col-span-2">
          <textarea
            className={`${inputClass} min-h-24`}
            value={draft.observation}
            onChange={(event) => updateField("observation", event.target.value)}
          />
        </Field>
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <Button disabled={isSaving} onClick={() => onSave(draft)} size="lg" className="w-full">
          <Save size={20} />
          {isSaving ? "Guardando..." : "Guardar cambios"}
        </Button>
        <Button
          disabled={isSaving}
          onClick={hideOrShowProduct}
          size="lg"
          variant={draft.isActive ? "danger" : "success"}
          className="w-full"
        >
          {draft.isActive ? <EyeOff size={20} /> : <Eye size={20} />}
          {draft.isActive ? "Ocultar producto" : "Volver a mostrar"}
        </Button>
      </div>
    </div>
  );
}

function Field({
  label,
  error,
  children,
  className,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-2 block text-sm font-bold text-interagro-text">{label}</span>
      {children}
      {error ? <span className="mt-1 block text-sm font-semibold text-red-600">{error}</span> : null}
    </label>
  );
}

function VisibilityBadge({ isActive }: { isActive: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-bold",
        isActive ? "border-green-100 bg-green-50 text-green-800" : "border-gray-200 bg-gray-100 text-gray-700",
      )}
    >
      {isActive ? <Eye size={14} /> : <EyeOff size={14} />}
      {isActive ? "Visible en la web" : "Oculto"}
    </span>
  );
}

function NoticeBox({ notice }: { notice: Notice }) {
  const styles = {
    success: "border-green-200 bg-green-50 text-green-900",
    error: "border-red-200 bg-red-50 text-red-900",
    info: "border-yellow-200 bg-yellow-50 text-yellow-900",
  };

  return (
    <div className={cn("flex items-start gap-3 rounded-2xl border p-4 font-semibold", styles[notice.type])}>
      <CheckCircle size={22} />
      <p>{notice.text}</p>
    </div>
  );
}
