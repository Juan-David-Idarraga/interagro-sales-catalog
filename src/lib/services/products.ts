import type { Product } from "@/lib/types";
import { products as mockProducts } from "@/lib/mock-data";
import { createServerSupabaseClient } from "@/lib/supabase/server";

type ProductRow = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  category: string | null;
  format: string;
  conservation: Product["conservation"];
  code: string | null;
  price: string | null;
  observation: string | null;
  image_url: string | null;
  status: Product["status"];
  is_active: boolean;
  featured: boolean;
  created_at: string;
  updated_at: string;
};

function shouldUseSupabase() {
  return process.env.NEXT_PUBLIC_DATA_SOURCE === "supabase";
}

function mapProduct(row: ProductRow): Product {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description || "",
    category: row.category || "Otros",
    format: row.format,
    conservation: row.conservation,
    code: row.code || "Consultar codigo",
    price: row.price || "Consultar",
    observation: row.observation || undefined,
    imageUrl: row.image_url || undefined,
    status: row.status,
    isActive: row.is_active,
    featured: row.featured,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function getProducts(): Promise<Product[]> {
  if (!shouldUseSupabase()) return mockProducts.filter((product) => product.isActive);

  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase.from("products").select("*").eq("is_active", true).order("name");
  if (error) throw error;
  return ((data || []) as ProductRow[]).map(mapProduct);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!shouldUseSupabase()) return mockProducts.find((product) => product.slug === slug || product.id === slug) || null;

  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase.from("products").select("*").eq("slug", slug).maybeSingle();
  if (error) throw error;
  return data ? mapProduct(data as ProductRow) : null;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const allProducts = await getProducts();
  return allProducts.filter((product) => product.featured);
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const allProducts = await getProducts();
  return allProducts.filter((product) => product.category === category);
}

export async function createProduct(data: Omit<Product, "id" | "createdAt" | "updatedAt">) {
  if (!shouldUseSupabase()) return { ...data, id: `mock-${Date.now()}`, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };

  const supabase = createServerSupabaseClient();
  return supabase.from("products").insert({
    name: data.name,
    slug: data.slug,
    description: data.description,
    category: data.category,
    format: data.format,
    conservation: data.conservation,
    code: data.code,
    price: data.price,
    observation: data.observation,
    image_url: data.imageUrl,
    status: data.status,
    is_active: data.isActive,
    featured: data.featured,
  });
}

export async function updateProduct(id: string, data: Partial<Product>) {
  if (!shouldUseSupabase()) return { id, ...data };

  const supabase = createServerSupabaseClient();
  return supabase.from("products").update({
    name: data.name,
    slug: data.slug,
    description: data.description,
    category: data.category,
    format: data.format,
    conservation: data.conservation,
    code: data.code,
    price: data.price,
    observation: data.observation,
    image_url: data.imageUrl,
    status: data.status,
    is_active: data.isActive,
    featured: data.featured,
  }).eq("id", id);
}

export async function deleteProduct(id: string) {
  if (!shouldUseSupabase()) return { id };

  const supabase = createServerSupabaseClient();
  return supabase.from("products").update({ is_active: false }).eq("id", id);
}
