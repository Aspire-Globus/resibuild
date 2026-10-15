import Link from "next/link";
import styles from "./ThoughtLeaderCTA.module.css";

export default function ThoughtLeaderCTA({ data }) {
  if (!data) return null;

  const {
    heading = "",
    text = "",
    buttonText = "",
    buttonUrl = "#",
    backgroundImage = "",
  } = data;

  return (
    <section className={styles["thought-leader-cta"]}>

      {/* BACKGROUND IMAGE */}

      {backgroundImage && (
        <div
          className={styles["thought-leader-cta__background"]}
          aria-hidden="true"
        >
          <img
            src={backgroundImage}
            alt=""
            loading="lazy"
          />
        </div>
      )}

      {/* CONTENT CONTAINER */}

      <div className={styles["thought-leader-cta__container"]}>

        <div className={styles["thought-leader-cta__content"]}>

          {/* HEADING */}

          {heading && (
            <h2
              className={styles["thought-leader-cta__heading"]}
              dangerouslySetInnerHTML={{
                __html: heading,
              }}
            />
          )}

          {/* DESCRIPTION */}

          {text && (
            <p
              className={styles["thought-leader-cta__text"]}
              dangerouslySetInnerHTML={{
                __html: text,
              }}
            />
          )}

          {/* BUTTON */}

          {buttonText && (
            <Link
              href={buttonUrl}
              className={styles["thought-leader-cta__button"]}
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
                  d="M4 12H20M20 12L14 6M20 12L14 18"
                  stroke="currentColor"
                  strokeWidth="1.5"
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