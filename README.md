# Interagro Sales Catalog

[![Next.js](https://img.shields.io/badge/Next.js-15.x-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployment-black?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

## Visión General (Overview)

**Interagro Sales Catalog** es una aplicación web comercial diseñada para digitalizar el proceso de solicitud de productos de Interagro, manteniendo una experiencia simple, profesional y mobile-first. El sistema permite a clientes revisar un catálogo digital, agregar productos a una solicitud, ingresar los datos de su negocio y contactar directamente a Hugo Alberto Idarraga Vivas por WhatsApp con un mensaje prellenado.

El objetivo del proyecto no es construir un ecommerce tradicional, sino una herramienta comercial liviana que conecte catálogo, solicitud de pedido y atención directa. Su impacto está en mejorar la presentación profesional durante visitas comerciales, ordenar solicitudes de clientes y entregar a Hugo un panel simple para revisar pedidos, clientes y fechas deseadas de entrega.

## Características Clave (Key Features)

*   **Catálogo Digital Profesional**: Listado de productos Interagro con imagen, categoría, formato, conservación, código, precio referencial, observación comercial y estado de disponibilidad.
*   **Solicitud de Pedido sin Pago Online**: Flujo guiado donde el cliente agrega productos, ajusta cantidades y envía una solicitud pendiente de confirmación, evitando tratar el proceso como una compra final.
*   **Integración con WhatsApp**: Generación automática de enlaces `wa.me` con mensajes codificados, incluyendo datos del cliente, productos solicitados, fecha deseada y horario preferido.
*   **Panel Privado para Hugo**: Espacio simple para revisar pedidos, clientes, calendario de solicitudes y compartir el catálogo mediante link o QR.
*   **Cronograma de Pedidos**: Vista organizada por fecha deseada para que Hugo pueda priorizar solicitudes pendientes, confirmadas o entregadas.
*   **Panel Admin para Gestión Técnica**: Módulo preparado para administrar productos, categorías, imágenes, estados y datos comerciales del catálogo.
*   **Preparación para Supabase**: Estructura SQL, servicios de datos y capa de configuración para alternar entre datos mock y Supabase/PostgreSQL.
*   **Diseño Mobile-First**: Interfaz optimizada para celulares, con botones grandes, textos claros, navegación sencilla y estética basada en la identidad visual de Interagro.

## Arquitectura y Tecnologías

La aplicación `Interagro Sales Catalog` está construida con **Next.js App Router**, **React**, **TypeScript** y **Tailwind CSS**, priorizando rendimiento, mantenibilidad y despliegue sencillo en Vercel. La arquitectura separa componentes de interfaz, lógica de negocio, servicios de datos, validaciones y utilidades de WhatsApp, dejando el proyecto preparado para crecer sin transformar la solución en un ERP complejo.

*   **Framework Frontend**: Next.js 15 con App Router, rutas públicas, rutas privadas, API routes y optimización para despliegue en Vercel.
*   **Lenguaje de Programación**: TypeScript, utilizado para tipar productos, clientes, solicitudes, estados y servicios de datos.
*   **Estilos CSS**: Tailwind CSS, con una identidad visual basada en rojo Interagro, verde corporativo, blanco y fondos claros.
*   **Gestión de Estado**: Zustand, utilizado para manejar la solicitud de pedido del cliente de forma simple y persistente.
*   **Formularios y Validación**: React Hook Form y Zod para capturar datos del negocio, validar campos obligatorios y controlar la fecha deseada del pedido.
*   **Base de Datos & Auth**: Supabase/PostgreSQL preparado mediante `schema.sql`, `seed.sql`, servicios de datos y variables de entorno.
*   **UI e Iconografía**: Lucide React para iconos funcionales y componentes reutilizables orientados a una experiencia clara.
*   **Despliegue**: Vercel, recomendado para integración continua desde GitHub y publicación rápida de aplicaciones Next.js.

Esta combinación tecnológica permite entregar una primera versión comercial testeable, con datos reales de productos, preparación para base de datos y una experiencia enfocada en negocios, minimarkets, cocinerías y clientes que prefieren confirmar disponibilidad directamente por WhatsApp.

## Requisitos Previos (Prerequisites)

Para configurar y ejecutar el proyecto en un entorno de desarrollo local, asegúrese de tener instalados los siguientes componentes:

*   **Git**: Sistema de control de versiones.
    ```bash
    # Verificar instalación
    git --version
    ```
*   **Node.js**: Versión 18.x o superior. Incluye `npm` para la gestión de paquetes.
    ```bash
    # Verificar instalación
    node -v
    npm -v
    ```
*   **Cuenta de Supabase**: Requerida para usar la fuente de datos real en PostgreSQL.
*   **Cuenta de Vercel**: Recomendada para desplegar la aplicación conectada al repositorio de GitHub.

## Guía de Instalación Rápida (Getting Started)

Siga estos pasos para levantar el entorno de desarrollo local:

1.  **Clonar el Repositorio**:
    ```bash
    git clone https://github.com/Juan-David-Idarraga/interagro-sales-catalog.git
    cd interagro-sales-catalog
    ```

2.  **Instalar Dependencias**:
    ```bash
    npm install
    ```

3.  **Configurar Variables de Entorno**:
    *   Cree un archivo `.env.local` a partir de `.env.example`.
    *   Configure Supabase, WhatsApp, credenciales temporales de panel y fuente de datos.

4.  **Ejecutar la Aplicación**:
    ```bash
    npm run dev
    ```
    La aplicación estará disponible en `http://localhost:3000`.

5.  **Validar el Proyecto**:
    ```bash
    npm run type-check
    npm run lint
    npm run build
    ```

## Variables de Entorno (Environment Variables)

Cree un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```ini
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

NEXT_PUBLIC_DATA_SOURCE=mock
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_WHATSAPP_PHONE=56937181027

AUTH_SECRET=your_long_random_secret
HUGO_PANEL_USER=hugo
HUGO_PANEL_PASSWORD_HASH=your_scrypt_password_hash
ADMIN_PANEL_USER=admin
ADMIN_PANEL_PASSWORD_HASH=your_scrypt_password_hash
```

Use `NEXT_PUBLIC_DATA_SOURCE=mock` para trabajar con datos locales y `NEXT_PUBLIC_DATA_SOURCE=supabase` cuando la base de datos esté lista.

## Base de Datos y Supabase

El proyecto incluye archivos SQL listos para ejecutar en Supabase:

*   `supabase/schema.sql`: Crea tablas, índices, función de `updated_at` y políticas de Row Level Security.
*   `supabase/seed.sql`: Inserta categorías, productos, clientes y pedidos de ejemplo.
*   `supabase/generated-products-seed.sql`: Inserta productos generados desde imágenes locales.

Para preparar la base de datos:

1.  Cree un proyecto en Supabase.
2.  Abra `SQL Editor`.
3.  Ejecute `supabase/schema.sql`.
4.  Ejecute `supabase/seed.sql`.
5.  Configure las variables de entorno en local y Vercel.

## Importación de Productos

El proyecto incluye un script para importar imágenes reales de productos desde una carpeta local y generar datos listos para la aplicación y Supabase.

```bash
npm run import-products -- "C:\Users\juani\Desktop\INTERAGRO"
```

El script realiza las siguientes acciones:

*   Copia imágenes a `public/images/productos`.
*   Limpia nombres de archivo y genera `slug`.
*   Crea productos en `src/lib/generated-products.ts`.
*   Genera SQL en `supabase/generated-products-seed.sql`.
*   Evita rutas absolutas de Windows dentro del código de producción.

## Despliegue (Deployment)

Este proyecto está optimizado para ser desplegado en **Vercel**. Para publicar la aplicación:

1.  Suba el repositorio a GitHub.
2.  En Vercel, seleccione `Add New Project`.
3.  Importe `Juan-David-Idarraga/interagro-sales-catalog`.
4.  Configure las variables de entorno necesarias.
5.  Ejecute el deploy.

Después del despliegue, actualice:

```ini
NEXT_PUBLIC_SITE_URL=https://tu-dominio.vercel.app
NEXT_PUBLIC_DATA_SOURCE=supabase
```

si ya está usando la base de datos real.

## Alcance del Proyecto

Esta versión está enfocada en resolver un flujo comercial concreto:

*   Mostrar productos de Interagro de forma profesional.
*   Permitir solicitudes de pedido sin pago online.
*   Conectar al cliente con Hugo mediante WhatsApp.
*   Entregar un panel simple para seguimiento comercial.
*   Preparar una base sólida para conectar Supabase y desplegar en producción.

No incluye pagos online, facturación, inventario avanzado ni automatizaciones complejas de WhatsApp. La filosofía del sistema es mantener una herramienta clara, útil y fácil de operar para Hugo y sus clientes.

---

**Juan Idarraga**
*   **Empresa**: Technology of Jota
*   **Portafolio**: [LinkedIn Profile](https://www.linkedin.com/in/juan-david-idarraga-11088b387/)
