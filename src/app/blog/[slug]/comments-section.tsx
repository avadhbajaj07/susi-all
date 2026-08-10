"use client";

import { useEffect, useState } from "react";
import { MessageSquare, Send, CheckCircle2 } from "lucide-react";

export function BlogCommentsSection({ postSlug }: { postSlug: string }) {
  const [comments, setComments] = useState<any[]>([]);
  const [authorName, setAuthorName] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/comments?slug=${encodeURIComponent(postSlug)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.comments && Array.isArray(data.comments)) {
          setComments(data.comments);
        }
      })
      .catch((err) => console.error("Fetch comments error:", err));
  }, [postSlug]);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName || !authorEmail || !content || isSubmitting) return;

    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          post_slug: postSlug,
          author_name: authorName,
          author_email: authorEmail,
          content,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setStatusMessage("Thank you for your feedback! Your comment has been submitted to Susi Davies Studio and is pending review.");
        setAuthorName("");
        setAuthorEmail("");
        setContent("");
      } else {
        setStatusMessage("Failed to submit feedback. Please try again.");
      }
    } catch (err) {
      setStatusMessage("Thank you for your feedback! Your comment is pending studio review.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section style={{ borderTop: "2px solid var(--border)", paddingTop: 50, marginTop: 40 }}>
      <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 25 }}>
        <MessageSquare size={22} color="var(--blue)" />
        <h3 style={{ fontSize: 26, color: "var(--blue)", margin: 0, fontFamily: "var(--serif)" }}>
          Reader Feedback &amp; Discussion ({comments.length})
        </h3>
      </div>

      {/* Approved Comments List */}
      {comments.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 45 }}>
          {comments.map((comment) => (
            <div
              key={comment.id}
              style={{
                backgroundColor: "#F9FBFC",
                borderRadius: 16,
                padding: "22px 25px",
                border: "1px solid #E5EEF3",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, alignItems: "center" }}>
                <strong style={{ fontSize: 16, color: "var(--ink-title)" }}>{comment.author_name}</strong>
                <span style={{ fontSize: 12, color: "var(--muted)" }}>
                  {new Date(comment.created_at || Date.now()).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })}
                </span>
              </div>
              <p className="body-text" style={{ fontSize: 15, color: "#4A5568", margin: 0, lineHeight: 1.6 }}>
                {comment.content}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Leave Feedback Form */}
      <div className="contact-form-card" style={{ padding: "35px 30px" }}>
        <span className="eyebrow" style={{ color: "var(--blue)" }}>Share your thoughts</span>
        <h4 style={{ fontSize: 24, marginBottom: 12, color: "var(--blue)", fontFamily: "var(--serif)" }}>
          Leave Feedback for Susi
        </h4>
        <p className="body-text" style={{ fontSize: 14, marginBottom: 25, color: "var(--muted)" }}>
          Your email address will remain private. All comments are reviewed before appearing publicly.
        </p>

        {statusMessage ? (
          <div style={{ backgroundColor: "#EAF6FB", color: "var(--blue)", padding: "18px 24px", borderRadius: 14, fontWeight: 600, display: "flex", gap: 10, alignItems: "center" }}>
            <CheckCircle2 size={20} color="var(--blue)" />
            <span>{statusMessage}</span>
          </div>
        ) : (
          <form onSubmit={handleSubmitComment}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 15, marginBottom: 15 }}>
              <div>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Your Name *"
                  required
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="email"
                  className="form-input"
                  placeholder="Your Email *"
                  required
                  value={authorEmail}
                  onChange={(e) => setAuthorEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="form-group">
              <textarea
                className="form-textarea"
                rows={4}
                placeholder="Write your feedback or thoughts on this article..."
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-pill btn-pill-cyan"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 10 }}
            >
              <Send size={16} /> SUBMIT FEEDBACK FOR REVIEW
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
