export default function IndustryUpdates({ data }) {
  if (!data) return null;

  return (
    <section
      className="industry-updates"
      id="insights"
    >
      <div className="home-container">
        <div className="industry-updates__layout">

          <div className="industry-updates__intro">
            <h2>{data.heading}</h2>

            {data.text && (
              <p>{data.text}</p>
            )}

            <a
              href={data.linkUrl || "/insights/"}
            >
              {data.linkLabel || "Explore All Blogs"}
            </a>
          </div>

          <div className="industry-updates__cards">
            {data.items?.map((item, index) => (
              <article
                className="industry-update-card"
                key={item.id || index}
              >
                <a
                  href={item.url || "/insights/"}
                  className="industry-update-card__image"
                >
                  <img
                    src={item.image}
                    alt={item.alt || item.title}
                  />
                </a>

                <div className="industry-update-card__content">
                  <h3>
                    <a
                      href={item.url || "/insights/"}
                    >
                      {item.title}
                    </a>
                  </h3>

                  {item.excerpt && (
                    <p>{item.excerpt}</p>
                  )}

                  <a
                    href={item.url || "/insights/"}
                  >
                    {item.linkLabel || "Read More"}
                  </a>
                </div>
              </article>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}