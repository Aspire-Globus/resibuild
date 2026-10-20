import "./globals.css";

import { unstable_rethrow } from "next/navigation";

import Header from "../components/global/header/Header";
import Footer from "../components/global/footer/Footer";
import PageLoader from "../components/global/PageLoader/PageLoader";

import { fetchGraphQL } from "../lib/graphql";
import { GLOBAL_QUERY } from "../lib/queries/global";

export const dynamic = "force-dynamic";


export const metadata = {
  title: "Resibuild",
  description:
    "Construction events, CPD courses, podcasts and industry insights.",
  icons: {
    icon: [
      {
        url: "/images/Resifavicon.png",
        sizes: "any",
      },
    ],
    shortcut: "/images/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default async function RootLayout({ children }) {
  let globalData = null;

  try {
    globalData = await fetchGraphQL(GLOBAL_QUERY);
  } catch (error) {
    // Allow Next.js to handle internal dynamic-rendering errors.
    unstable_rethrow(error);

    // Log genuine WordPress/GraphQL failures.
    console.error(
      "Global GraphQL error:",
      error
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
      <head>
        <link
          rel="stylesheet"
          href="https://s.w.org/wp-includes/css/dashicons.css"
        />
      </head>

      <body>
        <PageLoader />

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