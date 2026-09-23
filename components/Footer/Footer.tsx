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
};

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

export function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");
  const [currency, setCurrency] = useState<string>(DEFAULT_CURRENCY);
  const [currencyOpen, setCurrencyOpen] = useState(false);

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
    </footer>
  );
}
