import styles from "./AboutWhyChoose.module.css";

export default function AboutWhyChoose({ data }) {
  if (!data) return null;

  const {
    heading,
    description,
    points = [],
    image,
    imageAlt = "",
  } = data;

  return (
    <section className={styles["about-why-choose"]}>
      <div className={styles["about-why-choose__layout"]}>

        {/* =====================================
            LEFT CONTENT
        ===================================== */}

        <div className={styles["about-why-choose__content"]}>

          {/* HEADING */}
          {heading && (
            <h2
              className={styles["about-why-choose__heading"]}
              dangerouslySetInnerHTML={{
                __html: heading,
              }}
            />
          )}

          {/* DESCRIPTION */}
          {description && (
            <p className={styles["about-why-choose__description"]}>
              {description}
            </p>
          )}

          {/* =====================================
              CHECKLIST
          ===================================== */}

          {Array.isArray(points) && points.length > 0 && (
            <ul className={styles["about-why-choose__points"]}>
              {points.map((point, index) => (
                <li
                  key={index}
                  className={styles["about-why-choose__point"]}
                >
                  {/* CHECK ICON */}
                  <span
                    className={styles["about-why-choose__check"]}
                    aria-hidden="true"
                  >
                    <svg
                      width="32"
                      height="33"
                      viewBox="0 0 32 33"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8.71111 12.7626L6.22222 15.2792L14.2222 23.3682L32 5.39266L29.5111 2.87608L14.2222 18.335L8.71111 12.7626ZM28.4444 28.7608H3.55556V3.5951H21.3333V0H3.55556C1.6 0 0 1.6178 0 3.5951V28.7608C0 30.7381 1.6 32.3559 3.55556 32.3559H28.4444C30.4 32.3559 32 30.7381 32 28.7608V14.3804H28.4444V28.7608Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>

                  {/* POINT TEXT */}
                  <span
                    className={
                      styles["about-why-choose__point-text"]
                    }
                  >
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          )}

        </div>

        {/* =====================================
            RIGHT IMAGE
        ===================================== */}

        <div className={styles["about-why-choose__image"]}>
          {image && (
            <img
              src={image}
              alt={imageAlt}
              loading="lazy"
            />
          )}
        </div>

      </div>
    </section>
  );
}