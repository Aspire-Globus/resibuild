import Link from "next/link";
import styles from "./CpdHero.module.css";

export default function CpdHero({ data }) {
  if (!data) return null;

  const {
    video = "",
    heading = "",
    description = "",
    buttonText = "",
    buttonUrl = "#",
  } = data;

  return (
    <section className={styles["cpd-hero"]}>

      {/* BACKGROUND VIDEO */}

      {video && (
        <video
          className={styles["cpd-hero__video"]}
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

      {/* GRADIENT OVERLAY */}

      <div
        className={styles["cpd-hero__overlay"]}
        aria-hidden="true"
      />

      {/* DECORATIVE PATTERN */}

      <div
        className={styles["cpd-hero__pattern"]}
        aria-hidden="true"
      />

      {/* CONTENT CONTAINER */}

      <div className={styles["cpd-hero__container"]}>
        <div className={styles["cpd-hero__content"]}>

          {/* HEADING */}

          {heading && (
            <h1
              className={styles["cpd-hero__title"]}
              dangerouslySetInnerHTML={{
                __html: heading,
              }}
            />
          )}

          {/* DESCRIPTION */}

          {description && (
            <div
              className={styles["cpd-hero__description"]}
              dangerouslySetInnerHTML={{
                __html: description,
              }}
            />
          )}

          {/* CTA BUTTON */}

          {buttonText && (
            <Link
              href={buttonUrl || "#"}
              className={styles["cpd-hero__button"]}
            >
              <span>{buttonText}</span>

              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M5 12H19M13 6L19 12L13 18"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          )}

        </div>
      </div>

    </section>
  );
}