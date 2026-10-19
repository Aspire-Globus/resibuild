/* =========================================
   EVENTS USED ON OTHER PAGES
========================================= */

export const HOME_EVENTS_QUERY = `
  query GetHomeEvents {
    allEvents(first: 6) {
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
        eventCategories {
          nodes {
            databaseId
            name
            slug
          }
        }
      }
    }
  }
`;


/* =========================================
   EVENTS ARCHIVE PAGE
========================================= */

export const EVENTS_PAGE_QUERY = `
  query GetEventsPage {
    page(id: "/events/", idType: URI) {
      databaseId
      title
      uri

      eventsPageFields {
        bannerContent {
          title
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

        eventsSectionTitle

        ourPartners {
          addImage {
            node {
              sourceUrl
              altText
            }
          }
        }
      }
    }

    allEvents(first: 100) {
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
export const EVENT_SINGLE_QUERY = `
  query GetSingleEvent($slug: ID!) {
    events(id: $slug, idType: SLUG) {
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

      eventsPostType {
        externalUrl

        bannerSection {
          heading
          subHeading
        }

        aboutSection {
          aboutTitle
          description
          image {
            node {
              sourceUrl
              altText
            }
          }
        }

        sidebar {
          event
          category
          location
          date

          days {
            day
            event
          }
        }
      }
      commentStatus
      comments(first: 100) {
        nodes {
          id
          databaseId
          content
          date
          author {
            node {
              name
            }
          }
        }
      }
    }
  }
`;