// Eventos de Google Analytics 4. Si no hay ID configurado, no hace nada.
type Gtag = (command: "event", name: string, params?: Record<string, unknown>) => void;

export function track(name: "whatsapp_click" | "call_click" | "quote_complete" | "popup_shown", params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  gtag?.("event", name, params);
}
