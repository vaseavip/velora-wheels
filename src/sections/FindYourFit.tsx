import { useState } from "react";
import { brandFits } from "../data/fit";
import { TextReveal } from "../components/TextReveal";
import styles from "./FindYourFit.module.css";

export function FindYourFit() {
  const [activeId, setActiveId] = useState(brandFits[0].id);

  return (
    <section className={styles.section} aria-labelledby="fit-heading">
      <div className="container">
        <div className={styles.intro}>
          <TextReveal as="p" variant="eyebrow" lines={["Find your fit"]} className="eyebrow" />
          <TextReveal as="h2" id="fit-heading" lines={["The right fit for every stance."]} className={styles.heading} />
        </div>

        <div className={styles.stage}>
          {/* Plain div, not a scroll-triggered Reveal: this is the section's
              primary content, so it must never depend on a scroll animation
              firing to become visible. */}
          <div className={styles.imageArea}>
            {brandFits.map((brand, index) => (
              <img
                key={brand.id}
                src={brand.image}
                alt={brand.imageAlt}
                className={`${styles.image} photo ${brand.id === activeId ? styles.imageActive : ""}`}
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
              />
            ))}
          </div>

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
