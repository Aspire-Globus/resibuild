export const GLOBAL_QUERY = `
  query GetGlobalData {
    options {
      header {
        headerLogo {
          node {
            sourceUrl
            altText
          }
        }

        stickeyHeaderLogo {
          node {
            sourceUrl
            altText
          }
        }
      }

      footer {
        footer1 {
          footerLogo {
            node {
              sourceUrl
              altText
            }
          }

          aboutText
        }

        footer3 {
          email
        }

        footer4 {
          newsletter

          socialIcons {
            url {
              url
              title
              target
            }
          }
        }

        copywriteText
      }
    }

    menu(id: "Primary Menu", idType: NAME) {
      menuItems(first: 50) {
        nodes {
          id
          label
          url
          path
          parentId
        }
      }
    }
  }
`;