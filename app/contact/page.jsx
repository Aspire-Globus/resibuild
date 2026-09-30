import "./contact.css";
import ContactHero from "../../components/contact/ContactHero";
import ContactIntro from "../../components/contact/ContactIntro";
import ContactForm from "../../components/contact/ContactForm";

import PodcastCTA from "../../components/home/PodcastCTA";
import ClientTestimonial from "../../components/home/ClientTestimonial";

import { homeData } from "../../data/homeData";

export const metadata = {
  title: "Contact Us | Resibuild",
};

export default function ContactPage() {
  return (
    <main>
      <ContactHero />

      <ContactIntro />

      <ContactForm />

      <PodcastCTA
        data={homeData.podcastCTA}
      />

      <ClientTestimonial
        data={homeData.testimonial}
      />
    </main>
  );
}