"use client";

import { useState } from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Check, CheckCircle2 } from "lucide-react";

export default function YogaDynamicsAppPage() {
  const [appName, setAppName] = useState("");
  const [appEmail, setAppEmail] = useState("");
  const [appMsg, setAppMsg] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [isHumanVerified, setIsHumanVerified] = useState(false);
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleAppSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot || !isHumanVerified || !appName || !appEmail || !appMsg || isSubmitting) return;

    setIsSubmitting(true);

    try {
      // 1. Post to Studio Inbox
      await fetch("/api/inbox", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fromName: appName,
          fromEmail: appEmail,
          to: "hello@susidavies.com",
          subject: `Yoga Dynamics App Inquiry from ${appName}`,
          body: appMsg,
        }),
      }).catch(() => {});

      // 2. Dispatch notification email to Susi's Gmail (susidavies@gmail.com)
      await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: "susidavies@gmail.com",
          subject: `New App Inquiry from ${appName}`,
          body: `New Dynamic Yoga App inquiry received on susidavies.com:\n\nClient Name: ${appName}\nClient Email: ${appEmail}\nNewsletter Opt-in: ${subscribeNewsletter ? "YES (Subscribed)" : "No"}\n\nMessage:\n${appMsg}`,
          fromName: "Susi Davies App Inquiry",
        }),
      }).catch(() => {});

      // 3. Dispatch automated 24-hr thank-you confirmation email to client
      await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: appEmail,
          subject: "Thank You for Contacting Susi Davies Studio",
          body: `Dear ${appName},\n\nThank you for reaching out about the Dynamic Yoga App! We have received your query and our team will get back to you within 24 hours.\n\nWarm regards,\nSusi Davies & Team\nhttps://susidavies.com`,
          fromName: "Susi Davies Studio",
        }),
      }).catch(() => {});

      // 4. Save subscriber into database if opted in
      if (subscribeNewsletter) {
        await fetch("/api/subscribers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: appName,
            email: appEmail,
            segment: "Dynamic Yoga App Inquiry",
          }),
        }).catch(() => {});
      }

      setSubmitted(true);
      setAppName("");
      setAppEmail("");
      setAppMsg("");
    } catch {
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      <SiteHeader />

      {/* Page Hero Banner */}
      <section className="page-banner">
        <div>
          <h1>Dynamic Yoga App</h1>
        </div>
        <span className="page-banner-arrow">⌄</span>
      </section>

      <div className="container">
        {/* Section 1: Intro Overview */}
        <section className="grid-2col-alt">
          <div className="col-media">
            <div className="image-card-rounded">
              <img
                src="https://res.cloudinary.com/qtah71h2/image/upload/v1786527173/susi-davies2.jpg"
                alt="Susi Davies Dynamic Yoga App"
                style={{ width: "100%", height: "auto", display: "block", borderRadius: "20px", objectFit: "cover" }}
              />
            </div>
          </div>

          <div className="col-content">
            <span className="eyebrow">YOUR PERSONAL YOGA PRACTICE</span>
            <h2 className="section-heading" style={{ fontSize: 36, marginBottom: 20 }}>
              Dynamic Movement. Anywhere.
            </h2>
            <p className="body-text" style={{ marginBottom: 24 }}>
              The Dynamic Yoga app gives you direct access to Susi Davies&apos; complete library of movement practices, guided pranayama, restorative sequences, and functional alignment tutorials.
            </p>

            <ul className="bullet-list" style={{ marginBottom: 30 }}>
              <li><Check size={18} color="var(--blue)" /> Live streaming weekly online classes</li>
              <li><Check size={18} color="var(--blue)" /> On-demand video library categorized by focus &amp; duration</li>
              <li><Check size={18} color="var(--blue)" /> Guided breathwork and restorative meditation</li>
              <li><Check size={18} color="var(--blue)" /> Functional alignment guides for home practice</li>
            </ul>

            <Link href="/book" className="btn-pill btn-pill-cyan">
              JOIN WEEKLY ONLINE CLASS (TWINT OK)
            </Link>
          </div>
        </section>

        {/* Section 2: Have Questions About The App Form */}
        <section className="grid-2col" style={{ marginTop: 60 }}>
          <div className="col-media">
            <div className="image-card-rounded">
              <img
                src="https://res.cloudinary.com/qtah71h2/image/upload/v1786527174/susi-davies13.jpg"
                alt="Susi Davies App Practice"
                style={{ width: "100%", height: "auto", display: "block", borderRadius: "20px", objectFit: "cover" }}
              />
            </div>
          </div>

          <div className="col-content">
            <div className="contact-form-card">
              <span className="eyebrow">Get in touch</span>
              <h2 className="section-heading" style={{ fontSize: 32, marginBottom: 12 }}>Have Questions About The App?</h2>
              
              {submitted ? (
                <div style={{ textAlign: "center", padding: "30px 15px" }}>
                  <div style={{ margin: "0 auto 14px", width: 56, height: 56, borderRadius: "50%", background: "rgba(38,145,186,0.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--blue)" }}>
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 style={{ fontFamily: "var(--serif)", fontSize: 24, color: "#2691BA", marginBottom: 10 }}>
                    Inquiry Received!
                  </h3>
                  <p style={{ color: "#4A6068", fontSize: 14, marginBottom: 20 }}>
                    Thank you! An automated confirmation has been sent to your email, and Susi Davies will get back to you within 24 hours.
                  </p>
                  <button onClick={() => setSubmitted(false)} className="btn-pill btn-pill-cyan">
                    Ask Another Question
                  </button>
                </div>
              ) : (
                <form onSubmit={handleAppSubmit}>
                  <div className="form-group" style={{ marginBottom: 14 }}>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Your name *"
                      required
                      value={appName}
                      onChange={(e) => setAppName(e.target.value)}
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: 14 }}>
                    <input
                      type="email"
                      className="form-input"
                      placeholder="Your email *"
                      required
                      value={appEmail}
                      onChange={(e) => setAppEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: 16 }}>
                    <textarea
                      className="form-textarea"
                      rows={4}
                      placeholder="Your message or question..."
                      required
                      value={appMsg}
                      onChange={(e) => setAppMsg(e.target.value)}
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
                      id="subCheckApp"
                      checked={subscribeNewsletter}
                      onChange={(e) => setSubscribeNewsletter(e.target.checked)}
                      style={{ width: 18, height: 18, cursor: "pointer", accentColor: "#2691BA" }}
                    />
                    <label htmlFor="subCheckApp" style={{ fontSize: 13, color: "#2B3D44", cursor: "pointer", userSelect: "none", fontWeight: 500 }}>
                      📩 Subscribe to Susi Davies&apos; Newsletter &amp; Monthly Movement Insights
                    </label>
                  </div>

                  {/* Anti-Spam Human Verification */}
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18, padding: "10px 14px", backgroundColor: "#F4F7F6", borderRadius: 10, border: "1px solid #E2DDD3" }}>
                    <input
                      type="checkbox"
                      id="humanCheckApp"
                      required
                      checked={isHumanVerified}
                      onChange={(e) => setIsHumanVerified(e.target.checked)}
                      style={{ width: 18, height: 18, cursor: "pointer", accentColor: "#2691BA" }}
                    />
                    <label htmlFor="humanCheckApp" style={{ fontSize: 13, color: "#2B3D44", cursor: "pointer", userSelect: "none", fontWeight: 500 }}>
                      🔒 I am human (Not a spam robot)
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !isHumanVerified}
                    className="btn-pill btn-pill-green"
                    style={{ width: "100%", padding: "16px", fontSize: 15, opacity: (isSubmitting || !isHumanVerified) ? 0.7 : 1 }}
                  >
                    {isSubmitting ? "SUBMITTING..." : "SUBMIT INQUIRY"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </div>

      <SiteFooter />
    </main>
  );
}
