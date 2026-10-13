import Link from "next/link";

export default function ThoughtLeaderCTA({
  data,
}) {

  if (!data) return null;

  return (

    <section className="thought-leader-cta">

      <div className="thought-leader-cta__overlay" />

      <div className="thought-leader-cta__pattern" />

      <div className="podcast-container">

        <div className="thought-leader-cta__content">

          {data.heading && (

            <h2
              dangerouslySetInnerHTML={{
                __html: data.heading,
              }}
            />

          )}


          {data.text && (

            <div
              className="thought-leader-cta__text"
              dangerouslySetInnerHTML={{
                __html: data.text,
              }}
            />

          )}


          {data.buttonText && (

            <Link
              href={data.buttonUrl || "#"}
              className="thought-leader-cta__button"
            >

              {data.buttonText}

              <span>
                →
              </span>

            </Link>

          )}

        </div>

      </div>

    </section>

  );

}