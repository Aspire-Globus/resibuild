import React from "react";

export default function Podcast({ data }) {
  return (
    <section className="podcast" id="podcast">
      <img src={data.image} className="podcast__image" alt="" />
      <div className="podcast__shade" />
      <div className="shell podcast__content">
        <span className="kicker kicker--light">Podcast</span>
        <h2>{data.title}</h2>
        <p>{data.text}</p>
        <a className="btn btn--outline-light" href="#contact">{data.button}</a>
      </div>
    </section>
  );
}
