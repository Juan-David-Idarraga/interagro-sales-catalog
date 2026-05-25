"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { AUTH_COOKIE, verifySessionToken } from "@/lib/session";
import { updateProduct } from "@/lib/services/products";
import type { Product } from "@/lib/types";

const adminProductSchema = z.object({
  id: z.string().min(1, "Selecciona un producto valido."),
  name: z.string().trim().min(2, "Ingresa el nombre del producto."),
  description: z.string().trim().optional(),
  category: z.string().trim().min(1, "Ingresa una categoria."),
  format: z.string().trim().min(1, "Ingresa la presentacion."),
  conservation: z.enum(["Congelado", "Refrigerado", "Ambiente", "Consultar"]),
  code: z.string().trim().optional(),
  price: z.string().trim().min(1, "Ingresa un precio o usa Consultar."),
  observation: z.string().trim().optional(),
  status: z.enum(["available", "ask"]),
  isActive: z.boolean(),
  featured: z.boolean(),
});

export type AdminProductInput = z.infer<typeof adminProductSchema>;

export type AdminProductActionResult = {
  ok: boolean;
  message: string;
  product?: Product;
  isDemoMode?: boolean;
  fieldErrors?: Partial<Record<keyof AdminProductInput, string>>;
};

async function ensureAdmin() {
  const cookieStore = await cookies();
  const session = await verifySessionToken(cookieStore.get(AUTH_COOKIE)?.value, process.env.AUTH_SECRET || "");
  return session?.role === "admin";
}

function buildFieldErrors(error: z.ZodError<AdminProductInput>) {
  return error.issues.reduce<Partial<Record<keyof AdminProductInput, string>>>((errors, issue) => {
    const field = issue.path[0] as keyof AdminProductInput | undefined;
    if (field && !errors[field]) {
      errors[field] = issue.message;
    }
    return errors;
  }, {});
}

export async function saveAdminProduct(input: AdminProductInput): Promise<AdminProductActionResult> {
  if (!(await ensureAdmin())) {
    return {
      ok: false,
      message: "No tienes permiso para guardar cambios en productos.",
    };
  }

  const parsed = adminProductSchema.safeParse(input);

  if (!parsed.success) {
    return {
      ok: false,
      message: "Revisa los datos marcados antes de guardar.",
      fieldErrors: buildFieldErrors(parsed.error),
    };
  }

  const data = parsed.data;

  const productUpdate: Partial<Product> = {
    name: data.name,
    description: data.description || "Producto disponible para solicitud comercial.",
    category: data.category,
    format: data.format,
    conservation: data.conservation,
    code: data.code || "Consultar codigo",
    price: data.price || "Consultar",
    observation: data.observation || "Consultar disponibilidad directamente con Hugo.",
    status: data.status,
    isActive: data.isActive,
    featured: data.featured,
  };

  if (process.env.NEXT_PUBLIC_DATA_SOURCE !== "supabase") {
    return {
      ok: true,
      message: "Cambio aplicado en esta vista. Para guardarlo definitivamente, activa el modo conectado.",
      isDemoMode: true,
    };
  }

  try {
    const updatedProduct = await updateProduct(data.id, productUpdate);
    revalidatePath("/admin/productos");
    revalidatePath("/catalogo");
    revalidatePath("/");

    return {
      ok: true,
      message: data.isActive ? "Producto actualizado correctamente." : "Producto ocultado correctamente.",
      product: updatedProduct as Product,
    };
  } catch {
    return {
      ok: false,
      message: "No se pudo guardar el producto. Intenta nuevamente.",
    };
  }
}
