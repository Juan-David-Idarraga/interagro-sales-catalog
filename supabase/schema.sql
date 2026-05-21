-- Interagro catalogo digital - Supabase/PostgreSQL schema.
-- Ejecutar en Supabase SQL Editor.

create extension if not exists "pgcrypto";

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null check (role in ('hugo', 'admin')),
  created_at timestamp with time zone default now()
);

create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  description text,
  is_active boolean default true,
  created_at timestamp with time zone default now()
);

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  description text,
  category_id uuid references categories(id),
  category text,
  format text not null,
  conservation text not null,
  code text,
  price text default 'Consultar',
  observation text,
  image_url text,
  status text default 'available' check (status in ('available', 'ask')),
  is_active boolean default true,
  featured boolean default false,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create table if not exists customers (
  id uuid primary key default gen_random_uuid(),
  business_name text not null,
  contact_name text not null,
  rut text,
  phone text not null,
  commune text not null,
  address text not null,
  created_at timestamp with time zone default now()
);

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  customer_id uuid references customers(id),
  status text default 'pending' check (status in ('pending', 'confirmed', 'rejected', 'delivered')),
  desired_date date not null,
  desired_time_range text,
  comment text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create table if not exists order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders(id) on delete cascade,
  product_id uuid references products(id),
  product_name text not null,
  quantity integer not null check (quantity > 0),
  format text,
  conservation text,
  code text,
  price text,
  observation text,
  created_at timestamp with time zone default now()
);

create index if not exists idx_products_category_id on products(category_id);
create index if not exists idx_products_slug on products(slug);
create index if not exists idx_orders_code on orders(code);
create index if not exists idx_orders_status on orders(status);
create index if not exists idx_orders_desired_date on orders(desired_date);
create index if not exists idx_customers_phone on customers(phone);

create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_products_updated_at on products;
create trigger set_products_updated_at
before update on products
for each row execute function set_updated_at();

drop trigger if exists set_orders_updated_at on orders;
create trigger set_orders_updated_at
before update on orders
for each row execute function set_updated_at();

create or replace function current_profile_role()
returns text
language sql
security definer
set search_path = public
as $$
  select role from profiles where id = auth.uid();
$$;

create or replace function is_hugo_or_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select coalesce(current_profile_role() in ('hugo', 'admin'), false);
$$;

create or replace function is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select coalesce(current_profile_role() = 'admin', false);
$$;

alter table profiles enable row level security;
alter table categories enable row level security;
alter table products enable row level security;
alter table customers enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;

drop policy if exists "profiles can read own profile" on profiles;
create policy "profiles can read own profile"
on profiles for select
to authenticated
using (auth.uid() = id or is_admin());

drop policy if exists "public can read active categories" on categories;
create policy "public can read active categories"
on categories for select
to anon, authenticated
using (is_active = true);

drop policy if exists "admin can manage categories" on categories;
create policy "admin can manage categories"
on categories for all
to authenticated
using (is_admin())
with check (is_admin());

drop policy if exists "public can read active products" on products;
create policy "public can read active products"
on products for select
to anon, authenticated
using (is_active = true);

drop policy if exists "admin can create products" on products;
create policy "admin can create products"
on products for insert
to authenticated
with check (is_admin());

drop policy if exists "admin can update products" on products;
create policy "admin can update products"
on products for update
to authenticated
using (is_admin())
with check (is_admin());

drop policy if exists "admin can delete products" on products;
create policy "admin can delete products"
on products for delete
to authenticated
using (is_admin());

drop policy if exists "public can create customers" on customers;
create policy "public can create customers"
on customers for insert
to anon, authenticated
with check (true);

drop policy if exists "hugo admin can read customers" on customers;
create policy "hugo admin can read customers"
on customers for select
to authenticated
using (is_hugo_or_admin());

drop policy if exists "hugo admin can update customers" on customers;
create policy "hugo admin can update customers"
on customers for update
to authenticated
using (is_hugo_or_admin())
with check (is_hugo_or_admin());

drop policy if exists "public can create orders" on orders;
create policy "public can create orders"
on orders for insert
to anon, authenticated
with check (true);

drop policy if exists "hugo admin can read orders" on orders;
create policy "hugo admin can read orders"
on orders for select
to authenticated
using (is_hugo_or_admin());

drop policy if exists "hugo admin can update order status" on orders;
create policy "hugo admin can update order status"
on orders for update
to authenticated
using (is_hugo_or_admin())
with check (is_hugo_or_admin());

drop policy if exists "public can create order items" on order_items;
create policy "public can create order items"
on order_items for insert
to anon, authenticated
with check (true);

drop policy if exists "hugo admin can read order items" on order_items;
create policy "hugo admin can read order items"
on order_items for select
to authenticated
using (is_hugo_or_admin());

drop policy if exists "hugo admin can update order items" on order_items;
create policy "hugo admin can update order items"
on order_items for update
to authenticated
using (is_hugo_or_admin())
with check (is_hugo_or_admin());

insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do update set public = excluded.public;

drop policy if exists "public can read product images" on storage.objects;
create policy "public can read product images"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'product-images');

drop policy if exists "admin can upload product images" on storage.objects;
create policy "admin can upload product images"
on storage.objects for insert
to authenticated
with check (bucket_id = 'product-images' and public.is_admin());

drop policy if exists "admin can update product images" on storage.objects;
create policy "admin can update product images"
on storage.objects for update
to authenticated
using (bucket_id = 'product-images' and public.is_admin())
with check (bucket_id = 'product-images' and public.is_admin());

drop policy if exists "admin can delete product images" on storage.objects;
create policy "admin can delete product images"
on storage.objects for delete
to authenticated
using (bucket_id = 'product-images' and public.is_admin());
