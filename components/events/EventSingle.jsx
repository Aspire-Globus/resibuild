import ClientTestimonial from "../home/ClientTestimonial";
import styles from "./EventSingle.module.css";
import Comments from "../common/Comments/Comments";
export default function EventSingle({
  event,
  testimonials = [],
  testimonialBackgroundImage = "",
}) {
  const acf = event?.eventsPostType || {};

  const banner = acf.bannerSection || {};
  const about = acf.aboutSection || {};
  const sidebar = acf.sidebar || {};

  const featuredImage =
    event?.featuredImage?.node?.sourceUrl || "";

  const featuredImageAlt =
    event?.featuredImage?.node?.altText || "";

  const heroTitle =
    banner.heading || event?.title || "";

  const heroDate =
    banner.subHeading || sidebar.date || "";

  const aboutImage =
    about.image?.node?.sourceUrl || featuredImage;

  const aboutImageAlt =
    about.image?.node?.altText ||
    featuredImageAlt ||
    "Resibuild event";

  const aboutTitle =
    about.aboutTitle || "About the event";

  const aboutDescription =
    about.description || "";

  const eventContent =
    event?.content || "";

  const sidebarDays = Array.isArray(sidebar.days)
    ? sidebar.days
    : [];

  const hasSidebar = Boolean(
    sidebar.event ||
    sidebar.category ||
    sidebar.location ||
    sidebar.date ||
    sidebarDays.length
  );

  return (
    <>
      <main className={styles.eventSingle}>
        <section
          className={styles.hero}
          style={
            featuredImage
              ? {
                  backgroundImage: `url("${featuredImage}")`,
                }
              : undefined
          }
        >
          <div className={styles.heroOverlay} />

          <div className={styles.container}>
            <div className={styles.heroContent}>
              {heroDate && (
                <span className={styles.heroDate}>
                  {heroDate}
                </span>
              )}

              <h1
                dangerouslySetInnerHTML={{
                  __html: heroTitle,
                }}
              />
            </div>
          </div>
        </section>

        <section className={styles.detailsSection}>
          <div className={styles.container}>
            <div className={styles.aboutSection}>
              {aboutImage && (
                <div className={styles.aboutImage}>
                  <img
                    src={aboutImage}
                    alt={aboutImageAlt}
                  />
                </div>
              )}

              {aboutTitle && (
                <h2>{aboutTitle}</h2>
              )}

              {aboutDescription && (
                <p
                  className={styles.aboutDescription}
                  dangerouslySetInnerHTML={{
                    __html: aboutDescription,
                  }}
                />
              )}
            </div>

            <div
              className={`${styles.contentGrid} ${
                !hasSidebar ? styles.noSidebar : ""
              }`}
            >
              {hasSidebar && (
                <aside className={styles.sidebar}>
                  <div className={styles.projectInfoSticky}>
                    <div className={styles.projectInfo}>
                      <ul>
                        {sidebar.event && (
                          <li>
                            <h4>Event:</h4>
                            <p>{sidebar.event}</p>
                          </li>
                        )}

                        {sidebar.category && (
                          <li>
                            <h4>Category:</h4>
                            <p>{sidebar.category}</p>
                          </li>
                        )}

                        {sidebarDays.map((item, index) => (
                          <li key={index}>
                            <h4>{item.day}</h4>
                            <p>{item.event}</p>
                          </li>
                        ))}

                        {sidebar.location && (
                          <li>
                            <h4>Location:</h4>
                            <p
                              dangerouslySetInnerHTML={{
                                __html: sidebar.location,
                              }}
                            />
                          </li>
                        )}

                        {sidebar.date && (
                          <li>
                            <h4>Date:</h4>
                            <p>{sidebar.date}</p>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </aside>
              )}

              <div className={styles.mainContent}>
                {eventContent && (
                  <div
                    className={styles.eventContent}
                    dangerouslySetInnerHTML={{
                      __html: eventContent,
                    }}
                  />
                )}

                <Comments
                  postId={event.databaseId}
                  comments={event.comments?.nodes || []}
                  commentsOpen={
                    event.commentStatus == null
                      ? true
                      : String(event.commentStatus).toLowerCase() === "open"
                  }
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      {testimonials.length > 0 && (
        <ClientTestimonial
          items={testimonials}
          backgroundImage={testimonialBackgroundImage}
        />
      )}
    </>
  );
}