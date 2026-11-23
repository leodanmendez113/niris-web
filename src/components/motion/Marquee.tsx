import { SparkleIcon } from "@/components/Icons";

/** Cinta de texto que se desplaza sin parar. */
export function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-navy/10 bg-teal py-4" aria-hidden="true">
      <div className="flex w-max animate-marquee gap-8 whitespace-nowrap">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center gap-8">
            {row.map((t, i) => (
              <span key={i} className="flex items-center gap-8 font-display text-lg font-semibold text-navy-deep md:text-xl">
                {t}
                <SparkleIcon className="h-4 w-4 opacity-70" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
