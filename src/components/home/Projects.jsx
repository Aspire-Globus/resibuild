import React from "react";

const Projects = ({ data }) => (
  <section className="section projects-section" id="projects">
    <div className="container">
      <div className="section-heading-grid projects-heading">
        <div>
          <span className="eyebrow eyebrow-light">{data.eyebrow}</span>
          <h2>{data.heading}</h2>
        </div>
        <p>{data.description}</p>
      </div>

      <div className="projects-grid">
        {data.items.map((project, index) => (
          <article className="project-card" key={index}>
            <div className="project-image">
              <img src={project.image} alt={project.title} />
              <span className="project-arrow">↗</span>
            </div>

            <div className="project-meta">
              <span>{project.category}</span>
              <span>{project.location}</span>
            </div>

            <h3>{project.title}</h3>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Projects;
