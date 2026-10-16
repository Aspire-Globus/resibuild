export const PODCASTS_TWO_QUERY = `
  query GetPodcastsTemplateTwo {
    page(id: "/podcasts/", idType: URI) {
      databaseId
      title
      uri

      podcast {
        bannerContent {
          backgroundVideo {
            node {
              sourceUrl
              mediaItemUrl
              mimeType
            }
          }

          title
          description
          buttonText

          buttonLink {
            url
            title
            target
          }
        }

        podcastAvailable {
          heading

          podcastAvailableOn {
            platformImage {
              node {
                sourceUrl
                altText
              }
            }

            platformLink
          }
        }

        ctaSection {
          heading
          text
          buttonText

          buttonLink {
            url
            title
            target
          }

          backgroundImage {
            node {
              sourceUrl
              altText
            }
          }
        }
      }
    }

    allPodcasts(
      first: 100
      where: {
        orderby: {
          field: DATE
          order: DESC
        }
      }
    ) {
      nodes {
        databaseId
        title
        uri
        excerpt

        featuredImage {
          node {
            sourceUrl
            altText
          }
        }

        podcastsCategory {
          nodes {
            databaseId
            name
            slug
          }
        }

        podcastsPostType {
          podcastsAnalysis {
            listen
            likes
            comments
          }

          podcastAvailable {
            availableOn {
              image {
                node {
                  sourceUrl
                  altText
                }
              }

              link {
                url
                title
                target
              }
            }
          }
        }
      }
    }
  }
`;