import React from "react";

const ContactIntro = () => {
  return (
    <section className="contact-intro">
      <div className="home-container contact-intro__layout">

        <div className="contact-intro__content">
          <h2>
            Resibuild: Leading Construction
            <br />
            Podcasts Since 2018
          </h2>

          <p>
            Resibuild now brings together thought leaders throughout the
            construction industry to discuss the issues, network with peers
            and suppliers and to listen to a wide range of topical interviews,
            podcasts and accredited CPD&apos;s.
          </p>

          <a href="mailto:events@resi.build" className="contact-email">
            <span>✉</span>
            events@resi.build
          </a>

          <div className="contact-linkedin">
            <strong>Follow on linkedin</strong>

            <a href="#" aria-label="LinkedIn">
              in
            </a>
          </div>
        </div>

        <div className="contact-intro__image">
          <img
            src="/images/contact-side.jpg"
            alt="Resibuild event"
          />
        </div>

      </div>
    </section>
  );
};

export default ContactIntro;