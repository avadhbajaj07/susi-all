"use client";

import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { TestimonialSlider } from "@/components/testimonial-slider";
import { MessageCircle } from "lucide-react";

export default function Home() {
  const serviceCards = [
    {
      title: "Personalised 1:1 Transformation",
      text: "Deep, tailored sessions designed specifically for your body, your goals, and your life situation.",
      href: "/private-sessions",
    },
    {
      title: "Mentoring & Coaching",
      text: "Ready to learn directly from Susi's decades of experience?",
      href: "/coaching-mentoring",
    },
    {
      title: "Retreats",
      text: "Reset your body. Reconnect your mind. Step away from daily life.",
      href: "/retreats",
    },
    {
      title: "Online Programs / App",
      text: "Yoga, breathwork, meditation and guidance—anywhere, anytime.",
      href: "/yoga-dynamics-app",
    },
  ];

  return (
    <main>
      <SiteHeader />

      {/* Floating WhatsApp Button */}
      <div className="whatsapp-widget">
        <a
          href="https://wa.me/41798549752"
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-btn"
          aria-label="Contact on WhatsApp"
        >
          <MessageCircle size={28} />
        </a>
      </div>

      {/* Hero Section */}
      <section className="home-hero-bg">
        <div className="home-hero-content">
          <p className="eyebrow-light">30+ YEARS OF EXPERIENCE · WORLDWIDE IMPACT</p>
          <h1>A Complete Path to Transformation</h1>
          <p>Remedial Therapist · Yoga Teacher · Breathwork Specialist · Movement Therapist · Mentor & Life Coach</p>
          <Link href="/contact-us" className="btn-pill btn-pill-green">
            Start your journey with Susi Davies
          </Link>
        </div>
      </section>

      <div className="container">
        {/* Section 1: Image Left, Text Right */}
        <section className="grid-2col">
          <div className="col-media">
            <div className="image-card-rounded">
              <Image
                src="/images/susi davies15.jpg"
                alt="Susi Davies portrait"
                width={500}
                height={600}
                priority
              />
            </div>
          </div>
          <div className="col-content">
            <span className="eyebrow">Work with a multi-disciplinary expert</span>
            <h2 className="section-heading">Susi doesn&apos;t follow a single method — she chooses what works best for you.</h2>
            <ul className="bullet-list">
              <li>Remedial Therapy (injury, pain, recovery)</li>
              <li>Yoga &amp; Asana Practice</li>
              <li>Breathwork &amp; Nervous System Regulation</li>
              <li>Movement Therapy &amp; Functional Training</li>
              <li>Life Coaching &amp; Mentorship</li>
            </ul>
          </div>
        </section>

        {/* Section 2 (Alternating): Text Left, Image Right */}
        <section className="grid-2col-alt">
          <div className="col-media">
            <div className="badge-overlay-container">
              <div className="image-card-rounded">
                <Image
                  src="/images/susi davies7.jpg"
                  alt="Susi Davies yoga practice"
                  width={500}
                  height={620}
                />
              </div>
              <div className="badge-overlay-card">
                Every person is different. That&apos;s why every path should be too.
              </div>
            </div>
          </div>
          <div className="col-content">
            <span className="eyebrow">30+ years of experience</span>
            <h2 className="section-heading">A Teacher. A Therapist. A Guide.</h2>
            <p className="body-text">
              Susi Davies has spent over three decades helping people reconnect with their bodies, overcome limitations, and step into a stronger version of themselves.
            </p>
            <p className="body-text">
              From owning yoga studios in Australia and Switzerland to mentoring students worldwide, her work goes far beyond traditional yoga.
            </p>
            <Link href="/coaching-mentoring" className="btn-pill btn-pill-cyan" style={{ marginTop: 14 }}>
              LEARN MORE
            </Link>
          </div>
        </section>

        {/* Space To Reconnect - 4 Cards Grid */}
        <section className="space-reconnect">
          <h2>A Space To Reconnect</h2>
          <div className="service-cards-4grid">
            {serviceCards.map((card) => (
              <div className="service-card-item" key={card.title}>
                <div>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </div>
                <div>
                  <Link href={card.href} className="btn-pill btn-pill-cyan">
                    LEARN MORE
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Image Left, Text Right */}
        <section className="grid-2col" style={{ marginTop: 90 }}>
          <div className="col-media">
            <div className="image-card-rounded">
              <Image
                src="/images/susi davies8.jpg"
                alt="Susi Davies standing posture"
                width={500}
                height={600}
              />
            </div>
          </div>
          <div className="col-content">
            <span className="eyebrow">How I help you</span>
            <h2 className="section-heading">Come As You Are. Leave Transformed.</h2>
            <p className="body-text">
              Whether you&apos;re dealing with stress, physical pain, lack of direction, or simply want to grow—Susi meets you exactly where you are.
            </p>
            <ul className="bullet-list">
              <li>Movement</li>
              <li>Breath</li>
              <li>Strength</li>
              <li>Awareness</li>
              <li>Coaching</li>
            </ul>
          </div>
        </section>

        {/* Section 5 (Alternating): Text Left, Image Right */}
        <section className="grid-2col-alt" style={{ marginTop: 90 }}>
          <div className="col-media">
            <div className="image-card-rounded">
              <Image
                src="/images/susi davies13.jpg"
                alt="Susi Davies lying yoga pose"
                width={500}
                height={380}
              />
            </div>
          </div>
          <div className="col-content">
            <span className="eyebrow">Life coaching</span>
            <h2 className="section-heading">Transform Your Life—Not Just Your Body</h2>
            <p className="body-text">
              Through a combination of coaching, movement, and deep personal work, Susi helps you break limiting patterns, gain clarity and direction, and build strength—inside and out.
            </p>
          </div>
        </section>
      </div>

      {/* Dark App Banner Section */}
      <section className="app-banner-section">
        <div className="app-banner-inner">
          <div className="app-banner-text">
            <span className="eyebrow-light" style={{ color: "#ffffff", opacity: 0.85 }}>DYNAMIC YOGA · AVAILABLE ON IPHONE</span>
            <h2>Susi Davies. In Your Pocket.</h2>
            <p>
              The Dynamic Yoga app brings yoga lessons, live sessions, meditation, pranayama and yoga philosophy directly to you.
            </p>
            <Link href="/yoga-dynamics-app" className="btn-pill btn-pill-cyan">
              GET THE APP
            </Link>
          </div>
          <div className="phone-mockups-wrapper">
            <Image
              src="/images/imgi_7_mobile.png"
              alt="Susi Davies Dynamic Yoga App Mockup"
              width={460}
              height={460}
            />
          </div>
        </div>
      </section>

      {/* Testimonials Slider */}
      <TestimonialSlider />

      {/* Bottom CTA Form */}
      <div className="container-narrow">
        <section className="grid-2col">
          <div className="col-media">
            <div className="image-card-rounded">
              <Image
                src="/images/imgi_8_susi-davies9-894x1024.jpg"
                alt="Susi Davies seated pose"
                width={500}
                height={620}
                style={{ width: "100%", height: "auto", objectFit: "contain" }}
              />
            </div>
          </div>
          <div className="col-content">
            <div className="contact-form-card">
              <span className="eyebrow">Get in touch</span>
              <h2 className="section-heading" style={{ fontSize: 32 }}>Ready to Transform Your Life?</h2>
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
                <button type="submit" className="btn-pill btn-pill-cyan" style={{ width: "100%", marginTop: 10 }}>
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
