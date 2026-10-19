import { fetchGraphQL } from "../../lib/graphql";

import { INSIGHTS_PAGE_QUERY } from "../../lib/queries/insights";
import { HOME_PAGE_QUERY } from "../../lib/queries/home";
import { HOME_EVENTS_QUERY } from "../../lib/queries/events";
import { HOME_PODCASTS_QUERY } from "../../lib/queries/podcasts";
import { HOME_TESTIMONIALS_QUERY } from "../../lib/queries/testimonials";

import { homeData } from "../../data/homeData";

import InsightsHero from "../../components/insights/InsightsHero";
import InsightsGrid from "../../components/insights/InsightsGrid";

import InspirationNews from "../../components/home/InspirationNews";
import UpcomingEvents from "../../components/podcast/UpcomingEvents";
import ExternalEnvelope from "../../components/home/ExternalEnvelope";
import ClientTestimonial from "../../components/home/ClientTestimonial";

export const metadata = {
  title: "Insights | Resibuild",
};


/* =========================================
   HELPERS
========================================= */

function decodeHtml(value = "") {
  return value
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&");
}

function stripHtml(value = "") {
  return decodeHtml(value)
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}


/* =========================================
   PAGE
========================================= */

export default async function InsightsPage() {
  let insightResult = null;
  let homeResult = null;
  let eventsResult = null;
  let podcastsResult = null;
  let testimonialsResult = null;

  try {
    [
      insightResult,
      homeResult,
      eventsResult,
      podcastsResult,
      testimonialsResult,
    ] = await Promise.all([
      fetchGraphQL(INSIGHTS_PAGE_QUERY),
      fetchGraphQL(HOME_PAGE_QUERY),
      fetchGraphQL(HOME_EVENTS_QUERY),
      fetchGraphQL(HOME_PODCASTS_QUERY),
      fetchGraphQL(HOME_TESTIMONIALS_QUERY),
    ]);
  } catch (error) {
    console.log(
      "Insights page GraphQL error:",
      error.message
    );
  }


  /* =========================================
     INSIGHTS PAGE ACF
  ========================================= */

  const page =
    insightResult?.page || null;

  const fields =
    page?.insightsPageFields || {};


  /* =========================================
     HERO
  ========================================= */

  const hero = {
    title:
      fields?.bannerSection?.title || "",

    description:
      fields?.bannerSection?.description || "",

    buttonText:
      fields?.bannerSection?.buttonText || "",

    buttonUrl:
      fields?.bannerSection?.buttonLink?.url || "#",

    video:
      fields?.bannerSection?.backgroundVideo?.node?.mediaItemUrl ||
      fields?.bannerSection?.backgroundVideo?.node?.sourceUrl ||
      null,
  };


  /* =========================================
     MAIN INSIGHTS POSTS
  ========================================= */

  const insightNodes =
    insightResult?.allInsights?.nodes || [];

  const insights =
    insightNodes.map((item) => ({
      id:
        item.databaseId,

      title:
        item.title || "",

      url:
        item.uri || "/insights/",

      excerpt:
        stripHtml(item.excerpt || ""),

      image:
        item.featuredImage?.node?.sourceUrl || null,

      imageAlt:
        item.featuredImage?.node?.altText ||
        item.title ||
        "",

      categories:
        item.insightsCategories?.nodes || [],
    }));


  /* =========================================
     HOME PAGE ACF
  ========================================= */

  const homeFields =
    homeResult?.page?.homePageFields || {};


  /* =========================================
     TEAL SLIDER
     REUSE HOME InspirationNews
  ========================================= */

  const wpPodcasts =
    podcastsResult?.allPodcasts?.nodes || [];

  const inspirationItems =
    wpPodcasts.length > 0
      ? wpPodcasts.map((podcast) => ({
          id:
            podcast.databaseId,

          title:
            podcast.title || "",

          excerpt:
            stripHtml(
              podcast.excerpt || ""
            ),

          image:
            podcast.featuredImage?.node?.sourceUrl ||
            null,

          alt:
            podcast.featuredImage?.node?.altText ||
            podcast.title ||
            "",

          url:
            podcast.uri ||
            "/podcasts/",

          linkLabel:
            "Read More",
        }))
      : homeData.inspirationNews?.items || [];

  const inspirationNews = {
    ...homeData.inspirationNews,

    heading:
      homeFields?.podcastSection?.heading ||
      homeData.inspirationNews?.heading ||
      "",

    items:
      inspirationItems,
  };


  /* =========================================
     EVENTS HEADING
  ========================================= */

  const rawEventHeading =
    homeFields?.eventSection?.heading || "";

  const cleanEventHeading =
    stripHtml(rawEventHeading);

  let eventHeadingPrefix =
    homeData.eventsOnDemand?.headingPrefix || "";

  let eventHeading =
    homeData.eventsOnDemand?.heading || "";

  if (cleanEventHeading) {
    const separator = " - ";

    if (cleanEventHeading.includes(separator)) {
      const parts =
        cleanEventHeading.split(separator);

      eventHeadingPrefix =
        parts[0] || "";

      eventHeading =
        parts
          .slice(1)
          .join(separator) || "";
    } else {
      eventHeading =
        cleanEventHeading;
    }
  }

/* =========================================
   UPCOMING EVENTS
   REUSE PODCAST COMPONENT
========================================= */

const wpEvents =
  eventsResult?.allEvents?.nodes || [];

const upcomingEvents = wpEvents
  .slice(0, 4)
  .map((event) => ({
    id: event.databaseId,

    title: event.title || "",

    url: event.uri || "/events/",

    excerpt: stripHtml(event.excerpt || ""),

    image:
      event.featuredImage?.node?.sourceUrl || "",

    imageAlt:
      event.featuredImage?.node?.altText || "",
  }));
  
  /* =========================================
     EXTERNAL ENVELOPE
  ========================================= */

  const externalEnvelope =
    homeFields?.ctaBooking
      ? {
          ...homeData.externalEnvelope,

          bookImage:
            homeFields.ctaBooking.image?.node?.sourceUrl ||
            homeData.externalEnvelope?.bookImage ||
            null,

          heading:
            homeFields.ctaBooking.heading ||
            homeData.externalEnvelope?.heading ||
            "",

          text:
            homeFields.ctaBooking.description ||
            homeData.externalEnvelope?.text ||
            "",

          buttonLabel:
            homeFields.ctaBooking.buttonText ||
            homeData.externalEnvelope?.buttonLabel ||
            "",

          buttonUrl:
            homeFields.ctaBooking.buttonUrl?.url ||
            homeData.externalEnvelope?.buttonUrl ||
            "#",
        }
      : homeData.externalEnvelope;


  /* =========================================
     TESTIMONIALS
  ========================================= */

  const testimonialNodes =
    testimonialsResult?.allTestimonials?.nodes || [];

  const testimonials =
    testimonialNodes.map((item) => ({
      id:
        item.databaseId,

      quote:
        stripHtml(
          item.content || ""
        ),

      author:
        item.testimonialFields?.clientName || "",

      role:
        item.testimonialFields?.clientDesignation || "",
    }));
const testimonialBackgroundImage =
  testimonialsResult?.options
    ?.globalTestimonialSettings
    ?.testimonialBackgroundImage
    ?.node?.sourceUrl || "";

  /* =========================================
     OUTPUT
  ========================================= */

  return (
    <main className="insights-page">

      {/* 1. HERO */}
      <InsightsHero
        data={hero}
      />


      {/* 2. NEWS & INSIGHTS */}
      <InsightsGrid
        title={fields?.filterTitle || ""}
        items={insights}
      />


      {/* 3. TEAL SLIDER */}
      <InspirationNews
        data={inspirationNews}
      />


      {upcomingEvents.length > 0 && (
          <UpcomingEvents
            events={upcomingEvents}
          />
        )}


      {/* 5. EXTERNAL ENVELOPE */}
      <ExternalEnvelope
        data={externalEnvelope}
      />


      {/* 6. TESTIMONIAL */}
      {testimonials.length > 0 && (
        <ClientTestimonial
          items={testimonials}
          backgroundImage={testimonialBackgroundImage}
        />
      )}

    </main>
  );
}