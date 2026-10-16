
import PodcastTemplateOne from "./templates/PodcastTemplateOne";
import PodcastTemplateTwo from "./templates/PodcastTemplateTwo";

export const metadata = {
  title: "Podcasts | Resibuild",
};

const ACTIVE_TEMPLATE = "template1";

export default function PodcastsPage() {
  if (ACTIVE_TEMPLATE === "template2") {
    return <PodcastTemplateTwo />;
  }

  return <PodcastTemplateOne />;
}