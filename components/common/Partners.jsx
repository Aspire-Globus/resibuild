import React from "react";

const Partners = ({ data }) => {
  return (
    <section className="partners-section">
      <div className="home-container">
        <h2>Our Partners</h2>

        <div className="partners-grid">
          {data.map((partner, index) => (
            <div className="partner-logo" key={index}>
              <img
                src={partner.logo}
                alt={partner.name}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;