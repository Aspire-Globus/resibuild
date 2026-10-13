import "./globals.css";

import Header from "../components/Header";
import Footer from "../components/Footer";

import { fetchGraphQL } from "../lib/graphql";
import { GLOBAL_QUERY } from "../lib/queries/global";

export const metadata = {
  title: "Resibuild",
  description:
    "Construction events, CPD courses, podcasts and industry insights.",
};

export default async function RootLayout({ children }) {
  let globalData = null;

  try {
    globalData = await fetchGraphQL(
      GLOBAL_QUERY
    );
  } catch (error) {
    console.log(
      "Global GraphQL error:",
      error.message
    );
  }

  const header =
    globalData?.options?.header || null;

  const footer =
    globalData?.options?.footer || null;

  const menuItems =
    globalData?.menu?.menuItems?.nodes || [];

  return (
    <html lang="en">
      <body>
        <Header
          data={header}
          menuItems={menuItems}
        />

        {children}

        <Footer
          data={footer}
          menuItems={menuItems}
        />
      </body>
    </html>
  );
}