import { DEMO } from "@/config/site";

/** Cinta visible solo mientras DEMO = true (config/site.ts). */
export function DemoRibbon({ text }: { text: string }) {
  if (!DEMO) return null;
  return (
    <div className="pointer-events-none fixed bottom-3 left-3 z-[15] rounded-full bg-navy/85 px-3 py-1.5 text-[0.7rem] font-medium text-cream/90 shadow-lg backdrop-blur">
      {text}
    </div>
  );
}
