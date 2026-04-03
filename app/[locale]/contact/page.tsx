import { isLocale } from "@/lib/i18n";

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    return null;
  }

  return (
    <div className="stack">
      <section className="page-intro">
        <h1>{locale === "tr" ? "Iletisim" : "Contact"}</h1>
        <p>
          {locale === "tr"
            ? "Telefon, e-posta ve servis bolgesi bazli on gorusme bilgilerini bu sayfada sunun."
            : "Present phone, email, and service-area based pre-sales contact details on this page."}
        </p>
      </section>
      <div className="three-column-grid">
        <article className="info-card">
          <h3>Phone</h3>
          <p>+90 555 010 10 10</p>
        </article>
        <article className="info-card">
          <h3>Email</h3>
          <p>hello@elektrikmest.com</p>
        </article>
        <article className="info-card">
          <h3>{locale === "tr" ? "Bolge" : "Coverage"}</h3>
          <p>Istanbul, Kocaeli with manual review outside the live area.</p>
        </article>
      </div>
    </div>
  );
}
