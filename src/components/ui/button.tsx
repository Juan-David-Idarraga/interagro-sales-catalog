import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "success";
  size?: "sm" | "md" | "lg";
};

const variants = {
  primary: "bg-interagro-red text-white hover:bg-interagro-redDark",
  secondary: "border border-interagro-green text-interagro-green hover:bg-green-50",
  ghost: "text-interagro-text hover:bg-gray-100",
  danger: "bg-red-600 text-white hover:bg-red-700",
  success: "bg-interagro-green text-white hover:bg-interagro-greenDark",
};

const sizes = {
  sm: "min-h-11 px-4 text-sm",
  md: "min-h-12 px-5 text-base",
  lg: "min-h-14 px-6 text-base font-bold",
};

export function Button({ className, variant = "primary", size = "md", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition focus:outline-none focus:ring-2 focus:ring-interagro-red focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}

type LinkButtonProps = {
  href: string;
  children: ReactNode;
  className?: string;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  target?: string;
};

export function LinkButton({ href, children, className, variant = "primary", size = "md", target }: LinkButtonProps) {
  return (
    <Link
      href={href}
      target={target}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition focus:outline-none focus:ring-2 focus:ring-interagro-red focus:ring-offset-2",
        variants[variant],
        sizes[size],
        className,
      )}
    >
      {children}
    </Link>
  );
}
