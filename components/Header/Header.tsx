"use client";

import { useCallback, useEffect, useState } from "react";
import type { CartItem, Product } from "@/types/product";
import { LANGUAGES, NAV_LINKS } from "@/lib/constants";
import {
  BagIcon,
  ChevronDownIcon,
  CloseIcon,
  HeartIcon,
  MenuIcon,
  SearchIcon,
  UserIcon,
} from "@/components/Icons";
import styles from "./Header.module.css";

type HeaderProps = {
  products: Product[];
  wishlist: number[];
  cart: CartItem[];
  onToggleWishlist: (id: number) => void;
  onRemoveFromCart: (id: number) => void;
};

type PanelKind = "menu" | "search" | "account" | "wishlist" | "cart" | null;

export function Header({ products, wishlist, cart, onToggleWishlist, onRemoveFromCart }: HeaderProps) {
  const [activePanel, setActivePanel] = useState<PanelKind>(null);
  const [language, setLanguage] = useState<string>("ENG");
  const [languageOpen, setLanguageOpen] = useState(false);

  const closePanel = useCallback(() => setActivePanel(null), []);

  useEffect(() => {
    if (activePanel === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closePanel();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activePanel, closePanel]);

  useEffect(() => {
    document.body.style.overflow = activePanel ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activePanel]);

  const openPanel = (panel: PanelKind) => setActivePanel(panel);

  const wishlistProducts = products.filter((product) => wishlist.includes(product.id));

  return (
    <header>
      {/* Desktop top bar */}
      <div className={styles.topBar}>
        <div className={`container ${styles.topBarInner}`}>
          <div className={styles.topLeft}>
            <span className={styles.logo}>LOGO</span>
          </div>

          <div className={styles.topRight}>
            <button type="button" className={styles.iconButton} aria-label="Search" onClick={() => openPanel("search")}>
              <SearchIcon />
            </button>
            <button type="button" className={styles.iconButton} aria-label="Open wishlist" onClick={() => openPanel("wishlist")}>
              <HeartIcon />
            </button>
            <button type="button" className={styles.accountButton} aria-label="Open account" onClick={() => openPanel("account")}>
              <UserIcon />
              <span>Account</span>
            </button>
            <div className={styles.languageWrapper}>
              <button
                type="button"
                className={styles.languageButton}
                aria-haspopup="listbox"
                aria-expanded={languageOpen}
                onClick={() => setLanguageOpen((open) => !open)}
              >
                {language}
                <ChevronDownIcon width={16} height={16} />
              </button>
              {languageOpen && (
                <ul className={styles.languageMenu} role="listbox" aria-label="Select language">
                  {LANGUAGES.map((code) => (
                    <li key={code}>
                      <button
                        type="button"
                        role="option"
                        aria-selected={language === code}
                        className={styles.languageOption}
                        onClick={() => {
                          setLanguage(code);
                          setLanguageOpen(false);
                        }}
                      >
                        {code}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop primary navigation */}
      <nav className={styles.primaryNav} aria-label="Primary">
        <ul className={`container ${styles.navList}`}>
          {NAV_LINKS.map((label) => (
            <li key={label}>
              <a href="#" className={styles.navLink}>{label}</a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile bar */}
      <div className={styles.mobileBar}>
        <button type="button" className={styles.iconButton} aria-label="Open menu" onClick={() => openPanel("menu")}>
          <MenuIcon />
        </button>
        <span className={styles.mobileLogo}>LOGO</span>
        <div className={styles.mobileActions}>
          <button type="button" className={styles.iconButton} aria-label="Search" onClick={() => openPanel("search")}>
            <SearchIcon />
          </button>
          <button type="button" className={styles.iconButton} aria-label="Open wishlist" onClick={() => openPanel("wishlist")}>
            <HeartIcon />
          </button>
          <button type="button" className={styles.iconButton} aria-label="Open shopping bag" onClick={() => openPanel("cart")}>
            <BagIcon />
          </button>
        </div>
      </div>

      {/* Overlays and panels */}
      {activePanel && (
        <div className={styles.overlay} onClick={closePanel} aria-hidden="true" />
      )}

      {activePanel === "menu" && (
        <div className={styles.drawer} role="dialog" aria-modal="true" aria-label="Menu">
          <div className={styles.drawerHeader}>
            <span className={styles.drawerTitle}>Menu</span>
            <button type="button" className={styles.iconButton} aria-label="Close menu" onClick={closePanel}>
              <CloseIcon />
            </button>
          </div>
          <nav aria-label="Mobile">
            <ul className={styles.drawerNav}>
              {NAV_LINKS.map((label) => (
                <li key={label}>
                  <a href="#" className={styles.drawerLink} onClick={closePanel}>{label}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}

      {activePanel === "search" && (
        <div className={styles.searchModal} role="dialog" aria-modal="true" aria-label="Search">
          <form className={styles.searchForm} onSubmit={(event) => event.preventDefault()}>
            <SearchIcon />
            <label className="visually-hidden" htmlFor="site-search">Search products</label>
            <input
              id="site-search"
              className={styles.searchInput}
              type="search"
              placeholder="Search products…"
              autoFocus
            />
            <button type="button" className={styles.iconButton} aria-label="Close search" onClick={closePanel}>
              <CloseIcon />
            </button>
          </form>
          <span className={styles.searchHint}>Press Enter to search (demo only).</span>
        </div>
      )}

      {activePanel === "account" && (
        <div className={styles.accountModal} role="dialog" aria-modal="true" aria-label="Account">
          <h2 className={styles.accountModalTitle}>Sign in</h2>
          <p className={styles.accountModalText}>
            Sign in to see pricing, save your wishlist and check out faster.
          </p>
          <div className={styles.modalActions}>
            <button type="button" className={styles.primaryButton} onClick={closePanel}>
              Sign In
            </button>
            <button type="button" className={styles.secondaryButton} onClick={closePanel}>
              Create Account
            </button>
          </div>
        </div>
      )}

      {activePanel === "wishlist" && (
        <div className={styles.drawer} role="dialog" aria-modal="true" aria-label="Wishlist">
          <div className={styles.drawerHeader}>
            <span className={styles.drawerTitle}>Wishlist</span>
            <button type="button" className={styles.iconButton} aria-label="Close wishlist" onClick={closePanel}>
              <CloseIcon />
            </button>
          </div>
          {wishlistProducts.length === 0 ? (
            <p className={styles.emptyMessage}>Your wishlist is empty.</p>
          ) : (
            <ul className={styles.drawerList}>
              {wishlistProducts.map((product) => (
                <li key={product.id} className={styles.drawerItem}>
                  <div className={styles.drawerItemInfo}>
                    <span className={styles.drawerItemTitle}>{product.title}</span>
                    <button
                      type="button"
                      className={styles.drawerItemMeta}
                      onClick={() => onToggleWishlist(product.id)}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {activePanel === "cart" && (
        <div className={styles.drawer} role="dialog" aria-modal="true" aria-label="Shopping bag">
          <div className={styles.drawerHeader}>
            <span className={styles.drawerTitle}>Shopping Bag</span>
            <button type="button" className={styles.iconButton} aria-label="Close shopping bag" onClick={closePanel}>
              <CloseIcon />
            </button>
          </div>
          {cart.length === 0 ? (
            <p className={styles.emptyMessage}>Your bag is empty.</p>
          ) : (
            <ul className={styles.drawerList}>
              {cart.map((item) => (
                <li key={item.id} className={styles.drawerItem}>
                  <div className={styles.drawerItemInfo}>
                    <span className={styles.drawerItemTitle}>{item.title}</span>
                    <span className={styles.drawerItemMeta}>
                      {item.quantity} × ${item.price.toFixed(2)}
                    </span>
                  </div>
                  <button
                    type="button"
                    className={styles.iconButton}
                    aria-label={`Remove ${item.title} from bag`}
                    onClick={() => onRemoveFromCart(item.id)}
                  >
                    <CloseIcon width={14} height={14} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </header>
  );
}
