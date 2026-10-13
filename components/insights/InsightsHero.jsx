import Link from "next/link";

export default function InsightHero({ data }) {
  if (!data) return null;

  return (
    <section className="insight-hero">

      {data.video && (
        <video
          className="insight-hero__video"
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

      <div className="insight-hero__overlay" />

      <div className="insight-hero__pattern" />

      <div className="insight-container">
        <div className="insight-hero__content">

          {data.title && (
            <h1
              dangerouslySetInnerHTML={{
                __html: data.title,
              }}
            />
          )}

          {data.description && (
            <div
              className="insight-hero__description"
              dangerouslySetInnerHTML={{
                __html: data.description,
              }}
            />
          )}

          {data.buttonText && (
            <Link
              href={data.buttonUrl || "#"}
              className="insight-hero__button"
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