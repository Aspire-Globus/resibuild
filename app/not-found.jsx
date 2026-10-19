import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main className={styles["not-found"]}>
      <div
        className={styles["not-found__grid"]}
        aria-hidden="true"
      />

      <div className={styles["not-found__container"]}>
        <div className={styles["not-found__visual"]}>
          <span className={styles["not-found__digit"]}>
            4
          </span>

          <span
            className={`${styles["not-found__digit"]} ${styles["not-found__digit-zero"]}`}
          >
            0
          </span>

          <span className={styles["not-found__digit"]}>
            4
          </span>
        </div>

        <div className={styles["not-found__content"]}>
          <span className={styles["not-found__eyebrow"]}>
            OOPS! SOMETHING WENT WRONG
          </span>

          <h1 className={styles["not-found__title"]}>
            This page is a little
            <br />
            <span>off the blueprint.</span>
          </h1>

          <p className={styles["not-found__description"]}>
            The page you're looking for may have been moved,
            renamed, or doesn't exist. Let's get you back
            on track.
          </p>

          <div className={styles["not-found__actions"]}>
            <Link
              href="/"
              className={styles["not-found__button-primary"]}
            >
              <span>Back to Homepage</span>

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
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>

            <Link
              href="/events/"
              className={styles["not-found__button-secondary"]}
            >
              <span>Explore Events</span>

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
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>

        <div className={styles["not-found__bottom"]}>
          <span className={styles["not-found__bottom-line"]} />
          BUILDING BETTER CONNECTIONS
          <span className={styles["not-found__bottom-line"]} />
        </div>
      </div>
    </main>
  );
}