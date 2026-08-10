"use client";

import Image from "next/image";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MapPin, Calendar, Clock } from "lucide-react";

export default function OnlineCoursesPage() {
  return (
    <main>
      <SiteHeader />

      {/* Page Hero Banner */}
      <section className="page-banner">
        <div>
          <h1>Classes &amp; Workshops</h1>
        </div>
        <span className="page-banner-arrow">⌄</span>
      </section>

      <div className="container">
        {/* Intro Section */}
        <section className="grid-2col" style={{ marginBottom: 50 }}>
          <div className="col-media">
            <div className="image-card-rounded">
              <Image
                src="/images/susi davies3.jpg"
                alt="Practice with Susi Davies online"
                width={500}
                height={550}
                style={{ width: "100%", height: "auto", objectFit: "contain" }}
                priority
              />
            </div>
          </div>
          <div className="col-content">
            <span className="eyebrow">Online &amp; In-Person Workshops</span>
            <h2 className="section-heading">Practice with Susi Davies</h2>
            <p className="body-text">
              Join Susi for weekly online movement sessions from home, or attend in-person deeper workshops at our Thalwil venue for committed students and teachers seeking clarity, structure, and depth in their personal practice.
            </p>
            <p className="body-text">
              Weekly live sessions, masterclasses, and guided breathwork routines designed to transform your movement and regulate your nervous system.
            </p>

            {/* Prominent Weekly Schedule Box */}
            <div style={{ backgroundColor: "rgba(38,145,186,0.08)", border: "1.5px solid var(--blue)", borderRadius: 16, padding: "20px 24px", marginTop: 24 }}>
              <strong style={{ fontSize: 16, color: "var(--blue)", display: "block", marginBottom: 8 }}>
                🗓️ Weekly Live Online Class Timings
              </strong>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 15, fontSize: 15, color: "var(--ink-body)" }}>
                <div>
                  <strong style={{ color: "var(--blue)" }}>Monday:</strong> 18:30 – 19:30
                </div>
                <div>
                  <strong style={{ color: "var(--blue)" }}>Wednesday:</strong> 09:00 – 10:00
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Format & Certifications Section */}
        <section style={{ margin: "70px 0 80px" }}>
          <p className="body-text" style={{ textAlign: "center", color: "var(--muted)", marginBottom: 40 }}>
            We offer the following pricing options and details for your convenience
          </p>

          <div className="grid-2col">
            <div className="col-media">
              <div className="image-card-rounded">
                <Image
                  src="/images/coaching4.jpg"
                  alt="Susi Davies yoga posture"
                  width={500}
                  height={620}
                  style={{ width: "100%", height: "auto", objectFit: "contain" }}
                />
              </div>
            </div>

            <div className="col-content">
              <h2 className="section-heading" style={{ fontSize: 46, marginBottom: 20 }}>
                Format &amp; Venue
              </h2>
              <ul className="bullet-list" style={{ marginBottom: 25 }}>
                <li><strong>Online Classes:</strong> Live via TEAMS</li>
                <li><strong>In-Person Workshops:</strong> at BODYTALKS, Alte Landstrasse 32, Thalwil</li>
                <li>Structured course format with personalized feedback</li>
                <li>Details and schedule shared before launch</li>
              </ul>

              {/* Certification Badges */}
              <div style={{ display: "flex", gap: 30, alignItems: "center", flexWrap: "wrap", marginTop: 10 }}>
                {/* QualiCert Badge */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <svg width="115" height="115" viewBox="0 0 110 110" fill="none">
                    <circle cx="55" cy="55" r="50" stroke="#B89B5E" strokeWidth="2.5" strokeDasharray="3 3"/>
                    <circle cx="55" cy="55" r="44" stroke="#2691BA" strokeWidth="2"/>
                    <text x="55" y="32" textAnchor="middle" fill="#8C733E" fontSize="8" fontWeight="700" letterSpacing="1">WIR SIND</text>
                    <text x="55" y="60" textAnchor="middle" fill="#2691BA" fontSize="17" fontWeight="800">QualiCert</text>
                    <text x="55" y="80" textAnchor="middle" fill="#8C733E" fontSize="8" fontWeight="700" letterSpacing="1">ZERTIFIZIERT</text>
                  </svg>
                </div>

                {/* E-RYT 500 Yoga Alliance Badge Image */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <Image
                    src="/images/e-ryt.png"
                    alt="E-RYT 500 Yoga Alliance Registered Yoga Teacher"
                    width={130}
                    height={130}
                    style={{ objectFit: "contain" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Custom Yoga Blocks Section */}
        <div className="ym-wrap">
          {/* Row: Block 1 (Online) + Block 2 (In-Person Workshops) */}
          <div className="ym-row">

            {/* Block 1: Dynamic Movement (Weekly Online) */}
            <div className="ym-card ym-card-light">
              <div>
                <span className="ym-badge ym-badge-light">🌿 Weekly Online Classes</span>
                <h2 className="ym-h2 ym-h2-light">Dynamic Movement</h2>
                <p className="ym-sub ym-sub-light">A living, breathing practice (Online via TEAMS)</p>
                <p className="ym-desc ym-desc-light">A dynamic blend of movement practices designed to build strength, mobility, flexibility, balance, and body awareness. Perfect for anyone wanting to move better and feel stronger.</p>
                <ul className="ym-tags ym-tags-light">
                  <li>Yoga Asana</li>
                  <li>Functional Movement</li>
                  <li>Mobility Drills</li>
                  <li>Flexibility Work</li>
                  <li>Breath-Led Sequences</li>
                </ul>
                <table className="ym-table">
                  <thead>
                    <tr>
                      <th>Day</th>
                      <th>Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><span className="ym-day">Monday</span></td>
                      <td>18:30 – 19:30</td>
                    </tr>
                    <tr>
                      <td><span className="ym-day">Wednesday</span></td>
                      <td>09:00 – 10:00</td>
                    </tr>
                  </tbody>
                </table>
                <div className="ym-inforow">
                  <div className="ym-infobox ym-infobox-light">
                    <div className="ym-infobox-label ym-infobox-label-light">💰 Price</div>
                    <div className="ym-infobox-val ym-infobox-val-light"><strong>CHF 25.–</strong> per session</div>
                  </div>
                  <div className="ym-infobox ym-infobox-light">
                    <div className="ym-infobox-label ym-infobox-label-light">📱 Payment</div>
                    <div className="ym-infobox-val ym-infobox-val-light"><strong>TWINT</strong> accepted</div>
                  </div>
                </div>
              </div>
              <a
                className="ym-btn ym-btn-light"
                href="https://wa.me/41798549752?text=Hello%20Susi%2C%20I%20am%20interested%20in%20the%20Dynamic%20Movement%20weekly%20online%20classes.%20Could%20you%20please%20share%20more%20details%3F"
                target="_blank"
                rel="noopener noreferrer"
              >
                I&apos;m Interested — Dynamic Movement
              </a>
            </div>

            {/* Block 2: Deeper Practice (In-Person Workshops at BODYTALKS Thalwil) */}
            <div className="ym-card ym-card-light" style={{ border: "2px solid var(--blue)" }}>
              <div>
                <span className="ym-badge ym-badge-light" style={{ backgroundColor: "var(--blue)", color: "#fff" }}>
                  📍 In-Person Workshop Series
                </span>
                <h2 className="ym-h2 ym-h2-light">Deeper Practice</h2>
                <p className="ym-sub ym-sub-light">Breathwork · Philosophy · Meditation</p>
                
                {/* Location Badge */}
                <div style={{ backgroundColor: "#F4F9FC", border: "1px solid #BCD4E3", padding: "10px 14px", borderRadius: 10, margin: "10px 0 16px", display: "flex", gap: 10, alignItems: "center", fontSize: 13, color: "var(--blue)", fontWeight: 700 }}>
                  <MapPin size={18} color="var(--blue)" />
                  <span>at BODYTALKS, Alte Landstrasse 32, Thalwil</span>
                </div>

                <p className="ym-desc ym-desc-light">A deeper exploration beyond physical movement. These in-person workshops are designed for students who want to expand their understanding of yoga through mindful practice, self-inquiry, and inner awareness.</p>
                
                {/* Upcoming Workshop Dates List */}
                <div style={{ margin: "16px 0", backgroundColor: "#fff", padding: "16px", borderRadius: 12, border: "1px solid #E2DDD3" }}>
                  <strong style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--blue)", display: "block", marginBottom: 10 }}>
                    🗓️ Upcoming Workshop Dates (18:30 – 20:30)
                  </strong>
                  
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px dashed #eee", paddingBottom: 6 }}>
                      <span style={{ fontWeight: 700, color: "var(--ink-title)", fontSize: 14 }}>Thursday, September 10</span>
                      <span style={{ fontSize: 12, color: "var(--blue)", backgroundColor: "rgba(38,145,186,0.1)", padding: "2px 8px", borderRadius: 100 }}>18:30 – 20:30</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px dashed #eee", paddingBottom: 6 }}>
                      <span style={{ fontWeight: 700, color: "var(--ink-title)", fontSize: 14 }}>Thursday, October 29</span>
                      <span style={{ fontSize: 12, color: "var(--blue)", backgroundColor: "rgba(38,145,186,0.1)", padding: "2px 8px", borderRadius: 100 }}>18:30 – 20:30</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontWeight: 700, color: "var(--ink-title)", fontSize: 14 }}>Thursday, December 3</span>
                      <span style={{ fontSize: 12, color: "var(--blue)", backgroundColor: "rgba(38,145,186,0.1)", padding: "2px 8px", borderRadius: 100 }}>18:30 – 20:30</span>
                    </div>
                  </div>
                </div>

                <div className="ym-inforow">
                  <div className="ym-infobox ym-infobox-light">
                    <div className="ym-infobox-label ym-infobox-label-light">💰 Price</div>
                    <div className="ym-infobox-val ym-infobox-val-light"><strong>CHF 60.–</strong> per workshop</div>
                  </div>
                  <div className="ym-infobox ym-infobox-light">
                    <div className="ym-infobox-label ym-infobox-label-light">📍 Location</div>
                    <div className="ym-infobox-val ym-infobox-val-light">BODYTALKS Thalwil</div>
                  </div>
                </div>
              </div>
              <a
                className="ym-btn ym-btn-light"
                href="https://wa.me/41798549752?text=Hello%20Susi%2C%20I%20would%20like%20to%20register%20for%20the%20Deeper%20Practice%20workshop%20at%20BODYTALKS%20Thalwil.%20Could%20you%20please%20confirm%20availability%3F"
                target="_blank"
                rel="noopener noreferrer"
              >
                Register for Deeper Practice Workshop
              </a>
            </div>

          </div>{/* end row */}

          {/* Block 3: Private Teacher Development */}
          <div className="ym-card ym-card-dark" style={{ marginTop: 30 }}>
            <div>
              <span className="ym-badge ym-badge-dark">🎓 For Yoga Teachers</span>
              <h2 className="ym-h2 ym-h2-dark">Private Further Development</h2>
              <p className="ym-sub ym-sub-dark">The Art of Teaching Yoga</p>
              <p className="ym-desc ym-desc-dark">Advanced private mentoring for yoga teachers who wish to refine their teaching skills, deepen confidence, and expand their understanding of movement, sequencing, presence, and student guidance.</p>
              <p className="ym-arrange">Available as private sessions · at BODYTALKS Thalwil or by arrangement</p>
            </div>
            <div>
              <a
                className="ym-btn ym-btn-dark"
                href="https://wa.me/41798549752?text=Hello%20Susi%2C%20I%20am%20interested%20in%20Private%20Further%20Development%20for%20Teachers%20%E2%80%94%20The%20Art%20of%20Teaching%20Yoga.%20Could%20you%20please%20share%20more%20details%3F"
                target="_blank"
                rel="noopener noreferrer"
              >
                Enquire About Private Mentoring
              </a>
            </div>
          </div>
        </div>
      </div>

      <SiteFooter />
    </main>
  );
}
