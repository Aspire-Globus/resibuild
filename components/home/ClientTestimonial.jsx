"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./ClientTestimonial.module.css";

const AUTOPLAY_DELAY = 7000;
const ANIMATION_DURATION = 850;
const SWIPE_THRESHOLD = 60;

export default function ClientTestimonial({
  items = [],
  backgroundImage = "",
}) {
  const testimonials = Array.isArray(items) ? items : [];
  const total = testimonials.length;
  const canSlide = total > 1;

  const slides = canSlide
    ? [
        testimonials[total - 1],
        ...testimonials,
        testimonials[0],
      ]
    : testimonials;

  const [currentIndex, setCurrentIndex] = useState(
    canSlide ? 1 : 0
  );

  const [transitionEnabled, setTransitionEnabled] =
    useState(false);

  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  const trackRef = useRef(null);
  const startX = useRef(null);
  const pointerId = useRef(null);

  const animationLock = useRef(false);
  const resetFrame = useRef(null);

  /* RESET SLIDER */

  useEffect(() => {
    animationLock.current = false;

    setCurrentIndex(canSlide ? 1 : 0);
    setTransitionEnabled(false);
    setDragOffset(0);
    setIsDragging(false);

    const frame = requestAnimationFrame(() => {
      resetFrame.current = requestAnimationFrame(() => {
        setTransitionEnabled(true);
      });
    });

    return () => {
      cancelAnimationFrame(frame);

      if (resetFrame.current !== null) {
        cancelAnimationFrame(resetFrame.current);
      }
    };
  }, [total, canSlide]);

  /* SLIDE NAVIGATION */

  function moveSlide(direction) {
    if (!canSlide || animationLock.current) return;

    animationLock.current = true;
    setTransitionEnabled(true);

    setCurrentIndex((prev) => prev + direction);
  }

  /* AUTOPLAY */

  useEffect(() => {
    if (!canSlide || isDragging) return;

    const timer = setInterval(() => {
      if (!animationLock.current) {
        animationLock.current = true;
        setTransitionEnabled(true);
        setCurrentIndex((prev) => prev + 1);
      }
    }, AUTOPLAY_DELAY);

    return () => clearInterval(timer);
  }, [canSlide, isDragging]);

  /* INFINITE LOOP */

  function handleTransitionEnd(event) {
    if (
      event.target !== trackRef.current ||
      event.propertyName !== "transform"
    ) {
      return;
    }

    if (currentIndex === total + 1) {
      setTransitionEnabled(false);
      setCurrentIndex(1);

      resetFrame.current = requestAnimationFrame(() => {
        resetFrame.current = requestAnimationFrame(() => {
          setTransitionEnabled(true);
          animationLock.current = false;
        });
      });

      return;
    }

    if (currentIndex === 0 && canSlide) {
      setTransitionEnabled(false);
      setCurrentIndex(total);

      resetFrame.current = requestAnimationFrame(() => {
        resetFrame.current = requestAnimationFrame(() => {
          setTransitionEnabled(true);
          animationLock.current = false;
        });
      });

      return;
    }

    animationLock.current = false;
  }

  /* POINTER DOWN */

  function handlePointerDown(event) {
    if (!canSlide || animationLock.current) return;

    if (
      event.pointerType === "mouse" &&
      event.button !== 0
    ) {
      return;
    }

    startX.current = event.clientX;
    pointerId.current = event.pointerId;

    setIsDragging(true);
    setTransitionEnabled(false);
    setDragOffset(0);

    event.currentTarget.setPointerCapture(event.pointerId);
  }

  /* POINTER MOVE */

  function handlePointerMove(event) {
    if (
      !isDragging ||
      startX.current === null ||
      pointerId.current !== event.pointerId
    ) {
      return;
    }

    setDragOffset(event.clientX - startX.current);
  }

  /* POINTER UP */

  function handlePointerUp(event) {
    if (
      !isDragging ||
      startX.current === null ||
      pointerId.current !== event.pointerId
    ) {
      return;
    }

    const distance = event.clientX - startX.current;

    startX.current = null;
    pointerId.current = null;

    setIsDragging(false);
    setDragOffset(0);

    if (
      event.currentTarget.hasPointerCapture(event.pointerId)
    ) {
      event.currentTarget.releasePointerCapture(
        event.pointerId
      );
    }

    if (Math.abs(distance) >= SWIPE_THRESHOLD) {
      moveSlide(distance < 0 ? 1 : -1);
    } else {
      setTransitionEnabled(true);
    }
  }

  /* POINTER CANCEL */

  function handlePointerCancel() {
    startX.current = null;
    pointerId.current = null;

    setIsDragging(false);
    setDragOffset(0);
    setTransitionEnabled(true);
  }

  if (!total) return null;

  return (
    <section
      className={styles["client-testimonial"]}
      id="testimonials"
      style={
        backgroundImage
          ? {
              backgroundImage: `url("${backgroundImage}")`,
            }
          : undefined
      }
      aria-label="Client testimonials"
    >
      {/* STATIC BACKGROUND OVERLAY */}
      <div
        className={styles["client-testimonial__overlay"]}
        aria-hidden="true"
      />

      <div className={styles["client-testimonial__inner"]}>

        {/* OPENING QUOTE */}
        <span
          className={styles["client-testimonial__quote-mark"]}
          aria-hidden="true"
        >
          “
        </span>

        {/* HEADING */}
        <h2 className={styles["client-testimonial__heading"]}>
          What Our Client Says About Us!
        </h2>

        {/* SLIDER */}
        <div
          className={[
            styles["client-testimonial__viewport"],
            isDragging ? styles["is-dragging"] : "",
          ].join(" ")}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
        >
          <div
            ref={trackRef}
            className={styles["client-testimonial__track"]}
            onTransitionEnd={handleTransitionEnd}
            style={{
              transform: `translate3d(calc(-${
                currentIndex * 100
              }% + ${dragOffset}px), 0, 0)`,

              transitionDuration: transitionEnabled
                ? `${ANIMATION_DURATION}ms`
                : "0ms",
            }}
          >
            {slides.map((item, index) => (
              <div
                className={styles["client-testimonial__slide"]}
                key={`${item.id || index}-${index}`}
              >
                <div
                  className={styles["client-testimonial__content"]}
                >
                  {item.quote && (
                    <blockquote>{item.quote}</blockquote>
                  )}

                  {item.author && (
                    <div
                      className={styles["client-testimonial__author"]}
                    >
                      <strong>{item.author}</strong>

                      {item.role && (
                        <span>{item.role}</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CLOSING QUOTE */}
        <span
          className={styles["client-testimonial__end-quote"]}
          aria-hidden="true"
        >
          ”
        </span>
      </div>
    </section>
  );
}