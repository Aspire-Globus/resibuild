export const PRIMARY_MENU_QUERY = `
  query GetPrimaryMenu {
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