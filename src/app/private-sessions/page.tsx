import Image from "next/image";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MapPin } from "lucide-react";

export default function PrivateSessionsPage() {
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
            
            {/* Venue Location Badge */}
            <div style={{ backgroundColor: "#F4F9FC", border: "1px solid #BCD4E3", padding: "10px 14px", borderRadius: 10, marginBottom: 20, display: "inline-flex", gap: 10, alignItems: "center", fontSize: 13, color: "var(--blue)", fontWeight: 700 }}>
              <MapPin size={18} color="var(--blue)" />
              <span>at BODYTALKS, Alte Landstrasse 32, Thalwil</span>
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
            <p className="body-text" style={{ fontSize: 14, color: "var(--muted)" }}>
              To book a private session, please get in touch directly.
            </p>
          </div>
        </section>
      </div>

      <SiteFooter />
    </main>
  );
}
