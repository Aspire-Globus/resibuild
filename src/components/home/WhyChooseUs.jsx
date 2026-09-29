import React from "react";

const WhyChooseUs = ({ data }) => (
  <section className="section why-section">
    <div className="container">
      <span className="eyebrow">{data.eyebrow}</span>
      <h2>{data.heading}</h2>

      <div className="why-grid">
        {data.items.map((item, index) => (
          <div className="why-card" key={index}>
            <span className="why-number">{item.number}</span>
            <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
