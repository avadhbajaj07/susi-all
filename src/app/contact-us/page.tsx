"use client";

import { useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { site } from "@/lib/site";
import { Mail, Phone, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [isHumanVerified, setIsHumanVerified] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot || !isHumanVerified || !name || !email || !message || isSubmitting) return;

    setIsSubmitting(true);

    try {
      // 1. Send notification email to Susi's Gmail (susidavies@gmail.com)
      await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: "susidavies@gmail.com",
          subject: `New Contact Form Submission from ${name}`,
          body: `New contact inquiry received on susidavies.com:\n\nName: ${name}\nEmail: ${email}\nNewsletter Opt-in: ${subscribeNewsletter ? "YES (Subscribed)" : "No"}\n\nMessage:\n${message}`,
          fromName: "Susi Davies Website Form",
        }),
      }).catch(() => {});

      // 2. Send automated 24-hr thank-you confirmation email to client
      await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: email,
          subject: "Thank You for Contacting Susi Davies",
          body: `Dear ${name},\n\nThank you for reaching out to Susi Davies! We have received your query and our team will get back to you within 24 hours.\n\nWarm regards,\nSusi Davies & Team\nhttps://susidavies.com`,
          fromName: "Susi Davies Studio",
        }),
      }).catch(() => {});

      // 3. Save contact into database & newsletter subscribers if opted in
      if (subscribeNewsletter) {
        await fetch("/api/subscribers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            segment: "Contact Us Form",
          }),
        }).catch(() => {});
      }

      setSubmitted(true);
    } catch (err) {
      console.error("Contact submit error:", err);
      setSubmitted(true);
    }

    setIsSubmitting(false);
  };

  return (
    <main>
      <SiteHeader />

      {/* Page Hero Banner */}
      <section className="page-banner">
        <div>
          <h1>Contact Us</h1>
        </div>
        <span className="page-banner-arrow">⌄</span>
      </section>

      <div className="container">
        <section className="grid-2col">
          <div className="col-media">
            <div className="image-card-rounded">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://res.cloudinary.com/qtah71h2/image/upload/v1786527174/susi-davies12.jpg"
                alt="Susi Davies Contact"
                style={{ width: "100%", height: "auto", display: "block", borderRadius: "20px", objectFit: "cover" }}
              />
            </div>
          </div>

          <div className="col-content">
            <div className="contact-form-card">
              {submitted ? (
                <div style={{ textAlign: "center", padding: "40px 20px" }}>
                  <div style={{ margin: "0 auto 16px", width: 56, height: 56, borderRadius: "50%", background: "rgba(38,145,186,0.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--blue)" }}>
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 style={{ fontFamily: "var(--serif)", fontSize: 28, color: "#2691BA", marginBottom: 12 }}>
                    Enquiry Received!
                  </h3>
                  <p style={{ color: "#4A6068", fontSize: 15, marginBottom: 20 }}>
                    Thank you, <strong>{name}</strong>! Susi has received your message in her inbox and will respond to <em>{email}</em> shortly.
                  </p>
                  <button onClick={() => { setSubmitted(false); setName(""); setEmail(""); setMessage(""); }} className="btn-pill btn-pill-cyan">
                    Send Another Message
                  </button>
                </div>
              ) : (
                <div>
                  <span className="eyebrow">Start a conversation</span>
                  <h2 className="section-heading" style={{ fontSize: 36, marginBottom: 20 }}>
                    Let&apos;s Talk
                  </h2>
                  <p className="body-text" style={{ marginBottom: 25 }}>
                    Tell Susi what you are looking for. Whether it is private sessions, retreat bookings, or mentoring guidance, we are here to support you.
                  </p>

                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Your name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-input"
                        placeholder="Your email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
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

                    <div className="form-group">
                      <textarea
                        className="form-textarea"
                        rows={4}
                        placeholder="How can Susi help?"
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      ></textarea>
                    </div>

                    {/* Newsletter Subscription Opt-in */}
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, padding: "10px 14px", backgroundColor: "#FAFBFB", borderRadius: 10, border: "1px solid #E2DDD3" }}>
                      <input
                        type="checkbox"
                        id="subCheckContact"
                        checked={subscribeNewsletter}
                        onChange={(e) => setSubscribeNewsletter(e.target.checked)}
                        style={{ width: 18, height: 18, cursor: "pointer", accentColor: "#2691BA" }}
                      />
                      <label htmlFor="subCheckContact" style={{ fontSize: 13, color: "#2B3D44", cursor: "pointer", userSelect: "none", fontWeight: 500 }}>
                        📩 Subscribe to Susi Davies&apos; Newsletter &amp; Monthly Movement Insights
                      </label>
                    </div>

                    {/* Anti-Spam Human Verification */}
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 15, padding: "10px 14px", backgroundColor: "#F4F7F6", borderRadius: 10, border: "1px solid #E2DDD3" }}>
                      <input
                        type="checkbox"
                        id="humanCheck"
                        required
                        checked={isHumanVerified}
                        onChange={(e) => setIsHumanVerified(e.target.checked)}
                        style={{ width: 18, height: 18, cursor: "pointer", accentColor: "#2691BA" }}
                      />
                      <label htmlFor="humanCheck" style={{ fontSize: 13, color: "#2B3D44", cursor: "pointer", userSelect: "none", fontWeight: 500 }}>
                        🔒 I am human (Not a spam robot)
                      </label>
                    </div>

                    <button type="submit" disabled={isSubmitting || !isHumanVerified} className="btn-pill btn-pill-cyan" style={{ width: "100%", marginTop: 5, opacity: (isSubmitting || !isHumanVerified) ? 0.7 : 1 }}>
                      {isSubmitting ? "SENDING ENQUIRY..." : "SEND ENQUIRY"}
                    </button>
                  </form>
                </div>
              )}

              <div style={{ marginTop: 30, borderTop: "1px solid var(--border)", paddingTop: 20 }}>
                <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
                  <Mail size={18} color="var(--blue)" />
                  <a href={`mailto:${site.email}`} style={{ fontSize: 15, color: "var(--ink-body)", fontWeight: 500 }}>
                    {site.email}
                  </a>
                </div>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <Phone size={18} color="var(--blue)" />
                  <a href={`tel:${site.phone}`} style={{ fontSize: 15, color: "var(--ink-body)", fontWeight: 500 }}>
                    {site.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <SiteFooter />
    </main>
  );
}
