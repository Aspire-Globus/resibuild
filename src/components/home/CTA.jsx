import React from "react";

const CTA = ({ data }) => (
  <section className="cta-section" id="contact">
    <div className="container cta-inner">
      <div>
        <span className="eyebrow eyebrow-light">{data.eyebrow}</span>
        <h2>{data.heading}</h2>
      </div>

      <div className="cta-right">
        <p>{data.description}</p>
        <a href={data.button.url} className="button button-light">
          {data.button.label} <span>↗</span>
        </a>
      </div>
    </div>
  </section>
);

export default CTA;
