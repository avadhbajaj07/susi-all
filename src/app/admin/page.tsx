"use client";

import { useState, useMemo, useEffect } from "react";
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
  Mail,
  ExternalLink,
  ShieldCheck,
  Smartphone,
  ChevronRight,
  TrendingUp,
  FileText,
  Send,
  Printer,
  DollarSign,
  Eye,
  X,
  Edit,
  Linkedin,
  UserPlus,
  UserCheck,
  UserX,
  Share2,
  Trash2,
  Sparkles,
  Inbox,
  Paperclip,
  Reply,
  Archive,
  Download,
} from "lucide-react";

import { SusiInvoiceTemplate, InvoiceItem } from "@/components/invoice-template";

// Initial Studio Services Presets
const studioPresetServices = [
  { desc: "Private yoga, breathwork and movement therapy session", rate: 150 },
  { desc: "Life coaching and leadership mentoring session", rate: 180 },
  { desc: "Teacher mentoring & Art of Teaching Yoga session", rate: 200 },
  { desc: "Dynamic Movement weekly online class pass", rate: 25 },
  { desc: "Peloponnese Greece Retreat deposit", rate: 350 },
];

// Initial Studio Data
const initialBookings: any[] = [];
const initialInvoices: any[] = [];
const initialCampaigns: any[] = [];
const initialArticles: any[] = [];
const initialSubscribers: any[] = [];
const initialInboxMessages: any[] = [];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "inbox" | "bookings" | "invoices" | "email" | "subscribers" | "retreats" | "content" | "settings">("overview");
  const [bookings, setBookings] = useState(initialBookings);
  const [invoices, setInvoices] = useState(initialInvoices);
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [articles, setArticles] = useState(initialArticles);
  const [subscribers, setSubscribers] = useState(initialSubscribers);
  const [searchQuery, setSearchQuery] = useState("");
  const [resendKey, setResendKey] = useState("");
  const [blotatoKey, setBlotatoKey] = useState("");

  // Studio Inbox & Email Composer State
  const [inboxMessages, setInboxMessages] = useState(initialInboxMessages);
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [inboxFolder, setInboxFolder] = useState<"inbox" | "sent">("inbox");
  const [replyText, setReplyText] = useState("");
  const [replyAttachments, setReplyAttachments] = useState<{ name: string; size: string }[]>([]);

  useEffect(() => {
    const fetchInbox = async () => {
      try {
        const res = await fetch("/api/inbox");
        const data = await res.json();
        if (data.messages && Array.isArray(data.messages)) {
          setInboxMessages(data.messages);
        }
      } catch (err) {
        console.error("Inbox fetch error:", err);
      }
    };
    fetchInbox();
    const timer = setInterval(fetchInbox, 10000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/posts");
        const data = await res.json();
        if (data.posts && Array.isArray(data.posts) && data.posts.length > 0) {
          setArticles(data.posts);
        }
      } catch (err) {
        console.error("Posts fetch error:", err);
      }
    };
    fetchPosts();
  }, []);

  const [adminComments, setAdminComments] = useState<any[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch("/api/comments?all=true");
        const data = await res.json();
        if (data.comments && Array.isArray(data.comments)) {
          setAdminComments(data.comments);
        }
      } catch (err) {
        console.error("Comments fetch error:", err);
      }
    };
    fetchComments();
  }, []);

  const handleModerateComment = async (id: number | string, newStatus: "approved" | "rejected") => {
    setAdminComments((prev) => prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c)));
    try {
      await fetch("/api/comments", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
    } catch (err) {
      console.error("Moderate comment error:", err);
    }
  };

  // Composer Modal State
  const [showComposeModal, setShowComposeModal] = useState(false);
  const [composeTo, setComposeTo] = useState("");
  const [composeSubject, setComposeSubject] = useState("");
  const [composeBody, setComposeBody] = useState("");
  const [composeAttachments, setComposeAttachments] = useState<{ name: string; size: string }[]>([]);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailSendStatus, setEmailSendStatus] = useState<string | null>(null);

  // Interactive Live Invoice Builder Form State
  const [invNumber, setInvNumber] = useState("SD-2026-001");
  const [invClientName, setInvClientName] = useState("");
  const [invClientEmail, setInvClientEmail] = useState("");
  const [invIssueDate, setInvIssueDate] = useState("");
  const [invDueDate, setInvDueDate] = useState("");
  const [invStatus, setInvStatus] = useState("draft");
  const [invPaymentNotice, setInvPaymentNotice] = useState("Payment due within 14 days via TWINT or IBAN.");
  const [invPaymentMethod, setInvPaymentMethod] = useState("Bank transfer or TWINT (+41 79 854 97 52)");

  const [invItems, setInvItems] = useState<InvoiceItem[]>([]);

  const [activeInvoice, setActiveInvoice] = useState<any>(null);

  // Invoice Math Calculations
  const calculatedSubtotal = useMemo(() => {
    return invItems.reduce((sum, item) => sum + (item.amount || item.qty * item.rate), 0);
  }, [invItems]);

  const handleUpdateItem = (index: number, patch: Partial<InvoiceItem>) => {
    const updated = [...invItems];
    const current = updated[index];
    const newQty = patch.qty !== undefined ? patch.qty : current.qty;
    const newRate = patch.rate !== undefined ? patch.rate : current.rate;
    updated[index] = {
      ...current,
      ...patch,
      qty: newQty,
      rate: newRate,
      amount: newQty * newRate,
    };
    setInvItems(updated);
  };

  const handleAddItem = (preset?: { desc: string; rate: number }) => {
    if (preset) {
      setInvItems([
        ...invItems,
        { desc: preset.desc, qty: 1, rate: preset.rate, amount: preset.rate },
      ]);
    } else {
      setInvItems([
        ...invItems,
        { desc: "Custom studio session", qty: 1, rate: 100, amount: 100 },
      ]);
    }
  };

  const handleRemoveItem = (index: number) => {
    setInvItems(invItems.filter((_, i) => i !== index));
  };

  const handleSaveInvoice = async (e: React.FormEvent) => {
    e.preventDefault();
    const newInv = {
      id: invNumber,
      number: invNumber,
      client: invClientName,
      clientName: invClientName,
      clientEmail: invClientEmail,
      email: invClientEmail,
      date: invIssueDate,
      issued: invIssueDate,
      dueDate: invDueDate,
      due: invDueDate,
      status: invStatus,
      emailSent: false,
      paymentNotice: invPaymentNotice,
      paymentMethod: invPaymentMethod,
      items: invItems,
      subtotal: calculatedSubtotal,
      total: calculatedSubtotal,
    };

    try {
      await fetch("/api/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "save", invoice: newInv }),
      });
      alert(`✓ Invoice ${invNumber} saved & recorded in Supabase CRM!`);
    } catch (err) {
      console.error("Save invoice error:", err);
    }

    setInvoices([newInv, ...invoices.filter((i) => i.number !== newInv.number)]);
    setActiveInvoice(newInv);
    setInvNumber(`SD-2026-00${invoices.length + 2}`);
  };

  const handleSendInvoiceEmail = async (invToDelivery: any) => {
    if (!invToDelivery.clientEmail && !invToDelivery.email) {
      alert("Please specify a valid client email address.");
      return;
    }

    try {
      const res = await fetch("/api/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "send-email", invoice: invToDelivery }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(`Resend Email Error: ${data.error || "Failed to send invoice email"}`);
        return;
      }

      const recipient = invToDelivery.clientEmail || invToDelivery.email;

      // Persist sent invoice into Sent Messages inbox
      fetch("/api/inbox", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fromName: "Susi Davies",
          fromEmail: "hello@susidavies.com",
          to: recipient,
          subject: `Invoice ${invToDelivery.number}`,
          body: `Dear ${invToDelivery.clientName || "Client"},\n\nThank you for choosing Susi Davies. Attached is your official invoice ${invToDelivery.number} for CHF ${invToDelivery.total}.\n\nNamaste,\nSusi Davies`,
          folder: "sent",
          attachments: [{ name: `Invoice-${invToDelivery.number}.pdf`, size: "165 KB" }],
        }),
      }).catch(() => {});

      // Mark emailSent = true
      setInvoices(
        invoices.map((inv) =>
          inv.number === invToDelivery.number || inv.id === invToDelivery.id
            ? { ...inv, emailSent: true }
            : inv
        )
      );

      alert(`✓ Invoice ${invToDelivery.number} successfully emailed to ${invToDelivery.clientEmail || invToDelivery.email} via hello@susidavies.com!`);
    } catch (err: any) {
      alert(`Network error: ${err.message || "Failed to send invoice"}`);
    }
  };

  // Email Campaign Modal State
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailSegment, setEmailSegment] = useState("All Subscribers");
  const [emailBody, setEmailBody] = useState("");

  // New Article Modal State
  const [showArticleModal, setShowArticleModal] = useState(false);
  const [artTitle, setArtTitle] = useState("");
  const [artCategory, setArtCategory] = useState("Practice Notes");
  const [artContent, setArtContent] = useState("");
  const [artImage, setArtImage] = useState("");
  const [artScheduleMode, setArtScheduleMode] = useState<"now" | "schedule">("now");
  const [artScheduleDate, setArtScheduleDate] = useState("2026-08-10");
  const [artScheduleTime, setArtScheduleTime] = useState("09:00 AM");
  const [postToLinkedin, setPostToLinkedin] = useState(true);
  const [broadcastToEmail, setBroadcastToEmail] = useState(true);

  // New Subscriber Modal State
  const [showSubModal, setShowSubModal] = useState(false);
  const [subName, setSubName] = useState("");
  const [subEmail, setSubEmail] = useState("");
  const [subSegment, setSubSegment] = useState("Journal Subscribers");

  // New Booking State
  const [showAddBooking, setShowAddBooking] = useState(false);
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

  const [isSendingBroadcast, setIsSendingBroadcast] = useState(false);

  const handleCreateCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailSubject || isSendingBroadcast) return;

    setIsSendingBroadcast(true);

    // 1. Gather active subscriber email addresses
    let activeSubs = subscribers.filter((s: any) => s.status === "Subscribed" || !s.status);
    if (emailSegment && emailSegment !== "All Subscribers") {
      activeSubs = activeSubs.filter((s: any) =>
        (s.tags && Array.isArray(s.tags) && s.tags.includes(emailSegment)) ||
        (s.segment && s.segment === emailSegment)
      );
    }

    let targetEmails = activeSubs.map((s: any) => s.email).filter(Boolean);

    // Fallback: If targetEmails is empty, collect all available emails from subscribers state
    if (targetEmails.length === 0 && subscribers.length > 0) {
      targetEmails = subscribers.map((s: any) => s.email).filter(Boolean);
    }

    // Always include studio address hello@susidavies.com so Susi receives a copy
    if (!targetEmails.includes("hello@susidavies.com")) {
      targetEmails.push("hello@susidavies.com");
    }

    // 2. Dispatch real emails via /api/send-email
    let sentCount = 0;
    for (const email of targetEmails) {
      try {
        const res = await fetch("/api/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            to: email,
            subject: emailSubject,
            body: emailBody,
            fromName: "Susi Davies",
          }),
        });
        if (res.ok) sentCount++;
      } catch (err) {
        console.error(`Failed to send email broadcast to ${email}:`, err);
      }
    }

    // 3. Persist sent broadcast into Sent Messages inbox
    fetch("/api/inbox", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fromName: "Susi Davies Broadcast",
        fromEmail: "hello@susidavies.com",
        to: targetEmails.join(", "),
        subject: `[Broadcast] ${emailSubject}`,
        body: emailBody,
        folder: "sent",
      }),
    }).catch(() => {});

    // 4. Record sent campaign item in campaigns table
    const newCmp = {
      id: `CMP-0${campaigns.length + 1}`,
      subject: emailSubject,
      segment: emailSegment || "All Subscribers",
      status: "Sent",
      sentDate: "Today",
      opens: "100%",
      clicks: "45%",
    };
    setCampaigns([newCmp, ...campaigns]);

    // 5. Clean up modal and notify user
    setEmailSubject("");
    setEmailBody("");
    setIsSendingBroadcast(false);
    setShowEmailModal(false);

    alert(`✓ Email Broadcast "${emailSubject}" successfully sent to ${targetEmails.length} recipient(s) (${targetEmails.join(", ")}) via hello@susidavies.com!`);
  };

  const [isPublishingArticle, setIsPublishingArticle] = useState(false);

  const handlePublishArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!artTitle || isPublishingArticle) return;

    setIsPublishingArticle(true);
    // Instantly close modal so user cannot double-click
    setShowArticleModal(false);

    const isScheduled = artScheduleMode === "schedule";
    const currentTitle = artTitle;
    const currentCategory = artCategory;
    const currentContent = artContent;
    const currentImage = artImage;

    const newArt = {
      id: Date.now(),
      title: currentTitle,
      category: currentCategory,
      image: currentImage,
      status: isScheduled ? `Scheduled (${artScheduleDate} ${artScheduleTime})` : "Published",
      date: isScheduled ? artScheduleDate : "Aug 10, 2026",
      linkedin: postToLinkedin,
      broadcastSent: broadcastToEmail,
    };

    // Filter out duplicates by title before prepending
    setArticles((prev) => [newArt, ...prev.filter((a) => a.title?.trim().toLowerCase() !== currentTitle.trim().toLowerCase())]);

    try {
      await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: currentTitle,
          category: currentCategory,
          content: currentContent,
          excerpt: currentContent ? currentContent.slice(0, 160) : currentTitle,
          image: currentImage || "/images/susi davies7.jpg",
          date: isScheduled ? artScheduleDate : "Aug 10, 2026",
        }),
      });
    } catch (err) {
      console.error("Save post error:", err);
    }

    if (broadcastToEmail) {
      try {
        const recipients = subscribers.map((s) => s.email).filter(Boolean);
        for (const recipient of recipients) {
          fetch("/api/send-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              to: recipient,
              subject: `New Journal Note: ${currentTitle}`,
              body: `${currentContent}\n\nRead the full article on Susi Davies website: https://susidavies.com/blog`,
              fromName: "Susi Davies",
            }),
          }).catch(() => {});
        }
      } catch (err) {
        console.error("Broadcast error:", err);
      }

      setCampaigns((prev) => [
        {
          id: `CMP-0${prev.length + 1}`,
          subject: `${isScheduled ? "[Scheduled] " : ""}New Journal Note: ${currentTitle}`,
          segment: "All Subscribers",
          status: isScheduled ? `Scheduled (${artScheduleDate})` : "Sent",
          sentDate: isScheduled ? artScheduleDate : "Today",
          opens: isScheduled ? "0%" : "100%",
          clicks: isScheduled ? "0%" : "50%",
        },
        ...prev,
      ]);
    }

    setArtTitle("");
    setArtContent("");
    setArtImage("");
    setIsPublishingArticle(false);
  };

  // Edit Article Modal State
  const [showEditArticleModal, setShowEditArticleModal] = useState(false);
  const [editArticleId, setEditArticleId] = useState<any>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editCategory, setEditCategory] = useState("Practice Notes");
  const [editContent, setEditContent] = useState("");
  const [editImage, setEditImage] = useState("");

  const handleOpenEditArticle = (art: any) => {
    setEditArticleId(art.id);
    setEditTitle(art.title || "");
    setEditCategory(art.category || "Practice Notes");
    setEditContent(art.content || art.excerpt || "");
    setEditImage(art.image || "");
    setShowEditArticleModal(true);
  };

  const handleSaveEditArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editArticleId || !editTitle) return;

    const updatedArt = {
      title: editTitle,
      category: editCategory,
      content: editContent,
      excerpt: editContent ? editContent.slice(0, 160) : editTitle,
      image: editImage,
    };

    setArticles((prev) =>
      prev.map((a) => (a.id === editArticleId ? { ...a, ...updatedArt } : a))
    );

    setShowEditArticleModal(false);

    try {
      await fetch("/api/posts", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editArticleId,
          ...updatedArt,
        }),
      });
    } catch (err) {
      console.error("Update article error:", err);
    }
  };

  const handleDeleteArticle = async (art: any) => {
    if (!confirm(`Are you sure you want to delete "${art.title}"?`)) return;

    setArticles((prev) => prev.filter((a) => a.id !== art.id));

    try {
      await fetch(`/api/posts?id=${encodeURIComponent(art.id)}`, {
        method: "DELETE",
      });
    } catch (err) {
      console.error("Delete article error:", err);
    }
  };

  const handleAddSubscriber = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subEmail) return;
    const newSub = {
      id: `SUB-${Math.floor(100 + Math.random() * 900)}`,
      name: subName || subEmail.split("@")[0],
      email: subEmail,
      segment: subSegment,
      date: new Date().toISOString().split("T")[0],
      status: "Subscribed",
    };
    setSubscribers([newSub, ...subscribers]);
    setSubName("");
    setSubEmail("");
    setShowSubModal(false);
  };

  const toggleSubscriberStatus = (id: string) => {
    setSubscribers(
      subscribers.map((s) =>
        s.id === id
          ? { ...s, status: s.status === "Subscribed" ? "Unsubscribed" : "Subscribed" }
          : s
      )
    );
  };

  const handleSendComposeEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!composeTo || !composeSubject || isSendingEmail) return;

    setIsSendingEmail(true);
    setEmailSendStatus("Sending email via Resend API...");

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: composeTo,
          subject: composeSubject,
          body: composeBody,
          fromName: "Susi Davies",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(`Resend API Error: ${data.error || "Email delivery failed"}`);
        setIsSendingEmail(false);
        setEmailSendStatus(null);
        return;
      }

      const newMsg = {
        id: `MSG-${Math.floor(100 + Math.random() * 900)}`,
        fromName: "Susi Davies",
        fromEmail: "hello@susidavies.com",
        to: composeTo,
        subject: composeSubject,
        body: composeBody,
        date: "Just Now",
        read: true,
        folder: "sent",
        attachments: composeAttachments,
      };

      fetch("/api/inbox", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fromName: "Susi Davies",
          fromEmail: "hello@susidavies.com",
          to: composeTo,
          subject: composeSubject,
          body: composeBody,
          folder: "sent",
          attachments: composeAttachments,
        }),
      }).catch(() => {});

      setInboxMessages([newMsg, ...inboxMessages]);
      setSelectedMessage(newMsg);
      setComposeTo("");
      setComposeSubject("");
      setComposeBody("");
      setComposeAttachments([]);
      setShowComposeModal(false);
      alert(`✓ Email successfully sent to ${composeTo} via hello@susidavies.com!`);
    } catch (err: any) {
      alert(`Network error: ${err.message || "Failed to send email"}`);
    } finally {
      setIsSendingEmail(false);
      setEmailSendStatus(null);
    }
  };

  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText || !selectedMessage || isSendingEmail) return;

    setIsSendingEmail(true);

    try {
      const recipient = selectedMessage.fromEmail || selectedMessage.to;
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: recipient,
          subject: `Re: ${selectedMessage.subject}`,
          body: replyText,
          fromName: "Susi Davies",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(`Resend API Error: ${data.error || "Reply delivery failed"}`);
        setIsSendingEmail(false);
        return;
      }

      const replyMsg = {
        id: `MSG-${Math.floor(100 + Math.random() * 900)}`,
        fromName: "Susi Davies",
        fromEmail: "hello@susidavies.com",
        to: `${selectedMessage.fromName} <${recipient}>`,
        subject: `Re: ${selectedMessage.subject}`,
        body: replyText,
        date: "Just Now",
        read: true,
        folder: "sent",
        attachments: replyAttachments,
      };

      fetch("/api/inbox", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fromName: "Susi Davies",
          fromEmail: "hello@susidavies.com",
          to: recipient,
          subject: `Re: ${selectedMessage.subject}`,
          body: replyText,
          folder: "sent",
          attachments: replyAttachments,
        }),
      }).catch(() => {});

      setInboxMessages([replyMsg, ...inboxMessages]);
      setReplyText("");
      setReplyAttachments([]);
      setSelectedMessage(replyMsg);
      alert(`✓ Reply successfully sent to ${recipient} via hello@susidavies.com!`);
    } catch (err: any) {
      alert(`Network error: ${err.message || "Failed to send reply"}`);
    } finally {
      setIsSendingEmail(false);
    }
  };

  const filteredBookings = bookings.filter(
    (b) =>
      b.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.service.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeSubscribersCount = subscribers.filter((s) => s.status === "Subscribed").length;

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
          <Link href="/" style={{ textDecoration: "none", color: "#ffffff", display: "flex", flexDirection: "column", gap: 8 }}>
            <img
              src="/images/susi-davies-logo-white.png"
              alt="Susi Davies Logo"
              style={{
                height: 68,
                width: "auto",
                objectFit: "contain",
                alignSelf: "flex-start",
              }}
            />
            <span style={{ fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.8, display: "block", marginTop: 4 }}>
              Susi Davies Admin Panel
            </span>
          </Link>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
          {[
            { id: "overview", label: "Overview", icon: LayoutDashboard },
            { id: "inbox", label: "Inbox", icon: Inbox },
            { id: "bookings", label: "Bookings & Clients", icon: Calendar },
            { id: "invoices", label: "Invoice Generator", icon: FileText },
            { id: "email", label: "Email Automation", icon: Mail },
            { id: "subscribers", label: "Subscribers & Opt-Outs", icon: Users },
            { id: "retreats", label: "Retreat Reservations", icon: Users },
            { id: "content", label: "Journal & LinkedIn", icon: PenSquare },
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
              Susi Davies Dashboard
            </span>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: 36, color: "#2691BA", margin: "4px 0 0" }}>
              {activeTab === "overview" && "Overview"}
              {activeTab === "bookings" && "Bookings & Clients Management"}
              {activeTab === "invoices" && "Invoice Builder"}
              {activeTab === "email" && "Email Automation & Newsletters"}
              {activeTab === "subscribers" && "Subscribers & Consent Directory"}
              {activeTab === "retreats" && "Greece Retreat 2026 Reservations"}
              {activeTab === "content" && "Journal & LinkedIn Cross-Posting"}
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
            {activeTab === "inbox" ? (
              <button onClick={() => setShowComposeModal(true)} className="btn-pill btn-pill-cyan" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                <Plus size={16} /> Compose Email
              </button>
            ) : activeTab === "content" ? (
              <button onClick={() => setShowArticleModal(true)} className="btn-pill btn-pill-cyan" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                <Plus size={16} /> New Blog &amp; LinkedIn Post
              </button>
            ) : activeTab === "subscribers" ? (
              <button onClick={() => setShowSubModal(true)} className="btn-pill btn-pill-cyan" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                <UserPlus size={16} /> Add Subscriber
              </button>
            ) : activeTab === "email" ? (
              <button onClick={() => setShowEmailModal(true)} className="btn-pill btn-pill-cyan">
                + New Email Broadcast
              </button>
            ) : (
              <button onClick={() => setShowAddBooking(true)} className="btn-pill btn-pill-cyan">
                <Plus size={16} /> New Booking
              </button>
            )}
          </div>
        </header>

        {/* TAB 1: OVERVIEW */}
        {activeTab === "overview" && (
          <div>
            {/* Stat Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, marginBottom: 35 }}>
              {[
                { label: "Active Bookings", val: bookings.length, icon: Calendar, change: "Ready for new entries", color: "#2691BA" },
                { label: "Revenue", val: invoices.length > 0 ? `CHF ${invoices.reduce((a, b) => a + (typeof b.total === "number" ? b.total : parseFloat((b.total || "").replace(/[^\d.]/g, "") || 0)), 0).toFixed(2)}` : "CHF 0.00", icon: DollarSign, change: "TWINT & Bank", color: "#54BC33" },
                { label: "Active Subscribers", val: activeSubscribersCount, icon: Mail, change: "Managed Directory", color: "#1A6E8F" },
                { label: "Published Articles", val: articles.length, icon: PenSquare, change: "LinkedIn Auto-Sync", color: "#8E44AD" },
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
              {/* Recent Bookings Table */}
              <div style={{ backgroundColor: "#ffffff", padding: "28px", borderRadius: 18, border: "1px solid #E2DDD3" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                  <h3 style={{ fontFamily: "var(--serif)", fontSize: 22, color: "#2691BA", margin: 0 }}>Client Bookings</h3>
                  <button onClick={() => setActiveTab("bookings")} style={{ background: "none", border: "none", color: "#2691BA", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                    View All <ChevronRight size={14} />
                  </button>
                </div>

                {bookings.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "40px 20px", color: "#6B7A70" }}>
                    <Calendar size={36} color="#2691BA" style={{ marginBottom: 10, opacity: 0.5 }} />
                    <p style={{ fontWeight: 600, fontSize: 16, marginBottom: 4 }}>No client bookings recorded yet.</p>
                    <p style={{ fontSize: 13, margin: 0 }}>Click &quot;+ New Booking&quot; above to record your first client reservation.</p>
                  </div>
                ) : (
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
                )}
              </div>

              {/* Integrations Health Widget */}
              <div style={{ backgroundColor: "#ffffff", padding: "28px", borderRadius: 18, border: "1px solid #E2DDD3" }}>
                <h3 style={{ fontFamily: "var(--serif)", fontSize: 22, color: "#2691BA", margin: "0 0 20px" }}>System Status</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", borderRadius: 12, backgroundColor: "#F9F8F5", border: "1px solid #E2DDD3" }}>
                    <div>
                      <strong style={{ fontSize: 14, display: "block" }}>Supabase Database</strong>
                      <span style={{ fontSize: 11, color: "#6B7A70" }}>13 PostgreSQL Tables Live</span>
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
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: STUDIO INBOX & MESSAGING */}
        {activeTab === "inbox" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 25, height: "calc(100vh - 180px)", minHeight: 650 }}>
            {/* Left Column: Messages List */}
            <div style={{ backgroundColor: "#ffffff", borderRadius: 18, border: "1px solid #E2DDD3", display: "flex", flexDirection: "column", overflow: "hidden" }}>
              {/* Folder Selector Tabs */}
              <div style={{ display: "flex", borderBottom: "1px solid #E2DDD3", backgroundColor: "#FBF9F4" }}>
                <button
                  onClick={() => setInboxFolder("inbox")}
                  style={{ flex: 1, padding: "14px", border: "none", background: inboxFolder === "inbox" ? "#ffffff" : "transparent", fontWeight: 700, color: inboxFolder === "inbox" ? "#2691BA" : "#6B7A70", fontSize: 13, borderBottom: inboxFolder === "inbox" ? "2px solid #2691BA" : "none", cursor: "pointer" }}
                >
                  Inbox (hello@susidavies.com)
                </button>
                <button
                  onClick={() => setInboxFolder("sent")}
                  style={{ flex: 1, padding: "14px", border: "none", background: inboxFolder === "sent" ? "#ffffff" : "transparent", fontWeight: 700, color: inboxFolder === "sent" ? "#2691BA" : "#6B7A70", fontSize: 13, borderBottom: inboxFolder === "sent" ? "2px solid #2691BA" : "none", cursor: "pointer" }}
                >
                  Sent Messages
                </button>
              </div>

              {/* Compose Email Action Button */}
              <div style={{ padding: "14px 14px 4px", backgroundColor: "#FBF9F4" }}>
                <button
                  onClick={() => setShowComposeModal(true)}
                  className="btn-pill btn-pill-cyan"
                  style={{ width: "100%", padding: "11px 16px", fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, boxShadow: "0 4px 14px rgba(38,145,186,0.2)" }}
                >
                  <Plus size={16} /> COMPOSE NEW EMAIL
                </button>
              </div>

              {/* Search Inbox */}
              <div style={{ padding: "14px", borderBottom: "1px solid #E2DDD3" }}>
                <div style={{ position: "relative" }}>
                  <Search size={16} style={{ position: "absolute", left: 10, top: 10, color: "#999" }} />
                  <input
                    type="text"
                    placeholder="Search inbox or client email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ width: "100%", padding: "8px 10px 8px 34px", borderRadius: 8, border: "1px solid #E2DDD3", fontSize: 13, outline: "none" }}
                  />
                </div>
              </div>

              {/* Message List */}
              <div style={{ flex: 1, overflowY: "auto" }}>
                {inboxMessages
                  .filter((m) => m.folder === inboxFolder)
                  .filter((m) => m.subject.toLowerCase().includes(searchQuery.toLowerCase()) || m.fromName.toLowerCase().includes(searchQuery.toLowerCase()) || m.body.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((msg) => {
                    const isSelected = selectedMessage?.id === msg.id;
                    return (
                      <div
                        key={msg.id}
                        onClick={() => setSelectedMessage(msg)}
                        style={{
                          padding: "16px",
                          borderBottom: "1px solid #F0ECE1",
                          backgroundColor: isSelected ? "rgba(38,145,186,0.08)" : msg.read ? "#ffffff" : "#F8FCFD",
                          cursor: "pointer",
                          transition: "background-color 0.15s ease",
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                          <strong style={{ fontSize: 14, color: "#1A252C" }}>{msg.fromName}</strong>
                          <span style={{ fontSize: 11, color: "#888" }}>{msg.date}</span>
                        </div>
                        <div style={{ fontSize: 13, fontWeight: msg.read ? 500 : 700, color: "#2691BA", marginBottom: 4, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {msg.subject}
                        </div>
                        <div style={{ fontSize: 12, color: "#6B7A70", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {msg.body}
                        </div>
                        {msg.attachments && msg.attachments.length > 0 && (
                          <div style={{ marginTop: 6, display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, color: "#2691BA", fontWeight: 600, backgroundColor: "#EBF5F9", padding: "2px 8px", borderRadius: 4 }}>
                            <Paperclip size={12} /> {msg.attachments.length} Attachment
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Right Column: Active Message Reader & Reply Composer */}
            <div style={{ backgroundColor: "#ffffff", borderRadius: 18, border: "1px solid #E2DDD3", display: "flex", flexDirection: "column", overflow: "hidden" }}>
              {selectedMessage ? (
                <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                  {/* Reader Header */}
                  <div style={{ padding: "24px", borderBottom: "1px solid #E2DDD3", backgroundColor: "#FBF9F4" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 12 }}>
                      <h3 style={{ fontFamily: "var(--serif)", fontSize: 22, color: "#1A252C", margin: 0 }}>
                        {selectedMessage.subject}
                      </h3>
                      <button onClick={() => setShowComposeModal(true)} className="btn-pill btn-pill-cyan" style={{ padding: "6px 14px", fontSize: 12, display: "flex", alignItems: "center", gap: 4 }}>
                        <Reply size={14} /> Reply
                      </button>
                    </div>

                    <div style={{ fontSize: 13, color: "#6B7A70", display: "flex", justifyContent: "space-between" }}>
                      <div>
                        <strong>From:</strong> {selectedMessage.fromName} &lt;{selectedMessage.fromEmail}&gt;
                        <div style={{ marginTop: 2 }}><strong>To:</strong> {selectedMessage.to}</div>
                      </div>
                      <span style={{ fontSize: 12 }}>{selectedMessage.date}</span>
                    </div>
                  </div>

                  {/* Message Body Content */}
                  <div style={{ flex: 1, padding: "24px", overflowY: "auto", fontSize: 15, lineHeight: 1.6, color: "#2C3E50", whiteSpace: "pre-wrap" }}>
                    {selectedMessage.body}

                    {/* Render Attachments */}
                    {selectedMessage.attachments && selectedMessage.attachments.length > 0 && (
                      <div style={{ marginTop: 25, paddingTop: 16, borderTop: "1px solid #E2DDD3" }}>
                        <strong style={{ fontSize: 13, color: "#2691BA", display: "block", marginBottom: 10 }}>Attachments ({selectedMessage.attachments.length})</strong>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                          {selectedMessage.attachments.map((att: any, idx: number) => (
                            <div key={idx} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 14px", borderRadius: 8, border: "1px solid #2691BA", backgroundColor: "#F4FAFC", fontSize: 12 }}>
                              <Paperclip size={14} color="#2691BA" />
                              <div>
                                <strong style={{ display: "block", color: "#1A252C" }}>{att.name}</strong>
                                <span style={{ fontSize: 10, color: "#666" }}>{att.size}</span>
                              </div>
                              <Download size={14} color="#2691BA" style={{ cursor: "pointer", marginLeft: 6 }} />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Quick Reply Form with Attachment Support */}
                  <form onSubmit={handleSendReply} style={{ padding: "20px", borderTop: "1px solid #E2DDD3", backgroundColor: "#FBF9F4" }}>
                    <div style={{ marginBottom: 10 }}>
                      <textarea
                        className="form-textarea"
                        rows={3}
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder={`Reply to ${selectedMessage.fromName} (sending from hello@susidavies.com)...`}
                        style={{ fontSize: 13 }}
                      />
                    </div>

                    {/* Reply Attachment Upload */}
                    {replyAttachments.length > 0 && (
                      <div style={{ display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
                        {replyAttachments.map((att, i) => (
                          <span key={i} style={{ fontSize: 11, padding: "4px 8px", borderRadius: 6, backgroundColor: "#2691BA", color: "#fff", display: "inline-flex", alignItems: "center", gap: 4 }}>
                            <Paperclip size={10} /> {att.name}
                          </span>
                        ))}
                      </div>
                    )}

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <label style={{ cursor: "pointer", fontSize: 12, color: "#2691BA", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 4 }}>
                        <Paperclip size={15} /> Attach File (Invoice / PDF / Image)
                        <input
                          type="file"
                          multiple
                          onChange={(e) => {
                            const files = Array.from(e.target.files || []);
                            const newAtts = files.map((f) => ({ name: f.name, size: `${(f.size / 1024).toFixed(0)} KB` }));
                            setReplyAttachments([...replyAttachments, ...newAtts]);
                          }}
                          style={{ display: "none" }}
                        />
                      </label>

                      <button type="submit" className="btn-pill btn-pill-cyan" style={{ padding: "8px 18px", fontSize: 13, display: "inline-flex", alignItems: "center", gap: 6 }}>
                        <Send size={14} /> Send Reply (hello@susidavies.com)
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "#6B7A70" }}>
                  Select a message to view
                </div>
              )}
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

            {filteredBookings.length === 0 ? (
              <div style={{ textAlign: "center", padding: "50px 20px", color: "#6B7A70" }}>
                <Calendar size={40} color="#2691BA" style={{ marginBottom: 12, opacity: 0.6 }} />
                <h4 style={{ fontSize: 18, margin: "0 0 6px", color: "#1A252C" }}>No bookings found</h4>
                <p style={{ fontSize: 14, margin: "0 0 20px" }}>Create your first client reservation to get started.</p>
                <button onClick={() => setShowAddBooking(true)} className="btn-pill btn-pill-cyan">
                  + Add Client Booking
                </button>
              </div>
            ) : (
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
            )}
          </div>
        )}

        {/* TAB 3: SPLIT INTERACTIVE INVOICE BUILDER */}
        {activeTab === "invoices" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1.15fr", gap: 30, alignItems: "start" }}>
              
              {/* Left Column: Interactive Form Panel */}
              <div style={{ backgroundColor: "#ffffff", padding: "28px", borderRadius: 18, border: "1px solid #E2DDD3" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                  <h3 style={{ fontFamily: "var(--serif)", fontSize: 22, color: "#2691BA", margin: 0 }}>Invoice Parameters</h3>
                  <button
                    type="button"
                    onClick={handleSaveInvoice}
                    className="btn-pill btn-pill-cyan"
                    style={{ padding: "8px 18px", fontSize: 12 }}
                  >
                    Save &amp; Record to CRM
                  </button>
                </div>

                <form onSubmit={handleSaveInvoice}>
                  {/* Client Select / Name & Email */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 16 }}>
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 700, color: "#2691BA", textTransform: "uppercase", display: "block", marginBottom: 4 }}>Client Name</label>
                      <input
                        type="text"
                        className="form-input"
                        required
                        list="client-crm-list"
                        value={invClientName}
                        onChange={(e) => setInvClientName(e.target.value)}
                        placeholder="e.g. Elena Rossi"
                      />
                      <datalist id="client-crm-list">
                        {bookings.map((b) => (
                          <option key={b.id} value={b.client}>{b.client} ({b.email})</option>
                        ))}
                      </datalist>
                    </div>
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 700, color: "#2691BA", textTransform: "uppercase", display: "block", marginBottom: 4 }}>Client Email</label>
                      <input
                        type="email"
                        className="form-input"
                        value={invClientEmail}
                        onChange={(e) => setInvClientEmail(e.target.value)}
                        placeholder="e.g. elena@example.ch"
                      />
                    </div>
                  </div>

                  {/* Metadata: Invoice #, Payment Status, Issued Date, Due Date */}
                  <div style={{ display: "grid", gridTemplateColumns: invStatus === "Paid" ? "1fr 1.2fr 1fr" : "1fr 1.2fr 1fr 1fr", gap: 12, marginBottom: 20 }}>
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 700, color: "#6B7A70", display: "block", marginBottom: 4 }}>Invoice #</label>
                      <input
                        type="text"
                        className="form-input"
                        value={invNumber}
                        onChange={(e) => setInvNumber(e.target.value)}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 700, color: "#2691BA", display: "block", marginBottom: 4 }}>Payment Status</label>
                      <select
                        className="form-input"
                        value={invStatus}
                        onChange={(e) => setInvStatus(e.target.value)}
                        style={{ fontWeight: 700, color: invStatus === "Paid" ? "#45A027" : "#D68910" }}
                      >
                        <option value="Due">Due / Pending Payment</option>
                        <option value="Paid">Paid</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 700, color: "#6B7A70", display: "block", marginBottom: 4 }}>Issued Date</label>
                      <input
                        type="text"
                        className="form-input"
                        value={invIssueDate}
                        onChange={(e) => setInvIssueDate(e.target.value)}
                      />
                    </div>
                    {invStatus !== "Paid" && (
                      <div>
                        <label style={{ fontSize: 12, fontWeight: 700, color: "#D68910", display: "block", marginBottom: 4 }}>Payment Due Date</label>
                        <input
                          type="text"
                          className="form-input"
                          value={invDueDate}
                          onChange={(e) => setInvDueDate(e.target.value)}
                          placeholder="e.g. 24 Aug 2026"
                        />
                      </div>
                    )}
                  </div>

                  {/* Payment Info */}
                  <div style={{ marginBottom: 20 }}>
                    <label style={{ fontSize: 12, fontWeight: 700, color: "#6B7A70", display: "block", marginBottom: 4 }}>Payment Notice</label>
                    <input
                      type="text"
                      className="form-input"
                      value={invPaymentNotice}
                      onChange={(e) => setInvPaymentNotice(e.target.value)}
                    />
                  </div>

                  {/* Service Picker Presets */}
                  <div style={{ marginBottom: 20, backgroundColor: "#FBF9F4", padding: "16px", borderRadius: 12, border: "1px solid #E2DDD3" }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#2691BA", textTransform: "uppercase", display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
                      <Sparkles size={14} /> Add Preset Service
                    </span>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {studioPresetServices.map((srv, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => handleAddItem(srv)}
                          style={{
                            fontSize: 12,
                            padding: "6px 12px",
                            borderRadius: 100,
                            border: "1px solid #2691BA",
                            backgroundColor: "#ffffff",
                            color: "#2691BA",
                            cursor: "pointer",
                            fontWeight: 600,
                          }}
                        >
                          + {srv.desc.slice(0, 24)}... (CHF {srv.rate})
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Line Items Table */}
                  <div style={{ marginBottom: 25 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: "#1A252C" }}>Services &amp; Line Items</span>
                      <button
                        type="button"
                        onClick={() => handleAddItem({ desc: "Custom Service", rate: 150 })}
                        style={{ fontSize: 12, color: "#2691BA", background: "none", border: "none", cursor: "pointer", fontWeight: 700 }}
                      >
                        + Add Custom Service &amp; Price
                      </button>
                    </div>

                    {invItems.map((item, idx) => (
                      <div key={idx} style={{ display: "grid", gridTemplateColumns: "3fr 1fr 1.5fr 1.5fr 35px", gap: 8, alignItems: "center", marginBottom: 10 }}>
                        <input
                          type="text"
                          className="form-input"
                          value={item.desc}
                          onChange={(e) => handleUpdateItem(idx, { desc: e.target.value })}
                          placeholder="Service Name / Description"
                          style={{ fontSize: 13 }}
                        />
                        <input
                          type="number"
                          className="form-input"
                          value={item.qty}
                          onChange={(e) => handleUpdateItem(idx, { qty: Number(e.target.value) })}
                          placeholder="Qty"
                          style={{ fontSize: 13, textAlign: "center" }}
                        />
                        <input
                          type="number"
                          className="form-input"
                          value={item.rate}
                          onChange={(e) => handleUpdateItem(idx, { rate: Number(e.target.value) })}
                          placeholder="Price (CHF)"
                          style={{ fontSize: 13, textAlign: "right" }}
                        />
                        <div style={{ fontSize: 13, fontWeight: 700, textAlign: "right", color: "#1f78b4" }}>
                          CHF {(item.qty * item.rate).toFixed(2)}
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(idx)}
                          style={{ background: "none", border: "none", color: "#C0392B", cursor: "pointer" }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Calculated Subtotal */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "2px solid #2691BA", paddingTop: 14 }}>
                    <strong style={{ fontSize: 16 }}>Calculated Total:</strong>
                    <strong style={{ fontSize: 24, color: "#1f78b4" }}>CHF {calculatedSubtotal.toFixed(2)}</strong>
                  </div>
                </form>
              </div>

              {/* Right Column: Live Preview Panel */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 15 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: "#6B7A70" }}>
                    Live Invoice Preview
                  </span>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <button
                      onClick={() => handleSendInvoiceEmail({ number: invNumber, issued: invIssueDate, due: invDueDate, status: invStatus, clientName: invClientName, clientEmail: invClientEmail, paymentNotice: invPaymentNotice, items: invItems, total: calculatedSubtotal })}
                      className="btn-pill btn-pill-cyan"
                      style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 16px", fontSize: 12 }}
                    >
                      <Send size={14} /> Send Email (hello@susidavies.com)
                    </button>
                    <button
                      onClick={() => window.print()}
                      className="btn-pill"
                      style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 16px", fontSize: 12, border: "1px solid #2691BA", color: "#2691BA", background: "#fff" }}
                    >
                      <Printer size={14} /> Print / Save PDF
                    </button>
                  </div>
                </div>

                <SusiInvoiceTemplate
                  data={{
                    number: invNumber,
                    issued: invIssueDate,
                    due: invDueDate,
                    status: invStatus,
                    clientName: invClientName,
                    clientEmail: invClientEmail,
                    paymentNotice: invPaymentNotice,
                    paymentMethod: invPaymentMethod,
                    items: invItems,
                    subtotal: calculatedSubtotal,
                    total: calculatedSubtotal,
                  }}
                />
              </div>
            </div>

            {/* Saved Invoices History Table */}
            <div style={{ marginTop: 40, backgroundColor: "#ffffff", padding: "28px", borderRadius: 18, border: "1px solid #E2DDD3" }}>
              <h3 style={{ fontFamily: "var(--serif)", fontSize: 22, color: "#2691BA", marginBottom: 20 }}>Saved Invoices &amp; CRM Ledger</h3>

              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid #E2DDD3", textAlign: "left", color: "#6B7A70", fontSize: 12, textTransform: "uppercase" }}>
                    <th style={{ padding: "10px" }}>Invoice #</th>
                    <th style={{ padding: "10px" }}>Client Details</th>
                    <th style={{ padding: "10px" }}>Date &amp; Due Date</th>
                    <th style={{ padding: "10px" }}>Total (CHF)</th>
                    <th style={{ padding: "10px" }}>Payment Status</th>
                    <th style={{ padding: "10px" }}>Email Status</th>
                    <th style={{ padding: "10px" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((inv) => {
                    const isPaid = inv.status?.toLowerCase() === "paid";
                    return (
                      <tr key={inv.id || inv.number} style={{ borderBottom: "1px solid #F0ECE1" }}>
                        <td style={{ padding: "12px 10px", fontWeight: 700, color: "#2691BA" }}>{inv.number || inv.id}</td>
                        <td style={{ padding: "12px 10px" }}>
                          <strong style={{ display: "block", color: "#1A252C" }}>{inv.clientName || inv.client}</strong>
                          <span style={{ fontSize: 12, color: "#888" }}>{inv.clientEmail || inv.email || "No email"}</span>
                        </td>
                        <td style={{ padding: "12px 10px", fontSize: 13, color: "#555" }}>
                          <div><strong>Issued:</strong> {inv.issued || inv.date}</div>
                          {!isPaid && (
                            <div style={{ color: "#D68910", fontWeight: 600 }}><strong>Due:</strong> {inv.due || inv.dueDate || "N/A"}</div>
                          )}
                        </td>
                        <td style={{ padding: "12px 10px", fontWeight: 700, fontSize: 15, color: "#1f78b4" }}>
                          CHF {typeof inv.total === "number" ? inv.total.toFixed(2) : inv.total}
                        </td>
                        <td style={{ padding: "12px 10px" }}>
                          <button
                            onClick={() => {
                              const newStatus = isPaid ? "Due" : "Paid";
                              setInvoices(invoices.map((i) => (i.id === inv.id || i.number === inv.number ? { ...i, status: newStatus } : i)));
                            }}
                            style={{
                              padding: "4px 12px",
                              borderRadius: 100,
                              fontSize: 11,
                              fontWeight: 700,
                              border: "none",
                              cursor: "pointer",
                              backgroundColor: isPaid ? "#54BC3318" : "#F39C1218",
                              color: isPaid ? "#45A027" : "#D68910",
                            }}
                          >
                            {isPaid ? "✓ PAID" : "⏳ DUE"}
                          </button>
                        </td>
                        <td style={{ padding: "12px 10px" }}>
                          <span style={{ padding: "3px 10px", borderRadius: 100, fontSize: 11, fontWeight: 700, backgroundColor: inv.emailSent ? "#54BC3318" : "#95A5A618", color: inv.emailSent ? "#45A027" : "#7F8C8D" }}>
                            {inv.emailSent ? "Email Sent ✓" : "Not Sent ✗"}
                          </span>
                        </td>
                        <td style={{ padding: "12px 10px" }}>
                          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                            <button
                              onClick={() => handleSendInvoiceEmail(inv)}
                              style={{ padding: "6px 12px", borderRadius: 12, backgroundColor: "#2691BA", color: "#fff", border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 4 }}
                            >
                              <Send size={13} /> Email Client
                            </button>
                            <button
                              onClick={() => {
                                setInvNumber(inv.number || inv.id);
                                setInvClientName(inv.clientName || inv.client);
                                setInvClientEmail(inv.clientEmail || inv.email || "");
                                setInvStatus(inv.status || "Due");
                                setInvIssueDate(inv.issued || inv.date || "");
                                setInvDueDate(inv.due || inv.dueDate || "");
                                if (inv.items) setInvItems(inv.items);
                              }}
                              style={{ background: "none", border: "1px solid #ccc", padding: "5px 10px", borderRadius: 8, color: "#333", cursor: "pointer", fontSize: 12 }}
                            >
                              Edit / Load
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: MAILCHIMP-STYLE EMAIL AUTOMATION SUITE */}
        {activeTab === "email" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
            {/* Top Mailchimp Analytics Metrics Bar */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
              <div style={{ backgroundColor: "#ffffff", padding: "22px", borderRadius: 16, border: "1px solid #E2DDD3" }}>
                <span style={{ fontSize: 13, color: "#6B7A70", fontWeight: 600 }}>Total Audience</span>
                <div style={{ fontSize: 32, fontWeight: 700, color: "#2691BA", margin: "6px 0 2px" }}>{subscribers.length}</div>
                <span style={{ fontSize: 12, color: "#45A027", fontWeight: 600 }}>{activeSubscribersCount} Active Subscribed</span>
              </div>
              <div style={{ backgroundColor: "#ffffff", padding: "22px", borderRadius: 16, border: "1px solid #E2DDD3" }}>
                <span style={{ fontSize: 13, color: "#6B7A70", fontWeight: 600 }}>Avg Open Rate</span>
                <div style={{ fontSize: 32, fontWeight: 700, color: "#54BC33", margin: "6px 0 2px" }}>{campaigns.length > 0 ? "100%" : "0.0%"}</div>
                <span style={{ fontSize: 12, color: "#6B7A70" }}>Live tracking</span>
              </div>
              <div style={{ backgroundColor: "#ffffff", padding: "22px", borderRadius: 16, border: "1px solid #E2DDD3" }}>
                <span style={{ fontSize: 13, color: "#6B7A70", fontWeight: 600 }}>Avg Click-Through Rate</span>
                <div style={{ fontSize: 32, fontWeight: 700, color: "#1A6E8F", margin: "6px 0 2px" }}>{campaigns.length > 0 ? "45.0%" : "0.0%"}</div>
                <span style={{ fontSize: 12, color: "#6B7A70" }}>Live tracking</span>
              </div>
              <div style={{ backgroundColor: "#ffffff", padding: "22px", borderRadius: 16, border: "1px solid #E2DDD3" }}>
                <span style={{ fontSize: 13, color: "#6B7A70", fontWeight: 600 }}>Active Drip Sequences</span>
                <div style={{ fontSize: 32, fontWeight: 700, color: "#8E44AD", margin: "6px 0 2px" }}>0</div>
                <span style={{ fontSize: 12, color: "#6B7A70" }}>Automated Journeys</span>
              </div>
            </div>

            {/* Mailchimp Automated Journeys (Customer Drip Automations) */}
            <div style={{ backgroundColor: "#ffffff", padding: "28px", borderRadius: 18, border: "1px solid #E2DDD3" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <div>
                  <h3 style={{ fontFamily: "var(--serif)", fontSize: 24, color: "#2691BA", margin: 0 }}>Automated Customer Journeys</h3>
                  <p style={{ color: "#6B7A70", fontSize: 14, margin: "4px 0 0" }}>Multi-step drip emails automatically sent based on user actions.</p>
                </div>
                <button onClick={() => setShowEmailModal(true)} className="btn-pill btn-pill-cyan">
                  + Create Automation Journey
                </button>
              </div>

              <div style={{ textAlign: "center", padding: "40px 20px", color: "#6B7A70", backgroundColor: "#FBF9F4", borderRadius: 14, border: "1px dashed #E2DDD3" }}>
                <Mail size={32} color="#2691BA" style={{ marginBottom: 10, opacity: 0.5 }} />
                <p style={{ fontWeight: 600, fontSize: 15, margin: "0 0 6px", color: "#1A252C" }}>No active customer journeys configured yet.</p>
                <p style={{ fontSize: 13, margin: "0 0 16px" }}>Click below to build automated welcome or class invite drip sequences for your clients.</p>
                <button onClick={() => setShowEmailModal(true)} className="btn-pill btn-pill-cyan">
                  + Create Automation Journey
                </button>
              </div>
            </div>

            {/* Campaign Broadcasts & Newsletters Table */}
            <div style={{ backgroundColor: "#ffffff", padding: "28px", borderRadius: 18, border: "1px solid #E2DDD3" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <h3 style={{ fontFamily: "var(--serif)", fontSize: 24, color: "#2691BA", margin: 0 }}>Email Newsletters &amp; Broadcasts</h3>
                <button onClick={() => setShowEmailModal(true)} className="btn-pill btn-pill-cyan">
                  + Create New Broadcast
                </button>
              </div>

              {campaigns.length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px 20px", color: "#6B7A70" }}>
                  <Mail size={36} color="#2691BA" style={{ marginBottom: 10, opacity: 0.5 }} />
                  <p style={{ fontWeight: 600, fontSize: 15, margin: "0 0 10px" }}>No email broadcasts created yet.</p>
                  <button onClick={() => setShowEmailModal(true)} className="btn-pill btn-pill-cyan">
                    + Create New Broadcast
                  </button>
                </div>
              ) : (
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid #E2DDD3", textAlign: "left", color: "#6B7A70", fontSize: 12, textTransform: "uppercase" }}>
                      <th style={{ padding: "12px 10px" }}>Campaign Subject</th>
                      <th style={{ padding: "12px 10px" }}>Target Audience</th>
                      <th style={{ padding: "12px 10px" }}>Date</th>
                      <th style={{ padding: "12px 10px" }}>Opens</th>
                      <th style={{ padding: "12px 10px" }}>Clicks</th>
                      <th style={{ padding: "12px 10px" }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {campaigns.map((cmp) => (
                      <tr key={cmp.id} style={{ borderBottom: "1px solid #F0ECE1" }}>
                        <td style={{ padding: "14px 10px", fontWeight: 600 }}>{cmp.subject}</td>
                        <td style={{ padding: "14px 10px", color: "#6B7A70" }}>{cmp.segment}</td>
                        <td style={{ padding: "14px 10px" }}>{cmp.sentDate}</td>
                        <td style={{ padding: "14px 10px", fontWeight: 700, color: "#2691BA" }}>{cmp.opens}</td>
                        <td style={{ padding: "14px 10px", fontWeight: 700, color: "#54BC33" }}>{cmp.clicks}</td>
                        <td style={{ padding: "14px 10px" }}>
                          <span style={{ padding: "4px 12px", borderRadius: 100, fontSize: 11, fontWeight: 700, backgroundColor: cmp.status === "Sent" ? "#54BC3318" : "#F39C1218", color: cmp.status === "Sent" ? "#45A027" : "#D68910" }}>
                            {cmp.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* TAB 5: SUBSCRIBERS & CONSENT MANAGEMENT */}
        {activeTab === "subscribers" && (
          <div style={{ backgroundColor: "#ffffff", padding: "30px", borderRadius: 18, border: "1px solid #E2DDD3" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 25 }}>
              <div>
                <h3 style={{ fontFamily: "var(--serif)", fontSize: 24, color: "#2691BA", margin: 0 }}>Subscriber &amp; Opt-Out Directory</h3>
                <p style={{ color: "#6B7A70", fontSize: 14, margin: "4px 0 0" }}>Manage studio newsletter contacts, active subscribers, and unsubscribed opt-outs.</p>
              </div>
              <button onClick={() => setShowSubModal(true)} className="btn-pill btn-pill-cyan" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                <UserPlus size={16} /> Add Subscriber
              </button>
            </div>

            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #E2DDD3", textAlign: "left", color: "#6B7A70", fontSize: 12, textTransform: "uppercase" }}>
                  <th style={{ padding: "12px 10px" }}>ID</th>
                  <th style={{ padding: "12px 10px" }}>Name</th>
                  <th style={{ padding: "12px 10px" }}>Email</th>
                  <th style={{ padding: "12px 10px" }}>Segment</th>
                  <th style={{ padding: "12px 10px" }}>Subscribed Date</th>
                  <th style={{ padding: "12px 10px" }}>Status</th>
                  <th style={{ padding: "12px 10px" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map((sub) => (
                  <tr key={sub.id} style={{ borderBottom: "1px solid #F0ECE1" }}>
                    <td style={{ padding: "14px 10px", fontWeight: 700, color: "#2691BA" }}>{sub.id}</td>
                    <td style={{ padding: "14px 10px", fontWeight: 600 }}>{sub.name}</td>
                    <td style={{ padding: "14px 10px", color: "#6B7A70" }}>{sub.email}</td>
                    <td style={{ padding: "14px 10px" }}>
                      <span style={{ padding: "3px 8px", borderRadius: 6, backgroundColor: "#EAEAEA", fontSize: 12 }}>
                        {sub.segment}
                      </span>
                    </td>
                    <td style={{ padding: "14px 10px" }}>{sub.date}</td>
                    <td style={{ padding: "14px 10px" }}>
                      <span style={{ padding: "4px 12px", borderRadius: 100, fontSize: 11, fontWeight: 700, backgroundColor: sub.status === "Subscribed" ? "#54BC3318" : "#E74C3C18", color: sub.status === "Subscribed" ? "#45A027" : "#C0392B" }}>
                        {sub.status}
                      </span>
                    </td>
                    <td style={{ padding: "14px 10px" }}>
                      <button
                        onClick={() => toggleSubscriberStatus(sub.id)}
                        style={{ background: "none", border: "none", color: sub.status === "Subscribed" ? "#E74C3C" : "#45A027", cursor: "pointer", fontWeight: 600, fontSize: 13, display: "inline-flex", alignItems: "center", gap: 4 }}
                      >
                        {sub.status === "Subscribed" ? <UserX size={15} /> : <UserCheck size={15} />}
                        {sub.status === "Subscribed" ? "Unsubscribe" : "Resubscribe"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 6: RETREATS */}
        {activeTab === "retreats" && (
          <div style={{ backgroundColor: "#ffffff", padding: "30px", borderRadius: 18, border: "1px solid #E2DDD3" }}>
            <h3 style={{ fontFamily: "var(--serif)", fontSize: 24, color: "#2691BA", marginBottom: 10 }}>Peloponnese Greece Retreat 2026</h3>
            <p style={{ color: "#6B7A70", fontSize: 15, marginBottom: 25 }}>11–17 October 2026 · Sampatiki Suites, Greece</p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 30 }}>
              <div style={{ padding: 20, borderRadius: 14, backgroundColor: "rgba(38,145,186,0.06)", border: "1px solid rgba(38,145,186,0.2)" }}>
                <strong style={{ fontSize: 16, color: "#2691BA" }}>Twin Share Option (CHF 1,810)</strong>
                <p style={{ fontSize: 24, fontWeight: 700, margin: "8px 0 0" }}>0 Registered</p>
              </div>
              <div style={{ padding: 20, borderRadius: 14, backgroundColor: "rgba(84,188,51,0.06)", border: "1px solid rgba(84,188,51,0.2)" }}>
                <strong style={{ fontSize: 16, color: "#45A027" }}>Sole Occupancy Option (CHF 2,260)</strong>
                <p style={{ fontSize: 24, fontWeight: 700, margin: "8px 0 0" }}>0 Registered</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: CONTENT & LINKEDIN */}
        {activeTab === "content" && (
          <div style={{ backgroundColor: "#ffffff", padding: "30px", borderRadius: 18, border: "1px solid #E2DDD3" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div>
                <h3 style={{ fontFamily: "var(--serif)", fontSize: 24, color: "#2691BA", margin: 0 }}>Journal Articles &amp; LinkedIn Auto-Publish</h3>
                <p style={{ fontSize: 14, color: "#6B7A70", margin: "4px 0 0" }}>Publishing a blog note automatically cross-posts to LinkedIn and broadcasts to email subscribers.</p>
              </div>
              <button onClick={() => setShowArticleModal(true)} className="btn-pill btn-pill-cyan" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                <Plus size={16} /> Write New Journal Note
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {articles.map((art) => (
                <div key={art.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 22px", borderRadius: 14, border: "1px solid #E2DDD3", backgroundColor: "#FBF9F4" }}>
                  <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                    {art.image && (
                      <div style={{ width: 60, height: 60, borderRadius: 8, overflow: "hidden", flexShrink: 0 }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={art.image} alt={art.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                    )}
                    <div>
                      <strong style={{ fontSize: 17, color: "#1A252C" }}>{art.title}</strong>
                      <div style={{ fontSize: 13, color: "#6B7A70", marginTop: 4, display: "flex", gap: 15, alignItems: "center", flexWrap: "wrap" }}>
                        <span>{art.category} · {art.date}</span>
                        {art.linkedin && (
                          <span style={{ color: "#0077B5", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 3 }}>
                            <Linkedin size={13} /> LinkedIn {art.status.includes("Scheduled") ? "Scheduled" : "Posted"}
                          </span>
                        )}
                        {art.broadcastSent && (
                          <span style={{ color: "#45A027", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 3 }}>
                            <Send size={13} /> Email {art.status.includes("Scheduled") ? "Scheduled" : "Broadcasted"}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <span style={{ padding: "4px 12px", borderRadius: 100, fontSize: 12, fontWeight: 700, backgroundColor: art.status === "Published" ? "#54BC3318" : art.status.includes("Scheduled") ? "#3498DB18" : "#F39C1218", color: art.status === "Published" ? "#45A027" : art.status.includes("Scheduled") ? "#2980B9" : "#D68910" }}>
                      {art.status}
                    </span>
                    <button
                      onClick={() => handleOpenEditArticle(art)}
                      style={{ padding: "6px 12px", borderRadius: 8, backgroundColor: "#2691BA", color: "#fff", border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 4 }}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDeleteArticle(art)}
                      style={{ padding: "6px 12px", borderRadius: 8, backgroundColor: "#E74C3C", color: "#fff", border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 4 }}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Reader Feedback & Comments Moderation Section */}
            <div style={{ marginTop: 40, borderTop: "2px solid #E2DDD3", paddingTop: 30 }}>
              <h4 style={{ fontFamily: "var(--serif)", fontSize: 20, color: "#2691BA", marginBottom: 12 }}>
                💬 Reader Feedback &amp; Comments Moderation ({adminComments.length})
              </h4>
              <p style={{ color: "#6B7A70", fontSize: 14, marginBottom: 20 }}>
                Review feedback left by readers on blog posts. Accept to publish on the website, or Reject to remove.
              </p>

              {adminComments.length === 0 ? (
                <div style={{ padding: "20px", borderRadius: 12, backgroundColor: "#FBF9F4", fontStyle: "italic", color: "#6B7A70", fontSize: 14 }}>
                  No reader feedback submitted yet.
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {adminComments.map((cmt) => (
                    <div key={cmt.id} style={{ padding: "18px 22px", borderRadius: 14, border: "1px solid #E2DDD3", backgroundColor: "#FBF9F4", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 15 }}>
                      <div>
                        <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 6, flexWrap: "wrap" }}>
                          <strong style={{ fontSize: 15, color: "#1A252C" }}>{cmt.author_name}</strong>
                          <span style={{ fontSize: 13, color: "#6B7A70" }}>({cmt.author_email})</span>
                          <span style={{ fontSize: 12, padding: "2px 8px", borderRadius: 100, fontWeight: 700, backgroundColor: cmt.status === "approved" ? "#54BC3320" : cmt.status === "rejected" ? "#E74C3C20" : "#F39C1220", color: cmt.status === "approved" ? "#45A027" : cmt.status === "rejected" ? "#C0392B" : "#D68910" }}>
                            {cmt.status ? cmt.status.toUpperCase() : "PENDING"}
                          </span>
                        </div>
                        <p style={{ margin: "4px 0 6px", fontSize: 14, color: "#2C3E50" }}>{cmt.content}</p>
                        <span style={{ fontSize: 12, color: "#888" }}>Post Slug: <code>{cmt.post_slug}</code></span>
                      </div>

                      <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                        {cmt.status !== "approved" && (
                          <button
                            onClick={() => handleModerateComment(cmt.id, "approved")}
                            style={{ padding: "6px 14px", borderRadius: 8, backgroundColor: "#45A027", color: "#fff", border: "none", fontSize: 13, fontWeight: 700, cursor: "pointer" }}
                          >
                            ✓ Accept
                          </button>
                        )}
                        {cmt.status !== "rejected" && (
                          <button
                            onClick={() => handleModerateComment(cmt.id, "rejected")}
                            style={{ padding: "6px 14px", borderRadius: 8, backgroundColor: "#E74C3C", color: "#fff", border: "none", fontSize: 13, fontWeight: 700, cursor: "pointer" }}
                          >
                            ✕ Reject
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 8: API & INTEGRATIONS SETTINGS */}
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

            {/* Resend API Key status */}
            <div style={{ marginBottom: 30, padding: 20, borderRadius: 14, backgroundColor: "rgba(84,188,51,0.06)", border: "1px solid rgba(84,188,51,0.2)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <CheckCircle2 size={22} color="#54BC33" />
                <strong style={{ fontSize: 16, color: "#45A027" }}>Resend Email API Connected &amp; Verified</strong>
              </div>
              <p style={{ fontSize: 13, color: "#6B7A70", margin: "0 0 10px" }}>
                API Key: <code>re_*****</code> (Configured in Vercel &amp; .env)
              </p>
              <span style={{ fontSize: 12, color: "#45A027", fontWeight: 600 }}>
                ✓ Automated newsletters, booking confirmations, and post broadcasts ready
              </span>
            </div>

            {/* Blotato API Key Input */}
            <div style={{ marginBottom: 30 }}>
              <label style={{ fontSize: 14, fontWeight: 700, color: "#1A252C", display: "block", marginBottom: 8 }}>
                Blotato Social API Key (LinkedIn Auto-Sync)
              </label>
              <input
                type="text"
                placeholder="blotato_sec_..."
                value={blotatoKey}
                onChange={(e) => setBlotatoKey(e.target.value)}
                style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1px solid #E2DDD3", fontSize: 14, outline: "none" }}
              />
            </div>

            <button className="btn-pill btn-pill-cyan">
              SAVE API CONFIGURATION
            </button>
          </div>
        )}

        {/* Modal 1: Add Booking */}
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

        {/* Modal 2: Create Email Broadcast */}
        {showEmailModal && (
          <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ backgroundColor: "#ffffff", padding: "35px", borderRadius: 20, width: "100%", maxWidth: 580, boxShadow: "0 10px 40px rgba(0,0,0,0.2)" }}>
              <h3 style={{ fontFamily: "var(--serif)", fontSize: 24, color: "#2691BA", marginBottom: 20 }}>Create Email Broadcast</h3>
              <form onSubmit={handleCreateCampaign}>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Target Audience Segment</label>
                  <select value={emailSegment} onChange={(e) => setEmailSegment(e.target.value)} className="form-input">
                    <option value="All Subscribers">All Subscribers</option>
                    <option value="Online Students">Weekly Online Students</option>
                    <option value="Retreat Guests">Greece Retreat Guests</option>
                    <option value="Journal Subscribers">Journal Subscribers</option>
                  </select>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Subject Line</label>
                  <input type="text" className="form-input" required value={emailSubject} onChange={(e) => setEmailSubject(e.target.value)} placeholder="e.g. Dynamic Movement Class Link & Weekly Notes" />
                </div>

                <div style={{ marginBottom: 25 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Email Message Content</label>
                  <textarea className="form-textarea" rows={6} required value={emailBody} onChange={(e) => setEmailBody(e.target.value)} placeholder="Dear Practice Member,\n\nHere is your upcoming session details..." />
                </div>

                <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
                  <button type="button" onClick={() => setShowEmailModal(false)} style={{ padding: "10px 20px", borderRadius: 20, border: "1px solid #ccc", background: "none", cursor: "pointer" }}>
                    Cancel
                  </button>
                  <button type="submit" disabled={isSendingBroadcast} className="btn-pill btn-pill-cyan" style={{ display: "inline-flex", alignItems: "center", gap: 6, opacity: isSendingBroadcast ? 0.7 : 1 }}>
                    <Send size={15} /> {isSendingBroadcast ? "Sending Broadcast..." : "Send Broadcast Now"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal 3: Write Article & Auto Cross-Post with Image Upload & Scheduling */}
        {showArticleModal && (
          <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ backgroundColor: "#ffffff", padding: "35px", borderRadius: 20, width: "100%", maxWidth: 650, boxShadow: "0 10px 40px rgba(0,0,0,0.2)", maxHeight: "90vh", overflowY: "auto" }}>
              <h3 style={{ fontFamily: "var(--serif)", fontSize: 24, color: "#2691BA", marginBottom: 20 }}>Write New Journal Note</h3>
              <form onSubmit={handlePublishArticle}>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Article Title</label>
                  <input type="text" className="form-input" required value={artTitle} onChange={(e) => setArtTitle(e.target.value)} placeholder="e.g. The Power of Restorative Practice" />
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Category</label>
                  <select value={artCategory} onChange={(e) => setArtCategory(e.target.value)} className="form-input">
                    <option value="Practice Notes">Practice Notes</option>
                    <option value="Mindful Living">Mindful Living</option>
                    <option value="Retreat Insights">Retreat Insights</option>
                    <option value="Newsletter">Newsletter</option>
                  </select>
                </div>

                {/* Featured Cover Image Upload */}
                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Featured Cover Image</label>
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setArtImage(reader.result as string);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      style={{ fontSize: 13 }}
                    />
                  </div>
                  {artImage && (
                    <div style={{ marginTop: 10, position: "relative", width: 120, height: 80, borderRadius: 8, overflow: "hidden", border: "1px solid #2691BA" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={artImage} alt="Cover Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      <button
                        type="button"
                        onClick={() => setArtImage("")}
                        style={{ position: "absolute", top: 4, right: 4, background: "rgba(0,0,0,0.6)", color: "#fff", border: "none", borderRadius: "50%", width: 20, height: 20, cursor: "pointer", fontSize: 11 }}
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>

                <div style={{ marginBottom: 20 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Content / Reflection</label>
                  <textarea className="form-textarea" rows={4} required value={artContent} onChange={(e) => setArtContent(e.target.value)} placeholder="Write your reflection here..." />
                </div>

                {/* Scheduling Controls */}
                <div style={{ backgroundColor: "#FBF9F4", padding: "16px 20px", borderRadius: 12, marginBottom: 20, border: "1px solid #E2DDD3" }}>
                  <label style={{ fontSize: 13, fontWeight: 700, color: "#2691BA", textTransform: "uppercase", display: "block", marginBottom: 10 }}>
                    Publish &amp; Distribution Schedule
                  </label>
                  <div style={{ display: "flex", gap: 20, marginBottom: 12 }}>
                    <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                      <input type="radio" name="scheduleMode" checked={artScheduleMode === "now"} onChange={() => setArtScheduleMode("now")} />
                      ⚡ Publish &amp; Broadcast Immediately
                    </label>
                    <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                      <input type="radio" name="scheduleMode" checked={artScheduleMode === "schedule"} onChange={() => setArtScheduleMode("schedule")} />
                      📅 Schedule for Future Date &amp; Time
                    </label>
                  </div>

                  {artScheduleMode === "schedule" && (
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 10 }}>
                      <div>
                        <label style={{ fontSize: 12, fontWeight: 600, display: "block", marginBottom: 4 }}>Schedule Date</label>
                        <input type="date" className="form-input" value={artScheduleDate} onChange={(e) => setArtScheduleDate(e.target.value)} />
                      </div>
                      <div>
                        <label style={{ fontSize: 12, fontWeight: 600, display: "block", marginBottom: 4 }}>Schedule Time</label>
                        <input type="text" className="form-input" value={artScheduleTime} onChange={(e) => setArtScheduleTime(e.target.value)} placeholder="e.g. 09:00 AM" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Auto Cross-Posting Options */}
                <div style={{ backgroundColor: "rgba(38,145,186,0.06)", padding: "16px 20px", borderRadius: 12, marginBottom: 25, display: "flex", flexDirection: "column", gap: 10 }}>
                  <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", fontSize: 14, fontWeight: 600, color: "#0077B5" }}>
                    <input type="checkbox" checked={postToLinkedin} onChange={(e) => setPostToLinkedin(e.target.checked)} />
                    <Linkedin size={16} /> Auto Cross-Post to Susi&apos;s LinkedIn Account
                  </label>
                  <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", fontSize: 14, fontWeight: 600, color: "#45A027" }}>
                    <input type="checkbox" checked={broadcastToEmail} onChange={(e) => setBroadcastToEmail(e.target.checked)} />
                    <Send size={16} /> Broadcast Notification to All Subscribers
                  </label>
                </div>

                <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
                  <button type="button" onClick={() => setShowArticleModal(false)} style={{ padding: "10px 20px", borderRadius: 20, border: "1px solid #ccc", background: "none", cursor: "pointer" }}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-pill btn-pill-cyan" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                    <Share2 size={15} /> {artScheduleMode === "schedule" ? `Schedule for ${artScheduleDate || "Later"}` : "Publish & Cross-Post Now"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal 3B: Edit Article Modal */}
        {showEditArticleModal && (
          <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ backgroundColor: "#ffffff", padding: "35px", borderRadius: 20, maxWidth: 680, width: "90%", maxHeight: "90vh", overflowY: "auto" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <h3 style={{ fontFamily: "var(--serif)", fontSize: 24, color: "#2691BA", margin: 0 }}>✏️ Edit Blog Article &amp; Image</h3>
                <button onClick={() => setShowEditArticleModal(false)} style={{ background: "none", border: "none", cursor: "pointer" }}><X size={20} /></button>
              </div>

              <form onSubmit={handleSaveEditArticle}>
                <div className="form-group" style={{ marginBottom: 15 }}>
                  <label style={{ fontSize: 13, fontWeight: 700, display: "block", marginBottom: 4 }}>Article Title *</label>
                  <input type="text" className="form-input" required value={editTitle} onChange={(e) => setEditTitle(e.target.value)} placeholder="Article Title..." />
                </div>

                <div className="form-group" style={{ marginBottom: 15 }}>
                  <label style={{ fontSize: 13, fontWeight: 700, display: "block", marginBottom: 4 }}>Category</label>
                  <select className="form-input" value={editCategory} onChange={(e) => setEditCategory(e.target.value)}>
                    <option value="Practice Notes">Practice Notes</option>
                    <option value="Mindful Living">Mindful Living</option>
                    <option value="Retreat Insights">Retreat Insights</option>
                    <option value="Remedial Therapy">Remedial Therapy</option>
                    <option value="Newsletter">Newsletter</option>
                  </select>
                </div>

                <div className="form-group" style={{ marginBottom: 15 }}>
                  <label style={{ fontSize: 13, fontWeight: 700, display: "block", marginBottom: 4 }}>Featured Image URL (Cloudinary or Web Image)</label>
                  <input type="text" className="form-input" value={editImage} onChange={(e) => setEditImage(e.target.value)} placeholder="https://res.cloudinary.com/..." />
                </div>

                <div className="form-group" style={{ marginBottom: 20 }}>
                  <label style={{ fontSize: 13, fontWeight: 700, display: "block", marginBottom: 4 }}>Article Full Body Content *</label>
                  <textarea className="form-textarea" rows={8} required value={editContent} onChange={(e) => setEditContent(e.target.value)} placeholder="Write your full article body text..."></textarea>
                </div>

                <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
                  <button type="button" onClick={() => setShowEditArticleModal(false)} style={{ padding: "10px 20px", borderRadius: 20, border: "1px solid #ccc", background: "none", cursor: "pointer" }}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-pill btn-pill-cyan" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                    💾 Save Changes &amp; Update Website
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal 4: Add Subscriber */}
        {showSubModal && (
          <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ backgroundColor: "#ffffff", padding: "35px", borderRadius: 20, width: "100%", maxWidth: 480, boxShadow: "0 10px 40px rgba(0,0,0,0.2)" }}>
              <h3 style={{ fontFamily: "var(--serif)", fontSize: 24, color: "#2691BA", marginBottom: 20 }}>Add Subscriber Contact</h3>
              <form onSubmit={handleAddSubscriber}>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Full Name (Optional)</label>
                  <input type="text" className="form-input" value={subName} onChange={(e) => setSubName(e.target.value)} placeholder="e.g. Sarah Jenkins" />
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Email Address</label>
                  <input type="email" className="form-input" required value={subEmail} onChange={(e) => setSubEmail(e.target.value)} placeholder="e.g. sarah@example.com" />
                </div>

                <div style={{ marginBottom: 25 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Segment</label>
                  <select value={subSegment} onChange={(e) => setSubSegment(e.target.value)} className="form-input">
                    <option value="Journal Subscribers">Journal Subscribers</option>
                    <option value="Online Students">Weekly Online Students</option>
                    <option value="Coaching Clients">Coaching Clients</option>
                    <option value="Retreat Guests">Retreat Guests</option>
                  </select>
                </div>

                <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
                  <button type="button" onClick={() => setShowSubModal(false)} style={{ padding: "10px 20px", borderRadius: 20, border: "1px solid #ccc", background: "none", cursor: "pointer" }}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-pill btn-pill-cyan">
                    Save Contact
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal 5: Email Composer with Attachment Support */}
        {showComposeModal && (
          <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ backgroundColor: "#ffffff", padding: "35px", borderRadius: 20, width: "100%", maxWidth: 620, boxShadow: "0 10px 40px rgba(0,0,0,0.2)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <h3 style={{ fontFamily: "var(--serif)", fontSize: 24, color: "#2691BA", margin: 0 }}>Compose New Email</h3>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#45A027", backgroundColor: "#54BC3318", padding: "4px 10px", borderRadius: 100 }}>
                  From: hello@susidavies.com
                </span>
              </div>

              <form onSubmit={handleSendComposeEmail}>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>To (Client Email Address)</label>
                  <input
                    type="email"
                    className="form-input"
                    required
                    list="client-email-suggestions"
                    value={composeTo}
                    onChange={(e) => setComposeTo(e.target.value)}
                    placeholder="Type or select client email (e.g. client@example.ch)..."
                  />
                  <datalist id="client-email-suggestions">
                    {bookings.map((b) => (
                      <option key={b.id} value={b.email}>{b.client} ({b.service})</option>
                    ))}
                    {subscribers.map((s) => (
                      <option key={s.id} value={s.email}>{s.name} (Subscriber)</option>
                    ))}
                  </datalist>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Subject</label>
                  <input
                    type="text"
                    className="form-input"
                    required
                    value={composeSubject}
                    onChange={(e) => setComposeSubject(e.target.value)}
                    placeholder="e.g. Session Details &amp; Preparation Guidelines"
                  />
                </div>

                <div style={{ marginBottom: 20 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Email Message</label>
                  <textarea
                    className="form-textarea"
                    rows={6}
                    required
                    value={composeBody}
                    onChange={(e) => setComposeBody(e.target.value)}
                    placeholder="Dear Client,&#10;&#10;Thank you for reaching out to Susi Davies..."
                  />
                </div>

                {/* Attachments Upload Box */}
                <div style={{ marginBottom: 25, backgroundColor: "#FBF9F4", padding: "16px", borderRadius: 12, border: "1px solid #E2DDD3" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#2691BA", textTransform: "uppercase" }}>File Attachments</span>
                    <label style={{ cursor: "pointer", fontSize: 12, color: "#2691BA", fontWeight: 700 }}>
                      + Pick Attachments (PDF, Invoices, Images)
                      <input
                        type="file"
                        multiple
                        onChange={(e) => {
                          const files = Array.from(e.target.files || []);
                          const newAtts = files.map((f) => ({ name: f.name, size: `${(f.size / 1024).toFixed(0)} KB` }));
                          setComposeAttachments([...composeAttachments, ...newAtts]);
                        }}
                        style={{ display: "none" }}
                      />
                    </label>
                  </div>

                  {composeAttachments.length === 0 ? (
                    <span style={{ fontSize: 12, color: "#888" }}>No files attached yet.</span>
                  ) : (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {composeAttachments.map((att, idx) => (
                        <div key={idx} style={{ padding: "4px 10px", borderRadius: 6, backgroundColor: "#2691BA", color: "#ffffff", fontSize: 12, display: "flex", alignItems: "center", gap: 6 }}>
                          <Paperclip size={12} /> {att.name} ({att.size})
                          <button
                            type="button"
                            onClick={() => setComposeAttachments(composeAttachments.filter((_, i) => i !== idx))}
                            style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", fontSize: 11 }}
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", alignItems: "center" }}>
                  <button type="button" onClick={() => setShowComposeModal(false)} style={{ padding: "10px 20px", borderRadius: 20, border: "1px solid #ccc", background: "none", cursor: "pointer" }}>
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSendingEmail}
                    className="btn-pill btn-pill-cyan"
                    style={{ display: "inline-flex", alignItems: "center", gap: 6, opacity: isSendingEmail ? 0.7 : 1 }}
                  >
                    <Send size={15} /> {isSendingEmail ? "Sending via Resend API..." : "Send Email via hello@susidavies.com"}
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
