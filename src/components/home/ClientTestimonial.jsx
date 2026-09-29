import React from "react";

const ClientTestimonial = ({ data }) => {
  return (
    <section className="client-testimonial">

      <img
        className="client-testimonial__background"
        src={data.backgroundImage}
        alt=""
      />

      <div className="client-testimonial__overlay"></div>

      <div className="home-container client-testimonial__inner">

        <div className="client-testimonial__quote-mark">
          “
        </div>

        <h2>{data.heading}</h2>

        <blockquote>
          {data.quote}
        </blockquote>

        <div className="client-testimonial__author">
          <strong>{data.author}</strong>
          <span>{data.role}</span>
        </div>

        <div className="client-testimonial__end-quote">
          ”
        </div>

      </div>
    </section>
  );
};

export default ClientTestimonial;