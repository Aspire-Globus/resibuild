import Link from "next/link";

export default function EventsArchiveHero({ data }) {
  if (!data) return null;

  return (
    <section className="events-hero">

      {data.video && (
        <video
          className="events-hero__video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source
            src={data.video}
            type="video/mp4"
          />
        </video>
      )}

      <div className="events-hero__overlay" />

      <div className="events-hero__pattern" />

      <div className="events-container">

        <div className="events-hero__content">

          {data.title && (
            <h1>
              {data.title}
            </h1>
          )}

          {data.description && (
            <p>
              {data.description}
            </p>
          )}

          {data.buttonText && (
            <Link
              href={data.buttonUrl || "#"}
              className="events-hero__button"
            >
              {data.buttonText}
              <span>→</span>
            </Link>
          )}

        </div>

      </div>

    </section>
  );
}