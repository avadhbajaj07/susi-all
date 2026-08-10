"use client";

import Link from "next/link";
import { ArrowRight, Calendar, Heart, Globe } from "lucide-react";

export function HomeHero() {
  return (
    <section className="susi-hero-wrapper">
      {/* Main Hero Stage */}
      <div className="susi-hero-stage">
        {/* Responsive Background Image (Desktop & Mobile) */}
        <picture className="susi-hero-bg-container">
          <source media="(max-width: 768px)" srcSet="/images/hero-mobile.png" />
          <img
            src="/images/hero-bg.png"
            alt="Susi Davies yoga posture & movement therapy"
            className="susi-hero-bg-img"
          />
        </picture>
        
        {/* Soft lighting overlay gradient */}
        <div className="susi-hero-overlay" />

        <div className="susi-hero-inner">
          {/* Left Column: Headline, Roles & CTA */}
          <div className="susi-hero-content">
            <p className="susi-hero-eyebrow">
              30+ YEARS OF EXPERIENCE · WORLDWIDE IMPACT
            </p>

            {/* Lotus Line Flourish */}
            <div className="susi-hero-flourish">
              <span className="susi-flourish-line" />
              <svg width="26" height="20" viewBox="0 0 32 24" fill="none" className="susi-lotus-icon">
                <path d="M16 2C16 2 12.5 8 12.5 13C12.5 16.5 14 19 16 21C18 19 19.5 16.5 19.5 13C19.5 8 16 2 16 2Z" stroke="#1f78b4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 21C13 21 8 19 6 14C4.5 10 6 6 6 6C6 6 9.5 10 12.5 13C14.5 15 15.5 18 16 21Z" stroke="#1f78b4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 21C19 21 24 19 26 14C27.5 10 26 6 26 6C26 6 22.5 10 19.5 13C17.5 15 16.5 18 16 21Z" stroke="#1f78b4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="susi-flourish-line" />
            </div>

            <h1 className="susi-hero-heading">
              A Complete Path to <br />
              <span className="susi-hero-heading-italic">Transformation</span>
            </h1>

            <p className="susi-hero-roles">
              <span>Remedial Therapist</span> · <span>Yoga Teacher</span> ·{" "}
              <span>Breathwork Specialist</span> ·{" "}
              <span>Movement Therapist</span> · <span>Mentor &amp; Life Coach</span>
            </p>

            <Link href="/book" className="susi-hero-btn">
              <span>Start your journey with Susi Davies</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>

      {/* Inspirational Quote Section */}
      <div className="susi-quote-section">
        <div className="susi-quote-container">
          <p className="susi-quote-lead">
            Yoga is not about touching your toes, <br />
            it&rsquo;s about what you learn on the way down.
          </p>
          <div className="susi-quote-line" />
          <p className="susi-quote-sub">
            Let&rsquo;s begin your journey of healing, growth and inner transformation.
          </p>

          <Link href="/book" className="susi-quote-btn">
            <Calendar size={18} />
            <span>Start your journey with Susi Davies</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
