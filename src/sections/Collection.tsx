import { wheels } from "../data/wheels";
import { WheelStage } from "../components/WheelStage";
import { Reveal } from "../components/Reveal";
import styles from "./Collection.module.css";

const VARIANTS = ["axis", "forge", "vector", "arc", "monarch"] as const;

export function Collection() {
  return (
    <section id="collection" className={styles.section} aria-labelledby="collection-heading">
      <div className="container">
        <Reveal className={styles.intro}>
          <p className="eyebrow">Featured wheels</p>
          <h2 id="collection-heading" className={styles.heading}>
            The Collection
          </h2>
        </Reveal>
      </div>

      <div className={styles.list}>
        {wheels.map((wheel, index) => (
          <article key={wheel.id} className={`${styles.entry} ${styles[VARIANTS[index]]}`}>
            <Reveal as="div" className={styles.wheelWrap} y={36}>
              <WheelStage wheel={wheel} maxOffset={12} />
            </Reveal>
            <Reveal as="div" className={styles.textBlock} delay={0.08}>
              <span className={styles.index}>{wheel.index}</span>
              <h3 className={styles.name}>{wheel.name}</h3>
              <p className={styles.specs}>
                {wheel.size} &middot; {wheel.finish}
              </p>
              <p className={styles.desc}>{wheel.description}</p>
            </Reveal>
          </article>
        ))}
      </div>
    </section>
  );
}
