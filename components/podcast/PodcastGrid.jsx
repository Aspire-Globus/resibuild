"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./PodcastGrid.module.css";

const ITEMS_PER_PAGE = 4;
const SKELETON_DURATION = 350;

function PodcastSkeleton() {
  return (
    <div
      className={styles["podcast-skeleton"]}
      role="status"
      aria-live="polite"
      aria-label="Loading podcasts"
    >
      <span className={styles["podcast-skeleton__sr-only"]}>
        Loading podcasts...
      </span>

      <div className={styles["podcast-skeleton__grid"]}>
        {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
          <div
            key={index}
            className={styles["podcast-skeleton__card"]}
            aria-hidden="true"
          >
            <div className={styles["podcast-skeleton__image"]}>
              <div className={styles["podcast-skeleton__content"]}>
                <div
                  className={[
                    styles["podcast-skeleton__line"],
                    styles["podcast-skeleton__title"],
                  ].join(" ")}
                />

                <div
                  className={[
                    styles["podcast-skeleton__line"],
                    styles["podcast-skeleton__title-short"],
                  ].join(" ")}
                />

                <div
                  className={[
                    styles["podcast-skeleton__line"],
                    styles["podcast-skeleton__excerpt"],
                  ].join(" ")}
                />

                <div
                  className={[
                    styles["podcast-skeleton__line"],
                    styles["podcast-skeleton__excerpt-short"],
                  ].join(" ")}
                />

                <div
                  className={styles["podcast-skeleton__button"]}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PodcastGrid({
  podcasts = [],
  heading = "The Resibuild Podcast - Finding inspiration in every turn",
  buttonText = "Find Out More",
  buttonUrl = "/podcasts/",
  loading = false,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isPaginating, setIsPaginating] = useState(false);

  const sectionRef = useRef(null);
  const initialTimerRef = useRef(null);
  const paginationTimerRef = useRef(null);

  const validPodcasts = Array.isArray(podcasts)
    ? podcasts
    : [];

  const totalPages = Math.ceil(
    validPodcasts.length / ITEMS_PER_PAGE
  );

  const activePage = Math.min(
    currentPage,
    Math.max(totalPages, 1)
  );

  const currentItems = useMemo(() => {
    const start = (activePage - 1) * ITEMS_PER_PAGE;

    return validPodcasts.slice(
      start,
      start + ITEMS_PER_PAGE
    );
  }, [activePage, validPodcasts]);

  useEffect(() => {
    initialTimerRef.current = setTimeout(() => {
      setIsInitialLoading(false);
      initialTimerRef.current = null;
    }, SKELETON_DURATION);

    return () => {
      if (initialTimerRef.current) {
        clearTimeout(initialTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    return () => {
      if (paginationTimerRef.current) {
        clearTimeout(paginationTimerRef.current);
      }
    };
  }, []);

  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from(
        { length: totalPages },
        (_, index) => index + 1
      );
    }

    const pages = new Set([
      1,
      totalPages,
      activePage - 1,
      activePage,
      activePage + 1,
    ]);

    const sortedPages = [...pages]
      .filter((page) => page >= 1 && page <= totalPages)
      .sort((a, b) => a - b);

    const result = [];

    sortedPages.forEach((page, index) => {
      if (index > 0) {
        const previous = sortedPages[index - 1];

        if (page - previous === 2) {
          result.push(previous + 1);
        } else if (page - previous > 2) {
          result.push("...");
        }
      }

      result.push(page);
    });

    return result;
  };

  const changePage = (page) => {
    if (
      loading ||
      isInitialLoading ||
      isPaginating ||
      page < 1 ||
      page > totalPages ||
      page === activePage
    ) {
      return;
    }

    if (paginationTimerRef.current) {
      clearTimeout(paginationTimerRef.current);
    }

    setIsPaginating(true);

    sectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    paginationTimerRef.current = setTimeout(() => {
      setCurrentPage(page);
      setIsPaginating(false);
      paginationTimerRef.current = null;
    }, SKELETON_DURATION);
  };

  const showSkeleton =
    loading || isInitialLoading || isPaginating;

  if (!validPodcasts.length && !showSkeleton) {
    return null;
  }

  return (
    <section
      ref={sectionRef}
      className={styles["podcast-listing"]}
      id="podcast-listing"
      aria-busy={showSkeleton}
    >
      <div className={styles["podcast-container"]}>
        <div className={styles["podcast-listing__header"]}>
          <div className={styles["podcast-listing__heading"]}>
            <h2>
              <span>The Resibuild Podcast</span>
              {" - "}
              Finding inspiration in every turn
            </h2>
          </div>

          {buttonText && buttonUrl && (
            <Link
              href={buttonUrl}
              className={styles["podcast-listing__button"]}
            >
              <span>{buttonText}</span>

              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M4 12H20M20 12L14 6M20 12L14 18"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          )}
        </div>

        {showSkeleton ? (
          <PodcastSkeleton />
        ) : (
          <div className={styles["podcast-grid"]}>
            {currentItems.map((podcast, index) => (
              <article
                className={styles["podcast-card"]}
                key={podcast.id ?? index}
              >
                <Link
                  href={podcast.url || "#"}
                  className={styles["podcast-card__image"]}
                  aria-label={`View ${
                    podcast.title || "podcast"
                  }`}
                >
                  {podcast.image ? (
                    <img
                      src={podcast.image}
                      alt={
                        podcast.imageAlt ||
                        podcast.title ||
                        "Podcast"
                      }
                      loading="lazy"
                    />
                  ) : (
                    <div
                      className={
                        styles["podcast-card__placeholder"]
                      }
                    />
                  )}

                  <div
                    className={styles["podcast-card__overlay"]}
                  />

                  <div
                    className={styles["podcast-card__content"]}
                  >
                    {podcast.title && (
                      <h3
                        className={styles["podcast-card__title"]}
                      >
                        {podcast.title}
                      </h3>
                    )}

                    {podcast.excerpt && (
                      <p
                        className={styles["podcast-card__excerpt"]}
                      >
                        {podcast.excerpt}
                      </p>
                    )}

                    <span
                      className={styles["podcast-card__watch"]}
                    >
                      Watch Now

                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M4 12H20M20 12L14 6M20 12L14 18"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <nav
            className={styles["podcast-pagination"]}
            aria-label="Podcast pagination"
          >
            <button
              type="button"
              className={styles["podcast-pagination__arrow"]}
              disabled={activePage === 1 || showSkeleton}
              onClick={() => changePage(activePage - 1)}
              aria-label="Previous page"
            >
              ‹
            </button>

            {getPageNumbers().map((page, index) =>
              page === "..." ? (
                <span
                  key={`dots-${index}`}
                  className={styles["podcast-pagination__dots"]}
                  aria-hidden="true"
                >
                  ...
                </span>
              ) : (
                <button
                  type="button"
                  key={page}
                  className={[
                    styles["podcast-pagination__number"],
                    activePage === page
                      ? styles["podcast-pagination__active"]
                      : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => changePage(page)}
                  disabled={showSkeleton}
                  aria-label={`Go to page ${page}`}
                  aria-current={
                    activePage === page
                      ? "page"
                      : undefined
                  }
                >
                  {page}
                </button>
              )
            )}

            <button
              type="button"
              className={styles["podcast-pagination__arrow"]}
              disabled={
                activePage === totalPages || showSkeleton
              }
              onClick={() => changePage(activePage + 1)}
              aria-label="Next page"
            >
              ›
            </button>
          </nav>
        )}
      </div>
    </section>
  );
}