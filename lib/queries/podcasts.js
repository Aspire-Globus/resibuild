/* =========================================
   PODCASTS USED ON HOME / ABOUT
========================================= */

export const HOME_PODCASTS_QUERY = `
  query GetHomePodcasts {
    allPodcasts(first: 12) {
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
      }
    }
  }
`;


/* =========================================
   PODCAST ARCHIVE PAGE
========================================= */

export const PODCASTS_PAGE_QUERY = `
  query GetPodcastsPage {
    page(id: "/podcasts/", idType: URI) {
      databaseId
      title
      uri
      content

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

    allPodcasts(first: 100) {
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
      }
    }
  }
`;