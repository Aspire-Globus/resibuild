export const HOME_INSIGHTS_QUERY = `
  query GetHomeInsights {
    allInsights(first: 6) {
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


export const INSIGHTS_PAGE_QUERY = `
  query GetInsightsPage {
    page(id: "/insights/", idType: URI) {
      databaseId
      title
      uri

      insightsPageFields {
        filterTitle

        bannerSection {
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
      }
    }

    allInsights(first: 100) {
      nodes {
        databaseId
        title
        uri
        excerpt
        date

        featuredImage {
          node {
            sourceUrl
            altText
          }
        }

        insightsCategories {
          nodes {
            name
            slug
          }
        }
      }
    }
  }
`;