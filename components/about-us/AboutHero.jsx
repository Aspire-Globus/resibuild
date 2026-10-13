import Link from "next/link";

export default function AboutHero({ data }) {
  if (!data) return null;

  return (
    <section className="about-hero">

      {data.video && (
        <video
          className="about-hero__media"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source
            src={data.video}
            type="video/mp4"
          />
        </video>
      )}

      <div className="about-hero__overlay"></div>

      <div className="home-container about-hero__inner">
        <div className="about-hero__content">

          {data.heading && (
            <h1>
              {data.heading}
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
              className="about-hero__button"
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