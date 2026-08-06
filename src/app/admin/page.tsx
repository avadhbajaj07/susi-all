"use client";

import { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Calendar,
  Users,
  PenSquare,
  Key,
  CheckCircle2,
  AlertCircle,
  Plus,
  Search,
  Filter,
  RefreshCw,
  Mail,
  ExternalLink,
  ShieldCheck,
  Smartphone,
  ChevronRight,
  TrendingUp,
} from "lucide-react";

// Mock Initial Studio Data
const initialBookings = [
  { id: "BK-1001", client: "Elena Rossi", email: "elena@example.ch", service: "Private Yoga Session", date: "2026-08-18", time: "10:00 AM", status: "Confirmed", payment: "TWINT Paid", amount: "CHF 150" },
  { id: "BK-1002", client: "Markus Weber", email: "m.weber@example.com", service: "Life Coaching & Mentoring", date: "2026-08-19", time: "02:00 PM", status: "Pending", payment: "Invoice Sent", amount: "CHF 180" },
  { id: "BK-1003", client: "Sophie Martin", email: "sophie.m@example.fr", service: "Greece Retreat 2026 (Twin Share)", date: "2026-10-11", time: "7 Days", status: "Confirmed", payment: "Deposit CHF 350", amount: "CHF 1,810" },
  { id: "BK-1004", client: "Anna Keller", email: "anna.k@example.ch", service: "Dynamic Movement Weekly Online", date: "2026-08-17", time: "06:30 PM", status: "Confirmed", payment: "TWINT Paid", amount: "CHF 25" },
];

