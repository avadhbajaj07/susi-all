"use client";

import Image from "next/image";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { site } from "@/lib/site";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
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
              <Image
                src="/images/susi davies14.jpg"
                alt="Susi Davies Contact"
                width={500}
                height={620}
                style={{ width: "100%", height: "auto", objectFit: "contain" }}
                priority
              />
            </div>
          </div>

          <div className="col-content">
            <div className="contact-form-card">
              <div>
                <span className="eyebrow">Start a conversation</span>
                <h2 className="section-heading" style={{ fontSize: 36, marginBottom: 20 }}>
                  Let&apos;s Talk
                </h2>
                <p className="body-text" style={{ marginBottom: 25 }}>
                  Tell Susi what you are looking for. Whether it is private sessions, retreat bookings, or mentoring guidance, we are here to support you.
                </p>

                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="form-group">
                    <input type="text" className="form-input" placeholder="Your name" required />
                  </div>
                  <div className="form-group">
                    <input type="email" className="form-input" placeholder="Your email" required />
                  </div>
                  <div className="form-group">
                    <textarea className="form-textarea" rows={4} placeholder="How can Susi help?" required></textarea>
                  </div>
                  <button type="submit" className="btn-pill btn-pill-cyan" style={{ width: "100%", marginTop: 10 }}>
                    SEND ENQUIRY
                  </button>
                </form>
              </div>

              <div style={{ marginTop: 30, borderTop: "1px solid var(--border)", paddingTop: 20 }}>
                <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
                  <Mail size={18} color="var(--blue)" />
                  <a href={`mailto:${site.email}`} style={{ fontSize: 15, color: "var(--ink-body)", fontWeight: 500 }}>
                    {site.email}
                  </a>
                </div>
                <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
                  <Phone size={18} color="var(--blue)" />
                  <a href={`tel:${site.phone}`} style={{ fontSize: 15, color: "var(--ink-body)", fontWeight: 500 }}>
                    {site.phone}
                  </a>
                </div>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <MapPin size={18} color="var(--blue)" />
                  <span style={{ fontSize: 15, color: "var(--muted)" }}>
                    {site.address}
                  </span>
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
