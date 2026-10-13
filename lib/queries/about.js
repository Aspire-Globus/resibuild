export const ABOUT_PAGE_QUERY = `
  query GetAboutPage {
    page(id: "54", idType: DATABASE_ID) {
      databaseId
      title
      uri

      aboutPageFields {
        bannerContent {
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
              mediaItemUrl
              sourceUrl
              mimeType
            }
          }
        }

        aboutSection {
          heading
          description
          establishedYear
          cpdEvents
          peopleEducated
        }

        whyChooseSection {
          heading
          description

          image {
            node {
              sourceUrl
              altText
            }
          }

          points {
            enterPoint
          }
        }

        eventSection {
          heading
          buttonText

          buttonUrl {
            url
            title
            target
          }

          coreValues {
            title
            text

            image {
              node {
                sourceUrl
                altText
              }
            }
          }
        }
      }
    }
  }
`;