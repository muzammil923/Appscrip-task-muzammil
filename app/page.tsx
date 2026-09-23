import { getProducts } from "@/lib/api";
import { BrandJsonLd } from "@/components/BrandJsonLd";
import { ProductJsonLd } from "@/components/ProductJsonLd";
import { ProductListingView } from "@/components/ProductListingView";
import type { Product } from "@/types/product";

export default async function Page() {
  const products: Product[] = await getProducts();

  return (
    <>
      <BrandJsonLd />
      <ProductJsonLd products={products} />
      <ProductListingView initialProducts={products} />
    </>
  );
}
