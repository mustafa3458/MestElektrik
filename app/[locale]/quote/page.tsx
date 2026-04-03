import { QuoteForm } from "@/components/forms";
import { isLocale } from "@/lib/i18n";

export default async function QuotePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    return null;
  }

  return (
    <div className="stack">
      <section className="page-intro">
        <h1>{locale === "tr" ? "Teklif hesapla" : "Calculate a quote"}</h1>
        <p>
          {locale === "tr"
            ? "m2, kat ve daire bilgilerine gore ortalama tesisat fiyatini gorun; ayni anda kayit birakarak admin paneline talep olusturun."
            : "See an average installation price based on square meters, floors, and unit count, then convert it into a saved lead."}
        </p>
      </section>
      <QuoteForm locale={locale} />
    </div>
  );
}
