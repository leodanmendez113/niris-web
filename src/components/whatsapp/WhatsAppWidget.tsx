"use client";
import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CloseIcon, WhatsAppIcon } from "@/components/Icons";
import { asset } from "@/config/site";
import { track } from "@/lib/analytics";
import type { Dict } from "@/lib/i18n";
import { whatsappLink } from "@/lib/whatsapp";

const POPUP_DELAY_MS = 6000;
const SEEN_KEY = "niris-wa-popup-seen";

/** Botón flotante de WhatsApp + popup que aparece a los pocos segundos (una vez por visita). */
export function WhatsAppWidget({ t }: { t: Dict }) {
  const [open, setOpen] = useState(false);
  // En el cotizador (celular) la barra del estimado ya trae su botón de WhatsApp.
  const onQuote = (usePathname() ?? "").includes("/quote");
  const link = whatsappLink(t.whatsapp.defaultMessage);

  useEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem(SEEN_KEY) === "1"; } catch {}
    if (seen) return;
    const id = window.setTimeout(() => {
      setOpen(true);
      track("popup_shown");
      try { sessionStorage.setItem(SEEN_KEY, "1"); } catch {}
    }, POPUP_DELAY_MS);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 md:bottom-6 md:right-6">
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label={t.whatsapp.popupTitle}
            initial={{ opacity: 0, y: 24, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.92 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            style={{ transformOrigin: "bottom right" }}
            className="w-[min(21rem,calc(100vw-2rem))] overflow-hidden rounded-3xl bg-white shadow-[0_30px_70px_-20px_rgb(10_34_48/0.55)]"
          >
            <div className="flex items-center gap-3 bg-navy px-4 py-3.5 text-cream">
              <span className="relative shrink-0">
                <img src={asset("/images/deyanires-sm.jpg")} alt="" width={44} height={44} className="h-11 w-11 rounded-full object-cover ring-2 ring-teal" />
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-whatsapp ring-2 ring-navy" />
              </span>
              <span className="min-w-0 flex-1 leading-tight">
                <span className="block font-display font-semibold">Deyanires · Niris</span>
                <span className="block text-xs text-cream/70">{t.whatsapp.online}</span>
              </span>
              <button type="button" onClick={() => setOpen(false)} aria-label={t.nav.close} className="grid h-9 w-9 place-items-center rounded-full hover:bg-cream/10">
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="bg-[#efeae2] px-4 py-5">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="max-w-[92%] rounded-2xl rounded-tl-sm bg-white px-3.5 py-2.5 text-[0.95rem] text-navy shadow-sm"
              >
                <strong className="block font-display">{t.whatsapp.popupTitle}</strong>
                {t.whatsapp.popupText}
              </motion.div>
            </div>
            <div className="grid gap-1 px-4 py-4">
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp w-full"
                onClick={() => { track("whatsapp_click", { source: "popup" }); setOpen(false); }}
              >
                <WhatsAppIcon className="h-5 w-5" /> {t.whatsapp.popupButton}
              </a>
              <button type="button" onClick={() => setOpen(false)} className="min-h-10 text-sm text-navy/60 hover:text-navy">
                {t.whatsapp.popupDismiss}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.whatsapp.fabLabel}
        onClick={() => track("whatsapp_click", { source: "fab" })}
        initial={{ scale: 0, rotate: -90 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 18, delay: 1.2 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className={`relative h-16 w-16 place-items-center rounded-full bg-whatsapp text-white shadow-[0_14px_34px_-8px_rgb(37_211_102/0.8)] ${onQuote ? "hidden lg:grid" : "grid"}`}
      >
        <span className="absolute inset-0 animate-ping-slow rounded-full bg-whatsapp" aria-hidden="true" />
        <span className="absolute inset-0 animate-ping-slow rounded-full bg-whatsapp [animation-delay:1.2s]" aria-hidden="true" />
        <WhatsAppIcon className="relative h-9 w-9 animate-wiggle" />
        <span className="absolute -right-0.5 -top-0.5 grid h-5 w-5 place-items-center rounded-full bg-red-500 text-[0.65rem] font-bold text-white ring-2 ring-cream" aria-hidden="true">1</span>
      </motion.a>
    </div>
  );
}
