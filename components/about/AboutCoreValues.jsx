import Link from "next/link";

const values = [
  {
    title: "Beyond the Skyline: Bringing the Future to you",
    image: "/images/event-archive-1.png",
  },
  {
    title: "MMC Offsite, Competency and Sustainability",
    image: "/images/event-archive-1.png",
  },
  {
    title: "Navigating the Fast-Changing Landscape",
    image: "/images/event-archive-1.png",
  },
  {
    title: "Beyond the Skyline: Bringing the Future to you",
    image: "/images/event-archive-1.png",
  },
];

export default function AboutCoreValues() {
  return (
    <section className="about-core-values">
      <div className="home-container">

        <div className="about-core-values__heading">
          <h2>
            <span>Core Values</span> Finding
            <br />
            inspiration in every turn
          </h2>

          <Link href="/contact">
            Get In Touch
            <span>→</span>
          </Link>
        </div>

        <div className="about-core-values__grid">

          {values.map((item, index) => (
            <article
              className="about-core-value-card"
              key={index}
            >
              <img
                src={item.image}
                alt={item.title}
              />

              <div className="about-core-value-card__overlay"></div>

              <h3>{item.title}</h3>
            </article>
          ))}

        </div>

      </div>
    </section>
  );
}