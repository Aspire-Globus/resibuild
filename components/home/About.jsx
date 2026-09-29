import React from "react";

const About = ({ data }) => (
  <section className="section about-section" id="about">
    <div className="container about-grid">
      <div className="about-image">
        <img src={data.image} alt={data.heading} />
        <div className="about-badge">
          <strong>15+</strong>
          <span>Years of experience</span>
        </div>
      </div>

      <div className="about-content">
        <span className="eyebrow">{data.eyebrow}</span>
        <h2>{data.heading}</h2>
        <p>{data.description}</p>
        <p>{data.secondDescription}</p>

        <a href={data.button.url} className="button button-dark">
          {data.button.label} <span>↗</span>
        </a>
      </div>
    </div>
  </section>
);

export default About;
