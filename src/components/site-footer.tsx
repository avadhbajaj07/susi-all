import Link from "next/link";
import { Facebook, Twitter, Youtube, Instagram, Linkedin } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <Link href="/" aria-label="Susi Davies home" className="footer-logo-wrap">
        <img
          src="/images/susi-davies-logo-white.png"
          alt="Susi Davies Logo"
          className="footer-logo-img"
        />
      </Link>
      <nav className="footer-nav" aria-label="Footer navigation">
        <Link href="/">Home</Link>
        <Link href="/private-sessions">Private Sessions</Link>
        <Link href="/blog">Blog &amp; Journal</Link>
        <Link href="/contact-us">Contact Us</Link>
      </nav>
      <div className="footer-socials">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <Facebook size={16} />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
          <Twitter size={16} />
        </a>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
          <Youtube size={16} />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <Instagram size={16} />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <Linkedin size={16} />
        </a>
      </div>
      <div className="footer-copyright">
        SUSI DAVIES © {new Date().getFullYear()}. All Rights Reserved.
      </div>
    </footer>
  );
}
