import "./contact.css";
import "../home.css";

import { fetchGraphQL } from "../../lib/graphql";

import { CONTACT_PAGE_QUERY } from "../../lib/queries/contact";
import { HOME_PAGE_QUERY } from "../../lib/queries/home";
import { HOME_TESTIMONIALS_QUERY } from "../../lib/queries/testimonials";

import ContactHero from "../../components/contact/ContactHero";
import ContactIntro from "../../components/contact/ContactIntro";
import ContactForm from "../../components/contact/ContactForm";

import PodcastCTA from "../../components/home/PodcastCTA";
import ClientTestimonial from "../../components/home/ClientTestimonial";

export const metadata = {
  title: "Contact Us | Resibuild",
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
   CONTACT PAGE
========================================= */

export default async function ContactPage() {

  let contactResult = null;
  let homeResult = null;
  let testimonialResult = null;


  try {

    [
      contactResult,
      homeResult,
      testimonialResult,
    ] = await Promise.all([

      fetchGraphQL(
        CONTACT_PAGE_QUERY
      ),

      fetchGraphQL(
        HOME_PAGE_QUERY
      ),

      fetchGraphQL(
        HOME_TESTIMONIALS_QUERY
      ),

    ]);

  } catch (error) {

    console.log(
      "Contact page GraphQL error:",
      error.message
    );

  }


  /* =========================================
     CONTACT ACF
  ========================================= */

  const page =
    contactResult?.page || null;

  const fields =
    page?.contactUs || {};


  /* =========================================
     HERO
  ========================================= */

  const hero = {

    heading:
      decodeHtml(
        fields?.bannerSection?.heading || ""
      ),

    description:
      decodeHtml(
        fields?.bannerSection?.description || ""
      ),

    buttonText:
      fields?.bannerSection?.buttonText || "",

    buttonUrl:
      fields?.bannerSection
        ?.buttonLink?.url || "#",

    video:
      fields?.bannerSection
        ?.backgroundVideo
        ?.node
        ?.mediaItemUrl ||

      fields?.bannerSection
        ?.backgroundVideo
        ?.node
        ?.sourceUrl ||

      null,

  };


  /* =========================================
     SECOND SECTION
  ========================================= */

  const secondSection = {

    title:
      decodeHtml(
        fields?.sectionSection?.title || ""
      ),

    text:
      decodeHtml(
        fields?.sectionSection?.text || ""
      ),

    image:
      fields?.sectionSection
        ?.image
        ?.node
        ?.sourceUrl ||

      null,

    imageAlt:
      fields?.sectionSection
        ?.image
        ?.node
        ?.altText ||

      stripHtml(
        fields?.sectionSection?.title || ""
      ),

  };


  /* =========================================
     CONTACT FORM
  ========================================= */

  const contactSection = {

    heading:
      decodeHtml(
        fields?.contactSection?.heading || ""
      ),

    formHtml:
      decodeHtml(
        fields?.contactSection?.contactForm || ""
      ),

  };


  /* =========================================
     HOME PAGE DATA
     REUSED FOR CTA
  ========================================= */

  const homeFields =
    homeResult?.page?.homePageFields || {};


  const podcastCTA =
    homeFields?.cta
      ? {

          heading:
            decodeHtml(
              homeFields.cta.title || ""
            ),

          buttonLabel:
            homeFields.cta.buttonText || "",

          buttonUrl:
            homeFields.cta
              ?.buttonUrl
              ?.url || "#",

        }
      : null;


  /* =========================================
     TESTIMONIALS
  ========================================= */

  const testimonialNodes =
    testimonialResult
      ?.allTestimonials
      ?.nodes || [];


  const testimonials =
    testimonialNodes.map((item) => ({

      id:
        item.databaseId,

      quote:
        stripHtml(
          item.content || ""
        ),

      author:
        item.testimonialFields
          ?.clientName || "",

      role:
        item.testimonialFields
          ?.clientDesignation || "",

    }));


  /* =========================================
     OUTPUT
  ========================================= */

  return (
    <main className="contact-page">


      {/* =====================================
          1. DYNAMIC HERO
      ====================================== */}

      <ContactHero
        data={hero}
      />


      {/* =====================================
          2. DYNAMIC INTRO
      ====================================== */}

      <ContactIntro
        data={secondSection}
      />


      {/* =====================================
          3. DYNAMIC CONTACT FORM
      ====================================== */}

      <ContactForm
        data={contactSection}
      />


      {/* =====================================
          4. EXISTING HOME CTA
      ====================================== */}

      {podcastCTA && (
        <PodcastCTA
          data={podcastCTA}
        />
      )}


      {/* =====================================
          5. EXISTING TESTIMONIAL
      ====================================== */}

      {testimonials.length > 0 && (
        <ClientTestimonial
          items={testimonials}
        />
      )}


    </main>
  );
}