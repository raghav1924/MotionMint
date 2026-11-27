import type { Metadata } from "next";
import "./globals.css";
import { BRAND } from "@/lib/brand";
import { RenderJoyProvider } from "@/components/site/providers";
import { AppShell } from "@/components/site/app-shell";

export const metadata: Metadata = {
  title: `${BRAND.name} — ${BRAND.tagline}`,
  description: BRAND.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-appearance="light" data-theme="minimalism" data-skin="minimalism">
      <body className="min-h-screen bg-[var(--ws-bg)] text-[var(--ws-text-primary)] antialiased selection:bg-[var(--ws-accent)] selection:text-[var(--ws-accent-fg)]">
        <RenderJoyProvider>
          <AppShell>{children}</AppShell>
        </RenderJoyProvider>
      </body>
    </html>
  );
}
