import { fetchGraphQL } from "../../lib/graphql";

import { ABOUT_PAGE_QUERY } from "../../lib/queries/about";
import { HOME_PAGE_QUERY } from "../../lib/queries/home";
import { HOME_TESTIMONIALS_QUERY } from "../../lib/queries/testimonials";
import { HOME_EVENTS_QUERY } from "../../lib/queries/events";
import { HOME_PODCASTS_QUERY } from "../../lib/queries/podcasts";
import { HOME_INSIGHTS_QUERY } from "../../lib/queries/insights";

import AboutHero from "../../components/about-us/AboutHero";
import AboutInsights from "../../components/about-us/AboutInsights";
import AboutWhyChoose from "../../components/about-us/AboutWhyChoose";
import AboutStayInspired from "../../components/about-us/AboutStayInspired";
import AboutCoreValues from "../../components/about-us/AboutCoreValues";

import PodcastCTA from "../../components/home/PodcastCTA";
import ClientTestimonial from "../../components/home/ClientTestimonial";

export default async function AboutPage() {
  let aboutResult = null;
  let homeResult = null;
  let testimonialsResult = null;
  let eventsResult = null;
  let podcastsResult = null;
  let insightsResult = null;

  try {
    aboutResult = await fetchGraphQL(
      ABOUT_PAGE_QUERY
    );
  } catch (error) {
    console.log(
      "About page GraphQL error:",
      error.message
    );
  }

  try {
    homeResult = await fetchGraphQL(
      HOME_PAGE_QUERY
    );
  } catch (error) {
    console.log(
      "Home shared data GraphQL error:",
      error.message
    );
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

  try {
    eventsResult = await fetchGraphQL(
      HOME_EVENTS_QUERY
    );
  } catch (error) {
    console.log(
      "Events GraphQL error:",
      error.message
    );
  }

  try {
    podcastsResult = await fetchGraphQL(
      HOME_PODCASTS_QUERY
    );
  } catch (error) {
    console.log(
      "Podcasts GraphQL error:",
      error.message
    );
  }

  try {
    insightsResult = await fetchGraphQL(
      HOME_INSIGHTS_QUERY
    );
  } catch (error) {
    console.log(
      "Insights GraphQL error:",
      error.message
    );
  }

  const fields =
    aboutResult?.page?.aboutPageFields || null;

  if (!fields) {
    return (
      <main className="about-page">
        <div
          style={{
            padding: "100px 20px",
            textAlign: "center",
          }}
        >
          <h1>About Us</h1>

          <p>
            About page content could not be loaded.
          </p>
        </div>
      </main>
    );
  }

  /* =========================
     HERO
  ========================= */

  const banner = {
    heading:
      fields.bannerContent?.heading || "",

    description:
      fields.bannerContent?.description || "",

    buttonText:
      fields.bannerContent?.buttonText || "",

    buttonUrl:
      fields.bannerContent?.buttonLink?.url || "#",

    video:
      fields.bannerContent?.backgroundVideo?.node
        ?.mediaItemUrl ||
      fields.bannerContent?.backgroundVideo?.node
        ?.sourceUrl ||
      "",
  };

  /* =========================
     ABOUT INTRO + STATS
  ========================= */

  const aboutStats = {
    heading:
      fields.aboutSection?.heading || "",

    description:
      fields.aboutSection?.description || "",

    establishedYear:
      fields.aboutSection?.establishedYear || "",

    cpdEvents:
      fields.aboutSection?.cpdEvents || "",

    peopleEducated:
      fields.aboutSection?.peopleEducated || "",
  };

  /* =========================
     WHY CHOOSE
  ========================= */

  const whyChoose = {
    heading:
      fields.whyChooseSection?.heading || "",

    description:
      fields.whyChooseSection?.description || "",

    image:
      fields.whyChooseSection?.image?.node
        ?.sourceUrl || "",

    imageAlt:
      fields.whyChooseSection?.image?.node
        ?.altText || "",

    points:
      fields.whyChooseSection?.points
        ?.map((item) => item.enterPoint)
        .filter(Boolean) || [],
  };

  /* =========================
     CORE VALUES
  ========================= */

  const coreValues = {
    heading:
      fields.eventSection?.heading || "",

    buttonText:
      fields.eventSection?.buttonText || "",

    buttonUrl:
      fields.eventSection?.buttonUrl?.url || "#",

    items:
      fields.eventSection?.coreValues
        ?.map((item) => ({
          title:
            item.title || "",

          text:
            item.text || "",

          image:
            item.image?.node?.sourceUrl || "",

          imageAlt:
            item.image?.node?.altText || "",
        }))
        .filter(
          (item) =>
            item.title ||
            item.text ||
            item.image
        ) || [],
  };

  /* =========================
     HOME SHARED DATA
  ========================= */

  const homeFields =
    homeResult?.page?.homePageFields || {};

  /* =========================
     HOME CTA REUSED HERE
  ========================= */

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

  /* =========================
     EVENTS
  ========================= */

  const wpEvents =
    eventsResult?.allEvents?.nodes || [];

  const stayInspiredEvents =
    wpEvents.map((item) => ({
      id:
        item.databaseId,

      title:
        item.title || "",

      url:
        item.uri || "/events/",

      image:
        item.featuredImage?.node?.sourceUrl || "",

      imageAlt:
        item.featuredImage?.node?.altText || "",
    }));

  /* =========================
     PODCASTS
  ========================= */

  const wpPodcasts =
    podcastsResult?.allPodcasts?.nodes || [];

  const stayInspiredPodcasts =
    wpPodcasts.map((item) => ({
      id:
        item.databaseId,

      title:
        item.title || "",

      url:
        item.uri || "/podcasts/",

      image:
        item.featuredImage?.node?.sourceUrl || "",

      imageAlt:
        item.featuredImage?.node?.altText || "",
    }));

  /* =========================
     INSIGHTS
  ========================= */

  const wpInsights =
    insightsResult?.allInsights?.nodes || [];

  const stayInspiredInsights =
    wpInsights.map((item) => ({
      id:
        item.databaseId,

      title:
        item.title || "",

      url:
        item.uri || "/insights/",

      image:
        item.featuredImage?.node?.sourceUrl || "",

      imageAlt:
        item.featuredImage?.node?.altText || "",
    }));

  /* =========================
     OUTPUT
  ========================= */

  return (
    <main className="about-page">

      <AboutHero
        data={banner}
      />

      <AboutInsights
        data={aboutStats}
      />

      <AboutWhyChoose
        data={whyChoose}
      />

      <AboutStayInspired
        events={stayInspiredEvents}
        podcasts={stayInspiredPodcasts}
        insights={stayInspiredInsights}
      />

      <AboutCoreValues
        data={coreValues}
      />

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

    </main>
  );
}