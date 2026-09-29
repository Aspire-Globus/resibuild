"use client";

import React, { useState } from "react";

const events = [
  {
    title: "Beyond the Skyline: Bringing the Future to you",
    image: "/images/event-archive-1.png",
  },
  {
    title: "MMC Offsite, Competency and Sustainability",
    image: "/images/event-archive-2.png",
  },
  {
    title: "Navigating the Fast-Changing Landscape",
    image: "/images/event-archive-3.png",
  },
  {
    title: "Beyond the Skyline: Bringing the Future to you",
    image: "/images/event-archive-1.png",
  },
  {
    title: "MMC Offsite, Competency and Sustainability",
    image: "/images/event-archive-2.png",
  },
  {
    title: "Navigating the Fast-Changing Landscape",
    image: "/images/event-archive-3.png",
  },
  {
    title: "Beyond the Skyline: Bringing the Future to you",
    image: "/images/event-archive-1.png",
  },
  {
    title: "MMC Offsite, Competency and Sustainability",
    image: "/images/event-archive-2.png",
  },
  {
    title: "Navigating the Fast-Changing Landscape",
    image: "/images/event-archive-3.png",
  },
];

const EventsArchiveGrid = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = 10;

  return (
    <section
      className="events-archive-list"
      id="events-list"
    >
      <div className="home-container">

        <div className="events-archive-list__heading">
          <h2>
            <span>Events On Demand</span> - Finding
            <br />
            inspiration in every turn
          </h2>
        </div>

        <div className="events-archive-grid">
          {events.map((event, index) => (
            <article
              className="events-archive-card"
              key={index}
            >
              <div className="events-archive-card__image">
                <img
                  src={event.image}
                  alt={event.title}
                />
              </div>

              <div className="events-archive-card__content">
                <h3>{event.title}</h3>

                <p>
                  Resibuild Events teamed up with the Institute
                  of Construction Management to bring a...
                </p>

                <a href="#">
                  Read More
                  <span>→</span>
                </a>
              </div>
            </article>
          ))}
        </div>


        <div className="events-pagination">

          <button
            onClick={() =>
              setCurrentPage((prev) =>
                Math.max(prev - 1, 1)
              )
            }
            disabled={currentPage === 1}
          >
            ‹
          </button>

          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              className={
                currentPage === page
                  ? "is-active"
                  : ""
              }
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}

          <span>...</span>

          <button
            onClick={() => setCurrentPage(10)}
            className={
              currentPage === 10
                ? "is-active"
                : ""
            }
          >
            10
          </button>

          <button
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min(prev + 1, totalPages)
              )
            }
            disabled={currentPage === totalPages}
          >
            ›
          </button>

        </div>

      </div>
    </section>
  );
};

export default EventsArchiveGrid;   