import { detailShots } from "../data/details";
import { DetailReveal } from "../components/DetailReveal";
import { Reveal } from "../components/Reveal";
import styles from "./Craftsmanship.module.css";

export function Craftsmanship() {
  return (
    <section id="experience" className={styles.section} aria-labelledby="craft-heading">
      <div className="container">
        <Reveal className={styles.intro}>
          <p className="eyebrow">Precision</p>
          <h2 id="craft-heading" className={styles.heading}>
            Details define
            <br />
            everything.
          </h2>
          <p className={styles.copy}>
            Every VELORA wheel is judged in the smallest details &mdash; the line of a spoke, the
            edge of a machined face, the fit of a bolt. Nothing is accidental.
          </p>
        </Reveal>

        <div className={styles.grid}>
          {detailShots.map((shot, index) => (
            <DetailReveal key={shot.id} shot={shot} delay={(index % 2) * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
