import { AdminDashboard } from "@/components/admin-dashboard";
import { LogoutButton } from "@/components/logout-button";
import { isAdminAuthenticated } from "@/lib/auth";
import { isLocale } from "@/lib/i18n";
import { redirect } from "next/navigation";

export default async function AdminPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    return null;
  }

  if (!(await isAdminAuthenticated())) {
    redirect(`/${locale}/login`);
  }

  return (
    <div className="stack">
      <section className="page-intro">
        <h1>{locale === "tr" ? "Yonetim paneli" : "Admin dashboard"}</h1>
        <p>
          {locale === "tr"
            ? "Hizmet talepleri, randevu istekleri, siparisler, stok ve bildirim olaylari tek ekranda toplanir."
            : "Service leads, appointment requests, orders, stock, and notification events are collected in a unified dashboard."}
        </p>
        <div className="button-row">
          <LogoutButton locale={locale} />
        </div>
      </section>
      <AdminDashboard locale={locale} />
    </div>
  );
}
