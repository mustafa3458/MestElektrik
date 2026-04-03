import { CheckoutForm } from "@/components/forms";
import { getProducts } from "@/lib/store";
import { isLocale } from "@/lib/i18n";

export default async function CheckoutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    return null;
  }

  return (
    <div className="stack">
      <section className="page-intro">
        <h1>{locale === "tr" ? "Odeme ve siparis olusturma" : "Checkout and order creation"}</h1>
        <p>
          {locale === "tr"
            ? "Provider adapter mantigi ile siparis kaydini olusturun; gercek odeme saglayicisi sonra baglanacak."
            : "Create an order against the provider adapter interface so a real payment gateway can be attached later."}
        </p>
      </section>
      <CheckoutForm locale={locale} products={getProducts()} />
    </div>
  );
}
