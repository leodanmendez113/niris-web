import { site } from "@/config/site";

/** Arma el enlace que abre un chat de WhatsApp con un mensaje ya escrito. */
export const whatsappLink = (message: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;

export const telLink = `tel:${site.phoneE164}`;
