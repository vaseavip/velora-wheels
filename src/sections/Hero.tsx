import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect } from "react";
import { Button } from "../components/Button";
import { TextReveal } from "../components/TextReveal";
import { usePointerParallax } from "../hooks/usePointerParallax";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { wheels } from "../data/wheels";
import styles from "./Hero.module.css";

gsap.registerPlugin(ScrollTrigger);

const heroWheel = wheels[0];

export function Hero() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const wheelSceneRef = useRef<HTMLDivElement | null>(null);
  const heroImgRef = useRef<HTMLImageElement | null>(null);
  const titleARef = useRef<HTMLDivElement | null>(null);
  const captionPrecisionRef = useRef<HTMLParagraphElement | null>(null);
  const captionMotionRef = useRef<HTMLParagraphElement | null>(null);
  const scrollCueRef = useRef<HTMLDivElement | null>(null);

  const reduced = useReducedMotion();
  const { hostRef, targetRef } = usePointerParallax<HTMLDivElement>({
    maxOffset: 10,
    maxRotate: 2,
    duration: 1.3,
  });

  useLayoutEffect(() => {
    if (reduced) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 900px)", () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            pin: pinRef.current,
          },
        });

        tl.to(scrollCueRef.current, { autoAlpha: 0, duration: 0.08 }, 0)
          .to(titleARef.current, { autoAlpha: 0, y: -60, duration: 0.18 }, 0.06)
          .to(
            wheelSceneRef.current,
            { xPercent: 14, yPercent: -4, scale: 1.05, duration: 0.3, ease: "none" },
            0.06,
          )
          .fromTo(
            captionPrecisionRef.current,
            { autoAlpha: 0, y: 30 },
            { autoAlpha: 1, y: 0, duration: 0.16 },
            0.22,
          )
          .to(captionPrecisionRef.current, { autoAlpha: 0, y: -30, duration: 0.14 }, 0.42)
          .to(
            wheelSceneRef.current,
            { xPercent: -8, yPercent: -8, scale: 1.35, duration: 0.32, ease: "none" },
            0.4,
          )
          .fromTo(
            captionMotionRef.current,
            { autoAlpha: 0, y: 30 },
            { autoAlpha: 1, y: 0, duration: 0.16 },
            0.46,
          )
          .to(captionMotionRef.current, { autoAlpha: 0, y: -30, duration: 0.14 }, 0.66)
          .to(
            wheelSceneRef.current,
            { xPercent: 0, yPercent: 0, scale: 1.6, duration: 0.3, ease: "none" },
            0.68,
          )
          .to(wheelSceneRef.current, { autoAlpha: 0, duration: 0.16 }, 0.92);
      }, wrapperRef);

      return () => ctx.revert();
    });

    mm.add("(max-width: 899px)", () => {
      const ctx = gsap.context(() => {
        gsap.set(pinRef.current, { position: "relative" });
      }, wrapperRef);
      return () => ctx.revert();
    });

    return () => mm.revert();
  }, [reduced]);

  return (
    <section id="home" className={styles.wrapper} ref={wrapperRef} aria-label="Introduction">
      <div className={styles.pin} ref={pinRef}>
        <div className={styles.backdrop} aria-hidden="true" />

        <div className={styles.grid}>
          <div className={styles.copy} ref={titleARef}>
            <p className="eyebrow">Precision in motion</p>
            <TextReveal
              as="h1"
              lines={["Engineered", "to turn heads."]}
              trigger="mount"
              className={styles.title}
              stagger={0.1}
            />
            <p className={styles.subtitle}>
              Premium wheels designed for those who notice the details.
            </p>
            <div className={styles.ctas}>
              <Button href="#collection" variant="solid">
                Explore the Collection
              </Button>
              <Button href="#experience" variant="ghost">
                Watch the Craft
              </Button>
            </div>
          </div>

          <div className={styles.stageArea} ref={hostRef}>
            <div className={styles.scene} ref={wheelSceneRef}>
              <div className={styles.sceneParallax} ref={targetRef}>
                <img
                  ref={heroImgRef}
                  className={`${styles.wheelImg} photo`}
                  src={heroWheel.image}
                  alt={`${heroWheel.name}, ${heroWheel.size} wheel in ${heroWheel.finish}`}
                  width={heroWheel.imageWidth}
                  height={heroWheel.imageHeight}
                  fetchPriority="high"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>

        <p className={styles.storyCaption} ref={captionPrecisionRef}>
          Precision.
        </p>
        <p className={styles.storyCaption} ref={captionMotionRef}>
          Engineered for motion.
        </p>

        <div className={styles.scrollCue} ref={scrollCueRef} aria-hidden="true">
          <span />
          <small>Scroll</small>
        </div>
      </div>
    </section>
  );
}
