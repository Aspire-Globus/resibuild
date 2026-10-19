import WordPressForm from "../forms/WordPressForm";
import styles from "./ContactForm.module.css";

function decodeHtml(html = "") {
  if (!html) return "";

  return String(html)
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&");
}

export default function ContactForm({ data }) {
  if (!data) return null;

  let cleanFormHtml = data.formHtml || "";

  if (cleanFormHtml) {
    const formMatch = cleanFormHtml.match(
      /<form\b[^>]*>[\s\S]*?<\/form>/i
    );

    if (formMatch) {
      cleanFormHtml = formMatch[0];
    }
  }

  return (
    <section className={styles["contact-form-section"]}>
      <div className={styles["contact-form-section__container"]}>
        {data.heading && (
          <h2
            className={styles["contact-form-section__heading"]}
            dangerouslySetInnerHTML={{
              __html: decodeHtml(data.heading),
            }}
          />
        )}

        {cleanFormHtml && (
          <div className={styles["contact-form-section__form"]}>
            <WordPressForm
              html={cleanFormHtml}
              className={styles["contact-form-wrapper"]}
              successType="redirect"
            />
          </div>
        )}
      </div>
    </section>
  );
}