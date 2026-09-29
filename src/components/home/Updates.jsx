import React from "react";

export default function Updates({ data }) {
  return (
    <section className="updates" id="insights">
      <div className="shell">
        <div className="updates__heading">
          <span className="kicker kicker--light">Latest thinking</span>
          <h2>{data.title}</h2>
        </div>

        <div className="updates__grid">
          {data.items.map((item, i) => (
            <article className="update-card" key={i}>
              <span className="update-card__no">0{i + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <a href="#">Read more →</a>
            </article>
          ))}
          <div className="updates__accent">
            <span>RESI</span>
            <strong>BUILD</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
