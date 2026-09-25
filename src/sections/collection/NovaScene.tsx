import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { WheelModel } from "../../data/wheels";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { ease, scrub, pinnedChapterVh } from "../../animations/motionConfig";
import textStyles from "../../components/TextReveal.module.css";
import styles from "./NovaScene.module.css";

gsap.registerPlugin(ScrollTrigger);

interface NovaSceneProps {
  wheel: WheelModel;
}

/**
 * The Collection's closing chapter: a slow cinematic zoom-in with a soft
 * halo, a held "perfect position" moment, then a slow zoom-out that fades
 * the whole scene — preparing the handoff into Brand Experience next.
 */
export function NovaScene({ wheel }: NovaSceneProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const haloRef = useRef<HTMLDivElement | null>(null);
  const wheelWrapRef = useRef<HTMLDivElement | null>(null);
  const eyebrowRef = useRef<HTMLParagraphElement | null>(null);
  const titleRef = useRef<HTMLSpanElement | null>(null);
  const descRef = useRef<HTMLParagraphElement | null>(null);

  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    if (reduced) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 900px)", () => {
      const ctx = gsap.context(() => {
        const textEls = [eyebrowRef.current, titleRef.current, descRef.current];

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: scrub.pinned,
            pin: pinRef.current,
          },
        });

        tl.fromTo(
          wheelWrapRef.current,
          { scale: 0.8, autoAlpha: 0, rotate: 0, filter: "blur(6px)" },
          { scale: 1.04, autoAlpha: 1, rotate: 7, filter: "blur(0px)", duration: 0.4, ease: "power2.out" },
          0,
        )
          .fromTo(haloRef.current, { autoAlpha: 0 }, { autoAlpha: 0.3, duration: 0.32 }, 0.1)
          .fromTo(textEls, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.14, stagger: 0.05 }, 0.2);

        // Hold roughly 0.44–0.6 at the "perfect position".

        tl.to(wheelWrapRef.current, { scale: 0.7, autoAlpha: 0, y: -50, rotate: 14, duration: 0.4, ease: "power1.in" }, 0.62)
          .to(haloRef.current, { autoAlpha: 0, duration: 0.3 }, 0.6)
          .to(textEls, { autoAlpha: 0, y: -18, duration: 0.26 }, 0.58);
      }, wrapperRef);

      return () => ctx.revert();
    });

    mm.add("(max-width: 899px)", () => {
      const ctx = gsap.context(() => {
        gsap.set(pinRef.current, { position: "relative" });
        gsap.set([eyebrowRef.current, titleRef.current, descRef.current], { autoAlpha: 1, y: 0 });
        gsap.set(haloRef.current, { autoAlpha: 0.2 });

        gsap.fromTo(
          wheelWrapRef.current,
          { autoAlpha: 0, scale: 0.9, filter: "blur(4px)" },
          {
            autoAlpha: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.9,
            ease: ease.soft,
            scrollTrigger: { trigger: wrapperRef.current, start: "top 80%", once: true },
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
      style={{ ["--nova-vh" as string]: `${pinnedChapterVh.nova}vh` }}
    >
      <article className={styles.pin} ref={pinRef} aria-label={`${wheel.name}, ${wheel.size} wheel in ${wheel.finish}`}>
        <div className={styles.halo} ref={haloRef} aria-hidden="true" />

        <div className={styles.textBlock}>
          <p className={`eyebrow ${styles.eyebrow}`} ref={eyebrowRef}>
            Closing the collection
          </p>
          <h3 className={styles.name}>
            <span className={textStyles.lineMask}>
              <span className={textStyles.lineInner} ref={titleRef}>
                {wheel.name}
              </span>
            </span>
          </h3>
          <p className={styles.desc} ref={descRef}>
            {wheel.description}
          </p>
        </div>

        <div className={styles.stage}>
          <div className={styles.wheelWrap} ref={wheelWrapRef}>
            <img
              src={wheel.image}
              alt={wheel.imageAlt}
              className={`${styles.image} photo`}
              width={wheel.imageWidth}
              height={wheel.imageHeight}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </article>
    </div>
  );
}
