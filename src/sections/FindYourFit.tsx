import { useState } from "react";
import { brandFits } from "../data/fit";
import { Reveal } from "../components/Reveal";
import styles from "./FindYourFit.module.css";

export function FindYourFit() {
  const [activeId, setActiveId] = useState(brandFits[0].id);

  return (
    <section className={styles.section} aria-labelledby="fit-heading">
      <div className="container">
        <Reveal className={styles.intro}>
          <p className="eyebrow">Find your fit</p>
          <h2 id="fit-heading" className={styles.heading}>
            The right fit for every stance.
          </h2>
        </Reveal>

        <div className={styles.stage}>
          <Reveal as="div" className={styles.imageArea} delay={0.1}>
            {brandFits.map((brand) => (
              <img
                key={brand.id}
                src={brand.image}
                alt={brand.imageAlt}
                className={`${styles.image} photo ${brand.id === activeId ? styles.imageActive : ""}`}
                loading="lazy"
                decoding="async"
              />
            ))}
          </Reveal>

          {/* Interactive controls render immediately — never gated behind a
              scroll-triggered reveal, so they're always clickable/focusable. */}
          <div className={styles.tabs} role="tablist" aria-label="Choose a brand">
            {brandFits.map((brand) => (
              <button
                key={brand.id}
                type="button"
                role="tab"
                aria-selected={brand.id === activeId}
                className={`${styles.tab} ${brand.id === activeId ? styles.tabActive : ""}`}
                onClick={() => setActiveId(brand.id)}
                onPointerEnter={() => setActiveId(brand.id)}
              >
                {brand.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
