import ClientTestimonial from "../home/ClientTestimonial";
import styles from "./EventSingle.module.css";

function formatDate(date) {
  if (!date) return "";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  return parsed.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function EventSingle({
  event,
  testimonials = [],
  testimonialBackgroundImage = "",
}) {
  const acf = event?.acf || {};

  const banner = acf.banner_section || {};
  const about = acf.about_section || {};
  const sidebar = acf.sidebar || {};

  const featuredImage =
    event?._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "";

  const heroTitle =
    banner.heading ||
    event?.title?.rendered ||
    "";

  const heroDate =
    banner.sub_heading ||
    sidebar.date ||
    formatDate(event?.date);

  const aboutImage =
    about.image?.url ||
    about.image?.sizes?.large ||
    featuredImage;

  const aboutTitle =
    about.about_title || "About the event";

  const aboutDescription =
    about.description || "";

  const eventContent =
    event?.content?.rendered || "";

  const sidebarDays =
    Array.isArray(sidebar.days)
      ? sidebar.days
      : [];

  const hasSidebar = Boolean(
    sidebar.event ||
    sidebar.category ||
    sidebar.location ||
    sidebar.date ||
    sidebarDays.length > 0
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
                    alt={
                      about.image?.alt ||
                      event?.title?.rendered?.replace(/<[^>]*>/g, "") ||
                      "Resibuild event"
                    }
                  />
                </div>
              )}

              {aboutTitle && (
                <h2>{aboutTitle}</h2>
              )}

              {aboutDescription && (
                <div
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
                            <span>{sidebar.event}</span>
                          </li>
                        )}

                        {sidebar.category && (
                          <li>
                            <h4>Category:</h4>
                            <span>{sidebar.category}</span>
                          </li>
                        )}

                        {sidebarDays.map((day, index) => (
                          <li key={index}>
                            <h4>{day.day}</h4>
                            <span>{day.event}</span>
                          </li>
                        ))}

                        {sidebar.location && (
                          <li>
                            <h4>Location:</h4>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: sidebar.location,
                              }}
                            />
                          </li>
                        )}

                        {sidebar.date && (
                          <li>
                            <h4>Date:</h4>
                            <span>{sidebar.date}</span>
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