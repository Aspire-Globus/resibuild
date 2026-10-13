
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const formData = await request.formData();

    const formId = String(
      formData.get("_wpcf7") ||
      formData.get("formId") ||
      ""
    );

    if (!/^\d+$/.test(formId)) {
      return NextResponse.json(
        {
          success: false,
          message: "Contact Form 7 form ID is missing.",
        },
        { status: 400 }
      );
    }

    formData.delete("formId");

    const wordpressUrl =
      process.env.NEXT_PUBLIC_WORDPRESS_URL ||
      process.env.WORDPRESS_GRAPHQL_URL
        ?.replace(/\/graphql\/?$/, "");

    if (!wordpressUrl) {
      return NextResponse.json(
        {
          success: false,
          message: "WordPress URL is not configured.",
        },
        { status: 500 }
      );
    }

    const endpoint =
      `${wordpressUrl.replace(/\/$/, "")}` +
      `/wp-json/contact-form-7/v1/contact-forms/` +
      `${formId}/feedback`;

    const response = await fetch(endpoint, {
      method: "POST",
      body: formData,
      cache: "no-store",
    });

    const result = await response.json();

    return NextResponse.json(
      {
        success:
          response.ok &&
          result.status === "mail_sent",

        status: result.status,

        message:
          result.message ||
          "Unable to submit the form.",

        invalidFields:
          result.invalid_fields || [],
      },
      {
        status: response.ok ? 200 : 502,
      }
    );
  } catch (error) {
    console.error("Contact form error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Something went wrong. Please try again.",
      },
      { status: 500 }
    );
  }
}
