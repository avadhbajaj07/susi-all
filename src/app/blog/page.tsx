"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ArrowUpRight, BookOpen, Calendar, Tag } from "lucide-react";

export default function JournalPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [subEmail, setSubEmail] = useState("");
  const [subMessage, setSubMessage] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => {
        if (data.posts && data.posts.length > 0) {
          setPosts(data.posts);
        }
      })
      .catch((err) => console.error("Fetch posts error:", err));
  }, []);

  const [honeypot, setHoneypot] = useState("");
  const [isHumanVerified, setIsHumanVerified] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot || !isHumanVerified || !subEmail) return;

    try {
      // 1. Save subscriber to Supabase database
      await fetch("/api/subscribers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: subEmail.split("@")[0],
          email: subEmail,
          segment: "Journal Subscriber",
        }),
      }).catch(() => {});

      // 2. Dispatch notification email to Susi's Gmail (susidavies@gmail.com)
      await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: "susidavies@gmail.com",
          subject: `New Journal Subscriber: ${subEmail}`,
          body: `New subscriber joined Susi's Journal on susidavies.com:\n\nEmail: ${subEmail}\nStatus: Subscribed`,
          fromName: "Susi Davies Journal Subscription",
        }),
      }).catch(() => {});

      // 3. Dispatch automated 24-hr thank-you confirmation email to client
      await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: subEmail,
          subject: "Welcome to Susi Davies' Journal",
          body: `Dear Subscriber,\n\nThank you for subscribing to Susi Davies' Journal! You will now receive Susi's practice notes, movement guidance, and retreat announcements directly in your inbox.\n\nWarm regards,\nSusi Davies & Team\nhttps://susidavies.com`,
          fromName: "Susi Davies Studio",
        }),
      }).catch(() => {});

      setSubMessage("Thank you for subscribing! An automated welcome confirmation has been sent to your email.");
      setSubEmail("");
    } catch (err) {
      setSubMessage("Thank you for subscribing to Susi's Journal!");
    }
  };

  return (
    <main>
      <SiteHeader />

      {/* Page Hero Banner */}
      <section className="page-banner">
        <div>
          <h1>The Susi Davies Journal</h1>
        </div>
        <span className="page-banner-arrow">⌄</span>
      </section>

      <div className="container">
        {/* Intro */}
        <section style={{ textAlign: "center", marginBottom: 70 }}>
          <span className="eyebrow" style={{ color: "var(--blue)", fontSize: 14 }}>
            Reflections &amp; Insights
          </span>
          <h2 className="section-heading" style={{ margin: "12px 0 20px" }}>
            Notes for a More Connected Life
          </h2>
          <p className="body-text" style={{ maxWidth: 780, margin: "0 auto" }}>
            A calm space for Susi&apos;s practice notes, retreat news, movement insight, and reflections on teaching, breathwork, and living well.
          </p>
        </section>

        {/* Dynamic Journal Posts Grid */}
        <section style={{ marginBottom: 90 }}>
          {posts.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 20px", backgroundColor: "#ffffff", borderRadius: 20, border: "1px dashed #E2DDD3", maxWidth: 640, margin: "0 auto" }}>
              <p style={{ fontSize: 18, color: "var(--blue)", fontFamily: "var(--serif)", marginBottom: 8 }}>
                No Journal Articles Published Yet
              </p>
              <p style={{ fontSize: 14, color: "var(--muted)", margin: 0 }}>
                Check back soon for Susi&apos;s practice notes, retreat reflections, and movement guidance.
              </p>
            </div>
          ) : (
            <div className="service-cards-4grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 30 }}>
              {posts.map((post) => {
                const slug = post.slug || post.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
                return (
                  <article
                    key={post.id}
                    className="service-card-item"
                    style={{ textAlign: "left", padding: 0, overflow: "hidden", cursor: "pointer", display: "flex", flexDirection: "column" }}
                  >
                    <Link href={`/blog/${slug}`} style={{ textDecoration: "none", color: "inherit", display: "flex", flexDirection: "column", height: "100%" }}>
                      <div className="image-card-rounded" style={{ borderRadius: "18px 18px 0 0", boxShadow: "none" }}>
                        <img
                          src={post.image || "https://res.cloudinary.com/qtah71h2/image/upload/v1786527175/susi-davies15.jpg"}
                          alt={post.title}
                          style={{ width: "100%", height: "240px", objectFit: "cover", display: "block" }}
                        />
                      </div>
                      <div style={{ padding: "25px 22px", display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-between" }}>
                        <div>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                            <span className="ym-badge ym-badge-light" style={{ margin: 0 }}>
                              <Tag size={11} style={{ marginRight: 5, verticalAlign: "middle" }} />
                              {post.category || "Practice Notes"}
                            </span>
                            <span style={{ fontSize: 12, color: "var(--muted)" }}>{post.readTime || "5 min read"}</span>
                          </div>

                          <h3 style={{ fontSize: 20, color: "var(--blue)", margin: "10px 0 12px", lineHeight: 1.35 }}>
                            {post.title}
                          </h3>

                          <p className="body-text" style={{ fontSize: 15, lineHeight: "26px", color: "var(--muted)", marginBottom: 22 }}>
                            {post.excerpt || post.content?.slice(0, 150) + "..."}
                          </p>
                        </div>

                        <div style={{ borderTop: "1px solid var(--border)", paddingTop: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ fontSize: 13, color: "var(--muted)", display: "flex", alignItems: "center", gap: 5 }}>
                            <Calendar size={14} />
                            {post.date}
                          </span>
                          <span
                            style={{ fontSize: 13, fontWeight: 700, color: "var(--blue)", display: "inline-flex", alignItems: "center", gap: 4 }}
                          >
                            Read Article <ArrowUpRight size={15} />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        {/* Journal Subscription Card */}
        <section className="contact-form-card" style={{ maxWidth: 850, margin: "0 auto 80px", textAlign: "center", padding: "50px 40px" }}>
          <div style={{ margin: "0 auto 15px", width: 50, height: 50, borderRadius: "50%", background: "rgba(38,145,186,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--blue)" }}>
            <BookOpen size={24} />
          </div>
          <span className="eyebrow">Stay Connected</span>
          <h2 className="section-heading" style={{ fontSize: 36, marginBottom: 16 }}>
            Subscribe to Susi&apos;s Journal
          </h2>
          <p className="body-text" style={{ maxWidth: 650, margin: "0 auto 30px" }}>
            Receive Susi&apos;s personal practice notes, retreat announcements, and movement guidance directly in your inbox.
          </p>

          {subMessage ? (
            <div style={{ backgroundColor: "#EAF6FB", color: "var(--blue)", padding: "16px 24px", borderRadius: 100, fontWeight: 700, display: "inline-block" }}>
              {subMessage}
            </div>
          ) : (
            <form onSubmit={handleSubscribe} style={{ maxWidth: 540, margin: "0 auto", display: "flex", flexDirection: "column", gap: 14, alignItems: "center" }}>
              {/* Honeypot field for bot protection */}
              <input
                type="text"
                name="website_hp"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                style={{ display: "none" }}
                tabIndex={-1}
                autoComplete="off"
              />

              <div style={{ display: "flex", gap: 12, width: "100%", flexWrap: "wrap" }}>
                <input
                  type="email"
                  className="form-input"
                  placeholder="Enter your email address *"
                  required
                  value={subEmail}
                  onChange={(e) => setSubEmail(e.target.value)}
                  style={{ flex: 1, minWidth: 260 }}
                />
                <button type="submit" disabled={!isHumanVerified} className="btn-pill btn-pill-cyan" style={{ whiteSpace: "nowrap", opacity: !isHumanVerified ? 0.7 : 1 }}>
                  SUBSCRIBE TO JOURNAL
                </button>
              </div>

              {/* Anti-Spam Human Verification */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 14px", backgroundColor: "#F4F7F6", borderRadius: 10, border: "1px solid #E2DDD3" }}>
                <input
                  type="checkbox"
                  id="humanCheckBlog"
                  required
                  checked={isHumanVerified}
                  onChange={(e) => setIsHumanVerified(e.target.checked)}
                  style={{ width: 18, height: 18, cursor: "pointer", accentColor: "#2691BA" }}
                />
                <label htmlFor="humanCheckBlog" style={{ fontSize: 13, color: "#2B3D44", cursor: "pointer", userSelect: "none", fontWeight: 500 }}>
                  🔒 I am human (Not a spam robot)
                </label>
              </div>
            </form>
          )}
        </section>
      </div>

      <SiteFooter />
    </main>
  );
}
