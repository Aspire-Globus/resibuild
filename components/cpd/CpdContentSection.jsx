import Link from "next/link";
import styles from "./CpdContentSection.module.css";

function decodeHtml(html = "") {
  if (!html) return "";

  return String(html)
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&");
}

function ArrowIcon() {
  return (
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
  );
}

export default function CpdContentSection({
  data,
  variant = "light",
}) {
  if (!data) return null;

  const items = Array.isArray(data.items) ? data.items : [];
  const sectionVariant = variant === "dark" ? "dark" : "light";

  return (
    <section
      className={[
        styles["cpd-content-section"],
        styles[`cpd-content-section--${sectionVariant}`],
      ].join(" ")}
    >
      <div className={styles["cpd-content-section__container"]}>
        {(data.heading || data.text) && (
          <div className={styles["cpd-content-section__top"]}>
            {data.heading && (
              <h2
                className={styles["cpd-content-section__title"]}
                dangerouslySetInnerHTML={{
                  __html: decodeHtml(data.heading),
                }}
              />
            )}

            {data.text && (
              <div
                className={styles["cpd-content-section__intro"]}
                dangerouslySetInnerHTML={{
                  __html: decodeHtml(data.text),
                }}
              />
            )}
          </div>
        )}

        {items.length > 0 && (
          <div className={styles["cpd-content-section__list"]}>
            {items.map((item, index) => {
              const reverse = index % 2 !== 0;

              return (
                <article
                  key={item.id ?? `cpd-item-${index}`}
                  className={[
                    styles["cpd-content-card"],
                    reverse
                      ? styles["cpd-content-card--reverse"]
                      : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <div className={styles["cpd-content-card__content"]}>
                    {item.heading && (
                      <h3
                        className={styles["cpd-content-card__heading"]}
                        dangerouslySetInnerHTML={{
                          __html: decodeHtml(item.heading),
                        }}
                      />
                    )}

                    {item.text && (
                      <div
                        className={styles["cpd-content-card__text"]}
                        dangerouslySetInnerHTML={{
                          __html: decodeHtml(item.text),
                        }}
                      />
                    )}

                    {(item.leftButtonText || item.rightButtonText) && (
                      <div className={styles["cpd-content-card__buttons"]}>
                        {item.leftButtonText && (
                          <Link
                            href={item.leftButtonUrl || "#"}
                            className={styles["cpd-content-card__button"]}
                          >
                            <span>{item.leftButtonText}</span>
                            <ArrowIcon />
                          </Link>
                        )}

                        {item.rightButtonText && (
                          <Link
                            href={item.rightButtonUrl || "#"}
                            className={[
                              styles["cpd-content-card__button"],
                              styles["cpd-content-card__button--secondary"],
                            ].join(" ")}
                          >
                            <span>{item.rightButtonText}</span>
                            <ArrowIcon />
                          </Link>
                        )}
                      </div>
                    )}
                  </div>

                  <div className={styles["cpd-content-card__image"]}>
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={
                          item.imageAlt ||
                          item.heading?.replace(/<[^>]*>/g, "") ||
                          ""
                        }
                        loading="lazy"
                      />
                    ) : (
                      <div
                        className={styles["cpd-content-card__placeholder"]}
                        aria-hidden="true"
                      />
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}