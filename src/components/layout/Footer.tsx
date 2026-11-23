import Link from "next/link";
import { ShieldIcon } from "@/components/Icons";
import { CallButton, WhatsAppButton } from "@/components/Cta";
import { Logo } from "@/components/layout/Logo";
import { serviceSlugs, site, type Lang } from "@/config/site";
import { href, type Dict } from "@/lib/i18n";

export function Footer({ lang, t }: { lang: Lang; t: Dict }) {
  const link = "text-cream/70 transition-colors hover:text-cream";
  return (
    <footer className="on-dark bg-navy-deep pb-28 pt-16 text-cream md:pb-16">
      <div className="container-x grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Logo light />
          <p className="mt-5 max-w-xs text-cream/70">{t.footer.tagline}</p>
          <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-cream/15 px-3 py-1.5 text-sm text-cream/85">
            <ShieldIcon className="h-4 w-4 text-teal" /> {t.footer.licensed}
          </p>
        </div>
        <div>
          <h2 className="eyebrow">{t.footer.servicesTitle}</h2>
          <ul className="mt-4 grid gap-2.5">
            {serviceSlugs.map((s) => (
              <li key={s}><Link className={link} href={href(lang, `/services/${s}`)}>{t.services[s].name}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="eyebrow">{t.footer.companyTitle}</h2>
          <ul className="mt-4 grid gap-2.5">
            <li><Link className={link} href={href(lang, "/story")}>{t.nav.story}</Link></li>
            <li><Link className={link} href={href(lang, "/areas")}>{t.nav.areas}</Link></li>
            <li><Link className={link} href={href(lang, "/quote")}>{t.nav.quote}</Link></li>
            <li><Link className={link} href={href(lang, "/contact")}>{t.nav.contact}</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="eyebrow">{t.footer.contactTitle}</h2>
          <div className="mt-4 grid gap-3">
            <CallButton label={t.cta.call} source="footer" showNumber className="inline-flex items-center gap-2 font-display text-lg font-semibold text-cream hover:text-teal" />
            <WhatsAppButton message={t.whatsapp.defaultMessage} label={t.cta.whatsapp} source="footer" className="inline-flex items-center gap-2 text-cream/80 hover:text-cream" />
            <p className="text-cream/70">{site.areas.join(" · ")}</p>
          </div>
        </div>
      </div>
      <div className="container-x mt-12 border-t border-cream/10 pt-6 text-sm text-cream/50">
        © {new Date().getFullYear()} {site.name}. {t.footer.rights}
      </div>
    </footer>
  );
}
