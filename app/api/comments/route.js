import { NextResponse } from "next/server";

export const runtime = "nodejs";

function getWordPressUrl() {
  const url =
    process.env.WORDPRESS_URL ||
    process.env.WP_URL ||
    process.env.NEXT_PUBLIC_WORDPRESS_URL ||
    "";

  return url
    .replace(/\/graphql\/?$/, "")
    .replace(/\/wp-json\/?$/, "")
    .replace(/\/+$/, "");
}

export async function POST(request) {
  try {
    const body = await request.json();

    const postId = Number(body.postId);
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const comment = String(body.comment || "").trim();

    if (!Number.isSafeInteger(postId) || postId <= 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid post ID.",
        },
        { status: 400 }
      );
    }

    if (!name || !email || !comment) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill in all required fields.",
        },
        { status: 400 }
      );
    }

    if (
      name.length > 150 ||
      email.length > 254 ||
      comment.length > 10000 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter valid comment details.",
        },
        { status: 400 }
      );
    }

    const wordpressUrl = getWordPressUrl();

    if (!wordpressUrl) {
      return NextResponse.json(
        {
          success: false,
          message: "WordPress URL is not configured.",
        },
        { status: 503 }
      );
    }

    const response = await fetch(
      `${wordpressUrl}/wp-json/wp/v2/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          post: postId,
          author_name: name,
          author_email: email,
          content: comment,
        }),
        cache: "no-store",
        signal: AbortSignal.timeout(15000),
      }
    );

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      console.error("WordPress REST Comment Error:", {
        status: response.status,
        code: data.code,
        message: data.message,
        postId,
      });

      const errors = {
        rest_comment_closed:
          "Comments are closed for this post.",

        rest_comment_login_required:
          "WordPress REST API is blocking guest comments.",

        rest_comment_invalid_post_id:
          "This WordPress post does not accept comments.",

        comment_duplicate:
          "You have already submitted this comment.",

        comment_flood:
          "Please wait before submitting another comment.",

        rest_comment_content_invalid:
          "Please enter a valid comment.",

        rest_comment_author_data_required:
          "Please enter your name and email.",
      };

      return NextResponse.json(
        {
          success: false,
          message:
            errors[data.code] ||
            data.message ||
            "Unable to submit your comment.",
        },
        {
          status: response.status >= 500 ? 502 : 400,
        }
      );
    }

    const pending = [
      "hold",
      "pending",
      "unapproved",
      "0",
    ].includes(String(data.status));

    return NextResponse.json(
      {
        success: true,
        pending,
        message: pending
          ? "Thank you! Your comment has been submitted and is awaiting admin approval."
          : "Thank you! Your comment has been submitted successfully.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Comment API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again.",
      },
      { status: 500 }
    );
  }
}