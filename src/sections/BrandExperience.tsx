import { brands } from "../data/brands";
import { Reveal } from "../components/Reveal";
import { TextReveal } from "../components/TextReveal";
import styles from "./BrandExperience.module.css";

const [bmw, mercedes, audi] = brands;

export function BrandExperience() {
  return (
    <section id="brands" className={styles.section} aria-labelledby="brands-heading">
      <div className="container">
        <div className={styles.intro}>
          <TextReveal as="p" variant="eyebrow" lines={["Built for the road"]} className="eyebrow" />
          <TextReveal
            as="h2"
            id="brands-heading"
            lines={["Designed to complement", "iconic performance."]}
            className={styles.heading}
          />
          <Reveal as="p" delay={0.15} className={styles.copy}>
            VELORA wheels are engineered to suit the proportions and stance of the world&rsquo;s
            most recognized performance marques. VELORA is an independent wheel maker and is not
            affiliated with or endorsed by these manufacturers.
          </Reveal>
        </div>
      </div>

      <div className={`${styles.grid} container`}>
        <Reveal as="figure" className={styles.bmwFrame}>
          <img src={bmw.image} alt={bmw.imageAlt} className={`${styles.image} photo`} loading="lazy" decoding="async" />
          <div className={styles.scrim} aria-hidden="true" />
          <figcaption className={styles.caption}>
            <span className={styles.brandName}>{bmw.name}</span>
            <span className={styles.tag}>{bmw.tag}</span>
          </figcaption>
        </Reveal>

        <Reveal as="figure" className={styles.mercedesFrame} delay={0.08}>
          <img
            src={mercedes.image}
            alt={mercedes.imageAlt}
            className={`${styles.image} photo`}
            loading="lazy"
            decoding="async"
          />
          <div className={styles.scrim} aria-hidden="true" />
          <figcaption className={styles.caption}>
            <span className={styles.brandName}>{mercedes.name}</span>
            <span className={styles.tag}>{mercedes.tag}</span>
          </figcaption>
        </Reveal>

        <Reveal as="figure" className={styles.audiFrame} delay={0.14}>
          <img src={audi.image} alt={audi.imageAlt} className={`${styles.image} photo`} loading="lazy" decoding="async" />
          <div className={styles.scrim} aria-hidden="true" />
          <figcaption className={styles.caption}>
            <span className={styles.brandName}>{audi.name}</span>
            <span className={styles.tag}>{audi.tag}</span>
          </figcaption>
        </Reveal>
      </div>
    </section>
  );
}
