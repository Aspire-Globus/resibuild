
import WordPressForm from "../forms/WordPressForm";

export default function ContactForm({ data }) {
  if (!data) return null;

  let cleanFormHtml = data.formHtml || "";

  if (cleanFormHtml) {
    const formMatch = cleanFormHtml.match(
      /<form[\s\S]*?<\/form>/i
    );

    if (formMatch) {
      cleanFormHtml = formMatch[0];
    }
  }

  return (
    <section className="contact-form-section">
      <div className="contact-container">
        {data.heading && (
          <h2
            className="contact-form-section__heading"
            dangerouslySetInnerHTML={{
              __html: data.heading,
            }}
          />
        )}

        {cleanFormHtml && (
          <WordPressForm
            html={cleanFormHtml}
            className="contact-form-wrapper"
            successType="redirect"
          />
        )}
      </div>
    </section>
  );
}
