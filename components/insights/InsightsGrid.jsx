"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import styles from "./InsightsGrid.module.css";

const SKELETON_DURATION = 350;

function decodeHtml(value = "") {
  return String(value)
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&");
}

function ArrowIcon() {
  return (
    <svg
      width="24"
      height="16"
      viewBox="0 0 24 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M1 8H22M16 2L22 8L16 14"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ReadMore({ url = "#" }) {
  return (
    <Link
      href={url}
      className={styles["insight-read-more"]}
    >
      <span>Read More</span>
      <ArrowIcon />
    </Link>
  );
}

function FeaturedCard({ item }) {
  if (!item) return null;

  return (
    <article className={styles["insight-featured-card"]}>
      <Link
        href={item.url || "#"}
        className={styles["insight-featured-card__image"]}
        aria-label={item.title || "View insight"}
      >
        {item.image ? (
          <img
            src={item.image}
            alt={item.imageAlt || item.title || ""}
            loading="lazy"
          />
        ) : (
          <div className={styles["insight-card__placeholder"]}>
            Resibuild
          </div>
        )}
      </Link>

      <div className={styles["insight-featured-card__content"]}>
        {item.title && (
          <h3 className={styles["insight-featured-card__title"]}>
            <Link href={item.url || "#"}>
              {item.title}
            </Link>
          </h3>
        )}

        {item.excerpt && (
          <p className={styles["insight-featured-card__excerpt"]}>
            {item.excerpt}
          </p>
        )}

        <ReadMore url={item.url || "#"} />
      </div>
    </article>
  );
}

function SmallInsightCard({ item }) {
  if (!item) return null;

  return (
    <article className={styles["insight-small-card"]}>
      <Link
        href={item.url || "#"}
        className={styles["insight-small-card__image"]}
        aria-label={item.title || "View insight"}
      >
        {item.image ? (
          <img
            src={item.image}
            alt={item.imageAlt || item.title || ""}
            loading="lazy"
          />
        ) : (
          <div className={styles["insight-card__placeholder"]}>
            Resibuild
          </div>
        )}
      </Link>

      <div className={styles["insight-small-card__content"]}>
        {item.title && (
          <h3 className={styles["insight-small-card__title"]}>
            <Link href={item.url || "#"}>
              {item.title}
            </Link>
          </h3>
        )}

        {item.excerpt && (
          <p className={styles["insight-small-card__excerpt"]}>
            {item.excerpt}
          </p>
        )}

        <ReadMore url={item.url || "#"} />
      </div>
    </article>
  );
}

function SkeletonLine({ className = "" }) {
  return (
    <div
      className={[
        styles["insights-skeleton__line"],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
}

function FeaturedCardSkeleton() {
  return (
    <article
      className={styles["insights-skeleton__featured"]}
      aria-hidden="true"
    >
      <div
        className={styles["insights-skeleton__featured-image"]}
      />

      <div
        className={styles["insights-skeleton__featured-content"]}
      >
        <SkeletonLine
          className={styles["insights-skeleton__featured-title"]}
        />

        <SkeletonLine
          className={styles["insights-skeleton__featured-title-short"]}
        />

        <SkeletonLine
          className={styles["insights-skeleton__text"]}
        />

        <SkeletonLine
          className={styles["insights-skeleton__text"]}
        />

        <SkeletonLine
          className={styles["insights-skeleton__text-short"]}
        />

        <SkeletonLine
          className={styles["insights-skeleton__read-more"]}
        />
      </div>
    </article>
  );
}

function SmallCardSkeleton() {
  return (
    <article
      className={styles["insights-skeleton__small"]}
      aria-hidden="true"
    >
      <div
        className={styles["insights-skeleton__small-image"]}
      />

      <div
        className={styles["insights-skeleton__small-content"]}
      >
        <SkeletonLine
          className={styles["insights-skeleton__small-title"]}
        />

        <SkeletonLine
          className={styles["insights-skeleton__small-title-short"]}
        />

        <SkeletonLine
          className={styles["insights-skeleton__small-text"]}
        />

        <SkeletonLine
          className={styles["insights-skeleton__small-read-more"]}
        />
      </div>
    </article>
  );
}

function InsightsSkeleton() {
  return (
    <div
      className={styles["insights-skeleton"]}
      role="status"
      aria-live="polite"
      aria-label="Loading insights"
    >
      <span className={styles["insights-skeleton__sr-only"]}>
        Loading insights...
      </span>

      <div className={styles["insights-skeleton__layout"]}>
        <FeaturedCardSkeleton />

        <div className={styles["insights-skeleton__small-grid"]}>
          {Array.from({ length: 4 }).map((_, index) => (
            <SmallCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function InsightsGrid({
  title = "",
  items = [],
  loading = false,
}) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isFiltering, setIsFiltering] = useState(false);

  const initialTimerRef = useRef(null);
  const filterTimerRef = useRef(null);

  const insightItems = Array.isArray(items) ? items : [];

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

  const categories = useMemo(() => {
    const map = new Map();

    insightItems.forEach((item) => {
      item.categories?.forEach((category) => {
        if (category?.slug && category?.name) {
          map.set(category.slug, category.name);
        }
      });
    });

    return Array.from(map.entries()).map(([slug, name]) => ({
      slug,
      name,
    }));
  }, [insightItems]);

  const filteredItems = useMemo(() => {
    if (activeCategory === "all") {
      return insightItems;
    }

    return insightItems.filter((item) =>
      item.categories?.some(
        (category) => category.slug === activeCategory
      )
    );
  }, [insightItems, activeCategory]);

  const visibleItems = filteredItems.slice(0, 5);

  const featured = visibleItems[0] || null;

  const smallItems = visibleItems.slice(1, 5);

  function handleCategoryChange(category) {
    if (
      category === activeCategory ||
      loading ||
      isInitialLoading ||
      isFiltering
    ) {
      return;
    }

    if (filterTimerRef.current) {
      clearTimeout(filterTimerRef.current);
    }

    setIsFiltering(true);
    setActiveCategory(category);

    filterTimerRef.current = setTimeout(() => {
      setIsFiltering(false);
      filterTimerRef.current = null;
    }, SKELETON_DURATION);
  }

  const showSkeleton =
    loading || isInitialLoading || isFiltering;

  return (
    <section
      className={styles["insights-listing"]}
      id="insights-listing"
      aria-busy={showSkeleton}
    >
      <div className={styles["insights-listing__container"]}>
        {title && (
          <div className={styles["insights-listing__heading"]}>
            <h2
              dangerouslySetInnerHTML={{
                __html: decodeHtml(title),
              }}
            />
          </div>
        )}

        <div
          className={styles["insights-filters"]}
          role="group"
          aria-label="Filter insights by category"
        >
          <button
            type="button"
            className={[
              styles["insights-filters__button"],
              activeCategory === "all"
                ? styles["insights-filters__button--active"]
                : "",
            ]
              .filter(Boolean)
              .join(" ")}
            onClick={() => handleCategoryChange("all")}
            aria-pressed={activeCategory === "all"}
            disabled={showSkeleton}
          >
            All Posts
          </button>

          {categories.map((category) => (
            <button
              type="button"
              key={category.slug}
              className={[
                styles["insights-filters__button"],
                activeCategory === category.slug
                  ? styles["insights-filters__button--active"]
                  : "",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() =>
                handleCategoryChange(category.slug)
              }
              aria-pressed={activeCategory === category.slug}
              disabled={showSkeleton}
            >
              {category.name}
            </button>
          ))}
        </div>

        {showSkeleton ? (
          <InsightsSkeleton />
        ) : featured ? (
          <div className={styles["insights-featured-layout"]}>
            <FeaturedCard item={featured} />

            {smallItems.length > 0 && (
              <div className={styles["insights-small-grid"]}>
                {smallItems.map((item, index) => (
                  <SmallInsightCard
                    key={item.id ?? index}
                    item={item}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <p className={styles["insights-empty"]}>
            No insights found.
          </p>
        )}
      </div>
    </section>
  );
}