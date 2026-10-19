import Link from "next/link";
import styles from "./UpcomingEvents.module.css";

export default function UpcomingEvents({
  events = [],
}) {
  const eventItems = Array.isArray(events)
    ? events.slice(0, 4)
    : [];

  if (!eventItems.length) return null;

  return (
    <section
      className={styles["podcast-upcoming"]}
      id="podcast-upcoming"
    >
      <div className={styles["podcast-upcoming__container"]}>

        {/* =====================================
            SECTION HEADER
        ===================================== */}

        <div className={styles["podcast-upcoming__header"]}>

          {/* HEADING */}

          <div className={styles["podcast-upcoming__heading"]}>
            <h2>
              <span>Upcoming Events</span>
              {" - Finding inspiration in every turn"}
            </h2>
          </div>

          {/* FIND OUT MORE BUTTON */}

          <Link
            href="/events/"
            className={styles["podcast-upcoming__all"]}
          >
            <span>Find Out More</span>

            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M5 12H19M13 6L19 12L13 18"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>

        </div>

        {/* =====================================
            EVENTS GRID
        ===================================== */}

        <div className={styles["podcast-upcoming__grid"]}>

          {eventItems.map((event, index) => (
            <article
              className={styles["podcast-upcoming__card"]}
              key={event.id ?? index}
            >

              {/* EVENT IMAGE */}

              <Link
                href={event.url || "#"}
                className={styles["podcast-upcoming__image"]}
                aria-label={event.title || "View event"}
              >
                {event.image ? (
                  <img
                    src={event.image}
                    alt={
                      event.imageAlt ||
                      event.title ||
                      ""
                    }
                    loading="lazy"
                  />
                ) : (
                  <div
                    className={styles["podcast-upcoming__placeholder"]}
                  >
                    Resibuild
                  </div>
                )}
              </Link>

              {/* EVENT CONTENT */}

              <div className={styles["podcast-upcoming__content"]}>

                {/* TITLE */}

                {event.title && (
                  <h3 className={styles["podcast-upcoming__title"]}>
                    <Link href={event.url || "#"}>
                      {event.title}
                    </Link>
                  </h3>
                )}

                {/* EXCERPT */}

                {event.excerpt && (
                  <p className={styles["podcast-upcoming__excerpt"]}>
                    {event.excerpt}
                  </p>
                )}

                {/* READ MORE */}

                <Link
                  href={event.url || "#"}
                  className={styles["podcast-upcoming__read"]}
                >
                  <span>Read More</span>

                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M5 12H19M13 6L19 12L13 18"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>

              </div>

            </article>
          ))}

        </div>

      </div>
    </section>
  );
}