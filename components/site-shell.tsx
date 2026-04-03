"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { getDictionary, localizePath } from "@/lib/i18n";
import type { Locale } from "@/lib/types";

type SiteShellProps = {
  locale: Locale;
  children: ReactNode;
};

export function SiteShell({ locale, children }: SiteShellProps) {
  const t = getDictionary(locale);
  const pathname = usePathname();

  const navItems = [
    { label: t.nav.home, href: localizePath(locale) },
    { label: t.nav.services, href: localizePath(locale, "/services") },
    { label: t.nav.quote, href: localizePath(locale, "/quote") },
    { label: t.nav.shop, href: localizePath(locale, "/shop") },
    { label: t.nav.about, href: localizePath(locale, "/about") },
    { label: t.nav.contact, href: localizePath(locale, "/contact") },
  ];

  const alternateLocale = locale === "tr" ? "en" : "tr";
  const alternatePath =
    pathname?.replace(`/${locale}`, `/${alternateLocale}`) || localizePath(alternateLocale);

  return (
    <div className="site-shell">
      <header className="header">
        <Link href={localizePath(locale)} className="brand">
          <Image
            src="/mest-logo.png"
            alt="Mest Elektrik Elektronik"
            width={156}
            height={58}
            className="brand-logo"
            priority
          />
        </Link>
        <nav className="nav">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={pathname === item.href ? "nav-link active" : "nav-link"}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <Link href={alternatePath} className="lang-switch">
            {alternateLocale.toUpperCase()}
          </Link>
          <Link href={localizePath(locale, "/cart")} className="cart-pill">
            {t.nav.cart}
          </Link>
        </div>
      </header>
      <main>{children}</main>
      <footer className="footer">
        <p>Elektrik Mest</p>
        <p>Electrical field service and component commerce workspace.</p>
      </footer>
    </div>
  );
}
