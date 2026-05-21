import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileNav } from "@/components/layout/mobile-nav";
import { FloatingRequestBar } from "@/components/layout/floating-request-bar";

export const metadata: Metadata = {
  title: "Interagro | Catálogo Digital",
  description: "Catálogo digital Interagro con atención directa de Hugo Idarraga.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>
        <Header />
        <main className="safe-bottom mx-auto min-h-screen max-w-6xl px-4 py-4 md:py-8">{children}</main>
        <Footer />
        <FloatingRequestBar />
        <MobileNav />
      </body>
    </html>
  );
}
