import { ArrowRight, CalendarCheck, CheckCircle, MapPin, MessageCircle, ShieldCheck, ShoppingBag, Sparkles } from "lucide-react";
import { InteragroLogo } from "@/components/layout/interagro-logo";
import { LinkButton } from "@/components/ui/button";
import { categories, products } from "@/lib/mock-data";
import { createWhatsAppLink, HUGO_PHONE } from "@/lib/whatsapp";
import { ProductCard } from "@/components/catalog/product-card";

export default function HomePage() {
  const whatsAppLink = createWhatsAppLink(
    HUGO_PHONE,
    "Hola Hugo, quiero consultar por productos del catálogo digital Interagro.",
  );
  const featuredProducts = products.filter((product) => product.featured).slice(0, 3);
  const benefits = [
    { icon: <ShieldCheck size={24} />, title: "Atención directa", text: "Hugo revisa cada solicitud y confirma disponibilidad por WhatsApp." },
    { icon: <CalendarCheck size={24} />, title: "Pedidos ordenados", text: "El cliente indica fecha deseada para coordinar mejor la entrega." },
    { icon: <Sparkles size={24} />, title: "Catálogo claro", text: "Productos reales de Interagro en una experiencia simple para celular." },
  ];

  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-3xl border border-interagro-border bg-white p-5 shadow-soft md:p-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(233,7,41,0.12),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(1,152,71,0.16),transparent_34%)]" />
        <div className="relative grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-center">
        <div>
          <InteragroLogo className="w-44 sm:w-56" />
          <p className="mt-5 inline-flex rounded-full bg-red-50 px-4 py-2 text-sm font-bold uppercase text-interagro-red">
            Atención directa Interagro
          </p>
          <h1 className="mt-2 text-3xl font-bold leading-tight text-interagro-text sm:text-5xl">
            Catálogo digital de productos Interagro
          </h1>
          <p className="mt-4 text-lg leading-8 text-interagro-muted">
            Catálogo digital de productos Interagro con atención directa de Hugo Idarraga. Revisa productos disponibles, arma tu
            solicitud y confirma por WhatsApp de forma rápida y segura.
          </p>
          <div className="mt-5 rounded-2xl border border-white bg-white/80 p-4 shadow-sm backdrop-blur">
            <p className="font-bold text-interagro-text">Hugo Alberto Idarraga Vivas</p>
            <p className="text-interagro-muted">Ejecutivo de Ventas y Bodeguero</p>
            <p className="mt-2 flex items-center gap-2 text-sm text-interagro-muted">
              <MapPin size={18} className="text-interagro-red" />
              Kennedy 3781, Rancagua, O&apos;Higgins
            </p>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <LinkButton href="/catalogo" size="lg" className="shadow-lg shadow-red-100">
              Ver catálogo
              <ArrowRight size={20} />
            </LinkButton>
            <LinkButton href={whatsAppLink} target="_blank" variant="secondary" size="lg">
              <MessageCircle size={20} />
              Hablar por WhatsApp
            </LinkButton>
          </div>
        </div>
        <div className="rounded-3xl bg-gradient-to-br from-red-50 via-white to-green-50 p-5">
          <div className="mb-4 rounded-2xl border border-interagro-border bg-white p-4">
            <p className="text-sm font-bold text-interagro-red">Solicitud sin pago online</p>
            <p className="mt-1 text-sm text-interagro-muted">El cliente arma una solicitud y Hugo confirma disponibilidad.</p>
          </div>
          <div className="grid gap-3">
            {["Revisa el catálogo", "Selecciona productos", "Envía tu solicitud", "Hugo confirma por WhatsApp"].map((step, index) => (
              <div key={step} className="flex items-center gap-3 rounded-2xl border border-interagro-border bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-sm">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-interagro-red font-bold text-white">
                  {index + 1}
                </span>
                <span className="font-bold text-interagro-text">{step}</span>
              </div>
            ))}
          </div>
        </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {benefits.map((benefit) => (
          <article key={benefit.title} className="rounded-2xl border border-interagro-border bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 text-interagro-green">{benefit.icon}</div>
            <h2 className="mt-4 text-xl font-bold text-interagro-text">{benefit.title}</h2>
            <p className="mt-2 text-sm leading-6 text-interagro-muted">{benefit.text}</p>
          </article>
        ))}
      </section>

      <section className="rounded-3xl border border-interagro-border bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-bold uppercase text-interagro-red">Categorías</p>
            <h2 className="text-2xl font-bold text-interagro-text">Productos reales para solicitar</h2>
          </div>
          <LinkButton href="/catalogo" variant="secondary" className="hidden sm:inline-flex">
            Ver todo
          </LinkButton>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((category) => (
            <a
              key={category.id}
              href="/catalogo"
              className="rounded-2xl border border-interagro-border bg-interagro-bg p-4 transition hover:-translate-y-1 hover:border-interagro-green hover:bg-green-50"
            >
              <p className="text-lg font-bold text-interagro-text">{category.name}</p>
              <p className="mt-1 text-sm text-interagro-muted">Ver productos</p>
            </a>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-bold uppercase text-interagro-green">Productos destacados</p>
            <h2 className="text-2xl font-bold text-interagro-text">Listos para solicitar</h2>
          </div>
          <ShoppingBag className="text-interagro-red" size={30} />
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-green-200 bg-green-50 p-5">
        <div className="flex gap-3">
          <CheckCircle className="shrink-0 text-interagro-green" size={26} />
          <p className="text-green-900">
            No hay pagos online. Cada pedido queda como solicitud pendiente hasta que Hugo confirme disponibilidad por WhatsApp.
          </p>
        </div>
      </section>
    </div>
  );
}
