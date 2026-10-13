
import Link from "next/link";
import { fetchGraphQL } from "../../lib/graphql";
import { INSIGHTS_PAGE_QUERY } from "../../lib/queries/insights";
import { EVENTS_PAGE_QUERY } from "../../lib/queries/events";
import { PODCASTS_PAGE_QUERY } from "../../lib/queries/podcasts";
import "./search.css";

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

export async function generateMetadata({ searchParams }) {
  const params = await searchParams;
  const query = String(params?.q || "").trim().slice(0, 100);

  return {
    title: query
      ? `Search: ${query} | Resibuild`
      : "Search | Resibuild",
  };
}

export default async function SearchPage({ searchParams }) {
  const params = await searchParams;
  const query = String(params?.q || "").trim().slice(0, 100);

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

  return (
    <main className="search-page">
      <div className="search-page__inner">
        <div className="search-page__intro">
          <p className="search-page__eyebrow">RESIBUILD</p>

          <h1>Search Results</h1>

          <form
            className="search-page__form"
            action="/search"
            method="get"
          >
            <input
              name="q"
              type="search"
              defaultValue={query}
              placeholder="What are you looking for?"
              aria-label="Search website"
              required
            />

            <button type="submit">Search</button>
          </form>

          {query ? (
            <p className="search-page__summary">
              {results.length} result
              {results.length === 1 ? "" : "s"} for{" "}
              <strong>“{query}”</strong>
            </p>
          ) : (
            <p className="search-page__summary">
              Enter a term to search events, insights,
              podcasts and articles.
            </p>
          )}

          {errors > 0 && (
            <p
              role="alert"
              className="search-page__warning"
            >
              Some content could not be loaded.
              Results may be incomplete.
            </p>
          )}
        </div>

        {query &&
          results.length === 0 &&
          errors === 0 && (
            <div className="search-page__empty">
              <h2>No results found</h2>

              <p>
                Try searching for another keyword
                or browse our latest content.
              </p>

              <Link href="/">Back to home</Link>
            </div>
          )}

        {results.length > 0 && (
          <div className="search-page__grid">
            {results.map((result) => (
              <article
                className="search-page__card"
                key={result.id}
              >
                <Link
                  href={result.uri}
                  className="search-page__image"
                  aria-label={`View ${result.title}`}
                >
                  {result.image ? (
                    <img
                      src={result.image}
                      alt={result.imageAlt}
                      loading="lazy"
                    />
                  ) : (
                    <span>RESIBUILD</span>
                  )}
                </Link>

                <div className="search-page__card-body">
                  <span className="search-page__type">
                    {result.type}
                  </span>

                  <h2>
                    <Link href={result.uri}>
                      {result.title}
                    </Link>
                  </h2>

                  {result.excerpt && (
                    <p>{result.excerpt}</p>
                  )}

                  <Link
                    className="search-page__read"
                    href={result.uri}
                  >
                    Read more →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
