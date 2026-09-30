import React from "react";

const ContactHero = () => {
  return (
    <section className="contact-page-hero">
      <img
        className="contact-page-hero__image"
        src="/images/contact-hero.jpg"
        alt=""
      />

      <div className="contact-page-hero__overlay"></div>

      <div className="home-container contact-page-hero__inner">
        <div className="contact-page-hero__content">
          <h1>
            The Resibuild
            <br />
            Contact Us
          </h1>

          <p>
            Since the initial industry thought leadership events in 2018,
            Resibuild&apos;s events have been run both in prestigious venues.
          </p>

          <a href="#contact-form">
            Find Out More
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;