"use client";

import React, { useState } from "react";

const podcasts = [
  {
    title: "Beyond the Skyline: Bringing the Future to you",
    image: "/images/event-archive-3.png",
  },
  {
    title: "MMC Offsite, Competency and Sustainability",
    image: "/images/event-archive-1.png",
  },
  {
    title: "Navigating the Fast-Changing Landscape",
    image: "/images/event-archive-2.png",
  },
  {
    title: "Beyond the Skyline: Bringing the Future to you",
    image: "/images/event-archive-3.png",
  },
];

const PodcastGrid = () => {
  const [page, setPage] = useState(1);

  return (
    <section className="podcast-grid-section">
      <div className="home-container">

        <div className="podcast-grid-section__heading">
          <div>
            <h2>
              <span>The Resibuild Podcast</span> - Finding
              <br />
              inspiration in every
            </h2>
          </div>

          <a href="#" className="podcast-grid-section__button">
            Find Out More
            <span>→</span>
          </a>
        </div>

        <div className="podcast-grid">
          {podcasts.map((podcast, index) => (
            <article className="podcast-card" key={index}>
              <img src={podcast.image} alt={podcast.title} />

              <div className="podcast-card__overlay"></div>

              <h3>{podcast.title}</h3>
            </article>
          ))}
        </div>

        <div className="podcast-pagination">
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
          >
            ‹
          </button>

          {[1, 2, 3, 4, 5].map((item) => (
            <button
              key={item}
              className={page === item ? "is-active" : ""}
              onClick={() => setPage(item)}
            >
              {item}
            </button>
          ))}

          <button
            onClick={() => setPage(page + 1)}
          >
            ›
          </button>
        </div>

      </div>
    </section>
  );
};

export default PodcastGrid;