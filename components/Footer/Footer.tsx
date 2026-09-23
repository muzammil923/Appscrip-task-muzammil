"use client";

import { useState } from "react";
import {
  BRAND,
  CURRENCIES,
  DEFAULT_CURRENCY,
  FOOTER_ABOUT_LINKS,
  FOOTER_QUICK_LINKS,
} from "@/lib/constants";
import { ChevronDownIcon } from "@/components/Icons";
import styles from "./Footer.module.css";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type PaymentBadge = {
  label: string;
  text: string;
  tone?: "amex" | "opay" | "mastercard";
};

/** Desktop payment badges (unchanged). */
const PAYMENT_BADGES: PaymentBadge[] = [
  { label: "Google Pay", text: "G Pay" },
  { label: "UPI", text: "UPI" },
  { label: "RuPay", text: "RuPay" },
  { label: "PayPal", text: "PayPal" },
  { label: "American Express", text: "AMEX" },
  { label: "Mastercard", text: "MC" },
  { label: "Visa", text: "VISA" },
  { label: "Cash on Delivery", text: "COD" },
];

/** Mobile payment badges (single row, per mobile design). */
const MOBILE_PAYMENT_BADGES: PaymentBadge[] = [
  { label: "Google Pay", text: "G Pay" },
  { label: "Mastercard", text: "MC", tone: "mastercard" },
  { label: "PayPal", text: "PayPal" },
  { label: "American Express", text: "AMEX", tone: "amex" },
  { label: "Apple Pay", text: "Apple Pay" },
  { label: "OPay", text: "OPay", tone: "opay" },
];

const NEWSLETTER_COPY =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. this is simply dummy text.";

/** Section keys for the mobile accordion rows. */
type MobileSection = "brand" | "quickLinks" | "followUs";

const MOBILE_SECTIONS: Array<{
  key: MobileSection;
  title: string;
  links: readonly string[];
}> = [
  { key: "brand", title: "mettä muse", links: FOOTER_ABOUT_LINKS },
  { key: "quickLinks", title: "QUICK LINKS", links: FOOTER_QUICK_LINKS },
  {
    key: "followUs",
    title: "FOLLOW US",
    links: ["Instagram", "LinkedIn"],
  },
];

/** Small circular US flag (emoji flags do not render on every platform). */
function USFlagIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" focusable="false">
      <clipPath id="footer-us-flag-circle">
        <circle cx="9" cy="9" r="9" />
      </clipPath>
      <g clipPath="url(#footer-us-flag-circle)">
        <rect width="18" height="18" fill="#ffffff" />
        <g fill="#b22234">
          <rect y="0" width="18" height="1.6" />
          <rect y="3.2" width="18" height="1.6" />
          <rect y="6.4" width="18" height="1.6" />
          <rect y="9.6" width="18" height="1.6" />
          <rect y="12.8" width="18" height="1.6" />
          <rect y="16" width="18" height="1.6" />
        </g>
        <rect width="8" height="6.4" fill="#3c3b6e" />
      </g>
    </svg>
  );
}

