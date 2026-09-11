import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.top} container`}>
        <div className={styles.brand}>
          <span className={styles.wordmark}>VELORA WHEELS</span>
          <p>Precision in motion.</p>
        </div>

        <nav aria-label="Footer">
          <ul>
            <li>
              <a href="#collection">Collection</a>
            </li>
            <li>
              <a href="#experience">Experience</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
          </ul>
        </nav>

        <div className={styles.social}>
          <span className={styles.socialLabel}>Follow</span>
          <a href="#" aria-label="VELORA WHEELS on Instagram (demo link)">
            Instagram
          </a>
        </div>
      </div>

      <div className={`${styles.bottom} container`}>
        <p>&copy; {new Date().getFullYear()} Velora Wheels. Concept project created for portfolio purposes.</p>
        <p>Fictional brand — not affiliated with BMW, Mercedes-Benz, or Audi.</p>
      </div>
    </footer>
  );
}
