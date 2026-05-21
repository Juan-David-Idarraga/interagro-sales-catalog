"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Customer, Order, OrderItem, Product } from "@/lib/types";
import { generateOrderCode } from "@/lib/order-utils";

type OrderStore = {
  items: OrderItem[];
  currentOrder?: Order;
  addProduct: (product: Product) => void;
  increaseItem: (productId: string) => void;
  decreaseItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  clearItems: () => void;
  createOrder: (
    customer: Omit<Customer, "id" | "createdAt">,
    schedule: { desiredDate: string; desiredTimeRange: string },
    comment?: string,
  ) => Order;
};

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      items: [],
      addProduct: (product) => {
        const existing = get().items.find((item) => item.productId === product.id);

        if (existing) {
          get().increaseItem(product.id);
          return;
        }

        set((state) => ({
          items: [
            ...state.items,
            {
              id: `item-${product.id}`,
              productId: product.id,
              productName: product.name,
              quantity: 1,
              format: product.format,
              conservation: product.conservation,
              code: product.code,
              price: product.price,
              observation: product.observation,
            },
          ],
        }));
      },
      increaseItem: (productId) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item,
          ),
        })),
      decreaseItem: (productId) =>
        set((state) => ({
          items: state.items
            .map((item) =>
              item.productId === productId ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item,
            )
            .filter((item) => item.quantity > 0),
        })),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        })),
      clearItems: () => set({ items: [] }),
      createOrder: (customerData, schedule, comment) => {
        const now = new Date().toISOString();
        const customer: Customer = {
          ...customerData,
          id: `customer-${Date.now()}`,
          createdAt: now,
        };
        const order: Order = {
          id: `order-${Date.now()}`,
          code: generateOrderCode(),
          customer,
          items: get().items,
          status: "pending",
          desiredDate: schedule.desiredDate,
          desiredTimeRange: schedule.desiredTimeRange,
          comment,
          createdAt: now,
          updatedAt: now,
        };

        set({ currentOrder: order, items: [] });
        return order;
      },
    }),
    {
      name: "interagro-order",
    },
  ),
);
