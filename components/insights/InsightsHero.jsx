import React from "react";

const InsightsHero = () => {
  return (
    <section className="insights-page-hero">
      <img
        src="/images/insights-event-2.jpg"
        alt=""
        className="insights-page-hero__image"
      />

      <div className="insights-page-hero__overlay"></div>

      <div className="home-container insights-page-hero__inner">
        <div className="insights-page-hero__content">
          <h1>
            The Resibuild
            <br />
            Insights
          </h1>

          <p>
            Since the initial industry thought leadership events in 2018,
            Resibuild&apos;s events have been run both in prestigious venues.
          </p>

          <a href="#insights-list">
            Find Out More
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default InsightsHero;