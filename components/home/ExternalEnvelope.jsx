import React from "react";

const ExternalEnvelope = ({ data }) => {
  return (
    <section className="external-envelope">
      <div className="home-container external-envelope__layout">

        <div className="external-envelope__visual">
          <div className="external-envelope__shapes"></div>

          <img
            src={data.bookImage}
            alt="The External Envelope Vision"
          />
        </div>

        <div className="external-envelope__content">
          <h2>{data.heading}</h2>

          <p>{data.text}</p>

          <a href={data.buttonUrl}>
            {data.buttonLabel}
            <span>→</span>
          </a>
        </div>

      </div>
    </section>
  );
};

export default ExternalEnvelope;