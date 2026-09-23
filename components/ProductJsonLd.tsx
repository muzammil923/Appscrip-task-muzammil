import type { Product } from "@/types/product";

/** JSON-LD ItemList of Products for the listing page. */
export function ProductJsonLd({ products }: { products: Product[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "mettä muse — Discover Our Products",
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: product.title,
        image: product.image,
        category: product.category,
        description: `${product.title} — handcrafted goods available at mettä muse.`,
        offers: {
          "@type": "Offer",
          price: product.price.toFixed(2),
          priceCurrency: "USD",
          availability: product.isOutOfStock
            ? "https://schema.org/OutOfStock"
            : "https://schema.org/InStock",
        },
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
