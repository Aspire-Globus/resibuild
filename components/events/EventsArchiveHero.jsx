import Link from "next/link";
import styles from "./EventsArchiveHero.module.css";

export default function EventsArchiveHero({ data }) {
  if (!data) return null;

  const {
    video,
    title,
    description,
    buttonText,
    buttonUrl,
  } = data;

  return (
    <section className={styles["events-hero"]}>

      {/* BACKGROUND VIDEO */}
      {video && (
        <video
          className={styles["events-hero__media"]}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        >
          <source src={video} type="video/mp4" />
        </video>
      )}

      {/* GREEN GRADIENT OVERLAY */}
      <div
        className={styles["events-hero__overlay"]}
        aria-hidden="true"
      />

      {/* CONTENT */}
      <div className={styles["events-hero__inner"]}>
        <div className={styles["events-hero__content"]}>

          {title && (
            <h1 className={styles["events-hero__heading"]}>
              {title}
            </h1>
          )}

          {description && (
            <p className={styles["events-hero__description"]}>
              {description}
            </p>
          )}

          {buttonText && (
            <Link
              href={buttonUrl || "#"}
              className={styles["events-hero__button"]}
            >
              <span>{buttonText}</span>

              <span
                className={styles["events-hero__arrow"]}
                aria-hidden="true"
              >
                →
              </span>
            </Link>
          )}

        </div>
      </div>

    </section>
  );
}