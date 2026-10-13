export default function Partners({
  items = [],
}) {
  if (!items.length) return null;

  return (
    <section className="events-partners">
      <div className="home-container">

        <h2>
          Our Partners
        </h2>

        <div className="events-partners__grid">
          {items.map((item) => (
            <div
              className="events-partners__item"
              key={item.id}
            >
              <img
                src={item.image}
                alt={item.imageAlt || ""}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}