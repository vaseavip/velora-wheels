import { brands } from "../data/brands";
import { Reveal } from "../components/Reveal";
import styles from "./BrandExperience.module.css";

export function BrandExperience() {
  return (
    <section id="brands" className={styles.section} aria-labelledby="brands-heading">
      <div className="container">
        <Reveal className={styles.intro}>
          <p className="eyebrow">Perfect fit</p>
          <h2 id="brands-heading" className={styles.heading}>
            Designed to complement
            <br />
            iconic German performance.
          </h2>
          <p className={styles.copy}>
            VELORA wheels are engineered to suit the proportions and stance of the world&rsquo;s
            most recognized performance marques. VELORA is an independent wheel maker and is not
            affiliated with or endorsed by these manufacturers.
          </p>
        </Reveal>
      </div>

      <div className={styles.strip}>
        {brands.map((brand, index) => (
          <Reveal key={brand.id} as="figure" className={styles.frame} delay={index * 0.08}>
            <img
              src={brand.image}
              alt={brand.imageAlt}
              className={`${styles.image} photo`}
              loading="lazy"
              decoding="async"
            />
            <figcaption className={styles.caption}>
              <span className={styles.brandName}>{brand.name}</span>
              <span className={styles.tagline}>{brand.tagline}</span>
            </figcaption>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
