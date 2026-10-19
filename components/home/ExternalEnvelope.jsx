import Link from "next/link";
import styles from "./ExternalEnvelope.module.css";

export default function ExternalEnvelope({ data }) {
  if (!data) return null;

  const {
    heading,
    text,
    bookImage,
    buttonLabel,
    buttonUrl,
  } = data;

  return (
    <section
      className={styles["external-envelope"]}
      id="external-envelope"
    >
      <div className={styles["external-envelope__layout"]}>

        {/* LEFT - BOOK IMAGE */}
        <div className={styles["external-envelope__visual"]}>
          {bookImage && (
            <img
              src={bookImage}
              alt={heading || "External Envelope"}
              loading="lazy"
              className={styles["external-envelope__book"]}
            />
          )}
        </div>

        {/* RIGHT - CONTENT */}
        <div className={styles["external-envelope__content"]}>

          {heading && <h2>{heading}</h2>}

          {text && <p>{text}</p>}

          {buttonLabel && (
            <Link
              href={buttonUrl || "#"}
              className={styles["external-envelope__button"]}
            >
              <span>{buttonLabel}</span>

              <span
                className={styles["external-envelope__arrow"]}
                aria-hidden="true"
              >
                ⟶
              </span>
            </Link>
          )}

        </div>
      </div>
    </section>
  );
}