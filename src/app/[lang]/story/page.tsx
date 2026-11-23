import type { Metadata } from "next";
import { ClockIcon, HeartIcon, ShieldIcon, SparkleIcon } from "@/components/Icons";
import { FinalCta, SectionHead } from "@/components/home/Sections";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { asset, DEMO, type Lang } from "@/config/site";
import { getDict } from "@/lib/i18n";
import { pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ lang: Lang }> };
const valueIcons = [SparkleIcon, ShieldIcon, HeartIcon, ClockIcon];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const t = getDict(lang);
  return pageMeta(lang, "/story", t.meta.storyTitle, t.meta.storyDescription);
}

export default async function StoryPage({ params }: Props) {
  const { lang } = await params;
  const t = getDict(lang);
  const s = t.story;
  return (
    <>
      <PageHero eyebrow={s.eyebrow} title={s.h1} lead={s.lead} />
      <section className="py-16 md:py-24">
        <div className="container-x grid items-start gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal className="relative mx-auto w-full max-w-sm lg:sticky lg:top-28 lg:max-w-none">
            <div className="absolute -right-4 -top-4 h-full w-full rounded-[2.5rem] rounded-tr-[6rem] bg-teal" aria-hidden="true" />
            <img src={asset("/images/deyanires.jpg")} alt={s.photoAlt} width={720} height={900} className="relative aspect-[4/5] w-full rounded-[2.5rem] rounded-tr-[6rem] object-cover" />
            {DEMO && <span className="absolute left-4 top-4 rounded-full bg-navy/80 px-3 py-1 text-xs text-cream">{s.photoNote}</span>}
          </Reveal>
          <div className="grid gap-6">
            {s.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.05} y={20}>
                <p className={i === 0 ? "text-xl font-medium leading-relaxed md:text-2xl" : "text-lg leading-relaxed text-navy/80"}>{p}</p>
              </Reveal>
            ))}
            <Reveal>
              <blockquote className="rounded-3xl bg-navy p-7 font-display text-xl font-medium italic leading-snug text-cream md:p-9 md:text-2xl">
                “{t.storyTeaser.quote}”
                <footer className="mt-4 text-base font-normal not-italic text-teal">— Deyanires, {t.storyTeaser.role.toLowerCase()}</footer>
              </blockquote>
            </Reveal>
          </div>
        </div>
      </section>
      <section className="bg-cream-dark py-16 md:py-24">
        <div className="container-x">
          <SectionHead eyebrow={s.eyebrow} title={s.valuesTitle} center />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {s.values.map((v, i) => {
              const Icon = valueIcons[i];
              return (
                <Reveal key={v.title} delay={i * 0.08} className="card p-6">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-teal text-navy-deep"><Icon className="h-6 w-6" /></span>
                  <h3 className="mt-4 text-xl font-bold">{v.title}</h3>
                  <p className="mt-2 text-navy/70">{v.text}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
      <div className="pt-16 md:pt-24"><FinalCta lang={lang} t={t} /></div>
    </>
  );
}
