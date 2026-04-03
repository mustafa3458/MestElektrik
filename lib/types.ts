export type Locale = "tr" | "en";

export type Status =
  | "new"
  | "reviewing"
  | "quoted"
  | "scheduled"
  | "completed"
  | "cancelled";

export type ServiceArea = {
  city: string;
  districts: string[];
  supported: boolean;
};

export type QuoteInput = {
  city: string;
  district: string;
  propertyType: "apartment" | "villa" | "office" | "shop";
  squareMeters: number;
  floorCount: number;
  apartmentCount: number;
  jobType: "new-installation" | "renovation" | "fault-detection" | "panel-upgrade";
};

export type QuoteEstimate = {
  packageLabel: string;
  minimumPrice: number;
  averagePrice: number;
  maximumPrice: number;
  timelineDays: string;
  supportedArea: boolean;
};

export type ContactInfo = {
  fullName: string;
  phone: string;
  email: string;
};

export type ServiceRequest = QuoteInput &
  ContactInfo & {
    id: string;
    notes: string;
    estimate: QuoteEstimate;
    status: Status;
    createdAt: string;
  };

export type AppointmentRequest = ContactInfo & {
  id: string;
  city: string;
  district: string;
  requestedWindow: string;
  serviceNeed: string;
  notes: string;
  status: Status;
  createdAt: string;
};

export type Category = {
  id: string;
  slug: string;
  name: Record<Locale, string>;
};

export type Product = {
  id: string;
  slug: string;
  categoryId: string;
  name: Record<Locale, string>;
  summary: Record<Locale, string>;
  description: Record<Locale, string>;
  price: number;
  stock: number;
  image: string;
  featured?: boolean;
};

export type CartItem = {
  productId: string;
  quantity: number;
};

export type Customer = ContactInfo & {
  company?: string;
  address: string;
};

export type Order = {
  id: string;
  customer: Customer;
  items: Array<CartItem & { product: Product }>;
  subtotal: number;
  paymentStatus: "pending" | "paid" | "failed";
  provider: "mock-adapter";
  createdAt: string;
};

export type Notification = {
  id: string;
  channel: "panel" | "email" | "whatsapp";
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
};

export type DashboardSummary = {
  orders: Order[];
  serviceRequests: ServiceRequest[];
  appointmentRequests: AppointmentRequest[];
  notifications: Notification[];
  products: Product[];
  categories: Category[];
  serviceAreas: ServiceArea[];
};
