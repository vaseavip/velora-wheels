import { detailShots } from "../data/details";
import { DetailReveal } from "../components/DetailReveal";
import { Reveal } from "../components/Reveal";
import { TextReveal } from "../components/TextReveal";
import styles from "./Craftsmanship.module.css";

export function Craftsmanship() {
  return (
    <section id="experience" className={styles.section} aria-labelledby="craft-heading">
      <div className="container">
        <div className={styles.intro}>
          <TextReveal as="p" variant="eyebrow" lines={["Precision"]} className="eyebrow" />
          <TextReveal
            as="h2"
            id="craft-heading"
            lines={["Details define", "everything."]}
            className={styles.heading}
          />
          <Reveal as="p" delay={0.15} className={styles.copy}>
            Every VELORA wheel is judged in the smallest details &mdash; the line of a spoke, the
            edge of a machined face, the fit of a bolt. Nothing is accidental.
          </Reveal>
        </div>

        <div className={styles.grid}>
          {detailShots.map((shot, index) => (
            <DetailReveal key={shot.id} shot={shot} delay={(index % 2) * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
