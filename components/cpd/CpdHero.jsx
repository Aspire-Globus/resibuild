import Link from "next/link";

export default function CpdHero({
  data,
}) {
  if (!data) return null;

  return (
    <section className="cpd-hero">

      {data.video && (
        <video
          className="cpd-hero__video"
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

      <div className="cpd-hero__overlay" />

      <div className="cpd-hero__pattern" />

      <div className="cpd-container">

        <div className="cpd-hero__content">

          {data.heading && (
            <h1
              dangerouslySetInnerHTML={{
                __html: data.heading,
              }}
            />
          )}

          {data.description && (
            <div
              className="cpd-hero__description"
              dangerouslySetInnerHTML={{
                __html: data.description,
              }}
            />
          )}

          {data.buttonText && (
            <Link
              href={data.buttonUrl || "#"}
              className="cpd-hero__button"
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