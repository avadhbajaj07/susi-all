"use client";

import Image from "next/image";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function OnlineCoursesPage() {
  return (
    <main>
      <SiteHeader />

      {/* Page Hero Banner */}
      <section className="page-banner">
        <div>
          <h1>Online Courses</h1>
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
            <span className="eyebrow">Online with Susi</span>
            <h2 className="section-heading">Practice with Susi, wherever you are.</h2>
            <p className="body-text">
              Online classes and deeper workshops for committed students and teachers seeking clarity, structure, and depth in their personal practice.
            </p>
            <p className="body-text">
              Join weekly live sessions, masterclasses, and guided breathwork routines directly from your home studio.
            </p>
          </div>
        </section>

        {/* Format & Certifications Section (User Requested) */}
        <section style={{ margin: "70px 0 80px" }}>
          <p className="body-text" style={{ textAlign: "center", color: "var(--muted)", marginBottom: 40 }}>
            We offer the following pricing options and details for your convenience
          </p>

          <div className="grid-2col">
            <div className="col-media">
              <div className="image-card-rounded">
                <Image
                  src="/images/coaching4.jpg"
                  alt="Susi Davies yoga posture in red swimsuit"
                  width={500}
                  height={620}
                  style={{ width: "100%", height: "auto", objectFit: "contain" }}
                />
              </div>
            </div>

            <div className="col-content">
              <h2 className="section-heading" style={{ fontSize: 46, marginBottom: 20 }}>
                Format
              </h2>
              <ul className="bullet-list" style={{ marginBottom: 25 }}>
                <li>Online via TEAMS</li>
                <li>Structured course format</li>
                <li>Details and schedule shared before launch</li>
                <li>Officially starting August 15, 2026</li>
              </ul>
              <p className="body-text" style={{ marginBottom: 35 }}>
                For updates or registration details, please get in touch directly.
              </p>

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

                {/* E-RYT 500 Yoga Alliance Badge */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <svg width="115" height="115" viewBox="0 0 110 110" fill="none">
                    <circle cx="55" cy="55" r="50" stroke="#1A1A1A" strokeWidth="3.5"/>
                    <circle cx="55" cy="55" r="42" stroke="#1A1A1A" strokeWidth="1.5"/>
                    <path d="M 25 36 A 35 35 0 0 1 85 36" fill="none" id="arcText" />
                    <text x="55" y="30" textAnchor="middle" fill="#1A1A1A" fontSize="7" fontWeight="700" letterSpacing="0.8">REGISTERED YOGA TEACHER</text>
                    <text x="55" y="52" textAnchor="middle" fill="#1A1A1A" fontSize="13" fontWeight="900" letterSpacing="1">E-RYT</text>
                    <text x="55" y="72" textAnchor="middle" fill="#1A1A1A" fontSize="20" fontWeight="900">500</text>
                    <text x="55" y="88" textAnchor="middle" fill="#1A1A1A" fontSize="9" fontStyle="italic" fontWeight="600">yoga alliance</text>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Custom Yoga Blocks Section */}
        <div className="ym-wrap">
          {/* Row: Block 1 + Block 2 side by side */}
          <div className="ym-row">

            {/* Block 1: Dynamic Movement */}
            <div className="ym-card ym-card-light">
              <div>
                <span className="ym-badge ym-badge-light">🌿 Weekly Online Classes</span>
                <h2 className="ym-h2 ym-h2-light">Dynamic Movement</h2>
                <p className="ym-sub ym-sub-light">A living, breathing practice</p>
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
                <div className="ym-note">
                  <strong>Payment before class:</strong> Swiss customers can pay via TWINT. Payment must be completed before class begins to receive the online class link.
                </div>
              </div>
              <a
                className="ym-btn ym-btn-light"
                href="https://wa.me/41798549752?text=Hello%20Susi%2C%20I%20am%20interested%20in%20the%20Dynamic%20Movement%20weekly%20online%20classes.%20Could%20you%20please%20share%20more%20details%3F"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.554 4.12 1.526 5.849L.057 23.5l5.805-1.524A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.831 9.831 0 01-5.012-1.37l-.36-.214-3.444.904.919-3.354-.235-.375A9.825 9.825 0 012.18 12C2.18 6.57 6.57 2.18 12 2.18c5.43 0 9.82 4.39 9.82 9.82 0 5.43-4.39 9.818-9.82 9.818z"/>
                </svg>
                I&apos;m Interested — Dynamic Movement
              </a>
            </div>

            {/* Block 2: Deeper Practice */}
            <div className="ym-card ym-card-light">
              <div>
                <span className="ym-badge ym-badge-light">🌸 Workshops &amp; Events</span>
                <h2 className="ym-h2 ym-h2-light">Deeper Practice</h2>
                <p className="ym-sub ym-sub-light">Breathwork · Philosophy · Meditation</p>
                <p className="ym-desc ym-desc-light">A deeper exploration beyond physical movement. These workshops are designed for students who want to expand their understanding of yoga through mindful practice, self-inquiry, and inner awareness.</p>
                <ul className="ym-tags ym-tags-light">
                  <li>Breathwork</li>
                  <li>Meditation</li>
                  <li>Yoga Philosophy</li>
                  <li>Alignment Awareness</li>
                  <li>Conscious Movement</li>
                  <li>Nervous System Regulation</li>
                  <li>Reflective Practices</li>
                </ul>
                <div className="ym-datebox">
                  <div className="ym-datebox-icon">🗓️</div>
                  <div>
                    <div className="ym-datebox-d">Thursday, September 10</div>
                    <div className="ym-datebox-t">18:30 – 20:30 &nbsp;·&nbsp; 2 hours</div>
                  </div>
                </div>
                <div className="ym-inforow">
                  <div className="ym-infobox ym-infobox-light">
                    <div className="ym-infobox-label ym-infobox-label-light">💰 Price</div>
                    <div className="ym-infobox-val ym-infobox-val-light"><strong>CHF 60.–</strong> per workshop</div>
                  </div>
                  <div className="ym-infobox ym-infobox-light">
                    <div className="ym-infobox-label ym-infobox-label-light">📅 More Dates</div>
                    <div className="ym-infobox-val ym-infobox-val-light">Announced soon</div>
                  </div>
                </div>
                <div className="ym-note">
                  <strong>More workshops coming:</strong> Additional dates will be announced soon. Reach out to be added to the waitlist.
                </div>
              </div>
              <a
                className="ym-btn ym-btn-light"
                href="https://wa.me/41798549752?text=Hello%20Susi%2C%20I%20am%20interested%20in%20the%20Deeper%20Practice%20workshop.%20Could%20you%20please%20share%20more%20details%3F"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.554 4.12 1.526 5.849L.057 23.5l5.805-1.524A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.831 9.831 0 01-5.012-1.37l-.36-.214-3.444.904.919-3.354-.235-.375A9.825 9.825 0 012.18 12C2.18 6.57 6.57 2.18 12 2.18c5.43 0 9.82 4.39 9.82 9.82 0 5.43-4.39 9.818-9.82 9.818z"/>
                </svg>
                I&apos;m Interested — Deeper Practice
              </a>
            </div>

          </div>{/* end row */}

          {/* Block 3: Private Teacher Development — Full width */}
          <div className="ym-card ym-card-dark">
            <div>
              <span className="ym-badge ym-badge-dark">🎓 For Yoga Teachers</span>
              <h2 className="ym-h2 ym-h2-dark">Private Further Development</h2>
              <p className="ym-sub ym-sub-dark">The Art of Teaching Yoga</p>
              <p className="ym-desc ym-desc-dark">Advanced private mentoring for yoga teachers who wish to refine their teaching skills, deepen confidence, and expand their understanding of movement, sequencing, presence, and student guidance.</p>
              <ul className="ym-tags ym-tags-dark">
                <li>Sequencing Mastery</li>
                <li>Presence &amp; Authority</li>
                <li>Movement Understanding</li>
                <li>Student Guidance</li>
                <li>Refined Teaching Skills</li>
                <li>Deep Confidence</li>
              </ul>
              <p className="ym-arrange">Available as private sessions · by arrangement</p>
            </div>
            <div>
              <a
                className="ym-btn ym-btn-dark"
                href="https://wa.me/41798549752?text=Hello%20Susi%2C%20I%20am%20interested%20in%20Private%20Further%20Development%20for%20Teachers%20%E2%80%94%20The%20Art%20of%20Teaching%20Yoga.%20Could%20you%20please%20share%20more%20details%3F"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.554 4.12 1.526 5.849L.057 23.5l5.805-1.524A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.831 9.831 0 01-5.012-1.37l-.36-.214-3.444.904.919-3.354-.235-.375A9.825 9.825 0 012.18 12C2.18 6.57 6.57 2.18 12 2.18c5.43 0 9.82 4.39 9.82 9.82 0 5.43-4.39 9.818-9.82 9.818z"/>
                </svg>
                Enquire About Private Sessions
              </a>
            </div>
          </div>
        </div>
      </div>

      <SiteFooter />
    </main>
  );
}
