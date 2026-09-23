import styles from "./loading.module.css";

export default function Loading() {
  return (
    <div className={styles.wrapper} role="status" aria-live="polite">
      <span className="visually-hidden">Loading products…</span>
      <span className={styles.spinner} aria-hidden="true" />
    </div>
  );
}
