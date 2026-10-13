export async function fetchGraphQL(query, variables = {}) {
  const endpoint =
    process.env.WORDPRESS_GRAPHQL_URL ||
    `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/graphql`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    const text = await response.text();

    console.log("GraphQL endpoint:", endpoint);
    console.log("GraphQL response:", text);

    throw new Error(
      `GraphQL request failed with status ${response.status}`
    );
  }

  const result = await response.json();

  if (result.errors) {
    console.log("GraphQL errors:", result.errors);

    throw new Error(
      result.errors
        .map((error) => error.message)
        .join(", ")
    );
  }

  return result.data;
}