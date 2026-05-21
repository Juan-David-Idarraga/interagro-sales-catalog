export type ProductStatus = "available" | "ask";

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  format: string;
  conservation: "Congelado" | "Refrigerado" | "Ambiente" | "Consultar";
  code: string;
  price: string;
  observation?: string;
  imageUrl?: string;
  status: ProductStatus;
  isActive: boolean;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
};

export type Customer = {
  id: string;
  businessName: string;
  contactName: string;
  rut?: string;
  phone: string;
  commune: string;
  address: string;
  createdAt: string;
};

export type OrderItem = {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  format: string;
  conservation: string;
  code: string;
  price: string;
  observation?: string;
};

export type OrderStatus = "pending" | "confirmed" | "rejected" | "delivered";

export type Order = {
  id: string;
  code: string;
  customer: Customer;
  items: OrderItem[];
  status: OrderStatus;
  desiredDate: string;
  desiredTimeRange: string;
  comment?: string;
  createdAt: string;
  updatedAt: string;
};
