import type { FilterSection, SortOptionValue } from "@/types/product";

export const BRAND = {
  name: "leo fashion",
  tagline: "A premium marketplace for handcrafted goods.",
  email: "customercare@leofashion.com",
  phone: "+91 98765 43210",
} as const;

export const SITE_URL = "https://leofashion.example.com";

export const NAV_LINKS = [
  "Shop",
  "Skills",
  "Stories",
  "About",
  "Contact Us",
] as const;

export const CURRENCIES = ["USD", "EUR", "GBP", "INR"] as const;

export const LANGUAGES = ["ENG", "FRA", "DEU"] as const;

export const FOOTER_ABOUT_LINKS = [
  "About Us",
  "Stories",
  "Artisans",
  "Boutiques",
  "Contact Us",
  "EU Compliances Docs",
] as const;

export const FOOTER_QUICK_LINKS = [
  "Orders & Shipping",
  "Join/Login as a Seller",
  "Payment & Pricing",
  "Return & Refunds",
  "FAQs",
  "Privacy Policy",
  "Terms & Conditions",
] as const;

export const SORT_OPTIONS: SortOptionValue[] = [
  { label: "Recommended", value: "recommended" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Name: A-Z", value: "name-asc" },
  { label: "Name: Z-A", value: "name-desc" },
];

export const FILTER_SECTIONS: FilterSection[] = [
  { key: "customizable", title: "Customizable", value: "No", collapsedByDefault: false },
  { key: "idealFor", title: "Ideal For", value: "All", collapsedByDefault: true },
  { key: "occasion", title: "Occasion", value: "All", collapsedByDefault: true },
  { key: "work", title: "Work", value: "All", collapsedByDefault: true },
  { key: "fabric", title: "Fabric", value: "All", collapsedByDefault: true },
  { key: "segment", title: "Segment", value: "All", collapsedByDefault: true },
  { key: "suitableFor", title: "Suitable For", value: "All", collapsedByDefault: true },
  { key: "rawMaterials", title: "Raw Materials", value: "All", collapsedByDefault: true },
  { key: "pattern", title: "Pattern", value: "All", collapsedByDefault: true },
];
