import "./globals.css";

import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "Resibuild Events",
  description: "Construction events, CPD courses, podcasts and industry insights.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
