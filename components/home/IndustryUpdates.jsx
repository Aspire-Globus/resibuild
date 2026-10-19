"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./IndustryUpdates.module.css";

const TRANSITION_DURATION = 700;
const CLONE_COUNT = 3;

export default function IndustryUpdates({ data }) {
  const items = Array.isArray(data?.items) ? data.items : [];
  const totalItems = items.length;

  const canSlide = totalItems > 1;

  const cloneCount = canSlide
    ? Math.min(CLONE_COUNT, totalItems)
    : 0;

  const slides = canSlide
    ? [
        ...items.slice(-cloneCount),
        ...items,
        ...items.slice(0, cloneCount),
      ]
    : items;

  const [currentIndex, setCurrentIndex] = useState(cloneCount);
  const [isAnimating, setIsAnimating] = useState(false);
  const [transitionEnabled, setTransitionEnabled] = useState(true);

  const sliderRef = useRef(null);
  const trackRef = useRef(null);
  const touchStartX = useRef(null);
  const animationLock = useRef(false);

  // Keep index valid when WordPress items change.
  useEffect(() => {
    animationLock.current = false;
    setCurrentIndex(cloneCount);
    setIsAnimating(false);
    setTransitionEnabled(false);
  }, [cloneCount, totalItems]);

  // Restore transitions after an instant position reset.
  useEffect(() => {
    if (transitionEnabled) return;

    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setTransitionEnabled(true);
      });
    });

    return () => cancelAnimationFrame(frame);
  }, [transitionEnabled]);

  function moveSlide(direction) {
    if (!canSlide || animationLock.current) return;

    animationLock.current = true;
    setIsAnimating(true);
    setTransitionEnabled(true);

    setCurrentIndex((prev) => prev + direction);
  }

  function handlePrevious() {
    moveSlide(-1);
  }

  function handleNext() {
    moveSlide(1);
  }

  function handleTransitionEnd(event) {
    if (event.target !== trackRef.current) return;
    if (event.propertyName !== "transform") return;

    if (currentIndex >= totalItems + cloneCount) {
      setTransitionEnabled(false);
      setCurrentIndex(cloneCount);
    } else if (currentIndex < cloneCount) {
      setTransitionEnabled(false);
      setCurrentIndex(totalItems + cloneCount - 1);
    }

    animationLock.current = false;
    setIsAnimating(false);
  }

  function handleTouchStart(event) {
    touchStartX.current = event.touches[0].clientX;
  }

  function handleTouchEnd(event) {
    if (touchStartX.current === null) return;

    const touchEndX = event.changedTouches[0].clientX;
    const difference = touchStartX.current - touchEndX.current;

    if (Math.abs(difference) > 50) {
      if (difference > 0) {
        handleNext();
      } else {
        handlePrevious();
      }
    }

    touchStartX.current = null;
  }

  if (!data) return null;

  return (
    <section
      className={styles["industry-updates"]}
      id="insights"
    >
      <div className={styles["industry-updates__container"]}>
        <div className={styles["industry-updates__layout"]}>

          {/* LEFT CONTENT */}
          <div className={styles["industry-updates__intro"]}>
            {data.heading && <h2>{data.heading}</h2>}

            {data.text && <p>{data.text}</p>}

            <Link
              href={data.linkUrl || "/insights/"}
              className={styles["industry-updates__explore"]}
            >
              {data.linkLabel || "Explore All Blogs"}

              <span aria-hidden="true">⟶</span>
            </Link>
          </div>

          {/* RIGHT SLIDER */}
          <div className={styles["industry-updates__slider"]}>

            <div
              className={styles["industry-updates__viewport"]}
              ref={sliderRef}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div
                ref={trackRef}
                className={styles["industry-updates__cards"]}
                onTransitionEnd={handleTransitionEnd}
                style={{
                  "--slide-index": currentIndex,
                  "--slide-duration": transitionEnabled
                    ? `${TRANSITION_DURATION}ms`
                    : "0ms",
                }}
              >
                {slides.map((item, index) => (
                  <article
                    className={styles["industry-update-card"]}
                    key={`${item.id || index}-${index}`}
                  >

                    {/* IMAGE */}
                    <Link
                      href={item.url || "/insights/"}
                      className={styles["industry-update-card__image"]}
                      tabIndex={
                        index >= cloneCount &&
                        index < cloneCount + totalItems
                          ? 0
                          : -1
                      }
                    >
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.alt || item.title || ""}
                          loading="lazy"
                        />
                      )}
                    </Link>

                    {/* CONTENT */}
                    <div className={styles["industry-update-card__content"]}>

                      {item.title && (
                        <h3>
                          <Link href={item.url || "/insights/"}>
                            {item.title}
                          </Link>
                        </h3>
                      )}

                      {item.excerpt && (
                        <p>{item.excerpt}</p>
                      )}

                      <Link
                        href={item.url || "/insights/"}
                        className={styles["industry-update-card__readmore"]}
                      >
                        {item.linkLabel || "Read More"}

                        <span aria-hidden="true">⟶</span>
                      </Link>

                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* NAVIGATION */}
            <div className={styles["industry-updates__controls"]}>
              <button
                type="button"
                onClick={handlePrevious}
                aria-label="Previous insights"
                disabled={!canSlide || isAnimating}
              >
                ‹
              </button>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Next insights"
                disabled={!canSlide || isAnimating}
              >
                ›
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}