const initialArticles = [
  { id: 1, title: "Movement & Neural Alignment: Moving with Intention", category: "Practice Notes", status: "Published", date: "Aug 06, 2026" },
  { id: 2, title: "Finding Calm in Motion: The Power of Breathwork", category: "Mindful Living", status: "Published", date: "Jul 28, 2026" },
  { id: 3, title: "Reflections from the Peloponnese Sanctuary", category: "Retreat Insights", status: "Draft", date: "Aug 01, 2026" },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "bookings" | "retreats" | "content" | "settings">("overview");
  const [bookings, setBookings] = useState(initialBookings);
  const [articles, setArticles] = useState(initialArticles);
  const [searchQuery, setSearchQuery] = useState("");
  const [resendKey, setResendKey] = useState("");
  const [blotatoKey, setBlotatoKey] = useState("");
  const [showAddBooking, setShowAddBooking] = useState(false);

  // New Booking State
  const [newClient, setNewClient] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newService, setNewService] = useState("Private Yoga Session");
  const [newDate, setNewDate] = useState("2026-08-20");
  const [newTime, setNewTime] = useState("10:00 AM");

  const handleAddBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClient || !newEmail) return;
    const newBk = {
      id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
      client: newClient,
      email: newEmail,
      service: newService,
      date: newDate,
      time: newTime,
      status: "Confirmed",
      payment: "Pending",
      amount: newService.includes("Coaching") ? "CHF 180" : "CHF 150",
    };
    setBookings([newBk, ...bookings]);
    setNewClient("");
    setNewEmail("");
    setShowAddBooking(false);
  };

  const filteredBookings = bookings.filter(
    (b) =>
      b.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.service.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#F7F5F0", fontFamily: "var(--sans)", color: "#1A252C" }}>
      {/* Sidebar Navigation */}
      <aside
        style={{
          width: 270,
          backgroundColor: "#1A6E8F",
          color: "#ffffff",
          display: "flex",
          flexDirection: "column",
          padding: "30px 20px",
          flexShrink: 0,
        }}
      >
        <div style={{ marginBottom: 40, borderBottom: "1px solid rgba(255,255,255,0.15)", paddingBottom: 20 }}>
          <Link href="/" style={{ textDecoration: "none", color: "#ffffff" }}>
            <h1 style={{ fontFamily: "var(--serif)", fontSize: 24, letterSpacing: "0.14em", margin: 0, fontWeight: 700 }}>
              SUSI DAVIES
            </h1>
            <span style={{ fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.8, display: "block", marginTop: 4 }}>
              Studio Admin Panel
            </span>
          </Link>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
          {[
            { id: "overview", label: "Overview", icon: LayoutDashboard },
            { id: "bookings", label: "Bookings & Clients", icon: Calendar },
            { id: "retreats", label: "Retreat Reservations", icon: Users },
            { id: "content", label: "Journal & Content", icon: PenSquare },
            { id: "settings", label: "API & Integrations", icon: Key },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "12px 16px",
                  borderRadius: 10,
                  border: "none",
                  backgroundColor: isActive ? "rgba(255,255,255,0.2)" : "transparent",
                  color: "#ffffff",
                  fontSize: 14,
                  fontWeight: isActive ? 700 : 500,
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "background-color 0.2s ease",
                }}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </nav>

        <div style={{ background: "rgba(0,0,0,0.15)", padding: "16px", borderRadius: 12, fontSize: 12, opacity: 0.9 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <ShieldCheck size={16} color="#25D366" />
            <strong style={{ color: "#ffffff" }}>Supabase Connected</strong>
          </div>
          <p style={{ margin: 0, fontSize: 11, opacity: 0.8 }}>
            DB: postgresql://postgres:***@db.bszyzttyashekzqmehxg.supabase.co
          </p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: "40px 45px", overflowY: "auto" }}>
        {/* Top Header */}
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 35 }}>
          <div>
            <span style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.18em", color: "#6B7A70", fontWeight: 700 }}>
              Susi Davies Studio Dashboard
            </span>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: 36, color: "#2691BA", margin: "4px 0 0" }}>
              {activeTab === "overview" && "Studio Overview"}
              {activeTab === "bookings" && "Bookings & Clients Management"}
              {activeTab === "retreats" && "Greece Retreat 2026 Reservations"}
              {activeTab === "content" && "Journal & Articles Manager"}
              {activeTab === "settings" && "API Keys & Integrations Hub"}
            </h2>
          </div>

          <div style={{ display: "flex", gap: 12 }}>
            <Link
              href="/"
              target="_blank"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "10px 18px",
                borderRadius: 20,
                backgroundColor: "#ffffff",
                border: "1px solid #E2DDD3",
                fontSize: 13,
                fontWeight: 600,
                color: "#2691BA",
                textDecoration: "none",
              }}
            >
              View Live Site <ExternalLink size={14} />
            </Link>
            <button
              onClick={() => setShowAddBooking(true)}
              className="btn-pill btn-pill-cyan"
              style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "10px 22px" }}
            >
              <Plus size={16} /> New Booking
            </button>
          </div>
        </header>

        {/* TAB 1: OVERVIEW */}
        {activeTab === "overview" && (
          <div>
            {/* Stat Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, marginBottom: 35 }}>
              {[
                { label: "Total Bookings", val: bookings.length, icon: Calendar, change: "+2 this week", color: "#2691BA" },
                { label: "Greece Retreat Enquiries", val: "12", icon: Users, change: "Oct 11-17, 2026", color: "#1A6E8F" },
                { label: "Online Class Signups", val: "28", icon: Smartphone, change: "TWINT Accepted", color: "#54BC33" },
                { label: "Published Articles", val: articles.length, icon: PenSquare, change: "3 Reflections", color: "#8E44AD" },
              ].map((card, i) => {
                const Icon = card.icon;
                return (
                  <div key={i} style={{ backgroundColor: "#ffffff", padding: "24px", borderRadius: 16, border: "1px solid #E2DDD3", boxShadow: "0 4px 15px rgba(0,0,0,0.03)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                      <span style={{ fontSize: 13, color: "#6B7A70", fontWeight: 600 }}>{card.label}</span>
                      <div style={{ width: 38, height: 38, borderRadius: 10, backgroundColor: `${card.color}15`, display: "flex", alignItems: "center", justifyContent: "center", color: card.color }}>
                        <Icon size={20} />
                      </div>
                    </div>
                    <div style={{ fontSize: 32, fontWeight: 700, color: "#1A252C", marginBottom: 6 }}>{card.val}</div>
                    <span style={{ fontSize: 12, color: "#6B7A70", display: "flex", alignItems: "center", gap: 4 }}>
                      <TrendingUp size={12} color="#54BC33" /> {card.change}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Quick Actions & Recent Activity Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 25 }}>
              {/* Recent Bookings Table Preview */}
              <div style={{ backgroundColor: "#ffffff", padding: "28px", borderRadius: 18, border: "1px solid #E2DDD3" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                  <h3 style={{ fontFamily: "var(--serif)", fontSize: 22, color: "#2691BA", margin: 0 }}>Recent Client Bookings</h3>
                  <button onClick={() => setActiveTab("bookings")} style={{ background: "none", border: "none", color: "#2691BA", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                    View All <ChevronRight size={14} />
                  </button>
                </div>

                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                  <thead>
                    <tr style={{ borderBottom: "1.5px solid #E2DDD3", textAlign: "left", color: "#6B7A70", fontSize: 12, textTransform: "uppercase" }}>
                      <th style={{ padding: "10px 0" }}>Client</th>
                      <th style={{ padding: "10px 0" }}>Service</th>
                      <th style={{ padding: "10px 0" }}>Date</th>
                      <th style={{ padding: "10px 0" }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.slice(0, 4).map((b) => (
                      <tr key={b.id} style={{ borderBottom: "1px solid #F0ECE1" }}>
                        <td style={{ padding: "14px 0", fontWeight: 600 }}>{b.client}</td>
                        <td style={{ padding: "14px 0", color: "#6B7A70" }}>{b.service}</td>
                        <td style={{ padding: "14px 0" }}>{b.date}</td>
                        <td style={{ padding: "14px 0" }}>
                          <span style={{ padding: "4px 10px", borderRadius: 100, fontSize: 11, fontWeight: 700, backgroundColor: b.status === "Confirmed" ? "#54BC3318" : "#F39C1218", color: b.status === "Confirmed" ? "#45A027" : "#D68910" }}>
                            {b.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Integrations Health Widget */}
              <div style={{ backgroundColor: "#ffffff", padding: "28px", borderRadius: 18, border: "1px solid #E2DDD3" }}>
                <h3 style={{ fontFamily: "var(--serif)", fontSize: 22, color: "#2691BA", margin: "0 0 20px" }}>System Status</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", borderRadius: 12, backgroundColor: "#F9F8F5", border: "1px solid #E2DDD3" }}>
                    <div>
                      <strong style={{ fontSize: 14, display: "block" }}>Supabase Database</strong>
                      <span style={{ fontSize: 11, color: "#6B7A70" }}>PostgreSQL db.bszyzttyashekzqmehxg</span>
                    </div>
                    <CheckCircle2 size={20} color="#54BC33" />
                  </div>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", borderRadius: 12, backgroundColor: "#F9F8F5", border: "1px solid #E2DDD3" }}>
                    <div>
                      <strong style={{ fontSize: 14, display: "block" }}>Vercel Hosting</strong>
                      <span style={{ fontSize: 11, color: "#6B7A70" }}>susi-all.vercel.app</span>
                    </div>
                    <CheckCircle2 size={20} color="#54BC33" />
                  </div>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", borderRadius: 12, backgroundColor: "#F9F8F5", border: "1px solid #E2DDD3" }}>
                    <div>
                      <strong style={{ fontSize: 14, display: "block" }}>Resend Email API</strong>
                      <span style={{ fontSize: 11, color: "#6B7A70" }}>Awaiting API key input</span>
                    </div>
                    <AlertCircle size={20} color="#D68910" />
                  </div>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", borderRadius: 12, backgroundColor: "#F9F8F5", border: "1px solid #E2DDD3" }}>
                    <div>
                      <strong style={{ fontSize: 14, display: "block" }}>Blotato Social API</strong>
                      <span style={{ fontSize: 11, color: "#6B7A70" }}>Awaiting API key input</span>
                    </div>
                    <AlertCircle size={20} color="#D68910" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: BOOKINGS */}
        {activeTab === "bookings" && (
          <div style={{ backgroundColor: "#ffffff", padding: "30px", borderRadius: 18, border: "1px solid #E2DDD3" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 25 }}>
              <div style={{ position: "relative", width: 320 }}>
                <Search size={18} style={{ position: "absolute", left: 12, top: 12, color: "#999" }} />
                <input
                  type="text"
                  placeholder="Search client, email or service..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ width: "100%", padding: "10px 12px 10px 38px", borderRadius: 10, border: "1px solid #E2DDD3", fontSize: 14, outline: "none" }}
                />
              </div>
              <button onClick={() => setShowAddBooking(true)} className="btn-pill btn-pill-cyan">
                + Add Client Booking
              </button>
            </div>

            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #E2DDD3", textAlign: "left", color: "#6B7A70", fontSize: 12, textTransform: "uppercase" }}>
                  <th style={{ padding: "12px 10px" }}>ID</th>
                  <th style={{ padding: "12px 10px" }}>Client</th>
                  <th style={{ padding: "12px 10px" }}>Email</th>
                  <th style={{ padding: "12px 10px" }}>Service</th>
                  <th style={{ padding: "12px 10px" }}>Date & Time</th>
                  <th style={{ padding: "12px 10px" }}>Payment</th>
                  <th style={{ padding: "12px 10px" }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((b) => (
                  <tr key={b.id} style={{ borderBottom: "1px solid #F0ECE1" }}>
                    <td style={{ padding: "14px 10px", fontWeight: 700, color: "#2691BA" }}>{b.id}</td>
                    <td style={{ padding: "14px 10px", fontWeight: 600 }}>{b.client}</td>
                    <td style={{ padding: "14px 10px", color: "#6B7A70" }}>{b.email}</td>
                    <td style={{ padding: "14px 10px" }}>{b.service}</td>
                    <td style={{ padding: "14px 10px" }}>{b.date} · {b.time}</td>
                    <td style={{ padding: "14px 10px" }}>
                      <span style={{ fontSize: 12, padding: "3px 8px", borderRadius: 6, backgroundColor: "#EAEAEA", fontWeight: 600 }}>
                        {b.payment}
                      </span>
                    </td>
                    <td style={{ padding: "14px 10px" }}>
                      <span style={{ padding: "4px 12px", borderRadius: 100, fontSize: 11, fontWeight: 700, backgroundColor: b.status === "Confirmed" ? "#54BC3318" : "#F39C1218", color: b.status === "Confirmed" ? "#45A027" : "#D68910" }}>
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 3: RETREATS */}
        {activeTab === "retreats" && (
          <div style={{ backgroundColor: "#ffffff", padding: "30px", borderRadius: 18, border: "1px solid #E2DDD3" }}>
            <h3 style={{ fontFamily: "var(--serif)", fontSize: 24, color: "#2691BA", marginBottom: 10 }}>Peloponnese Greece Retreat 2026</h3>
            <p style={{ color: "#6B7A70", fontSize: 15, marginBottom: 25 }}>11–17 October 2026 · Sampatiki Suites, Greece</p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 30 }}>
              <div style={{ padding: 20, borderRadius: 14, backgroundColor: "rgba(38,145,186,0.06)", border: "1px solid rgba(38,145,186,0.2)" }}>
                <strong style={{ fontSize: 16, color: "#2691BA" }}>Twin Share Option (CHF 1,810)</strong>
                <p style={{ fontSize: 24, fontWeight: 700, margin: "8px 0 0" }}>8 Registered</p>
              </div>
              <div style={{ padding: 20, borderRadius: 14, backgroundColor: "rgba(84,188,51,0.06)", border: "1px solid rgba(84,188,51,0.2)" }}>
                <strong style={{ fontSize: 16, color: "#45A027" }}>Sole Occupancy Option (CHF 2,260)</strong>
                <p style={{ fontSize: 24, fontWeight: 700, margin: "8px 0 0" }}>4 Registered</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: CONTENT */}
        {activeTab === "content" && (
          <div style={{ backgroundColor: "#ffffff", padding: "30px", borderRadius: 18, border: "1px solid #E2DDD3" }}>
            <h3 style={{ fontFamily: "var(--serif)", fontSize: 24, color: "#2691BA", marginBottom: 20 }}>Journal Articles &amp; Practice Notes</h3>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {articles.map((art) => (
                <div key={art.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", borderRadius: 12, border: "1px solid #E2DDD3", backgroundColor: "#FBF9F4" }}>
                  <div>
                    <strong style={{ fontSize: 16, color: "#1A252C" }}>{art.title}</strong>
                    <div style={{ fontSize: 13, color: "#6B7A70", marginTop: 4 }}>{art.category} · {art.date}</div>
                  </div>
                  <span style={{ padding: "4px 12px", borderRadius: 100, fontSize: 12, fontWeight: 700, backgroundColor: "#54BC3318", color: "#45A027" }}>
                    {art.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: API & INTEGRATIONS SETTINGS */}
        {activeTab === "settings" && (
          <div style={{ backgroundColor: "#ffffff", padding: "35px", borderRadius: 18, border: "1px solid #E2DDD3", maxWidth: 850 }}>
            <h3 style={{ fontFamily: "var(--serif)", fontSize: 26, color: "#2691BA", marginBottom: 25 }}>API Keys &amp; Integrations Setup</h3>

            {/* Supabase status */}
            <div style={{ marginBottom: 30, padding: 20, borderRadius: 14, backgroundColor: "rgba(84,188,51,0.06)", border: "1px solid rgba(84,188,51,0.2)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <CheckCircle2 size={22} color="#54BC33" />
                <strong style={{ fontSize: 16, color: "#45A027" }}>Supabase Connection Active</strong>
              </div>
              <p style={{ fontSize: 13, color: "#6B7A70", margin: 0 }}>
                URL: <code>https://bszyzttyashekzqmehxg.supabase.co</code>
              </p>
            </div>

            {/* Resend API Key Input */}
            <div style={{ marginBottom: 30 }}>
              <label style={{ fontSize: 14, fontWeight: 700, color: "#1A252C", display: "block", marginBottom: 8 }}>
                Resend Email API Key (Coming Soon)
              </label>
              <input
                type="text"
                placeholder="re_123456789..."
                value={resendKey}
                onChange={(e) => setResendKey(e.target.value)}
                style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1px solid #E2DDD3", fontSize: 14, outline: "none" }}
              />
              <span style={{ fontSize: 12, color: "#6B7A70", marginTop: 4, display: "block" }}>
                Will be used for sending automated booking confirmations &amp; class reminders.
              </span>
            </div>

            {/* Blotato API Key Input */}
            <div style={{ marginBottom: 30 }}>
              <label style={{ fontSize: 14, fontWeight: 700, color: "#1A252C", display: "block", marginBottom: 8 }}>
                Blotato Social API Key (Coming Soon)
              </label>
              <input
                type="text"
                placeholder="blotato_sec_..."
                value={blotatoKey}
                onChange={(e) => setBlotatoKey(e.target.value)}
                style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1px solid #E2DDD3", fontSize: 14, outline: "none" }}
              />
              <span style={{ fontSize: 12, color: "#6B7A70", marginTop: 4, display: "block" }}>
                Will be used for cross-publishing journal reflections to social channels.
              </span>
            </div>

            <button className="btn-pill btn-pill-cyan">
              SAVE API CONFIGURATION
            </button>
          </div>
        )}

        {/* Add Booking Modal */}
        {showAddBooking && (
          <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ backgroundColor: "#ffffff", padding: "35px", borderRadius: 20, width: "100%", maxWidth: 500, boxShadow: "0 10px 40px rgba(0,0,0,0.2)" }}>
              <h3 style={{ fontFamily: "var(--serif)", fontSize: 24, color: "#2691BA", marginBottom: 20 }}>Add New Client Booking</h3>

              <form onSubmit={handleAddBooking}>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Client Full Name</label>
                  <input type="text" className="form-input" required value={newClient} onChange={(e) => setNewClient(e.target.value)} placeholder="e.g. Sarah Jenkins" />
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Email Address</label>
                  <input type="email" className="form-input" required value={newEmail} onChange={(e) => setNewEmail(e.target.value)} placeholder="e.g. sarah@example.com" />
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Service Type</label>
                  <select value={newService} onChange={(e) => setNewService(e.target.value)} className="form-input">
                    <option value="Private Yoga Session">Private Yoga Session (CHF 150)</option>
                    <option value="Life Coaching & Mentoring">Life Coaching & Mentoring (CHF 180)</option>
                    <option value="Teacher Mentoring & Sequencing">Teacher Mentoring (CHF 200)</option>
                    <option value="Dynamic Movement Weekly Online">Dynamic Movement Online (CHF 25)</option>
                  </select>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 25 }}>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Date</label>
                    <input type="date" className="form-input" value={newDate} onChange={(e) => setNewDate(e.target.value)} />
                  </div>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Time</label>
                    <input type="text" className="form-input" value={newTime} onChange={(e) => setNewTime(e.target.value)} placeholder="e.g. 10:00 AM" />
                  </div>
                </div>

                <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
                  <button type="button" onClick={() => setShowAddBooking(false)} style={{ padding: "10px 20px", borderRadius: 20, border: "1px solid #ccc", background: "none", cursor: "pointer" }}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-pill btn-pill-cyan">
                    Save Booking
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
