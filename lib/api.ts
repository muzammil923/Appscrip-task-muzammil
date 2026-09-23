import { decorateProduct, sortProducts } from "@/lib/products";
import { FALLBACK_PRODUCTS } from "@/lib/fallback-products";
import type { Product, SortOption } from "@/types/product";

const FAKE_STORE_API_URL = "https://fakestoreapi.com/products";
const REQUEST_TIMEOUT_MS = 8000;

type FakeStoreProduct = {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  rating?: { rate: number; count: number };
};

/** Fetch + transform FakeStoreAPI products, falling back to local mock data. */
export async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetch(FAKE_STORE_API_URL, {
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      // Browser-like headers: FakeStoreAPI sits behind Cloudflare bot protection
      // and challenges requests that look like server-side clients (e.g. on Vercel).
      headers: {
        Accept: "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`FakeStoreAPI responded with status ${response.status}`);
    }

    const data: unknown = await response.json();

    if (!Array.isArray(data) || data.length === 0) {
      throw new Error("FakeStoreAPI returned an unexpected payload");
    }

    return data.map((item) => decorateProduct(item as FakeStoreProduct));
  } catch {
    return FALLBACK_PRODUCTS;
  }
}

export function applySorting(products: Product[], sort: SortOption): Product[] {
  return sortProducts(products, sort);
}
