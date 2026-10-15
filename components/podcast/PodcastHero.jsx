import Link from "next/link";
import styles from "./PodcastHero.module.css";

export default function PodcastHero({ data }) {
  if (!data) return null;

  const {
    video,
    title,
    description,
    buttonText,
    buttonUrl,
  } = data;

  return (
    <section className={styles["podcast-hero"]}>

      {/* BACKGROUND VIDEO */}
      {video && (
        <video
          className={styles["podcast-hero__media"]}
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
        className={styles["podcast-hero__overlay"]}
        aria-hidden="true"
      />

      {/* CONTENT */}
      <div className={styles["podcast-hero__inner"]}>
        <div className={styles["podcast-hero__content"]}>

          {/* HEADING */}
          {title && (
            <h1
              className={styles["podcast-hero__heading"]}
              dangerouslySetInnerHTML={{
                __html: title,
              }}
            />
          )}

          {/* DESCRIPTION */}
          {description && (
            <p
              className={styles["podcast-hero__description"]}
              dangerouslySetInnerHTML={{
                __html: description,
              }}
            />
          )}

          {/* BUTTON */}
          {buttonText && (
            <Link
              href={buttonUrl || "#"}
              className={styles["podcast-hero__button"]}
            >
              <span>{buttonText}</span>

              <span
                className={styles["podcast-hero__arrow"]}
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