import "./single.css";

import Link from "next/link";
import { notFound } from "next/navigation";

import { fetchGraphQL } from "../../lib/graphql";
import { SINGLE_CONTENT_QUERY } from "../../lib/queries/single";


/* =========================================
   HELPERS
========================================= */

function stripHtml(value = "") {
  return value
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .trim();
}


function formatDate(date) {
  if (!date) return "";

  try {
    return new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(date));
  } catch {
    return "";
  }
}


/* =========================================
   METADATA
========================================= */

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const uri = `/${slug.join("/")}/`;

  try {
    const result = await fetchGraphQL(
      SINGLE_CONTENT_QUERY,
      {
        uri,
      }
    );

    const item = result?.nodeByUri;

    if (!item) {
      return {
        title: "Not Found | Resibuild",
      };
    }

    return {
      title: `${stripHtml(item.title || "")} | Resibuild`,
      description: stripHtml(item.excerpt || ""),
    };
  } catch {
    return {
      title: "Resibuild",
    };
  }
}


/* =========================================
   PAGE
========================================= */

export default async function SinglePage({
  params,
}) {
  const { slug } = await params;

  const uri = `/${slug.join("/")}/`;

  let result = null;

  try {
    result = await fetchGraphQL(
      SINGLE_CONTENT_QUERY,
      {
        uri,
      }
    );
  } catch (error) {
    console.log(
      "Single page GraphQL error:",
      error.message
    );
  }

  const item =
    result?.nodeByUri || null;

  if (!item) {
    notFound();
  }


  /* =========================================
     CONTENT TYPE
  ========================================= */

  const type =
    item.__typename || "";

  let typeLabel = "";

  let archiveUrl = "/";

  let categories = [];


  if (type === "Events") {
    typeLabel = "Event";
    archiveUrl = "/events/";

    categories =
      item.eventCategories?.nodes || [];
  }


  if (type === "Insights") {
    typeLabel = "Insight";
    archiveUrl = "/insights/";

    categories =
      item.insightsCategories?.nodes || [];
  }


  if (type === "Podcasts") {
    typeLabel = "Podcast";
    archiveUrl = "/podcasts/";

    categories =
      item.podcastsCategory?.nodes || [];
  }


  if (type === "Post") {
    typeLabel = "News";
    archiveUrl = "/insights/";

    categories =
      item.categories?.nodes || [];
  }


  /* =========================================
     FEATURED IMAGE
  ========================================= */

  const image =
    item.featuredImage?.node?.sourceUrl ||
    null;

  const imageAlt =
    item.featuredImage?.node?.altText ||
    stripHtml(item.title || "") ||
    "";


  /* =========================================
     OUTPUT
  ========================================= */

  return (
    <main className="single-content-page">

      {/* =====================================
          HERO
      ===================================== */}

      <section className="single-content-hero">

        {image && (
          <img
            className="single-content-hero__image"
            src={image}
            alt={imageAlt}
          />
        )}

        <div className="single-content-hero__overlay" />

        <div className="single-content-hero__pattern" />

        <div className="single-container">

          <div className="single-content-hero__inner">

            {typeLabel && (
              <span className="single-content-hero__type">
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

            <div className="single-content-hero__meta">

              {item.date && (
                <span>
                  {formatDate(item.date)}
                </span>
              )}

              {categories.length > 0 && (
                <span>
                  {categories
                    .map(
                      (category) =>
                        category.name
                    )
                    .join(" • ")}
                </span>
              )}

            </div>

          </div>

        </div>

      </section>


      {/* =====================================
          CONTENT
      ===================================== */}

      <section className="single-content-body">

        <div className="single-container">

          <div className="single-content-layout">

            <article className="single-content-article">

              {item.content && (
                <div
                  className="single-content-editor"
                  dangerouslySetInnerHTML={{
                    __html: item.content,
                  }}
                />
              )}

            </article>


            {/* =================================
                SIDEBAR
            ================================= */}

            <aside className="single-content-sidebar">

              <div className="single-content-sidebar__box">

                <span className="single-content-sidebar__eyebrow">
                  {typeLabel}
                </span>

                <h3>
                  Explore more from Resibuild
                </h3>

                <Link
                  href={archiveUrl}
                  className="single-content-sidebar__button"
                >
                  View All {typeLabel}s
                  <span>→</span>
                </Link>

              </div>


              {type === "Events" &&
                item?.eventsPostType?.externalUrl && (
                  <div className="single-content-sidebar__box">

                    <h3>
                      Event Registration
                    </h3>

                    <a
                      href={
                        item.eventsPostType
                          .externalUrl
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="single-content-sidebar__button"
                    >
                      Visit Event
                      <span>→</span>
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