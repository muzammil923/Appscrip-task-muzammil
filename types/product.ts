export type SortOption =
  | "recommended"
  | "price-asc"
  | "price-desc"
  | "name-asc"
  | "name-desc";

export type SortOptionValue = {
  label: string;
  value: SortOption;
};

export type FilterKey =
  | "customizable"
  | "idealFor"
  | "occasion"
  | "work"
  | "fabric"
  | "segment"
  | "suitableFor"
  | "rawMaterials"
  | "pattern";

export type FilterSection = {
  key: FilterKey;
  title: string;
  value: string;
  collapsedByDefault: boolean;
};

export type Product = {
  id: number;
  title: string;
  image: string;
  category: string;
  price: number;
  rating?: number;
  ratingCount?: number;
  isNew?: boolean;
  isOutOfStock?: boolean;
  isFavorite?: boolean;
  fabric?: string;
  occasion?: string;
  segment?: string;
  rawMaterials?: string;
  pattern?: string;
  work?: string;
  suitableFor?: string;
  customizable?: string;
};

export type CartItem = {
  id: number;
  title: string;
  price: number;
  quantity: number;
};
