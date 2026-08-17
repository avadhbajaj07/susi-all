import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <Link href="/" aria-label="Susi Davies home" className="footer-logo-wrap">
        <img
          src="/images/susi-davies-logo-white-official.png"
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
      <div className="footer-copyright" style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "center" }}>
        <span style={{ color: "#FFFFFF" }}>SUSI DAVIES &copy; {new Date().getFullYear()}. All Rights Reserved.</span>
        <span style={{ fontSize: 13, color: "#FFFFFF", marginTop: 4 }}>
          🎨 Created by{" "}
          <a
            href="https://avadhbajaj.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#FFFFFF", textDecoration: "underline", fontWeight: 700 }}
          >
            Avadh Bajaj
          </a>
        </span>
      </div>
    </footer>
  );
}
