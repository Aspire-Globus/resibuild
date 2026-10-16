import { notFound } from "next/navigation";
import { fetchGraphQL } from "../../../lib/graphql";
import { HOME_TESTIMONIALS_QUERY } from "../../../lib/queries/testimonials";
import EventSingle from "../../../components/events/EventSingle";

export const dynamic = "force-dynamic";

function getWordPressUrl() {
  const graphqlUrl =
    process.env.WORDPRESS_GRAPHQL_URL ||
    `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/graphql`;

  return graphqlUrl
    .replace(/\/graphql\/?$/, "")
    .replace(/\/wp-json\/?$/, "")
    .replace(/\/+$/, "");
}

async function getEvent(slug) {
  const wordpressUrl = getWordPressUrl();

  const response = await fetch(
    `${wordpressUrl}/wp-json/wp/v2/events?slug=${encodeURIComponent(slug)}&_embed`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch event: ${response.status}`
    );
  }

  const events = await response.json();

  return Array.isArray(events) ? events[0] || null : null;
}

function stripHtml(value = "") {
  return String(value)
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .trim();
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  let event = null;

  try {
    event = await getEvent(slug);
  } catch (error) {
    console.error("Event metadata error:", error.message);
  }

  if (!event) {
    return {
      title: "Event Not Found | Resibuild",
    };
  }

  return {
    title: `${stripHtml(event.title?.rendered)} | Resibuild`,
    description: stripHtml(event.excerpt?.rendered || ""),
  };
}

export default async function EventSinglePage({ params }) {
  const { slug } = await params;

  let event = null;

  try {
    event = await getEvent(slug);
  } catch (error) {
    console.error("Event detail error:", error.message);
    throw error;
  }

  if (!event) {
    notFound();
  }

  let testimonialsResult = null;

  try {
    testimonialsResult = await fetchGraphQL(
      HOME_TESTIMONIALS_QUERY
    );
  } catch (error) {
    console.error(
      "Event testimonials error:",
      error.message
    );
  }

  const wpTestimonials =
    testimonialsResult?.allTestimonials?.nodes || [];

  const testimonials = wpTestimonials.map((item) => ({
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
  }));

  const testimonialBackgroundImage =
    testimonialsResult?.options
      ?.globalTestimonialSettings
      ?.testimonialBackgroundImage
      ?.node?.sourceUrl || "";

  return (
    <EventSingle
      event={event}
      testimonials={testimonials}
      testimonialBackgroundImage={
        testimonialBackgroundImage
      }
    />
  );
}