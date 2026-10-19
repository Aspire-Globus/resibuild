import { notFound } from "next/navigation";
import InsightsSingle from "../../../components/insights/InsightsSingle/InsightsSingle";
import { fetchGraphQL } from "../../../lib/graphql";
import { SINGLE_CONTENT_QUERY } from "../../../lib/queries/single";
import { INSIGHTS_LIST_QUERY } from "../../../lib/queries/insights";

function getSlug(params) {
  return Array.isArray(params.slug) ? params.slug.join("/") : params.slug;
}

async function getInsight(slug) {
  if (!slug) return null;

  try {
    const result = await fetchGraphQL(SINGLE_CONTENT_QUERY, {
      uri: `/insights/${slug}/`,
    });

    return result?.nodeByUri?.__typename === "Insights"
      ? result.nodeByUri
      : null;
  } catch (error) {
    console.error("Insights single GraphQL error:", error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const insight = await getInsight(getSlug(resolvedParams));

  if (!insight) {
    return {
      title: "Insight Not Found | Resibuild",
    };
  }

  const stripHtml = (value) =>
    String(value || "")
      .replace(/<[^>]*>/g, "")
      .trim();

  return {
    title: `${stripHtml(insight.title)} | Resibuild`,
    description: stripHtml(insight.excerpt).slice(0, 160),
  };
}

export default async function InsightsSinglePage({ params }) {
  const resolvedParams = await params;
  const slug = getSlug(resolvedParams);

  const insight = await getInsight(slug);

  if (!insight) {
    notFound();
  }

  let insights = [];

  try {
    const result = await fetchGraphQL(INSIGHTS_LIST_QUERY);

    insights = result?.allInsights?.nodes || [];
  } catch (error) {
    console.error("Insights list GraphQL error:", error);
  }

  return <InsightsSingle insight={insight} insights={insights} />;
}