import styles from "./page.module.css";

export default function Loading() {
  return (
    <main className={styles["search-page"]}>
      <section className={styles["search-page__hero"]}>
        <div className={styles["search-page__container"]}>
          <div className={styles["search-page__intro"]}>
            <div
              className={[
                styles["search-page__skeleton-line"],
                styles["search-page__loading-eyebrow"],
              ].join(" ")}
            />

            <div
              className={[
                styles["search-page__skeleton-line"],
                styles["search-page__loading-title"],
              ].join(" ")}
            />

            <div
              className={[
                styles["search-page__skeleton-line"],
                styles["search-page__loading-description"],
              ].join(" ")}
            />

            <div
              className={styles["search-page__loading-search"]}
            />
          </div>
        </div>
      </section>

      <section className={styles["search-page__results"]}>
        <div className={styles["search-page__container"]}>
          <div
            className={styles["search-page__skeleton"]}
            role="status"
            aria-label="Loading search results"
          >
            <span className={styles["search-page__sr-only"]}>
              Loading search results...
            </span>

            <div
              className={styles["search-page__skeleton-header"]}
            >
              <div
                className={[
                  styles["search-page__skeleton-line"],
                  styles["search-page__skeleton-summary"],
                ].join(" ")}
              />

              <div
                className={[
                  styles["search-page__skeleton-line"],
                  styles["search-page__skeleton-count"],
                ].join(" ")}
              />
            </div>

            <div
              className={styles["search-page__skeleton-grid"]}
            >
              {Array.from({ length: 9 }).map((_, index) => (
                <div
                  key={index}
                  className={
                    styles["search-page__skeleton-card"]
                  }
                  aria-hidden="true"
                >
                  <div
                    className={
                      styles["search-page__skeleton-image"]
                    }
                  />

                  <div
                    className={
                      styles["search-page__skeleton-body"]
                    }
                  >
                    <div
                      className={[
                        styles["search-page__skeleton-line"],
                        styles["search-page__skeleton-category"],
                      ].join(" ")}
                    />

                    <div
                      className={[
                        styles["search-page__skeleton-line"],
                        styles["search-page__skeleton-title"],
                      ].join(" ")}
                    />

                    <div
                      className={[
                        styles["search-page__skeleton-line"],
                        styles["search-page__skeleton-title-short"],
                      ].join(" ")}
                    />

                    <div
                      className={[
                        styles["search-page__skeleton-line"],
                        styles["search-page__skeleton-text"],
                      ].join(" ")}
                    />

                    <div
                      className={[
                        styles["search-page__skeleton-line"],
                        styles["search-page__skeleton-text-short"],
                      ].join(" ")}
                    />

                    <div
                      className={[
                        styles["search-page__skeleton-line"],
                        styles["search-page__skeleton-button"],
                      ].join(" ")}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div
              className={
                styles["search-page__skeleton-pagination"]
              }
            >
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className={
                    styles["search-page__skeleton-page"]
                  }
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}