"use client";

import { useState } from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MapPin, Calendar, Clock, CheckCircle2, ChevronRight, Wind, Brain, Sparkles, Users } from "lucide-react";

const dates = [
  { date: "Thursday, 10 September 2026", time: "18:30 – 20:30", spots: "Limited spots" },
  { date: "Thursday, 29 October 2026", time: "18:30 – 20:30", spots: "Limited spots" },
  { date: "Thursday, 3 December 2026", time: "18:30 – 20:30", spots: "Limited spots" },
];

const whatToExpect = [
  { icon: Wind, title: "Breathwork", desc: "Conscious breathing techniques to regulate the nervous system, calm the mind, and access deeper states of presence." },
  { icon: Brain, title: "Yoga Philosophy", desc: "Explore the deeper teachings of yoga — the Yamas, Niyamas, and classical texts — and how to integrate them into daily life." },
  { icon: Sparkles, title: "Meditation & Self-Inquiry", desc: "Guided meditation and silent reflection practices that develop inner clarity, stillness, and self-awareness." },
  { icon: Users, title: "Group Practice", desc: "Practice alongside a small, committed group of students in an intimate, supportive environment." },
];

export default function WorkshopsPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", date: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const set = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.date) return;
    setStatus("sending");

    const body = `New Deeper Practice Workshop Registration

Name: ${form.name}
Email: ${form.email}
Phone: ${form.phone || "Not provided"}
Selected Date: ${form.date}

Message:
${form.message || "None"}`;

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: "hello@susidavies.com",
          subject: `Deeper Practice Workshop Registration — ${form.name}`,
          body,
          fromName: "Susi Davies Website",
        }),
      });

      if (res.ok) {
        // Send confirmation to registrant
        fetch("/api/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            to: form.email,
            subject: "Your Deeper Practice Workshop Registration — Susi Davies",
            body: `Dear ${form.name},\n\nThank you for registering for the Deeper Practice workshop!\n\nSelected Date: ${form.date}\nTime: 18:30 – 20:30\nVenue: at BODYTALKS, Alte Landstrasse 32, Thalwil\n\nSusi will be in touch shortly with all details and payment information (CHF 60.– per workshop, payable by TWINT).\n\nWith warmth,\nSusi Davies`,
            fromName: "Susi Davies",
          }),
        }).catch(() => {});

        setStatus("success");
        setForm({ name: "", email: "", phone: "", date: "", message: "" });
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
      <section className="page-banner" style={{ minHeight: 300, padding: "70px 20px" }}>
        <div>
          <span style={{ display: "inline-block", fontSize: 13, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.75)", marginBottom: 14 }}>
            In-Person Workshop Series · Thalwil, Switzerland
          </span>
          <h1 style={{ fontSize: "clamp(40px, 6vw, 68px)", lineHeight: 1.1 }}>Deeper Practice</h1>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.85)", marginTop: 16, fontFamily: "var(--serif)", fontStyle: "italic" }}>
            Breathwork · Philosophy · Meditation
          </p>
        </div>
        <span className="page-banner-arrow">⌄</span>
      </section>

      <div className="container">

        {/* Intro Section */}
        <section className="grid-2col-alt" style={{ marginTop: 70, marginBottom: 70 }}>
          <div className="col-media">
            <div className="image-card-rounded">
              <img
                src="/images/susi davies7.jpg"
                alt="Susi Davies guiding a deeper practice workshop"
                style={{ width: "100%", height: "580px", objectFit: "cover", borderRadius: 20, display: "block" }}
              />
            </div>
          </div>
          <div className="col-content">
            <span className="eyebrow">Workshop Series 2026</span>
            <h2 className="section-heading" style={{ marginBottom: 16 }}>
              Beyond the Physical —<br />A Deeper Exploration
            </h2>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 22 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 7, backgroundColor: "#F4F9FC", border: "1px solid #BCD4E3", padding: "9px 14px", borderRadius: 10, fontSize: 13, color: "var(--blue)", fontWeight: 700 }}>
                <MapPin size={15} /> at BODYTALKS, Alte Landstrasse 32, Thalwil
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 7, backgroundColor: "#F4F9FC", border: "1px solid #BCD4E3", padding: "9px 14px", borderRadius: 10, fontSize: 13, color: "var(--blue)", fontWeight: 700 }}>
                <Clock size={15} /> 18:30 – 20:30
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 7, backgroundColor: "rgba(84,188,51,0.1)", border: "1px solid rgba(84,188,51,0.3)", padding: "9px 14px", borderRadius: 10, fontSize: 13, color: "#45A027", fontWeight: 700 }}>
                💰 CHF 60.– per workshop
              </span>
            </div>

            <p className="body-text">
              The Deeper Practice workshop series is designed for students who want to move beyond the physical posture and explore yoga as a complete system of self-understanding and transformation.
            </p>
            <p className="body-text">
              Led by Susi Davies — E-RYT 500, QualiCert certified, with over 30 years of teaching experience — each evening offers a rare opportunity to slow down, go inward, and explore the deeper layers of your practice in a small, intimate group.
            </p>
            <p className="body-text">
              You do not need to be an experienced practitioner. These workshops are open to anyone with genuine curiosity and a willingness to look within.
            </p>

            <div style={{ padding: "20px 24px", backgroundColor: "rgba(38,145,186,0.06)", border: "1.5px solid var(--blue)", borderRadius: 16, marginTop: 24 }}>
              <strong style={{ fontSize: 15, color: "var(--blue)", display: "block", marginBottom: 6 }}>
                🌿 This is a space for...
              </strong>
              <ul className="bullet-list" style={{ marginTop: 8 }}>
                <li>Students seeking depth and understanding beyond asana</li>
                <li>Yoga teachers wanting to enrich their personal practice</li>
                <li>Anyone curious about breathwork, philosophy, or meditation</li>
                <li>Those seeking community and meaningful practice</li>
              </ul>
            </div>
          </div>
        </section>

        {/* What to Expect */}
        <section style={{ marginBottom: 80 }}>
          <div style={{ textAlign: "center", marginBottom: 50 }}>
            <span className="eyebrow" style={{ color: "var(--blue)" }}>What to Expect</span>
            <h2 className="section-heading" style={{ margin: "12px 0 0" }}>Each Evening Includes</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 28 }}>
            {whatToExpect.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                style={{ backgroundColor: "#ffffff", borderRadius: 20, padding: "32px 28px", border: "1px solid #E2DDD3", boxShadow: "0 4px 20px rgba(0,0,0,0.04)", display: "flex", flexDirection: "column", gap: 14 }}
              >
                <div style={{ width: 52, height: 52, borderRadius: 14, backgroundColor: "rgba(38,145,186,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={26} color="var(--blue)" />
                </div>
                <strong style={{ fontSize: 18, color: "var(--blue)", fontFamily: "var(--serif)" }}>{title}</strong>
                <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.65, margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Upcoming Dates */}
        <section style={{ marginBottom: 90 }}>
          <div style={{ textAlign: "center", marginBottom: 46 }}>
            <span className="eyebrow" style={{ color: "var(--blue)" }}>2026 Dates</span>
            <h2 className="section-heading" style={{ margin: "12px 0 0" }}>Upcoming Workshop Dates</h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 780, margin: "0 auto" }}>
            {dates.map((d, i) => (
              <div
                key={i}
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, padding: "24px 30px", backgroundColor: "#ffffff", borderRadius: 18, border: "1.5px solid #E2DDD3", boxShadow: "0 4px 16px rgba(0,0,0,0.04)", flexWrap: "wrap" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                  <div style={{ width: 46, height: 46, borderRadius: 12, backgroundColor: "rgba(38,145,186,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Calendar size={22} color="var(--blue)" />
                  </div>
                  <div>
                    <strong style={{ fontSize: 17, color: "var(--ink-title)", display: "block" }}>{d.date}</strong>
                    <span style={{ fontSize: 14, color: "var(--blue)", fontWeight: 700 }}>
                      <Clock size={13} style={{ verticalAlign: "middle", marginRight: 4 }} />{d.time}
                    </span>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 14, flexShrink: 0 }}>
                  <span style={{ fontSize: 12, color: "#E67E22", backgroundColor: "rgba(230,126,34,0.1)", padding: "4px 12px", borderRadius: 100, fontWeight: 700 }}>
                    {d.spots}
                  </span>
                  <a
                    href="#register"
                    style={{ display: "inline-flex", alignItems: "center", gap: 5, backgroundColor: "var(--blue)", color: "#fff", padding: "10px 18px", borderRadius: 100, fontSize: 13, fontWeight: 700, textDecoration: "none", whiteSpace: "nowrap" }}
                  >
                    Register <ChevronRight size={15} />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Venue Card */}
          <div style={{ maxWidth: 780, margin: "30px auto 0", padding: "24px 30px", backgroundColor: "rgba(38,145,186,0.05)", border: "1px solid #BCD4E3", borderRadius: 18, display: "flex", gap: 16, alignItems: "flex-start" }}>
            <MapPin size={22} color="var(--blue)" style={{ flexShrink: 0, marginTop: 2 }} />
            <div>
              <strong style={{ fontSize: 15, color: "var(--blue)", display: "block", marginBottom: 4 }}>Venue: BODYTALKS</strong>
              <p style={{ fontSize: 14, color: "var(--muted)", margin: 0 }}>Alte Landstrasse 32, Thalwil, Switzerland</p>
            </div>
          </div>
        </section>

        {/* Registration Form */}
        <section id="register" style={{ marginBottom: 100 }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span className="eyebrow" style={{ color: "var(--blue)" }}>Secure Your Place</span>
            <h2 className="section-heading" style={{ margin: "12px 0 16px" }}>Register for a Workshop</h2>
            <p className="body-text" style={{ maxWidth: 580, margin: "0 auto" }}>
              Spaces are limited to maintain an intimate group experience. Register below and Susi will confirm your place within 24 hours.
            </p>
          </div>

          {status === "success" ? (
            <div style={{ maxWidth: 620, margin: "0 auto", textAlign: "center", padding: "60px 40px", backgroundColor: "#EAF6FB", borderRadius: 24, border: "1px solid #BCD4E3" }}>
              <CheckCircle2 size={52} color="var(--blue)" style={{ marginBottom: 20 }} />
              <h3 style={{ fontFamily: "var(--serif)", fontSize: 28, color: "var(--blue)", marginBottom: 12 }}>
                Registration Received!
              </h3>
              <p className="body-text">
                Thank you! Susi will personally confirm your spot within 24 hours along with payment details (CHF 60.– via TWINT).
              </p>
              <button onClick={() => setStatus("idle")} className="btn-pill btn-pill-cyan" style={{ marginTop: 28 }}>
                Register for Another Date
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{ maxWidth: 700, margin: "0 auto", backgroundColor: "#ffffff", borderRadius: 24, border: "1px solid #E2DDD3", padding: "48px 48px 44px", boxShadow: "0 8px 40px rgba(0,0,0,0.06)" }}
            >
              {/* Select Date */}
              <div className="form-group" style={{ marginBottom: 22 }}>
                <label style={{ fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                  <Calendar size={14} /> Choose Your Workshop Date *
                </label>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {dates.map((d) => (
                    <label
                      key={d.date}
                      style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 20px", borderRadius: 14, border: `2px solid ${form.date === d.date ? "var(--blue)" : "#E2DDD3"}`, backgroundColor: form.date === d.date ? "rgba(38,145,186,0.05)" : "#FAFAF8", cursor: "pointer", transition: "all 0.2s" }}
                    >
                      <input
                        type="radio"
                        name="date"
                        value={d.date}
                        checked={form.date === d.date}
                        onChange={() => set("date", d.date)}
                        style={{ accentColor: "var(--blue)", width: 18, height: 18 }}
                        required
                      />
                      <div>
                        <strong style={{ fontSize: 15, color: "var(--ink-title)", display: "block" }}>{d.date}</strong>
                        <span style={{ fontSize: 13, color: "var(--blue)", fontWeight: 600 }}>{d.time} · CHF 60.–</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Name & Email */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 18 }}>
                <div className="form-group">
                  <label style={{ fontSize: 13, fontWeight: 700, display: "block", marginBottom: 6 }}>Full Name *</label>
                  <input type="text" className="form-input" required placeholder="Your full name" value={form.name} onChange={(e) => set("name", e.target.value)} />
                </div>
                <div className="form-group">
                  <label style={{ fontSize: 13, fontWeight: 700, display: "block", marginBottom: 6 }}>Email Address *</label>
                  <input type="email" className="form-input" required placeholder="your@email.com" value={form.email} onChange={(e) => set("email", e.target.value)} />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: 18 }}>
                <label style={{ fontSize: 13, fontWeight: 700, display: "block", marginBottom: 6 }}>Phone / WhatsApp (optional)</label>
                <input type="tel" className="form-input" placeholder="+41 79 000 00 00" value={form.phone} onChange={(e) => set("phone", e.target.value)} />
              </div>

              <div className="form-group" style={{ marginBottom: 30 }}>
                <label style={{ fontSize: 13, fontWeight: 700, display: "block", marginBottom: 6 }}>Any questions or notes for Susi? (optional)</label>
                <textarea className="form-textarea" rows={3} placeholder="e.g. Is this suitable for beginners? Do I need a yoga mat?" value={form.message} onChange={(e) => set("message", e.target.value)} />
              </div>

              {status === "error" && (
                <p style={{ color: "#E74C3C", fontSize: 14, marginBottom: 16 }}>Something went wrong. Please email hello@susidavies.com directly.</p>
              )}

              <button
                type="submit"
                className="btn-pill btn-pill-cyan"
                disabled={status === "sending"}
                style={{ width: "100%", justifyContent: "center", fontSize: 16, padding: "16px 24px", opacity: status === "sending" ? 0.7 : 1 }}
              >
                {status === "sending" ? "Sending Registration…" : "Register for Deeper Practice →"}
              </button>

              <p style={{ textAlign: "center", fontSize: 13, color: "var(--muted)", marginTop: 16 }}>
                CHF 60.– per workshop · Payment via TWINT · Susi confirms within 24 hours
              </p>
            </form>
          )}
        </section>

        {/* Also Interested CTA */}
        <section style={{ marginBottom: 90, textAlign: "center" }}>
          <p className="body-text" style={{ color: "var(--muted)", marginBottom: 20 }}>
            Also looking for private one-to-one sessions or weekly online classes?
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/private-sessions" className="btn-pill btn-pill-cyan">Book a Private Session</Link>
            <Link href="/online-courses" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "12px 28px", borderRadius: 100, border: "2px solid var(--blue)", color: "var(--blue)", fontWeight: 700, fontSize: 14, textDecoration: "none" }}>
              View All Classes &amp; Courses
            </Link>
          </div>
        </section>

      </div>

      <SiteFooter />
    </main>
  );
}
