import React from "react";

export default function Testimonial({ data }) {
  return (
    <section className="testimonial">
      <div className="shell testimonial__inner">
        <div className="testimonial__quote">“</div>
        <blockquote>{data.quote}</blockquote>
        <div className="testimonial__author">
          <strong>{data.author}</strong>
          <span>{data.role}</span>
        </div>
      </div>
    </section>
  );
}
