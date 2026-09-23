import { BRAND, SITE_URL } from "@/lib/constants";

/** Organization JSON-LD for the storefront brand. */
export function BrandJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BRAND.name,
    url: SITE_URL,
    email: BRAND.email,
    telephone: BRAND.phone,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
