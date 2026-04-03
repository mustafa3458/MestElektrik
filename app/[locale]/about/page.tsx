import { isLocale } from "@/lib/i18n";

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    return null;
  }

  return (
    <div className="stack">
      <section className="page-intro">
        <h1>{locale === "tr" ? "Elektrik Mest hakkinda" : "About Elektrik Mest"}</h1>
        <p>
          {locale === "tr"
            ? "Marka, saha hizmeti ile elektronik urun ticaretini ayni deneyimde birlestiren dijital operasyon merkezi olarak konumlanir."
            : "The brand is positioned as a digital operations hub that combines field service and component commerce in one experience."}
        </p>
      </section>
      <div className="three-column-grid">
        <article className="info-card">
          <h3>{locale === "tr" ? "Hizmet disiplini" : "Service discipline"}</h3>
          <p>Structured intake, clear coverage rules, and estimate-first communication for faster qualification.</p>
        </article>
        <article className="info-card">
          <h3>{locale === "tr" ? "Satis altyapisi" : "Commerce layer"}</h3>
          <p>Category-led inventory, checkout, and notification events ready for payment provider expansion.</p>
        </article>
        <article className="info-card">
          <h3>{locale === "tr" ? "Operasyon paneli" : "Operations dashboard"}</h3>
          <p>One admin view for requests, appointment leads, notifications, and order records.</p>
        </article>
      </div>
    </div>
  );
}
