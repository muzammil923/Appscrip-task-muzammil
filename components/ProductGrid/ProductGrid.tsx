import type { Product } from "@/types/product";
import { ProductCard } from "@/components/ProductCard/ProductCard";
import styles from "./ProductGrid.module.css";

type ProductGridProps = {
  products: Product[];
  wishlist: number[];
  onToggleWishlist: (id: number) => void;
};

export function ProductGrid({ products, wishlist, onToggleWishlist }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className={styles.empty}>
        <p className={styles.emptyTitle}>No products found</p>
        <p className={styles.emptyText}>Try adjusting your filters or check back soon.</p>
      </div>
    );
  }

  return (
    <ul className={styles.grid}>
      {products.map((product) => (
        <li key={product.id} className={styles.cell}>
          <ProductCard
            product={product}
            isFavorite={wishlist.includes(product.id)}
            onToggleWishlist={onToggleWishlist}
          />
        </li>
      ))}
    </ul>
  );
}
