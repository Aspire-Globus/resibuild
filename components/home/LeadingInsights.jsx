import styles from "./LeadingInsights.module.css";

export default function LeadingInsights({ data }) {
  if (!data) return null;

  const image = data.image || null;

  const paragraphs = data.description
    ? String(data.description)
        .split(/\r?\n\s*\r?\n/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean)
    : [];

  return (
    <section className={styles["leading-insights"]}>
      <div className={styles["leading-insights__inner"]}>

        {/* LEFT IMAGE */}
        <div className={styles["leading-insights__image"]}>
          {image && (
            <img
              src={image}
              alt={data.title || "Resibuild Events"}
              loading="lazy"
            />
          )}
        </div>

        {/* RIGHT CONTENT */}
        <div className={styles["leading-insights__content"]}>
          <div className={styles["leading-insights__content-inner"]}>

            {/* HEADING */}
            {data.title && (
              <h2>{data.title}</h2>
            )}

            {/* DESCRIPTION */}
            {paragraphs.length > 0 && (
              <div className={styles["leading-insights__description"]}>
                {paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            )}

            {/* STATISTICS */}
            <div className={styles["leading-insights__stats"]}>

              <div className={styles["leading-insights__stat"]}>
                <strong>{data.establishedYear}</strong>
                <span>Established</span>
              </div>

              <div className={styles["leading-insights__stat"]}>
                <strong>{data.cpdEvents}</strong>
                <span>CPD Events</span>
              </div>

              <div className={styles["leading-insights__stat"]}>
                <strong>{data.peopleEducated}</strong>
                <span>People Educated</span>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}