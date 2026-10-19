import Link from "next/link";
import styles from "./PodcastCTA.module.css";

export default function PodcastCTA({ data }) {
  if (!data) return null;

  const {
    heading = "",
    buttonLabel = "",
    buttonUrl = "#",
    buttonTarget = "_self",
    image = null,
    imageAlt = "",
  } = data;

  return (
    <section
      className={styles["podcast-cta"]}
      id="podcast"
    >
      {/* BACKGROUND IMAGE */}
      {image && (
        <img
          className={styles["podcast-cta__image"]}
          src={image}
          alt={imageAlt}
          loading="lazy"
        />
      )}

      {/* GRADIENT OVERLAY */}
      <div
        className={styles["podcast-cta__overlay"]}
        aria-hidden="true"
      />

      {/* CONTENT */}
      <div className={styles["podcast-cta__inner"]}>
        {heading && (
          <h2 className={styles["podcast-cta__heading"]}>
            {heading}
          </h2>
        )}

        {buttonLabel && (
          <Link
            href={buttonUrl}
            target={buttonTarget}
            rel={
              buttonTarget === "_blank"
                ? "noopener noreferrer"
                : undefined
            }
            className={styles["podcast-cta__button"]}
          >
            {buttonLabel}
          </Link>
        )}
      </div>
    </section>
  );
}