import Image from "next/image";
import Link from "next/link";

import { getDictionary, localizePath } from "@/lib/i18n";
import type { Locale } from "@/lib/types";

export function Hero({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <section className="hero-card">
      <div className="hero-copy">
        <p className="eyebrow">{t.home.kicker}</p>
        <h1>{t.home.title}</h1>
        <p className="lead">{t.home.description}</p>
        <div className="hero-actions">
          <Link href={localizePath(locale, "/quote")} className="button primary">
            {t.home.primary}
          </Link>
          <Link href={localizePath(locale, "/shop")} className="button secondary">
            {t.home.secondary}
          </Link>
        </div>
      </div>
      <div className="hero-panel">
        <div className="logo-panel">
          <Image
            src="/mest-logo.png"
            alt="Mest Elektrik Elektronik"
            width={360}
            height={180}
            className="hero-logo"
            priority
          />
          <p>
            {locale === "tr"
              ? "Elektrik tesisat, elektronik parca satisi ve operasyon takibini tek dijital vitrinde birlestirin."
              : "Bring electrical services, electronics sales, and operations tracking into one clean storefront."}
          </p>
        </div>
        <div className="metric-card accent">
          <span>24h</span>
          <p>Lead triage and response dashboard</p>
        </div>
        <div className="metric-card">
          <span>2</span>
          <p>Languages with local service coverage rules</p>
        </div>
        <div className="metric-card">
          <span>1</span>
          <p>Unified admin workspace for requests and orders</p>
        </div>
      </div>
    </section>
  );
}
