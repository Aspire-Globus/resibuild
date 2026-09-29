import EventsArchiveHero from "../../components/events/EventsArchiveHero";
import EventsArchiveGrid from "../../components/events/EventsArchiveGrid";
import PodcastCTA from "../../components/home/PodcastCTA";
import ClientTestimonial from "../../components/home/ClientTestimonial";
import Partners from "../../components/common/Partners";

import { homeData } from "../../data/homeData";

export const metadata = {
  title: "Events | Resibuild",
};

export default function EventsPage() {
  return (
    <main>
      <EventsArchiveHero />

      <EventsArchiveGrid />

      <PodcastCTA data={homeData.podcastCTA} />

      <Partners data={homeData.partners} />

      <ClientTestimonial data={homeData.testimonial} />

      <PodcastCTA data={homeData.podcastCTA} />
    </main>
  );
}