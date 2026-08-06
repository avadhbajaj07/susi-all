-- Susi Davies core data model. This migration intentionally contains no seed/demo data.
create extension if not exists pgcrypto;

create type public.contact_source as enum ('contact_form', 'newsletter', 'booking', 'manual', 'import');
create type public.content_status as enum ('draft', 'scheduled', 'published');
create type public.booking_status as enum ('requested', 'confirmed', 'cancelled', 'completed');
create type public.invoice_status as enum ('draft', 'sent', 'paid', 'void', 'overdue');
create type public.delivery_status as enum ('draft', 'scheduled', 'sent', 'failed');

create table public.contacts (
  id uuid primary key default gen_random_uuid(), full_name text not null, email text not null unique,
  phone text, source public.contact_source not null default 'manual', tags text[] not null default '{}',
  consent_marketing boolean not null default false, consent_at timestamptz, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.contact_notes (id uuid primary key default gen_random_uuid(), contact_id uuid not null references public.contacts(id) on delete cascade, body text not null, created_at timestamptz not null default now());
create table public.form_submissions (id uuid primary key default gen_random_uuid(), contact_id uuid references public.contacts(id) on delete set null, form_name text not null, message text, metadata jsonb not null default '{}', created_at timestamptz not null default now());

create table public.posts (
  id uuid primary key default gen_random_uuid(), title text not null, slug text not null unique, excerpt text, content jsonb not null default '{}', featured_image_path text,
  seo_title text, seo_description text, status public.content_status not null default 'draft', scheduled_for timestamptz, published_at timestamptz, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.services (id uuid primary key default gen_random_uuid(), name text not null, description text, duration_minutes integer, price numeric(12,2), currency text not null default 'CHF', active boolean not null default true, created_at timestamptz not null default now());
create table public.booking_requests (id uuid primary key default gen_random_uuid(), contact_id uuid not null references public.contacts(id), service_id uuid references public.services(id), starts_at timestamptz not null, ends_at timestamptz not null, timezone text not null, notes text, status public.booking_status not null default 'requested', calendar_event_id text, created_at timestamptz not null default now());

create table public.invoices (id uuid primary key default gen_random_uuid(), contact_id uuid not null references public.contacts(id), invoice_number text not null unique, issue_date date not null, due_date date, currency text not null default 'CHF', status public.invoice_status not null default 'draft', notes text, pdf_path text, subtotal numeric(12,2) not null default 0, tax_total numeric(12,2) not null default 0, total numeric(12,2) not null default 0, created_at timestamptz not null default now());
create table public.invoice_items (id uuid primary key default gen_random_uuid(), invoice_id uuid not null references public.invoices(id) on delete cascade, description text not null, quantity numeric(10,2) not null default 1, unit_price numeric(12,2) not null, tax_rate numeric(5,2) not null default 0, position integer not null default 0);

create table public.newsletter_subscribers (id uuid primary key default gen_random_uuid(), contact_id uuid not null unique references public.contacts(id) on delete cascade, status text not null check(status in ('pending','subscribed','unsubscribed')), confirmed_at timestamptz, unsubscribed_at timestamptz, created_at timestamptz not null default now());
create table public.email_templates (id uuid primary key default gen_random_uuid(), name text not null unique, subject text not null, body jsonb not null default '{}', created_at timestamptz not null default now());
create table public.email_campaigns (id uuid primary key default gen_random_uuid(), name text not null, template_id uuid references public.email_templates(id), segment jsonb not null default '{}', status public.delivery_status not null default 'draft', scheduled_for timestamptz, sent_at timestamptz, created_at timestamptz not null default now());
create table public.automation_enrollments (id uuid primary key default gen_random_uuid(), contact_id uuid not null references public.contacts(id) on delete cascade, automation_key text not null, status text not null default 'active', next_step_at timestamptz, created_at timestamptz not null default now());

create table public.social_posts (id uuid primary key default gen_random_uuid(), post_id uuid references public.posts(id) on delete set null, body text not null, media_paths text[] not null default '{}', channels text[] not null default '{}', status public.delivery_status not null default 'draft', scheduled_for timestamptz, blotato_response jsonb, created_at timestamptz not null default now());

alter table public.contacts enable row level security; alter table public.contact_notes enable row level security; alter table public.form_submissions enable row level security; alter table public.posts enable row level security; alter table public.services enable row level security; alter table public.booking_requests enable row level security; alter table public.invoices enable row level security; alter table public.invoice_items enable row level security; alter table public.newsletter_subscribers enable row level security; alter table public.email_templates enable row level security; alter table public.email_campaigns enable row level security; alter table public.automation_enrollments enable row level security; alter table public.social_posts enable row level security;
-- Public reads are limited to published content and active services. Admin policies are added when Google sign-in is approved.
create policy "published posts are public" on public.posts for select using (status = 'published');
create policy "active services are public" on public.services for select using (active = true);
