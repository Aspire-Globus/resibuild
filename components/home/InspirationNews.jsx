"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

export default function InspirationNews({ data }) {
  const items = data?.items || [];
  const ITEMS_PER_PAGE = 3;

  const totalPages = Math.max(
    1,
    Math.ceil(items.length / ITEMS_PER_PAGE)
  );

  const [currentPage, setCurrentPage] = useState(0);

  const visibleItems = useMemo(() => {
    const start = currentPage * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;

    return items.slice(start, end);
  }, [items, currentPage]);

  function handlePrevious() {
    setCurrentPage((prev) => {
      if (prev <= 0) {
        return totalPages - 1;
      }

      return prev - 1;
    });
  }

  function handleNext() {
    setCurrentPage((prev) => {
      if (prev >= totalPages - 1) {
        return 0;
      }

      return prev + 1;
    });
  }

  if (!data) return null;

  return (
    <section className="inspiration-news">
      <div className="home-container">

        {/* HEADER */}
        <div className="inspiration-news__header">

          {data.heading && (
            <h2>{data.heading}</h2>
          )}

          {/* ALWAYS SHOW ARROWS */}
          <div className="inspiration-news__controls">

            <button
              type="button"
              onClick={handlePrevious}
              aria-label="Previous insights"
            >
              ‹
            </button>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next insights"
            >
              ›
            </button>

          </div>

        </div>

        {/* CARDS */}
        <div className="inspiration-news__grid">

          {visibleItems.map((item, index) => (
            <article
              className="inspiration-news-card"
              key={
                item.id ||
                `${currentPage}-${index}`
              }
            >

              {item.title && (
                <h3>
                  {item.url ? (
                    <Link href={item.url}>
                      {item.title}
                    </Link>
                  ) : (
                    item.title
                  )}
                </h3>
              )}

              {item.excerpt && (
                <p>
                  {item.excerpt}
                </p>
              )}

              {item.url && (
                <Link
                  href={item.url}
                  className="inspiration-news-card__link"
                >
                  {item.linkLabel || "Read More"}

                  <span className="inspiration-news-card__arrow">
                    →
                  </span>
                </Link>
              )}

            </article>
          ))}

        </div>

      

      </div>
    </section>
  );
}