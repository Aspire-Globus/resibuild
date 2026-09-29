import React from "react";

const AboutInsights = () => {
  const stats = [
    {
      number: "920+",
      label: "Latest Podcast Episodes",
    },
    {
      number: "10K+",
      label: "People Educated",
    },
    {
      number: "100+",
      label: "Influencers Interviewed",
    },
  ];

  return (
    <section
      className="about-insights"
      id="about-insights"
    >
      <div className="home-container about-insights__inner">

        <h2>
          Resibuild: Leading Construction
          <br />
          Insights Since 2018
        </h2>

        <p>
          Since the initial industry thought leadership events in 2018,
          Resibuild's events have been run both in prestigious venues and
          virtually to drive best practice across the sector. Resibuild now
          brings together thought leaders throughout the construction industry.
        </p>

        <p>
          Since the initial industry thought leadership events in 2018,
          Resibuild's events have been run both in prestigious venues and
          virtually to drive best practice across the sector. Resibuild now
          brings together thought leaders throughout the construction industry
          to discuss the issues, network with peers and suppliers and to listen
          to a wide range of topical interviews, podcasts and accredited CPD's.
        </p>

        <div className="about-insights__stats">

          {stats.map((stat, index) => (
            <div
              className="about-insights__stat"
              key={index}
            >
              <strong>{stat.number}</strong>

              <span className="about-insights__stat-label">
                {stat.label}
              </span>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default AboutInsights;