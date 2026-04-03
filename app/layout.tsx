import type { Metadata } from "next";

import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Elektrik Mest",
  description: "Electrical services and electronics commerce platform",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
