"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const galleryImages = [
  { id: 1, src: "/images/retreat/susidavies_retreat1.jpg", cat: "location" },
  { id: 2, src: "/images/retreat/susidavies_retreat20.jpg", cat: "accommodation" },
  { id: 3, src: "/images/retreat/susidavies_retreat21.jpg", cat: "accommodation" },
  { id: 4, src: "/images/retreat/susidavies_retreat22.jpg", cat: "accommodation" },
  { id: 5, src: "/images/retreat/susidavies_retreat23.jpg", cat: "accommodation" },
  { id: 6, src: "/images/retreat/susidavies_retreat24.jpg", cat: "accommodation" },
  { id: 7, src: "/images/retreat/susidavies_retreat8.jpg", cat: "yoga" },
  { id: 8, src: "/images/retreat/susidavies_retreat33.jpg", cat: "yoga" },
  { id: 9, src: "/images/retreat/susidavies_retreat34.jpg", cat: "accommodation" },
  { id: 10, src: "/images/retreat/susidavies_retreat35.jpg", cat: "accommodation" },
  { id: 11, src: "/images/retreat/susidavies_retreat36.jpg", cat: "yoga" },
  { id: 12, src: "/images/retreat/susidavies_retreat18.jpg", cat: "location" },
  { id: 13, src: "/images/retreat/susidavies_retreat37.jpg", cat: "location" },
  { id: 14, src: "/images/retreat/susidavies_retreat38.jpg", cat: "location" },
  { id: 15, src: "/images/retreat/susidavies_retreat6.jpg", cat: "location" },
  { id: 16, src: "/images/retreat/susidavies_retreat7.jpg", cat: "location" },
];

