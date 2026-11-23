import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { AreasTeaser, FinalCta, Process, Reviews, ServicesGrid, Stats, StoryTeaser } from "@/components/home/Sections";
import { Marquee } from "@/components/motion/Marquee";
import type { Lang } from "@/config/site";
import { getDict } from "@/lib/i18n";
import { pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ lang: Lang }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const t = getDict(lang);
  return pageMeta(lang, "/", t.meta.homeTitle, t.meta.homeDescription);
}

export default async function HomePage({ params }: Props) {
  const { lang } = await params;
  const t = getDict(lang);
  return (
    <>
      <Hero lang={lang} t={t} />
      <Marquee items={t.marquee} />
      <ServicesGrid lang={lang} t={t} />
      <Stats lang={lang} t={t} />
      <Process t={t} />
      <StoryTeaser lang={lang} t={t} />
      <AreasTeaser lang={lang} t={t} />
      <Reviews t={t} />
      <FinalCta lang={lang} t={t} />
    </>
  );
}
