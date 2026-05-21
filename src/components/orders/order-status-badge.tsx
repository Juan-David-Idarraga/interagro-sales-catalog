import type { OrderStatus } from "@/lib/types";
import { formatOrderStatus } from "@/lib/order-utils";
import { cn } from "@/lib/utils";

const styles: Record<OrderStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  confirmed: "bg-green-100 text-green-800 border-green-200",
  rejected: "bg-red-100 text-red-800 border-red-200",
  delivered: "bg-blue-100 text-blue-800 border-blue-200",
};

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span className={cn("inline-flex rounded-full border px-3 py-1 text-sm font-bold", styles[status])}>
      {formatOrderStatus(status)}
    </span>
  );
}
