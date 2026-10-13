import "./podcasts.css";

import { fetchGraphQL } from "../../lib/graphql";

import {
  PODCASTS_PAGE_QUERY,
} from "../../lib/queries/podcasts";

import {
  HOME_EVENTS_QUERY,
} from "../../lib/queries/events";

import {
  HOME_TESTIMONIALS_QUERY,
} from "../../lib/queries/testimonials";

import PodcastHero from "../../components/podcast/PodcastHero";
import PodcastInsights from "../../components/podcast/PodcastInsights";
import PodcastAvailable from "../../components/podcast/PodcastAvailable";
import PodcastGrid from "../../components/podcast/PodcastGrid";
import ThoughtLeaderCTA from "../../components/podcast/ThoughtLeaderCTA";
import UpcomingEvents from "../../components/podcast/UpcomingEvents";

import ClientTestimonial from "../../components/home/ClientTestimonial";


export const metadata = {
  title: "Podcasts | Resibuild",
};


export default async function PodcastsPage() {

  let podcastResult = null;
  let eventsResult = null;
  let testimonialsResult = null;


  /* =========================================
     PODCAST PAGE DATA
  ========================================= */

  try {

    podcastResult = await fetchGraphQL(
      PODCASTS_PAGE_QUERY
    );

  } catch (error) {

    console.log(
      "Podcast page GraphQL error:",
      error.message
    );

  }


  /* =========================================
     UPCOMING EVENTS
     ONLY EVENTS DATA USED ON PODCAST PAGE
  ========================================= */

  try {

    eventsResult = await fetchGraphQL(
      HOME_EVENTS_QUERY
    );

  } catch (error) {

    console.log(
      "Podcast upcoming events GraphQL error:",
      error.message
    );

  }


  /* =========================================
     TESTIMONIALS
  ========================================= */

  try {

    testimonialsResult = await fetchGraphQL(
      HOME_TESTIMONIALS_QUERY
    );

  } catch (error) {

    console.log(
      "Podcast testimonials GraphQL error:",
      error.message
    );

  }


  /* =========================================
     PAGE + ACF FIELDS
  ========================================= */

  const page =
    podcastResult?.page || null;

  const fields =
    page?.podcast || {};


  /* =========================================
     HERO
  ========================================= */

  const hero = {

    title:
      fields?.bannerContent?.title || "",

    description:
      fields?.bannerContent?.description || "",

    buttonText:
      fields?.bannerContent?.buttonText || "",

    buttonUrl:
      fields?.bannerContent?.buttonLink?.url || "#",

    video:
      fields?.bannerContent?.backgroundVideo?.node
        ?.mediaItemUrl ||
      fields?.bannerContent?.backgroundVideo?.node
        ?.sourceUrl ||
      "",

  };


  /* =========================================
     PODCAST CARDS
  ========================================= */

  const wpPodcasts =
    podcastResult?.allPodcasts?.nodes || [];


  const podcasts =
    wpPodcasts.map((item) => ({

      id:
        item.databaseId,

      title:
        item.title || "",

      url:
        item.uri || "#",

      excerpt:
        item.excerpt
          ?.replace(/<[^>]*>/g, "")
          .replace(/&nbsp;/g, " ")
          .trim() || "",

      image:
        item.featuredImage?.node
          ?.sourceUrl || "",

      imageAlt:
        item.featuredImage?.node
          ?.altText || "",

    }));


  /* =========================================
     PODCAST CTA
  ========================================= */

  const cta =
    fields?.ctaSection
      ? {

          heading:
            fields.ctaSection.heading || "",

          text:
            fields.ctaSection.text || "",

          buttonText:
            fields.ctaSection.buttonText || "",

          buttonUrl:
            fields.ctaSection.buttonLink?.url || "#",

        }
      : null;


  /* =========================================
     UPCOMING EVENTS
  ========================================= */

  const wpEvents =
    eventsResult?.allEvents?.nodes || [];


  const upcomingEvents =
    wpEvents
      .slice(0, 3)
      .map((item) => ({

        id:
          item.databaseId,

        title:
          item.title || "",

        url:
          item.uri || "/events/",

        excerpt:
          item.excerpt
            ?.replace(/<[^>]*>/g, "")
            .replace(/&nbsp;/g, " ")
            .trim() || "",

        image:
          item.featuredImage?.node
            ?.sourceUrl || "",

        imageAlt:
          item.featuredImage?.node
            ?.altText || "",

      }));


  /* =========================================
     TESTIMONIALS
  ========================================= */

  const wpTestimonials =
    testimonialsResult?.allTestimonials?.nodes || [];


  const testimonials =
    wpTestimonials.map((testimonial) => ({

      id:
        testimonial.databaseId,

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

    }));


  /* =========================================
     OUTPUT
  ========================================= */

  return (

    <main className="podcasts-page">


      <PodcastHero
        data={hero}
      />


      <PodcastInsights
        content={page?.content || ""}
      />


      <PodcastAvailable />


      <PodcastGrid
        podcasts={podcasts}
      />


      {cta && (

        <ThoughtLeaderCTA
          data={cta}
        />

      )}


      {upcomingEvents.length > 0 && (

        <UpcomingEvents
          events={upcomingEvents}
        />

      )}


      {testimonials.length > 0 && (

        <ClientTestimonial
          items={testimonials}
        />

      )}


    </main>

  );

}