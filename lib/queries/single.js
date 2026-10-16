export const SINGLE_CONTENT_QUERY = `
  query GetSingleContent($uri: String!) {
    nodeByUri(uri: $uri) {
      __typename

      ... on Post {
        databaseId
        title
        uri
        slug
        date
        content
        excerpt

        featuredImage {
          node {
            sourceUrl
            altText
          }
        }

        categories {
          nodes {
            databaseId
            name
            slug
          }
        }

        tags {
          nodes {
            databaseId
            name
            slug
          }
        }
      }

      ... on Insights {
        databaseId
        title
        uri
        slug
        date
        content
        excerpt

        featuredImage {
          node {
            sourceUrl
            altText
          }
        }

        insightsCategories {
          nodes {
            databaseId
            name
            slug
          }
        }
      }

      ... on Events {
        databaseId
        title
        uri
        slug
        date
        content
        excerpt

        featuredImage {
          node {
            sourceUrl
            altText
          }
        }

        eventCategories {
          nodes {
            databaseId
            name
            slug
          }
        }

        eventsPostType {
          externalUrl
        }
      }

      ... on Podcasts {
        databaseId
        title
        uri
        slug
        date
        content
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
          featuredSection {
            details {
              name
              image {
                node {
                  sourceUrl
                  altText
                }
              }
              linkedinUrl {
                url
                title
                target
              }
            }
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