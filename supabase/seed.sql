-- Interagro seed inicial.
-- Ejecutar despues de supabase/schema.sql.

insert into categories (name, slug, description, is_active) values
('Pollos', 'pollos', 'Productos de pollo y apanados congelados.', true),
('Cerdo', 'cerdo', 'Productos de cerdo para solicitud comercial.', true),
('Vacuno', 'vacuno', 'Productos de vacuno para negocios y locales.', true),
('Cecinas', 'cecinas', 'Cecinas y productos relacionados.', true),
('Congelados', 'congelados', 'Frutas, pulpas y productos congelados.', true),
('Papas y vegetales', 'papas-y-vegetales', 'Papas, verduras y bases congeladas.', true),
('Otros', 'otros', 'Otros productos del catalogo Interagro.', true)
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description,
  is_active = excluded.is_active;

insert into products (
  name,
  slug,
  description,
  category,
  format,
  conservation,
  code,
  price,
  observation,
  image_url,
  status,
  is_active,
  featured
) values
('Alitas De Pollo', 'alitas-de-pollo', 'Producto disponible para solicitud comercial. Confirmar disponibilidad directamente con Hugo.', 'Pollos', 'Consultar presentacion', 'Congelado', 'Consultar codigo', '$3.350', 'Ideal para restaurantes, minimarkets o distribuidores.', '/images/productos/alitas-de-pollo.png', 'available', true, true),
('Arandanos', 'arandanos', 'Producto congelado disponible para solicitud comercial. Confirmar disponibilidad directamente con Hugo.', 'Congelados', 'Consultar presentacion', 'Congelado', 'Consultar codigo', '$4.400', 'Ideal para restaurantes, minimarkets o distribuidores.', '/images/productos/arandanos.png', 'available', true, true),
('Arrollado', 'arrollado', 'Producto disponible para solicitud comercial. Confirmar disponibilidad directamente con Hugo.', 'Cerdo', 'Consultar presentacion', 'Congelado', 'Consultar codigo', '$4.700', 'Ideal para restaurantes, minimarkets o distribuidores.', '/images/productos/arrollado.png', 'available', true, true),
('Arvejitas', 'arvejitas', 'Producto congelado para negocios, cocinerias y locales de comida. Confirmar disponibilidad directamente con Hugo.', 'Papas y vegetales', 'Consultar presentacion', 'Congelado', 'Consultar codigo', '$450', 'Ideal para restaurantes, minimarkets o distribuidores.', '/images/productos/arvejitas.png', 'available', true, true),
('Ave Marinada', 'ave-marinada', 'Producto disponible para solicitud comercial. Confirmar disponibilidad directamente con Hugo.', 'Pollos', 'Consultar presentacion', 'Congelado', 'Consultar codigo', '$15.000', 'Ideal para restaurantes, minimarkets o distribuidores.', '/images/productos/ave-marinada.png', 'available', true, true),
('Carne Molida', 'carne-molida', 'Producto disponible para solicitud comercial. Confirmar disponibilidad directamente con Hugo.', 'Vacuno', 'Consultar presentacion', 'Congelado', 'Consultar codigo', '$1.200', 'Ideal para restaurantes, minimarkets o distribuidores.', '/images/productos/carne-molida.png', 'available', true, true),
('Chicken Fingers', 'chicken-fingers', 'Producto disponible para solicitud comercial. Confirmar disponibilidad directamente con Hugo.', 'Pollos', 'Consultar presentacion', 'Congelado', 'Consultar codigo', 'Consultar', 'Ideal para restaurantes, minimarkets o distribuidores.', '/images/productos/chicken-fingers.png', 'available', true, false),
('Choclo Desgranado', 'choclo-desgranado', 'Producto congelado para negocios, cocinerias y locales de comida. Confirmar disponibilidad directamente con Hugo.', 'Papas y vegetales', 'Consultar presentacion', 'Congelado', 'Consultar codigo', '$500', 'Ideal para restaurantes, minimarkets o distribuidores.', '/images/productos/choclo-desgranado.png', 'available', true, false),
('Choclo Trozado', 'choclo-trozado', 'Producto congelado para negocios, cocinerias y locales de comida. Confirmar disponibilidad directamente con Hugo.', 'Papas y vegetales', 'Consultar presentacion', 'Congelado', 'Consultar codigo', '$700', 'Ideal para restaurantes, minimarkets o distribuidores.', '/images/productos/choclo-trozado.png', 'available', true, false),
('Filete De Reineta', 'filete-de-reineta', 'Producto disponible para solicitud comercial. Confirmar disponibilidad directamente con Hugo.', 'Vacuno', 'Consultar presentacion', 'Congelado', 'Consultar codigo', '$10.000', 'Ideal para restaurantes, minimarkets o distribuidores.', '/images/productos/filete-de-reineta.png', 'available', true, false),
('Frutillas', 'frutillas', 'Producto congelado disponible para solicitud comercial. Confirmar disponibilidad directamente con Hugo.', 'Congelados', 'Consultar presentacion', 'Congelado', 'Consultar codigo', '$3.100', 'Ideal para restaurantes, minimarkets o distribuidores.', '/images/productos/frutillas.png', 'available', true, false),
('Hamburguesa', 'hamburguesa', 'Producto disponible para solicitud comercial. Confirmar disponibilidad directamente con Hugo.', 'Vacuno', 'Consultar presentacion', 'Congelado', 'Consultar codigo', '$900', 'Ideal para restaurantes, minimarkets o distribuidores.', '/images/productos/hamburguesa.png', 'available', true, false),
('Jardinera', 'jardinera', 'Producto congelado para negocios, cocinerias y locales de comida. Confirmar disponibilidad directamente con Hugo.', 'Papas y vegetales', 'Consultar presentacion', 'Congelado', 'Consultar codigo', '$500', 'Ideal para restaurantes, minimarkets o distribuidores.', '/images/productos/jardinera.png', 'available', true, false),
('Mango En Trozos', 'mango-en-trozos', 'Producto congelado disponible para solicitud comercial. Confirmar disponibilidad directamente con Hugo.', 'Congelados', 'Consultar presentacion', 'Congelado', 'Consultar codigo', '$5.400', 'Ideal para restaurantes, minimarkets o distribuidores.', '/images/productos/mango-en-trozos.png', 'available', true, false),
('Melon Tuna', 'melon-tuna', 'Producto congelado disponible para solicitud comercial. Confirmar disponibilidad directamente con Hugo.', 'Congelados', 'Consultar presentacion', 'Congelado', 'Consultar codigo', '$3.200', 'Ideal para restaurantes, minimarkets o distribuidores.', '/images/productos/melon-tuna.png', 'available', true, false),
('Mix Frutos Rojos', 'mix-frutos-rojos', 'Producto congelado disponible para solicitud comercial. Confirmar disponibilidad directamente con Hugo.', 'Congelados', 'Consultar presentacion', 'Congelado', 'Consultar codigo', '$4.700', 'Ideal para restaurantes, minimarkets o distribuidores.', '/images/productos/mix-frutos-rojos.png', 'available', true, false),
('Mix Tropical 1', 'mix-tropical-1', 'Producto congelado disponible para solicitud comercial. Confirmar disponibilidad directamente con Hugo.', 'Congelados', 'Consultar presentacion', 'Congelado', 'Consultar codigo', '$4.300', 'Ideal para restaurantes, minimarkets o distribuidores.', '/images/productos/mix-tropical-1.png', 'available', true, false),
('Nuggets Pollo', 'nuggets-pollo', 'Producto disponible para solicitud comercial. Confirmar disponibilidad directamente con Hugo.', 'Pollos', 'Consultar presentacion', 'Congelado', 'Consultar codigo', '$2.100', 'Ideal para restaurantes, minimarkets o distribuidores.', '/images/productos/nuggets-pollo.png', 'available', true, false),
('Papas Fritas', 'papas-fritas', 'Producto congelado para negocios, cocinerias y locales de comida. Confirmar disponibilidad directamente con Hugo.', 'Papas y vegetales', 'Bolsa 2.5 kilos', 'Congelado', 'Consultar codigo', '$4.300', 'Ideal para restaurantes, minimarkets o distribuidores.', '/images/productos/papas-fritas.png', 'available', true, false),
('Pina', 'pina', 'Producto congelado disponible para solicitud comercial. Confirmar disponibilidad directamente con Hugo.', 'Congelados', 'Consultar presentacion', 'Congelado', 'Consultar codigo', '$5.500', 'Ideal para restaurantes, minimarkets o distribuidores.', '/images/productos/pina.png', 'available', true, false),
('Pizza', 'pizza', 'Producto disponible para solicitud comercial. Confirmar disponibilidad directamente con Hugo.', 'Otros', 'Consultar presentacion', 'Congelado', 'Consultar codigo', '$3.800', 'Ideal para restaurantes, minimarkets o distribuidores.', '/images/productos/pizza.png', 'available', true, false),
('Pulpa De Frambuesa', 'pulpa-de-frambuesa', 'Producto congelado disponible para solicitud comercial. Confirmar disponibilidad directamente con Hugo.', 'Congelados', 'Consultar presentacion', 'Congelado', 'Consultar codigo', '$5.300', 'Ideal para restaurantes, minimarkets o distribuidores.', '/images/productos/pulpa-de-frambuesa.png', 'available', true, false),
('Pulpa De Frutilla Con Azucar', 'pulpa-de-frutilla-con-azucar', 'Producto congelado disponible para solicitud comercial. Confirmar disponibilidad directamente con Hugo.', 'Congelados', 'Consultar presentacion', 'Congelado', 'Consultar codigo', '$3.000', 'Ideal para restaurantes, minimarkets o distribuidores.', '/images/productos/pulpa-de-frutilla-con-azucar.png', 'available', true, false),
('Pulpa De Mango Con Azucar', 'pulpa-de-mango-con-azucar', 'Producto congelado disponible para solicitud comercial. Confirmar disponibilidad directamente con Hugo.', 'Congelados', 'Consultar presentacion', 'Congelado', 'Consultar codigo', '$4.100', 'Ideal para restaurantes, minimarkets o distribuidores.', '/images/productos/pulpa-de-mango-con-azucar.png', 'available', true, false),
('Pulpa De Pina', 'pulpa-de-pina', 'Producto congelado disponible para solicitud comercial. Confirmar disponibilidad directamente con Hugo.', 'Congelados', 'Consultar presentacion', 'Congelado', 'Consultar codigo', '$3.900', 'Ideal para restaurantes, minimarkets o distribuidores.', '/images/productos/pulpa-de-pina.png', 'available', true, false),
('Pulpa De Maracuya Sin Azucar', 'pulpa-de-maracuya-sin-azucar', 'Producto congelado disponible para solicitud comercial. Confirmar disponibilidad directamente con Hugo.', 'Congelados', 'Consultar presentacion', 'Congelado', 'Consultar codigo', '$7.000', 'Ideal para restaurantes, minimarkets o distribuidores.', '/images/productos/pulpa-de-maracuya-sin-azucar.png', 'available', true, false),
('Sofrito', 'sofrito', 'Producto congelado para negocios, cocinerias y locales de comida. Confirmar disponibilidad directamente con Hugo.', 'Papas y vegetales', 'Consultar presentacion', 'Congelado', 'Consultar codigo', '$600', 'Ideal para restaurantes, minimarkets o distribuidores.', '/images/productos/sofrito.png', 'available', true, false),
('Trutos De Pollo', 'trutos-de-pollo', 'Producto disponible para solicitud comercial. Confirmar disponibilidad directamente con Hugo.', 'Pollos', 'Consultar presentacion', 'Congelado', 'Consultar codigo', '$3.700', 'Ideal para restaurantes, minimarkets o distribuidores.', '/images/productos/trutos-de-pollo.png', 'available', true, false)
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description,
  category = excluded.category,
  format = excluded.format,
  conservation = excluded.conservation,
  code = excluded.code,
  price = excluded.price,
  observation = excluded.observation,
  image_url = excluded.image_url,
  status = excluded.status,
  is_active = excluded.is_active,
  featured = excluded.featured,
  updated_at = now();

insert into customers (business_name, contact_name, rut, phone, commune, address) values
('Minimarket Santa Rosa', 'Carolina Perez', '76.111.222-3', '+56981234567', 'Rancagua', 'Av. Principal 123'),
('Cocineria El Buen Sabor', 'Miguel Rojas', null, '+56982345678', 'Machali', 'Camino Interior 456')
on conflict do nothing;

insert into orders (code, customer_id, status, desired_date, desired_time_range, comment)
select 'PED-2026-00001', c.id, 'pending', current_date + interval '1 day', 'Manana', 'Pedido de prueba para revisar en el panel.'
from customers c
where c.phone = '+56981234567'
on conflict (code) do nothing;

insert into order_items (order_id, product_id, product_name, quantity, format, conservation, code, price, observation)
select o.id, p.id, p.name, 2, p.format, p.conservation, p.code, p.price, p.observation
from orders o
join products p on p.slug = 'alitas-de-pollo'
where o.code = 'PED-2026-00001'
on conflict do nothing;
