import HeroSlider from "../components/home/HeroSlider";
import LeadingInsights from "../components/home/LeadingInsights";
import EventsOnDemand from "../components/home/EventsOnDemand";
import PodcastCTA from "../components/home/PodcastCTA";
import InspirationNews from "../components/home/InspirationNews";
import IndustryUpdates from "../components/home/IndustryUpdates";
import ExternalEnvelope from "../components/home/ExternalEnvelope";
import ClientTestimonial from "../components/home/ClientTestimonial";

import { homeData } from "../data/homeData";

export default function HomePage() {
  return (
    <main>
      <HeroSlider slides={homeData.heroSlider} />

      <LeadingInsights data={homeData.leadingInsights} />

      <EventsOnDemand data={homeData.eventsOnDemand} />

      <PodcastCTA data={homeData.podcastCTA} />

      <InspirationNews data={homeData.inspirationNews} />

      <IndustryUpdates data={homeData.industryUpdates} />

      <ExternalEnvelope data={homeData.externalEnvelope} />

      <ClientTestimonial data={homeData.testimonial} />
    </main>
  );
}