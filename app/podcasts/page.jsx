import "./podcasts.css";
import PodcastHero from "../../components/podcast/PodcastHero";
import PodcastInsights from "../../components/podcast/PodcastInsights";
import PodcastAvailable from "../../components/podcast/PodcastAvailable";
import PodcastGrid from "../../components/podcast/PodcastGrid";
import ThoughtLeaderCTA from "../../components/podcast/ThoughtLeaderCTA";
import UpcomingEvents from "../../components/podcast/UpcomingEvents";

import ClientTestimonial from "../../components/home/ClientTestimonial";


import { homeData } from "../../data/homeData";

export const metadata = {
  title: "Podcasts | Resibuild",
};

export default function PodcastsPage() {
  return (
    <main>
      <PodcastHero />

      <PodcastInsights />

      <PodcastAvailable />

      <PodcastGrid />

      <ThoughtLeaderCTA />

      <UpcomingEvents />

      <ClientTestimonial
        data={homeData.testimonial}
      />
    </main>
  );
}