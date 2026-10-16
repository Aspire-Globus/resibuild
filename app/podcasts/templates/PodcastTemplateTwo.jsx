import { fetchGraphQL } from "../../../lib/graphql";
import { PODCASTS_TWO_QUERY } from "../../../lib/queries/podcastsTwo";
import { HOME_TESTIMONIALS_QUERY } from "../../../lib/queries/testimonials";

import HeroWithPodcast from "../../../components/podcast/HeroWithPodcast/HeroWithPodcast";
import LatestEpisodes from "../../../components/podcast/LatestEpisodes/LatestEpisodes";
import ThoughtLeaderCTA from "../../../components/podcast/ThoughtLeaderCTA";
import ClientTestimonial from "../../../components/home/ClientTestimonial";

import styles from "./PodcastTemplateTwo.module.css";

function getSpotifyUrl(platforms = []) {
  if (!Array.isArray(platforms)) {
    return "";
  }

  const spotifyPlatform = platforms.find((item) => {
    const platformText = [
      item?.link?.url,
      item?.link?.title,
      item?.image?.node?.altText,
      item?.image?.node?.sourceUrl,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return platformText.includes("spotify");
  });

  return spotifyPlatform?.link?.url?.trim() || "";
}

function getPageSpotifyUrl(platforms = []) {
  if (!Array.isArray(platforms)) {
    return "";
  }

  const spotifyPlatform = platforms.find((item) => {
    const platformText = [
      item?.platformLink,
      item?.platformImage?.node?.altText,
      item?.platformImage?.node?.sourceUrl,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return platformText.includes("spotify");
  });

  return spotifyPlatform?.platformLink?.trim() || "";
}

function stripHtml(value = "") {
  return String(value)
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&#038;/gi, "&")
    .replace(/&amp;/gi, "&")
    .replace(/&#8217;/gi, "'")
    .replace(/&#8211;/gi, "–")
    .trim();
}

export default async function PodcastTemplateTwo() {
  let podcastResult = null;
  let testimonialsResult = null;

  try {
    podcastResult = await fetchGraphQL(PODCASTS_TWO_QUERY);
  } catch (error) {
    console.error(
      "Podcast Template Two GraphQL error:",
      error.message
    );
  }

  try {
    testimonialsResult = await fetchGraphQL(
      HOME_TESTIMONIALS_QUERY
    );
  } catch (error) {
    console.error(
      "Podcast testimonials GraphQL error:",
      error.message
    );
  }

  const page = podcastResult?.page || null;

  const fields = page?.podcast || {};

  const bannerContent = fields?.bannerContent || {};

  const hero = {
    title:
      bannerContent.title ||
      "The Resibuild Podcast: Constructive Conversations",

    description: bannerContent.description || "",

    buttonText: bannerContent.buttonText || "Watch Now",

    video:
      bannerContent.backgroundVideo?.node?.mediaItemUrl ||
      bannerContent.backgroundVideo?.node?.sourceUrl ||
      "",

    backgroundImage:
      bannerContent.backgroundImage?.node?.sourceUrl ||
      "",
  };

  const pagePlatforms =
    fields?.podcastAvailable?.podcastAvailableOn || [];

  const pageSpotifyUrl = getPageSpotifyUrl(pagePlatforms);

  const wpPodcasts = podcastResult?.allPodcasts?.nodes || [];

  const podcasts = wpPodcasts.map((item) => {
    const podcastPlatforms =
      item?.podcastsPostType?.podcastAvailable?.availableOn || [];

    const episodeSpotifyUrl = getSpotifyUrl(podcastPlatforms);

    const categories = (
      item?.podcastsCategory?.nodes || []
    ).map((category) => ({
      id: category.databaseId,
      name: category.name,
      slug: category.slug,
    }));

    const podcastAnalysis =
      item?.podcastsPostType?.podcastsAnalysis || {};

    return {
      id: item.databaseId,

      title: stripHtml(item.title || ""),

      excerpt: stripHtml(item.excerpt || ""),

      image:
        item.featuredImage?.node?.sourceUrl || "",

      imageAlt:
        item.featuredImage?.node?.altText || "",

      url: item.uri || "#",

      audioUrl: "",

      spotifyUrl: episodeSpotifyUrl,

      categories,

      analysis: {
        listens: podcastAnalysis.listen ?? null,
        likes: podcastAnalysis.likes ?? null,
        comments: podcastAnalysis.comments ?? null,
      },
    };
  });

  const cta = fields?.ctaSection
    ? {
        heading:
          fields.ctaSection.heading || "",

        text:
          fields.ctaSection.text || "",

        buttonText:
          fields.ctaSection.buttonText || "",

        buttonUrl:
          fields.ctaSection.buttonLink?.url || "#",

        backgroundImage:
          fields.ctaSection.backgroundImage?.node?.sourceUrl ||
          "",
      }
    : null;

  const wpTestimonials =
    testimonialsResult?.allTestimonials?.nodes || [];

  const testimonials = wpTestimonials.map((testimonial) => ({
    id: testimonial.databaseId,

    quote: stripHtml(testimonial.content || ""),

    author:
      testimonial.testimonialFields?.clientName || "",

    role:
      testimonial.testimonialFields?.clientDesignation || "",
  }));

  const testimonialBackgroundImage =
    testimonialsResult?.options
      ?.globalTestimonialSettings
      ?.testimonialBackgroundImage
      ?.node?.sourceUrl || "";

  return (
    <main className={styles["podcasts-template-two"]}>
      <HeroWithPodcast
        hero={hero}
        podcasts={podcasts}
        spotifyUrl={pageSpotifyUrl}
      />

      <LatestEpisodes podcasts={podcasts}/>

      {cta && <ThoughtLeaderCTA data={cta} />}

      {testimonials.length > 0 && (
        <ClientTestimonial
          items={testimonials}
          backgroundImage={testimonialBackgroundImage}
        />
      )}
    </main>
  );
}