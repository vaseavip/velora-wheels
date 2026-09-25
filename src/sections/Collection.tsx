import { wheels } from "../data/wheels";
import { TextReveal } from "../components/TextReveal";
import { AxisScene } from "./collection/AxisScene";
import { NovaScene } from "./collection/NovaScene";
import { CollectionEntry } from "./collection/CollectionEntry";
import styles from "./Collection.module.css";

const [axis, forge, vector, arc, monarch, nova] = wheels;

export function Collection() {
  return (
    <section id="collection" className={styles.section} aria-labelledby="collection-heading">
      <div className="container">
        <div className={styles.intro}>
          <TextReveal as="p" variant="eyebrow" lines={["Featured wheels"]} className="eyebrow" />
          <TextReveal as="h2" lines={["The Collection"]} id="collection-heading" className={styles.heading} />
        </div>
      </div>

      <div className={styles.list}>
        <AxisScene wheel={axis} />
        <CollectionEntry wheel={forge} variant="forge" />
        <CollectionEntry wheel={vector} variant="vector" />
        <CollectionEntry wheel={arc} variant="arc" />
        <CollectionEntry wheel={monarch} variant="monarch" />
        <NovaScene wheel={nova} />
      </div>
    </section>
  );
}
