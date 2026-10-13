
import Link from "next/link";
import "./thank-you.css";

export const metadata = {
  title: "Thank You | Resibuild",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ThankYouPage() {
  return (
    <main className="thank-you-page">
      <div className="thank-you-page__container">
        <div className="thank-you-page__icon">
          ✓
        </div>

        <h1>Thank You!</h1>

        <h2>Your message has been received.</h2>

        <p>
          Thank you for contacting Resibuild.
          Our team will review your enquiry
          and get back to you as soon as possible.
        </p>

        <Link href="/" className="thank-you-page__button">
          Back to Homepage
        </Link>
      </div>
    </main>
  );
}
