export const CONTACT_PAGE_QUERY = `
  query GetContactPage {
    page(id: "/contact-us/", idType: URI) {
      databaseId
      title
      uri

      contactUs {

        bannerSection {
          heading
          description
          buttonText

          buttonLink {
            url
            title
            target
          }

          backgroundVideo {
            node {
              sourceUrl
              mediaItemUrl
              mimeType
            }
          }
        }

        sectionSection {
          title
          text

          image {
            node {
              sourceUrl
              altText
            }
          }
          email
          followHeading
          linkedinUrl
        }

        contactSection {
          heading
          contactForm
        }
      }
    }
  }
`;