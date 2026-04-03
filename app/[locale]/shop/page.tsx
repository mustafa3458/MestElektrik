import Link from "next/link";

import { getProducts } from "@/lib/store";
import { isLocale, localizePath } from "@/lib/i18n";

export default async function ShopPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    return null;
  }

  const products = getProducts();

  return (
    <div className="stack">
      <section className="page-intro">
        <h1>{locale === "tr" ? "Elektronik urun magazasi" : "Electronics storefront"}</h1>
        <p>
          {locale === "tr"
            ? "Saha projelerinde kullanilabilecek urunleri kategori, stok ve fiyat bilgileriyle satin."
            : "Sell field-ready components with category, stock, and price visibility."}
        </p>
      </section>
      <section className="catalog-grid">
        {products.map((product) => (
          <article key={product.id} className="product-card">
            <div
              className="product-image"
              style={{ backgroundImage: `linear-gradient(145deg, rgba(5,18,33,.2), rgba(255,255,255,.15)), url(${product.image})` }}
            />
            <h3>{product.name[locale]}</h3>
            <p>{product.summary[locale]}</p>
            <strong>{product.price.toLocaleString("tr-TR")} TL</strong>
            <Link href={localizePath(locale, `/shop/${product.slug}`)} className="text-link">
              {locale === "tr" ? "Detay" : "Details"}
            </Link>
          </article>
        ))}
      </section>
    </div>
  );
}