export default function RetreatsPage() {
  const [filter, setFilter] = useState("all");

  const filteredPhotos = filter === "all" 
    ? galleryImages 
    : galleryImages.filter(img => img.cat === filter);

  return (
    <main>
      <SiteHeader />

      {/* Hero Banner */}
      <section className="page-banner">
        <div>
          <h1>Yoga, Wellness &amp; Meditation Retreat – Peloponnese, Greece</h1>
        </div>
        <span className="page-banner-arrow">⌄</span>
      </section>

      <div className="container">
        {/* Intro Info */}
        <section style={{ textAlign: "center", marginBottom: 60 }}>
          <span className="eyebrow" style={{ color: "var(--blue)", fontSize: 14 }}>
            11–17 October 2026 · Greece
          </span>
          <h2 className="section-heading" style={{ margin: "12px 0 24px" }}>
            Yoga, Wellness &amp; Meditation Retreat in Greece
          </h2>
          <p className="body-text" style={{ maxWidth: 760, margin: "0 auto 30px" }}>
            Set at Sampatiki Suites in Leonidio, this restorative retreat is a space to slow down, reconnect, and rediscover your essential calm through daily practice, nourishing food, and time in nature.
          </p>
          <Link href="#enquire-form" className="btn-pill btn-pill-cyan">
            REGISTER YOUR INTEREST
          </Link>
        </section>

        {/* Large Villa Aerial Photo */}
        <section style={{ marginBottom: 70 }}>
          <div className="image-card-rounded">
            <Image
              src="/images/retreat/susidavies_retreat3.jpg"
              alt="Sampatiki Suites Greece Aerial View"
              width={1100}
              height={580}
              priority
            />
          </div>
        </section>

        {/* Detail Section 1: Text Left, Image Right */}
        <section className="grid-2col-alt">
          <div className="col-media">
            <div className="image-card-rounded">
              <Image
                src="/images/retreat/susidavies_retreat4.jpg"
                alt="Sunset Villa View"
                width={500}
                height={400}
                style={{ width: "100%", height: "auto", objectFit: "contain" }}
              />
            </div>
          </div>
          <div className="col-content">
            <span className="eyebrow">A sanctuary by the sea</span>
            <h2 className="section-heading">Yoga, Wellness &amp; Meditation Retreat in Greece</h2>
            <p className="body-text">
              Immerse yourself in 7 days of revitalising yoga, mindful breathwork, and deep relaxation set against the breathtaking backdrop of the Peloponnese coastline.
            </p>
            <p className="body-text">
              Each day includes morning dynamic movement, afternoon restorative practice, guided meditation, and fresh Mediterranean cuisine.
            </p>
          </div>
        </section>

        {/* Side-by-side Pools */}
        <section className="grid-2col" style={{ marginBottom: 70 }}>
          <div className="image-card-rounded">
            <Image
              src="/images/retreat/susidavies_retreat6.jpg"
              alt="Illuminated Pool at Night"
              width={500}
              height={340}
              style={{ width: "100%", height: "auto", objectFit: "contain" }}
            />
          </div>
          <div className="image-card-rounded">
            <Image
              src="/images/retreat/susidavies_retreat7.jpg"
              alt="Ocean View Infinity Pool"
              width={500}
              height={340}
              style={{ width: "100%", height: "auto", objectFit: "contain" }}
            />
          </div>
        </section>

        {/* Indoor Yoga Studio: Image Left, Text Right */}
        <section className="grid-2col">
          <div className="col-media">
            <div className="image-card-rounded">
              <Image
                src="/images/retreat/susidavies_retreat8.jpg"
                alt="Indoor Yoga Studio Space"
                width={500}
                height={380}
                style={{ width: "100%", height: "auto", objectFit: "contain" }}
              />
            </div>
          </div>
          <div className="col-content">
            <span className="eyebrow">Luxury Accommodation</span>
            <h2 className="section-heading">ACCOMMODATION &amp; APARTMENTS</h2>
            <p className="body-text">
              Sampatiki Suites offer elegant, air-conditioned rooms with private balconies, sea views, high-speed Wi-Fi, and luxurious amenities designed for deep rest.
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="pricing-grid">
          <div className="pricing-card">
            <h3>Twin share</h3>
            <div className="price">CHF 1,810</div>
            <p>Per person in a shared twin suite. A non-refundable CHF 350 deposit secures your reservation.</p>
          </div>
          <div className="pricing-card">
            <h3>Sole occupancy</h3>
            <div className="price">CHF 2,260</div>
            <p>Private luxury suite for single occupancy. A non-refundable CHF 350 deposit secures your reservation.</p>
          </div>
        </section>

        <p className="body-text" style={{ textAlign: "center", marginBottom: 70, fontSize: 13 }}>
          Includes accommodation, all yoga sessions and props, brunches, dinners, snacks, tea and coffee. Flights, transfers, excursions and massages are not included.
        </p>

        {/* Filterable Photo Gallery */}
        <section style={{ marginBottom: 90 }}>
          <div className="gallery-filter-tabs">
            <button
              className={`gallery-tab-btn ${filter === "all" ? "active" : ""}`}
              onClick={() => setFilter("all")}
            >
              ALL
            </button>
            <button
              className={`gallery-tab-btn ${filter === "accommodation" ? "active" : ""}`}
              onClick={() => setFilter("accommodation")}
            >
              ACCOMMODATION
            </button>
            <button
              className={`gallery-tab-btn ${filter === "location" ? "active" : ""}`}
              onClick={() => setFilter("location")}
            >
              LOCATION
            </button>
            <button
              className={`gallery-tab-btn ${filter === "yoga" ? "active" : ""}`}
              onClick={() => setFilter("yoga")}
            >
              YOGA
            </button>
          </div>

          <div className="photo-gallery-grid">
            {filteredPhotos.map((photo) => (
              <div key={photo.id} className="gallery-thumb">
                <Image src={photo.src} alt={`Retreat photo ${photo.id}`} width={320} height={320} />
              </div>
            ))}
          </div>
        </section>

        {/* Enquiry Form Section (Without Map) */}
        <section id="enquire-form" className="grid-2col">
          <div className="col-media">
            <div className="image-card-rounded">
              <Image
                src="/images/retreat/susidavies_retreat10.jpg"
                alt="Greece Retreat Location"
                width={500}
                height={620}
                style={{ width: "100%", height: "auto", objectFit: "contain" }}
              />
            </div>
          </div>
          <div className="col-content">
            <div className="contact-form-card">
              <span className="eyebrow">Enquire about the retreat</span>
              <h2 className="section-heading" style={{ fontSize: 36 }}>Reserve Your Spot</h2>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                  <input type="text" className="form-input" placeholder="Your name" required />
                </div>
                <div className="form-group">
                  <input type="email" className="form-input" placeholder="Your email" required />
                </div>
                <div className="form-group">
                  <textarea className="form-textarea" rows={4} placeholder="Your message" required></textarea>
                </div>
                <button type="submit" className="btn-pill btn-pill-green" style={{ width: "100%", marginTop: 10 }}>
                  SUBMIT
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>

      <SiteFooter />
    </main>
  );
}
