import Link from "next/link";
import { notFound } from "next/navigation";

import { getProductBySlug } from "@/lib/store";
import { isLocale, localizePath } from "@/lib/i18n";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) {
    return null;
  }

  const product = getProductBySlug(slug);
  if (!product) {
    notFound();
  }

  return (
    <div className="stack">
      <section className="hero-card">
        <div>
          <p className="eyebrow">{locale === "tr" ? "Urun detay" : "Product detail"}</p>
          <h1>{product.name[locale]}</h1>
          <p className="lead">{product.description[locale]}</p>
          <p className="price">{product.price.toLocaleString("tr-TR")} TL</p>
          <p>{locale === "tr" ? "Stok" : "Stock"}: {product.stock}</p>
          <div className="hero-actions">
            <Link href={localizePath(locale, "/checkout")} className="button primary">
              {locale === "tr" ? "Satinalma akisina git" : "Go to checkout"}
            </Link>
            <Link href={localizePath(locale, "/shop")} className="button secondary">
              {locale === "tr" ? "Magazaya don" : "Back to shop"}
            </Link>
          </div>
        </div>
        <div
          className="product-image"
          style={{
            height: "100%",
            minHeight: 320,
            backgroundImage: `linear-gradient(145deg, rgba(5,18,33,.2), rgba(255,255,255,.15)), url(${product.image})`,
          }}
        />
      </section>
    </div>
  );
}
