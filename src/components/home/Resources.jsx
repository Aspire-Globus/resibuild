import React from "react";

export default function Resources({ data }) {
  return (
    <section className="resources">
      <div className="shell resources__grid">
        <div className="resources__copy">
          <span className="kicker">News & resources</span>
          <h2>{data.title}</h2>
          <p>{data.text}</p>
          <a className="btn btn--dark" href="#">View all resources</a>
        </div>

        <div className="resources__visual">
          <img src={data.image} alt="" />
        </div>

        <div className="resources__cards">
          {data.cards.map((card, i) => (
            <article key={i} className="resource-card">
              <span>{card.tag}</span>
              <h3>{card.title}</h3>
              <a href="#">Read article →</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
