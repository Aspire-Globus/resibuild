export default function ExternalEnvelope({ data }) {
  if (!data) return null;

  return (
    <section className="external-envelope">
      <div className="external-envelope__layout">

        <div className="external-envelope__visual">
          {data.bookImage && (
            <img
              src={data.bookImage}
              alt={data.heading || "External Envelope"}
            />
          )}
        </div>

        <div className="external-envelope__content">
          <h2>{data.heading}</h2>

          {data.text && (
            <p>{data.text}</p>
          )}

          {data.buttonLabel && (
            <a
              href={data.buttonUrl || "#"}
            >
              {data.buttonLabel}
            </a>
          )}
        </div>

      </div>
    </section>
  );
}