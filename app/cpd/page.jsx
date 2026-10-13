import "./cpd.css";

import { fetchGraphQL } from "../../lib/graphql";
import { CPD_PAGE_QUERY } from "../../lib/queries/cpd";
import { HOME_PAGE_QUERY } from "../../lib/queries/home";
import { HOME_TESTIMONIALS_QUERY } from "../../lib/queries/testimonials";

import CpdHero from "../../components/cpd/CpdHero";
import CpdContentSection from "../../components/cpd/CpdContentSection";

import PodcastCTA from "../../components/home/PodcastCTA";
import ClientTestimonial from "../../components/home/ClientTestimonial";

export const metadata = {
  title: "CPD | Resibuild",
};

export default async function CpdPage() {
  const [
    cpdResult,
    homeResult,
    testimonialResult,
  ] = await Promise.all([
    fetchGraphQL(CPD_PAGE_QUERY),
    fetchGraphQL(HOME_PAGE_QUERY),
    fetchGraphQL(HOME_TESTIMONIALS_QUERY),
  ]);

  const page = cpdResult?.page || null;
  const fields = page?.cpdPageFields || {};

  /* HERO */

  const hero = {
    heading: fields?.bannerSection?.heading || "",
    description: fields?.bannerSection?.description || "",
    buttonText: fields?.bannerSection?.buttonText || "",
    buttonUrl:
      fields?.bannerSection?.buttonLink?.url || "#",

    video:
      fields?.bannerSection?.backgroundVideo?.node?.mediaItemUrl ||
      fields?.bannerSection?.backgroundVideo?.node?.sourceUrl ||
      "",
  };

  /* DESIGN CPD */

  const designCpd = {
    heading:
      fields?.designCpdSection?.heading || "",

    text:
      fields?.designCpdSection?.text || "",

    items:
      fields?.designCpdSection?.aboutCpd?.map(
        (item, index) => ({
          id: `design-cpd-${index}`,

          heading:
            item?.aboutHeading || "",

          text:
            item?.text || "",

          image:
            item?.image?.node?.sourceUrl || "",

          imageAlt:
            item?.image?.node?.altText || "",

          leftButtonText:
            item?.leftButtonText || "",

          leftButtonUrl:
            item?.leftButtonLink?.url || "#",

          rightButtonText:
            item?.rightButtonText || "",

          rightButtonUrl:
            item?.rightButtonLink?.url || "#",
        })
      ) || [],
  };

  /* FIRE CPD */

  const designFire = {
    heading:
      fields?.designFireSection?.heading || "",

    text:
      fields?.designFireSection?.text || "",

    items:
      fields?.designFireSection?.aboutCpd?.map(
        (item, index) => ({
          id: `design-fire-${index}`,

          heading:
            item?.aboutHeading || "",

          text:
            item?.text || "",

          image:
            item?.image?.node?.sourceUrl || "",

          imageAlt:
            item?.image?.node?.altText || "",

          leftButtonText:
            item?.leftButtonText || "",

          leftButtonUrl:
            item?.leftButtonLink?.url || "#",

          rightButtonText:
            item?.rightButtonText || "",

          rightButtonUrl:
            item?.rightButtonLink?.url || "#",
        })
      ) || [],
  };

  /* HOME CTA */

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

  /* TESTIMONIALS */

  const testimonials =
    testimonialResult?.allTestimonials?.nodes?.map(
      (item) => ({
        id: item.databaseId,

        quote:
          item.content
            ?.replace(/<[^>]*>/g, "")
            .replace(/&nbsp;/g, " ")
            .trim() || "",

        author:
          item.testimonialFields?.clientName || "",

        role:
          item.testimonialFields?.clientDesignation || "",
      })
    ) || [];

  return (
    <main className="cpd-page">

      <CpdHero data={hero} />

      <CpdContentSection
        data={designCpd}
        variant="light"
      />

      {podcastCTA && (
        <PodcastCTA data={podcastCTA} />
      )}

            <CpdContentSection
        data={designFire}
        variant="fire-light"
        />

      {testimonials.length > 0 && (
        <ClientTestimonial
          items={testimonials}
        />
      )}

    </main>
  );
}