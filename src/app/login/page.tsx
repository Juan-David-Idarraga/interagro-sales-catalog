import { Suspense } from "react";
import { InteragroLogo } from "@/components/layout/interagro-logo";
import { LoginForm } from "@/components/auth/login-form";
import { BackButton } from "@/components/ui/back-button";

export default function LoginPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center py-8">
      <BackButton href="/" label="Volver al inicio" className="mb-5 w-fit" />
      <section className="mb-5 text-center">
        <InteragroLogo className="mx-auto w-52" />
        <p className="mt-5 text-sm font-bold uppercase text-interagro-red">Interagro</p>
        <h1 className="mt-2 text-3xl font-bold text-interagro-text">Acceso privado</h1>
        <p className="mt-2 text-interagro-muted">Ingresa para revisar pedidos, clientes o administrar productos.</p>
      </section>
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
}
