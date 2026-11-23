import type { Metadata } from "next";
import Link from "next/link";
import { ArrowIcon, ClockIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "@/components/Icons";
import { CallButton, WhatsAppButton } from "@/components/Cta";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import type { Lang } from "@/config/site";
import { getDict, href } from "@/lib/i18n";
import { pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ lang: Lang }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const t = getDict(lang);
  return pageMeta(lang, "/contact", t.meta.contactTitle, t.meta.contactDescription);
}

export default async function ContactPage({ params }: Props) {
  const { lang } = await params;
  const t = getDict(lang);
  const c = t.contact;
  const icon = "grid h-12 w-12 place-items-center rounded-2xl";
  return (
    <>
      <PageHero eyebrow={c.eyebrow} title={c.h1} lead={c.intro} />
      <section className="py-16 md:py-24">
        <div className="container-x grid gap-5 md:grid-cols-2">
          <Reveal className="card flex flex-col p-7">
            <span className={`${icon} bg-whatsapp text-white`}><WhatsAppIcon className="h-6 w-6" /></span>
            <h2 className="mt-4 text-2xl font-bold">{c.whatsappTitle}</h2>
            <p className="mt-2 flex-1 text-navy/70">{c.whatsappText}</p>
            <WhatsAppButton message={t.whatsapp.defaultMessage} label={t.cta.whatsapp} source="contact" className="btn btn-whatsapp mt-6 w-full sm:w-fit" />
          </Reveal>
          <Reveal delay={0.08} className="card flex flex-col p-7">
            <span className={`${icon} bg-navy text-cream`}><PhoneIcon className="h-6 w-6" /></span>
            <h2 className="mt-4 text-2xl font-bold">{c.callTitle}</h2>
            <p className="mt-2 flex-1 text-navy/70">{c.callText}</p>
            <CallButton label={t.cta.call} source="contact" showNumber className="btn btn-navy mt-6 w-full sm:w-fit" />
          </Reveal>
          <Reveal delay={0.12} className="card p-7">
            <span className={`${icon} bg-teal text-navy-deep`}><ClockIcon className="h-6 w-6" /></span>
            <h2 className="mt-4 text-2xl font-bold">{c.hoursTitle}</h2>
            <ul className="mt-3 grid gap-1.5 text-navy/75">{c.hours.map((h) => <li key={h}>{h}</li>)}</ul>
          </Reveal>
          <Reveal delay={0.16} className="card flex flex-col p-7">
            <span className={`${icon} bg-teal text-navy-deep`}><PinIcon className="h-6 w-6" /></span>
            <h2 className="mt-4 text-2xl font-bold">{c.areaTitle}</h2>
            <p className="mt-2 flex-1 text-navy/70">{c.areaText}</p>
            <Link href={href(lang, "/areas")} className="mt-4 inline-flex min-h-11 items-center gap-2 font-display font-semibold text-teal-dark">
              {t.cta.allAreas} <ArrowIcon className="h-5 w-5" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
