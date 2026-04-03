import type {
  AppointmentRequest,
  Category,
  Notification,
  Order,
  Product,
  ServiceArea,
  ServiceRequest,
} from "@/lib/types";

export const serviceAreas: ServiceArea[] = [
  {
    city: "Istanbul",
    districts: ["Kadikoy", "Uskudar", "Besiktas", "Sisli"],
    supported: true,
  },
  {
    city: "Kocaeli",
    districts: ["Izmit", "Basiskele", "Gebze"],
    supported: true,
  },
  {
    city: "Ankara",
    districts: ["Cankaya", "Yenimahalle"],
    supported: false,
  },
];

export const categories: Category[] = [
  {
    id: "cat-switchgear",
    slug: "switchgear",
    name: { tr: "Sigorta ve Pano", en: "Circuit Protection" },
  },
  {
    id: "cat-cables",
    slug: "cables",
    name: { tr: "Kablo ve Baglanti", en: "Cables and Connectors" },
  },
  {
    id: "cat-smart-home",
    slug: "smart-home",
    name: { tr: "Akilli Sistemler", en: "Smart Systems" },
  },
];

export const products: Product[] = [
  {
    id: "prd-compact-breaker",
    slug: "compact-breaker-panel",
    categoryId: "cat-switchgear",
    name: {
      tr: "Kompakt Kacak Akim Korumali Mini Pano",
      en: "Compact RCBO Mini Panel",
    },
    summary: {
      tr: "Ev ve kucuk ofisler icin hazir mini dagitim cozumu.",
      en: "Ready-made mini distribution solution for homes and small offices.",
    },
    description: {
      tr: "Yuksek guvenlikli kompakt pano; tadilat ve yeni kurulum islerinde hizli devreye alma saglar.",
      en: "High-safety compact panel that speeds up commissioning in renovation and new installation jobs.",
    },
    price: 4250,
    stock: 18,
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80",
    featured: true,
  },
  {
    id: "prd-nyaf-kit",
    slug: "nyaf-cable-kit",
    categoryId: "cat-cables",
    name: {
      tr: "NYAF Renkli Montaj Kablo Seti",
      en: "NYAF Color Installation Cable Kit",
    },
    summary: {
      tr: "Tesisat ve panel ici baglantilar icin coklu kesit seti.",
      en: "Multi-gauge set for installation and panel wiring.",
    },
    description: {
      tr: "Atolye ve saha islerinde duzenli kablolama icin 5 renk ve 3 kesit kombinasyonu sunar.",
      en: "Offers five colors and three gauges for clean workshop and field wiring.",
    },
    price: 1890,
    stock: 34,
    image:
      "https://images.unsplash.com/photo-1581091215367-59ab6dcef10b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "prd-smart-relay",
    slug: "smart-relay-module",
    categoryId: "cat-smart-home",
    name: {
      tr: "Wi-Fi Akilli Role Modulu",
      en: "Wi-Fi Smart Relay Module",
    },
    summary: {
      tr: "Aydinlatma ve priz kontrolunu uzaktan yonetmek icin.",
      en: "For remote lighting and outlet control.",
    },
    description: {
      tr: "Mevcut altyapiya minimum mudahaleyle otomasyon eklemek isteyen projeler icin ideal.",
      en: "Ideal for projects that want automation with minimal changes to the existing setup.",
    },
    price: 950,
    stock: 52,
    image:
      "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&w=1200&q=80",
    featured: true,
  },
];

export const notificationsSeed: Notification[] = [
  {
    id: "ntf-1",
    channel: "panel",
    title: "Yeni hizmet talebi",
    message: "Kadikoy bolgesinden yeni tesisat kesif talebi geldi.",
    createdAt: new Date().toISOString(),
    read: false,
  },
  {
    id: "ntf-2",
    channel: "whatsapp",
    title: "WhatsApp adapter hazir",
    message: "Mobil bildirimler icin webhook tabanli baglanti noktalari kuruldu.",
    createdAt: new Date().toISOString(),
    read: false,
  },
];

export const serviceRequestsSeed: ServiceRequest[] = [];
export const appointmentRequestsSeed: AppointmentRequest[] = [];
export const ordersSeed: Order[] = [];
