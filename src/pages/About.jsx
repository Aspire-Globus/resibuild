import React from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";

import AboutHero from "../components/about/AboutHero";
import AboutInsights from "../components/about/AboutInsights";

const About = () => {
  return (
    <>
      <Header />

      <main>
        <AboutHero />
        <AboutInsights />
      </main>

      <Footer />
    </>
  );
};

export default About;