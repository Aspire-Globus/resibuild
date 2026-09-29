import React from "react";

const Services = ({ data }) => (
  <section className="section services-section" id="services">
    <div className="container">
      <div className="section-heading-grid">
        <div>
          <span className="eyebrow">{data.eyebrow}</span>
          <h2>{data.heading}</h2>
        </div>
        <p>{data.description}</p>
      </div>

      <div className="services-list">
        {data.items.map((service, index) => (
          <a href={service.link} className="service-item" key={index}>
            <span className="service-number">{service.number}</span>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <span className="service-arrow">↗</span>
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default Services;
