export const HOME_PAGE_QUERY = `
  query GetHomePage {
    page(id: "home", idType: URI) {
      databaseId
      title
      uri

      homePageFields {
        slider {
          backgroundVideo {
            node {
              mediaItemUrl
              sourceUrl
              mimeType
            }
          }

          slidesData {
            title
            leftButtonText
            leftButtonLink {
              url
              title
              target
            }
            rightButtonText
            rightButtonLink {
              url
              title
              target
            }
          }
        }

        secondSection {
          leftImage {
            node {
              sourceUrl
              altText
            }
          }

          title
          description
          establishedYear
          cpdEvents
          peopleEducated
        }

        speakerSection {
          title

          speakerImages {
            image {
              node {
                sourceUrl
                altText
              }
            }
          }
        }

        eventSection {
          heading
        }

        cta {
          title
          buttonText
          buttonUrl {
            url
            title
            target
          }
        }

        podcastSection {
          heading
        }

        insightsSection {
          heading
          description
          linkTitle
          url {
            url
            title
            target
          }
        }

        ctaBooking {
          image {
            node {
              sourceUrl
              altText
            }
          }

          heading
          description
          buttonText
          buttonUrl {
            url
            title
            target
          }
        }
      }
    }
  }
`;