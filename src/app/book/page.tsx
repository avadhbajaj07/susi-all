import { CalendarDays } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function Book() { return <main className="booking-page"><SiteHeader /><PageHero eyebrow="Private coaching with Susi" title="Make space for your next step." intro="Book a one-to-one session for tailored guidance, movement therapy, mentoring, or a deeper practice." image="/images/susi davies5.jpg" /><section className="content-section"><p className="eyebrow">Online booking</p><h2>Availability will be set by Susi.</h2><p>Live booking slots are intentionally not shown until Susi connects her calendar and confirms her availability. Until then, please send your preferred days and times through the contact form.</p><div className="booking-note"><CalendarDays size={17} style={{ verticalAlign: "middle", marginRight: 7 }} />The finished booking flow will show only real availability, adapt to the visitor&apos;s timezone, and send confirmation and reminder emails.</div></section><SiteFooter /></main>; }
