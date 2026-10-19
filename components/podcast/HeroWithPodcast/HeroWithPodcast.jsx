import Link from "next/link";
import sanitizeHtml from "sanitize-html";
import PodcastAudioPlayer from "./PodcastAudioPlayer";
import styles from "./HeroWithPodcast.module.css";

export default function HeroWithPodcast({
  hero = {},
  podcasts = [],
  spotifyUrl = "",
}) {
  const title =
    hero.title ||
    "The Resibuild Podcast: Constructive Conversations";

  const description = hero.description || "";

  const watchUrl = spotifyUrl || "#";

  const backgroundImage = hero.backgroundImage || "";
  const backgroundVideo = hero.video || "";

  const sanitizeContent = (content) =>
    sanitizeHtml(content, {
      allowedTags: [
        "br",
        "strong",
        "b",
        "em",
        "i",
        "span",
        "p",
        "small",
        "sup",
        "sub",
      ],
      allowedAttributes: {
        span: ["class"],
        p: ["class"],
      },
    });

  return (
    <section className={styles.hero}>
      <div className={styles.hero__background}>
        {backgroundVideo ? (
          <video
            className={styles.hero__video}
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={backgroundVideo} />
          </video>
        ) : backgroundImage ? (
          <div
            className={styles.hero__image}
            style={{
              backgroundImage: `url("${backgroundImage}")`,
            }}
          />
        ) : null}
      </div>

      <div className={styles.hero__overlay} />

      <div className={styles.hero__pattern}>
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>

      <div className={styles.hero__container}>
        <div className={styles.hero__content}>
          <h1
            dangerouslySetInnerHTML={{
              __html: sanitizeContent(title),
            }}
          />

          {description && (
            <div
              className={styles.hero__description}
              dangerouslySetInnerHTML={{
                __html: sanitizeContent(description),
              }}
            />
          )}

          {watchUrl !== "#" && (
            <Link
              href={watchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.hero__button}
            >
              <span>{hero.buttonText || "Watch Now"}</span>

              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          )}
        </div>
      </div>

      <div className={styles.hero__playerContainer}>
        <PodcastAudioPlayer podcasts={podcasts} />
      </div>
    </section>
  );
}