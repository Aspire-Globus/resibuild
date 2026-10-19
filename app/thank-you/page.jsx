import Link from "next/link";
import styles from "./page.module.css";

export const metadata = {
  title: "Thank You | Resibuild",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ThankYouPage() {
  return (
    <main className={styles["thank-you-page"]}>
      <div className={styles["thank-you-page__container"]}>
        <div
          className={styles["thank-you-page__icon"]}
          aria-hidden="true"
        >
          <svg
            width="38"
            height="38"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M5 12.5L9.5 17L19 7"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h1 className={styles["thank-you-page__title"]}>
          Thank You!
        </h1>

        <h2 className={styles["thank-you-page__subtitle"]}>
          Your message has been received.
        </h2>

        <p className={styles["thank-you-page__description"]}>
          Thank you for contacting Resibuild.
          Our team will review your enquiry
          and get back to you as soon as possible.
        </p>

        <Link
          href="/"
          className={styles["thank-you-page__button"]}
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
              d="M5 12H19M13 6L19 12L13 18"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
    </main>
  );
}