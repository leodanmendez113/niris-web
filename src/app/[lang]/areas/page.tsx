import type { Metadata } from "next";
import { PinIcon } from "@/components/Icons";
import { FinalCta, SectionHead, ServiceCard } from "@/components/home/Sections";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { serviceSlugs, type Lang } from "@/config/site";
import { getDict } from "@/lib/i18n";
import { pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ lang: Lang }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const t = getDict(lang);
  return pageMeta(lang, "/areas", t.meta.areasTitle, t.meta.areasDescription);
}

export default async function AreasPage({ params }: Props) {
  const { lang } = await params;
  const t = getDict(lang);
  return (
    <>
      <PageHero eyebrow={t.areas.eyebrow} title={t.areas.h1} lead={t.areas.intro} />
      <section className="py-16 md:py-24">
        <div className="container-x grid gap-6 md:grid-cols-2">
          {t.areas.counties.map((c, ci) => (
            <Reveal key={c.name} delay={ci * 0.1} className="card p-6 md:p-9">
              <h2 className="flex items-center gap-3 text-2xl font-bold md:text-3xl">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-teal text-navy-deep"><PinIcon className="h-6 w-6" /></span>
                {c.name}
              </h2>
              <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-2.5">
                {c.cities.map((city) => (
                  <li key={city} className="flex items-center gap-2 text-navy/85">
                    <span className="h-1.5 w-1.5 rounded-full bg-teal" /> {city}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="bg-cream-dark py-16 md:py-24">
        <div className="container-x">
          <SectionHead {...t.servicesSection} />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {serviceSlugs.map((s, i) => <ServiceCard key={s} lang={lang} t={t} slug={s} delay={i * 0.08} />)}
          </div>
        </div>
      </section>
      <div className="pt-16 md:pt-24"><FinalCta lang={lang} t={t} /></div>
    </>
  );
}
