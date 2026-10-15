import Link from "next/link";
import { notFound } from "next/navigation";

import { fetchGraphQL } from "../../../lib/graphql";
import { SINGLE_CONTENT_QUERY } from "../../../lib/queries/single";

import styles from "./page.module.css";

function stripHtml(value = "") {
  return String(value)
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#039;/g, "'")
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

async function getPodcast(slug) {
  const uri = `/podcasts/${slug}/`;

  try {
    const result = await fetchGraphQL(
      SINGLE_CONTENT_QUERY,
      { uri }
    );

    const podcast = result?.nodeByUri || null;

    if (podcast?.__typename !== "Podcasts") {
      return null;
    }

    return podcast;
  } catch (error) {
    console.error("Podcast GraphQL error:", error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const podcast = await getPodcast(slug);

  if (!podcast) {
    return {
      title: "Podcast Not Found | Resibuild",
    };
  }

  return {
    title: `${stripHtml(podcast.title)} | Resibuild Podcasts`,
    description: stripHtml(
      podcast.excerpt || ""
    ).slice(0, 160),
  };
}

export default async function PodcastSinglePage({ params }) {
  const { slug } = await params;

  const podcast = await getPodcast(slug);

  if (!podcast) {
    notFound();
  }

  const title = stripHtml(podcast.title || "");

  const excerpt = stripHtml(podcast.excerpt || "");

  const image =
    podcast.featuredImage?.node?.sourceUrl || null;

  const imageAlt =
    podcast.featuredImage?.node?.altText || title;

  const date = formatDate(podcast.date);

  const categories =
    podcast.podcastsCategory?.nodes || [];

  return (
    <main className={styles["podcast-single"]}>
      <section className={styles["podcast-single__hero"]}>
        {image && (
          <img
            src={image}
            alt=""
            className={styles["podcast-single__hero-image"]}
          />
        )}

        <div className={styles["podcast-single__hero-overlay"]} />

        <div className={styles["podcast-single__container"]}>
          <div className={styles["podcast-single__hero-content"]}>
            <span className={styles["podcast-single__eyebrow"]}>
              RESIBUILD PODCAST
            </span>

            <h1>{title}</h1>

            <div className={styles["podcast-single__hero-meta"]}>
              {date && <span>{date}</span>}

              {categories.length > 0 && (
                <span>
                  {categories
                    .map((category) => category.name)
                    .join(" • ")}
                </span>
              )}
            </div>

            <Link
              href="/podcasts/"
              className={styles["podcast-single__hero-button"]}
            >
              <span aria-hidden="true">←</span>
              Back to Podcasts
            </Link>
          </div>
        </div>
      </section>

      <section className={styles["podcast-single__intro"]}>
        <div className={styles["podcast-single__container"]}>
          <div className={styles["podcast-single__intro-grid"]}>
            <div className={styles["podcast-single__visual"]}>
              {image ? (
                <img
                  src={image}
                  alt={imageAlt}
                  className={styles["podcast-single__image"]}
                />
              ) : (
                <div
                  className={styles["podcast-single__image-placeholder"]}
                >
                  RESIBUILD PODCAST
                </div>
              )}
            </div>

            <div className={styles["podcast-single__intro-content"]}>
              <span className={styles["podcast-single__section-label"]}>
                THE PODCAST
              </span>

              <h2>{title}</h2>

              {date && (
                <p className={styles["podcast-single__date"]}>
                  {date}
                </p>
              )}

              {excerpt && (
                <p className={styles["podcast-single__excerpt"]}>
                  {excerpt}
                </p>
              )}

              {podcast.content && (
                <a
                  href="#podcast-episode"
                  className={styles["podcast-single__button"]}
                >
                  Explore Episode
                  <span aria-hidden="true">→</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {podcast.content && (
        <section
          className={styles["podcast-single__episode"]}
          id="podcast-episode"
        >
          <div className={styles["podcast-single__container"]}>
            <div className={styles["podcast-single__episode-inner"]}>
              <div className={styles["podcast-single__section-heading"]}>
                <span className={styles["podcast-single__section-label"]}>
                  EPISODE DETAILS
                </span>

                <h2>About This Episode</h2>
              </div>

              <article
                className={styles["podcast-single__editor"]}
                dangerouslySetInnerHTML={{
                  __html: podcast.content,
                }}
              />
            </div>
          </div>
        </section>
      )}

      <section className={styles["podcast-single__cta"]}>
        <div className={styles["podcast-single__container"]}>
          <div className={styles["podcast-single__cta-inner"]}>
            <div>
              <span className={styles["podcast-single__section-label"]}>
                EXPLORE MORE
              </span>

              <h2>Discover More Podcasts</h2>

              <p>
                Explore more conversations, ideas and
                perspectives from across the industry.
              </p>
            </div>

            <Link
              href="/podcasts/"
              className={styles["podcast-single__button"]}
            >
              View All Podcasts
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}