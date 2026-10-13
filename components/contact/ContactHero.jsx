import Link from "next/link";

export default function ContactHero({ data }) {
  if (!data) return null;

  return (
    <section className="contact-hero">

      {data.video && (
        <video
          className="contact-hero__video"
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

      <div className="contact-hero__overlay" />

      <div className="contact-hero__pattern" />

      <div className="contact-container">
        <div className="contact-hero__content">

          {data.heading && (
            <h1
              dangerouslySetInnerHTML={{
                __html: data.heading,
              }}
            />
          )}

          {data.description && (
            <div
              className="contact-hero__description"
              dangerouslySetInnerHTML={{
                __html: data.description,
              }}
            />
          )}

          {data.buttonText && (
            <Link
              href={data.buttonUrl || "#"}
              className="contact-hero__button"
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