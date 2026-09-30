import "./insights.css";
import InsightsHero from "../../components/insights/InsightsHero";
import InsightsSlider from "../../components/insights/InsightsSlider";

import InspirationNews from "../../components/home/InspirationNews";
import ExternalEnvelope from "../../components/home/ExternalEnvelope";
import ClientTestimonial from "../../components/home/ClientTestimonial";

import UpcomingEvents from "../../components/podcast/UpcomingEvents";

import { homeData } from "../../data/homeData";

export const metadata = {
  title: "Insights | Resibuild",
};

export default function InsightsPage() {
  return (
    <main>
      <InsightsHero />

      <InsightsSlider />

      <InspirationNews
        data={homeData.inspirationNews}
      />

      <UpcomingEvents />

      <ExternalEnvelope
        data={homeData.externalEnvelope}
      />

      <ClientTestimonial
        data={homeData.testimonial}
      />
    </main>
  );
}