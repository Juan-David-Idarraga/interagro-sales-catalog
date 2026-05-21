import type { Customer, Order, OrderItem, OrderStatus } from "@/lib/types";
import { orders as mockOrders } from "@/lib/mock-data";
import { createServerSupabaseClient } from "@/lib/supabase/server";

function shouldUseSupabase() {
  return process.env.NEXT_PUBLIC_DATA_SOURCE === "supabase";
}

type OrderWithRelations = {
  id: string;
  code: string;
  status: OrderStatus;
  desired_date: string;
  desired_time_range: string | null;
  comment: string | null;
  created_at: string;
  updated_at: string;
  customers: {
    id: string;
    business_name: string;
    contact_name: string;
    rut: string | null;
    phone: string;
    commune: string;
    address: string;
    created_at: string;
  } | null;
  order_items: Array<{
    id: string;
    product_id: string;
    product_name: string;
    quantity: number;
    format: string | null;
    conservation: string | null;
    code: string | null;
    price: string | null;
    observation: string | null;
  }>;
};

function mapOrder(row: OrderWithRelations): Order {
  const customerRow = row.customers;
  const customer: Customer = {
    id: customerRow?.id || "",
    businessName: customerRow?.business_name || "",
    contactName: customerRow?.contact_name || "",
    rut: customerRow?.rut || undefined,
    phone: customerRow?.phone || "",
    commune: customerRow?.commune || "",
    address: customerRow?.address || "",
    createdAt: customerRow?.created_at || row.created_at,
  };

  const items: OrderItem[] = row.order_items.map((item) => ({
    id: item.id,
    productId: item.product_id,
    productName: item.product_name,
    quantity: item.quantity,
    format: item.format || "Consultar presentacion",
    conservation: item.conservation || "Consultar",
    code: item.code || "Consultar codigo",
    price: item.price || "Consultar",
    observation: item.observation || undefined,
  }));

  return {
    id: row.id,
    code: row.code,
    customer,
    items,
    status: row.status,
    desiredDate: row.desired_date,
    desiredTimeRange: row.desired_time_range || "Indiferente",
    comment: row.comment || undefined,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function createOrder(data: Omit<Order, "id" | "createdAt" | "updatedAt">) {
  if (!shouldUseSupabase()) return { ...data, id: `mock-${Date.now()}`, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };

  const supabase = createServerSupabaseClient();
  return supabase.from("orders").insert({
    code: data.code,
    status: data.status,
    desired_date: data.desiredDate,
    desired_time_range: data.desiredTimeRange,
    comment: data.comment,
  });
}

export async function getOrders(): Promise<Order[]> {
  if (!shouldUseSupabase()) return mockOrders;

  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from("orders")
    .select("*, customers(*), order_items(*)")
    .order("desired_date", { ascending: true });
  if (error) throw error;
  return ((data || []) as OrderWithRelations[]).map(mapOrder);
}

export async function getOrderByCode(code: string): Promise<Order | null> {
  const orders = await getOrders();
  return orders.find((order) => order.code === code) || null;
}

export async function getOrdersByStatus(status: OrderStatus): Promise<Order[]> {
  const orders = await getOrders();
  return orders.filter((order) => order.status === status);
}

export async function getOrdersByDesiredDate(date: string): Promise<Order[]> {
  const orders = await getOrders();
  return orders.filter((order) => order.desiredDate === date);
}

export async function updateOrderStatus(id: string, status: OrderStatus) {
  if (!shouldUseSupabase()) return { id, status };

  const supabase = createServerSupabaseClient();
  return supabase.from("orders").update({ status }).eq("id", id);
}
