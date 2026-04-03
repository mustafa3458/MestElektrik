import type { Locale } from "@/lib/types";

export const locales: Locale[] = ["tr", "en"];
export const defaultLocale: Locale = "tr";

export const dictionary = {
  tr: {
    brand: "Elektrik Mest",
    nav: {
      home: "Ana Sayfa",
      services: "Hizmetler",
      quote: "Teklif Al",
      appointment: "Randevu Talebi",
      shop: "Magaza",
      about: "Hakkimizda",
      contact: "Iletisim",
      admin: "Admin",
      cart: "Sepet",
    },
    home: {
      kicker: "Elektrik ve elektronik cozum merkezi",
      title: "Tesisat teklifinden elektronik urun satisina kadar tek platform",
      description:
        "Elektrik tesisati icin ortalama fiyat alin, kesif talebi birakin, urun satin alin ve tum operasyonu tek panelden yonetin.",
      primary: "Teklif Hesapla",
      secondary: "Magazayi Incele",
    },
    common: {
      currency: "TL",
      average: "Ortalama fiyat",
      starting: "Baslangic araligi",
      submit: "Gonder",
      loading: "Isleniyor...",
      supported: "Hizmet bolgesinde",
      unsupported: "Destek disi, talep yine kaydedilir",
      note: "Kesin fiyat saha kesfi sonrasi netlesir.",
    },
  },
  en: {
    brand: "Elektrik Mest",
    nav: {
      home: "Home",
      services: "Services",
      quote: "Get Quote",
      appointment: "Request Visit",
      shop: "Shop",
      about: "About",
      contact: "Contact",
      admin: "Admin",
      cart: "Cart",
    },
    home: {
      kicker: "Electrical and electronics delivery hub",
      title: "One platform for installation quotes, service requests, and electronics sales",
      description:
        "Get an estimated wiring cost, send a site visit request, sell components, and monitor everything from one dashboard.",
      primary: "Calculate Quote",
      secondary: "Browse Store",
    },
    common: {
      currency: "TRY",
      average: "Average price",
      starting: "Starting range",
      submit: "Submit",
      loading: "Processing...",
      supported: "Within service area",
      unsupported: "Outside coverage, request is still saved",
      note: "Final pricing is confirmed after the site survey.",
    },
  },
} as const;

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getDictionary(locale: Locale) {
  return dictionary[locale];
}

export function localizePath(locale: Locale, path = "") {
  return `/${locale}${path}`;
}
