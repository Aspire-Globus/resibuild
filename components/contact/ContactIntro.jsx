import styles from "./ContactIntro.module.css";

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

function EmailIcon() {
  return (
    <svg
      width="30"
      height="24"
      viewBox="0 0 30 24"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="1.5"
        y="2.5"
        width="27"
        height="19"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      <path
        d="M2 4L15 13L28 4"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.35V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export default function ContactIntro({ data }) {
  if (!data) return null;

  const {
    title = "",
    text = "",
    image = "",
    imageAlt = "",
    email = "",
    followHeading = "",
    linkedinUrl = "",
  } = data;

  return (
    <section className={styles["contact-intro"]}>
      <div className={styles["contact-intro__container"]}>
        <div className={styles["contact-intro__grid"]}>
          <div className={styles["contact-intro__content"]}>
            {title && (
              <h2
                className={styles["contact-intro__title"]}
                dangerouslySetInnerHTML={{
                  __html: decodeHtml(title),
                }}
              />
            )}

            {text && (
              <p
                className={styles["contact-intro__text"]}
                dangerouslySetInnerHTML={{
                  __html: decodeHtml(text),
                }}
              />
            )}

            {email && (
              <div className={styles["contact-intro__email"]}>
                <EmailIcon />

                <a href={`mailto:${email.trim()}`}>
                  {email}
                </a>
              </div>
            )}

            {(followHeading || linkedinUrl) && (
              <div className={styles["contact-intro__social"]}>
                {followHeading && (
                  <h4 className={styles["contact-intro__social-title"]}>
                    {followHeading}
                  </h4>
                )}

                {linkedinUrl && (
                  <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles["contact-intro__linkedin"]}
                    aria-label="Follow Resibuild on LinkedIn"
                  >
                    <LinkedInIcon />
                  </a>
                )}
              </div>
            )}
          </div>

          {image && (
            <div className={styles["contact-intro__image"]}>
              <img
                src={image}
                alt={
                  imageAlt ||
                  title.replace(/<[^>]*>/g, "") ||
                  ""
                }
                loading="lazy"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}