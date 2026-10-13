"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

function decodeHtml(value = "") {
  return value
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&");
}

export default function InsightsGrid({
  title = "",
  items = [],
}) {
  const [activeCategory, setActiveCategory] =
    useState("all");

  const categories = useMemo(() => {
    const map = new Map();

    items.forEach((item) => {
      item.categories?.forEach((category) => {
        if (
          category?.slug &&
          category?.name
        ) {
          map.set(
            category.slug,
            category.name
          );
        }
      });
    });

    return Array.from(map.entries()).map(
      ([slug, name]) => ({
        slug,
        name,
      })
    );
  }, [items]);

  const filteredItems = useMemo(() => {
    if (activeCategory === "all") {
      return items;
    }

    return items.filter((item) =>
      item.categories?.some(
        (category) =>
          category.slug === activeCategory
      )
    );
  }, [items, activeCategory]);

  const visibleItems =
    filteredItems.slice(0, 5);

  const featured =
    visibleItems[0] || null;

  const smallItems =
    visibleItems.slice(1, 5);

  return (
    <section className="insights-listing">

      <div className="insight-container">

        {/* =========================
            DYNAMIC TITLE
        ========================= */}

        {title && (
          <div className="insights-listing__heading">
            <h2
              dangerouslySetInnerHTML={{
                __html:
                  decodeHtml(title),
              }}
            />
          </div>
        )}


        {/* =========================
            CATEGORY FILTERS
        ========================= */}

        <div className="insights-filters">

          <button
            type="button"
            className={
              activeCategory === "all"
                ? "active"
                : ""
            }
            onClick={() =>
              setActiveCategory("all")
            }
          >
            All Posts
          </button>

          {categories.map((category) => (
            <button
              type="button"
              key={category.slug}
              className={
                activeCategory ===
                category.slug
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActiveCategory(
                  category.slug
                )
              }
            >
              {category.name}
            </button>
          ))}

        </div>


        {/* =========================
            FEATURED + 4 SMALL CARDS
        ========================= */}

        {featured ? (
          <div className="insights-featured-layout">

            {/* BIG LEFT CARD */}

            <article className="insight-featured-card">

              {featured.image && (
                <Link
                  href={
                    featured.url || "#"
                  }
                  className="insight-featured-card__image"
                >
                  <img
                    src={featured.image}
                    alt={
                      featured.imageAlt ||
                      featured.title ||
                      ""
                    }
                  />
                </Link>
              )}

              <div className="insight-featured-card__content">

                <h3>
                  <Link
                    href={
                      featured.url || "#"
                    }
                  >
                    {featured.title}
                  </Link>
                </h3>

                {featured.excerpt && (
                  <p>
                    {featured.excerpt}
                  </p>
                )}

                <Link
                  href={
                    featured.url || "#"
                  }
                  className="insight-read-more"
                >
                  Read More
                  <span>→</span>
                </Link>

              </div>

            </article>


            {/* RIGHT 2 x 2 CARDS */}

            <div className="insights-small-grid">

              {smallItems.map((item) => (
                <article
                  className="insight-small-card"
                  key={item.id}
                >

                  {item.image && (
                    <Link
                      href={
                        item.url || "#"
                      }
                      className="insight-small-card__image"
                    >
                      <img
                        src={item.image}
                        alt={
                          item.imageAlt ||
                          item.title ||
                          ""
                        }
                      />
                    </Link>
                  )}

                  <div className="insight-small-card__content">

                    <h3>
                      <Link
                        href={
                          item.url || "#"
                        }
                      >
                        {item.title}
                      </Link>
                    </h3>

                    <Link
                      href={
                        item.url || "#"
                      }
                      className="insight-read-more"
                    >
                      Read More
                      <span>→</span>
                    </Link>

                  </div>

                </article>
              ))}

            </div>

          </div>
        ) : (
          <p className="insights-empty">
            No insights found.
          </p>
        )}

      </div>

    </section>
  );
}