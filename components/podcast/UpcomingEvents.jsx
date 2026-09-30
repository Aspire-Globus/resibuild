import React from "react";

const upcomingEvents = [
  {
    title: "Beyond the Skyline: Bringing the Future to you",
    image: "/images/event-archive-3.png",
  },
  {
    title: "MMC Offsite, Competency and Sustainability",
    image: "/images/event-archive-2.png",
  },
  {
    title: "Navigating the Fast-Changing Landscape",
    image: "/images/event-archive-1.png",
  },
];

const UpcomingEvents = () => {
  return (
    <section className="upcoming-events">
      <div className="home-container">

        <div className="upcoming-events__heading">
          <h2>
            <span>Upcoming Events</span> - Finding
            <br />
            inspiration in every turn
          </h2>

          <a href="/events">
            Find Out More
            <span>→</span>
          </a>
        </div>

        <div className="upcoming-events__grid">

          {upcomingEvents.map((event, index) => (
            <article className="upcoming-event-card" key={index}>

              <img
                src={event.image}
                alt={event.title}
              />

              <div className="upcoming-event-card__content">
                <h3>{event.title}</h3>

                <p>
                  Resibuild Events teamed up with the Institute
                  of Construction Management to bring...
                </p>

                <a href="#">
                  Read More
                  <span>→</span>
                </a>
              </div>

            </article>
          ))}

        </div>

      </div>
    </section>
  );
};

export default UpcomingEvents;