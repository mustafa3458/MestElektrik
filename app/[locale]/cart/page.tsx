import Link from "next/link";

import { getProducts } from "@/lib/store";
import { isLocale, localizePath } from "@/lib/i18n";

export default async function CartPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    return null;
  }

  const sampleItems = getProducts().slice(0, 2);
  const total = sampleItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="stack">
      <section className="page-intro">
        <h1>{locale === "tr" ? "Sepet ozeti" : "Cart summary"}</h1>
        <p>
          {locale === "tr"
            ? "Ilk surumde sepet ornek akis olarak gosterilir; asagidan odeme ekranina gecilir."
            : "The first release shows a lightweight cart flow and routes into checkout."}
        </p>
      </section>
      <section className="table-card">
        <table>
          <thead>
            <tr>
              <th>{locale === "tr" ? "Urun" : "Product"}</th>
              <th>{locale === "tr" ? "Fiyat" : "Price"}</th>
            </tr>
          </thead>
          <tbody>
            {sampleItems.map((item) => (
              <tr key={item.id}>
                <td>{item.name[locale]}</td>
                <td>{item.price.toLocaleString("tr-TR")} TL</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="price">{total.toLocaleString("tr-TR")} TL</p>
        <Link href={localizePath(locale, "/checkout")} className="button primary">
          {locale === "tr" ? "Odeme ekranina gec" : "Proceed to checkout"}
        </Link>
      </section>
    </div>
  );
}
