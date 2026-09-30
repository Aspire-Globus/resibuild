import "./about.css";

import AboutHero from "../../components/about/AboutHero";
import AboutInsights from "../../components/about/AboutInsights";
import AboutWhyChoose from "../../components/about/AboutWhyChoose";
import AboutStayInspired from "../../components/about/AboutStayInspired";
import AboutCoreValues from "../../components/about/AboutCoreValues";

import PodcastCTA from "../../components/home/PodcastCTA";
import ClientTestimonial from "../../components/home/ClientTestimonial";

import { homeData } from "../../data/homeData";

export const metadata = {
  title: "About | Resibuild",
};

export default function AboutPage() {
  return (
    <main className="about-page">
      <AboutHero />

      <AboutInsights />

      <AboutWhyChoose />

      <AboutStayInspired />

      <AboutCoreValues />

      <PodcastCTA data={homeData.podcastCTA} />

      <ClientTestimonial data={homeData.testimonial} />
    </main>
  );
}