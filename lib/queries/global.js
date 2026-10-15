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

        footer2 {
          heading
        }
        footer3 {
          heading

          iconList {
            dashiconClass
            text
            link
          }
        }

        footer4 {
          newsletter

          socialIcons {
            icon
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