"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LoginForm() {
  const searchParams = useSearchParams();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user, password }),
    });

    setIsLoading(false);

    if (!response.ok) {
      const data = (await response.json()) as { error?: string };
      setError(data.error || "No pudimos iniciar sesión.");
      return;
    }

    const data = (await response.json()) as { redirectTo: string };
    const next = searchParams.get("next");
    window.location.href = next && next.startsWith("/") ? next : data.redirectTo;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-3xl border border-interagro-border bg-white p-5 shadow-soft">
      <label className="block">
        <span className="mb-2 block text-sm font-bold text-interagro-text">Usuario</span>
        <input
          value={user}
          onChange={(event) => setUser(event.target.value)}
          className="min-h-12 w-full rounded-xl border border-interagro-border px-4 outline-none focus:border-interagro-red"
          placeholder="Ingresa tu usuario"
          autoComplete="username"
        />
      </label>
      <label className="block">
        <span className="mb-2 block text-sm font-bold text-interagro-text">Contraseña</span>
        <input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          type="password"
          className="min-h-12 w-full rounded-xl border border-interagro-border px-4 outline-none focus:border-interagro-red"
          placeholder="Ingresa tu contraseña"
          autoComplete="current-password"
        />
      </label>
      {error ? <p className="rounded-xl bg-red-50 p-3 text-sm font-bold text-red-700">{error}</p> : null}
      <Button disabled={isLoading} type="submit" size="lg" className="w-full">
        <LogIn size={22} />
        {isLoading ? "Ingresando..." : "Ingresar"}
      </Button>
    </form>
  );
}
