"use client";

import { useState } from "react";
import Image from "next/image";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Calendar, Clock, CheckCircle2, MapPin, Video } from "lucide-react";

const sessionTypes = [
  {
    id: "private-yoga",
    title: "1-on-1 Private Yoga Session",
    duration: "60 mins",
    price: "CHF 150",
    desc: "Tailored movement, alignment therapy, and individual guidance at the studio or online.",
  },
  {
    id: "coaching-mentoring",
    title: "Life Coaching & Mentoring",
    duration: "60 mins",
    price: "CHF 180",
    desc: "Personalized mentoring to navigate life transitions, build clarity, and step into authority.",
  },
  {
    id: "teacher-development",
    title: "Teacher Mentoring & Art of Teaching",
    duration: "75 mins",
    price: "CHF 200",
    desc: "Advanced sequencing, presence building, and student guidance for qualified yoga teachers.",
  },
  {
    id: "online-class",
    title: "Weekly Online Class Pass",
    duration: "60 mins",
    price: "CHF 25",
    desc: "Live dynamic movement session online via Teams (Monday 18:30–19:30 & Wednesday 09:00–10:00). TWINT accepted.",
  },
];

export default function BookPage() {
  const [selectedSession, setSelectedSession] = useState("private-yoga");
  const [timeSlot, setTimeSlot] = useState("morning");
  const [submitted, setSubmitted] = useState(false);
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientNotes, setClientNotes] = useState("");
  const [bookingDate, setBookingDate] = useState("2026-08-15");
  const [honeypot, setHoneypot] = useState("");
  const [isHumanVerified, setIsHumanVerified] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const activeSession = sessionTypes.find((s) => s.id === selectedSession) || sessionTypes[0];

  const [subscribeNewsletter, setSubscribeNewsletter] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot || !isHumanVerified || !clientName || !clientEmail || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitted(true);

    try {
      // 1. Dispatch notification email to Susi's Gmail (susidavies@gmail.com)
      await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: "susidavies@gmail.com",
          subject: `New Booking Request: ${activeSession.title} - ${clientName}`,
          body: `New session booking request received on susidavies.com:\n\nClient Name: ${clientName}\nEmail: ${clientEmail}\nPhone: ${clientPhone}\nSession: ${activeSession.title} (${activeSession.price})\nDate: ${bookingDate}\nTime Slot: ${timeSlot}\nNewsletter Opt-in: ${subscribeNewsletter ? "YES (Subscribed)" : "No"}\n\nClient Notes:\n${clientNotes || "None"}`,
          fromName: "Susi Davies Booking System",
        }),
      }).catch(() => {});

      // 2. Dispatch automated 24-hr thank-you confirmation email to client
      await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: clientEmail,
          subject: `Booking Request Confirmation: ${activeSession.title}`,
          body: `Dear ${clientName},\n\nThank you for requesting a session (${activeSession.title}) with Susi Davies! We have received your booking request for ${bookingDate} (${timeSlot}), and our team will connect with you within 24 hours to confirm your reservation.\n\nWarm regards,\nSusi Davies Studio\nhttps://susidavies.com`,
          fromName: "Susi Davies Studio",
        }),
      }).catch(() => {});

      // 3. Save client contact & subscriber into database if opted in
      if (subscribeNewsletter) {
        await fetch("/api/subscribers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: clientName,
            email: clientEmail,
            segment: activeSession.title,
          }),
        }).catch(() => {});
      }
    } catch (err) {
      console.error("Booking email dispatch error:", err);
    }
  };

  return (
    <main>
      <SiteHeader />

      {/* Page Hero Banner */}
      <section className="page-banner">
        <div>
          <h1>Book a Session with Susi</h1>
        </div>
        <span className="page-banner-arrow">⌄</span>
      </section>

      <div className="container">
        {/* Intro */}
        <section style={{ textAlign: "center", marginBottom: 60 }}>
          <span className="eyebrow" style={{ color: "var(--blue)", fontSize: 14 }}>
            Private &amp; Group Reservations
          </span>
          <h2 className="section-heading" style={{ margin: "12px 0 20px" }}>
            Make Space for Your Next Step
          </h2>
          <p className="body-text" style={{ maxWidth: 780, margin: "0 auto" }}>
            Select your preferred session type, date, and time slot below to request your booking directly with Susi Davies.
          </p>
        </section>

        {submitted ? (
          <section className="contact-form-card" style={{ maxWidth: 700, margin: "0 auto", textAlign: "center", padding: "60px 40px" }}>
            <div style={{ margin: "0 auto 20px", width: 64, height: 64, borderRadius: "50%", background: "rgba(38,145,186,0.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--blue)" }}>
              <CheckCircle2 size={36} />
            </div>
            <h2 className="section-heading" style={{ fontSize: 36, marginBottom: 16 }}>
              Booking Request Received!
            </h2>
            <p className="body-text" style={{ marginBottom: 25 }}>
              Thank you! Your request for <strong>{activeSession.title}</strong> has been sent to Susi. You will receive a email confirmation and calendar invite shortly.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="btn-pill btn-pill-cyan"
            >
              BOOK ANOTHER SESSION
            </button>
          </section>
        ) : (
          <section className="grid-2col">
            {/* Left: Interactive Booking Form */}
            <div className="col-content">
              <div className="contact-form-card">
                <form onSubmit={handleSubmit}>
                  {/* Step 1: Session Selector */}
                  <div style={{ marginBottom: 30 }}>
                    <label className="eyebrow" style={{ color: "var(--blue)", marginBottom: 14 }}>
                      1. Select Session Type
                    </label>
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      {sessionTypes.map((session) => (
                        <div
                          key={session.id}
                          onClick={() => setSelectedSession(session.id)}
                          style={{
                            padding: "16px 20px",
                            borderRadius: 14,
                            border: selectedSession === session.id ? "2px solid var(--blue)" : "1px solid var(--border)",
                            backgroundColor: selectedSession === session.id ? "rgba(38,145,186,0.06)" : "#ffffff",
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                          }}
                        >
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                            <strong style={{ fontSize: 16, color: "var(--ink-body)" }}>{session.title}</strong>
                            <span style={{ fontSize: 15, fontWeight: 700, color: "var(--blue)" }}>{session.price}</span>
                          </div>
                          <div style={{ display: "flex", gap: 15, fontSize: 13, color: "var(--muted)" }}>
                            <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                              <Clock size={14} /> {session.duration}
                            </span>
                            <span>{session.desc}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Step 2: Date & Time */}
                  <div style={{ marginBottom: 30 }}>
                    <label className="eyebrow" style={{ color: "var(--blue)", marginBottom: 14 }}>
                      2. Preferred Date &amp; Time
                    </label>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 16 }}>
                      <div className="form-group" style={{ margin: 0 }}>
                        <input
                          type="date"
                          className="form-input"
                          required
                          value={bookingDate}
                          onChange={(e) => setBookingDate(e.target.value)}
                        />
                      </div>
                      <select
                        value={timeSlot}
                        onChange={(e) => setTimeSlot(e.target.value)}
                        className="form-input"
                        style={{ cursor: "pointer" }}
                      >
                        <option value="mon-evening">Monday 18:30 – 19:30 (Online Class)</option>
                        <option value="wed-morning">Wednesday 09:00 – 10:00 (Online Class)</option>
                        <option value="morning">Morning (09:00 – 12:00)</option>
                        <option value="afternoon">Afternoon (14:00 – 17:00)</option>
                        <option value="evening">Evening (18:00 – 20:00)</option>
                      </select>
                    </div>
                  </div>

                  {/* Step 3: Contact Info */}
                  <div style={{ marginBottom: 25 }}>
                    <label className="eyebrow" style={{ color: "var(--blue)", marginBottom: 14 }}>
                      3. Your Information
                    </label>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Your full name"
                        required
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-input"
                        placeholder="Your email address"
                        required
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="tel"
                        className="form-input"
                        placeholder="Phone number (WhatsApp)"
                        required
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <textarea
                        className="form-textarea"
                        rows={3}
                        placeholder="Any notes, injury considerations, or specific goals for Susi..."
                        value={clientNotes}
                        onChange={(e) => setClientNotes(e.target.value)}
                      ></textarea>
                    </div>
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
                        id="subCheckBook"
                        checked={subscribeNewsletter}
                        onChange={(e) => setSubscribeNewsletter(e.target.checked)}
                        style={{ width: 18, height: 18, cursor: "pointer", accentColor: "#2691BA" }}
                      />
                      <label htmlFor="subCheckBook" style={{ fontSize: 13, color: "#2B3D44", cursor: "pointer", userSelect: "none", fontWeight: 500 }}>
                        📩 Subscribe to Susi Davies&apos; Newsletter &amp; Monthly Movement Insights
                      </label>
                    </div>

                    {/* Anti-Spam Human Verification */}
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20, padding: "10px 14px", backgroundColor: "#F4F7F6", borderRadius: 10, border: "1px solid #E2DDD3" }}>
                      <input
                        type="checkbox"
                        id="humanCheckBook"
                        required
                        checked={isHumanVerified}
                        onChange={(e) => setIsHumanVerified(e.target.checked)}
                        style={{ width: 18, height: 18, cursor: "pointer", accentColor: "#2691BA" }}
                      />
                      <label htmlFor="humanCheckBook" style={{ fontSize: 13, color: "#2B3D44", cursor: "pointer", userSelect: "none", fontWeight: 500 }}>
                        🔒 I am human (Not a spam robot)
                      </label>
                    </div>

                    <button type="submit" disabled={isSubmitting || !isHumanVerified} className="btn-pill btn-pill-cyan" style={{ width: "100%", opacity: (isSubmitting || !isHumanVerified) ? 0.7 : 1 }}>
                      {isSubmitting ? "CONFIRMING ENQUIRY..." : "CONFIRM BOOKING ENQUIRY"}
                    </button>
                </form>
              </div>
            </div>

            {/* Right: Susi Photo & Session Info Card */}
            <div className="col-media">
              <div className="image-card-rounded" style={{ marginBottom: 30 }}>
                <img
                  src="https://res.cloudinary.com/qtah71h2/image/upload/v1786527174/susi-davies13.jpg"
                  alt="Susi Davies yoga posture stretch"
                  style={{ width: "100%", height: "auto", display: "block", borderRadius: "20px", objectFit: "cover" }}
                />
              </div>

              <div className="contact-form-card" style={{ padding: "30px 25px" }}>
                <h3 style={{ fontSize: 22, color: "var(--blue)", marginBottom: 16 }}>Studio &amp; Online Location</h3>
                <div style={{ display: "flex", gap: 12, marginBottom: 14 }}>
                  <MapPin size={20} color="var(--blue)" style={{ flexShrink: 0, marginTop: 3 }} />
                  <div>
                    <strong style={{ fontSize: 15, color: "var(--ink-body)" }}>Thalwil Studio, Switzerland</strong>
                    <p style={{ fontSize: 14, color: "var(--muted)", margin: 0 }}>Gewerbestrasse 24, 8800 Thalwil</p>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                  <Video size={20} color="var(--blue)" style={{ flexShrink: 0, marginTop: 3 }} />
                  <div>
                    <strong style={{ fontSize: 15, color: "var(--ink-body)" }}>Online via Teams / Zoom</strong>
                    <p style={{ fontSize: 14, color: "var(--muted)", margin: 0 }}>Link shared automatically upon booking confirmation</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>

      <SiteFooter />
    </main>
  );
}
