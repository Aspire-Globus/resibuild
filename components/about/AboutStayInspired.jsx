"use client";

import { useState } from "react";

const tabs = ["Events", "Podcast", "CPD", "Insight"];

const content = {
  Events: [
    {
      title: "Beyond the Skyline: Bringing the Future to you",
      image: "/images/event-archive-3.png",
    },
    {
      title: "Beyond the Skyline: Bringing the Future to you",
      image: "/images/event-archive-3.png",
    },
    {
      title: "Beyond the Skyline: Bringing the Future to you",
      image: "/images/event-archive-3.png",
    },
  ],

  Podcast: [
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
  ],

  CPD: [
    {
      title: "Construction CPD and Industry Learning",
      image: "/images/event-archive-1.png",
    },
    {
      title: "Professional Development for Construction",
      image: "/images/event-archive-2.png",
    },
    {
      title: "Industry Knowledge and Best Practice",
      image: "/images/event-archive-3.png",
    },
  ],

  Insight: [
    {
      title: "Construction Insight and Industry Expertise",
      image: "/images/event-archive-2.png",
    },
    {
      title: "Leading Construction Conversations",
      image: "/images/event-archive-1.png",
    },
    {
      title: "Latest Construction Industry Insight",
      image: "/images/event-archive-3.png",
    },
  ],
};

export default function AboutStayInspired() {
  const [activeTab, setActiveTab] = useState("Events");

  return (
    <section className="about-stay-inspired">
      <div className="home-container">

        <div className="about-stay-inspired__box">

          <h2>
            Staying up-to-date is difficult but combining
            <br />
            this with passion and inspiration is even trickier!
          </h2>

          <div className="about-stay-inspired__tabs">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                className={activeTab === tab ? "is-active" : ""}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="about-stay-inspired__grid">
            {content[activeTab].map((item, index) => (
              <article
                className="about-stay-card"
                key={`${activeTab}-${index}`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                />

                <div className="about-stay-card__content">
                  <h3>{item.title}</h3>
                </div>
              </article>
            ))}
          </div>

        </div>

        <div className="about-stay-inspired__footer">
          <a href="/insights">
            View More
            <span>→</span>
          </a>
        </div>

      </div>
    </section>
  );
}