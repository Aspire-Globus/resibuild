"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./SpeakerStrip.module.css";

export default function SpeakerStrip({ data }) {
  const trackRef = useRef(null);
  const groupRef = useRef(null);
  const frameRef = useRef(null);
  const positionRef = useRef(0);
  const previousTimeRef = useRef(null);
  const pausedRef = useRef(false);

  const [reducedMotion, setReducedMotion] = useState(false);

  const logos = (data?.images || []).filter(
    (item) => typeof item?.image === "string" && item.image.trim()
  );

  const shouldAnimate = logos.length > 1 && !reducedMotion;

  useEffect(() => {
    const media = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const updateMotion = () => {
      setReducedMotion(media.matches);
    };

    updateMotion();

    media.addEventListener?.("change", updateMotion);

    return () => {
      media.removeEventListener?.("change", updateMotion);
    };
  }, []);

  useEffect(() => {
    if (!shouldAnimate) return;

    const track = trackRef.current;
    const group = groupRef.current;

    if (!track || !group) return;

    const speed = 35;

    positionRef.current = 0;
    previousTimeRef.current = null;

    const animate = (timestamp) => {
      if (!track.isConnected || !group.isConnected) {
        return;
      }

      if (previousTimeRef.current === null) {
        previousTimeRef.current = timestamp;
      }

      const delta = Math.min(
        (timestamp - previousTimeRef.current) / 1000,
        0.05
      );

      previousTimeRef.current = timestamp;

      if (!pausedRef.current) {
        const groupWidth = group.getBoundingClientRect().width;

        if (groupWidth > 0) {
          positionRef.current =
            (positionRef.current + speed * delta) % groupWidth;

          track.style.transform =
            `translate3d(-${positionRef.current}px, 0, 0)`;
        }
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }

      frameRef.current = null;
      previousTimeRef.current = null;
      positionRef.current = 0;
      track.style.transform = "";
    };
  }, [shouldAnimate, logos.length]);

  if (!data) return null;

  return (
    <section className={styles["speaker-strip"]}>
      <div className={styles["speaker-strip__inner"]}>

        {/* HEADING */}
        {data.title && (
          <div className={styles["speaker-strip__heading"]}>
            <h3>{data.title}</h3>
          </div>
        )}

        {/* LOGO SLIDER */}
        {logos.length > 0 && (
          <div
            className={styles["speaker-strip__slider"]}
            onMouseEnter={() => {
              pausedRef.current = true;
            }}
            onMouseLeave={() => {
              pausedRef.current = false;
            }}
            onFocusCapture={() => {
              pausedRef.current = true;
            }}
            onBlurCapture={() => {
              pausedRef.current = false;
            }}
          >
            <div
              ref={trackRef}
              className={styles["speaker-strip__track"]}
            >
              {/*
                Repeat logos enough times to fill the
                available viewport and keep the loop smooth.
              */}

              {Array.from({
                length: shouldAnimate ? 4 : 1,
              }).map((_, groupIndex) => (
                <div
                  key={groupIndex}
                  ref={groupIndex === 0 ? groupRef : null}
                  className={styles["speaker-strip__group"]}
                  aria-hidden={groupIndex > 0 ? "true" : undefined}
                >
                  {logos.map((item, index) => (
                    <div
                      className={styles["speaker-logo"]}
                      key={`${groupIndex}-${index}`}
                    >
                      <img
                        src={item.image}
                        alt={
                          groupIndex === 0
                            ? item.alt || `Speaker logo ${index + 1}`
                            : ""
                        }
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}