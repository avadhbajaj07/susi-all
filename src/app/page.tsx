"use client";

import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { TestimonialSlider } from "@/components/testimonial-slider";
import { MessageCircle, CheckCircle2, ArrowRight } from "lucide-react";
import { HomeHero } from "@/components/home-hero";

export default function Home() {
  const serviceCards = [
    {
      title: "Personalised 1:1 Transformation",
      text: "Deep, tailored sessions designed specifically for your body, your goals, and your life situation.",
      href: "/private-sessions",
    },
    {
      title: "Mentoring & Coaching",
      text: "Ready to learn directly from Susi's decades of experience?",
      href: "/coaching-mentoring",
    },
    {
      title: "Retreats",
      text: "Reset your body. Reconnect your mind. Step away from daily life.",
      href: "/retreats",
    },
    {
      title: "Online Programs / App",
      text: "Yoga, breathwork, meditation and guidance—anywhere, anytime.",
      href: "/yoga-dynamics-app",
    },
  ];

  return (
    <main>
      <SiteHeader />

      {/* Floating WhatsApp Button */}
      <div className="whatsapp-widget">
        <a
          href="https://wa.me/41798549752"
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-btn"
          aria-label="Contact on WhatsApp"
        >
          <MessageCircle size={28} />
        </a>
      </div>

      {/* Hero Section (Only Image Allowed on Home Page) */}
      <HomeHero />

      <div className="container">
        {/* Section 1: Multi-Disciplinary Expert (Text Focus) */}
        <section style={{ marginBottom: 100 }}>
          <div style={{ maxWidth: 880, margin: "0 auto", textAlign: "center" }}>
            <span className="eyebrow">Work with a multi-disciplinary expert</span>
            <h2 className="section-heading">
              Susi doesn&apos;t follow a single method — she chooses what works best for you.
            </h2>
            <p className="body-text" style={{ fontSize: 19, lineHeight: 1.85, color: "#2C3E50" }}>
              Every person is unique. Susi integrates three decades of clinical practice, movement science, and therapeutic wisdom to tailor an exact pathway for your transformation.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20, marginTop: 40, textAlign: "left" }}>
              {[
                { title: "Remedial Therapy", desc: "Targeted recovery for pain, injury, and structural alignment." },
                { title: "Yoga & Asana Practice", desc: "Mindful movement building strength, grace, and mobility." },
                { title: "Breathwork Regulation", desc: "Somatic practices to balance nervous system energy." },
                { title: "Life Coaching & Mentorship", desc: "Clarity, purpose, and authority to navigate life transitions." },
              ].map((item, idx) => (
                <div key={idx} style={{ backgroundColor: "#ffffff", padding: "28px 24px", borderRadius: 16, border: "1px solid #E2DDD3", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
                  <div style={{ color: "#1f78b4", marginBottom: 10 }}>
                    <CheckCircle2 size={24} />
                  </div>
                  <strong style={{ fontSize: 17, color: "#1c313a", display: "block", marginBottom: 6 }}>{item.title}</strong>
                  <span style={{ fontSize: 14, color: "#6B7A70", lineHeight: 1.6, display: "block" }}>{item.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 2: A Teacher, A Therapist, A Guide */}
        <section style={{ backgroundColor: "#ffffff", borderRadius: 24, padding: "70px 50px", border: "1px solid #E2DDD3", boxShadow: "0 10px 35px rgba(0,0,0,0.04)", marginBottom: 100 }}>
          <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
            <span className="eyebrow">30+ years of experience</span>
            <h2 className="section-heading" style={{ fontSize: 48, marginBottom: 24 }}>
              A Teacher. A Therapist. A Guide.
            </h2>
            <p className="body-text" style={{ fontSize: 19, lineHeight: 1.85, marginBottom: 28 }}>
              Susi Davies has spent over three decades helping people reconnect with their bodies, overcome limitations, and step into a stronger version of themselves.
            </p>
            <p className="body-text" style={{ fontSize: 18, color: "#6B7A70", marginBottom: 35 }}>
              From owning renowned studios in Australia and Switzerland to mentoring students worldwide, her work goes far beyond traditional yoga classes.
            </p>
            <Link href="/coaching-mentoring" className="btn-pill btn-pill-cyan" style={{ padding: "16px 36px" }}>
              EXPLORE COACHING &amp; MENTORING
            </Link>
          </div>
        </section>

        {/* Space To Reconnect - 4 Cards Grid */}
        <section className="space-reconnect">
          <h2>A Space To Reconnect</h2>
          <div className="service-cards-4grid">
            {serviceCards.map((card) => (
              <div className="service-card-item" key={card.title}>
                <div>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </div>
                <div>
                  <Link href={card.href} className="btn-pill btn-pill-cyan">
                    LEARN MORE
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Transform Your Life */}
        <section style={{ backgroundColor: "rgba(31,120,180,0.05)", borderRadius: 24, padding: "70px 50px", border: "1px solid rgba(31,120,180,0.2)", margin: "80px 0 100px", textAlign: "center" }}>
          <div style={{ maxWidth: 840, margin: "0 auto" }}>
            <span className="eyebrow">Life Coaching &amp; Somatic Healing</span>
            <h2 className="section-heading" style={{ fontSize: 44, marginBottom: 20 }}>
              Transform Your Life — Not Just Your Body
            </h2>
            <p className="body-text" style={{ fontSize: 18, lineHeight: 1.8, marginBottom: 35 }}>
              Through a synergy of coaching, breathwork, movement, and deep personal inquiry, Susi helps you break limiting patterns, gain clarity and direction, and cultivate lasting inner strength.
            </p>
            <Link href="/book" className="btn-pill btn-pill-cyan" style={{ padding: "16px 36px", display: "inline-flex", alignItems: "center", gap: 8 }}>
              <span>BOOK A PRIVATE SESSION</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </div>

      {/* Dark App Banner Section (Text Focus) */}
      <section className="app-banner-section">
        <div className="app-banner-inner" style={{ gridTemplateColumns: "1fr", textAlign: "center", maxWidth: 800, margin: "0 auto", padding: "60px 24px" }}>
          <div className="app-banner-text">
            <span className="eyebrow-light" style={{ color: "#ffffff", opacity: 0.85 }}>DYNAMIC YOGA · ONLINE APP</span>
            <h2 style={{ fontSize: 42, color: "#ffffff", margin: "16px 0 20px" }}>Susi Davies. In Your Pocket.</h2>
            <p style={{ fontSize: 18, lineHeight: 1.8, color: "rgba(255,255,255,0.9)", marginBottom: 30 }}>
              The Dynamic Yoga app brings yoga lessons, live sessions, meditation, pranayama and yoga philosophy directly to you anywhere in the world.
            </p>

            <Link href="/yoga-dynamics-app" className="btn-pill btn-pill-cyan" style={{ padding: "16px 36px" }}>
              EXPLORE THE APP
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Slider */}
      <TestimonialSlider />

      {/* Bottom CTA Form (Text & Form Card Focus) */}
      <div className="container-narrow">
        <section style={{ display: "flex", justifyContent: "center" }}>
          <div className="contact-form-card" style={{ maxWidth: 680, width: "100%", textAlign: "center" }}>
            <span className="eyebrow">Get in touch</span>
            <h2 className="section-heading" style={{ fontSize: 36, marginBottom: 12 }}>Ready to Transform Your Life?</h2>
            <p className="body-text" style={{ fontSize: 16, marginBottom: 28, color: "#6B7A70" }}>
              Send a message directly to Susi Davies Studio to inquire about private sessions, mentoring, or retreat availability.
            </p>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="form-group" style={{ marginBottom: 16 }}>
                <input type="text" className="form-input" placeholder="Your full name" required />
              </div>
              <div className="form-group" style={{ marginBottom: 16 }}>
                <input type="email" className="form-input" placeholder="Your email address" required />
              </div>
              <div className="form-group" style={{ marginBottom: 20 }}>
                <textarea className="form-textarea" rows={4} placeholder="Your message or inquiry..." required></textarea>
              </div>
              <button type="submit" className="btn-pill btn-pill-cyan" style={{ width: "100%", padding: "16px", fontSize: 15 }}>
                SEND MESSAGE TO SUSI
              </button>
            </form>
          </div>
        </section>
      </div>

      <SiteFooter />
    </main>
  );
}
