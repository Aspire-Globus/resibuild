import React from "react";

const LeadingInsights = ({ data }) => {
  return (
    <>
      <section className="leading-insights" id="about">
        <div className="leading-insights__image">
          <img
            src={data.image}
            alt="Resibuild construction event"
          />
        </div>

        <div className="leading-insights__content">
          <div className="leading-insights__content-inner">
            <h2>{data.heading}</h2>

            <p>{data.description}</p>

            <p>{data.descriptionTwo}</p>

            <div className="leading-insights__stats">
              {data.stats.map((stat, index) => (
                <div
                  className="leading-insights__stat"
                  key={index}
                >
                  <strong>{stat.number}</strong>

                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="speaker-strip">
        <div className="home-container speaker-strip__inner">
          <h3>Speakers from our Events include</h3>

          <div className="speaker-strip__logos">
            <div className="speaker-logo">
              SAPPHIRE.
            </div>

            <div className="speaker-logo">
              SIDERISE
            </div>

            <div className="speaker-logo">
              MYD
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LeadingInsights;