import type { Metadata } from "next";
import "./globals.css";
import "./contact.css";
import "./reference-pages.css";

export const metadata: Metadata = {
  title: { default: "Susi Davies | Movement, breath & transformation", template: "%s | Susi Davies" },
  description: "Remedial therapist, yoga teacher, breathwork specialist, movement therapist, mentor and life coach.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><head><link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" /><link href="https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Open+Sans:wght@400;500;600&display=swap" rel="stylesheet" /></head><body>{children}</body></html>;
}
