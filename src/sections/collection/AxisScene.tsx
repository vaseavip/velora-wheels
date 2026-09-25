import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { WheelModel } from "../../data/wheels";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { ease, scrub, pinnedChapterVh } from "../../animations/motionConfig";
import textStyles from "../../components/TextReveal.module.css";
import styles from "./AxisScene.module.css";

gsap.registerPlugin(ScrollTrigger);

interface AxisSceneProps {
  wheel: WheelModel;
}

/**
 * The Collection's flagship moment: Axis rolls in from off-screen right,
 * settles center, then rolls out left as the user keeps scrolling — one
 * continuous pinned, scroll-scrubbed timeline (reversible both ways).
 * Rotation is derived from actual travel distance / wheel radius, so it
 * reads as a wheel physically rolling rather than an arbitrary spin.
 */
export function AxisScene({ wheel }: AxisSceneProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const wheelWrapRef = useRef<HTMLDivElement | null>(null);
  const eyebrowRef = useRef<HTMLParagraphElement | null>(null);
  const titleLine1Ref = useRef<HTMLSpanElement | null>(null);
  const titleLine2Ref = useRef<HTMLSpanElement | null>(null);
  const descRef = useRef<HTMLParagraphElement | null>(null);
  const specsRef = useRef<HTMLParagraphElement | null>(null);

  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    if (reduced) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 900px)", () => {
      const ctx = gsap.context(() => {
        const wheelEl = wheelWrapRef.current;
        const stageEl = stageRef.current;
        if (!wheelEl || !stageEl) return;

        const radius = Math.max(wheelEl.getBoundingClientRect().width * 0.45, 1);
        const travel = stageEl.getBoundingClientRect().width * 0.9 + radius;
        const rollDeg = (travel / radius) * (180 / Math.PI) * -1;

        const textEls = [eyebrowRef.current, titleLine1Ref.current, titleLine2Ref.current, descRef.current, specsRef.current];

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: scrub.pinned,
            pin: pinRef.current,
          },
        });

        // Roll in from the right, physically rotating with the distance travelled.
        tl.fromTo(
          wheelEl,
          { x: travel, rotate: 0 },
          { x: 0, rotate: rollDeg, duration: 0.42, ease: "power2.out" },
          0,
        ).fromTo(
          wheelEl,
          { scale: 0.86, autoAlpha: 0.55, filter: "blur(3px)" },
          { scale: 1, autoAlpha: 1, filter: "blur(0px)", duration: 0.46, ease: ease.settle },
          0,
        );

        // Text arrives staggered while the wheel settles.
        tl.fromTo(eyebrowRef.current, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.08 }, 0.26)
          .fromTo(
            titleLine1Ref.current,
            { autoAlpha: 0, yPercent: 100, filter: "blur(7px)" },
            { autoAlpha: 1, yPercent: 0, filter: "blur(0px)", duration: 0.12 },
            0.3,
          )
          .fromTo(
            titleLine2Ref.current,
            { autoAlpha: 0, yPercent: 100, filter: "blur(7px)" },
            { autoAlpha: 1, yPercent: 0, filter: "blur(0px)", duration: 0.12 },
            0.35,
          )
          .fromTo(descRef.current, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.1 }, 0.42)
          .fromTo(specsRef.current, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.1 }, 0.46);

        // Hold roughly 0.56–0.64 — a deliberate pause, nothing animates.

        // Roll out to the left, continuing the same rotational direction/speed.
        tl.to(wheelEl, { x: -travel, rotate: rollDeg * 2, duration: 0.34, ease: "power1.in" }, 0.66).to(
          wheelEl,
          { autoAlpha: 0.3, scale: 0.9, filter: "blur(5px)", duration: 0.34, ease: "power1.in" },
          0.66,
        );

        tl.to(textEls, { autoAlpha: 0, y: -16, duration: 0.14 }, 0.62);
      }, wrapperRef);

      return () => ctx.revert();
    });

    mm.add("(max-width: 899px)", () => {
      const ctx = gsap.context(() => {
        gsap.set(pinRef.current, { position: "relative" });
        gsap.set(
          [eyebrowRef.current, titleLine1Ref.current, titleLine2Ref.current, descRef.current, specsRef.current],
          { autoAlpha: 1, y: 0, yPercent: 0, filter: "blur(0px)" },
        );

        gsap.fromTo(
          wheelWrapRef.current,
          { autoAlpha: 0, scale: 0.92, y: 24 },
          {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            duration: 0.9,
            ease: ease.soft,
            scrollTrigger: { trigger: wrapperRef.current, start: "top 82%", once: true },
          },
        );
      }, wrapperRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, [reduced]);

  return (
    <div
      className={styles.wrapper}
      ref={wrapperRef}
      style={{ ["--axis-vh" as string]: `${pinnedChapterVh.axis}vh` }}
    >
      <article className={styles.pin} ref={pinRef} aria-label={`${wheel.name}, ${wheel.size} wheel in ${wheel.finish}`}>
        <div className={styles.textBlock}>
          <p className={`eyebrow ${styles.eyebrow}`} ref={eyebrowRef}>
            The flagship
          </p>
          <h3 className={styles.name}>
            <span className={textStyles.lineMask}>
              <span className={textStyles.lineInner} ref={titleLine1Ref}>
                VELORA
              </span>
            </span>
            <span className={textStyles.lineMask}>
              <span className={textStyles.lineInner} ref={titleLine2Ref}>
                AXIS
              </span>
            </span>
          </h3>
          <p className={styles.desc} ref={descRef}>
            {wheel.description}
          </p>
          <p className={styles.specs} ref={specsRef}>
            {wheel.size} &middot; {wheel.finish}
          </p>
        </div>

        <div className={styles.stage} ref={stageRef}>
          <div className={styles.wheelWrap} ref={wheelWrapRef}>
            <img
              src={wheel.image}
              alt={wheel.imageAlt}
              className={`${styles.image} photo`}
              width={wheel.imageWidth}
              height={wheel.imageHeight}
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </div>
        </div>
      </article>
    </div>
  );
}
