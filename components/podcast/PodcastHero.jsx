import React from "react";

const PodcastHero = () => {
  return (
    <section className="podcast-page-hero">
      <img
        className="podcast-page-hero__image"
        src="/images/podcast-page-hero.jpg"
        alt="Resibuild Podcast"
      />

      <div className="podcast-page-hero__overlay"></div>

      <div className="home-container podcast-page-hero__inner">
        <div className="podcast-page-hero__content">
          <h1>
            The Resibuild
            <br />
            Podcast
          </h1>

          <p>
            Since the initial industry thought leadership events in 2018,
            Resibuild's events have been run both in prestigious venues.
          </p>

          <a href="#podcast-insights">
            Find Out More
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default PodcastHero;