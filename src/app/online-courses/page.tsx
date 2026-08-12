"use client";

import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Calendar, Clock, Video, CheckCircle2, Award, Sparkles, ArrowRight } from "lucide-react";

export default function OnlineCoursesPage() {
  return (
    <main>
      <SiteHeader />

      {/* Page Hero Banner */}
      <section className="page-banner" style={{ minHeight: 260, padding: "60px 20px" }}>
        <div>
          <span style={{ display: "inline-block", fontSize: 13, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.8)", marginBottom: 12 }}>
            Live Online Classes &amp; Mentoring
          </span>
          <h1 style={{ fontSize: "clamp(36px, 5.5vw, 60px)", lineHeight: 1.1 }}>Online Courses &amp; Classes</h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.85)", marginTop: 14, fontFamily: "var(--serif)", fontStyle: "italic" }}>
            Practice with Susi Davies from anywhere in the world
          </p>
        </div>
        <span className="page-banner-arrow">⌄</span>
      </section>

      <div className="container" style={{ paddingTop: 60, paddingBottom: 90 }}>

        {/* Section 1: Intro Feature Grid */}
        <section className="grid-2col-alt" style={{ marginBottom: 80 }}>
          <div className="col-media">
            <div className="image-card-rounded" style={{ borderRadius: 24, overflow: "hidden", boxShadow: "0 12px 40px rgba(0,0,0,0.08)" }}>
              <img
                src="https://res.cloudinary.com/qtah71h2/image/upload/v1786527175/susi-davies16.jpg"
                alt="Practice with Susi Davies online"
                style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }}
              />
            </div>
          </div>
          <div className="col-content">
            <span className="eyebrow" style={{ color: "var(--blue)", fontSize: 13 }}>
              Live Interactive Sessions
            </span>
            <h2 className="section-heading" style={{ fontSize: "clamp(28px, 3.5vw, 42px)", marginBottom: 18 }}>
              Transformative Movement &amp; Breathwork from Home
            </h2>
            <p className="body-text">
              Join Susi Davies for weekly live online movement sessions streamed directly to your home. Designed for all levels, these classes blend functional movement, yoga posture, mobility drills, and nervous system regulation.
            </p>
            <p className="body-text">
              Whether you are looking to build core strength, recover from tension, or cultivate daily mindfulness, Susi guides every session with 30+ years of therapy and movement expertise.
            </p>

            {/* Certification & Accreditation Badges */}
            <div style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap", marginTop: 28, paddingTop: 20, borderTop: "1px solid #E2DDD3" }}>
              {/* QualiCert Badge */}
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <svg width="68" height="68" viewBox="0 0 110 110" fill="none">
                  <circle cx="55" cy="55" r="50" stroke="#B89B5E" strokeWidth="2.5" strokeDasharray="3 3"/>
                  <circle cx="55" cy="55" r="44" stroke="#2691BA" strokeWidth="2"/>
                  <text x="55" y="32" textAnchor="middle" fill="#8C733E" fontSize="8" fontWeight="700" letterSpacing="1">WIR SIND</text>
                  <text x="55" y="60" textAnchor="middle" fill="#2691BA" fontSize="17" fontWeight="800">QualiCert</text>
                  <text x="55" y="80" textAnchor="middle" fill="#8C733E" fontSize="8" fontWeight="700" letterSpacing="1">ZERTIFIZIERT</text>
                </svg>
                <div>
                  <strong style={{ fontSize: 13, color: "var(--ink-title)", display: "block" }}>QualiCert Certified</strong>
                  <span style={{ fontSize: 12, color: "var(--muted)" }}>Health Insurance Recognized</span>
                </div>
              </div>

              {/* E-RYT 500 Badge */}
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <Image
                  src="/images/e-ryt.png"
                  alt="E-RYT 500 Yoga Alliance"
                  width={68}
                  height={68}
                  style={{ objectFit: "contain" }}
                />
                <div>
                  <strong style={{ fontSize: 13, color: "var(--ink-title)", display: "block" }}>E-RYT 500 Master Teacher</strong>
                  <span style={{ fontSize: 12, color: "var(--muted)" }}>Yoga Alliance Registered</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Online Offerings Grid (Balanced 2-Column Layout) */}
        <section style={{ marginBottom: 90 }}>
          <div style={{ textAlign: "center", marginBottom: 46 }}>
            <span className="eyebrow" style={{ color: "var(--blue)" }}>Curated Online Formats</span>
            <h2 className="section-heading" style={{ margin: "12px 0 0" }}>Choose Your Practice Format</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 30 }}>

            {/* Card 1: Weekly Live Online Classes */}
            <div
              style={{
                backgroundColor: "#ffffff",
                borderRadius: 24,
                padding: "36px 30px 32px",
                border: "1.5px solid #BCD4E3",
                boxShadow: "0 8px 30px rgba(38,145,186,0.08)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div style={{ position: "absolute", top: 0, left: 0, width: 6, height: "100%", backgroundColor: "var(--blue)" }} />

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--blue)", backgroundColor: "rgba(38,145,186,0.1)", padding: "5px 12px", borderRadius: 100 }}>
                    🌿 Live Group Sessions
                  </span>
                  <span style={{ fontSize: 12, color: "var(--muted)", display: "flex", alignItems: "center", gap: 4 }}>
                    <Video size={14} color="var(--blue)" /> Live via TEAMS
                  </span>
                </div>

                <h3 style={{ fontSize: 26, fontFamily: "var(--serif)", color: "var(--blue)", marginBottom: 10 }}>
                  Dynamic Movement
                </h3>
                <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.65, marginBottom: 20 }}>
                  A dynamic blend of movement practices designed to build functional strength, mobility, flexibility, balance, and body awareness.
                </p>

                {/* Focus Tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
                  {["Yoga Asana", "Functional Movement", "Mobility Drills", "Breath-Led Sequences"].map((tag) => (
                    <span key={tag} style={{ fontSize: 12, backgroundColor: "#F4F9FC", border: "1px solid #BCD4E3", color: "var(--blue)", padding: "4px 10px", borderRadius: 8, fontWeight: 600 }}>
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Weekly Timings Table */}
                <div style={{ backgroundColor: "#FAFAF8", borderRadius: 16, border: "1px solid #E2DDD3", padding: "18px 20px", marginBottom: 24 }}>
                  <strong style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--blue)", display: "block", marginBottom: 12 }}>
                    🗓️ Weekly Live Schedule
                  </strong>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, borderBottom: "1px dashed #E2DDD3", paddingBottom: 8 }}>
                      <span style={{ fontWeight: 700, color: "var(--ink-title)" }}>Monday Evening</span>
                      <span style={{ color: "var(--blue)", fontWeight: 700 }}>18:30 – 19:30</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14 }}>
                      <span style={{ fontWeight: 700, color: "var(--ink-title)" }}>Wednesday Morning</span>
                      <span style={{ color: "var(--blue)", fontWeight: 700 }}>09:00 – 10:00</span>
                    </div>
                  </div>
                </div>

                {/* Pricing Box */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 18px", backgroundColor: "rgba(38,145,186,0.06)", borderRadius: 14, marginBottom: 24 }}>
                  <div>
                    <span style={{ fontSize: 12, color: "var(--muted)", display: "block" }}>Single Session</span>
                    <strong style={{ fontSize: 18, color: "var(--blue)" }}>CHF 25.–</strong>
                  </div>
                  <span style={{ fontSize: 12, color: "#45A027", backgroundColor: "rgba(84,188,51,0.1)", padding: "4px 10px", borderRadius: 100, fontWeight: 700 }}>
                    TWINT Accepted
                  </span>
                </div>
              </div>

              <a
                href="https://wa.me/41798549752?text=Hello%20Susi%2C%20I%20am%20interested%20in%20the%20Dynamic%20Movement%20weekly%20online%20classes.%20Could%20you%20please%20share%20more%20details%3F"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill btn-pill-cyan"
                style={{ width: "100%", justifyContent: "center", fontSize: 15, padding: "14px 20px" }}
              >
                Join Dynamic Movement Classes →
              </a>
            </div>

            {/* Card 2: 1-on-1 Online Mentoring & Guided Breathwork */}
            <div
              style={{
                backgroundColor: "#ffffff",
                borderRadius: 24,
                padding: "36px 30px 32px",
                border: "1.5px solid #BCD4E3",
                boxShadow: "0 8px 30px rgba(38,145,186,0.08)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div style={{ position: "absolute", top: 0, left: 0, width: 6, height: "100%", backgroundColor: "var(--blue)" }} />

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--blue)", backgroundColor: "rgba(38,145,186,0.1)", padding: "5px 12px", borderRadius: 100 }}>
                    🧘 Private 1-on-1 Online
                  </span>
                  <span style={{ fontSize: 12, color: "var(--muted)", display: "flex", alignItems: "center", gap: 4 }}>
                    <Video size={14} color="var(--blue)" /> Video Call
                  </span>
                </div>

                <h3 style={{ fontSize: 26, fontFamily: "var(--serif)", color: "var(--blue)", marginBottom: 10 }}>
                  Online 1-on-1 Mentoring
                </h3>
                <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.65, marginBottom: 20 }}>
                  Personalized online movement, posture analysis, breathwork, and life coaching sessions tailored specifically around your body and life situation.
                </p>

                {/* Feature Bullet Points */}
                <div style={{ backgroundColor: "#FAFAF8", borderRadius: 16, border: "1px solid #E2DDD3", padding: "18px 20px", marginBottom: 24 }}>
                  <strong style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--blue)", display: "block", marginBottom: 12 }}>
                    ✨ What&apos;s Included
                  </strong>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8, fontSize: 14 }}>
                    <li style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <CheckCircle2 size={16} color="var(--blue)" /> Posture &amp; movement assessment
                    </li>
                    <li style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <CheckCircle2 size={16} color="var(--blue)" /> Custom breathwork routines
                    </li>
                    <li style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <CheckCircle2 size={16} color="var(--blue)" /> Direct feedback &amp; flexible times
                    </li>
                  </ul>
                </div>

                {/* Pricing Box */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 18px", backgroundColor: "rgba(38,145,186,0.06)", borderRadius: 14, marginBottom: 24 }}>
                  <div>
                    <span style={{ fontSize: 12, color: "var(--muted)", display: "block" }}>Session Options</span>
                    <strong style={{ fontSize: 16, color: "var(--blue)" }}>Single or Series Packages</strong>
                  </div>
                </div>
              </div>

              <Link
                href="/private-sessions"
                className="btn-pill btn-pill-cyan"
                style={{ width: "100%", justifyContent: "center", fontSize: 15, padding: "14px 20px" }}
              >
                Book 1-on-1 Online Mentoring →
              </Link>
            </div>

          </div>
        </section>

        {/* Section 3: For Yoga Teachers — Private Further Development */}
        <section style={{ marginBottom: 80 }}>
          <div
            style={{
              background: "linear-gradient(135deg, #1a6e8f 0%, #2691BA 60%, #3ca0c9 100%)",
              borderRadius: 28,
              padding: "48px 40px",
              color: "#ffffff",
              boxShadow: "0 12px 45px rgba(38,145,186,0.25)",
              display: "flex",
              flexDirection: "column",
              gap: 20,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 20 }}>
              <div style={{ maxWidth: 680 }}>
                <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(255,255,255,0.85)", backgroundColor: "rgba(255,255,255,0.15)", padding: "6px 14px", borderRadius: 100, display: "inline-block", marginBottom: 16 }}>
                  🎓 For Yoga Teachers &amp; Mentors
                </span>
                <h2 style={{ fontSize: "clamp(26px, 3.5vw, 36px)", fontFamily: "var(--serif)", color: "#ffffff", margin: "0 0 14px", lineHeight: 1.25 }}>
                  The Art of Teaching Yoga — Private Further Development
                </h2>
                <p style={{ fontSize: 16, lineHeight: 1.7, color: "rgba(255,255,255,0.9)", margin: 0 }}>
                  Advanced private mentoring for yoga teachers who wish to refine sequencing logic, master hands-on adjustments, develop authentic presence, and elevate student guidance.
                </p>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.8)", marginTop: 12, fontStyle: "italic" }}>
                  Available online or in-person at BODYTALKS Thalwil.
                </p>
              </div>

              <a
                href="https://wa.me/41798549752?text=Hello%20Susi%2C%20I%20am%20interested%20in%20Private%20Further%20Development%20for%20Teachers%20%E2%80%94%20The%20Art%20of%20Teaching%20Yoga.%20Could%20you%20please%20share%20more%20details%3F"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  backgroundColor: "#ffffff",
                  color: "var(--blue)",
                  fontWeight: 700,
                  padding: "16px 28px",
                  borderRadius: 100,
                  textDecoration: "none",
                  fontSize: 15,
                  whiteSpace: "nowrap",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                }}
              >
                Enquire About Teacher Mentoring <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </section>

        {/* Section 4: Cross-Navigation CTA */}
        <section style={{ textAlign: "center" }}>
          <p className="body-text" style={{ color: "var(--muted)", marginBottom: 18 }}>
            Looking for in-person workshops or private sessions in Switzerland?
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/workshops" className="btn-pill btn-pill-cyan">
              View In-Person Workshops in Thalwil →
            </Link>
            <Link href="/private-sessions" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "12px 28px", borderRadius: 100, border: "2px solid var(--blue)", color: "var(--blue)", fontWeight: 700, fontSize: 14, textDecoration: "none" }}>
              Private 1-on-1 Sessions
            </Link>
          </div>
        </section>

      </div>

      <SiteFooter />
    </main>
  );
}
