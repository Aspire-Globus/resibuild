export const COMMENTS_FIELDS = `
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
`;