import Link from "next/link";

/* =========================================
   DECODE HTML FROM WORDPRESS / ACF
========================================= */

function decodeHtml(html = "") {
  if (!html) return "";

  return html
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&");
}


/* =========================================
   CPD CONTENT SECTION
========================================= */

export default function CpdContentSection({
  data,
  variant = "light",
}) {
  if (!data) return null;

  const items = data.items || [];

  return (
    <section
      className={`cpd-content-section cpd-content-section--${variant}`}
    >
      <div className="cpd-container">

        {/* ================================
            SECTION HEADING
        ================================= */}

        {(data.heading || data.text) && (
          <div className="cpd-content-section__top">

            {data.heading && (
              <h2
                className="cpd-content-section__title"
                dangerouslySetInnerHTML={{
                  __html: decodeHtml(data.heading),
                }}
              />
            )}

            {data.text && (
              <div
                className="cpd-content-section__intro"
                dangerouslySetInnerHTML={{
                  __html: decodeHtml(data.text),
                }}
              />
            )}

          </div>
        )}


        {/* ================================
            CPD ITEMS
        ================================= */}

        {items.length > 0 && (
          <div className="cpd-content-section__list">

            {items.map((item, index) => {
              const reverse =
                index % 2 !== 0;

              return (
                <article
                  key={
                    item.id ||
                    `cpd-item-${index}`
                  }
                  className={`cpd-content-card ${
                    reverse
                      ? "cpd-content-card--reverse"
                      : ""
                  }`}
                >

                  {/* ========================
                      TEXT CONTENT
                  ======================== */}

                  <div className="cpd-content-card__content">

                    {item.heading && (
                      <h3
                        className="cpd-content-card__heading"
                        dangerouslySetInnerHTML={{
                          __html:
                            decodeHtml(
                              item.heading
                            ),
                        }}
                      />
                    )}

                    {item.text && (
                      <div
                        className="cpd-content-card__text"
                        dangerouslySetInnerHTML={{
                          __html:
                            decodeHtml(
                              item.text
                            ),
                        }}
                      />
                    )}


                    {/* ========================
                        BUTTONS
                    ======================== */}

                    {(item.leftButtonText ||
                      item.rightButtonText) && (
                      <div className="cpd-content-card__buttons">

                        {item.leftButtonText && (
                          <Link
                            href={
                              item.leftButtonUrl ||
                              "#"
                            }
                            className="cpd-content-card__button"
                          >
                            <span>
                              {
                                item.leftButtonText
                              }
                            </span>

                            <span aria-hidden="true">
                              →
                            </span>
                          </Link>
                        )}

                        {item.rightButtonText && (
                          <Link
                            href={
                              item.rightButtonUrl ||
                              "#"
                            }
                            className="cpd-content-card__button cpd-content-card__button--secondary"
                          >
                            <span>
                              {
                                item.rightButtonText
                              }
                            </span>

                            <span aria-hidden="true">
                              →
                            </span>
                          </Link>
                        )}

                      </div>
                    )}

                  </div>


                  {/* ========================
                      LOGO / IMAGE
                  ======================== */}

                  <div className="cpd-content-card__image">

                    {item.image && (
                      <img
                        src={item.image}
                        alt={
                          item.imageAlt ||
                          ""
                        }
                        loading="lazy"
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