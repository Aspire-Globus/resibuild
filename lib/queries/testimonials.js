export const HOME_TESTIMONIALS_QUERY = `
  query GetHomeTestimonials {
    allTestimonials(first: 5) {
      nodes {
        databaseId
        content

        testimonialFields {
          clientName
          clientDesignation
        }
      }
    }
    options {
      globalTestimonialSettings {
        testimonialBackgroundImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;