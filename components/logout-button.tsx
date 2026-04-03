"use client";

import { useRouter } from "next/navigation";

import type { Locale } from "@/lib/types";

export function LogoutButton({ locale }: { locale: Locale }) {
  const router = useRouter();

  return (
    <button
      type="button"
      className="button secondary"
      onClick={async () => {
        await fetch("/api/logout", { method: "POST" });
        router.push(`/${locale}/login`);
        router.refresh();
      }}
    >
      {locale === "tr" ? "Cikis yap" : "Sign out"}
    </button>
  );
}
