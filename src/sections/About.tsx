import { Button } from "../components/Button";
import { Reveal } from "../components/Reveal";
import { TextReveal } from "../components/TextReveal";
import { useParallaxZoom } from "../animations/useParallaxZoom";
import styles from "./About.module.css";

export function About() {
  const ctaImageRef = useParallaxZoom<HTMLImageElement>(1.1);

  return (
    <section id="about" className={styles.section} aria-labelledby="about-heading">
      <div className={`${styles.intro} container`}>
        <TextReveal as="p" variant="eyebrow" lines={["About Velora"]} className="eyebrow" />
        <TextReveal
          as="h2"
          id="about-heading"
          lines={["Wheels, considered", "as products — not parts."]}
          className={styles.heading}
        />
        <Reveal as="p" delay={0.15} className={styles.copy}>
          VELORA WHEELS is a concept automotive brand: every model, photograph, and word on this
          site was built to explore what a premium wheel maker&rsquo;s digital presence could
          feel like. It is a design and front-end development portfolio project, not a
          commercial store &mdash; there is no checkout, account, or real product to purchase.
        </Reveal>
      </div>

      <div className={styles.cta}>
        <img
          ref={ctaImageRef}
          src="/images/cars/bmw.webp"
          alt="Black BMW M4 photographed front 3/4, low angle, alloy wheel prominent"
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
