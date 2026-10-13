import "./events.css";

import { fetchGraphQL } from "../../lib/graphql";

import {
  EVENTS_PAGE_QUERY,
} from "../../lib/queries/events";

import {
  HOME_PAGE_QUERY,
} from "../../lib/queries/home";

import {
  HOME_TESTIMONIALS_QUERY,
} from "../../lib/queries/testimonials";

import EventsArchiveHero from "../../components/events/EventsArchiveHero";
import EventsArchiveGrid from "../../components/events/EventsArchiveGrid";
import Partners from "../../components/events/Partners";

import PodcastCTA from "../../components/home/PodcastCTA";
import ClientTestimonial from "../../components/home/ClientTestimonial";


export const metadata = {
  title: "Events | Resibuild",
};


export default async function EventsPage() {

  let eventsResult = null;
  let homeResult = null;
  let testimonialsResult = null;


  /* =========================================
     EVENTS PAGE
  ========================================= */

  try {

    eventsResult = await fetchGraphQL(
      EVENTS_PAGE_QUERY
    );

  } catch (error) {

    console.log(
      "Events page GraphQL error:",
      error.message
    );

  }


  /* =========================================
     SHARED HOME CTA
  ========================================= */

  try {

    homeResult = await fetchGraphQL(
      HOME_PAGE_QUERY
    );

  } catch (error) {

    console.log(
      "Events home shared GraphQL error:",
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
      "Events testimonials GraphQL error:",
      error.message
    );

  }


  /* =========================================
     EVENT PAGE ACF
  ========================================= */

  const page =
    eventsResult?.page || null;

  const fields =
    page?.eventsPageFields || {};


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
    fields?.bannerContent?.backgroundVideo?.node?.mediaItemUrl ||
    fields?.bannerContent?.backgroundVideo?.node?.sourceUrl ||
    "",
};

  /* =========================================
     EVENT CARDS
  ========================================= */

  const wpEvents =
    eventsResult?.allEvents?.nodes || [];


  const events =
    wpEvents.map((item) => ({

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
     PARTNERS
  ========================================= */

  const partners =
    fields?.ourPartners
      ?.map((item, index) => ({

        id:
          index,

        image:
          item.addImage?.node
            ?.sourceUrl || "",

        imageAlt:
          item.addImage?.node
            ?.altText || "",

      }))
      .filter(
        (item) => item.image
      ) || [];


  /* =========================================
     SHARED CTA
  ========================================= */

  const homeFields =
    homeResult?.page?.homePageFields || {};


  const podcastCTA =
    homeFields?.cta
      ? {

          heading:
            homeFields.cta.title || "",

          buttonLabel:
            homeFields.cta.buttonText || "",

          buttonUrl:
            homeFields.cta.buttonUrl?.url || "#",

        }
      : null;


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

    <main className="events-page">


      <EventsArchiveHero
        data={hero}
      />


      <EventsArchiveGrid
        title={
          fields?.eventsSectionTitle || ""
        }
        events={events}
      />


      {partners.length > 0 && (

        <Partners
          items={partners}
        />

      )}


      {podcastCTA && (

        <PodcastCTA
          data={podcastCTA}
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