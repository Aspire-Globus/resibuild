import styles from "./PodcastAvailable.module.css";

export default function PodcastAvailable({ data }) {
  if (!data) return null;

  const {
    heading = "",
    platforms = [],
  } = data;

  const validPlatforms = Array.isArray(platforms)
    ? platforms.filter((item) => item.image)
    : [];

  if (!heading && validPlatforms.length === 0) {
    return null;
  }

  return (
    <section
      className={styles["podcast-available"]}
      aria-label="Podcast platforms"
    >
      <div className={styles["podcast-available__container"]}>

        <div className={styles["podcast-available__inner"]}>

          {/* LEFT HEADING */}

          {heading && (
            <h3 className={styles["podcast-available__heading"]}>
              <span>{heading}</span>
            </h3>
          )}

          {/* RIGHT PLATFORM LOGOS */}

          {validPlatforms.length > 0 && (
            <div className={styles["podcast-available__platforms"]}>

              {validPlatforms.map((item, index) => {
                const logo = (
                  <img
                    src={item.image}
                    alt={
                      item.imageAlt ||
                      item.title ||
                      "Podcast platform"
                    }
                    loading="lazy"
                  />
                );

                return (
                  <div
                    className={styles["podcast-available__item"]}
                    key={item.id ?? index}
                  >
                    {item.url ? (
                      <a
                        href={item.url}
                        target={item.target || "_blank"}
                        rel={
                          (item.target || "_blank") === "_blank"
                            ? "noopener noreferrer"
                            : undefined
                        }
                        aria-label={
                          item.title ||
                          item.imageAlt ||
                          "Visit podcast platform"
                        }
                      >
                        {logo}
                      </a>
                    ) : (
                      logo
                    )}
                  </div>
                );
              })}

            </div>
          )}

        </div>

      </div>
    </section>
  );
}