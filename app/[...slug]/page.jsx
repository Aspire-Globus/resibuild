import Link from "next/link";
import { notFound } from "next/navigation";

import { fetchGraphQL } from "../../lib/graphql";
import { SINGLE_CONTENT_QUERY } from "../../lib/queries/single";

import styles from "./page.module.css";

function stripHtml(value = "") {
  return String(value)
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#039;/g, "'")
    .replace(/&quot;/g, '"')
    .trim();
}

function formatDate(date) {
  if (!date) return "";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(parsedDate);
}

async function getSingleContent(uri) {
  try {
    const result = await fetchGraphQL(
      SINGLE_CONTENT_QUERY,
      { uri }
    );

    return result?.nodeByUri || null;
  } catch (error) {
    console.error("Single page GraphQL error:", error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const uri = `/${slug.join("/")}/`;

  const item = await getSingleContent(uri);

  if (!item) {
    return {
      title: "Not Found | Resibuild",
    };
  }

  return {
    title: `${stripHtml(item.title || "")} | Resibuild`,
    description: stripHtml(item.excerpt || "").slice(0, 160),
  };
}

export default async function SinglePage({ params }) {
  const { slug } = await params;

  const uri = `/${slug.join("/")}/`;

  const item = await getSingleContent(uri);

  if (!item) {
    notFound();
  }

  const type = item.__typename || "";

  const typeConfig = {
    Events: {
      label: "Event",
      archiveUrl: "/events/",
      archiveLabel: "Events",
      categories: item.eventCategories?.nodes || [],
    },

    Insights: {
      label: "Insight",
      archiveUrl: "/insights/",
      archiveLabel: "Insights",
      categories: item.insightsCategories?.nodes || [],
    },

    Podcasts: {
      label: "Podcast",
      archiveUrl: "/podcasts/",
      archiveLabel: "Podcasts",
      categories: item.podcastsCategory?.nodes || [],
    },

    Post: {
      label: "News",
      archiveUrl: "/insights/",
      archiveLabel: "Insights",
      categories: item.categories?.nodes || [],
    },
  };

  const config = typeConfig[type] || {
    label: "",
    archiveUrl: "/",
    archiveLabel: "Home",
    categories: [],
  };

  const {
    label: typeLabel,
    archiveUrl,
    archiveLabel,
    categories,
  } = config;

  const title = stripHtml(item.title || "");

  const image =
    item.featuredImage?.node?.sourceUrl || null;

  const imageAlt =
    item.featuredImage?.node?.altText || title;

  const formattedDate = formatDate(item.date);

  const categoryNames = categories
    .map((category) => category?.name)
    .filter(Boolean)
    .join(" • ");

  const eventUrl =
    type === "Events"
      ? item.eventsPostType?.externalUrl
      : null;

  return (
    <main className={styles["single-content-page"]}>
      <section className={styles["single-content-hero"]}>
        {image && (
          <img
            className={styles["single-content-hero__image"]}
            src={image}
            alt=""
          />
        )}

        <div
          className={styles["single-content-hero__overlay"]}
        />

        <div
          className={styles["single-content-hero__pattern"]}
        />

        <div className={styles["single-container"]}>
          <div className={styles["single-content-hero__inner"]}>
            {typeLabel && (
              <span
                className={styles["single-content-hero__type"]}
              >
                {typeLabel}
              </span>
            )}

            {item.title && (
              <h1
                dangerouslySetInnerHTML={{
                  __html: item.title,
                }}
              />
            )}

            {(formattedDate || categoryNames) && (
              <div
                className={styles["single-content-hero__meta"]}
              >
                {formattedDate && (
                  <span>{formattedDate}</span>
                )}

                {categoryNames && (
                  <span>{categoryNames}</span>
                )}
              </div>
            )}

            <Link
              href={archiveUrl}
              className={styles["single-content-hero__button"]}
            >
              <span aria-hidden="true">←</span>
              Back to {archiveLabel}
            </Link>
          </div>
        </div>
      </section>

      <section className={styles["single-content-body"]}>
        <div className={styles["single-container"]}>
          <div className={styles["single-content-layout"]}>
            <article
              className={styles["single-content-article"]}
            >
              {item.content && (
                <div
                  className={styles["single-content-editor"]}
                  dangerouslySetInnerHTML={{
                    __html: item.content,
                  }}
                />
              )}
            </article>

            <aside
              className={styles["single-content-sidebar"]}
            >
              <div
                className={styles["single-content-sidebar__box"]}
              >
                {typeLabel && (
                  <span
                    className={
                      styles["single-content-sidebar__eyebrow"]
                    }
                  >
                    {typeLabel}
                  </span>
                )}

                <h3>Explore more from Resibuild</h3>

                <Link
                  href={archiveUrl}
                  className={
                    styles["single-content-sidebar__button"]
                  }
                >
                  View All {archiveLabel}
                  <span aria-hidden="true">→</span>
                </Link>
              </div>

              {eventUrl && (
                <div
                  className={
                    styles["single-content-sidebar__box"]
                  }
                >
                  <h3>Event Registration</h3>

                  <a
                    href={eventUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={
                      styles["single-content-sidebar__button"]
                    }
                  >
                    Visit Event
                    <span aria-hidden="true">→</span>
                  </a>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}