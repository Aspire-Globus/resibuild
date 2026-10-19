"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./Comments.module.css";

const formatDate = (date) => {
  if (!date) return "";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return "";

  return parsed.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const getAuthorName = (item) => {
  return item.author?.node?.name?.trim() || "Anonymous";
};

const getInitial = (name) => {
  return Array.from(name.trim())[0]?.toLocaleUpperCase() || "A";
};

export default function Comments({
  postId,
  comments = [],
  commentsOpen = true,
}) {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    comment: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (loading || !postId) return;

    setLoading(true);
    setMessage("");
    setStatus("");

    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId,
          ...form,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Unable to submit your comment."
        );
      }

      setStatus("success");
      setMessage(result.message);

      setForm((previous) => ({
        ...previous,
        comment: "",
      }));

      if (!result.pending) {
        router.refresh();
      }
    } catch (error) {
      setStatus("error");
      setMessage(
        error.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.comments}>
      <div className={styles.commentsList}>
        <h3>
          {comments.length}{" "}
          {comments.length === 1 ? "Comment" : "Comments"}
        </h3>

        {comments.length > 0 ? (
          <div className={styles.commentItems}>
            {comments.map((item) => {
              const authorName = getAuthorName(item);
              const firstLetter = getInitial(authorName);

              return (
                <article
                  key={item.id || item.databaseId}
                  className={styles.commentItem}
                >
                  <div
                    className={styles.avatar}
                    aria-hidden="true"
                  >
                    {firstLetter}
                  </div>

                  <div className={styles.commentBody}>
                    <div className={styles.commentHeader}>
                      <h4>{authorName}</h4>

                      {item.date && (
                        <span>{formatDate(item.date)}</span>
                      )}
                    </div>

                    <div
                      className={styles.commentContent}
                      dangerouslySetInnerHTML={{
                        __html: item.content || "",
                      }}
                    />
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <p>No comments yet. Be the first to comment!</p>
        )}
      </div>

      {commentsOpen ? (
        <div className={styles.reply}>
          <h3>Leave A Reply</h3>

          <p>
            Your email address will not be published. Required fields
            are marked *
          </p>

          <form
            className={styles.form}
            onSubmit={handleSubmit}
          >
            <div className={styles.row}>
              <div className={styles.field}>
                <label htmlFor={`comment-name-${postId}`}>
                  Name *
                </label>

                <input
                  id={`comment-name-${postId}`}
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  autoComplete="name"
                  maxLength={150}
                  required
                />
              </div>

              <div className={styles.field}>
                <label htmlFor={`comment-email-${postId}`}>
                  Email *
                </label>

                <input
                  id={`comment-email-${postId}`}
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="email"
                  maxLength={254}
                  required
                />
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor={`comment-content-${postId}`}>
                Comment *
              </label>

              <textarea
                id={`comment-content-${postId}`}
                name="comment"
                rows={6}
                value={form.comment}
                onChange={handleChange}
                maxLength={10000}
                required
              />
            </div>

            {message && (
              <p
                role={status === "error" ? "alert" : "status"}
                className={
                  status === "success"
                    ? styles.success
                    : styles.error
                }
              >
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={loading || !postId}
            >
              {loading ? "Submitting..." : "Post A Comment"}
            </button>
          </form>
        </div>
      ) : (
        <p className={styles.closed}>
          Comments are closed for this post.
        </p>
      )}
    </section>
  );
}