import { Hero } from "@/components/hero";
import { SectionGrid } from "@/components/section-grid";
import { isLocale } from "@/lib/i18n";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    return null;
  }

  return (
    <>
      <Hero locale={locale} />
      <SectionGrid locale={locale} />
    </>
  );
}
