"use client";

import { useMemo, useState } from "react";
import type { CartItem, Product, SortOption } from "@/types/product";
import { Header } from "@/components/Header/Header";
import { Hero } from "@/components/Hero/Hero";
import { FilterSidebar } from "@/components/FilterSidebar/FilterSidebar";
import { ProductToolbar } from "@/components/ProductToolbar/ProductToolbar";
import { ProductGrid } from "@/components/ProductGrid/ProductGrid";
import { Footer } from "@/components/Footer/Footer";
import { applySorting } from "@/lib/api";
import styles from "./ProductListingView.module.css";

type ProductListingViewProps = {
  initialProducts: Product[];
};

export function ProductListingView({ initialProducts }: ProductListingViewProps) {
  const [products] = useState<Product[]>(initialProducts);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [sort, setSort] = useState<SortOption>("recommended");
  const [filtersHidden, setFiltersHidden] = useState(false);

  const sortedProducts = useMemo(
    () => applySorting(products, sort),
    [products, sort]
  );

  const toggleWishlist = (id: number) => {
    setWishlist((current) =>
      current.includes(id) ? current.filter((itemId) => itemId !== id) : [...current, id]
    );
  };

  const removeFromCart = (id: number) => {
    setCart((current) => current.filter((item) => item.id !== id));
  };

  return (
    <>
      <Header
        products={products}
        wishlist={wishlist}
        cart={cart}
        onToggleWishlist={toggleWishlist}
        onRemoveFromCart={removeFromCart}
      />
      <main>
        <Hero />
        <div className="container">
          <ProductToolbar
            itemCount={sortedProducts.length}
            filtersHidden={filtersHidden}
            onToggleFilters={() => setFiltersHidden((hidden) => !hidden)}
            sort={sort}
            onSortChange={setSort}
          />
          <div className={styles.listingLayout}>
            <FilterSidebar
              filtersHidden={filtersHidden}
              onRestoreFilters={() => setFiltersHidden(false)}
            />
            <ProductGrid
              products={sortedProducts}
              wishlist={wishlist}
              onToggleWishlist={toggleWishlist}
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
