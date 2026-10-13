export default function PodcastInsights({
  content = "",
}) {
  if (!content) return null;

  return (
    <section className="podcast-insights">

      <div className="podcast-container">

        <div
          className="podcast-insights__content"
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        />

      </div>

    </section>
  );
}