import styles from "./AboutInsights.module.css";

export default function AboutInsights({ data }) {
  if (!data) return null;

  const stats = [
    {
      value: data.establishedYear,
      label: "Established",
    },
    {
      value: data.cpdEvents,
      label: "CPD Events",
    },
    {
      value: data.peopleEducated,
      label: "People Educated",
    },
  ];

  return (
    <section className={styles["about-insights"]}>
      <div className={styles["about-insights__container"]}>

        {/* HEADING + DESCRIPTION */}
        <div className={styles["about-insights__content"]}>
          {data.heading && (
            <h2 className={styles["about-insights__heading"]}>
              {data.heading}
            </h2>
          )}

          {data.description && (
            <div className={styles["about-insights__description"]}>
              {String(data.description)
                .split(/\n\s*\n/)
                .filter(Boolean)
                .map((paragraph, index) => (
                  <p key={index}>{paragraph.trim()}</p>
                ))}
            </div>
          )}
        </div>

        {/* STATS */}
        <div className={styles["about-insights__stats"]}>
          {stats.map((stat, index) => (
            <div
              className={styles["about-insights__stat"]}
              key={index}
            >
              <strong
                className={styles["about-insights__stat-value"]}
              >
                {stat.value}
              </strong>

              <span
                className={styles["about-insights__stat-label"]}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}