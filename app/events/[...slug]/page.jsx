import { notFound } from "next/navigation";
import { fetchGraphQL } from "../../../lib/graphql";
import { EVENT_SINGLE_QUERY } from "../../../lib/queries/events";
import { HOME_TESTIMONIALS_QUERY } from "../../../lib/queries/testimonials";
import EventSingle from "../../../components/events/EventSingle";

export const dynamic = "force-dynamic";

function getEventSlug(params) {
  const slug = params?.slug;

  return Array.isArray(slug)
    ? slug[slug.length - 1]
    : slug || "";
}

async function getEvent(slug) {
  if (!slug) return null;

  const result = await fetchGraphQL(EVENT_SINGLE_QUERY, {
    slug,
  });

  return result?.events || null;
}

function stripHtml(value = "") {
  return String(value)
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .trim();
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = getEventSlug(resolvedParams);

  try {
    const event = await getEvent(slug);

    if (!event) {
      return {
        title: "Event Not Found | Resibuild",
      };
    }

    return {
      title: `${stripHtml(event.title)} | Resibuild`,
      description: stripHtml(event.excerpt || ""),
    };
  } catch {
    return {
      title: "Events | Resibuild",
    };
  }
}

export default async function EventSinglePage({ params }) {
  const resolvedParams = await params;
  const slug = getEventSlug(resolvedParams);

  const event = await getEvent(slug);

  if (!event) {
    notFound();
  }

  let testimonialsResult = null;

  try {
    testimonialsResult = await fetchGraphQL(
      HOME_TESTIMONIALS_QUERY
    );
  } catch (error) {
    console.error("Testimonials error:", error);
  }

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
    <EventSingle
      event={event}
      testimonials={testimonials}
      testimonialBackgroundImage={testimonialBackgroundImage}
    />
  );
}