export const CPD_PAGE_QUERY = `
  query GetCpdPage {
    page(id: "/cpd/", idType: URI) {
      databaseId
      title
      uri

      cpdPageFields {

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
              mediaItemUrl
              sourceUrl
              mimeType
            }
          }
        }

        designCpdSection {
          heading
          text

          aboutCpd {
            aboutHeading
            text

            image {
              node {
                sourceUrl
                altText
              }
            }

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

        designFireSection {
          heading
          text

          aboutCpd {
            aboutHeading
            text

            image {
              node {
                sourceUrl
                altText
              }
            }

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

      }
    }
  }
`;