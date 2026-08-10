import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { fetchSupabasePostBySlug, fetchSupabasePosts } from "@/lib/supabase-api";
import { BlogCommentsSection } from "./comments-section";
import { ArrowLeft, Calendar, Tag, User } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchSupabasePostBySlug(slug);

  if (!post) {
    return {
      title: "Journal Article | Susi Davies Studio",
    };
  }

  const title = `${post.title} | Susi Davies Studio`;
  const description = post.excerpt || post.content?.slice(0, 160);
  const imageUrl = post.image || "https://susidavies.com/images/susi davies7.jpg";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://susidavies.com/blog/${post.slug}`,
      images: [{ url: imageUrl, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function SingleBlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await fetchSupabasePostBySlug(slug);

  if (!post) {
    notFound();
  }

  // JSON-LD Structured Data Schema for Google SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": [post.image],
    "datePublished": post.date || "2026-08-10",
    "author": {
      "@type": "Person",
      "name": "Susi Davies",
      "jobTitle": "Life Coach & Yoga Instructor",
      "url": "https://susidavies.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Susi Davies Studio",
      "logo": {
        "@type": "ImageObject",
        "url": "https://susidavies.com/images/susi-logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://susidavies.com/blog/${post.slug}`
    }
  };

  return (
    <main>
      {/* Schema.org SEO Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <SiteHeader />

      {/* Page Hero Banner */}
      <section className="page-banner" style={{ minHeight: "220px", padding: "60px 20px" }}>
        <div>
          <Link
            href="/blog"
            style={{
              color: "var(--blue)",
              textDecoration: "none",
              fontSize: 14,
              fontWeight: 700,
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              marginBottom: 16,
              backgroundColor: "rgba(255,255,255,0.85)",
              padding: "6px 16px",
              borderRadius: 100,
            }}
          >
            <ArrowLeft size={16} /> Back to All Articles
          </Link>
          <h1 style={{ fontSize: 36, lineHeight: 1.2, maxWidth: 900, margin: "0 auto" }}>
            {post.title}
          </h1>
        </div>
      </section>

      <div className="container" style={{ maxWidth: 860, margin: "0 auto", padding: "50px 20px" }}>
        {/* Article Meta Bar */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 20,
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid var(--border)",
            paddingBottom: 20,
            marginBottom: 35,
          }}
        >
          <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
            <span className="ym-badge ym-badge-light" style={{ margin: 0 }}>
              <Tag size={12} style={{ marginRight: 6 }} />
              {post.category || "Practice Notes"}
            </span>

            <span style={{ fontSize: 14, color: "var(--muted)", display: "inline-flex", alignItems: "center", gap: 6 }}>
              <Calendar size={15} />
              {post.date}
            </span>

            <span style={{ fontSize: 14, color: "var(--muted)", display: "inline-flex", alignItems: "center", gap: 6 }}>
              <User size={15} />
              By Susi Davies
            </span>
          </div>

          <span style={{ fontSize: 13, color: "var(--blue)", fontWeight: 700 }}>
            {post.readTime || "5 min read"}
          </span>
        </div>

        {/* Featured Image (SEO Optimized with Alt Text) */}
        {post.image && (
          <div style={{ borderRadius: 20, overflow: "hidden", marginBottom: 40, boxShadow: "0 10px 30px rgba(0,0,0,0.06)" }}>
            <img
              src={post.image}
              alt={post.title}
              style={{ width: "100%", maxHeight: 480, objectFit: "cover", display: "block" }}
            />
          </div>
        )}

        {/* Full Article Content */}
        <article
          style={{
            fontSize: 18,
            lineHeight: 1.85,
            color: "#2C3E50",
            fontFamily: "var(--sans)",
            whiteSpace: "pre-line",
            marginBottom: 60,
          }}
        >
          {post.content || post.excerpt}
        </article>

        {/* Author Bio Card */}
        <div
          style={{
            backgroundColor: "rgba(38,145,186,0.06)",
            borderRadius: 20,
            padding: "30px 35px",
            display: "flex",
            gap: 24,
            alignItems: "center",
            marginBottom: 70,
            border: "1px solid rgba(38,145,186,0.15)",
          }}
        >
          <img
            src="/images/susi-portrait.png"
            alt="Susi Davies - Certified Life Coach & Yoga Instructor"
            style={{ width: 85, height: 85, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }}
          />
          <div>
            <strong style={{ fontSize: 18, color: "var(--blue)", display: "block", marginBottom: 4 }}>
              Written by Susi Davies
            </strong>
            <p className="body-text" style={{ fontSize: 14, color: "var(--muted)", margin: 0 }}>
              Susi Davies is a certified life coach, movement specialist, and E-RYT 500 yoga teacher with over 30 years of teaching experience in Thalwil, Switzerland.
            </p>
          </div>
        </div>

        {/* Interactive Reader Feedback & Comments Section */}
        <BlogCommentsSection postSlug={post.slug} />
      </div>

      <SiteFooter />
    </main>
  );
}
