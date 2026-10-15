import Link from "next/link";
import styles from "./AboutCoreValues.module.css";

export default function AboutCoreValues({ data }) {
  if (!data) return null;

  const {
    heading,
    buttonText,
    buttonUrl,
    items = [],
  } = data;

  return (
    <section
      className={styles["about-core-values"]}
      id="core-values"
    >
      <div className={styles["about-core-values__container"]}>

        {/* =====================================
            SECTION HEADER
        ===================================== */}

        <div className={styles["about-core-values__header"]}>

          {/* HEADING */}
          {heading && (
            <h2
              className={styles["about-core-values__heading"]}
              dangerouslySetInnerHTML={{
                __html: heading,
              }}
            />
          )}

          {/* BUTTON */}
          {buttonText && (
            <Link
              href={buttonUrl || "#"}
              className={styles["about-core-values__button"]}
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

        {/* =====================================
            CORE VALUES GRID
        ===================================== */}

        {Array.isArray(items) && items.length > 0 && (
          <div className={styles["about-core-values__grid"]}>

            {items.map((item, index) => (
              <article
                className={styles["about-core-value"]}
                key={item.id || index}
              >

                {/* IMAGE */}
                {item.image && (
                  <div
                    className={styles["about-core-value__image"]}
                  >
                    <img
                      src={item.image}
                      alt={item.imageAlt || item.title || ""}
                      loading="lazy"
                    />
                  </div>
                )}

                {/* GRADIENT OVERLAY */}
                <div
                  className={styles["about-core-value__overlay"]}
                  aria-hidden="true"
                />

                {/* CARD CONTENT */}
                <div
                  className={styles["about-core-value__content"]}
                >

                  {item.title && (
                    <h3
                      className={styles["about-core-value__title"]}
                    >
                      {item.title}
                    </h3>
                  )}

                  {item.text && (
                    <p
                      className={styles["about-core-value__text"]}
                    >
                      {item.text}
                    </p>
                  )}

                </div>

              </article>
            ))}

          </div>
        )}

      </div>
    </section>
  );
}