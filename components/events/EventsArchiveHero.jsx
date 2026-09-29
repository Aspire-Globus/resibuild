import React from "react";

const EventsArchiveHero = () => {
  return (
    <section className="events-archive-hero">

      <img
        className="events-archive-hero__image"
        src="/images/events-archive-hero.png"
        alt=""
      />

      <div className="events-archive-hero__overlay"></div>

      <div className="home-container events-archive-hero__inner">
        <div className="events-archive-hero__content">

          <h1>On Demand Content</h1>

          <p>
            Since the initial industry thought leadership events in 2018,
            Resibuild's events have been run both in prestigious venues.
          </p>

          <a href="#events-list">
            Find Out More
            <span>→</span>
          </a>

        </div>
      </div>
    </section>
  );
};

export default EventsArchiveHero;