export function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");
  const [currency, setCurrency] = useState<string>(DEFAULT_CURRENCY);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [openSections, setOpenSections] = useState<Record<MobileSection, boolean>>({
    brand: false,
    quickLinks: false,
    followUs: false,
  });

  const toggleSection = (key: MobileSection) => {
    setOpenSections((current) => ({ ...current, [key]: !current[key] }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!EMAIL_PATTERN.test(email.trim())) {
      setStatus("error");
      return;
    }
    setStatus("success");
    setEmail("");
  };

  return (
    <footer className={styles.footer}>
      {/* ================= Desktop footer (unchanged) ================= */}
      <div className={styles.desktopFooter}>
        <div className="container">
          {/* Newsletter + contact */}
          <div className={styles.topSection}>
            <div className={styles.newsletter}>
              <h2 className={styles.newsletterTitle}>BE THE FIRST TO KNOW</h2>
              <p className={styles.newsletterText}>
                Sign up for updates from {BRAND.name}.
              </p>
              <form className={styles.newsletterForm} onSubmit={handleSubmit} noValidate>
                <label className="visually-hidden" htmlFor="newsletter-email">
                  E-mail address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  className={styles.newsletterInput}
                  placeholder="Enter your e-mail..."
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    if (status !== "idle") setStatus("idle");
                  }}
                  aria-invalid={status === "error"}
                />
                <button type="submit" className={styles.subscribeButton}>
                  SUBSCRIBE
                </button>
              </form>
              {status === "error" && (
                <p className={styles.newsletterError} role="alert">
                  Please enter a valid e-mail address.
                </p>
              )}
              {status === "success" && (
                <p className={styles.newsletterSuccess} role="status">
                  Thank you for subscribing.
                </p>
              )}
            </div>

            <div className={styles.contactCurrency}>
              <div>
                <h2 className={styles.columnTitle}>CONTACT US</h2>
                <p className={styles.contactLine}>{BRAND.phone}</p>
                <p className={styles.contactLine}>{BRAND.email}</p>
              </div>
              <div>
                <h2 className={styles.columnTitle}>CURRENCY</h2>
                <div className={styles.currencyWrapper}>
                  <button
                    type="button"
                    className={styles.currencyButton}
                    aria-haspopup="listbox"
                    aria-expanded={currencyOpen}
                    onClick={() => setCurrencyOpen((open) => !open)}
                  >
                    {currency}
                    <ChevronDownIcon width={16} height={16} />
                  </button>
                  {currencyOpen && (
                    <ul className={styles.currencyMenu} role="listbox" aria-label="Select currency">
                      {CURRENCIES.map((code) => (
                        <li key={code}>
                          <button
                            type="button"
                            role="option"
                            aria-selected={currency === code}
                            className={styles.currencyOption}
                            onClick={() => {
                              setCurrency(code);
                              setCurrencyOpen(false);
                            }}
                          >
                            {code}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <p className={styles.currencyNote}>
                  Transactions and billing occur in {DEFAULT_CURRENCY} (Indian Rupees) unless stated otherwise.
                </p>
              </div>
            </div>
          </div>

          <div className={styles.divider} role="presentation" />

          {/* Link columns */}
          <div className={styles.linkSection}>
            <div className={styles.brandColumn}>
              <span className={styles.brandName}>{BRAND.name}</span>
              <ul className={styles.linkList}>
                {FOOTER_ABOUT_LINKS.map((link) => (
                  <li key={link}>
                    <a href="#" className={styles.link}>{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className={styles.columnTitle}>QUICK LINKS</h2>
              <ul className={styles.linkList}>
                {FOOTER_QUICK_LINKS.map((link) => (
                  <li key={link}>
                    <a href="#" className={styles.link}>{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className={styles.columnTitle}>FOLLOW US</h2>
              <ul className={styles.linkList}>
                <li><a href="#" className={styles.link}>Instagram</a></li>
                <li><a href="#" className={styles.link}>LinkedIn</a></li>
              </ul>
            </div>
          </div>

          {/* Payment badges */}
          <div className={styles.bottomSection}>
            <span className={styles.acceptsLabel}>{BRAND.name.toUpperCase()} ACCEPTS</span>
            <ul className={styles.paymentList}>
              {PAYMENT_BADGES.map((badge) => (
                <li key={badge.label} className={styles.paymentBadge} aria-label={badge.label}>
                  {badge.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ================= Mobile footer ================= */}
      <div className={styles.mobileFooter}>
        <div className={styles.mobileInner}>
          {/* 1. Newsletter */}
          <section className={styles.mobileNewsletter} aria-labelledby="mobile-newsletter-title">
            <h2 id="mobile-newsletter-title" className={styles.mobileHeading}>
              BE THE FIRST TO KNOW
            </h2>
            <p className={styles.mobileCopy}>{NEWSLETTER_COPY}</p>
            <form className={styles.mobileForm} onSubmit={handleSubmit} noValidate>
              <label className="visually-hidden" htmlFor="newsletter-email-mobile">
                E-mail address
              </label>
              <input
                id="newsletter-email-mobile"
                type="email"
                className={styles.mobileInput}
                placeholder="Enter your e-mail..."
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  if (status !== "idle") setStatus("idle");
                }}
                aria-invalid={status === "error"}
              />
              <button type="submit" className={styles.mobileSubscribe}>
                SUBSCRIBE
              </button>
            </form>
            {status === "error" && (
              <p className={styles.mobileFormMessage} role="alert">
                Please enter a valid e-mail address.
              </p>
            )}
            {status === "success" && (
              <p className={styles.mobileFormMessage} role="status">
                Thank you for subscribing.
              </p>
            )}
          </section>

          <div className={styles.mobileDivider} role="presentation" />

          {/* 3. Contact */}
          <section className={styles.mobileSection} aria-labelledby="mobile-contact-title">
            <h2 id="mobile-contact-title" className={styles.mobileHeading}>
              CALL US
            </h2>
            <p className={styles.mobileContactLine}>
              <a
                href={`tel:${BRAND.phone.replace(/\s+/g, "")}`}
                className={styles.mobileContactLink}
              >
                {BRAND.phone}
              </a>
              <span aria-hidden="true">•</span>
              <a href={`mailto:${BRAND.email}`} className={styles.mobileContactLink}>
                {BRAND.email}
              </a>
            </p>
          </section>

          <div className={styles.mobileDivider} role="presentation" />

          {/* 4. Currency */}
          <section className={styles.mobileSection} aria-labelledby="mobile-currency-title">
            <h2 id="mobile-currency-title" className={styles.mobileHeading}>
              CURRENCY
            </h2>
            <div className={styles.currencyWrapper}>
              <button
                type="button"
                className={styles.mobileCurrencyButton}
                aria-haspopup="listbox"
                aria-expanded={currencyOpen}
                onClick={() => setCurrencyOpen((open) => !open)}
              >
                <USFlagIcon />
                <span aria-hidden="true">•</span>
                <span className="visually-hidden">Selected currency: </span>
                {currency}
              </button>
              {currencyOpen && (
                <ul className={styles.mobileCurrencyMenu} role="listbox" aria-label="Select currency">
                  {CURRENCIES.map((code) => (
                    <li key={code}>
                      <button
                        type="button"
                        role="option"
                        aria-selected={currency === code}
                        className={styles.currencyOption}
                        onClick={() => {
                          setCurrency(code);
                          setCurrencyOpen(false);
                        }}
                      >
                        {code}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>

          <div className={styles.mobileDivider} role="presentation" />

          {/* 5. Collapsible sections */}
          <ul className={styles.mobileAccordion}>
            {MOBILE_SECTIONS.map((section) => {
              const isOpen = openSections[section.key];
              return (
                <li key={section.key} className={styles.mobileAccordionItem}>
                  <button
                    type="button"
                    className={styles.mobileAccordionTrigger}
                    aria-expanded={isOpen}
                    aria-controls={`mobile-footer-panel-${section.key}`}
                    onClick={() => toggleSection(section.key)}
                  >
                    <span
                      className={
                        section.key === "brand"
                          ? styles.mobileAccordionBrand
                          : styles.mobileAccordionTitle
                      }
                    >
                      {section.title}
                    </span>
                    <ChevronDownIcon
                      width={16}
                      height={16}
                      className={
                        isOpen
                          ? `${styles.mobileChevron} ${styles.mobileChevronOpen}`
                          : styles.mobileChevron
                      }
                    />
                  </button>
                  <div
                    id={`mobile-footer-panel-${section.key}`}
                    className={
                      isOpen
                        ? `${styles.mobilePanel} ${styles.mobilePanelOpen}`
                        : styles.mobilePanel
                    }
                    role="region"
                    aria-hidden={!isOpen}
                  >
                    <ul className={styles.mobileLinkList}>
                      {section.links.map((link) => (
                        <li key={link}>
                          <a href="#" className={styles.mobileLink} tabIndex={isOpen ? 0 : -1}>
                            {link}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* 6. Payment methods */}
          <section className={styles.mobilePayments} aria-labelledby="mobile-accepts-title">
            <h2 id="mobile-accepts-title" className={styles.mobileAcceptsLabel}>
              mettä muse <span className={styles.mobileAcceptsMuted}>ACCEPTS</span>
            </h2>
            <ul className={styles.mobilePaymentList}>
              {MOBILE_PAYMENT_BADGES.map((badge) => (
                <li
                  key={badge.label}
                  aria-label={badge.label}
                  className={[
                    styles.mobilePaymentBadge,
                    badge.tone === "amex" && styles.mobilePaymentBadgeAmex,
                    badge.tone === "opay" && styles.mobilePaymentBadgeOpay,
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {badge.tone === "mastercard" ? (
                    <span className={styles.mobileMcMark} aria-hidden="true">
                      <span className={styles.mobileMcCircleLeft} />
                      <span className={styles.mobileMcCircleRight} />
                    </span>
                  ) : (
                    badge.text
                  )}
                </li>
              ))}
            </ul>
          </section>

          {/* 7. Copyright */}
          <p className={styles.mobileCopyright}>
            Copyright © 2023 mettamuse. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
