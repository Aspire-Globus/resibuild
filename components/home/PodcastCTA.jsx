import React from "react";

const PodcastCTA = ({ data }) => {
  return (
    <section className="podcast-cta" id="podcast">
      <img className="podcast-cta__image" src={data.image} alt="" />
      <div className="podcast-cta__overlay" />

      <div className="home-container podcast-cta__inner">
        <h2>{data.heading}</h2>

        <a className="podcast-cta__button" href={data.buttonUrl}>
          {data.buttonLabel}
        </a>
      </div>
    </section>
  );
};

export default PodcastCTA;
