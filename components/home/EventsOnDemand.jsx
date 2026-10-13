import Link from "next/link";

export default function EventsOnDemand({ data }) {
  const items = data?.items || [];

  if (!data) return null;

  return (
    <section className="events-demand">
      <div className="home-container">

        {/* HEADING + BUTTON */}
        <div className="events-demand__top">

          <div className="events-demand__heading">
            {data.headingPrefix && (
              <span>
                {data.headingPrefix}
              </span>
            )}

            {data.heading && (
              <h2>
                {data.heading}
              </h2>
            )}
          </div>

          {data.buttonLabel && (
            <Link
              href={data.buttonUrl || "/events/"}
              className="events-demand__button"
            >
              {data.buttonLabel}
              <span>→</span>
            </Link>
          )}

        </div>


        {/* EVENT CARDS */}
        <div className="events-demand__grid">

          {items.map((item, index) => (
            <article
              className="event-demand-card"
              key={item.id || index}
            >

              {/* IMAGE */}
              {item.image && (
                <Link
                  href={item.url || "#"}
                  className="event-demand-card__image"
                >
                  <img
                    src={item.image}
                    alt={
                      item.alt ||
                      item.title ||
                      ""
                    }
                  />
                </Link>
              )}


              {/* CONTENT */}
              <div className="event-demand-card__content">

                {/* TITLE */}
                {item.title && (
                  <h3>
                    <Link
                      href={item.url || "#"}
                    >
                      {item.title}
                    </Link>
                  </h3>
                )}


                {/* SHORT DESCRIPTION */}
                {item.excerpt && (
                  <p>
                    {item.excerpt}
                  </p>
                )}


                {/* READ MORE */}
                {item.url && (
                  <Link
                    href={item.url}
                    className="event-demand-card__link"
                  >
                    Read More
                  </Link>
                )}

              </div>

            </article>
          ))}

        </div>

      </div>
    </section>
  );
}