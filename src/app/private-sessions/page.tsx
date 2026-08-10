"use client";

import { useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MapPin, Video, User, Calendar, Clock, CheckCircle2, ChevronDown } from "lucide-react";

const sessionTypes = [
  "Movement Therapy",
  "Remedial Therapy",
  "Yoga & Functional Movement",
  "Breathwork & Nervous System",
  "Fascia Release",
  "Meditation & Relaxation",
  "Combined / Let Susi Guide",
];

const timeSlots = [
  "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00",
];

export default function PrivateSessionsPage() {
  const [sessionMode, setSessionMode] = useState<"in-person" | "online">("in-person");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    sessionType: "",
    preferredDate: "",
    preferredTime: "",
    location: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const set = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.sessionType) return;
    setStatus("sending");

    const modeLabel = sessionMode === "in-person" ? "In-Person Session" : "Online Session (Video Call)";
    const locationLine = sessionMode === "in-person"
      ? `Location: ${form.location || "Client's location / to be confirmed"}`
      : "Session Format: Online — Video Call";

    const emailBody = `New Private Session Booking Request

Name: ${form.name}
Email: ${form.email}
Phone: ${form.phone || "Not provided"}
Session Type: ${modeLabel}
Focus Area: ${form.sessionType}
Preferred Date: ${form.preferredDate || "Flexible"}
Preferred Time: ${form.preferredTime || "Flexible"}
${locationLine}

Additional Notes:
${form.message || "None"}`;

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: "hello@susidavies.com",
          subject: `Private Session Booking Request — ${form.name}`,
          body: emailBody,
          fromName: "Susi Davies Website",
        }),
      });

      if (res.ok) {
        // Also send confirmation to client
        fetch("/api/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            to: form.email,
            subject: "Your Private Session Request — Susi Davies",
            body: `Dear ${form.name},\n\nThank you for reaching out! Your private session booking request has been received.\n\nSusi will personally get back to you within 24 hours to confirm your session details.\n\nSession Focus: ${form.sessionType}\nFormat: ${modeLabel}\n\nWith warmth,\nSusi Davies`,
            fromName: "Susi Davies",
          }),
        }).catch(() => {});

        setStatus("success");
        setForm({ name: "", email: "", phone: "", sessionType: "", preferredDate: "", preferredTime: "", location: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <main>
      <SiteHeader />

      {/* Hero Banner */}
      <section className="page-banner">
        <div>
          <h1>Private Sessions</h1>
        </div>
        <span className="page-banner-arrow">⌄</span>
      </section>

      <div className="container">
        {/* Section 1: Text Left, Image Right */}
        <section className="grid-2col-alt">
          <div className="col-media">
            <div className="image-card-rounded">
              <img
                src="https://res.cloudinary.com/dm4jfxbcs/image/upload/v1786343531/susi2_v8c5c9.jpg"
                alt="Susi Davies Standing Alignment Pose"
                style={{ width: "100%", height: "auto", display: "block", borderRadius: "20px", objectFit: "cover" }}
              />
            </div>
          </div>
          <div className="col-content">
            <h2 className="section-heading" style={{ marginBottom: 16 }}>
              Private One-to-One<br />Sessions
            </h2>
            <p className="body-text" style={{ fontStyle: "italic", fontSize: 18, color: "var(--ink-body)" }}>
              Personal guidance. Tailored support. Real transformation.
            </p>

            {/* Mode Badges */}
            <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
              <div style={{ backgroundColor: "#F4F9FC", border: "1px solid #BCD4E3", padding: "10px 14px", borderRadius: 10, display: "inline-flex", gap: 8, alignItems: "center", fontSize: 13, color: "var(--blue)", fontWeight: 700 }}>
                <MapPin size={16} color="var(--blue)" />
                <span>At your location</span>
              </div>
              <div style={{ backgroundColor: "#F4F9FC", border: "1px solid #BCD4E3", padding: "10px 14px", borderRadius: 10, display: "inline-flex", gap: 8, alignItems: "center", fontSize: 13, color: "var(--blue)", fontWeight: 700 }}>
                <Video size={16} color="var(--blue)" />
                <span>Online</span>
              </div>
            </div>

            <p className="body-text">
              With over 30 years of experience, Susi Davies offers private sessions designed entirely around you—your body, your needs, and your life situation.
            </p>
            <p className="body-text">
              These are not just yoga sessions. They are personalised experiences that support healing, growth, and transformation using a combination of:
            </p>
            <ul className="bullet-list">
              <li>Movement therapy</li>
              <li>Remedial techniques</li>
              <li>Yoga and functional movement</li>
              <li>Breathwork and nervous system regulation</li>
              <li>Fascia release</li>
              <li>Meditation and relaxation guidance</li>
            </ul>
            <p className="body-text">
              Every session is different. Susi chooses the approach that best supports you in that moment.
            </p>
            <p className="body-text">
              Whether you are dealing with physical discomfort, stress, emotional challenges, or simply feel the need to reconnect with yourself—this is a space where real change can begin.
            </p>
            <p className="body-text" style={{ fontStyle: "italic" }}>
              You don&apos;t need experience.<br />
              You don&apos;t need to &ldquo;do yoga.&rdquo;<br />
              You just need to show up.
            </p>
          </div>
        </section>

        {/* Section 2: Image Left, Text Right */}
        <section className="grid-2col" style={{ marginTop: 70 }}>
          <div className="col-media">
            <div className="image-card-rounded">
              <img
                src="https://res.cloudinary.com/dm4jfxbcs/image/upload/v1786343531/susi3_euqaqm.jpg"
                alt="Susi Davies seated yoga pose"
                style={{ width: "100%", height: "auto", display: "block", borderRadius: "20px", objectFit: "cover" }}
              />
            </div>
          </div>
          <div className="col-content">
            <h2 className="section-heading">What We Focus On</h2>
            <ul className="bullet-list">
              <li>Alignment and technique</li>
              <li>Breath and movement</li>
              <li>Strength and mobility</li>
              <li>Meditation and inner focus</li>
              <li>Personal guidance for teachers (if desired)</li>
            </ul>
            <p className="body-text" style={{ fontStyle: "italic" }}>
              Every session is adapted to your needs.
            </p>
          </div>
        </section>

        {/* ── BOOKING FORM ── */}
        <section style={{ marginTop: 90, marginBottom: 90 }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span className="eyebrow" style={{ color: "var(--blue)", fontSize: 14 }}>Ready to Begin?</span>
            <h2 className="section-heading" style={{ margin: "12px 0 16px" }}>Book Your Private Session</h2>
            <p className="body-text" style={{ maxWidth: 620, margin: "0 auto" }}>
              Choose how you would like to work with Susi — in person at your location, or online from anywhere in the world.
            </p>
          </div>

          {status === "success" ? (
            <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center", padding: "60px 40px", backgroundColor: "#EAF6FB", borderRadius: 24, border: "1px solid #BCD4E3" }}>
              <CheckCircle2 size={52} color="var(--blue)" style={{ marginBottom: 20 }} />
              <h3 style={{ fontFamily: "var(--serif)", fontSize: 28, color: "var(--blue)", marginBottom: 12 }}>
                Booking Request Received!
              </h3>
              <p className="body-text">
                Thank you! Susi will personally get back to you within 24 hours to confirm your session. A confirmation has been sent to your email.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="btn-pill btn-pill-cyan"
                style={{ marginTop: 28 }}
              >
                Book Another Session
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{ maxWidth: 780, margin: "0 auto", backgroundColor: "#ffffff", borderRadius: 24, border: "1px solid #E2DDD3", padding: "48px 48px 44px", boxShadow: "0 8px 40px rgba(0,0,0,0.06)" }}
            >
              {/* Session Mode Toggle */}
              <div style={{ marginBottom: 36 }}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--blue)", marginBottom: 14 }}>
                  How would you like to meet?
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <button
                    type="button"
                    onClick={() => setSessionMode("in-person")}
                    style={{
                      padding: "18px 16px",
                      borderRadius: 16,
                      border: `2px solid ${sessionMode === "in-person" ? "var(--blue)" : "#E2DDD3"}`,
                      backgroundColor: sessionMode === "in-person" ? "rgba(38,145,186,0.06)" : "#FAFAF8",
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 10,
                      transition: "all 0.2s ease",
                    }}
                  >
                    <MapPin size={26} color={sessionMode === "in-person" ? "var(--blue)" : "#9CA3AF"} />
                    <strong style={{ fontSize: 15, color: sessionMode === "in-person" ? "var(--blue)" : "#6B7280" }}>At Your Location</strong>
                    <span style={{ fontSize: 12, color: "#9CA3AF" }}>In-person session</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSessionMode("online")}
                    style={{
                      padding: "18px 16px",
                      borderRadius: 16,
                      border: `2px solid ${sessionMode === "online" ? "var(--blue)" : "#E2DDD3"}`,
                      backgroundColor: sessionMode === "online" ? "rgba(38,145,186,0.06)" : "#FAFAF8",
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 10,
                      transition: "all 0.2s ease",
                    }}
                  >
                    <Video size={26} color={sessionMode === "online" ? "var(--blue)" : "#9CA3AF"} />
                    <strong style={{ fontSize: 15, color: sessionMode === "online" ? "var(--blue)" : "#6B7280" }}>Online</strong>
                    <span style={{ fontSize: 12, color: "#9CA3AF" }}>Video Call</span>
                  </button>
                </div>
              </div>

              {/* Personal Details */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 18 }}>
                <div className="form-group">
                  <label style={{ fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                    <User size={14} /> Full Name *
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    required
                    placeholder="Your full name"
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label style={{ fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    className="form-input"
                    required
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                  />
                </div>
              </div>

              <div style={{ marginBottom: 18 }}>
                <div className="form-group">
                  <label style={{ fontSize: 13, fontWeight: 700, display: "block", marginBottom: 6 }}>Phone / WhatsApp (optional)</label>
                  <input
                    type="tel"
                    className="form-input"
                    placeholder="+41 79 000 00 00"
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                  />
                </div>
              </div>

              {/* Session Focus */}
              <div className="form-group" style={{ marginBottom: 18 }}>
                <label style={{ fontSize: 13, fontWeight: 700, display: "block", marginBottom: 6 }}>
                  Session Focus / Area of Interest *
                </label>
                <div style={{ position: "relative" }}>
                  <select
                    className="form-input"
                    required
                    value={form.sessionType}
                    onChange={(e) => set("sessionType", e.target.value)}
                    style={{ appearance: "none", paddingRight: 40 }}
                  >
                    <option value="">Select what you&apos;d like to focus on...</option>
                    {sessionTypes.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <ChevronDown size={16} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#6B7280" }} />
                </div>
              </div>

              {/* Preferred Date & Time */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 18 }}>
                <div className="form-group">
                  <label style={{ fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                    <Calendar size={14} /> Preferred Date
                  </label>
                  <input
                    type="date"
                    className="form-input"
                    value={form.preferredDate}
                    onChange={(e) => set("preferredDate", e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label style={{ fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                    <Clock size={14} /> Preferred Time
                  </label>
                  <div style={{ position: "relative" }}>
                    <select
                      className="form-input"
                      value={form.preferredTime}
                      onChange={(e) => set("preferredTime", e.target.value)}
                      style={{ appearance: "none", paddingRight: 40 }}
                    >
                      <option value="">Any time</option>
                      {timeSlots.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                    <ChevronDown size={16} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#6B7280" }} />
                  </div>
                </div>
              </div>

              {/* Location field — only for in-person */}
              {sessionMode === "in-person" && (
                <div className="form-group" style={{ marginBottom: 18 }}>
                  <label style={{ fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                    <MapPin size={14} /> Your Location / Address
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Zurich, or your home address"
                    value={form.location}
                    onChange={(e) => set("location", e.target.value)}
                  />
                </div>
              )}

              {/* Message */}
              <div className="form-group" style={{ marginBottom: 30 }}>
                <label style={{ fontSize: 13, fontWeight: 700, display: "block", marginBottom: 6 }}>
                  Tell Susi a Little About Yourself (optional)
                </label>
                <textarea
                  className="form-textarea"
                  rows={4}
                  placeholder="What brings you here? Any injuries, goals, or things Susi should know before your session?"
                  value={form.message}
                  onChange={(e) => set("message", e.target.value)}
                />
              </div>

              {status === "error" && (
                <p style={{ color: "#E74C3C", fontSize: 14, marginBottom: 16 }}>
                  Something went wrong. Please try again or email hello@susidavies.com directly.
                </p>
              )}

              <button
                type="submit"
                className="btn-pill btn-pill-cyan"
                disabled={status === "sending"}
                style={{ width: "100%", justifyContent: "center", fontSize: 16, padding: "16px 24px", opacity: status === "sending" ? 0.7 : 1 }}
              >
                {status === "sending" ? "Sending Request…" : `Request ${sessionMode === "in-person" ? "In-Person" : "Online"} Session with Susi →`}
              </button>

              <p style={{ textAlign: "center", fontSize: 13, color: "var(--muted)", marginTop: 16 }}>
                Susi will personally reply within 24 hours to confirm your session.
              </p>
            </form>
          )}
        </section>
      </div>

      <SiteFooter />
    </main>
  );
}
