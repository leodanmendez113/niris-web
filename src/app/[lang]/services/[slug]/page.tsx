import type { Metadata } from "next";
import Link from "next/link";
import { ArrowIcon, CheckIcon } from "@/components/Icons";
import { WhatsAppButton } from "@/components/Cta";
import { FinalCta, SectionHead, ServiceCard } from "@/components/home/Sections";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { ServiceJsonLd } from "@/components/seo/JsonLd";
import { asset, langs, serviceSlugs, type Lang, type ServiceSlug } from "@/config/site";
import { getDict, href } from "@/lib/i18n";
import { pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ lang: Lang; slug: ServiceSlug }> };

export const dynamicParams = false;
export const generateStaticParams = () => langs.flatMap((lang) => serviceSlugs.map((slug) => ({ lang, slug })));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const t = getDict(lang);
  const s = t.services[slug];
  return pageMeta(lang, `/services/${slug}`, `${s.name} | ${t.meta.servicesSuffix}`, s.short + " " + s.intro.split(". ")[0] + ".");
}

export default async function ServicePage({ params }: Props) {
  const { lang, slug } = await params;
  const t = getDict(lang);
  const s = t.services[slug];
  const sp = t.servicePage;
  return (
    <>
      <ServiceJsonLd lang={lang} t={t} slug={slug} />
      <PageHero
        eyebrow={
          <nav aria-label="Breadcrumb" className="flex items-center gap-2">
            <Link href={href(lang)} className="hover:text-cream">{sp.breadcrumbHome}</Link>
            <span aria-hidden="true">/</span>
            <span>{s.tag}</span>
          </nav>
        }
        title={s.h1}
        lead={s.intro}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <WhatsAppButton message={`${t.whatsapp.defaultMessage} (${s.name})`} label={t.cta.whatsapp} source={`service_${slug}`} />
          <Link href={href(lang, "/quote")} className="btn btn-ghost-light">{t.cta.quote} <ArrowIcon className="h-5 w-5" /></Link>
        </div>
      </PageHero>

      <section className="py-16 md:py-24">
        <div className="container-x grid items-start gap-12 lg:grid-cols-2">
          <Reveal className="relative">
            <img src={asset(`/images/${slug}.webp`)} alt={s.name} width={800} height={500} className="aspect-[4/3] w-full rounded-[2.5rem] rounded-br-[6rem] object-cover" />
            <div className="card absolute -bottom-6 left-4 right-4 p-5 sm:left-auto sm:right-6 sm:max-w-xs">
              <p className="eyebrow">{sp.idealTitle}</p>
              <ul className="mt-3 grid gap-1.5 text-[0.95rem]">
                {s.idealFor.map((x) => <li key={x} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />{x}</li>)}
              </ul>
            </div>
          </Reveal>
          <div className="pt-8 lg:pt-0">
            <SectionHead eyebrow={s.tag} title={sp.includesTitle} />
            <ul className="mt-8 grid gap-3">
              {s.includes.map((item, i) => (
                <Reveal key={item} as="li" delay={i * 0.06} y={16} className="flex items-start gap-3 rounded-2xl bg-white px-4 py-3.5 shadow-sm">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-teal text-navy-deep"><CheckIcon className="h-4 w-4" /></span>
                  <span className="font-medium">{item}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-cream-dark py-16 md:py-24">
        <div className="container-x max-w-3xl">
          <SectionHead eyebrow="FAQ" title={sp.faqTitle} />
          <div className="mt-8 grid gap-3">
            {s.faq.map((f, i) => (
              <Reveal key={f.q} delay={i * 0.06} y={16}>
                <details className="card group px-5 py-4 open:pb-5">
                  <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-semibold [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-teal-soft text-xl text-teal-dark transition-transform duration-300 group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-2 text-navy/75">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-x">
          <SectionHead eyebrow={t.cta.allServices} title={sp.otherTitle} />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {serviceSlugs.filter((x) => x !== slug).map((x, i) => <ServiceCard key={x} lang={lang} t={t} slug={x} delay={i * 0.08} />)}
          </div>
        </div>
      </section>

      <FinalCta lang={lang} t={t} title={sp.ctaTitle} text={sp.ctaText} />
    </>
  );
}
