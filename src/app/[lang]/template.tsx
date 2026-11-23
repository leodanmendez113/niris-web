"use client";
import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/** Transición suave al entrar a cada página. */
export default function Template({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.div initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45, ease: "easeOut" }}>
      {children}
    </motion.div>
  );
}
