import Link from "next/link";

export default function PodcastHero({ data }) {
  if (!data) return null;

  return (
    <section className="podcast-hero">

      {data.video && (
        <video
          className="podcast-hero__video"
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

      <div className="podcast-hero__overlay" />

      <div className="podcast-hero__pattern" />

      <div className="podcast-container">

        <div className="podcast-hero__content">

          {data.title && (
            <h1
              dangerouslySetInnerHTML={{
                __html: data.title,
              }}
            />
          )}

          {data.description && (
            <div
              className="podcast-hero__description"
              dangerouslySetInnerHTML={{
                __html: data.description,
              }}
            />
          )}

          {data.buttonText && (
            <Link
              href={data.buttonUrl || "#"}
              className="podcast-hero__button"
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