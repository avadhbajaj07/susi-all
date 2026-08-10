"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/retreats", label: "Retreats" },
  { href: "/coaching-mentoring", label: "Coaching & Mentoring" },
  { href: "/private-sessions", label: "Private Sessions" },
  { href: "/yoga-dynamics-app", label: "Yoga Dynamics App" },
  { href: "/online-courses", label: "Online Courses" },
  { href: "/blog", label: "Blog" },
  { href: "/contact-us", label: "Contact Us" },
];

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const close = () => setIsOpen(false);

  return (
    <header className="site-header">
      <Link href="/" className="brand-logo-wrap" aria-label="Susi Davies home" onClick={close}>
        <img
          src="/images/susi-davies-logo-white-official.png"
          alt="Susi Davies Logo"
          className="header-logo-img"
        />
      </Link>

      {/* Desktop Navigation Links */}
      <nav className="desktop-nav" aria-label="Main navigation">
        {navLinks.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={isActive ? "active" : ""}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Mobile Hamburger Toggle Button (Hidden on Desktop) */}
      <div className="mobile-toggle-wrapper">
        <button
          className="menu-button"
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Overlay Menu */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            top: 85,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "var(--blue)",
            zIndex: 999,
            display: "flex",
            flexDirection: "column",
            padding: "40px 30px",
            gap: 20,
            overflowY: "auto",
          }}
        >
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={close}
              style={{
                color: "#ffffff",
                fontSize: 20,
                fontWeight: 600,
                fontFamily: "var(--sans)",
                borderBottom: "1px solid rgba(255,255,255,0.15)",
                paddingBottom: 14,
              }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/book"
            onClick={close}
            className="btn-pill btn-pill-cyan"
            style={{ marginTop: 20, textAlign: "center" }}
          >
            BOOK A PRIVATE SESSION
          </Link>
        </div>
      )}
    </header>
  );
}
