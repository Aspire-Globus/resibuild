import Link from "next/link";

export default function UpcomingEvents({
  events = [],
}) {

  if (!events.length) return null;

  return (

    <section className="podcast-upcoming">

      <div className="podcast-container">


        <div className="podcast-upcoming__header">

          <h2>

            <span>
              Upcoming Events
            </span>

            {" "} - Finding inspiration in every turn

          </h2>


          <Link
            href="/events/"
            className="podcast-upcoming__all"
          >

            Find Out More

            <span>
              →
            </span>

          </Link>

        </div>


        <div className="podcast-upcoming__grid">

          {events.map((event) => (

            <article
              className="podcast-upcoming__card"
              key={event.id}
            >


              <Link
                href={event.url || "#"}
                className="podcast-upcoming__image"
              >

                {event.image && (

                  <img
                    src={event.image}
                    alt={
                      event.imageAlt ||
                      event.title ||
                      ""
                    }
                  />

                )}

              </Link>


              <div className="podcast-upcoming__content">

                <h3>

                  <Link
                    href={event.url || "#"}
                  >
                    {event.title}
                  </Link>

                </h3>


                {event.excerpt && (

                  <p>
                    {event.excerpt}
                  </p>

                )}


                <Link
                  href={event.url || "#"}
                  className="podcast-upcoming__read"
                >

                  Read More

                  <span>
                    →
                  </span>

                </Link>

              </div>


            </article>

          ))}

        </div>

      </div>

    </section>

  );

}