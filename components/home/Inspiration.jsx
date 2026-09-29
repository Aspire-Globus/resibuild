import React from "react";

export default function Inspiration({ data }) {
  return (
    <section className="inspiration" id="services">
      <div className="shell">
        <div className="section-title">
          <span className="kicker">What we do</span>
          <h2>{data.title}</h2>
        </div>

        <div className="inspiration__grid">
          {data.items.map((item, i) => (
            <article className="inspiration__card" key={i}>
              <img src={item.image} alt="" />
              <div className="inspiration__overlay" />
              <h3>{item.title}</h3>
            </article>
          ))}
        </div>

        <div className="center">
          <a href="#" className="btn btn--lime">View all services</a>
        </div>
      </div>
    </section>
  );
}
