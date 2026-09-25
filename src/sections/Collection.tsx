import { wheels } from "../data/wheels";
import { TextReveal } from "../components/TextReveal";
import { RollScene } from "./collection/RollScene";
import { ZoomScene } from "./collection/ZoomScene";
import styles from "./Collection.module.css";

const [axis, forge, vector, arc, monarch, nova] = wheels;

/**
 * The Collection alternates between exactly two motion systems, in this
 * fixed order: RollScene ("Animation 1", originally Axis) then ZoomScene
 * ("Animation 2", originally Nova), repeated —
 *   Axis(1) → Forge(2) → Vector(1) → Arc(2) → Monarch(1) → Nova(2)
 * — rather than a bespoke animation per wheel. Each instance only differs
 * in its image/text; see RollScene.tsx and ZoomScene.tsx for the shared
 * implementations.
 */
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
        <RollScene wheel={axis} eyebrow="The flagship" priority />
        <ZoomScene wheel={forge} eyebrow={forge.index} />
        <RollScene wheel={vector} eyebrow={vector.index} />
        <ZoomScene wheel={arc} eyebrow={arc.index} />
        <RollScene wheel={monarch} eyebrow={monarch.index} />
        <ZoomScene wheel={nova} eyebrow="Closing the collection" />
      </div>
    </section>
  );
}
