import "./home.css";

import HeroSlider from "../components/home/HeroSlider";
import LeadingInsights from "../components/home/LeadingInsights";
import SpeakerStrip from "../components/home/SpeakerStrip";
import EventsOnDemand from "../components/home/EventsOnDemand";
import PodcastCTA from "../components/home/PodcastCTA";
import InspirationNews from "../components/home/InspirationNews";
import IndustryUpdates from "../components/home/IndustryUpdates";
import ExternalEnvelope from "../components/home/ExternalEnvelope";
import ClientTestimonial from "../components/home/ClientTestimonial";

import { homeData } from "../data/homeData";

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
              homeData.heroSlider[index]?.image ||
              homeData.heroSlider[0]?.image ||
              "/images/hero.png",

            video:
              wpFields?.slider
                ?.backgroundVideo
                ?.node
                ?.mediaItemUrl || null,
          })
        )
      : homeData.heroSlider;

  /* =========================================================
     LEADING INSIGHTS
  ========================================================= */

  const descriptionParts =
    wpFields?.secondSection?.description
      ?.split(/\n\s*\n/)
      .filter(Boolean) || [];

  const leadingInsights =
    wpFields?.secondSection
      ? {
          image:
            wpFields.secondSection
              .leftImage
              ?.node
              ?.sourceUrl ||
            homeData.leadingInsights.image,

          heading:
            wpFields.secondSection.title ||
            homeData.leadingInsights.heading,

          description:
            descriptionParts[0] ||
            homeData.leadingInsights.description,

          descriptionTwo:
            descriptionParts[1] ||
            homeData.leadingInsights.descriptionTwo,

          stats: [
            {
              number:
                wpFields.secondSection
                  .establishedYear ||
                "2018",

              label:
                "Established",
            },

            {
              number:
                wpFields.secondSection
                  .cpdEvents ||
                "0",

              label:
                "CPD Events",
            },

            {
              number:
                wpFields.secondSection
                  .peopleEducated
                  ? `${wpFields.secondSection.peopleEducated}+`
                  : "3000+",

              label:
                "People Educated",
            },
          ],
        }
      : homeData.leadingInsights;

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
    homeData.eventsOnDemand.headingPrefix;

  let eventHeading =
    homeData.eventsOnDemand.heading;

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

  const dynamicEventItems =
    wpEvents.length > 0
      ? wpEvents.map((event) => ({
          id:
            event.databaseId,

          title:
            event.title,

          topic:
            "Events",

          image:
            event.featuredImage
              ?.node
              ?.sourceUrl ||
            "/images/Sapphire_Shard_2021_180_v884sb.png",

          url:
            event.uri ||
            "/events/",
        }))
      : homeData.eventsOnDemand.items;

  const eventsOnDemand = {
    ...homeData.eventsOnDemand,

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

  const podcastCTA =
    wpFields?.cta
      ? {
          ...homeData.podcastCTA,

          heading:
            wpFields.cta.title ||
            homeData.podcastCTA.heading,

          buttonLabel:
            wpFields.cta.buttonText ||
            homeData.podcastCTA.buttonLabel,

          buttonUrl:
            wpFields.cta.buttonUrl?.url ||
            homeData.podcastCTA.buttonUrl,
        }
      : homeData.podcastCTA;

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
      : homeData.inspirationNews.items;

  const inspirationNews = {
    ...homeData.inspirationNews,

    heading:
      wpFields?.podcastSection?.heading ||
      homeData.inspirationNews.heading,

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
            "/images/Blog-img-1.png",

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
      : homeData.industryUpdates.items;

  const industryUpdates = {
    ...homeData.industryUpdates,

    heading:
      wpFields?.insightsSection?.heading ||
      homeData.industryUpdates.heading,

    text:
      wpFields?.insightsSection?.description ||
      homeData.industryUpdates.text,

    linkLabel:
      wpFields?.insightsSection?.linkTitle ||
      homeData.industryUpdates.linkLabel,

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
            homeData.externalEnvelope.bookImage,

          heading:
            wpFields.ctaBooking.heading ||
            homeData.externalEnvelope.heading,

          text:
            wpFields.ctaBooking.description ||
            homeData.externalEnvelope.text,

          buttonLabel:
            wpFields.ctaBooking.buttonText ||
            homeData.externalEnvelope.buttonLabel,

          buttonUrl:
            wpFields.ctaBooking
              .buttonUrl
              ?.url ||
            homeData.externalEnvelope.buttonUrl,
        }
      : homeData.externalEnvelope;

  /* =========================================================
     TESTIMONIAL
  ========================================================= */

 const testimonials =
  wpTestimonials.length > 0
    ? wpTestimonials.map((testimonial) => ({
        id:
          testimonial.databaseId,

        backgroundImage:
          homeData.testimonial.backgroundImage,

        quote:
          testimonial.content
            ?.replace(/<[^>]*>/g, "")
            .replace(/&nbsp;/g, " ")
            .trim() || "",

        author:
          testimonial.testimonialFields
            ?.clientName || "",

        role:
          testimonial.testimonialFields
            ?.clientDesignation || "",
      }))
    : [
        {
          id: 1,

          backgroundImage:
            homeData.testimonial.backgroundImage,

          quote:
            homeData.testimonial.quote,

          author:
            homeData.testimonial.author,

          role:
            homeData.testimonial.role,
        },
      ];

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
        />
    </main>
  );
}