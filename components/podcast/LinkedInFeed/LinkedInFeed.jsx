"use client";

import Script from "next/script";
import styles from "./LinkedinFeed.module.css";

export default function LinkedinFeed() {
  return (
    <section className={styles["linkedin-feed"]}>
      <div className={styles["linkedin-feed__container"]}>
        <div className={styles["linkedin-feed__header"]}>
          <h2 className={styles["linkedin-feed__heading"]}>
            <span>Latest Feeds</span> - Linkedin
          </h2>
        </div>

        <div className={styles["linkedin-feed__widget"]}>
          <div
            className="elfsight-app-87f28532-f5aa-452c-bd30-4eb95a7721f4"
            data-elfsight-app-lazy
          />
        </div>

        <div className={styles["linkedin-feed__footer"]}>
          <a
            href="https://www.linkedin.com/company/resibuild-events/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles["linkedin-feed__button"]}
          >
            <span>Follow Us on LinkedIn</span>

            <svg
              width="25"
              height="10"
              viewBox="0 0 25 10"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M24.4833 4.99996H0.515438C0.230336 4.99996 0 4.77881 0 4.50507C0 4.23134 0.230336 4.01018 0.515438 4.01018H23.2382L20.1101 1.00682C19.9088 0.813504 19.9088 0.499559 20.1101 0.306242C20.3115 0.112926 20.6385 0.112926 20.8398 0.306242L24.8489 4.15556C24.9971 4.29784 25.0406 4.50971 24.9601 4.6953C24.8796 4.87933 24.6911 4.99996 24.4833 4.99996Z"
                fill="currentColor"
              />
              <path
                d="M19.9317 9.83864C19.7839 9.83864 19.6361 9.78278 19.5244 9.66926C19.2992 9.44401 19.2992 9.07821 19.5244 8.85296L24.0153 4.36242C24.2406 4.13717 24.6064 4.13717 24.8317 4.36242C25.0569 4.58767 25.0569 4.95347 24.8317 5.17872L20.3408 9.66926C20.2272 9.78278 20.0795 9.83864 19.9317 9.83864Z"
                fill="currentColor"
              />
            </svg>
          </a>
        </div>
      </div>

      <Script
        src="https://static.elfsight.com/platform/platform.js"
        strategy="afterInteractive"
      />
    </section>
  );
}