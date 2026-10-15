import Link from "next/link";
import styles from "./ContactHero.module.css";

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

export default function ContactHero({ data }) {
  if (!data) return null;

  const {
    video = "",
    heading = "",
    description = "",
    buttonText = "",
    buttonUrl = "#",
  } = data;

  return (
    <section className={styles["contact-hero"]}>
      {video && (
        <video
          className={styles["contact-hero__video"]}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        >
          <source src={video} type="video/mp4" />
        </video>
      )}

      <div
        className={styles["contact-hero__overlay"]}
        aria-hidden="true"
      />

      <div
        className={styles["contact-hero__pattern"]}
        aria-hidden="true"
      />

      <div className={styles["contact-hero__container"]}>
        <div className={styles["contact-hero__content"]}>
          {heading && (
            <h1
              className={styles["contact-hero__title"]}
              dangerouslySetInnerHTML={{
                __html: decodeHtml(heading),
              }}
            />
          )}

          {description && (
            <p
              className={styles["contact-hero__description"]}
              dangerouslySetInnerHTML={{
                __html: decodeHtml(description),
              }}
            />
          )}

          {buttonText && (
            <Link
              href={buttonUrl || "#"}
              className={styles["contact-hero__button"]}
            >
              <span>{buttonText}</span>
              <ArrowIcon />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}