"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./EventsArchiveGrid.module.css";

const EVENTS_PER_PAGE = 12;
const SKELETON_DURATION = 350;

export function EventsSkeleton() {
  return (
    <div
      className={styles["events-skeleton"]}
      role="status"
      aria-live="polite"
      aria-label="Loading events"
    >
      <span className={styles["events-skeleton__sr-only"]}>
        Loading events...
      </span>

      <div className={styles["events-archive__grid"]}>
        {Array.from({ length: EVENTS_PER_PAGE }).map((_, index) => (
          <article
            key={index}
            className={styles["events-skeleton__card"]}
            aria-hidden="true"
          >
            <div className={styles["events-skeleton__image"]} />

            <div className={styles["events-skeleton__content"]}>
              <div
                className={`${styles["events-skeleton__line"]} ${styles["events-skeleton__title"]}`}
              />

              <div
                className={`${styles["events-skeleton__line"]} ${styles["events-skeleton__title-short"]}`}
              />

              <div
                className={`${styles["events-skeleton__line"]} ${styles["events-skeleton__text"]}`}
              />

              <div
                className={`${styles["events-skeleton__line"]} ${styles["events-skeleton__text"]}`}
              />

              <div
                className={`${styles["events-skeleton__line"]} ${styles["events-skeleton__text-short"]}`}
              />

              <div
                className={`${styles["events-skeleton__line"]} ${styles["events-skeleton__read-more"]}`}
              />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default function EventsArchiveGrid({
  title = "",
  events = [],
  loading = false,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isPaginating, setIsPaginating] = useState(false);

  const sectionRef = useRef(null);
  const initialTimerRef = useRef(null);
  const paginationTimerRef = useRef(null);

  const eventItems = Array.isArray(events) ? events : [];

  const totalPages = Math.max(
    1,
    Math.ceil(eventItems.length / EVENTS_PER_PAGE)
  );

  const activePage = Math.min(currentPage, totalPages);

  useEffect(() => {
    initialTimerRef.current = setTimeout(() => {
      setIsInitialLoading(false);
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

  const currentEvents = useMemo(() => {
    const start = (activePage - 1) * EVENTS_PER_PAGE;

    return eventItems.slice(
      start,
      start + EVENTS_PER_PAGE
    );
  }, [eventItems, activePage]);

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

  const getPageNumbers = () => {
    if (totalPages <= 7) {
      return Array.from(
        { length: totalPages },
        (_, index) => index + 1
      );
    }

    if (activePage <= 4) {
      return [1, 2, 3, 4, 5, "...", totalPages];
    }

    if (activePage >= totalPages - 3) {
      return [
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      1,
      "...",
      activePage - 1,
      activePage,
      activePage + 1,
      "...",
      totalPages,
    ];
  };

  const showSkeleton =
    loading || isInitialLoading || isPaginating;

  if (!eventItems.length && !showSkeleton) {
    return null;
  }

  return (
    <section
      ref={sectionRef}
      className={styles["events-archive"]}
      id="events-archive"
      aria-busy={showSkeleton}
    >
      <div className={styles["events-archive__container"]}>
        {title && (
          <div className={styles["events-archive__heading"]}>
            <h2
              dangerouslySetInnerHTML={{
                __html: title,
              }}
            />
          </div>
        )}

        {showSkeleton ? (
          <EventsSkeleton />
        ) : (
          <div className={styles["events-archive__grid"]}>
            {currentEvents.map((event, index) => (
              <article
                className={styles["events-archive__card"]}
                key={event.id ?? `${activePage}-${index}`}
              >
                <Link
                  href={event.url || "#"}
                  className={styles["events-archive__image"]}
                  aria-label={event.title || "View event"}
                >
                  {event.image ? (
                    <img
                      src={event.image}
                      alt={
                        event.imageAlt ||
                        event.title ||
                        ""
                      }
                      loading="lazy"
                    />
                  ) : (
                    <div
                      className={
                        styles["events-archive__placeholder"]
                      }
                    >
                      Resibuild
                    </div>
                  )}
                </Link>

                <div className={styles["events-archive__content"]}>
                  {event.title && (
                    <h3 className={styles["events-archive__title"]}>
                      <Link href={event.url || "#"}>
                        {event.title}
                      </Link>
                    </h3>
                  )}

                  {event.excerpt && (
                    <p className={styles["events-archive__excerpt"]}>
                      {event.excerpt}
                    </p>
                  )}

                  <Link
                    href={event.url || "#"}
                    className={styles["events-archive__read-more"]}
                  >
                    <span>Read More</span>

                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M5 12H19M13 6L19 12L13 18"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <nav
            className={styles["events-pagination"]}
            aria-label="Events pagination"
          >
            <button
              type="button"
              className={styles["events-pagination__button"]}
              disabled={activePage === 1 || showSkeleton}
              onClick={() => changePage(activePage - 1)}
              aria-label="Previous page"
            >
              ‹
            </button>

            {getPageNumbers().map((page, index) =>
              page === "..." ? (
                <span
                  className={styles["events-pagination__dots"]}
                  key={`dots-${index}`}
                  aria-hidden="true"
                >
                  ...
                </span>
              ) : (
                <button
                  type="button"
                  key={page}
                  onClick={() => changePage(page)}
                  disabled={showSkeleton}
                  aria-label={`Go to page ${page}`}
                  aria-current={
                    activePage === page
                      ? "page"
                      : undefined
                  }
                  className={[
                    styles["events-pagination__number"],
                    activePage === page
                      ? styles["events-pagination__number--active"]
                      : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {page}
                </button>
              )
            )}

            <button
              type="button"
              className={styles["events-pagination__button"]}
              disabled={activePage === totalPages || showSkeleton}
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