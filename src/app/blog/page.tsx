"use client";

import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ArrowUpRight, BookOpen, Calendar, Tag } from "lucide-react";

const journalPosts = [
  {
    id: 1,
    title: "Movement & Neural Alignment: Moving with Intention",
    category: "Practice Notes",
    date: "August 2026",
    excerpt: "True movement intelligence begins when we listen to the body's natural alignment rather than forcing postures. Here are practice observations from 30+ years of teaching.",
    image: "/images/susi davies7.jpg",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "Finding Calm in Motion: The Power of Breathwork",
    category: "Mindful Living",
    date: "July 2026",
    excerpt: "Breath is the bridge between the nervous system and conscious awareness. Exploring pranayama techniques to regulate stress and cultivate presence.",
    image: "/images/susi davies3.jpg",
    readTime: "4 min read",
  },
  {
    id: 3,
    title: "Reflections from the Peloponnese Sanctuary",
    category: "Retreat Insights",
    date: "June 2026",
    excerpt: "Stepping away from daily noise allows us to reconnect with what matters. Thoughts on stillness, nourishing movement, and sea air in Leonidio, Greece.",
    image: "/images/retreat/susidavies_retreat4.jpg",
    readTime: "6 min read",
  },
];

export default function JournalPage() {
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

        {/* Featured Journal Posts Grid */}
        <section style={{ marginBottom: 90 }}>
          <div className="service-cards-4grid" style={{ gridTemplateColumns: "repeat(3, 1fr)", gap: 30 }}>
            {journalPosts.map((post) => (
              <article
                key={post.id}
                className="service-card-item"
                style={{ textAlign: "left", padding: 0, overflow: "hidden" }}
              >
                <div className="image-card-rounded" style={{ borderRadius: "18px 18px 0 0", boxShadow: "none" }}>
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={400}
                    height={260}
                    style={{ width: "100%", height: "240px", objectFit: "cover" }}
                  />
                </div>
                <div style={{ padding: "25px 22px", display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-between" }}>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                      <span className="ym-badge ym-badge-light" style={{ margin: 0 }}>
                        <Tag size={11} style={{ marginRight: 5, verticalAlign: "middle" }} />
                        {post.category}
                      </span>
                      <span style={{ fontSize: 12, color: "var(--muted)" }}>{post.readTime}</span>
                    </div>

                    <h3 style={{ fontSize: 20, color: "var(--blue)", margin: "10px 0 12px", lineHeight: 1.35 }}>
                      {post.title}
                    </h3>

                    <p className="body-text" style={{ fontSize: 15, lineHeight: "26px", color: "var(--muted)", marginBottom: 22 }}>
                      {post.excerpt}
                    </p>
                  </div>

                  <div style={{ borderTop: "1px solid var(--border)", paddingTop: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 13, color: "var(--muted)", display: "flex", alignItems: "center", gap: 5 }}>
                      <Calendar size={14} />
                      {post.date}
                    </span>
                    <Link
                      href="/contact-us"
                      style={{ fontSize: 13, fontWeight: 700, color: "var(--blue)", display: "inline-flex", alignItems: "center", gap: 4 }}
                    >
                      Read Note <ArrowUpRight size={15} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Journal Subscription Card */}
        <section className="contact-form-card" style={{ maxWidth: 850, margin: "0 auto", textAlign: "center", padding: "50px 40px" }}>
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

          <form onSubmit={(e) => e.preventDefault()} style={{ maxWidth: 540, margin: "0 auto", display: "flex", gap: 12, flexWrap: "wrap" }}>
            <input
              type="email"
              className="form-input"
              placeholder="Enter your email address"
              required
              style={{ flex: 1, minWidth: 260 }}
            />
            <button type="submit" className="btn-pill btn-pill-cyan" style={{ whiteSpace: "nowrap" }}>
              SUBSCRIBE TO JOURNAL
            </button>
          </form>
        </section>
      </div>

      <SiteFooter />
    </main>
  );
}
