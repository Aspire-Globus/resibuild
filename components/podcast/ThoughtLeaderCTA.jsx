import React from "react";

const ThoughtLeaderCTA = () => {
  return (
    <section className="thought-leader-cta">

      <img
        src="/images/thought-leader.jpg"
        alt=""
        className="thought-leader-cta__image"
      />

      <div className="thought-leader-cta__overlay"></div>

      <div className="home-container thought-leader-cta__inner">
        <div className="thought-leader-cta__content">

          <h2>
            Share your insight
            <br />
            as a thought
            <br />
            leader
          </h2>

          <p>
            Join Resibuild conversations and share your knowledge,
            experience and perspective with the construction industry.
          </p>

          <a href="#contact">
            Contact Us
            <span>→</span>
          </a>

        </div>
      </div>

    </section>
  );
};

export default ThoughtLeaderCTA;