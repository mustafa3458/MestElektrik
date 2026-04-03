import Link from "next/link";

import { getProducts } from "@/lib/store";
import { localizePath } from "@/lib/i18n";
import type { Locale } from "@/lib/types";

const serviceCards = [
  {
    title: "Residential rewiring",
    body: "Apartment, villa, and renovation focused wiring projects with panel renewal and safety upgrade planning.",
  },
  {
    title: "Commercial maintenance",
    body: "Office and store infrastructure checks, breaker upgrades, lighting optimization, and issue detection.",
  },
  {
    title: "Smart retrofit",
    body: "Remote relay, switch automation, and energy monitoring preparation for modernized installations.",
  },
];

const processSteps = [
  "Fill in your property and district details to get an average service estimate.",
  "Send a site visit request with your preferred time range.",
  "Track orders, service leads, and notifications in one admin dashboard.",
];

export function SectionGrid({ locale }: { locale: Locale }) {
  const featured = getProducts().filter((product) => product.featured);

  return (
    <div className="stack">
      <section>
        <div className="section-heading">
          <h2>Field services</h2>
          <Link href={localizePath(locale, "/services")} className="text-link">
            Details
          </Link>
        </div>
        <div className="three-column-grid">
          {serviceCards.map((card) => (
            <article key={card.title} className="info-card">
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <div className="section-heading">
          <h2>Featured products</h2>
          <Link href={localizePath(locale, "/shop")} className="text-link">
            Shop all
          </Link>
        </div>
        <div className="three-column-grid">
          {featured.map((product) => (
            <article key={product.id} className="product-card">
              <div
                className="product-image"
                style={{ backgroundImage: `linear-gradient(145deg, rgba(5,18,33,.25), rgba(255,255,255,.15)), url(${product.image})` }}
              />
              <h3>{product.name[locale]}</h3>
              <p>{product.summary[locale]}</p>
              <strong>{product.price.toLocaleString("tr-TR")} TL</strong>
            </article>
          ))}
        </div>
      </section>

      <section>
        <div className="section-heading">
          <h2>How it works</h2>
        </div>
        <div className="process-grid">
          {processSteps.map((step, index) => (
            <article key={step} className="process-card">
              <span>0{index + 1}</span>
              <p>{step}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
