import type { Metadata } from "next";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: site.name,
  robots: { index: false, follow: true },
};

// Página raíz: envía al visitante a /es o /en según el idioma de su navegador.
export default function RootPage() {
  const b = site.basePath;
  const script = `var l=(navigator.language||"en").toLowerCase().indexOf("es")===0?"es":"en";location.replace("${b}/"+l+"/");`;
  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", textAlign: "center" }}>
      <script dangerouslySetInnerHTML={{ __html: script }} />
      <noscript>
        <meta httpEquiv="refresh" content={`0; url=${b}/en/`} />
      </noscript>
      <p>
        <a href={`${b}/en/`} style={{ color: "#5bb1a7" }}>English</a> · <a href={`${b}/es/`} style={{ color: "#5bb1a7" }}>Español</a>
      </p>
    </main>
  );
}
