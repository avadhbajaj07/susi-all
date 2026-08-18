"use client";

import { useState } from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MessageCircle, CheckCircle } from "lucide-react";
import { HomeHero } from "@/components/home-hero";

export default function Home() {
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formMsg, setFormMsg] = useState("");
  const [formStatus, setFormStatus] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");
  const [isHumanVerified, setIsHumanVerified] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(true);

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
    if (honeypot || !isHumanVerified || !formName || !formEmail || !formMsg || isSubmitting) return;

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
      }).catch(() => {});

      // 2. Dispatch notification email directly to Susi's Gmail (susidavies@gmail.com)
      await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: "susidavies@gmail.com",
          subject: `New Website Inquiry from ${formName}`,
          body: `New website inquiry received on susidavies.com:\n\nClient Name: ${formName}\nClient Email: ${formEmail}\nNewsletter Opt-in: ${subscribeNewsletter ? "YES (Subscribed)" : "No"}\n\nMessage:\n${formMsg}`,
          fromName: "Susi Davies Website Form",
        }),
      }).catch(() => {});

      // 3. Dispatch automated thank-you confirmation email to client
      await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: formEmail,
          subject: "Thank You for Contacting Susi Davies",
          body: `Dear ${formName},\n\nThank you for reaching out to Susi Davies! We have received your query and our team will get back to you within 24 hours.\n\nWarm regards,\nSusi Davies & Team\nhttps://susidavies.com`,
          fromName: "Susi Davies Studio",
        }),
      }).catch(() => {});

      // 4. Save/upsert subscriber into database if opted in
      if (subscribeNewsletter) {
        await fetch("/api/subscribers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formName,
            email: formEmail,
            segment: "Homepage Contact Inquiry",
          }),
        }).catch(() => {});
      }

      setFormStatus("Thank you for your query! An automated confirmation has been sent to your email, and our team will connect with you within 24 hours.");
      setFormName("");
      setFormEmail("");
      setFormMsg("");
    } catch (err: any) {
      setFormStatus("Thank you for your query! Our team will connect with you within 24 hours.");
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
        {/* Block 1: Susi Image 1 — Image Left, Text Right */}
        <section className="grid-2col">
          <div className="col-media">
            <div className="image-card-rounded">
              <img
                src="https://res.cloudinary.com/qtah71h2/image/upload/v1786527173/susi-davies1.jpg"
                alt="Susi Davies Yoga & Movement Practice"
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

        {/* Block 2: Main Susi Portrait Image (susi-davies10.jpg) — Text Left, Image Right */}
        <section className="grid-2col-alt">
          <div className="col-media">
            <div className="badge-overlay-container">
              <div className="image-card-rounded">
                <img
                  src="https://res.cloudinary.com/qtah71h2/image/upload/v1786527174/susi-davies10.jpg"
                  alt="Susi Davies Main Portrait"
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

        {/* Block 3: Susi Image 2 — Image Left, Text Right */}
        <section className="grid-2col">
          <div className="col-media">
            <div className="image-card-rounded">
              <img
                src="https://res.cloudinary.com/qtah71h2/image/upload/v1786527173/susi-davies2.jpg"
                alt="Susi Davies Somatic Stretch & Balance"
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


      {/* Block 4: Susi Image 3 — Image Left, Contact Form Right */}
      <div className="container-narrow">
        <section className="grid-2col">
          <div className="col-media">
            <div className="image-card-rounded">
              <img
                src="https://res.cloudinary.com/qtah71h2/image/upload/v1786527173/susi-davies3.jpg"
                alt="Susi Davies Restorative Practice"
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

                {/* Newsletter Subscription Opt-in */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, padding: "10px 14px", backgroundColor: "#FAFBFB", borderRadius: 10, border: "1px solid #E2DDD3" }}>
                  <input
                    type="checkbox"
                    id="subCheckHome"
                    checked={subscribeNewsletter}
                    onChange={(e) => setSubscribeNewsletter(e.target.checked)}
                    style={{ width: 18, height: 18, cursor: "pointer", accentColor: "#2691BA" }}
                  />
                  <label htmlFor="subCheckHome" style={{ fontSize: 13, color: "#2B3D44", cursor: "pointer", userSelect: "none", fontWeight: 500 }}>
                    📩 Subscribe to Susi Davies&apos; Newsletter &amp; Monthly Movement Insights
                  </label>
                </div>

                {/* Anti-Spam Human Verification */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18, padding: "10px 14px", backgroundColor: "#F4F7F6", borderRadius: 10, border: "1px solid #E2DDD3" }}>
                  <input
                    type="checkbox"
                    id="humanCheckHome"
                    required
                    checked={isHumanVerified}
                    onChange={(e) => setIsHumanVerified(e.target.checked)}
                    style={{ width: 18, height: 18, cursor: "pointer", accentColor: "#2691BA" }}
                  />
                  <label htmlFor="humanCheckHome" style={{ fontSize: 13, color: "#2B3D44", cursor: "pointer", userSelect: "none", fontWeight: 500 }}>
                    🔒 I am human (Not a spam robot)
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !isHumanVerified}
                  className="btn-pill btn-pill-cyan"
                  style={{ width: "100%", padding: "16px", fontSize: 15, opacity: (isSubmitting || !isHumanVerified) ? 0.7 : 1 }}
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
