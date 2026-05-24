# Interagro Catalogo Digital - Deploy

## 1. Ejecutar localmente

```bash
npm install
npm run dev
```

Abrir:

```text
http://localhost:3000
```

## 2. Revisar build

```bash
npm run type-check
npm run lint
npm run build
```

## 3. Configurar `.env.local`

Crear `.env.local` desde `.env.example`:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_DATA_SOURCE=mock
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_WHATSAPP_PHONE=56937181027
AUTH_SECRET=
HUGO_PANEL_USER=
HUGO_PANEL_PASSWORD_HASH=
ADMIN_PANEL_USER=
ADMIN_PANEL_PASSWORD_HASH=
```

Usar `NEXT_PUBLIC_DATA_SOURCE=mock` para datos locales y `NEXT_PUBLIC_DATA_SOURCE=supabase` cuando Supabase este listo.

## 4. Importar imagenes locales

Las imagenes reales deben estar fuera del codigo fuente y luego copiarse a `public/images/productos`.

```bash
npm run import-products -- "C:\Users\juani\Desktop\interagro\ia"
```

El script:

- Copia imagenes a `public/images/productos`.
- Genera `src/lib/generated-products.ts`.
- Genera `supabase/generated-products-seed.sql`.
- Evita rutas absolutas de Windows dentro de la app.

## 5. Crear proyecto en Supabase

1. Entrar a Supabase.
2. Crear un proyecto nuevo.
3. Copiar `Project URL` a `NEXT_PUBLIC_SUPABASE_URL`.
4. Copiar `anon public key` a `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
5. Copiar `service_role key` a `SUPABASE_SERVICE_ROLE_KEY` solo en servidor/Vercel.

## 6. Ejecutar SQL

En Supabase:

1. Ir a `SQL Editor`.
2. Copiar y ejecutar `supabase/schema.sql`.
3. Copiar y ejecutar `supabase/seed.sql`.
4. Opcional: copiar y ejecutar `supabase/generated-products-seed.sql` para importar todos los productos generados desde imagenes.

## 7. Crear bucket de imagenes

1. Ir a `Storage`.
2. Seleccionar `New bucket`.
3. Nombre: `product-images`.
4. Marcar como `Public bucket`.
5. Subir imagenes de productos.
6. Copiar la URL publica.
7. Guardar la URL en `products.image_url`.

Para esta version, el admin permite ingresar `imageUrl` manualmente. El upload directo queda preparado para una siguiente iteracion.

## 8. Preparar Vercel

1. Subir el proyecto a GitHub.
2. Entrar a Vercel.
3. Seleccionar `Add New Project`.
4. Importar el repositorio.
5. Agregar variables de entorno:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_DATA_SOURCE=mock
NEXT_PUBLIC_SITE_URL=https://tu-dominio.vercel.app
NEXT_PUBLIC_WHATSAPP_PHONE=56937181027
AUTH_SECRET=
HUGO_PANEL_USER=
HUGO_PANEL_PASSWORD_HASH=
ADMIN_PANEL_USER=
ADMIN_PANEL_PASSWORD_HASH=
```

6. Deploy.

Cuando Supabase este listo, cambiar:

```env
NEXT_PUBLIC_DATA_SOURCE=supabase
```

## 9. Probar produccion

Revisar:

- Home.
- Catalogo.
- Detalle de producto.
- Solicitud.
- Fecha deseada.
- Link de WhatsApp.
- Login.
- Panel Hugo.
- Pedidos.
- Calendario.
- Admin productos.

## 10. Notas importantes

- No hay pagos online.
- Toda solicitud queda pendiente hasta que Hugo confirme por WhatsApp.
- No subir `.env.local` ni claves privadas a GitHub.
- `SUPABASE_SERVICE_ROLE_KEY` solo debe existir en servidor/Vercel, nunca en frontend publico.
