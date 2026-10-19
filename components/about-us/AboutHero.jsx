import Link from "next/link";
import styles from "./AboutHero.module.css";

export default function AboutHero({ data }) {
  if (!data) return null;

  const {
    video,
    heading,
    description,
    buttonText,
    buttonUrl,
  } = data;

  return (
    <section className={styles["about-hero"]}>

      {/* BACKGROUND VIDEO */}
      {video && (
        <video
          className={styles["about-hero__media"]}
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
        className={styles["about-hero__overlay"]}
        aria-hidden="true"
      />

      {/* CONTENT */}
      <div className={styles["about-hero__inner"]}>
        <div className={styles["about-hero__content"]}>

          {heading && (
            <h1 className={styles["about-hero__heading"]}>
              {heading}
            </h1>
          )}

          {description && (
            <p className={styles["about-hero__description"]}>
              {description}
            </p>
          )}

          {buttonText && (
            <Link
              href={buttonUrl || "#"}
              className={styles["about-hero__button"]}
            >
              <span>{buttonText}</span>
              <span
                className={styles["about-hero__arrow"]}
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