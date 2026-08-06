# Susi Davies — Project Progress

## Goal

Rebuild `susidavies.com` as a premium, image-led Next.js site and provide a simple, separate management space at `admin.susidavies.com`. The admin will eventually centralize content, client relationships, bookings, invoices, email automation, and Blotato social publishing.

## Principles agreed with Susi's team

- Use only Susi-supplied assets and current approved service content. No dummy clients, posts, invoices, campaigns, or fake analytics.
- Preserve the existing visual language: Crimson Pro editorial headings, clean sans-serif copy, warm light backgrounds, charcoal, and the existing green/blue accents. Improve it with restrained 3D depth and motion.
- Public visual reference is the supplied 6 August 2026 screenshot set: `#FAF8F8` page background, `#2691BA` header/footer/headings/buttons, the seagull homepage hero, compact editorial spacing, rounded image cards, and blue call-to-action pills.
- Public site and admin use the same design system, but the admin is designed for speed and clarity.
- Admin is planned for a separate host: `admin.susidavies.com`.
- Passwordless Google sign-in is deliberately deferred until Susi approves the website and admin experience.

## Current stage

**Foundation in progress** — 6 August 2026

- [x] Reviewed the live public site and documented its active core pages.
- [x] Audited supplied images and logo in `images/`; copied them into the Next.js public asset location.
- [x] Started the Next.js project and subdomain-routing structure.
- [x] Finished the public homepage and service page templates.
- [x] Finished the empty/live-ready admin interface.
- [x] Added the zero-data Supabase schema and row-level-security foundation for every planned module.
- [ ] Add the Supabase project connection and real data actions after credentials are provided.
- [ ] Add Blotato, Resend, Google Calendar, and authentication after their credentials/connections are provided.

## Existing site content to retain

Home; Yoga, Wellness & Meditation Retreat in Greece; Coaching & Mentoring; Private Sessions; Yoga Dynamics App; Online Courses; Contact.

## Planned modules

| Module | First release behavior |
| --- | --- |
| Website | Marketing pages, responsive image-led design, blog, SEO, and forms. Background music is deferred. |
| CMS/blog | Draft, review, featured image, SEO/LinkedIn card, scheduled publish |
| CRM | One client record per form submitter, tags, notes, source and activity history |
| Email | Consent-aware signup, welcome/thank-you messages, templates, segments, scheduled campaigns, unsubscribe and delivery analytics |
| Bookings | Services, availability, timezone-safe slots, confirmation/reminder/cancellation workflow and calendar sync |
| Invoices | Branded invoice builder, client/line items, tax/currency, PDF, sent/paid status and history |
| Social | Blotato-connected composer with media, channel selection, scheduling and delivery status |

## Credentials / decisions still required

- Supabase project URL and keys
- Resend account and verified sender domain
- Blotato API key and the social channels Susi wishes to connect
- Google Calendar account for availability and later Google sign-in approval
- Vercel project / DNS access for `susidavies.com` and `admin.susidavies.com`
- Background music is deferred; no audio asset is needed for the current build.
- Invoice legal details: business name/address, VAT status/number, default currency and payment instructions

## Resume here

Run `npm install`, then continue the public-site implementation. Update this file whenever a module is completed, a decision changes, or credentials are added.
