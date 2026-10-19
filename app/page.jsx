import HeroSlider from "../components/home/HeroSlider";
import LeadingInsights from "../components/home/LeadingInsights";
import SpeakerStrip from "../components/home/SpeakerStrip";
import EventsOnDemand from "../components/home/EventsOnDemand";
import PodcastCTA from "../components/home/PodcastCTA";
import InspirationNews from "../components/home/InspirationNews";
import IndustryUpdates from "../components/home/IndustryUpdates";
import ExternalEnvelope from "../components/home/ExternalEnvelope";
import ClientTestimonial from "../components/home/ClientTestimonial";


import { fetchGraphQL } from "../lib/graphql";
import { HOME_PAGE_QUERY } from "../lib/queries/home";
import { HOME_EVENTS_QUERY } from "../lib/queries/events";
import { HOME_PODCASTS_QUERY } from "../lib/queries/podcasts";
import { HOME_INSIGHTS_QUERY } from "../lib/queries/insights";
import { HOME_TESTIMONIALS_QUERY } from "../lib/queries/testimonials";

export default async function HomePage() {
  let wpFields = null;
  let wpEvents = [];
  let wpPodcasts = [];
  let wpInsights = [];
  let wpTestimonials = [];

  /* =========================================================
     HOME ACF
  ========================================================= */

  try {
    const homeResult =
      await fetchGraphQL(HOME_PAGE_QUERY);

    wpFields =
      homeResult?.page?.homePageFields || null;
  } catch (error) {
    console.log(
      "Home query error:",
      error.message
    );
  }

  /* =========================================================
     EVENTS
  ========================================================= */

  try {
    const eventsResult =
      await fetchGraphQL(HOME_EVENTS_QUERY);

    wpEvents =
      eventsResult?.allEvents?.nodes || [];
  } catch (error) {
    console.log(
      "Events query error:",
      error.message
    );
  }

  /* =========================================================
     PODCASTS
  ========================================================= */

  try {
    const podcastsResult =
      await fetchGraphQL(HOME_PODCASTS_QUERY);

    wpPodcasts =
      podcastsResult?.allPodcasts?.nodes || [];
  } catch (error) {
    console.log(
      "Podcasts query error:",
      error.message
    );
  }

  /* =========================================================
     INSIGHTS
  ========================================================= */

  try {
    const insightsResult =
      await fetchGraphQL(HOME_INSIGHTS_QUERY);

    wpInsights =
      insightsResult?.allInsights?.nodes || [];
  } catch (error) {
    console.log(
      "Insights query error:",
      error.message
    );
  }

  /* =========================================================
     TESTIMONIALS
  ========================================================= */

  try {
    const testimonialsResult =
      await fetchGraphQL(HOME_TESTIMONIALS_QUERY);

    wpTestimonials =
      testimonialsResult?.allTestimonials?.nodes || [];
  } catch (error) {
    console.log(
      "Testimonials query error:",
      error.message
    );
  }

  /* =========================================================
     HERO
  ========================================================= */

  const heroSlider =
    wpFields?.slider?.slidesData?.length > 0
      ? wpFields.slider.slidesData.map(
          (slide, index) => ({
            id: index + 1,

            title:
              slide.title,

            primaryButton: {
              label:
                slide.leftButtonText ||
                "Find Out More",

              url:
                slide.leftButtonLink?.url ||
                "#",
            },

            secondaryButton: {
              label:
                slide.rightButtonText ||
                "View Latest Podcast",

              url:
                slide.rightButtonLink?.url ||
                "#",
            },

            image:
              slide?.image?.node?.sourceUrl ||
              slide?.image?.sourceUrl ||
              (typeof slide?.image === "string" ? slide.image : ""),

            video:
              wpFields?.slider
                ?.backgroundVideo
                ?.node
                ?.mediaItemUrl || null,
          })
        )
      : [];

  /* =========================================================
     LEADING INSIGHTS
  ========================================================= */

  const descriptionParts =
    wpFields?.secondSection?.description
      ?.split(/\n\s*\n/)
      .filter(Boolean) || [];

  const leadingInsights = wpFields?.secondSection
  ? {
      image:
        wpFields.secondSection.leftImage?.node?.sourceUrl || null,

      title:
        wpFields.secondSection.title || "",

      description:
        wpFields.secondSection.description || "",

      establishedYear:
        wpFields.secondSection.establishedYear || "",

      cpdEvents:
        wpFields.secondSection.cpdEvents || "",

      peopleEducated:
        wpFields.secondSection.peopleEducated
          ? `${wpFields.secondSection.peopleEducated}+`
          : "",
    }
  : null;

  /* =========================================================
     SPEAKERS
  ========================================================= */

  const speakerSection =
    wpFields?.speakerSection
      ? {
          title:
            wpFields.speakerSection
              .title ||
            "Speakers from our Events include",

          images:
            wpFields.speakerSection
              .speakerImages
              ?.map((item) => ({
                image:
                  item.image?.node
                    ?.sourceUrl || "",

                alt:
                  item.image?.node
                    ?.altText || "",
              }))
              .filter(
                (item) => item.image
              ) || [],
        }
      : null;

  /* =========================================================
     EVENTS HEADING
  ========================================================= */

  const cleanEventHeading =
    wpFields?.eventSection?.heading
      ?.replace(/<br\s*\/?>/gi, " ")
      .replace(/<[^>]*>/g, "")
      .replace(/\s+/g, " ")
      .trim() || "";

  let eventHeadingPrefix =
    "";

  let eventHeading =
    "";

  if (cleanEventHeading) {
    const separator = " - ";

    if (
      cleanEventHeading.includes(separator)
    ) {
      const parts =
        cleanEventHeading.split(separator);

      eventHeadingPrefix =
        parts[0];

      eventHeading =
        parts
          .slice(1)
          .join(separator);
    } else {
      eventHeading =
        cleanEventHeading;
    }
  }

  /* =========================================================
     EVENTS CPT
  ========================================================= */

  // const dynamicEventItems =
  //   wpEvents.length > 0
  //     ? wpEvents.map((event) => ({
  //         id:
  //           event.databaseId,

  //         title:
  //           event.title,

  //         topic:
  //           "Events",

  //         image:
  //           event.featuredImage
  //             ?.node
  //             ?.sourceUrl ||
  //           "",

  //         url:
  //           event.uri ||
  //           "/events/",
  //       }))
  //     : [];

  const dynamicEventItems =
  wpEvents.length > 0
    ? wpEvents.map((event) => ({
        id: event.databaseId,

        title: event.title,

        image:
          event.featuredImage?.node?.sourceUrl || "",

        alt:
          event.featuredImage?.node?.altText || "",

        url:
          event.uri || "/events/",

        categories:
          event.eventCategories?.nodes?.map(
            (category) => ({
              id: category.databaseId,
              name: category.name,
              slug: category.slug,
            })
          ) || [],
      }))
    : [];

  const eventsOnDemand = {
    headingPrefix:
      eventHeadingPrefix,

    heading:
      eventHeading,

    items:
      dynamicEventItems,

    buttonUrl:
      "/events/",
  };

  /* =========================================================
     PODCAST CTA
  ========================================================= */

/* =========================================================
   PODCAST CTA
========================================================= */

const podcastCTA = wpFields?.cta
  ? {
      heading: wpFields.cta.title || "",

      buttonLabel: wpFields.cta.buttonText || "",

      buttonUrl: wpFields.cta.buttonUrl?.url || "#",

      buttonTarget: wpFields.cta.buttonUrl?.target || "_self",

      image: wpFields.cta.overlayImage?.node?.sourceUrl || null,

      imageAlt: wpFields.cta.overlayImage?.node?.altText || "",
    }
  : null;

  /* =========================================================
     PODCASTS
  ========================================================= */

  const dynamicPodcastItems =
    wpPodcasts.length > 0
      ? wpPodcasts.map((podcast) => ({
          id:
            podcast.databaseId,

          title:
            podcast.title,

          excerpt:
            podcast.excerpt
              ?.replace(/<[^>]*>/g, "")
              .trim() || "",

          image:
            podcast.featuredImage
              ?.node
              ?.sourceUrl || "",

          url:
            podcast.uri ||
            "/podcasts/",

          linkLabel:
            "Read More",
        }))
      : [];

  const inspirationNews = {
    heading:
      wpFields?.podcastSection?.heading ||
      "",

    items:
      dynamicPodcastItems,
  };

  /* =========================================================
     INDUSTRY UPDATES
  ========================================================= */

  const dynamicInsightItems =
    wpInsights.length > 0
      ? wpInsights.map((insight) => ({
          id:
            insight.databaseId,

          title:
            insight.title,

          excerpt:
            insight.excerpt
              ?.replace(/<[^>]*>/g, "")
              .trim() || "",

          image:
            insight.featuredImage
              ?.node
              ?.sourceUrl ||
            null,

          alt:
            insight.featuredImage
              ?.node
              ?.altText ||
            insight.title,

          url:
            insight.uri ||
            "/insights/",

          linkLabel:
            "Read More",
        }))
      : [];

  const industryUpdates = {
    heading:
      wpFields?.insightsSection?.heading ||
      "",

    text:
      wpFields?.insightsSection?.description ||
      "",

    linkLabel:
      wpFields?.insightsSection?.linkTitle ||
      "",

    linkUrl:
      wpFields?.insightsSection
        ?.url
        ?.url ||
      "/insights/",

    items:
      dynamicInsightItems,
  };

  /* =========================================================
     EXTERNAL ENVELOPE
  ========================================================= */

  const externalEnvelope =
    wpFields?.ctaBooking
      ? {
          bookImage:
            wpFields.ctaBooking
              .image
              ?.node
              ?.sourceUrl ||
            "",

          heading:
            wpFields.ctaBooking.heading ||
            "",

          text:
            wpFields.ctaBooking.description ||
            "",

          buttonLabel:
            wpFields.ctaBooking.buttonText ||
            "",

          buttonUrl:
            wpFields.ctaBooking
              .buttonUrl
              ?.url ||
            "",
        }
      : null;

  /* =========================================================
     TESTIMONIAL
  ========================================================= */
let testimonialsResponse = null;

try {
  testimonialsResponse = await fetchGraphQL(
    HOME_TESTIMONIALS_QUERY
  );
} catch (error) {
  console.error("Testimonials fetch error:", error);
}
 const testimonials =
  wpTestimonials.length > 0
    ? wpTestimonials.map((testimonial) => ({
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
      }))
    : [];
const testimonialBackgroundImage =
  testimonialsResponse?.options
    ?.globalTestimonialSettings
    ?.testimonialBackgroundImage
    ?.node?.sourceUrl || "";
  /* =========================================================
     OUTPUT
  ========================================================= */

  return (
    <main>
      <HeroSlider
        slides={heroSlider}
      />

      <LeadingInsights
        data={leadingInsights}
      />

      <SpeakerStrip
        data={speakerSection}
      />

      <EventsOnDemand
        data={eventsOnDemand}
      />

      <PodcastCTA
        data={podcastCTA}
      />

      <InspirationNews
        data={inspirationNews}
      />

      <IndustryUpdates
        data={industryUpdates}
      />

      <ExternalEnvelope
        data={externalEnvelope}
      />

      <ClientTestimonial
        items={testimonials}
        backgroundImage={testimonialBackgroundImage}
      />
    </main>
  );
}