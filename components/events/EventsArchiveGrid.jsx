"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const EVENTS_PER_PAGE = 12;

export default function EventsArchiveGrid({
  title = "",
  events = [],
}) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(
    1,
    Math.ceil(events.length / EVENTS_PER_PAGE)
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const currentEvents = useMemo(() => {
    const start =
      (currentPage - 1) * EVENTS_PER_PAGE;

    const end =
      start + EVENTS_PER_PAGE;

    return events.slice(start, end);
  }, [events, currentPage]);

  const changePage = (page) => {
    if (page < 1 || page > totalPages) return;

    setCurrentPage(page);

    setTimeout(() => {
      document
        .querySelector(".events-archive")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 50);
  };

  const getPageNumbers = () => {
    if (totalPages <= 7) {
      return Array.from(
        { length: totalPages },
        (_, index) => index + 1
      );
    }

    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, "...", totalPages];
    }

    if (currentPage >= totalPages - 3) {
      return [
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  if (!events.length) {
    return null;
  }

  return (
    <section className="events-archive">

      <div className="events-container">

        {title && (
          <div className="events-archive__heading">
            <h2
              dangerouslySetInnerHTML={{
                __html: title,
              }}
            />
          </div>
        )}

        <div className="events-archive__grid">

          {currentEvents.map((event) => (
            <article
              className="events-archive__card"
              key={event.id}
            >

              <Link
                href={event.url || "#"}
                className="events-archive__image"
              >
                {event.image ? (
                  <img
                    src={event.image}
                    alt={
                      event.imageAlt ||
                      event.title ||
                      ""
                    }
                  />
                ) : (
                  <div className="events-archive__placeholder">
                    Resibuild
                  </div>
                )}
              </Link>

              <div className="events-archive__content">

                {event.title && (
                  <h3>
                    <Link href={event.url || "#"}>
                      {event.title}
                    </Link>
                  </h3>
                )}

                {event.excerpt && (
                  <p>
                    {event.excerpt}
                  </p>
                )}

                <Link
                  href={event.url || "#"}
                  className="events-archive__read-more"
                >
                  Read More

                  <span>
                    →
                  </span>
                </Link>

              </div>

            </article>
          ))}

        </div>

        {totalPages > 1 && (
          <nav
            className="events-pagination"
            aria-label="Events pagination"
          >

            <button
              type="button"
              className="events-pagination__button"
              disabled={currentPage === 1}
              onClick={() =>
                changePage(currentPage - 1)
              }
              aria-label="Previous page"
            >
              ‹
            </button>

            {getPageNumbers().map(
              (page, index) =>
                page === "..." ? (
                  <span
                    className="events-pagination__dots"
                    key={`dots-${index}`}
                  >
                    ...
                  </span>
                ) : (
                  <button
                    type="button"
                    key={page}
                    onClick={() =>
                      changePage(page)
                    }
                    className={`events-pagination__number ${
                      currentPage === page
                        ? "active"
                        : ""
                    }`}
                  >
                    {page}
                  </button>
                )
            )}

            <button
              type="button"
              className="events-pagination__button"
              disabled={
                currentPage === totalPages
              }
              onClick={() =>
                changePage(currentPage + 1)
              }
              aria-label="Next page"
            >
              ›
            </button>

          </nav>
        )}

      </div>

    </section>
  );
}