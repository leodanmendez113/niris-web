"use client";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CloseIcon, MenuIcon } from "@/components/Icons";
import { CallButton, WhatsAppButton } from "@/components/Cta";
import { Logo } from "@/components/layout/Logo";
import type { Lang } from "@/config/site";
import { href, otherLang, type Dict } from "@/lib/i18n";

export function Header({ lang, t }: { lang: Lang; t: Dict }) {
  const pathname = usePathname() ?? `/${lang}/`;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const isHome = pathname.replace(/\/$/, "") === `/${lang}`;
  const light = isHome && !scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const other = otherLang(lang);
  const switchHref = pathname.replace(new RegExp(`^/${lang}(?=/|$)`), `/${other}`);
  const links = [
    { href: href(lang, "/") + "#services", label: t.nav.services },
    { href: href(lang, "/areas"), label: t.nav.areas },
    { href: href(lang, "/story"), label: t.nav.story },
    { href: href(lang, "/contact"), label: t.nav.contact },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        light ? "bg-transparent" : "bg-cream/90 shadow-[0_1px_0_rgb(15_47_63/0.08)] backdrop-blur-md"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between md:h-20">
        <Link href={href(lang)} aria-label="Niris Professional Services" className="shrink-0">
          <Logo light={light} />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`font-display text-[0.95rem] font-medium transition-colors ${
                light ? "text-cream/85 hover:text-cream" : "text-navy/80 hover:text-navy"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={switchHref}
            hrefLang={other}
            lang={other}
            className={`rounded-full px-3 py-2 font-display text-sm font-semibold transition-colors ${
              light ? "text-cream hover:bg-cream/10" : "text-navy hover:bg-navy/5"
            }`}
          >
            {other.toUpperCase()}
            <span className="sr-only"> — {t.nav.switchTo}</span>
          </Link>
          <Link href={href(lang, "/quote")} className="btn btn-teal hidden !min-h-11 !px-5 !py-2 !text-[0.95rem] sm:inline-flex">
            {t.nav.quote}
          </Link>
          <button
            type="button"
            className={`grid h-11 w-11 place-items-center rounded-full lg:hidden ${light ? "text-cream" : "text-navy"}`}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.nav.close : t.nav.menu}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "calc(100dvh - 4rem)" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden bg-cream lg:hidden"
          >
            <nav className="container-x flex h-full flex-col pb-8 pt-4" aria-label="Mobile">
              {[...links, { href: href(lang, "/quote"), label: t.nav.quote }].map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.05 }}
                >
                  <Link href={l.href} onClick={() => setOpen(false)} className="block border-b border-navy/10 py-4 font-display text-2xl font-semibold text-navy">
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <div className="mt-auto grid gap-3">
                <WhatsAppButton message={t.whatsapp.defaultMessage} label={t.cta.whatsapp} source="mobile_menu" />
                <CallButton label={t.cta.call} source="mobile_menu" showNumber />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
