import React, { useState } from "react";

const EventsOnDemand = ({ data }) => {
  const [topic, setTopic] = useState("all");

  const filteredItems =
    topic === "all"
      ? data.items
      : data.items.filter((item) => item.topic === topic);

  return (
    <section className="events-demand" id="events">
      <div className="home-container">

        <div className="events-demand__header">

          <h2>
            <span>{data.headingPrefix}</span>
            {" - "}
            {data.heading}
          </h2>

          <div className="events-demand__filter">
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            >
              <option value="all">{data.filterLabel}</option>
              <option value="Events">Events</option>
              <option value="CPD">CPD</option>
              <option value="Insight">Insight</option>
            </select>
          </div>

        </div>

        <div className="events-demand__grid">

          {filteredItems.map((item, index) => (
            <article
              className="event-demand-card"
              key={`${item.title}-${index}`}
            >

              <img
                src={item.image}
                alt={item.title}
              />

              <div className="event-demand-card__gradient"></div>

              <h3>{item.title}</h3>

            </article>
          ))}

        </div>

        <div className="events-demand__footer">
          <a
            href={data.buttonUrl}
            className="events-demand__button"
          >
            {data.buttonLabel}
          </a>
        </div>

      </div>
    </section>
  );
};

export default EventsOnDemand;