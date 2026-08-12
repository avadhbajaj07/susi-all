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

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subEmail) return;

    try {
      await fetch("/api/inbox", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fromName: subEmail.split("@")[0],
          fromEmail: subEmail,
          to: "hello@susidavies.com",
          subject: "New Newsletter Subscriber via Blog",
          body: `Please add ${subEmail} to the Susi Davies Journal Newsletter list.`,
        }),
      });
      setSubMessage("Thank you! You are now subscribed to Susi's Journal.");
      setSubEmail("");
    } catch (err) {
      setSubMessage("Thank you for subscribing!");
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
            <form onSubmit={handleSubscribe} style={{ maxWidth: 540, margin: "0 auto", display: "flex", gap: 12, flexWrap: "wrap" }}>
              <input
                type="email"
                className="form-input"
                placeholder="Enter your email address"
                required
                value={subEmail}
                onChange={(e) => setSubEmail(e.target.value)}
                style={{ flex: 1, minWidth: 260 }}
              />
              <button type="submit" className="btn-pill btn-pill-cyan" style={{ whiteSpace: "nowrap" }}>
                SUBSCRIBE TO JOURNAL
              </button>
            </form>
          )}
        </section>
      </div>

      <SiteFooter />
    </main>
  );
}
