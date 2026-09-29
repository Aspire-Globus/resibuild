import React from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";

import EventsArchiveHero from "../components/events/EventsArchiveHero";
import EventsArchiveGrid from "../components/events/EventsArchiveGrid";

import PodcastCTA from "../components/home/PodcastCTA";
import ClientTestimonial from "../components/home/ClientTestimonial";

import Partners from "../components/common/Partners";

import { homeData } from "../data/homeData";

const Events = () => {
  return (
    <>
      <Header />

      <main>
        <EventsArchiveHero />

        <EventsArchiveGrid />

        <PodcastCTA
          data={homeData.podcastCTA}
        />

        <Partners
          data={homeData.partners}
        />

        <ClientTestimonial
          data={homeData.testimonial}
        />

        <PodcastCTA
          data={homeData.podcastCTA}
        />
      </main>

      <Footer />
    </>
  );
};

export default Events;