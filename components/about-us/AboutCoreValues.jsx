import Link from "next/link";

export default function AboutCoreValues({
  data,
}) {
  if (!data) return null;

  return (
    <section className="about-core-values">

      <div className="home-container">

        <div className="about-core-values__header">

          {data.heading && (
            <h2>
              {data.heading}
            </h2>
          )}

          {data.buttonText && (
            <Link
              href={data.buttonUrl || "#"}
              className="about-core-values__button"
            >
              {data.buttonText}

              <span>→</span>
            </Link>
          )}

        </div>

        <div className="about-core-values__grid">

          {data.items?.map(
            (item, index) => (
              <article
                className="about-core-value"
                key={index}
              >

                {item.image && (
                  <div className="about-core-value__image">
                    <img
                      src={item.image}
                      alt={
                        item.imageAlt ||
                        item.title ||
                        ""
                      }
                    />
                  </div>
                )}

                <div className="about-core-value__content">

                  {item.title && (
                    <h3>
                      {item.title}
                    </h3>
                  )}

                  {item.text && (
                    <p>
                      {item.text}
                    </p>
                  )}

                </div>

              </article>
            )
          )}

        </div>

      </div>

    </section>
  );
}