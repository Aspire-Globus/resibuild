"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import styles from "./LatestEpisodes.module.css";

const ITEMS_PER_PAGE = 6;
const FADE_DURATION = 180;
const SKELETON_DURATION = 320;

function getSpotifyEpisodeUrl(url) {
  if (!url || typeof url !== "string") {
    return "";
  }

  try {
    const parsed = new URL(url);

    if (
      parsed.protocol !== "https:" ||
      ![
        "open.spotify.com",
        "spotify.com",
        "www.spotify.com",
      ].includes(parsed.hostname.toLowerCase())
    ) {
      return "";
    }

    if (!/\/episode\/[a-zA-Z0-9]+/.test(parsed.pathname)) {
      return "";
    }

    return parsed.href;
  } catch {
    return "";
  }
}

function formatCount(value) {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  const number = Number(value);

  if (!Number.isFinite(number) || number < 0) {
    return null;
  }

  if (number >= 1000) {
    return new Intl.NumberFormat("en", {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(number);
  }

  return `${number}K`;
}

function PodcastAnalysis({ analysis }) {
  if (!analysis) {
    return null;
  }

  const listens = formatCount(analysis.listens);
  const likes = formatCount(analysis.likes);
  const comments = formatCount(analysis.comments);

  if (
    listens === null &&
    likes === null &&
    comments === null
  ) {
    return null;
  }

  return (
    <div
      className={styles["latest-episodes__analysis"]}
      aria-label="Podcast statistics"
    >
      {listens !== null && (
        <div
          className={styles["latest-episodes__analysisItem"]}
          title="Listens"
          aria-label={`${listens} listens`}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M3 14v-3a9 9 0 0 1 18 0v3" />
            <rect
              x="3"
              y="13"
              width="4"
              height="8"
              rx="2"
            />
            <rect
              x="17"
              y="13"
              width="4"
              height="8"
              rx="2"
            />
          </svg>

          <span>{listens}</span>
        </div>
      )}

      {likes !== null && (
        <div
          className={styles["latest-episodes__analysisItem"]}
          title="Likes"
          aria-label={`${likes} likes`}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />
          </svg>

          <span>{likes}</span>
        </div>
      )}

      {comments !== null && (
        <div
          className={styles["latest-episodes__analysisItem"]}
          title="Comments"
          aria-label={`${comments} comments`}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5H5l-3 2V11.5a8.5 8.5 0 0 1 8.5-8.5h2A8.5 8.5 0 0 1 21 11.5Z" />
          </svg>

          <span>{comments}</span>
        </div>
      )}
    </div>
  );
}

function PodcastCard({ podcast }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const spotifyUrl = getSpotifyEpisodeUrl(
    podcast.spotifyUrl
  );

  const watchUrl = podcast.url || "#";

  const isExternal = Boolean(spotifyUrl);

  const title = podcast.title || "";

  const colonIndex = title.indexOf(":");

  return (
    <article className={styles["latest-episodes__card"]}>
      <a
        href={watchUrl}
        // target={isExternal ? "_blank" : undefined}
        rel={
          isExternal
            ? "noopener noreferrer"
            : undefined
        }
        className={styles["latest-episodes__imageLink"]}
        aria-label={`View ${title}`}
      >
        {podcast.image && !imageError ? (
          <>
            {!imageLoaded && (
              <span
                className={`${styles["latest-episodes__imageSkeleton"]} ${styles["latest-episodes__shimmer"]}`}
                aria-hidden="true"
              />
            )}

            <img
              src={podcast.image}
              alt={podcast.imageAlt || title}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              className={`${styles["latest-episodes__image"]} ${
                imageLoaded
                  ? styles["latest-episodes__image--loaded"]
                  : ""
              }`}
            />
          </>
        ) : (
          <div
            className={styles["latest-episodes__imageFallback"]}
          >
            Resibuild Podcast
          </div>
        )}
      </a>

      <div
        className={styles["latest-episodes__cardContent"]}
      >
        <h3
          className={styles["latest-episodes__cardTitle"]}
        >
          <a
          href={watchUrl}
          rel={
            isExternal
              ? "noopener noreferrer"
              : undefined
          }
          className={styles["latest-episodes__cardTitleLink"]}
        >
          {colonIndex !== -1 ? (
            <>
              <span
                className={
                  styles["latest-episodes__titleHighlight"]
                }
              >
                {title.slice(0, colonIndex + 1)}
              </span>

              {title.slice(colonIndex + 1)}
            </>
          ) : (
            title
          )}
        </a>
        </h3>

        <p className={styles["latest-episodes__excerpt"]}>
          {podcast.excerpt ||
            "Listen to the latest Resibuild podcast episode."}
        </p>

        <PodcastAnalysis analysis={podcast.analysis} />

        <a
          href={watchUrl}
          rel={
            isExternal
              ? "noopener noreferrer"
              : undefined
          }
          className={styles["latest-episodes__watch"]}
        >
          Watch Now

          <span
            className={styles["latest-episodes__playIcon"]}
          >
            <svg
              width="9"
              height="9"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </a>
      </div>
    </article>
  );
}

function PodcastSkeletonCard() {
  return (
    <div
      className={styles["latest-episodes__skeletonCard"]}
      aria-hidden="true"
    >
      <div
        className={`${styles["latest-episodes__skeletonImage"]} ${styles["latest-episodes__shimmer"]}`}
      />

      <div
        className={styles["latest-episodes__skeletonContent"]}
      >
        <div
          className={`${styles["latest-episodes__skeletonTitle"]} ${styles["latest-episodes__shimmer"]}`}
        />

        <div
          className={`${styles["latest-episodes__skeletonTitleShort"]} ${styles["latest-episodes__shimmer"]}`}
        />

        <div
          className={`${styles["latest-episodes__skeletonText"]} ${styles["latest-episodes__shimmer"]}`}
        />

        <div
          className={`${styles["latest-episodes__skeletonTextShort"]} ${styles["latest-episodes__shimmer"]}`}
        />

        <div
          className={`${styles["latest-episodes__skeletonButton"]} ${styles["latest-episodes__shimmer"]}`}
        />
      </div>
    </div>
  );
}

export default function LatestEpisodes({
  podcasts = [],
}) {
  const [activeCategory, setActiveCategory] =
    useState("all");

  const [currentPage, setCurrentPage] =
    useState(1);

  const [displayCategory, setDisplayCategory] =
    useState("all");

  const [displayPage, setDisplayPage] =
    useState(1);

  const [animationPhase, setAnimationPhase] =
    useState("entering");

  const transitionTimersRef = useRef([]);
  const transitionIdRef = useRef(0);

  const categories = useMemo(() => {
    const categoryMap = new Map();

    podcasts.forEach((podcast) => {
      (podcast.categories || []).forEach((category) => {
        if (
          category.slug &&
          !categoryMap.has(category.slug)
        ) {
          categoryMap.set(
            category.slug,
            category
          );
        }
      });
    });

    return Array.from(
      categoryMap.values()
    ).sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }, [podcasts]);

  const filteredPodcasts = useMemo(() => {
    if (displayCategory === "all") {
      return podcasts;
    }

    return podcasts.filter((podcast) =>
      (podcast.categories || []).some(
        (category) =>
          category.slug === displayCategory
      )
    );
  }, [podcasts, displayCategory]);

  const visiblePodcasts = useMemo(() => {
    const start =
      (displayPage - 1) * ITEMS_PER_PAGE;

    return filteredPodcasts.slice(
      start,
      start + ITEMS_PER_PAGE
    );
  }, [filteredPodcasts, displayPage]);

  const selectedPodcasts = useMemo(() => {
    if (activeCategory === "all") {
      return podcasts;
    }

    return podcasts.filter((podcast) =>
      (podcast.categories || []).some(
        (category) =>
          category.slug === activeCategory
      )
    );
  }, [podcasts, activeCategory]);

  const selectedTotalPages = Math.max(
    1,
    Math.ceil(
      selectedPodcasts.length / ITEMS_PER_PAGE
    )
  );

  const clearTransitionTimers = useCallback(() => {
    transitionTimersRef.current.forEach(
      clearTimeout
    );

    transitionTimersRef.current = [];
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationPhase("visible");
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    return () => {
      clearTransitionTimers();
    };
  }, [clearTransitionTimers]);

  const startTransition = useCallback(
    (nextCategory, nextPage) => {
      clearTransitionTimers();

      const transitionId =
        ++transitionIdRef.current;

      setAnimationPhase("leaving");

      const fadeTimer = setTimeout(() => {
        if (
          transitionIdRef.current !== transitionId
        ) {
          return;
        }

        setAnimationPhase("loading");

        const loadingTimer = setTimeout(() => {
          if (
            transitionIdRef.current !== transitionId
          ) {
            return;
          }

          setDisplayCategory(nextCategory);
          setDisplayPage(nextPage);
          setAnimationPhase("entering");

          const enterTimer = setTimeout(() => {
            if (
              transitionIdRef.current !== transitionId
            ) {
              return;
            }

            setAnimationPhase("visible");
          }, 40);

          transitionTimersRef.current.push(
            enterTimer
          );
        }, SKELETON_DURATION);

        transitionTimersRef.current.push(
          loadingTimer
        );
      }, FADE_DURATION);

      transitionTimersRef.current.push(
        fadeTimer
      );
    },
    [clearTransitionTimers]
  );

  const changeCategory = (slug) => {
    if (slug === activeCategory) {
      return;
    }

    setActiveCategory(slug);
    setCurrentPage(1);

    startTransition(slug, 1);
  };

  const changePage = (page) => {
    const nextPage = Math.min(
      Math.max(page, 1),
      selectedTotalPages
    );

    if (nextPage === currentPage) {
      return;
    }

    setCurrentPage(nextPage);

    startTransition(
      activeCategory,
      nextPage
    );
  };

  const paginationPages = useMemo(() => {
    if (selectedTotalPages <= 7) {
      return Array.from(
        { length: selectedTotalPages },
        (_, index) => index + 1
      );
    }

    const pages = new Set([
      1,
      selectedTotalPages,
      currentPage,
      currentPage - 1,
      currentPage + 1,
    ]);

    const sortedPages = [...pages]
      .filter(
        (page) =>
          page >= 1 &&
          page <= selectedTotalPages
      )
      .sort((a, b) => a - b);

    const result = [];

    sortedPages.forEach((page, index) => {
      if (
        index > 0 &&
        page - sortedPages[index - 1] > 1
      ) {
        result.push("...");
      }

      result.push(page);
    });

    return result;
  }, [currentPage, selectedTotalPages]);

  const showSkeleton =
    animationPhase === "loading";

  const isTransitioning =
    animationPhase === "leaving" ||
    animationPhase === "loading" ||
    animationPhase === "entering";

  return (
    <section
      className={styles["latest-episodes"]}
    >
      <div
        className={styles["latest-episodes__container"]}
      >
        <h2
          className={styles["latest-episodes__heading"]}
        >
          <span>OUR PODCAST</span> - Latest Episodes
        </h2>

        <div
          className={styles["latest-episodes__filters"]}
          role="group"
          aria-label="Filter podcasts by category"
        >
          <button
            type="button"
            onClick={() =>
              changeCategory("all")
            }
            className={`${styles["latest-episodes__filter"]} ${
              activeCategory === "all"
                ? styles["latest-episodes__filter--active"]
                : ""
            }`}
            aria-pressed={
              activeCategory === "all"
            }
          >
            All Podcasts
          </button>

          {categories.map((category) => (
            <button
              key={category.slug}
              type="button"
              onClick={() =>
                changeCategory(category.slug)
              }
              className={`${styles["latest-episodes__filter"]} ${
                activeCategory === category.slug
                  ? styles["latest-episodes__filter--active"]
                  : ""
              }`}
              aria-pressed={
                activeCategory === category.slug
              }
            >
              {category.name}
            </button>
          ))}
        </div>

        <div
          className={styles["latest-episodes__results"]}
          aria-busy={isTransitioning}
        >
          {showSkeleton ? (
            <div
              className={`${styles["latest-episodes__grid"]} ${styles["latest-episodes__grid--skeleton"]}`}
              role="status"
              aria-label="Loading podcasts"
            >
              {Array.from(
                { length: ITEMS_PER_PAGE },
                (_, index) => (
                  <PodcastSkeletonCard
                    key={index}
                  />
                )
              )}
            </div>
          ) : visiblePodcasts.length > 0 ? (
            <div
              className={`${styles["latest-episodes__grid"]} ${
                animationPhase === "leaving"
                  ? styles["latest-episodes__grid--leaving"]
                  : ""
              } ${
                animationPhase === "entering"
                  ? styles["latest-episodes__grid--entering"]
                  : ""
              }`}
            >
              {visiblePodcasts.map((podcast) => (
                <PodcastCard
                  key={podcast.id}
                  podcast={podcast}
                />
              ))}
            </div>
          ) : (
            <p
              className={styles["latest-episodes__empty"]}
            >
              No podcasts found in this category.
            </p>
          )}
        </div>

        {selectedTotalPages > 1 && (
          <nav
            className={
              styles["latest-episodes__pagination"]
            }
            aria-label="Podcast pagination"
          >
            <button
              type="button"
              onClick={() =>
                changePage(currentPage - 1)
              }
              disabled={
                currentPage === 1 ||
                isTransitioning
              }
              aria-label="Previous page"
            >
              «
            </button>

            {paginationPages.map(
              (page, index) =>
                page === "..." ? (
                  <span
                    key={`dots-${index}`}
                    className={
                      styles["latest-episodes__dots"]
                    }
                  >
                    ...
                  </span>
                ) : (
                  <button
                    key={page}
                    type="button"
                    onClick={() =>
                      changePage(page)
                    }
                    disabled={isTransitioning}
                    className={
                      currentPage === page
                        ? styles["latest-episodes__page--active"]
                        : ""
                    }
                    aria-current={
                      currentPage === page
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
              onClick={() =>
                changePage(currentPage + 1)
              }
              disabled={
                currentPage === selectedTotalPages ||
                isTransitioning
              }
              aria-label="Next page"
            >
              »
            </button>
          </nav>
        )}
      </div>
    </section>
  );
}