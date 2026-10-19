"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./InspirationNews.module.css";

const ANIMATION_DURATION = 750;
const CLONE_COUNT = 3;

export default function InspirationNews({ data }) {
  const items = Array.isArray(data?.items) ? data.items : [];
  const totalItems = items.length;

  const [visibleCount, setVisibleCount] = useState(3);
  const [currentIndex, setCurrentIndex] = useState(CLONE_COUNT);
  const [transitionEnabled, setTransitionEnabled] = useState(false);

  const trackRef = useRef(null);
  const isAnimating = useRef(false);
  const touchStartX = useRef(null);

  const canSlide = totalItems > 1;

  /*
   * Clone enough items to support the
   * maximum visible cards at each end.
   */
  const cloneCount = canSlide
    ? Math.max(3, visibleCount)
    : 0;

  const getWrappedItem = (index) => {
    return items[((index % totalItems) + totalItems) % totalItems];
  };

  const slides = canSlide
    ? [
        ...Array.from(
          { length: cloneCount },
          (_, index) =>
            getWrappedItem(totalItems - cloneCount + index)
        ),
        ...items,
        ...Array.from(
          { length: cloneCount },
          (_, index) => getWrappedItem(index)
        ),
      ]
    : items;

  /* =====================================
     RESPONSIVE COUNT
  ===================================== */

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 480px)");
    const tablet = window.matchMedia(
      "(min-width: 481px) and (max-width: 767px)"
    );

    const updateCount = () => {
      const count = mobile.matches
        ? 1
        : tablet.matches
        ? 2
        : 3;

      setVisibleCount(count);
    };

    updateCount();

    mobile.addEventListener("change", updateCount);
    tablet.addEventListener("change", updateCount);

    return () => {
      mobile.removeEventListener("change", updateCount);
      tablet.removeEventListener("change", updateCount);
    };
  }, []);

  /* =====================================
     RESET WHEN DATA / BREAKPOINT CHANGES
  ===================================== */

  useEffect(() => {
    isAnimating.current = false;
    setTransitionEnabled(false);
    setCurrentIndex(cloneCount);

    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setTransitionEnabled(true);
      });
    });

    return () => cancelAnimationFrame(frame);
  }, [cloneCount, totalItems, visibleCount]);

  /* =====================================
     NEXT / PREVIOUS
  ===================================== */

  function move(direction) {
    if (!canSlide || isAnimating.current) return;

    isAnimating.current = true;
    setTransitionEnabled(true);

    setCurrentIndex((previous) => previous + direction);
  }

  function handleNext() {
    move(1);
  }

  function handlePrevious() {
    move(-1);
  }

  /* =====================================
     SEAMLESS LOOP RESET
  ===================================== */

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

    isAnimating.current = false;
  }

  /* =====================================
     TOUCH SWIPE
  ===================================== */

  function handleTouchStart(event) {
    touchStartX.current = event.touches[0].clientX;
  }

  function handleTouchEnd(event) {
    if (touchStartX.current === null) return;

    const difference =
      touchStartX.current -
      event.changedTouches[0].clientX;

    if (Math.abs(difference) > 50) {
      move(difference > 0 ? 1 : -1);
    }

    touchStartX.current = null;
  }

  if (!data) return null;

  return (
    <section className={styles["inspiration-news"]}>
      <div className={styles["inspiration-news__container"]}>

        {/* HEADER */}

        <div className={styles["inspiration-news__header"]}>
          {data.heading && (
            <h2 className={styles["inspiration-news__heading"]}>
              {data.heading}
            </h2>
          )}

          <div className={styles["inspiration-news__controls"]}>
            <button
              type="button"
              onClick={handlePrevious}
              disabled={!canSlide}
              aria-label="Previous podcasts"
            >
              <span aria-hidden="true">‹</span>
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={!canSlide}
              aria-label="Next podcasts"
            >
              <span aria-hidden="true">›</span>
            </button>
          </div>
        </div>

        {/* SLIDER */}

        <div
          className={styles["inspiration-news__viewport"]}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            ref={trackRef}
            className={styles["inspiration-news__grid"]}
            onTransitionEnd={handleTransitionEnd}
            style={{
              "--slide-index": currentIndex,
              "--slide-duration": transitionEnabled
                ? `${ANIMATION_DURATION}ms`
                : "0ms",
            }}
          >
            {slides.map((item, index) => (
              <article
                className={styles["inspiration-news-card"]}
                key={`${item.id || index}-${index}`}
              >
                {item.title && (
                  <h3 className={styles["inspiration-news-card__title"]}>
                    {item.url ? (
                      <Link href={item.url}>{item.title}</Link>
                    ) : (
                      item.title
                    )}
                  </h3>
                )}

                {item.excerpt && (
                  <p className={styles["inspiration-news-card__excerpt"]}>
                    {item.excerpt}
                  </p>
                )}

                {item.url && (
                  <Link
                    href={item.url}
                    className={styles["inspiration-news-card__link"]}
                  >
                    <span>{item.linkLabel || "Read More"}</span>
                    <span
                      className={styles["inspiration-news-card__arrow"]}
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </Link>
                )}
              </article>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}