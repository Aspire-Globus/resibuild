import Link from "next/link";
import WordPressForm from "../../forms/WordPressForm";
import styles from "./Footer.module.css";
import newsletterStyles from "./Footer.css";

export default function Footer({
  data,
  menuItems = [],
}) {
  if (!data) return null;

  const footer1 = data?.footer1 || {};
  const footer2 = data?.footer2 || {};
  const footer3 = data?.footer3 || {};
  const footer4 = data?.footer4 || {};

  /* =========================================
     FOOTER LOGO
  ========================================= */

  const footerLogo =
    footer1?.footerLogo?.node?.sourceUrl || "";

  const footerLogoAlt =
    footer1?.footerLogo?.node?.altText ||
    "Resibuild Events";

  /* =========================================
     NAVIGATION
  ========================================= */

  const topLevelItems = menuItems.filter(
    (item) => !item.parentDatabaseId
  );

  const getUrl = (item) => {
    if (item?.path) {
      return item.path;
    }

    if (!item?.url) {
      return "#";
    }

    try {
      const url = new URL(item.url);

      return `${url.pathname}${url.search}${url.hash}`;
    } catch {
      return item.url;
    }
  };

  /* =========================================
     SOCIAL ICONS
  ========================================= */

  const socialIcons = footer4?.socialIcons || [];

  return (
    <footer className={styles["site-footer"]}>

      {/* MAIN FOOTER */}

      <div className={styles["site-footer__background"]}>

        <div className={styles["site-footer__container"]}>

          {/* COLUMN 1 — ABOUT */}

          <div className={styles["site-footer__about"]}>

            {footerLogo && (
              <Link
                href="/"
                className={styles["site-footer__logo"]}
              >
                <img
                  src={footerLogo}
                  alt={footerLogoAlt}
                />
              </Link>
            )}

            {footer1?.aboutText && (
              <div
                className={styles["site-footer__about-text"]}
                dangerouslySetInnerHTML={{
                  __html: footer1.aboutText,
                }}
              />
            )}

          </div>

          {/* COLUMN 2 — NAVIGATION */}

          <div className={styles["site-footer__column"]}>

            {footer2?.heading && (
              <h3>{footer2.heading}</h3>
            )}

            {topLevelItems.length > 0 && (
              <nav
                className={styles["site-footer__links"]}
                aria-label="Footer navigation"
              >
                {topLevelItems.map((item) => (
                  <Link
                    key={item.id || item.databaseId}
                    href={getUrl(item)}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            )}

          </div>

          {/* COLUMN 3 — CONTACT */}

          <div className={styles["site-footer__column"]}>

            {footer3?.heading && (
              <h3>{footer3.heading}</h3>
            )}

            {footer3?.iconList?.length > 0 && (
              <div className={styles["site-footer__contact-list"]}>

                {footer3.iconList.map((item, index) => {
                  const icon = item?.dashiconClass || "";
                  const text = item?.text || "";
                  const link = item?.link || "";

                  if (!text) return null;

                  const content = (
                    <>
                      {icon && (
                        <span
                          className={`dashicons ${icon}`}
                          aria-hidden="true"
                        />
                      )}

                      <span>{text}</span>
                    </>
                  );

                  return link ? (
                    <a
                      key={index}
                      href={link}
                      className={styles["site-footer__contact-item"]}
                    >
                      {content}
                    </a>
                  ) : (
                    <div
                      key={index}
                      className={styles["site-footer__contact-item"]}
                    >
                      {content}
                    </div>
                  );
                })}

              </div>
            )}

          </div>

          {/* COLUMN 4 — NEWSLETTER */}

          <div
            className={`${styles["site-footer__column"]} ${styles["site-footer__newsletter-column"]}`}
          >

            {footer4?.heading && (
              <h3>{footer4.heading}</h3>
            )}

            {/* Newsletter Form */}

            {footer4?.newsletter && (
              <WordPressForm
                html={footer4.newsletter}
                className={styles["site-footer__newsletter"]}
                successType="inline"
              />
            )}

            {/* Social Icons */}

            {socialIcons.length > 0 && (
              <div className={styles["site-footer__socials"]}>

                {socialIcons.map((item, index) => {
                  const link =
                    item?.url?.url ||
                    item?.url ||
                    "";

                  const icon = item?.icon || "";

                  const alt =
                    item?.url?.title ||
                    icon
                      .replace("dashicons-", "")
                      .replace(/-/g, " ") ||
                    "Social media";

                  if (!link || !icon) {
                    return null;
                  }

                  return (
                    <a
                      href={link}
                      key={index}
                      target={item?.url?.target || "_blank"}
                      rel="noopener noreferrer"
                      aria-label={alt}
                    >
                      <span
                        className={`dashicons ${icon}`}
                        aria-hidden="true"
                      />
                    </a>
                  );
                })}

              </div>
            )}

          </div>

        </div>

      </div>

      {/* COPYRIGHT */}

      {data?.copywriteText && (
        <div className={styles["site-footer__copyright"]}>

          <div className={styles["site-footer__copyright-inner"]}>

            <div
              dangerouslySetInnerHTML={{
                __html: data.copywriteText,
              }}
            />

          </div>

        </div>
      )}

    </footer>
  );
}