import Link from "next/link";
import Comments from "../../common/Comments/Comments";
import styles from "./InsightsSingle.module.css";
import PodcastCTA from "../../home/PodcastCTA";
import { HOME_PAGE_QUERY } from "../../../lib/queries/home";
import { fetchGraphQL } from "../../../lib/graphql";
import { HOME_TESTIMONIALS_QUERY } from "../../../lib/queries/testimonials";

import ClientTestimonial from "../../../components/home/ClientTestimonial";


const formatDate = (date) => {
  if (!date) return "";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return "";

  return parsedDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const getPostUrl = (post) => {
  return post?.uri || `/insights/${post?.slug || ""}/`;
};

export default async function InsightsSingle({
  insight,
  insights = [],
}) {  

  let homeFields = null;
  let testimonialsResult = null;

try {
  const homeResult = await fetchGraphQL(HOME_PAGE_QUERY);

  homeFields =
    homeResult?.page?.homePageFields ||
    homeResult?.pageBy?.homePageFields ||
    null;
} catch (error) {
  console.error("Homepage CTA GraphQL error:", error.message);
}
try {
    testimonialsResult = await fetchGraphQL(
      HOME_TESTIMONIALS_QUERY
    );
  } catch (error) {
    console.log(
      "Testimonials GraphQL error:",
      error.message
    );
  }

  const categories = insight?.insightsCategories?.nodes || [];
  const featuredImage = insight?.featuredImage?.node;

  const currentIndex = insights.findIndex(
    (item) => item.databaseId === insight.databaseId
  );

  const previousPost =
    currentIndex > 0 ? insights[currentIndex - 1] : null;

  const nextPost =
    currentIndex >= 0 && currentIndex < insights.length - 1
      ? insights[currentIndex + 1]
      : null;

  const recentPosts = insights
    .filter((item) => item.databaseId !== insight.databaseId)
    .slice(0, 6);

  const comments = insight?.comments?.nodes || [];

  
 const podcastCTA = homeFields?.cta
  ? {
      heading:
        homeFields.cta.title || "",

      buttonLabel:
        homeFields.cta.buttonText || "",

      buttonUrl:
        homeFields.cta.buttonUrl?.url || "#",

      buttonTarget:
        homeFields.cta.buttonUrl?.target || "_self",

      image:
        homeFields.cta.overlayImage?.node?.sourceUrl || "",

      imageAlt:
        homeFields.cta.overlayImage?.node?.altText || "",
    }
  : null;

/* =========================
     TESTIMONIALS
  ========================= */

// WordPress testimonial CPT data
const wpTestimonials =
  testimonialsResult?.allTestimonials?.nodes || [];

// Map testimonial content
const testimonials = wpTestimonials.map((testimonial) => ({
  id: testimonial.databaseId,

  quote:
    testimonial.content
      ?.replace(/<[^>]*>/g, "")
      .replace(/&nbsp;/g, " ")
      .trim() || "",

  author:
    testimonial.testimonialFields?.clientName || "",

  role:
    testimonial.testimonialFields?.clientDesignation || "",
}));

// Global background image from ACF Options Page
const testimonialBackgroundImage =
  testimonialsResult?.options
    ?.globalTestimonialSettings
    ?.testimonialBackgroundImage
    ?.node?.sourceUrl || "";



  return (
    <>
      <section className={styles["insights-single__hero"]}>
        <div className={styles["insights-single__container"]}>
          <span className={styles["insights-single__updated"]}>
            Updated: {formatDate(insight.modified || insight.date)}
          </span>

          <h1
            className={styles["insights-single__hero-title"]}
            dangerouslySetInnerHTML={{
              __html: insight.title || "",
            }}
          />
        </div>
      </section>

      <section className={styles["insights-single"]}>
        <div className={styles["insights-single__container"]}>
          <div className={styles["insights-single__grid"]}>
            <main className={styles["insights-single__main"]}>
              <div className={styles["insights-single__image-wrap"]}>
                {featuredImage?.sourceUrl ? (
                  <img
                    src={featuredImage.sourceUrl}
                    alt={featuredImage.altText || insight.title || "Insight"}
                    className={styles["insights-single__image"]}
                  />
                ) : (
                  <div
                    className={styles["insights-single__image-placeholder"]}
                    aria-hidden="true"
                  />
                )}

                {categories.length > 0 && (
                  <div className={styles["insights-single__categories"]}>
                    {categories.map((category) => (
                      <span key={category.databaseId || category.slug}>
                        {category.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className={styles["insights-single__meta"]}>
                <span>{formatDate(insight.date)}</span>
              </div>

              <h2
                className={styles["insights-single__title"]}
                dangerouslySetInnerHTML={{
                  __html: insight.title || "",
                }}
              />

              <div
                className={styles["insights-single__content"]}
                dangerouslySetInnerHTML={{
                  __html: insight.content || "",
                }}
              />

              <nav className={styles["insights-single__navigation"]}>
                {previousPost ? (
                  <Link href={getPostUrl(previousPost)}>
                    ← Previous Post
                  </Link>
                ) : (
                  <span />
                )}

                {nextPost && (
                  <Link href={getPostUrl(nextPost)}>
                    Next Post →
                  </Link>
                )}
              </nav>

              <Comments
                postId={insight.databaseId}
                comments={insight.comments?.nodes || []}
                commentsOpen={
                    insight.commentStatus == null
                    ? true
                    : String(insight.commentStatus).toLowerCase() === "open"
                }
            />
            </main>

            <aside className={styles["insights-single__sidebar"]}>
              <div className={styles["insights-single__sidebar-block"]}>
                <h3>Search</h3>

                <form action="/search" method="GET">
                  <div className={styles["insights-single__search"]}>
                    <input
                      type="search"
                      name="q"
                      placeholder="Search here..."
                      aria-label="Search"
                    />

                    <button type="submit" aria-label="Submit search">
                      →
                    </button>
                  </div>
                </form>
              </div>

              <div className={styles["insights-single__sidebar-block"]}>
                <h3>Recent Posts</h3>

                <div className={styles["insights-single__recent-list"]}>
                  {recentPosts.map((post) => (
                    <article
                      key={post.databaseId}
                      className={styles["insights-single__recent-item"]}
                    >
                      <Link
                        href={getPostUrl(post)}
                        className={styles["insights-single__recent-image-link"]}
                      >
                        {post.featuredImage?.node?.sourceUrl ? (
                          <img
                            src={post.featuredImage.node.sourceUrl}
                            alt={
                              post.featuredImage.node.altText ||
                              post.title ||
                              "Insight"
                            }
                          />
                        ) : (
                          <div
                            className={
                              styles["insights-single__recent-placeholder"]
                            }
                            aria-hidden="true"
                          />
                        )}
                      </Link>

                      <div>
                        <span>{formatDate(post.date)}</span>

                        <h4>
                          <Link
                            href={getPostUrl(post)}
                            dangerouslySetInnerHTML={{
                              __html: post.title || "",
                            }}
                          />
                        </h4>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
      {podcastCTA && (
          <PodcastCTA
            data={podcastCTA}
        />
      )}

      {testimonials.length > 0 && (
        <ClientTestimonial
          items={testimonials} 
          backgroundImage={testimonialBackgroundImage}
        />
      )}
    </>
  );
}