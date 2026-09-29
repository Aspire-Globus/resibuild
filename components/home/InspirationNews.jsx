import React from "react";

const InspirationNews = ({ data }) => {
  return (
    <section className="inspiration-news" id="insights">
      <div className="home-container">
        <div className="inspiration-news__heading">
          <h2>{data.heading}</h2>

          <div className="inspiration-news__controls" aria-hidden="true">
            <span>‹</span>
            <span>›</span>
          </div>
        </div>

        <div className="inspiration-news__grid">
          {data.items.map((item, index) => (
            <article className="inspiration-news__card" key={index}>
              <h3>{item.title}</h3>
              <p>{item.excerpt}</p>
              <a href="#">{item.linkLabel} →</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InspirationNews;
