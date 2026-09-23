import { HERO } from "@/lib/seo";
import styles from "./Hero.module.css";

/** Hero intro — server component. The page's single H1 lives here. */
export function Hero() {
  return (
    <section className={styles.hero}>
      <div className="container">
        <h1 className={styles.title}>{HERO.title}</h1>
        <p className={styles.description}>{HERO.description}</p>
      </div>
    </section>
  );
}
