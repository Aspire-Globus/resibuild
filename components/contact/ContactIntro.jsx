export default function ContactIntro({ data }) {
  if (!data) return null;

  return (
    <section className="contact-intro">

      <div className="contact-container">

        <div className="contact-intro__grid">

          <div className="contact-intro__content">

            {data.title && (
              <h2
                dangerouslySetInnerHTML={{
                  __html: data.title,
                }}
              />
            )}

            {data.text && (
              <div
                className="contact-intro__text"
                dangerouslySetInnerHTML={{
                  __html: data.text,
                }}
              />
            )}

          </div>


          {data.image && (
            <div className="contact-intro__image">

              <img
                src={data.image}
                alt={
                  data.imageAlt ||
                  data.title ||
                  ""
                }
              />

            </div>
          )}

        </div>

      </div>

    </section>
  );
}