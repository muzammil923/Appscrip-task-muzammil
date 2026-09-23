import type { Product, SortOption } from "@/types/product";

const TITLE_SUFFIXES = new Set([
  "men",
  "women",
  "unisex",
  "kids",
  "shirt",
  "tshirt",
  "t-shirt",
  "jacket",
  "coat",
  "hoodie",
  "sweatshirt",
  "jeans",
  "backpack",
  "bag",
  "watch",
  "ring",
  "necklace",
  "bracelet",
  "earrings",
  "mouse",
  "keyboard",
  "monitor",
  "laptop",
  "ssd",
]);

const BRANDS = [
  "mettä muse",
  "Artisan Collective",
  "Nordwerk",
  "Atelier Loom",
  "Casa Terra",
] as const;

const FABRICS = ["Cotton", "Wool Blend", "Linen", "Leather", "Silk", "Denim"] as const;
const OCCASIONS = ["Casual", "Formal", "Festive", "Daily"] as const;
const SEGMENTS = ["Men", "Women", "Unisex"] as const;
const RAW_MATERIALS = ["Cotton", "Leather", "Brass", "Wool", "Jute"] as const;
const PATTERNS = ["Solid", "Striped", "Woven", "Textured"] as const;
const WORKS = ["Handloom", "Hand Stitched", "Machine Crafted", "Embroidered"] as const;
const SUITABLE_FOR = ["Daily Use", "Formal Wear", "Gifting", "Travel"] as const;

/** Deterministic pick from a list based on the product id. */
function pick<T>(list: readonly T[], id: number): T {
  return list[id % list.length];
}

function stripTitle(rawTitle: string): string {
  const words = rawTitle
    .replace(/\s+/g, " ")
    .trim()
    .split(" ");

  while (words.length > 1) {
    const last = words[words.length - 1].toLowerCase();
    if (last === "women" || last === "men" || TITLE_SUFFIXES.has(last)) {
      words.pop();
    } else {
      break;
    }
  }

  return words.join(" ");
}

function truncateTitle(title: string, maxWords: number): string {
  const words = title.split(" ");
  if (words.length <= maxWords) {
    return title;
  }
  return `${words.slice(0, maxWords).join(" ")}…`;
}

/** Derive the design's presentation states deterministically from the id. */
export function decorateProduct(raw: {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  rating?: { rate: number; count: number };
}): Product {
  const { id } = raw;
  const cleanedTitle = stripTitle(raw.title);
  const brand = BRANDS[id % BRANDS.length];

  return {
    id,
    title: truncateTitle(`${brand} ${cleanedTitle}`, 8),
    image: raw.image,
    category: raw.category,
    price: raw.price,
    rating: raw.rating?.rate,
    ratingCount: raw.rating?.count,
    isNew: id % 7 === 1,
    isOutOfStock: id % 11 === 3,
    fabric: pick(FABRICS, id),
    occasion: pick(OCCASIONS, id),
    segment: pick(SEGMENTS, id),
    rawMaterials: pick(RAW_MATERIALS, id),
    pattern: pick(PATTERNS, id),
    work: pick(WORKS, id),
    suitableFor: pick(SUITABLE_FOR, id),
    customizable: id % 5 === 0 ? "Yes" : "No",
  };
}

export function sortProducts(products: Product[], sort: SortOption): Product[] {
  const sorted = [...products];

  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "name-asc":
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case "name-desc":
      return sorted.sort((a, b) => b.title.localeCompare(a.title));
    default:
      return sorted.sort((a, b) => a.id - b.id);
  }
}
