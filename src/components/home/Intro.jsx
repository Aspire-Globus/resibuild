import React from "react";

const Intro = ({ data }) => (
  <section className="section intro-section">
    <div className="container">
      <div className="intro-grid">
        <div>
          <span className="eyebrow">{data.eyebrow}</span>
        </div>

        <div className="intro-content">
          <h2>{data.heading}</h2>
          <p>{data.description}</p>
        </div>
      </div>

      <div className="stats-grid">
        {data.stats.map((stat, index) => (
          <div className="stat-item" key={index}>
            <strong>{stat.number}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Intro;
