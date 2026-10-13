export default function LeadingInsights({ data }) {
  if (!data) return null;

  return (
    <section className="leading-insights">
      <div className="leading-insights__inner">

        <div className="leading-insights__image">
          <img
            src={data.image}
            alt={data.title || ""}
          />
        </div>

        <div className="leading-insights__content">
          <div className="leading-insights__content-inner">

            <h2>{data.title}</h2>

            {data.description && (
              <div className="leading-insights__description">
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

            <div className="leading-insights__stats">

              <div>
                <strong>
                  {data.establishedYear}
                </strong>
                <span>Established</span>
              </div>

              <div>
                <strong>
                  {data.cpdEvents}
                </strong>
                <span>CPD Events</span>
              </div>

              <div>
                <strong>
                  {data.peopleEducated}
                </strong>
                <span>People Educated</span>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}