"use client";
import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

/** Número que cuenta desde 0 hasta su valor cuando entra en pantalla. */
export function Counter({ value, suffix = "", lang }: { value: number; suffix?: string; lang: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const decimals = Number.isInteger(value) ? 0 : 1;
  const [n, setN] = useState(value);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!inView || reduce) return;
    setStarted(true);
    const controls = animate(0, value, { duration: 1.8, ease: [0.16, 1, 0.3, 1], onUpdate: setN });
    return () => controls.stop();
  }, [inView, reduce, value]);

  const shown = started ? n : value;
  const text = new Intl.NumberFormat(lang === "es" ? "es-US" : "en-US", {
    minimumFractionDigits: decimals, maximumFractionDigits: decimals,
  }).format(shown);
  return (
    <span ref={ref} className="tabular-nums">
      {text}
      <span className="text-teal">{suffix}</span>
    </span>
  );
}
