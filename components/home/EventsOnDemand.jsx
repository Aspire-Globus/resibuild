"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import styles from "./EventsOnDemand.module.css";

const SKELETON_DURATION = 350;
const SKELETON_COUNT = 4;

function EventsOnDemandSkeleton() {
  return (
    <div
      className={styles["events-demand__skeleton"]}
      role="status"
      aria-live="polite"
      aria-label="Loading events"
    >
      <span className={styles["events-demand__sr-only"]}>
        Loading events...
      </span>

      <div className={styles["events-demand__grid"]}>
        {Array.from({ length: SKELETON_COUNT }).map(
          (_, index) => (
            <article
              key={index}
              className={styles["events-demand__skeleton-card"]}
              aria-hidden="true"
            >
              <div
                className={styles["events-demand__skeleton-image"]}
              >
                <div
                  className={styles["events-demand__skeleton-content"]}
                >
                  <div
                    className={styles["events-demand__skeleton-title"]}
                  />

                  <div
                    className={styles["events-demand__skeleton-title-short"]}
                  />
                </div>
              </div>
            </article>
          )
        )}
      </div>
    </div>
  );
}

export default function EventsOnDemand({
  data,
  loading = false,
}) {
  const [selectedCategory, setSelectedCategory] =
    useState("all");

  const [isInitialLoading, setIsInitialLoading] =
    useState(true);

  const [isFiltering, setIsFiltering] =
    useState(false);

  const initialTimerRef = useRef(null);
  const filterTimerRef = useRef(null);

  const items = Array.isArray(data?.items)
    ? data.items
    : [];

  const categories = useMemo(() => {
    return [
      ...new Map(
        items
          .flatMap((item) => item.categories || [])
          .filter((category) => category?.slug)
          .map((category) => [
            category.slug,
            category,
          ])
      ).values(),
    ];
  }, [items]);

  const filteredItems = useMemo(() => {
  const filtered =
    selectedCategory === "all"
      ? items
      : items.filter((item) =>
          item.categories?.some(
            (category) =>
              category.slug === selectedCategory
          )
        );

  return filtered.slice(0, 4);
}, [items, selectedCategory]);

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
      if (filterTimerRef.current) {
        clearTimeout(filterTimerRef.current);
      }
    };
  }, []);

  const handleCategoryChange = (category) => {
    if (
      category === selectedCategory ||
      loading ||
      isInitialLoading ||
      isFiltering
    ) {
      return;
    }

    if (filterTimerRef.current) {
      clearTimeout(filterTimerRef.current);
    }

    setSelectedCategory(category);
    setIsFiltering(true);

    filterTimerRef.current = setTimeout(() => {
      setIsFiltering(false);
      filterTimerRef.current = null;
    }, SKELETON_DURATION);
  };

  const showSkeleton =
    loading || isInitialLoading || isFiltering;

  if (!data && !showSkeleton) {
    return null;
  }

  return (
    <section
      className={styles["events-demand"]}
      aria-busy={showSkeleton}
    >
      <div className={styles["events-demand__container"]}>
        <div className={styles["events-demand__top"]}>
          <div className={styles["events-demand__heading"]}>
            <h2>
              {data?.headingPrefix && (
                <span
                  className={styles["events-demand__prefix"]}
                >
                  {data.headingPrefix}
                </span>
              )}

              {data?.headingPrefix &&
                data?.heading &&
                " - "}

              {data?.heading}
            </h2>
          </div>

          <div className={styles["events-demand__filter"]}>
            <select
              value={selectedCategory}
              onChange={(e) =>
                handleCategoryChange(e.target.value)
              }
              disabled={showSkeleton}
              aria-label="Filter events by category"
            >
              <option value="all">
                Filter By Topic
              </option>

              {categories.map((category) => (
                <option
                  key={category.slug}
                  value={category.slug}
                >
                  {category.name}
                </option>
              ))}
            </select>

            <span
              className={
                styles["events-demand__filter-arrow"]
              }
              aria-hidden="true"
            />
          </div>
        </div>

        {showSkeleton ? (
          <EventsOnDemandSkeleton />
        ) : filteredItems.length > 0 ? (
          <div className={styles["events-demand__grid"]}>
            {filteredItems.map((item, index) => (
              <article
                className={styles["event-demand-card"]}
                key={item.id || index}
              >
                <Link
                  href={item.url || "/events/"}
                  className={
                    styles["event-demand-card__link"]
                  }
                >
                  {item.image && (
                    <img
                      src={item.image}
                      alt={
                        item.alt ||
                        item.title ||
                        ""
                      }
                      className={
                        styles["event-demand-card__image"]
                      }
                      loading="lazy"
                    />
                  )}

                  <div
                    className={
                      styles["event-demand-card__overlay"]
                    }
                    aria-hidden="true"
                  />

                  <div
                    className={
                      styles["event-demand-card__content"]
                    }
                  >
                    {item.title && (
                      <h3>{item.title}</h3>
                    )}
                  </div>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className={styles["events-demand__empty"]}>
            <p>No events found.</p>
          </div>
        )}

        <div className={styles["events-demand__bottom"]}>
          <Link
            href={data?.buttonUrl || "/events/"}
            className={styles["events-demand__button"]}
          >
            {data?.buttonLabel || "Find Out More"}
          </Link>
        </div>
      </div>
    </section>
  );
}