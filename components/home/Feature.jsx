import React from "react";

export default function Feature({ data }) {
  return (
    <section className="feature" id="about">
      <div className="shell feature__grid">
        <div className="feature__image">
          <img src={data.image} alt="" />
        </div>
        <div className="feature__copy">
          <span className="kicker">About Resibuild</span>
          <h2>{data.title}</h2>
          <h3>{data.subtitle}</h3>
          <p>{data.text}</p>
          <div className="feature__stat">
            <strong>{data.stat}</strong>
            <span>{data.statLabel}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
