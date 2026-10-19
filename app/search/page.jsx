import Link from "next/link";
import { Suspense } from "react";
import { fetchGraphQL } from "../../lib/graphql";
import { INSIGHTS_PAGE_QUERY } from "../../lib/queries/insights";
import { EVENTS_PAGE_QUERY } from "../../lib/queries/events";
import { PODCASTS_PAGE_QUERY } from "../../lib/queries/podcasts";
import styles from "./page.module.css";

const RESULTS_PER_PAGE = 9;

const POSTS_QUERY = `
  query SearchPosts {
    posts(first: 100) {
      nodes {
        databaseId
        title
        uri
        excerpt
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;

function plainText(html = "") {
  return String(html)
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#(?:039|39);/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function ArrowIcon() {
  return (
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
  );
}

function SearchIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="10.8"
        cy="10.8"
        r="7.3"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M16.3 16.3L21 21"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function getPaginationItems(currentPage, totalPages) {
  const pages = [];

  if (totalPages <= 7) {
    for (let page = 1; page <= totalPages; page++) {
      pages.push(page);
    }

    return pages;
  }

  const visiblePages = new Set([
    1,
    totalPages,
    currentPage - 1,
    currentPage,
    currentPage + 1,
  ]);

  const sortedPages = [...visiblePages]
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((a, b) => a - b);

  sortedPages.forEach((page, index) => {
    if (index > 0) {
      const previousPage = sortedPages[index - 1];

      if (page - previousPage === 2) {
        pages.push(previousPage + 1);
      } else if (page - previousPage > 2) {
        pages.push("...");
      }
    }

    pages.push(page);
  });

  return pages;
}

function getPageUrl(query, page) {
  const params = new URLSearchParams();

  params.set("q", query);

  if (page > 1) {
    params.set("page", String(page));
  }

  return `/search?${params.toString()}`;
}

function SearchSkeleton() {
  return (
    <div
      className={styles["search-page__skeleton"]}
      role="status"
      aria-label="Loading search results"
      aria-live="polite"
    >
      <span className={styles["search-page__sr-only"]}>
        Loading search results...
      </span>

      <div className={styles["search-page__skeleton-header"]}>
        <div
          className={[
            styles["search-page__skeleton-line"],
            styles["search-page__skeleton-summary"],
          ].join(" ")}
        />

        <div
          className={[
            styles["search-page__skeleton-line"],
            styles["search-page__skeleton-count"],
          ].join(" ")}
        />
      </div>

      <div className={styles["search-page__skeleton-grid"]}>
        {Array.from({ length: RESULTS_PER_PAGE }).map(
          (_, index) => (
            <div
              className={styles["search-page__skeleton-card"]}
              key={index}
              aria-hidden="true"
            >
              <div
                className={styles["search-page__skeleton-image"]}
              />

              <div
                className={styles["search-page__skeleton-body"]}
              >
                <div
                  className={[
                    styles["search-page__skeleton-line"],
                    styles["search-page__skeleton-category"],
                  ].join(" ")}
                />

                <div
                  className={[
                    styles["search-page__skeleton-line"],
                    styles["search-page__skeleton-title"],
                  ].join(" ")}
                />

                <div
                  className={[
                    styles["search-page__skeleton-line"],
                    styles["search-page__skeleton-title-short"],
                  ].join(" ")}
                />

                <div
                  className={[
                    styles["search-page__skeleton-line"],
                    styles["search-page__skeleton-text"],
                  ].join(" ")}
                />

                <div
                  className={[
                    styles["search-page__skeleton-line"],
                    styles["search-page__skeleton-text-short"],
                  ].join(" ")}
                />

                <div
                  className={[
                    styles["search-page__skeleton-line"],
                    styles["search-page__skeleton-button"],
                  ].join(" ")}
                />
              </div>
            </div>
          )
        )}
      </div>

      <div className={styles["search-page__skeleton-pagination"]}>
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className={styles["search-page__skeleton-page"]}
            aria-hidden="true"
          />
        ))}
      </div>
    </div>
  );
}

async function SearchResults({ query, page }) {
  let results = [];
  let errors = 0;

  if (query) {
    const sources = [
      {
        type: "Insights",
        gql: INSIGHTS_PAGE_QUERY,
        key: "allInsights",
      },
      {
        type: "Events",
        gql: EVENTS_PAGE_QUERY,
        key: "allEvents",
      },
      {
        type: "Podcasts",
        gql: PODCASTS_PAGE_QUERY,
        key: "allPodcasts",
      },
      {
        type: "Articles",
        gql: POSTS_QUERY,
        key: "posts",
      },
    ];

    const responses = await Promise.allSettled(
      sources.map((source) => fetchGraphQL(source.gql))
    );

    const needle = query.toLocaleLowerCase();

    sources.forEach((source, index) => {
      if (responses[index].status !== "fulfilled") {
        errors += 1;

        console.error(
          `Search ${source.type} failed:`,
          responses[index].reason
        );

        return;
      }

      const nodes =
        responses[index].value?.[source.key]?.nodes || [];

      for (const item of nodes) {
        if (!item?.uri) continue;

        const title = plainText(item.title);
        const excerpt = plainText(item.excerpt);

        if (
          !`${title} ${excerpt}`
            .toLocaleLowerCase()
            .includes(needle)
        ) {
          continue;
        }

        results.push({
          id: `${source.type}-${item.databaseId || item.uri}`,
          type: source.type,
          title,
          excerpt,
          uri: item.uri,
          image: item.featuredImage?.node?.sourceUrl,
          imageAlt:
            item.featuredImage?.node?.altText || title,
        });
      }
    });
  }

  const totalResults = results.length;

  const totalPages = Math.ceil(
    totalResults / RESULTS_PER_PAGE
  );

  const currentPage =
    totalPages > 0
      ? Math.min(page, totalPages)
      : 1;

  const startIndex =
    (currentPage - 1) * RESULTS_PER_PAGE;

  const endIndex = startIndex + RESULTS_PER_PAGE;

  const paginatedResults = results.slice(
    startIndex,
    endIndex
  );

  const paginationItems = getPaginationItems(
    currentPage,
    totalPages
  );

  const showingFrom =
    totalResults > 0 ? startIndex + 1 : 0;

  const showingTo = Math.min(
    endIndex,
    totalResults
  );

  return (
    <>
      <div className={styles["search-page__results-header"]}>
        {query ? (
          <p className={styles["search-page__summary"]}>
            Showing{" "}
            <strong>
              {totalResults} result
              {totalResults === 1 ? "" : "s"}
            </strong>{" "}
            for <strong>“{query}”</strong>
          </p>
        ) : (
          <p className={styles["search-page__summary"]}>
            Enter a keyword above to search our content.
          </p>
        )}

        {totalResults > 0 && (
          <span
            className={styles["search-page__result-count"]}
          >
            {showingFrom}–{showingTo} of {totalResults}
          </span>
        )}
      </div>

      {errors > 0 && (
        <div
          role="alert"
          className={styles["search-page__warning"]}
        >
          Some content could not be loaded.
          Results may be incomplete.
        </div>
      )}

      {query && totalResults === 0 && errors === 0 && (
        <div className={styles["search-page__empty"]}>
          <div className={styles["search-page__empty-icon"]}>
            <SearchIcon />
          </div>

          <h2>No results found</h2>

          <p>
            We couldn't find any content matching
            your search. Try another keyword or
            explore our latest content.
          </p>

          <Link
            href="/"
            className={styles["search-page__back"]}
          >
            <span>Back to Home</span>
            <ArrowIcon />
          </Link>
        </div>
      )}

      {paginatedResults.length > 0 && (
        <div className={styles["search-page__grid"]}>
          {paginatedResults.map((result) => (
            <article
              className={styles["search-page__card"]}
              key={result.id}
            >
              <Link
                href={result.uri}
                className={styles["search-page__image"]}
                aria-label={`View ${result.title}`}
              >
                {result.image ? (
                  <img
                    src={result.image}
                    alt={result.imageAlt}
                    loading="lazy"
                  />
                ) : (
                  <span
                    className={
                      styles["search-page__image-fallback"]
                    }
                  >
                    RESIBUILD
                  </span>
                )}
              </Link>

              <div
                className={styles["search-page__card-body"]}
              >
                <span
                  className={styles["search-page__type"]}
                >
                  {result.type}
                </span>

                <h3
                  className={
                    styles["search-page__card-title"]
                  }
                >
                  <Link href={result.uri}>
                    {result.title}
                  </Link>
                </h3>

                {result.excerpt && (
                  <p
                    className={
                      styles["search-page__excerpt"]
                    }
                  >
                    {result.excerpt}
                  </p>
                )}

                <Link
                  className={styles["search-page__read"]}
                  href={result.uri}
                >
                  <span>Read More</span>
                  <ArrowIcon />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <nav
          className={styles["search-page__pagination"]}
          aria-label="Search results pagination"
        >
          {currentPage > 1 ? (
            <Link
              href={getPageUrl(query, currentPage - 1)}
              scroll={false}
              data-search-pagination="true"
              className={styles["search-page__page-nav"]}
              aria-label="Previous page"
            >
              <span aria-hidden="true">←</span>
              <span>Previous</span>
            </Link>
          ) : (
            <span
              className={[
                styles["search-page__page-nav"],
                styles["search-page__page-disabled"],
              ].join(" ")}
              aria-disabled="true"
            >
              <span aria-hidden="true">←</span>
              <span>Previous</span>
            </span>
          )}

          <div
            className={styles["search-page__page-numbers"]}
          >
            {paginationItems.map((item, index) =>
              item === "..." ? (
                <span
                  key={`ellipsis-${index}`}
                  className={
                    styles["search-page__page-ellipsis"]
                  }
                  aria-hidden="true"
                >
                  ...
                </span>
              ) : (
                <Link
                  key={item}
                  href={getPageUrl(query, item)}
                  scroll={false}
                  data-search-pagination="true"
                  className={[
                    styles["search-page__page-number"],
                    currentPage === item
                      ? styles["search-page__page-active"]
                      : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  aria-label={`Page ${item}`}
                  aria-current={
                    currentPage === item
                      ? "page"
                      : undefined
                  }
                >
                  {item}
                </Link>
              )
            )}
          </div>

          {currentPage < totalPages ? (
            <Link
              href={getPageUrl(query, currentPage + 1)}
              scroll={false}
              data-search-pagination="true"
              className={styles["search-page__page-nav"]}
              aria-label="Next page"
            >
              <span>Next</span>
              <span aria-hidden="true">→</span>
            </Link>
          ) : (
            <span
              className={[
                styles["search-page__page-nav"],
                styles["search-page__page-disabled"],
              ].join(" ")}
              aria-disabled="true"
            >
              <span>Next</span>
              <span aria-hidden="true">→</span>
            </span>
          )}
        </nav>
      )}
    </>
  );
}

export async function generateMetadata({ searchParams }) {
  const params = await searchParams;

  const query = String(params?.q || "")
    .trim()
    .slice(0, 100);

  return {
    title: query
      ? `Search: ${query} | Resibuild`
      : "Search | Resibuild",
  };
}

export default async function SearchPage({ searchParams }) {
  const params = await searchParams;

  const query = String(params?.q || "")
    .trim()
    .slice(0, 100);

  const requestedPage = Number(params?.page || 1);

  const page =
    Number.isSafeInteger(requestedPage) && requestedPage > 0
      ? requestedPage
      : 1;

  const suspenseKey = `${query}-${page}`;

  return (
    <main className={styles["search-page"]}>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (() => {
              if (window.__resibuildSearchScrollHandler) {
                document.removeEventListener(
                  "click",
                  window.__resibuildSearchScrollHandler
                );
              }

              window.__resibuildSearchScrollHandler = (event) => {
                const link = event.target.closest(
                  'a[data-search-pagination="true"]'
                );

                if (!link) return;

                const targetUrl = new URL(link.href);
                const currentUrl = new URL(window.location.href);

                if (
                  targetUrl.searchParams.get("page") ===
                  currentUrl.searchParams.get("page")
                ) {
                  return;
                }

                window.scrollTo({
                  top: 0,
                  behavior: "smooth"
                });
              };

              document.addEventListener(
                "click",
                window.__resibuildSearchScrollHandler
              );
            })();
          `,
        }}
      />
      <section className={styles["search-page__hero"]}>
        <div className={styles["search-page__container"]}>
          <div className={styles["search-page__intro"]}>
            <span className={styles["search-page__eyebrow"]}>
              RESIBUILD
            </span>

            <h1 className={styles["search-page__title"]}>
              Search Results
            </h1>

            <p className={styles["search-page__description"]}>
              Explore our latest insights, events, podcasts
              and articles.
            </p>

            <form
              className={styles["search-page__form"]}
              action="/search"
              method="get"
              role="search"
            >
              <div className={styles["search-page__input-wrap"]}>
                <SearchIcon />

                <input
                  name="q"
                  type="search"
                  defaultValue={query}
                  placeholder="What are you looking for?"
                  aria-label="Search website"
                  required
                />
              </div>

              <button
                className={styles["search-page__submit"]}
                type="submit"
              >
                <span>Search</span>
                <ArrowIcon />
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className={styles["search-page__results"]}>
        <div className={styles["search-page__container"]}>
          <Suspense
            key={suspenseKey}
            fallback={<SearchSkeleton />}
          >
            <SearchResults query={query} page={page} />
          </Suspense>
        </div>
      </section>
    </main>
  );
}