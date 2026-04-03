import { redirect } from "next/navigation";

import { LoginForm } from "@/components/login-form";
import { isAdminAuthenticated, oauthProviders } from "@/lib/auth";
import { isLocale } from "@/lib/i18n";

export default async function LoginPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    return null;
  }

  if (await isAdminAuthenticated()) {
    redirect(`/${locale}/admin`);
  }

  return (
    <div className="stack">
      <section className="page-intro">
        <h1>{locale === "tr" ? "Guvenli giris" : "Secure sign in"}</h1>
        <p>
          {locale === "tr"
            ? "Yonetim paneline girmek icin e-posta ve sifre kullanin ya da desteklenen saglayicilarla devam edin."
            : "Use email and password or continue with supported providers to access the admin dashboard."}
        </p>
      </section>
      <LoginForm
        locale={locale}
        googleEnabled={oauthProviders.google}
        appleEnabled={oauthProviders.apple}
      />
    </div>
  );
}
