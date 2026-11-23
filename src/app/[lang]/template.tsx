import type { ReactNode } from "react";

/** Transición suave al entrar a cada página (CSS, ver .page-in en globals.css). */
export default function Template({ children }: { children: ReactNode }) {
  return <div className="page-in">{children}</div>;
}
