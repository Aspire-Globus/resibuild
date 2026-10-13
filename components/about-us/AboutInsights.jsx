export default function AboutInsights({ data }) {
  if (!data) return null;

  return (
    <section className="about-insights">
      <div className="home-container">

        <div className="about-insights__content">
          {data.heading && (
            <h2>
              {data.heading}
            </h2>
          )}

          {data.description && (
            <div className="about-insights__description">
              {String(data.description)
                .split(/\n\s*\n/)
                .filter(Boolean)
                .map((paragraph, index) => (
                  <p key={index}>
                    {paragraph}
                  </p>
                ))}
            </div>
          )}
        </div>

        <div className="about-insights__stats">

          <div className="about-insights__stat">
            <strong>
              {data.establishedYear}
            </strong>
            <span>Established</span>
          </div>

          <div className="about-insights__stat">
            <strong>
              {data.cpdEvents}
            </strong>
            <span>CPD Events</span>
          </div>

          <div className="about-insights__stat">
            <strong>
              {data.peopleEducated}
            </strong>
            <span>People Educated</span>
          </div>

        </div>

      </div>
    </section>
  );
}