export default function AboutWhyChoose({ data }) {
  if (!data) return null;

  return (
    <section className="about-why-choose">
      <div className="home-container about-why-choose__layout">

        <div className="about-why-choose__content">

          {data.heading && (
            <h2
              dangerouslySetInnerHTML={{
                __html: data.heading,
              }}
            />
          )}

          {data.description && (
            <p className="about-why-choose__description">
              {data.description}
            </p>
          )}

          {data.points?.length > 0 && (
            <div className="about-why-choose__points">
              {data.points.map((point, index) => (
                <div
                  className="about-why-choose__point"
                  key={index}
                >
                  <span className="about-why-choose__check">
                    ✓
                  </span>

                  <p>{point}</p>
                </div>
              ))}
            </div>
          )}

        </div>

        <div className="about-why-choose__image">
          {data.image && (
            <img
              src={data.image}
              alt={data.imageAlt || ""}
            />
          )}
        </div>

      </div>
    </section>
  );
}