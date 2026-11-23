"use client";
import type { ReactNode } from "react";
import { PhoneIcon, WhatsAppIcon } from "@/components/Icons";
import { site } from "@/config/site";
import { track } from "@/lib/analytics";
import { telLink, whatsappLink } from "@/lib/whatsapp";

/** Botón que abre WhatsApp con un mensaje ya escrito y avisa a Analytics. */
export function WhatsAppButton({
  message, label, className = "btn btn-whatsapp", source, children,
}: { message: string; label: string; className?: string; source: string; children?: ReactNode }) {
  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => track("whatsapp_click", { source })}
    >
      {children ?? (<><WhatsAppIcon className="h-5 w-5" />{label}</>)}
    </a>
  );
}

export function CallButton({
  label, className = "btn btn-ghost-dark", source, showNumber = false,
}: { label: string; className?: string; source: string; showNumber?: boolean }) {
  return (
    <a href={telLink} className={className} onClick={() => track("call_click", { source })}>
      <PhoneIcon className="h-5 w-5" />
      {showNumber ? site.phoneDisplay : label}
    </a>
  );
}
