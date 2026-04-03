import {
  appointmentRequestsSeed,
  categories,
  notificationsSeed,
  ordersSeed,
  products,
  serviceAreas,
  serviceRequestsSeed,
} from "@/lib/data";
import type {
  AppointmentRequest,
  Customer,
  DashboardSummary,
  Notification,
  Order,
  Product,
  ServiceRequest,
} from "@/lib/types";
import { estimateQuote } from "@/lib/quote";

const db = {
  categories,
  products,
  serviceAreas,
  notifications: notificationsSeed,
  serviceRequests: serviceRequestsSeed,
  appointmentRequests: appointmentRequestsSeed,
  orders: ordersSeed,
};

function createId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

function createNotification(title: string, message: string, channel: Notification["channel"] = "panel") {
  const notification: Notification = {
    id: createId("ntf"),
    channel,
    title,
    message,
    createdAt: new Date().toISOString(),
    read: false,
  };
  db.notifications.unshift(notification);
}

export function getDashboardSummary(): DashboardSummary {
  return {
    orders: db.orders,
    serviceRequests: db.serviceRequests,
    appointmentRequests: db.appointmentRequests,
    notifications: db.notifications,
    products: db.products,
    categories: db.categories,
    serviceAreas: db.serviceAreas,
  };
}

export function getProducts() {
  return db.products;
}

export function getProductBySlug(slug: string) {
  return db.products.find((product) => product.slug === slug);
}

export function createServiceRequest(
  payload: Omit<ServiceRequest, "id" | "createdAt" | "status" | "estimate">,
) {
  const estimate = estimateQuote(payload);
  const record: ServiceRequest = {
    ...payload,
    id: createId("srv"),
    estimate,
    status: "new",
    createdAt: new Date().toISOString(),
  };

  db.serviceRequests.unshift(record);
  createNotification(
    "New service request",
    `${record.fullName} submitted a ${record.jobType} request for ${record.city}/${record.district}.`,
  );
  createNotification(
    "WhatsApp queue event",
    `Service request ${record.id} is ready for mobile delivery.`,
    "whatsapp",
  );
  return record;
}

export function createAppointmentRequest(
  payload: Omit<AppointmentRequest, "id" | "createdAt" | "status">,
) {
  const record: AppointmentRequest = {
    ...payload,
    id: createId("apt"),
    status: "new",
    createdAt: new Date().toISOString(),
  };

  db.appointmentRequests.unshift(record);
  createNotification(
    "New appointment request",
    `${record.fullName} requested ${record.requestedWindow} for ${record.city}/${record.district}.`,
  );
  return record;
}

export function createOrder(payload: { customer: Customer; items: Array<{ productId: string; quantity: number }> }) {
  const items = payload.items
    .map((item) => {
      const product = db.products.find((entry) => entry.id === item.productId);
      if (!product) {
        return null;
      }
      return { ...item, product };
    })
    .filter(Boolean) as Array<{ productId: string; quantity: number; product: Product }>;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const order: Order = {
    id: createId("ord"),
    customer: payload.customer,
    items,
    subtotal,
    paymentStatus: items.length ? "pending" : "failed",
    provider: "mock-adapter",
    createdAt: new Date().toISOString(),
  };

  items.forEach((item) => {
    item.product.stock = Math.max(0, item.product.stock - item.quantity);
  });

  db.orders.unshift(order);
  createNotification(
    "New order",
    `${payload.customer.fullName} created order ${order.id} with ${items.length} line items.`,
    "email",
  );
  return order;
}
