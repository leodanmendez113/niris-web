import Link from "next/link";
import { ArrowIcon, BedIcon, BuildingIcon, HomeIcon, KeyIcon, PinIcon, StarIcon } from "@/components/Icons";
import { WhatsAppButton } from "@/components/Cta";
import { Counter } from "@/components/motion/Counter";
import { Reveal } from "@/components/motion/Reveal";
import { asset, serviceSlugs, type Lang, type ServiceSlug } from "@/config/site";
import { href, type Dict } from "@/lib/i18n";

export const serviceIcons: Record<ServiceSlug, typeof KeyIcon> = {
  "airbnb-cleaning": KeyIcon,
  "hotel-housekeeping": BedIcon,
  "office-cleaning": BuildingIcon,
  "home-cleaning": HomeIcon,
};

type P = { lang: Lang; t: Dict };

export function SectionHead({ eyebrow, title, subtitle, center = false }: { eyebrow: string; title: string; subtitle?: string; center?: boolean }) {
  return (
    <Reveal className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 text-[clamp(1.9rem,5vw,3rem)] font-bold leading-[1.08] tracking-tight">{title}</h2>
      {subtitle && <p className="mt-4 text-lg opacity-75">{subtitle}</p>}
    </Reveal>
  );
}

export function Stats({ lang, t }: P) {
  return (
    <section className="on-dark bg-navy-deep py-14 text-cream" aria-label={t.stats.title}>
      <div className="container-x grid grid-cols-2 gap-y-10 lg:grid-cols-4">
        {t.stats.items.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08} className="text-center">
            <p className="font-display text-[clamp(2.2rem,7vw,3.6rem)] font-extrabold leading-none">
              <Counter value={s.value} suffix={s.suffix} lang={lang} />
            </p>
            <p className="mt-2 text-sm text-cream/65 md:text-base">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function ServiceCard({ lang, t, slug, delay = 0 }: P & { slug: ServiceSlug; delay?: number }) {
  const s = t.services[slug];
  const Icon = serviceIcons[slug];
  return (
    <Reveal delay={delay} as="article">
      <Link href={href(lang, `/services/${slug}`)} className="card group relative flex h-full flex-col overflow-hidden transition-transform duration-300 hover:-translate-y-1.5">
        <div className="relative aspect-[16/10] overflow-hidden">
          <img src={asset(`/images/${slug}.jpg`)} alt="" width={800} height={500} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent" />
          <span className="absolute bottom-3 left-4 rounded-full bg-cream/95 px-3 py-1 text-xs font-semibold text-navy">{s.tag}</span>
          <span className="absolute right-4 top-4 grid h-12 w-12 place-items-center rounded-2xl bg-teal text-navy-deep shadow-lg transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110">
            <Icon className="h-6 w-6" />
          </span>
        </div>
        <div className="flex flex-1 flex-col p-6">
          <h3 className="text-xl font-bold">{s.name}</h3>
          <p className="mt-2 flex-1 text-navy/70">{s.short}</p>
          <span className="mt-5 inline-flex items-center gap-2 font-display font-semibold text-teal-dark">
            {t.cta.learnMore}
            <ArrowIcon className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

export function ServicesGrid({ lang, t }: P) {
  return (
    <section id="services" className="scroll-mt-20 py-20 md:py-28">
      <div className="container-x">
        <SectionHead {...t.servicesSection} />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {serviceSlugs.map((slug, i) => <ServiceCard key={slug} lang={lang} t={t} slug={slug} delay={i * 0.08} />)}
        </div>
      </div>
    </section>
  );
}

export function Process({ t }: { t: Dict }) {
  return (
    <section className="bg-cream-dark py-20 md:py-28">
      <div className="container-x">
        <SectionHead eyebrow={t.process.eyebrow} title={t.process.title} center />
        <ol className="relative mt-14 grid gap-6 md:grid-cols-3">
          {t.process.steps.map((s, i) => (
            <Reveal key={s.title} as="li" delay={i * 0.12} className="card relative p-7">
              <span className="font-display text-6xl font-extrabold leading-none text-teal/40">0{i + 1}</span>
              <h3 className="mt-4 text-xl font-bold">{s.title}</h3>
              <p className="mt-2 text-navy/70">{s.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function StoryTeaser({ lang, t }: P) {
  return (
    <section className="py-20 md:py-28">
      <div className="container-x grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal className="relative mx-auto w-full max-w-sm lg:max-w-none">
          <div className="absolute -left-4 -top-4 h-full w-full rounded-[2.5rem] rounded-tl-[6rem] bg-teal" aria-hidden="true" />
          <img
            src={asset("/images/deyanires.jpg")} alt={t.story.photoAlt} width={720} height={900} loading="lazy"
            className="relative aspect-[4/5] w-full rounded-[2.5rem] rounded-tl-[6rem] object-cover"
          />
          <div className="absolute -bottom-5 right-4 rounded-2xl bg-navy px-5 py-3 text-cream shadow-xl">
            <p className="font-display text-lg font-bold leading-tight">Deyanires</p>
            <p className="text-sm text-cream/70">{t.storyTeaser.role}</p>
          </div>
        </Reveal>
        <div>
          <SectionHead eyebrow={t.storyTeaser.eyebrow} title={t.storyTeaser.title} />
          <Reveal delay={0.1}>
            <p className="mt-5 text-lg text-navy/75">{t.storyTeaser.text}</p>
            <blockquote className="mt-7 border-l-4 border-teal pl-5 font-display text-xl font-medium italic leading-snug md:text-2xl">
              “{t.storyTeaser.quote}”
            </blockquote>
            <Link href={href(lang, "/story")} className="btn btn-navy mt-8">
              {t.storyTeaser.link} <ArrowIcon className="h-5 w-5" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function AreasTeaser({ lang, t }: P) {
  return (
    <section className="on-dark grain relative overflow-hidden bg-navy py-20 text-cream md:py-28">
      <div className="container-x relative">
        <SectionHead eyebrow={t.areas.eyebrow} title={t.areas.title} subtitle={t.areas.subtitle} />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {t.areas.counties.map((c, ci) => (
            <Reveal key={c.name} delay={ci * 0.1} className="rounded-3xl border border-cream/12 bg-cream/[0.04] p-6 md:p-8">
              <h3 className="flex items-center gap-2.5 text-2xl font-bold">
                <PinIcon className="h-6 w-6 text-teal" /> {c.name}
              </h3>
              <ul className="mt-5 flex flex-wrap gap-2">
                {c.cities.map((city) => (
                  <li key={city} className="rounded-full border border-cream/15 px-3 py-1.5 text-sm text-cream/85 transition-colors hover:border-teal hover:text-teal">{city}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}>
          <Link href={href(lang, "/areas")} className="btn btn-ghost-light mt-8">
            {t.cta.learnMore} <ArrowIcon className="h-5 w-5" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

export function Reviews({ t }: { t: Dict }) {
  return (
    <section className="py-20 md:py-28">
      <div className="container-x">
        <SectionHead eyebrow={t.reviews.eyebrow} title={t.reviews.title} center />
      </div>
      <ul className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-6 [scrollbar-width:none] md:mx-auto md:grid md:max-w-[76rem] md:grid-cols-2 md:overflow-visible md:px-8 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden">
        {t.reviews.items.map((r, i) => (
          <Reveal key={r.name} as="li" delay={(i % 3) * 0.08} className="card flex w-[84vw] max-w-sm shrink-0 snap-center flex-col p-6 md:w-auto md:max-w-none">
            <div className="flex gap-0.5 text-amber-500" aria-label="5 / 5">
              {[0, 1, 2, 3, 4].map((k) => <StarIcon key={k} className="h-5 w-5" />)}
            </div>
            <p className="mt-4 flex-1 text-[1.05rem] text-navy/85">“{r.text}”</p>
            <div className="mt-5 flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-teal-soft font-display font-bold text-teal-dark">{r.name[0]}</span>
              <span className="leading-tight">
                <span className="block font-display font-semibold">{r.name}</span>
                <span className="block text-sm text-navy/60">{r.role}</span>
              </span>
            </div>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

export function FinalCta({ lang, t, title, text }: P & { title?: string; text?: string }) {
  return (
    <section className="pb-20 md:pb-28">
      <div className="container-x">
        <Reveal className="on-dark grain relative overflow-hidden rounded-[2.5rem] bg-navy px-6 py-14 text-center text-cream md:px-16 md:py-20">
          <div className="absolute -right-16 -top-24 h-72 w-72 rounded-full bg-teal/25 blur-3xl" aria-hidden="true" />
          <div className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-teal/15 blur-3xl" aria-hidden="true" />
          <h2 className="relative mx-auto max-w-2xl text-[clamp(1.9rem,5vw,3.2rem)] font-bold leading-[1.08]">{title ?? t.finalCta.title}</h2>
          <p className="relative mx-auto mt-4 max-w-xl text-lg text-cream/75">{text ?? t.finalCta.text}</p>
          <div className="relative mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <WhatsAppButton message={t.whatsapp.defaultMessage} label={t.cta.whatsapp} source="final_cta" />
            <Link href={href(lang, "/quote")} className="btn btn-ghost-light">{t.cta.quote} <ArrowIcon className="h-5 w-5" /></Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
