export default function SpeakerStrip({ data }) {
  if (!data) return null;

  return (
    <section className="speaker-strip">
      <div className="home-container speaker-strip__inner">
        <h3>{data.title}</h3>

        <div className="speaker-strip__logos">
          {data.images?.map((item, index) => (
            <div
              className="speaker-logo"
              key={index}
            >
              <img
                src={item.image}
                alt={
                  item.alt ||
                  `Speaker logo ${index + 1}`
                }
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}