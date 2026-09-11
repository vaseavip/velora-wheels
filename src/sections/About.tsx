import { Button } from "../components/Button";
import { Reveal } from "../components/Reveal";
import styles from "./About.module.css";

export function About() {
  return (
    <section id="about" className={styles.section} aria-labelledby="about-heading">
      <div className={`${styles.intro} container`}>
        <Reveal>
          <p className="eyebrow">About Velora</p>
          <h2 id="about-heading" className={styles.heading}>
            Wheels, considered
            <br />
            as products &mdash; not parts.
          </h2>
          <p className={styles.copy}>
            VELORA WHEELS is a concept automotive brand: every model, photograph, and word on this
            site was built to explore what a premium wheel maker&rsquo;s digital presence could
            feel like. It is a design and front-end development portfolio project, not a
            commercial store &mdash; there is no checkout, account, or real product to purchase.
          </p>
        </Reveal>
      </div>

      <div className={styles.cta}>
        <img
          src="/images/cars/finalcta.webp"
          alt="A performance sedan glowing under overhead lights in a night parking structure"
          className={`${styles.ctaImage} photo`}
          loading="lazy"
          decoding="async"
        />
        <div className={styles.scrim} aria-hidden="true" />
        <Reveal className={styles.ctaContent} y={20}>
          <h3 className={styles.ctaHeading}>
            Built
            <br />
            to move.
          </h3>
          <Button href="#collection" variant="solid">
            Explore VELORA
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
