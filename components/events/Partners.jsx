import styles from "./Partners.module.css";

export default function Partners({ items = [] }) {
  const partners = Array.isArray(items) ? items : [];

  if (!partners.length) return null;

  return (
    <section
      className={styles["events-partners"]}
      id="events-partners"
    >
      <div className={styles["events-partners__container"]}>

        {/* SECTION HEADING */}
        <h2 className={styles["events-partners__heading"]}>
          Our Partners
        </h2>

        {/* PARTNERS GRID */}
        <div className={styles["events-partners__grid"]}>
          {partners.map((item, index) => {
            if (!item.image) return null;

            return (
              <div
                className={styles["events-partners__item"]}
                key={item.id ?? index}
              >
                <img
                  src={item.image}
                  alt={item.imageAlt || "Partner logo"}
                  loading="lazy"
                />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}