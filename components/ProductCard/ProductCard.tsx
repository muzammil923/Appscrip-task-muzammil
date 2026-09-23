"use client";

import Image from "next/image";
import type { Product } from "@/types/product";
import { PRICE_LOCALE } from "@/lib/constants";
import { HeartIcon } from "@/components/Icons";
import styles from "./ProductCard.module.css";

type ProductCardProps = {
  product: Product;
  isFavorite: boolean;
  onToggleWishlist: (id: number) => void;
};

export function ProductCard({ product, isFavorite, onToggleWishlist }: ProductCardProps) {
  const detail = `${product.fabric} · ${product.occasion} · ${product.segment}`;
  const formattedPrice = new Intl.NumberFormat(PRICE_LOCALE, {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(product.price);

  return (
    <article className={styles.card}>
      <div className={styles.media}>
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 767px) 50vw, (max-width: 1023px) 50vw, 30vw"
          className={styles.image}
        />

        {product.isNew && <span className={styles.flag}>NEW PRODUCT</span>}

        {product.isOutOfStock && (
          <div className={styles.overlay}>
            <span className={styles.overlayText}>OUT OF STOCK</span>
          </div>
        )}
      </div>

      <div className={styles.info}>
        <div className={styles.heading}>
          <h3 className={styles.name}>{product.title}</h3>
          <button
            type="button"
            className={styles.wishlistButton}
            aria-label={isFavorite ? `Remove ${product.title} from wishlist` : `Add ${product.title} to wishlist`}
            aria-pressed={isFavorite}
            onClick={() => onToggleWishlist(product.id)}
          >
            <HeartIcon filled={isFavorite} width={18} height={18} />
          </button>
        </div>
        <p className={styles.pricing}>
          Sign in or create an account to see the price of {formattedPrice}
        </p>
        <p className={styles.meta}>{detail}</p>
      </div>
    </article>
  );
}
