import { wheels } from "../data/wheels";
import { WheelStage } from "../components/WheelStage";
import { Reveal } from "../components/Reveal";
import styles from "./Collection.module.css";

const LAYOUT = ["feature", "stackedTop", "stackedBottom", "row", "row", "row"] as const;

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

        <div className={styles.grid}>
          {wheels.map((wheel, index) => (
            <Reveal
              key={wheel.id}
              className={`${styles.item} ${styles[LAYOUT[index]]}`}
              delay={(index % 3) * 0.06}
            >
              <div className={styles.visual}>
                <WheelStage wheel={wheel} maxOffset={10} />
              </div>
              <div className={styles.meta}>
                <span className={styles.index}>{wheel.index}</span>
                <h3 className={styles.name}>{wheel.name}</h3>
                <p className={styles.specs}>
                  {wheel.size} &middot; {wheel.finish}
                </p>
                <p className={styles.desc}>{wheel.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
