import type { OrderStatus } from "./types";

export function generateOrderCode(): string {
  const now = new Date();
  const year = now.getFullYear();
  const seed = String(now.getTime()).slice(-5).padStart(5, "0");
  return `PED-${year}-${seed}`;
}

export function formatOrderStatus(status: OrderStatus): string {
  const labels: Record<OrderStatus, string> = {
    pending: "Pendiente",
    confirmed: "Confirmado",
    rejected: "Rechazado",
    delivered: "Entregado",
  };

  return labels[status];
}

export function formatDate(value: string): string {
  return new Intl.DateTimeFormat("es-CL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00`));
}

export function getRelativeDateLabel(value: string): string {
  const selected = new Date(`${value}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  if (selected.getTime() === today.getTime()) return `Hoy - ${formatDate(value)}`;
  if (selected.getTime() === tomorrow.getTime()) return `Mañana - ${formatDate(value)}`;
  return formatDate(value);
}
