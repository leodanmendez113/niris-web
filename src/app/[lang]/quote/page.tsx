import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { QuoteCalculator } from "@/components/quote/QuoteCalculator";
import type { Lang } from "@/config/site";
import { getDict } from "@/lib/i18n";
import { pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ lang: Lang }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const t = getDict(lang);
  return pageMeta(lang, "/quote", t.meta.quoteTitle, t.meta.quoteDescription);
}

export default async function QuotePage({ params }: Props) {
  const { lang } = await params;
  const t = getDict(lang);
  return (
    <>
      <PageHero eyebrow={t.quote.eyebrow} title={t.quote.h1} lead={t.quote.intro} />
      <section className="py-10 md:py-16">
        <div className="container-x"><QuoteCalculator lang={lang} t={t} /></div>
      </section>
    </>
  );
}
