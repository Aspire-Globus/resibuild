import styles from "./FeaturedSpeakers.module.css";

export default function FeaturedSpeakers({ speakers = [] }) {
  if (!Array.isArray(speakers) || speakers.length === 0) {
    return null;
  }

  return (
    <section className={styles["featured-speakers"]}>
      <div className={styles["featured-speakers__container"]}>
        <h2 className={styles["featured-speakers__heading"]}>
          <span>Featured</span> Speakers
        </h2>

        <div className={styles["featured-speakers__grid"]}>
          {speakers.map((speaker, index) => {
            const {
              name = "",
              image = "",
              imageAlt = "",
              linkedinUrl = "",
              linkedinTitle = "",
              linkedinTarget = "_blank",
            } = speaker;

            return (
              <article
                className={styles["featured-speakers__card"]}
                key={`${name}-${index}`}
              >
                {image && (
                  <img
                    src={image}
                    alt={imageAlt || name}
                    className={styles["featured-speakers__image"]}
                    loading="lazy"
                  />
                )}

                <div
                  className={styles["featured-speakers__overlay"]}
                />

                <div
                  className={styles["featured-speakers__content"]}
                >
                  {name && (
                    <h3
                      className={styles["featured-speakers__name"]}
                    >
                      {name}
                    </h3>
                  )}

                  {linkedinUrl && (
                    <a
                      href={linkedinUrl}
                      target={linkedinTarget || "_blank"}
                      rel={
                        linkedinTarget === "_blank"
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className={styles["featured-speakers__button"]}
                    >
                      <span>
                        {linkedinTitle || "View LinkedIn"}
                      </span>

                      <svg
                        width="20"
                        height="20"
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
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}