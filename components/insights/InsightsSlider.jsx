"use client";

import React, { useMemo, useState } from "react";

const insights = [
  {
    category: "Insight Magazine",
    title: "Insight Magazine | Issue 1 2024",
    excerpt:
      "Insight Magazine Issue 1 2024 has just launched - are you ready to explore how data drives competency in construction?",
    image: "/images/insights-event-1.jpg",
  },
  {
    category: "Fire",
    title: "Beyond the Skyline: Bringing the Future to you",
    excerpt:
      "Explore industry perspectives and practical insight from Resibuild events.",
    image: "/images/insights-event-1.jpg",
  },
  {
    category: "Design",
    title: "MMC Offsite, Competency and Sustainability",
    excerpt:
      "Latest ideas and discussions from construction industry leaders.",
    image: "/images/insights-event-2.jpg",
  },
  {
    category: "MMC",
    title: "Navigating the Fast-Changing Landscape",
    excerpt:
      "Read insight from people shaping construction, design and compliance.",
    image: "/images/insights-event-2.jpg",
  },
  {
    category: "Insight Magazine",
    title: "Beyond the Skyline: Bringing the Future to you",
    excerpt:
      "Fresh construction insight, events and thought leadership.",
    image: "/images/insights-event-1.jpg",
  },
];

const categories = [
  "All Posts",
  "Insight Magazine",
  "Fire",
  "Design",
  "MMC",
];

const InsightsSlider = () => {
  const [category, setCategory] = useState("All Posts");
  const [current, setCurrent] = useState(0);

  const filtered = useMemo(() => {
    if (category === "All Posts") {
      return insights;
    }

    return insights.filter(
      (item) => item.category === category
    );
  }, [category]);

  const nextSlide = () => {
    setCurrent((prev) =>
      prev >= filtered.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? filtered.length - 1 : prev - 1
    );
  };

  const changeCategory = (item) => {
    setCategory(item);
    setCurrent(0);
  };

  const featured = filtered[current];

  const sideItems = filtered
    .filter((_, index) => index !== current)
    .slice(0, 4);

  return (
    <section
      className="insights-slider-section"
      id="insights-list"
    >
      <div className="home-container">

        <h2>
          <span>News &amp; Insights:</span>{" "}
          Regular blogs to keep you updated on
          <br />
          construction industry expertise!
        </h2>

        <div className="insights-tabs">
          {categories.map((item) => (
            <button
              key={item}
              className={
                category === item ? "is-active" : ""
              }
              onClick={() => changeCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        {featured && (
          <div className="insights-slider-layout">

            <article className="insights-featured">
              <img
                src={featured.image}
                alt={featured.title}
              />

              <div className="insights-featured__content">
                <h3>{featured.title}</h3>

                <p>{featured.excerpt}</p>

                <a href="#">
                  Read More <span>→</span>
                </a>
              </div>
            </article>

            <div className="insights-side-grid">
              {sideItems.map((item, index) => (
                <article
                  className="insights-small-card"
                  key={index}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                  />

                  <div>
                    <h3>{item.title}</h3>

                    <a href="#">
                      Read More <span>→</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>

          </div>
        )}

        <div className="insights-slider-controls">
          <button
            onClick={prevSlide}
            aria-label="Previous"
          >
            ‹
          </button>

          <button
            onClick={nextSlide}
            aria-label="Next"
          >
            ›
          </button>
        </div>

      </div>
    </section>
  );
};

export default InsightsSlider;