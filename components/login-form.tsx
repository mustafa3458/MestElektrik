"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import type { Locale } from "@/lib/types";

type LoginFormProps = {
  locale: Locale;
  googleEnabled: boolean;
  appleEnabled: boolean;
};

export function LoginForm({ locale, googleEnabled, appleEnabled }: LoginFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("mustafaemin3458@gmail.com");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCredentialsSignIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    setLoading(false);

    if (!response.ok) {
      setError(
        locale === "tr"
          ? "E-posta veya sifre hatali."
          : "The email or password is incorrect.",
      );
      return;
    }

    router.push(`/${locale}/admin`);
    router.refresh();
  }

  return (
    <div className="split-layout">
      <form className="form-card" onSubmit={handleCredentialsSignIn}>
        <h2>{locale === "tr" ? "Yonetim paneli girisi" : "Admin panel sign in"}</h2>
        <div className="form-grid">
          <label className="full-span">
            Email
            <input value={email} onChange={(event) => setEmail(event.target.value)} />
          </label>
          <label className="full-span">
            {locale === "tr" ? "Sifre" : "Password"}
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
        </div>
        {error ? <p className="form-error">{error}</p> : null}
        <div className="button-row">
          <button type="submit" className="button primary">
            {loading ? "..." : locale === "tr" ? "Giris yap" : "Sign in"}
          </button>
        </div>
      </form>

      <aside className="side-card auth-panel">
        <h3>{locale === "tr" ? "Harici giris" : "External sign in"}</h3>
        <div className="auth-provider-list">
          <button
            type="button"
            className="button secondary auth-provider"
            disabled={!googleEnabled}
          >
            Google
          </button>
          <button
            type="button"
            className="button secondary auth-provider"
            disabled={!appleEnabled}
          >
            Apple
          </button>
        </div>
        <p className="helper-text">
          {locale === "tr"
            ? "Google ve Apple girisi altyapisi eklendi. Uygulama anahtarlari girildiginde aktif olarak calisacak."
            : "Google and Apple sign-in have been wired in. They become active once provider keys are added."}
        </p>
      </aside>
    </div>
  );
}
