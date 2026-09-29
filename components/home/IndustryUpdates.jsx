import React from "react";

const IndustryUpdates = ({ data }) => {
  return (
    <section className="industry-updates">
      <div className="home-container industry-updates__layout">
        <div className="industry-updates__intro">
          <h2>{data.heading}</h2>
          <p>{data.text}</p>
          <a href="#">{data.linkLabel} →</a>
        </div>

        <div className="industry-updates__cards">
          {data.items.map((item, index) => (
            <article className="industry-update-card" key={index}>
              <img src={item.image} alt="" />
              <div className="industry-update-card__content">
                <h3>{item.title}</h3>
                <a href="#">{item.linkLabel} →</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustryUpdates;
