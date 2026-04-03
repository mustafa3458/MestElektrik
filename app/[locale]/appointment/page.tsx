import { AppointmentForm } from "@/components/forms";
import { isLocale } from "@/lib/i18n";

export default async function AppointmentPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    return null;
  }

  return (
    <div className="stack">
      <section className="page-intro">
        <h1>{locale === "tr" ? "Kesif ve randevu talebi" : "Survey and visit request"}</h1>
        <p>
          {locale === "tr"
            ? "Takvimli rezervasyon yerine musaitlik degerlendirmesi icin zaman araligi secin; talep yonetici paneline dussun."
            : "Instead of instant booking, collect preferred time windows and route them into the admin dashboard for manual confirmation."}
        </p>
      </section>
      <AppointmentForm locale={locale} />
    </div>
  );
}
