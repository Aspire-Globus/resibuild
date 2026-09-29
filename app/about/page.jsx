import AboutHero from "../../components/about/AboutHero";
import AboutInsights from "../../components/about/AboutInsights";

export const metadata = {
  title: "About | Resibuild",
};

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <AboutInsights />
    </main>
  );
}
