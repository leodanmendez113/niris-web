import type { Metadata, Viewport } from "next";
import { DM_Sans, Outfit } from "next/font/google";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import "../globals.css";
import { DemoRibbon } from "@/components/layout/DemoRibbon";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Analytics } from "@/components/seo/Analytics";
import { BusinessJsonLd } from "@/components/seo/JsonLd";
import { RegisterSW } from "@/components/seo/RegisterSW";
import { WhatsAppWidget } from "@/components/whatsapp/WhatsAppWidget";
import { langs, site } from "@/config/site";
import { getDict, isLang } from "@/lib/i18n";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", display: "swap" });
const dm = DM_Sans({ subsets: ["latin"], variable: "--font-dm", display: "swap" });

export const dynamicParams = false;
export const generateStaticParams = () => langs.map((lang) => ({ lang }));

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  applicationName: site.name,
  icons: {
    icon: [
      { url: `${site.basePath}/icons/favicon.svg`, type: "image/svg+xml" },
      { url: `${site.basePath}/icons/icon-192.png`, sizes: "192x192", type: "image/png" },
    ],
    apple: `${site.basePath}/icons/apple-touch-icon.png`,
  },
  formatDetection: { telephone: true },
};

export const viewport: Viewport = { themeColor: site.colors.navy, width: "device-width", initialScale: 1 };

export default async function LangLayout({ children, params }: { children: ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = getDict(lang);
  return (
    <html lang={lang} className={`${outfit.variable} ${dm.variable}`}>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[60] focus:rounded-full focus:bg-teal focus:px-4 focus:py-2 focus:text-navy-deep">
          {t.nav.skip}
        </a>
        <Header lang={lang} t={t} />
        <main id="main">{children}</main>
        <Footer lang={lang} t={t} />
        <WhatsAppWidget t={t} />
        <DemoRibbon text={t.demo} />
        <BusinessJsonLd lang={lang} t={t} />
        <Analytics />
        <RegisterSW />
      </body>
    </html>
  );
}
