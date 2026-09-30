"use client";

import React, { useState } from "react";

const ContactForm = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Contact form:", form);
  };

  return (
    <section className="contact-form-section" id="contact-form">
      <div className="home-container">

        <h2>
          Resibuild: Leading Construction
          <br />
          Podcasts Since 2018
        </h2>

        <form
          className="contact-form"
          onSubmit={handleSubmit}
        >
          <div className="contact-form__grid">

            <div className="contact-form__field">
              <label htmlFor="firstName">
                Full Name
              </label>

              <input
                id="firstName"
                type="text"
                name="firstName"
                placeholder="eg: John Doe"
                value={form.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="contact-form__field">
              <label htmlFor="lastName">
                Full Name
              </label>

              <input
                id="lastName"
                type="text"
                name="lastName"
                placeholder="eg: John Doe"
                value={form.lastName}
                onChange={handleChange}
              />
            </div>

            <div className="contact-form__field">
              <label htmlFor="email">
                Full Name
              </label>

              <input
                id="email"
                type="email"
                name="email"
                placeholder="eg: John Doe"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="contact-form__field">
              <label htmlFor="phone">
                Full Name
              </label>

              <input
                id="phone"
                type="text"
                name="phone"
                placeholder="eg: John Doe"
                value={form.phone}
                onChange={handleChange}
              />
            </div>

          </div>

          <div className="contact-form__field contact-form__field--message">
            <label htmlFor="message">
              Full Name
            </label>

            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
            ></textarea>
          </div>

          <button type="submit">
            Send Message
            <span>→</span>
          </button>
        </form>

      </div>
    </section>
  );
};

export default ContactForm;