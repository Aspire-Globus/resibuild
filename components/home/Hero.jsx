import React from "react";

export default function Hero({ data }) {
  return (
    <section className="hero">
      <img className="hero__image" src={data.image} alt="" />
      <div className="hero__shade" />
      <div className="shell hero__content">
        <span className="kicker kicker--light">{data.eyebrow}</span>
        <h1>{data.title}</h1>
        <p>{data.text}</p>
        <a className="btn btn--lime" href="#services">{data.button}</a>
      </div>
    </section>
  );
}
