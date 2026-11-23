import { serviceSlugs, site, type Lang, type ServiceSlug } from "@/config/site";
import type { Dict } from "@/lib/i18n";
import { abs } from "@/lib/seo";

// Datos estructurados: información en un formato que Google lee para mostrar
// el negocio (teléfono, zona, servicios, preguntas frecuentes) en los resultados.
// Nota: las reseñas de muestra NO se incluyen aquí a propósito.

function Script({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

const businessId = `${site.url}${site.basePath}/#business`;

export function BusinessJsonLd({ lang, t }: { lang: Lang; t: Dict }) {
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": businessId,
        name: site.name,
        description: t.meta.homeDescription,
        url: abs(lang),
        telephone: site.phoneE164,
        image: `${site.url}${site.basePath}/og.jpg`,
        logo: `${site.url}${site.basePath}/icons/icon-512.png`,
        priceRange: "$$",
        founder: { "@type": "Person", name: "Deyanires" },
        knowsLanguage: ["en", "es"],
        areaServed: site.areas.map((name) => ({ "@type": "AdministrativeArea", name: `${name}, Florida` })),
        address: { "@type": "PostalAddress", addressLocality: "Miami", addressRegion: "FL", addressCountry: "US" },
        contactPoint: { "@type": "ContactPoint", telephone: site.phoneE164, contactType: "customer service", availableLanguage: ["English", "Spanish"] },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: t.nav.services,
          itemListElement: serviceSlugs.map((s) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: t.services[s].name, url: abs(lang, `/services/${s}`) },
          })),
        },
      }}
    />
  );
}

export function ServiceJsonLd({ lang, t, slug }: { lang: Lang; t: Dict; slug: ServiceSlug }) {
  const s = t.services[slug];
  return (
    <>
      <Script
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: s.h1,
          description: s.intro,
          serviceType: s.name,
          url: abs(lang, `/services/${slug}`),
          provider: { "@id": businessId },
          areaServed: site.areas.map((name) => ({ "@type": "AdministrativeArea", name: `${name}, Florida` })),
        }}
      />
      <Script
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: s.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }}
      />
      <Script
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: t.servicePage.breadcrumbHome, item: abs(lang) },
            { "@type": "ListItem", position: 2, name: s.name, item: abs(lang, `/services/${slug}`) },
          ],
        }}
      />
    </>
  );
}
