import React from "react";

const AboutHero = () => {
  return (
    <section className="about-page-hero">

      <img
        className="about-page-hero__image"
        src="/images/about-hero.png"
        alt=""
      />

      <div className="about-page-hero__overlay"></div>

      <div className="home-container about-page-hero__inner">

        <div className="about-page-hero__content">

          <h1>About Resibuild</h1>

          <p>
            Since the initial industry thought leadership events in 2018,
            Resibuild's events have been run both in prestigious venues.
          </p>

          <a href="#about-insights">
            Find Out More
            <span>→</span>
          </a>

        </div>
      </div>

    </section>
  );
};

export default AboutHero;