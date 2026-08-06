"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { site } from "@/lib/site";

const mobileLinks = [{ href: "/", label: "Home" }, ...site.nav, { href: "/contact-us", label: "Contact Us" }];

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);
  return <header className="site-header">
    <Link href="/" className="brand" aria-label="Susi Davies home" onClick={close}>
      <Image src="/images/logo.jpg" alt="Susi Davies" width={150} height={43} priority />
    </Link>
    <nav className="desktop-nav" aria-label="Main navigation">
      {mobileLinks.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
    </nav>
    <div className="header-actions"><button className="menu-button" aria-label={isOpen ? "Close navigation" : "Open navigation"} aria-expanded={isOpen} onClick={() => setIsOpen((open) => !open)}>{isOpen ? <X size={25} /> : <Menu size={26} />}</button></div>
    <nav className={`mobile-menu ${isOpen ? "mobile-menu-open" : ""}`} aria-label="Mobile navigation" aria-hidden={!isOpen}>
      <p className="mobile-menu-label">Susi Davies</p>
      {mobileLinks.map((item, index) => <Link key={item.href} href={item.href} onClick={close}><span>0{index + 1}</span>{item.label}</Link>)}
      <Link href="/book" onClick={close} className="mobile-book">Book a private session</Link>
    </nav>
  </header>;
}
