"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

type BackButtonProps = {
  href?: string;
  label?: string;
  className?: string;
  fallback?: string;
};

const baseClass =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-interagro-border bg-white px-4 text-sm font-bold text-interagro-text shadow-sm transition hover:border-interagro-green hover:bg-green-50";

export function BackButton({ href, label = "Volver", className, fallback }: BackButtonProps) {
  const router = useRouter();

  if (href) {
    return (
      <Link href={href} className={cn(baseClass, className)}>
        <ArrowLeft size={18} />
        {label}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={cn(baseClass, className)}
      onClick={() => {
        if (window.history.length > 1) {
          router.back();
          return;
        }

        router.push(fallback || "/");
      }}
    >
      <ArrowLeft size={18} />
      {label}
    </button>
  );
}
