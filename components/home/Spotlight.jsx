import React from "react";

export default function Spotlight({ data }) {
  return (
    <section className="spotlight">
      <div className="shell spotlight__grid">
        <div className="spotlight__image">
          <img src={data.image} alt="" />
        </div>
        <div className="spotlight__copy">
          <span className="kicker">Project spotlight</span>
          <h2>{data.title}</h2>
          <p>{data.text}</p>
          <a className="btn btn--lime" href="#">{data.button}</a>
        </div>
      </div>
    </section>
  );
}
