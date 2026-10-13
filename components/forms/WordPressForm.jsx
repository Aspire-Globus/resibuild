
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function WordPressForm({
  html = "",
  className = "",
  successType = "redirect",
}) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    const form = event.target;

    if (!(form instanceof HTMLFormElement)) {
      return;
    }

    event.preventDefault();

    if (loading) return;

    setLoading(true);
    setMessage("");

    try {
      const formData = new FormData(form);

      // CF7 normally provides this hidden field.
      const formId =
        formData.get("_wpcf7") ||
        form.getAttribute("data-wpcf7-id") ||
        "";

      if (!formId) {
        throw new Error(
          "Form ID is missing. Check the WordPress form HTML."
        );
      }

      formData.set("formId", String(formId));

      const response = await fetch(
        "/api/contact-form",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
          "Unable to submit the form."
        );
      }

      if (successType === "redirect") {
        router.push("/thank-you/");
        return;
      }

      form.reset();

      setSuccess(true);
      setMessage(
        "Thank you for subscribing! You have successfully subscribed to our newsletter."
      );
    } catch (error) {
      setMessage(
        error.message ||
        "Submission failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={className}>
      <div
        onSubmitCapture={handleSubmit}
        aria-busy={loading}
        dangerouslySetInnerHTML={{
          __html: html,
        }}
      />

      {loading && (
        <p role="status" className="form-loading">
          Submitting, please wait...
        </p>
      )}

      {message && (
        <div
          role={success ? "status" : "alert"}
          className={
            success
              ? "form-success-message"
              : "form-error-message"
          }
        >
          {message}
        </div>
      )}
    </div>
  );
}
