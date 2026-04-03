import { isLocale } from "@/lib/i18n";

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    return null;
  }

  return (
    <div className="stack">
      <section className="page-intro">
        <h1>{locale === "tr" ? "Elektrik saha hizmetleri" : "Electrical field services"}</h1>
        <p>
          {locale === "tr"
            ? "Konut, ofis ve ticari alanlarda tesisat, ariza tespiti, pano yenileme ve akilli sistem donusumleri icin talep toplayan profesyonel hizmet katmani."
            : "A service layer for residential, office, and commercial installation, diagnostics, panel renewal, and smart retrofit requests."}
        </p>
      </section>
      <div className="three-column-grid">
        <article className="info-card">
          <h3>{locale === "tr" ? "Yeni kurulum" : "New installation"}</h3>
          <p>Full wiring design, panel sizing, cable path preparation, and phased delivery planning.</p>
        </article>
        <article className="info-card">
          <h3>{locale === "tr" ? "Tadilat ve guvenlik" : "Renovation and safety"}</h3>
          <p>Upgrade aged lines, renew protection devices, and align load distribution with the new layout.</p>
        </article>
        <article className="info-card">
          <h3>{locale === "tr" ? "Akilli sistem hazirligi" : "Smart system retrofit"}</h3>
          <p>Prepare relay, sensor, and remote switch infrastructure without overbuilding the project scope.</p>
        </article>
      </div>
    </div>
  );
}
