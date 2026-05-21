import type { Customer } from "@/lib/types";
import { customers as mockCustomers } from "@/lib/mock-data";
import { createServerSupabaseClient } from "@/lib/supabase/server";

function shouldUseSupabase() {
  return process.env.NEXT_PUBLIC_DATA_SOURCE === "supabase";
}

type CustomerRow = {
  id: string;
  business_name: string;
  contact_name: string;
  rut: string | null;
  phone: string;
  commune: string;
  address: string;
  created_at: string;
};

function mapCustomer(row: CustomerRow): Customer {
  return {
    id: row.id,
    businessName: row.business_name,
    contactName: row.contact_name,
    rut: row.rut || undefined,
    phone: row.phone,
    commune: row.commune,
    address: row.address,
    createdAt: row.created_at,
  };
}

export async function createCustomer(data: Omit<Customer, "id" | "createdAt">) {
  if (!shouldUseSupabase()) return { ...data, id: `mock-${Date.now()}`, createdAt: new Date().toISOString() };

  const supabase = createServerSupabaseClient();
  return supabase.from("customers").insert({
    business_name: data.businessName,
    contact_name: data.contactName,
    rut: data.rut,
    phone: data.phone,
    commune: data.commune,
    address: data.address,
  }).select("*").single();
}

export async function getCustomers(): Promise<Customer[]> {
  if (!shouldUseSupabase()) return mockCustomers;

  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase.from("customers").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return ((data || []) as CustomerRow[]).map(mapCustomer);
}

export async function getCustomerByPhone(phone: string): Promise<Customer | null> {
  if (!shouldUseSupabase()) return mockCustomers.find((customer) => customer.phone === phone) || null;

  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase.from("customers").select("*").eq("phone", phone).maybeSingle();
  if (error) throw error;
  return data ? mapCustomer(data as CustomerRow) : null;
}
