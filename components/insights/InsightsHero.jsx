import Link from "next/link";
import styles from "./InsightsHero.module.css";

export default function InsightsHero({ data }) {
  if (!data) return null;

  const {
    video = "",
    title = "",
    description = "",
    buttonText = "",
    buttonUrl = "#",
  } = data;

  return (
    <section className={styles["insight-hero"]}>

      {/* =====================================
          BACKGROUND VIDEO
      ===================================== */}

      {video && (
        <video
          className={styles["insight-hero__video"]}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        >
          <source
            src={video}
            type="video/mp4"
          />
        </video>
      )}

      {/* =====================================
          GRADIENT OVERLAY
      ===================================== */}

      <div
        className={styles["insight-hero__overlay"]}
        aria-hidden="true"
      />

      {/* =====================================
          PATTERN
      ===================================== */}

      <div
        className={styles["insight-hero__pattern"]}
        aria-hidden="true"
      />

      {/* =====================================
          CONTENT CONTAINER
      ===================================== */}

      <div className={styles["insight-hero__container"]}>

        <div className={styles["insight-hero__content"]}>

          {/* HEADING */}

          {title && (
            <h1
              className={styles["insight-hero__title"]}
              dangerouslySetInnerHTML={{
                __html: title,
              }}
            />
          )}

          {/* DESCRIPTION */}

          {description && (
            <p
              className={styles["insight-hero__description"]}
              dangerouslySetInnerHTML={{
                __html: description,
              }}
            />
          )}

          {/* CTA BUTTON */}

          {buttonText && (
            <Link
              href={buttonUrl || "#"}
              className={styles["insight-hero__button"]}
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