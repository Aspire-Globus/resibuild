import Link from "next/link";
import WordPressForm from "./forms/WordPressForm";

export default function Footer({
  data,
  menuItems = [],
}) {
  if (!data) return null;

  const footer1 =
    data?.footer1 || {};

  const footer2 =
    data?.footer2 || {};

  const footer3 =
    data?.footer3 || {};

  const footer4 =
    data?.footer4 || {};


  /* =========================================
     LOGO
  ========================================= */

  const footerLogo =
    footer1?.footerLogo?.node
      ?.sourceUrl || "";

  const footerLogoAlt =
    footer1?.footerLogo?.node
      ?.altText || "";


  /* =========================================
     MENU
  ========================================= */

  const topLevelItems =
    menuItems.filter(
      (item) =>
        !item.parentDatabaseId
    );


  /* =========================================
     URL HELPER
  ========================================= */

  const getUrl = (item) => {
    if (item?.path) {
      return item.path;
    }

    if (!item?.url) {
      return "#";
    }

    try {
      const url =
        new URL(item.url);

      return `${url.pathname}${url.search}${url.hash}`;
    } catch {
      return item.url;
    }
  };


  return (
    <footer className="site-footer">

      <div className="site-footer__background">

        <div className="site-footer__container">


          {/* =================================
              FOOTER COLUMN 1
          ================================= */}

          <div className="site-footer__about">

            {footerLogo && (
              <Link
                href="/"
                className="site-footer__logo"
              >
                <img
                  src={footerLogo}
                  alt={footerLogoAlt}
                />
              </Link>
            )}


            {footer1?.aboutText && (
              <div
                className="site-footer__about-text"
                dangerouslySetInnerHTML={{
                  __html:
                    footer1.aboutText,
                }}
              />
            )}

          </div>


          {/* =================================
              FOOTER COLUMN 2
          ================================= */}

          <div className="site-footer__column">

            {footer2?.heading && (
              <h3>
                {footer2.heading}
              </h3>
            )}

            {topLevelItems.length >
              0 && (
              <nav className="site-footer__links">

                {topLevelItems.map(
                  (item) => (
                    <Link
                      key={
                        item.id ||
                        item.databaseId
                      }
                      href={getUrl(
                        item
                      )}
                    >
                      {item.label}
                    </Link>
                  )
                )}

              </nav>
            )}

          </div>


          {/* =================================
              FOOTER COLUMN 3
          ================================= */}

          <div className="site-footer__column">

            {footer3?.heading && (
              <h3>
                {footer3.heading}
              </h3>
            )}

            {footer3?.address && (
              <div
                className="site-footer__address"
                dangerouslySetInnerHTML={{
                  __html:
                    footer3.address,
                }}
              />
            )}

            {footer3?.email && (
              <a
                href={`mailto:${footer3.email}`}
                className="site-footer__email"
              >
                {footer3?.emailIcon && (
                  <img
                    src={
                      footer3.emailIcon
                        ?.node
                        ?.sourceUrl ||
                      footer3.emailIcon
                        ?.sourceUrl ||
                      ""
                    }
                    alt=""
                  />
                )}

                <span>
                  {footer3.email}
                </span>
              </a>
            )}

            {footer3?.phone && (
              <a
                href={`tel:${footer3.phone.replace(
                  /\s+/g,
                  ""
                )}`}
                className="site-footer__phone"
              >
                {footer3?.phoneIcon && (
                  <img
                    src={
                      footer3.phoneIcon
                        ?.node
                        ?.sourceUrl ||
                      footer3.phoneIcon
                        ?.sourceUrl ||
                      ""
                    }
                    alt=""
                  />
                )}

                <span>
                  {footer3.phone}
                </span>
              </a>
            )}

          </div>


          {/* =================================
              FOOTER COLUMN 4
          ================================= */}

          <div className="site-footer__column site-footer__newsletter-column">

            {footer4?.heading && (
              <h3>
                {footer4.heading}
              </h3>
            )}

          
            {footer4?.newsletter && (
              <WordPressForm
                html={footer4.newsletter}
                className="site-footer__newsletter"
                successType="inline"
              />
            )}


            {footer4?.socialIcons
              ?.length > 0 && (
              <div className="site-footer__socials">

                {footer4.socialIcons.map(
                  (
                    item,
                    index
                  ) => {
                    const link =
                      item?.url?.url ||
                      item?.url ||
                      "";

                    const icon =
                      item?.icon?.node
                        ?.sourceUrl ||
                      item?.icon
                        ?.sourceUrl ||
                      "";

                    const alt =
                      item?.icon?.node
                        ?.altText ||
                      item?.icon
                        ?.altText ||
                      item?.url?.title ||
                      "";

                    if (
                      !link ||
                      !icon
                    ) {
                      return null;
                    }

                    return (
                      <a
                        href={link}
                        key={index}
                        target={
                          item?.url
                            ?.target ||
                          "_blank"
                        }
                        rel="noopener noreferrer"
                        aria-label={alt}
                      >
                        <img
                          src={icon}
                          alt={alt}
                        />
                      </a>
                    );
                  }
                )}

              </div>
            )}

          </div>

        </div>

      </div>


      {/* =====================================
          COPYRIGHT
      ===================================== */}

      {data?.copywriteText && (
        <div className="site-footer__copyright">

          <div className="site-footer__copyright-inner">

            <div
              dangerouslySetInnerHTML={{
                __html:
                  data.copywriteText,
              }}
            />

          </div>

        </div>
      )}

    </footer>
  );
}