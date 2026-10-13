"use client";

import Link from "next/link";
import { useState } from "react";

export default function AboutStayInspired({
  events = [],
  podcasts = [],
  insights = [],
}) {
  const [activeTab, setActiveTab] = useState("events");

  const tabs = {
    events: {
      label: "Events",
      items: events,
      viewMoreUrl: "/events/",
    },

    podcasts: {
      label: "Podcast",
      items: podcasts,
      viewMoreUrl: "/podcasts/",
    },

    cpd: {
      label: "CPD",
      items: [],
      viewMoreUrl: "/cpd/",
    },

    insights: {
      label: "Insight",
      items: insights,
      viewMoreUrl: "/insights/",
    },
  };

  const currentTab = tabs[activeTab];

  return (
    <section className="about-stay-inspired">
      <div className="about-stay-inspired__inner">

        <div className="about-stay-inspired__header">
          <h2>
            Staying up-to-date is difficult but combining
            this with passion and inspiration is even trickier!
          </h2>

          <div className="about-stay-inspired__tabs">
            {Object.entries(tabs).map(([key, tab]) => (
              <button
                key={key}
                type="button"
                className={
                  activeTab === key
                    ? "active"
                    : ""
                }
                onClick={() => setActiveTab(key)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {currentTab.items.length > 0 ? (
          <div className="about-stay-inspired__grid">
            {currentTab.items
              .slice(0, 3)
              .map((item) => (
                <article
                  className="about-stay-inspired__card"
                  key={item.id}
                >
                  <Link
                    href={item.url || "#"}
                    className="about-stay-inspired__image"
                  >
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.imageAlt || item.title || ""}
                      />
                    )}
                  </Link>

                  <div className="about-stay-inspired__card-content">
                    <h3>
                      <Link href={item.url || "#"}>
                        {item.title}
                      </Link>
                    </h3>
                  </div>
                </article>
              ))}
          </div>
        ) : (
          <div className="about-stay-inspired__empty">
            No content available.
          </div>
        )}

        <div className="about-stay-inspired__footer">
          <Link
            href={currentTab.viewMoreUrl}
            className="about-stay-inspired__view-more"
          >
            View More
            <span>→</span>
          </Link>
        </div>

      </div>
    </section>
  );
}