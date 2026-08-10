"use client";

import { useState } from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { TestimonialSlider } from "@/components/testimonial-slider";
import { MessageCircle, CheckCircle } from "lucide-react";
import { HomeHero } from "@/components/home-hero";

export default function Home() {
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formMsg, setFormMsg] = useState("");
  const [formStatus, setFormStatus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formMsg || isSubmitting) return;

    setIsSubmitting(true);
    setFormStatus("Sending message to Susi Davies...");

    try {
      // 1. Post into Studio Inbox for admin.susidavies.com
      await fetch("/api/inbox", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fromName: formName,
          fromEmail: formEmail,
          to: "hello@susidavies.com",
          subject: `Website Inquiry from ${formName}`,
          body: formMsg,
        }),
      });

      // 2. Dispatch notification email via Resend API
      await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: "hello@susidavies.com",
          subject: `New Contact Form Inquiry: ${formName}`,
          body: `Client Name: ${formName}\nClient Email: ${formEmail}\n\nMessage:\n${formMsg}`,
          fromName: "Susi Davies Website",
        }),
      }).catch(() => {});

      setFormStatus("Thank you! Your message has been sent to Susi Davies.");
      setFormName("");
      setFormEmail("");
      setFormMsg("");
    } catch (err: any) {
      setFormStatus("Message saved to Studio Inbox! Susi will reply shortly.");
    } finally {
      setIsSubmitting(false);
    }
  };

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

      {/* Hero Section */}
      <HomeHero />

      <div className="container">
        {/* Block 1: Cloudinary Image 1 (susi3) — Image Left, Text Right */}
        <section className="grid-2col">
          <div className="col-media">
            <div className="image-card-rounded">
              <img
                src="https://res.cloudinary.com/dm4jfxbcs/image/upload/v1786343531/susi3_euqaqm.jpg"
                alt="Susi Davies Mudra Balance Pose"
                style={{ width: "100%", height: "auto", display: "block", borderRadius: "20px" }}
              />
            </div>
          </div>
          <div className="col-content">
            <span className="eyebrow">Work with a multi-disciplinary expert</span>
            <h2 className="section-heading">
              Susi doesn&apos;t follow a single method — she chooses what works best for you.
            </h2>
            <ul className="bullet-list">
              <li>Remedial Therapy (injury, pain, recovery)</li>
              <li>Yoga &amp; Asana Practice</li>
              <li>Breathwork &amp; Nervous System Regulation</li>
              <li>Movement Therapy &amp; Functional Training</li>
              <li>Life Coaching &amp; Mentorship</li>
            </ul>
          </div>
        </section>

        <div className="section-divider-line" />

        {/* Block 2: Cloudinary Image 2 (susi2) — Text Left, Image Right */}
        <section className="grid-2col-alt">
          <div className="col-media">
            <div className="badge-overlay-container">
              <div className="image-card-rounded">
                <img
                  src="https://res.cloudinary.com/dm4jfxbcs/image/upload/v1786343531/susi2_v8c5c9.jpg"
                  alt="Susi Davies Standing Alignment Pose"
                  style={{ width: "100%", height: "auto", display: "block", borderRadius: "20px" }}
                />
              </div>
              <div className="badge-overlay-card">
                Every person is different. That&apos;s why every path should be too.
              </div>
            </div>
          </div>
          <div className="col-content">
            <span className="eyebrow">30+ years of experience</span>
            <h2 className="section-heading">A Teacher. A Therapist. A Guide.</h2>
            <p className="body-text">
              Susi Davies has spent over three decades helping people reconnect with their bodies, overcome limitations, and step into a stronger version of themselves.
            </p>
            <p className="body-text">
              From owning yoga studios in Australia and Switzerland to mentoring students worldwide, her work goes far beyond traditional yoga.
            </p>
            <Link href="/coaching-mentoring" className="btn-pill btn-pill-cyan" style={{ marginTop: 14 }}>
              LEARN MORE
            </Link>
          </div>
        </section>

        <div className="section-divider-line" />

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

        <div className="section-divider-line" />

        {/* Block 3: Cloudinary Image 3 (susi1) — Image Left, Text Right */}
        <section className="grid-2col">
          <div className="col-media">
            <div className="image-card-rounded">
              <img
                src="https://res.cloudinary.com/dm4jfxbcs/image/upload/v1786343531/susi1_rzoeqo.jpg"
                alt="Susi Davies Bound Somatic Stretch"
                style={{ width: "100%", height: "auto", display: "block", borderRadius: "20px" }}
              />
            </div>
          </div>
          <div className="col-content">
            <span className="eyebrow">How I help you</span>
            <h2 className="section-heading">Come As You Are. Leave Transformed.</h2>
            <p className="body-text">
              Whether you&apos;re dealing with stress, physical pain, lack of direction, or simply want to grow—Susi meets you exactly where you are.
            </p>
            <ul className="bullet-list">
              <li>Movement</li>
              <li>Breath</li>
              <li>Strength</li>
              <li>Awareness</li>
              <li>Coaching</li>
            </ul>
          </div>
        </section>
      </div>

      {/* Dark App Banner Section */}
      <section className="app-banner-section">
        <div className="app-banner-inner" style={{ maxWidth: 1200, margin: "0 auto" }}>
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

      {/* Block 4: Cloudinary Image 4 (susi4) — Image Left, Contact Form Right */}
      <div className="container-narrow">
        <section className="grid-2col">
          <div className="col-media">
            <div className="image-card-rounded">
              <img
                src="https://res.cloudinary.com/dm4jfxbcs/image/upload/v1786343530/susi4_day7ig.jpg"
                alt="Susi Davies Reclined Restorative Pose"
                style={{ width: "100%", height: "auto", display: "block", borderRadius: "20px" }}
              />
            </div>
          </div>
          <div className="col-content">
            <div className="contact-form-card">
              <span className="eyebrow">Get in touch</span>
              <h2 className="section-heading" style={{ fontSize: 34, marginBottom: 12 }}>Ready to Transform Your Life?</h2>
              <p className="body-text" style={{ fontSize: 15, marginBottom: 24, color: "#6B7A70" }}>
                Send a message directly to Susi Davies to inquire about private sessions, mentoring, or retreat availability.
              </p>
              
              {formStatus && (
                <div style={{ padding: "12px 16px", borderRadius: 10, backgroundColor: "#54BC3318", border: "1px solid #45A027", color: "#45A027", fontSize: 14, marginBottom: 18, display: "flex", alignItems: "center", gap: 8 }}>
                  <CheckCircle size={16} />
                  <span>{formStatus}</span>
                </div>
              )}

              <form onSubmit={handleContactSubmit}>
                <div className="form-group" style={{ marginBottom: 14 }}>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Your full name"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 14 }}>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="Your email address"
                    required
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 20 }}>
                  <textarea
                    className="form-textarea"
                    rows={4}
                    placeholder="Your message or inquiry..."
                    required
                    value={formMsg}
                    onChange={(e) => setFormMsg(e.target.value)}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-pill btn-pill-cyan"
                  style={{ width: "100%", padding: "16px", fontSize: 15, opacity: isSubmitting ? 0.7 : 1 }}
                >
                  {isSubmitting ? "SENDING MESSAGE..." : "SEND MESSAGE TO SUSI"}
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>

      <SiteFooter />
    </main>
  );
}
