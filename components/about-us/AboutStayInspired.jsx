"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "./AboutStayInspired.module.css";

const SKELETON_DURATION = 350;

function StayInspiredSkeleton() {
  return (
    <div
      className={styles["about-stay-inspired__skeleton"]}
      role="status"
      aria-live="polite"
      aria-label="Loading content"
    >
      <span className={styles["about-stay-inspired__sr-only"]}>
        Loading content...
      </span>

      <div className={styles["about-stay-inspired__grid"]}>
        {Array.from({ length: 4 }).map((_, index) => (
          <article
            key={index}
            className={styles["about-stay-inspired__skeleton-card"]}
            aria-hidden="true"
          >
            <div
              className={styles["about-stay-inspired__skeleton-image"]}
            />

            <div
              className={styles["about-stay-inspired__skeleton-content"]}
            >
              <div
                className={styles["about-stay-inspired__skeleton-title"]}
              />

              <div
                className={styles["about-stay-inspired__skeleton-title-short"]}
              />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default function AboutStayInspired({
  events = [],
  podcasts = [],
  insights = [],
  cpd = [],
  loading = false,
}) {
  const [activeTab, setActiveTab] = useState("events");
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isSwitching, setIsSwitching] = useState(false);

  const initialTimerRef = useRef(null);
  const tabTimerRef = useRef(null);

  const tabs = {
    events: {
      label: "Events",
      items: events,
      viewMoreUrl: "/events/",
    },
    podcasts: {
      label: "Podcast",
      items: podcasts,
      viewMoreUrl: "/podcasts/",
    },
    cpd: {
      label: "CPD",
      items: cpd,
      viewMoreUrl: "/cpd/",
    },
    insights: {
      label: "Insight",
      items: insights,
      viewMoreUrl: "/insights/",
    },
  };

  const currentTab = tabs[activeTab];

  const currentItems = Array.isArray(currentTab.items)
    ? currentTab.items.slice(0, 4)
    : [];

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
      if (tabTimerRef.current) {
        clearTimeout(tabTimerRef.current);
      }
    };
  }, []);

  const handleTabChange = (tab) => {
    if (tab === activeTab || loading || isSwitching) {
      return;
    }

    if (tabTimerRef.current) {
      clearTimeout(tabTimerRef.current);
    }

    setIsSwitching(true);

    tabTimerRef.current = setTimeout(() => {
      setActiveTab(tab);
      setIsSwitching(false);
      tabTimerRef.current = null;
    }, SKELETON_DURATION);
  };

  const showSkeleton =
    loading || isInitialLoading || isSwitching;

  return (
    <section
      className={styles["about-stay-inspired"]}
      id="stay-inspired"
      aria-busy={showSkeleton}
    >
      <div className={styles["about-stay-inspired__inner"]}>
        <div className={styles["about-stay-inspired__header"]}>
          <h2 className={styles["about-stay-inspired__heading"]}>
            Staying up-to-date is difficult but combining
            this with passion and inspiration is even trickier!
          </h2>

          <div
            className={styles["about-stay-inspired__tabs"]}
            role="tablist"
            aria-label="Explore Resibuild content"
          >
            {Object.entries(tabs).map(([key, tab]) => {
              const isActive = activeTab === key;

              return (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  id={`stay-inspired-tab-${key}`}
                  aria-selected={isActive}
                  aria-controls="stay-inspired-panel"
                  disabled={loading || isSwitching}
                  className={[
                    styles["about-stay-inspired__tab"],
                    isActive
                      ? styles["about-stay-inspired__tab--active"]
                      : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => handleTabChange(key)}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div
          className={styles["about-stay-inspired__panel"]}
          id="stay-inspired-panel"
          role="tabpanel"
          aria-labelledby={`stay-inspired-tab-${activeTab}`}
        >
          {showSkeleton ? (
            <StayInspiredSkeleton />
          ) : currentItems.length > 0 ? (
            <div className={styles["about-stay-inspired__grid"]}>
              {currentItems.map((item, index) => (
                <article
                  className={styles["about-stay-inspired__card"]}
                  key={item.id ?? `${activeTab}-${index}`}
                >
                  <Link
                    href={item.url || "#"}
                    className={styles["about-stay-inspired__image"]}
                    aria-label={item.title || "View details"}
                  >
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.imageAlt || item.title || ""}
                        loading="lazy"
                      />
                    ) : (
                      <span
                        className={
                          styles["about-stay-inspired__image-placeholder"]
                        }
                        aria-hidden="true"
                      />
                    )}
                  </Link>

                  <div
                    className={
                      styles["about-stay-inspired__card-content"]
                    }
                  >
                    {item.title && (
                      <h3
                        className={
                          styles["about-stay-inspired__card-title"]
                        }
                      >
                        <Link href={item.url || "#"}>
                          {item.title}
                        </Link>
                      </h3>
                    )}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className={styles["about-stay-inspired__empty"]}>
              <p>No content available.</p>
            </div>
          )}
        </div>
      </div>

      <div className={styles["about-stay-inspired__footer"]}>
        <Link
          href={currentTab.viewMoreUrl}
          className={styles["about-stay-inspired__view-more"]}
        >
          <span>View More</span>

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
    </section>
  );
}