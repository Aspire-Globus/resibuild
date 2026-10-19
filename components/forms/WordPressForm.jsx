"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";


export default function WordPressForm({
  html = "",
  className = "",
  successType = "redirect",
}) {
  const router = useRouter();
  const containerRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  /* =========================================
     DISABLE BROWSER NATIVE VALIDATION
  ========================================= */

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const forms = container.querySelectorAll("form");

    forms.forEach((form) => {
      form.setAttribute("novalidate", "novalidate");
      form.noValidate = true;
    });

    const fields = container.querySelectorAll(
      "input, textarea, select"
    );

    const handleInput = (event) => {
      clearFieldError(event.target);
    };

    fields.forEach((field) => {
      field.addEventListener("input", handleInput);
      field.addEventListener("change", handleInput);
    });

    return () => {
      fields.forEach((field) => {
        field.removeEventListener("input", handleInput);
        field.removeEventListener("change", handleInput);
      });
    };
  }, [html]);

  /* =========================================
     REMOVE FIELD ERROR
  ========================================= */

  const clearFieldError = (field) => {
    if (!field) return;

    field.classList.remove("wordpress-form-field-error");
    field.removeAttribute("aria-invalid");

    const wrapper =
      field.closest(".wpcf7-form-control-wrap") ||
      field.parentElement;

    if (!wrapper) return;

    const error = wrapper.querySelector(
      ".wordpress-form-error"
    );

    if (error) {
      error.remove();
    }
  };

  /* =========================================
     ADD FIELD ERROR
  ========================================= */

  const showFieldError = (field, messageText) => {
    if (!field) return;

    clearFieldError(field);

    field.classList.add("wordpress-form-field-error");
    field.setAttribute("aria-invalid", "true");

    const wrapper =
      field.closest(".wpcf7-form-control-wrap") ||
      field.parentElement;

    if (!wrapper) return;

    const errorElement = document.createElement("span");

    errorElement.className = "wordpress-form-error";
    errorElement.setAttribute("role", "alert");
    errorElement.textContent = messageText;

    wrapper.appendChild(errorElement);
  };

  /* =========================================
     EMAIL VALIDATION
  ========================================= */

  const isValidEmail = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  /* =========================================
     PHONE VALIDATION
  ========================================= */

  const isValidPhone = (value) => {
    /*
      Allows:
      9876543210
      +1 212 555 1234
      (212) 555-1234
      +44 20 7946 0958

      Requires 10-15 actual digits.
    */

    const allowedCharacters =
      /^[0-9+\-()\s.]+$/;

    if (!allowedCharacters.test(value)) {
      return false;
    }

    const digits = value.replace(/\D/g, "");

    return digits.length >= 10 && digits.length <= 15;
  };

  /* =========================================
     VALIDATE FORM
  ========================================= */

  const validateForm = (form) => {
    let isValid = true;
    let firstInvalidField = null;

    const fields = form.querySelectorAll(
      "input:not([type='hidden']):not([type='submit']):not([type='button']), textarea, select"
    );

    fields.forEach((field) => {
      clearFieldError(field);

      const value =
        typeof field.value === "string"
          ? field.value.trim()
          : "";

      const type =
        field.getAttribute("type")?.toLowerCase() || "";

      const name =
        field.getAttribute("name") || "";

      const required =
        field.hasAttribute("required") ||
        field.getAttribute("aria-required") === "true" ||
        field.classList.contains("wpcf7-validates-as-required");

      let errorMessage = "";

      /* REQUIRED */

      if (required && !value) {
        errorMessage = "This field is required.";
      }

      /* EMAIL */

      if (
        !errorMessage &&
        value &&
        (type === "email" ||
          field.classList.contains(
            "wpcf7-validates-as-email"
          ))
      ) {
        if (!isValidEmail(value)) {
          errorMessage =
            "Please enter a valid email address.";
        }
      }

      /* PHONE */

      if (
        !errorMessage &&
        value &&
        (type === "tel" ||
          name === "tel-812" ||
          field.classList.contains(
            "wpcf7-validates-as-tel"
          ))
      ) {
        if (!isValidPhone(value)) {
          errorMessage =
            "Please enter a valid phone number with 10 to 15 digits.";
        }
      }

      if (errorMessage) {
        isValid = false;

        showFieldError(field, errorMessage);

        if (!firstInvalidField) {
          firstInvalidField = field;
        }
      }
    });

    if (firstInvalidField) {
      firstInvalidField.focus();
    }

    return isValid;
  };

  /* =========================================
     SUBMIT FORM
  ========================================= */

  const handleSubmit = async (event) => {
    const form = event.target;

    if (!(form instanceof HTMLFormElement)) {
      return;
    }

    event.preventDefault();

    if (loading) return;

    setSuccess(false);
    setMessage("");

    /* CLIENT VALIDATION */

    const valid = validateForm(form);

    if (!valid) {
      setMessage(
        "Please check the highlighted fields and try again."
      );

      return;
    }

    setLoading(true);

    try {
      const formData = new FormData(form);

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
        /*
          If backend returns invalid field information,
          display the general message.
        */

        throw new Error(
          result.message ||
            "Unable to submit the form. Please check your information and try again."
        );
      }

      /* CONTACT FORM */

      if (successType === "redirect") {
        router.push("/thank-you/");
        return;
      }

      /* NEWSLETTER */

      form.reset();

      setSuccess(true);

      setMessage(
        "Thank you for subscribing! You have successfully subscribed to our newsletter."
      );
    } catch (error) {
      setSuccess(false);

      setMessage(
        error?.message ||
          "Submission failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className={className}
    >
      <div
        onSubmitCapture={handleSubmit}
        aria-busy={loading}
        dangerouslySetInnerHTML={{
          __html: html,
        }}
      />

      {loading && (
        <p
          role="status"
          className="wordpress-form-loading"
        >
          Submitting, please wait...
        </p>
      )}

      {message && (
        <div
          role={success ? "status" : "alert"}
          className={
            success
              ? "wordpress-form-success-message"
              : "wordpress-form-general-error"
          }
        >
          {message}
        </div>
      )}
    </div>
  );
}