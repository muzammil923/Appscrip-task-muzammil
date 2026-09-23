# Appsscrip PLP Task — leo fashion

A production-ready **Product Listing Page (PLP)** for the premium handcrafted-goods marketplace **leo fashion**, built to closely reproduce the supplied reference design.

## Overview

The page implements the full reference layout — header with centered navigation, hero intro, product toolbar, collapsible filter sidebar, responsive 3/2/1-column product grid, and a black editorial footer — using only Next.js, TypeScript and plain CSS Modules. Products are fetched server-side from FakeStoreAPI with a deterministic local fallback.

## Features

- **Product listing** — image-dominant cards with title, "Sign in or Create an account to see pricing" message, wishlist heart, `NEW PRODUCT` flag and `OUT OF STOCK` overlay.
- **Sorting** — Recommended, Price: Low to High, Price: High to Low, Name: A–Z, Name: Z–A; fully functional via the toolbar dropdown.
- **Filters** — nine editorial accordion sections (Customizable … Pattern) with chevron, current value and divider; hidden/shown via the `HIDE FILTER` toolbar toggle.
- **Mobile drawer filters** — below 1024px the sidebar becomes an overlay drawer with FILTER/CLOSE header.
- **Header interactions** — search modal, wishlist drawer, account modal, language dropdown, functional mobile menu.
- **Wishlist & cart state** — toggled with local React state; drawers list current items.
- **Footer** — newsletter signup with e-mail validation and success/error states, contact block, INR currency dropdown (Indian Rupees default), quick links, and payment badges (UPI, RuPay, COD, cards) with accessible labels.
- **States** — route-level loading spinner, error boundary with retry, and an empty-grid state.

## Tech Stack

- [Next.js](https://nextjs.org) (App Router) + React 18
- TypeScript (strict mode)
- Plain CSS / CSS Modules — **no Tailwind, Bootstrap or UI libraries**
- Inline SVG icons (no icon dependency)
- FakeStoreAPI with local fallback data

## Architecture

```
app/
  layout.tsx            # Fonts, SEO metadata, global styles
  page.tsx              # Server Component: SSR fetch + JSON-LD + composition
  loading.tsx           # Route loading state
  error.tsx             # Route error boundary
  globals.css           # Design tokens, reset, container, utilities
components/
  Header/               # Client: nav, search, wishlist/cart/account, language
  Hero/                 # Server: single H1 + intro copy
  ProductToolbar/       # Client: item count, hide filter, sort dropdown
  FilterSidebar/        # Client: accordions + mobile filter drawer
  ProductGrid/          # Server-safe grid rendering cards
  ProductCard/          # Client: wishlist toggle, NEW / OUT OF STOCK states
  Footer/               # Client: newsletter, currency, links, payments
  Icons/                # Inline SVG icon set
  ProductJsonLd.tsx     # ItemList/Product JSON-LD
  BrandJsonLd.tsx       # Organization JSON-LD
  ProductListingView.tsx# Client orchestrator (sort/wishlist/filter state)
lib/
  api.ts                # FakeStoreAPI fetch with timeout + fallback
  products.ts           # Deterministic decoration + sorting helpers
  fallback-products.ts  # Local mock catalogue
  constants.ts          # Brand, nav, filter, sort, footer config
  seo.ts                # Hero copy shared by server + component
types/
  product.ts            # Product, SortOption, FilterSection, CartItem
```

Interactive components (header panels, toolbar, sidebar, cards, footer) are Client Components; `page.tsx`, `Hero`, `ProductGrid`, and both JSON-LD components are Server-rendered.

## SSR Implementation

`app/page.tsx` is an **async Server Component**: it awaits `getProducts()` on the server — hitting FakeStoreAPI (or the deterministic fallback on failure) — before rendering. The fetched payload is passed as props into the client orchestrator, so the initial HTML already contains all products (verifiable via "view source": product titles appear in the markup). Only genuinely interactive subtrees carry `"use client"`; the page root does not.

## API

- `GET https://fakestoreapi.com/products` fetched server-side with an 8s `AbortSignal.timeout`.
- Responses are validated and transformed (`decorateProduct`) into the design's `Product` shape, deriving `isNew`, `isOutOfStock`, fabric/occasion/segment etc. **deterministically from the product ID** — never randomly per render.
- On any network/parse failure the page silently falls back to `FALLBACK_PRODUCTS` so the UI never breaks.

## SEO

- Next.js `metadata`: title `Discover Our Products | leo fashion`, description, canonical placeholder, robots, Open Graph and Twitter cards.
- `viewport` export for correct mobile rendering.
- Semantic HTML with a single `<h1>` (hero) and `<h2>` section headings.
- JSON-LD: `Organization` (brand) + `ItemList` of `Product` entries with offers and availability.

## Responsive Design

| Breakpoint | Layout |
| --- | --- |
| ≥ 1024px | Sidebar + 3-column grid, full desktop header |
| 768–1023px | 2-column grid, filter trigger + drawer, compact header |
| < 768px | Reduced spacing, mobile header, drawer filters |
| ≤ 400px | 1-column grid |

No horizontal scrolling at any width; images keep a consistent 3:4 aspect ratio via `aspect-ratio` + `object-fit: cover`.

## Running Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production Build

```bash
npm run build
npm start
```

TypeScript and ESLint checks run as part of the build.

## Deployment

### Vercel (recommended)

1. Push the repository to GitHub.
2. Import the project at [vercel.com/new](https://vercel.com/new) — the Next.js preset is auto-detected.
3. Deploy (no environment variables required).

### Netlify

1. Push the repository to GitHub.
2. In Netlify, choose **Add new site → Import an existing project** and pick the repo.
3. Netlify detects Next.js via the official runtime; confirm:
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
4. Deploy. The Next.js runtime provisions SSR functions automatically — no extra configuration needed.

## Assignment Notes

This implementation uses **Next.js (App Router)**, **TypeScript**, **plain CSS Modules** (no CSS frameworks), **server-side rendering** for the product data, **responsive design** across mobile/tablet/desktop, and **FakeStoreAPI** with a deterministic local fallback — with minimal dependencies (only `next`, `react`, `react-dom`).

## India Localization

- **Brand**: leo fashion, with `customercare@leofashion.com` and Indian phone `+91 98765 43210`.
- **Currency**: prices render in **INR (₹)** using the `en-IN` locale; the footer currency dropdown defaults to INR and billing is stated in Indian Rupees.
- **Catalogue**: deterministic API pricing is converted to whole-rupee INR; the fallback catalogue features Indian crafts (Khadi, Banarasi silk, Kalamkari, Meenakari, Channapatna, Khurja blue pottery).
- **Payments**: UPI, RuPay and Cash on Delivery badges alongside international cards.
- **SEO**: `lang="en-IN"`, India-served JSON-LD (`areaServed: "IN"`, INR offers, IN address).
- **Copy**: all page copy is in English — no placeholder Lorem ipsum.
