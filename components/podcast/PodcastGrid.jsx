"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const ITEMS_PER_PAGE = 4;

export default function PodcastGrid({
  podcasts = [],
}) {
  const [currentPage, setCurrentPage] =
    useState(1);

  const totalPages =
    Math.ceil(
      podcasts.length /
      ITEMS_PER_PAGE
    );

  const currentItems =
    useMemo(() => {

      const start =
        (currentPage - 1) *
        ITEMS_PER_PAGE;

      return podcasts.slice(
        start,
        start + ITEMS_PER_PAGE
      );

    }, [
      currentPage,
      podcasts,
    ]);

  const changePage = (page) => {

    if (
      page < 1 ||
      page > totalPages
    ) {
      return;
    }

    setCurrentPage(page);

    setTimeout(() => {

      document
        .querySelector(
          ".podcast-listing"
        )
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

    }, 50);

  };

  if (!podcasts.length) {
    return null;
  }

  return (
    <section className="podcast-listing">

      <div className="podcast-container">

        <div className="podcast-listing__heading">

          <h2>
            <span>
              The Resibuild Podcast
            </span>
            {" "} - Finding inspiration
            in every turn
          </h2>

        </div>

        <div className="podcast-grid">

          {currentItems.map(
            (podcast) => (

              <article
                className="podcast-card"
                key={podcast.id}
              >

                <Link
                  href={
                    podcast.url ||
                    "#"
                  }
                  className="podcast-card__image"
                >

                  {podcast.image && (
                    <img
                      src={
                        podcast.image
                      }
                      alt={
                        podcast.imageAlt ||
                        podcast.title ||
                        ""
                      }
                    />
                  )}

                </Link>

                <div className="podcast-card__content">

                  {podcast.title && (
                    <h3>

                      <Link
                        href={
                          podcast.url ||
                          "#"
                        }
                      >
                        {podcast.title}
                      </Link>

                    </h3>
                  )}

                  {podcast.excerpt && (
                    <p>
                      {
                        podcast.excerpt
                      }
                    </p>
                  )}

                  <Link
                    href={
                      podcast.url ||
                      "#"
                    }
                    className="podcast-card__link"
                  >
                    Read More
                    <span>→</span>
                  </Link>

                </div>

              </article>

            )
          )}

        </div>

        {totalPages > 1 && (
          <div className="podcast-pagination">

            <button
              type="button"
              disabled={
                currentPage === 1
              }
              onClick={() =>
                changePage(
                  currentPage - 1
                )
              }
            >
              ‹
            </button>

            {Array.from(
              {
                length:
                  totalPages,
              },
              (_, index) =>
                index + 1
            ).map((page) => (

              <button
                type="button"
                key={page}
                className={
                  currentPage ===
                  page
                    ? "active"
                    : ""
                }
                onClick={() =>
                  changePage(page)
                }
              >
                {page}
              </button>

            ))}

            <button
              type="button"
              disabled={
                currentPage ===
                totalPages
              }
              onClick={() =>
                changePage(
                  currentPage + 1
                )
              }
            >
              ›
            </button>

          </div>
        )}

      </div>

    </section>
  );
}