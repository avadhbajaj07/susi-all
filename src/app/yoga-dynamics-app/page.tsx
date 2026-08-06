"use client";

import Image from "next/image";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function YogaDynamicsAppPage() {
  return (
    <main>
      <SiteHeader />

      {/* Hero Banner */}
      <section className="page-banner">
        <div>
          <h1>Yoga Dynamics App</h1>
        </div>
        <span className="page-banner-arrow">⌄</span>
      </section>

      <div className="container">
        {/* Section 1: Intro & 4 Features + Mockups */}
        <section className="grid-2col">
          <div className="col-content">
            <h2 className="section-heading">Your Pocket Guide to Wellness</h2>
            <p className="body-text" style={{ marginBottom: 32 }}>
              Welcome to the Yoga Dynamic App, your ultimate companion for wellness, balance, and personal growth. Whether you&apos;re a seasoned yogi or just starting your journey, our app offers a comprehensive platform to support your physical, mental, and emotional well-being. Created by Susi Davies, a certified life coach and yoga instructor, the Yoga Dynamic App combines her years of expertise with cutting-edge technology to provide you with an immersive and transformative experience.
            </p>

            <div style={{ borderTop: "1px solid var(--border)", paddingTop: 24, marginBottom: 24 }}>
              <h3 style={{ fontSize: 22, marginBottom: 10, color: "var(--blue)" }}>Yoga Classes</h3>
              <p className="body-text">
                <strong>Dynamic Classes:</strong> Explore dynamic and powerful yoga classes that improve strength, stamina, and flexibility. Each class is a fusion of Iyengar and Vinyasa yoga, emphasizing movement from the core without compromising joint or spine integrity.
              </p>
              <p className="body-text">
                <strong>Alignment Techniques:</strong> Learn important alignment techniques based on Iyengar yoga, combined with graceful and powerful Vinyasa flow.
              </p>
            </div>

            <div style={{ borderTop: "1px solid var(--border)", paddingTop: 24, marginBottom: 24 }}>
              <h3 style={{ fontSize: 22, marginBottom: 10, color: "var(--blue)" }}>Meditation &amp; Mindfulness</h3>
              <p className="body-text">
                <strong>Guided Meditations:</strong> Immerse yourself in guided meditations designed to calm your mind, reduce stress, and enhance your overall well-being.
              </p>
              <p className="body-text">
                <strong>Breathing Techniques:</strong> Discover a variety of breathing exercises that enhance vitality and keep your nervous system balanced.
              </p>
              <p className="body-text">
                <strong>Mindfulness Practices:</strong> Cultivate mindfulness through a range of practices designed to increase present-moment awareness and reduce mental chatter.
              </p>
            </div>

            <div style={{ borderTop: "1px solid var(--border)", paddingTop: 24, marginBottom: 24 }}>
              <h3 style={{ fontSize: 22, marginBottom: 10, color: "var(--blue)" }}>Yoga Philosophy</h3>
              <p className="body-text">
                <strong>Philosophical insights:</strong> Gain deeper insights into yoga philosophy, including its principles and teachings, and how they can be applied to daily life.
              </p>
              <p className="body-text">
                <strong>Daily Inspirations:</strong> Start your day with inspirational quotes and messages that resonate with the yogic philosophy of balance and harmony.
              </p>
            </div>

            <div style={{ borderTop: "1px solid var(--border)", paddingTop: 24 }}>
              <h3 style={{ fontSize: 22, marginBottom: 10, color: "var(--blue)" }}>Community &amp; Support</h3>
              <p className="body-text">
                <strong>Community Connection:</strong> Connect with like-minded individuals, share your experiences, and build a supportive community.
              </p>
              <p className="body-text">
                <strong>Expert Guidance:</strong> Access expert guidance from Susi Davies and other experienced instructors, providing you with valuable insights and support on your yoga and wellness journey.
              </p>
            </div>
          </div>

          <div className="col-media">
            <div className="phone-mockups-wrapper" style={{ position: "sticky", top: 110 }}>
              <Image
                src="/images/imgi_7_mobile.png"
                alt="Susi Davies App Screen Mockups"
                width={480}
                height={580}
                priority
              />
            </div>
          </div>
        </section>

        {/* Section 2 (Alternating): Buddha Statue Image Left, Contact Form Right */}
        <section className="grid-2col" style={{ marginTop: 90 }}>
          <div className="col-media">
            <div className="image-card-rounded">
              <Image
                src="/images/susi davies4.jpg"
                alt="Buddha Statue on Bamboo Mat"
                width={500}
                height={620}
                style={{ width: "100%", height: "auto", objectFit: "contain" }}
              />
            </div>
          </div>
          <div className="col-content">
            <div className="contact-form-card">
              <span className="eyebrow">Get in touch</span>
              <h2 className="section-heading" style={{ fontSize: 32 }}>Have Questions About The App?</h2>
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
