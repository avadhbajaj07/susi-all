import { NextResponse } from "next/server";
import { insertSupabaseContact } from "@/lib/supabase-api";
import { sendBrandedEmail } from "@/lib/email-service";
import {
  cleanText,
  getClientIp,
  isAllowedPublicOrigin,
  isPlausibleFormTiming,
  isRateLimited,
  isValidEmail,
  looksLikeAutomatedJunk,
} from "@/lib/public-form-security";

const INTERNAL_EMAIL = "susidavies@gmail.com";
const WORKSHOP_DATES = new Set([
  "Thursday, 28 January 2027",
  "Thursday, 10 September 2026",
  "Thursday, 29 October 2026",
  "Thursday, 3 December 2026",
]);
const BOOKING_SESSIONS: Record<string, { title: string; price: string }> = {
  "private-yoga": { title: "1-on-1 Private Yoga Session", price: "CHF 150" },
  "coaching-mentoring": { title: "Life Coaching & Mentoring", price: "CHF 180" },
  "teacher-development": { title: "Teacher Mentoring & Art of Teaching", price: "CHF 200" },
  "online-class": { title: "Weekly Online Class Pass", price: "CHF 25" },
};
const TIME_SLOTS: Record<string, string> = {
  "tue-midday": "Tuesday 11:45 – 12:45 (Live Online Class)",
  "wed-morning": "Wednesday 09:00 – 10:00 (Live Online Class)",
  "mon-evening": "Monday 18:30 – 19:30 (Live Online Class)",
  morning: "Morning (09:00 – 12:00)",
  afternoon: "Afternoon (14:00 – 17:00)",
  evening: "Evening (18:00 – 20:00)",
};
const PRIVATE_SESSION_FOCUS = new Set([
  "Movement Therapy",
  "Remedial Therapy",
  "Yoga & Functional Movement",
  "Breathwork & Nervous System",
  "Fascia Release",
  "Meditation & Relaxation",
  "Combined / Let Susi Guide",
]);
const PRIVATE_SESSION_TIMES = new Set(["", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"]);

type PreparedSubmission = {
  name: string;
  email: string;
  message: string;
  internalSubject: string;
  internalBody: string;
  confirmationSubject: string;
  confirmationBody: string;
  segment?: string;
};

function prepareSubmission(kind: string, fields: Record<string, unknown>): PreparedSubmission | null {
  const name = cleanText(fields.name, 100);
  const email = cleanText(fields.email, 254).toLowerCase();
  const phone = cleanText(fields.phone, 40);
  const message = cleanText(fields.message, 4_000);
  const subscribed = fields.subscribeNewsletter === true;
  const optIn = subscribed ? "YES (Subscribed)" : "No";

  if (!isValidEmail(email)) return null;

  if (kind === "booking") {
    const session = BOOKING_SESSIONS[cleanText(fields.sessionId, 50)];
    const date = cleanText(fields.date, 10);
    const timeSlot = TIME_SLOTS[cleanText(fields.timeSlot, 30)];
    const dateValue = new Date(`${date}T00:00:00`);
    const yesterday = new Date();
    yesterday.setHours(0, 0, 0, 0);
    yesterday.setDate(yesterday.getDate() - 1);
    const phoneDigits = phone.replace(/\D/g, "");
    const isOnlineSlot = fields.timeSlot === "wed-morning" || fields.timeSlot === "mon-evening";
    if (
      !name ||
      phoneDigits.length < 7 ||
      phoneDigits.length > 15 ||
      !session ||
      !timeSlot ||
      (fields.sessionId === "online-class") !== isOnlineSlot ||
      !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
      Number.isNaN(dateValue.getTime()) ||
      dateValue < yesterday
    ) return null;
    return {
      name, email, message,
      internalSubject: `New Booking Request: ${session.title} - ${name}`,
      internalBody: `New session booking request received on susidavies.com:\n\nClient Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nSession: ${session.title} (${session.price})\nDate: ${date}\nTime Slot: ${timeSlot}\nNewsletter Opt-in: ${optIn}\n\nClient Notes:\n${message || "None"}`,
      confirmationSubject: `Booking Request Confirmation: ${session.title}`,
      confirmationBody: `Dear ${name},\n\nThank you for requesting to join "${session.title}" with Susi Davies! We have received your booking request for ${date} (${timeSlot}), and our team will connect with you within 24 hours to confirm your reservation and share session details.\n\nWarm regards,\nSusi Davies Studio\nhttps://susidavies.com`,
      segment: subscribed ? session.title : undefined,
    };
  }

  if (kind === "workshop") {
    const selectedDates = Array.isArray(fields.selectedDates)
      ? fields.selectedDates.map((date) => cleanText(date, 60)).filter((date) => WORKSHOP_DATES.has(date))
      : [];
    if (!name || selectedDates.length === 0 || selectedDates.length !== (fields.selectedDates as unknown[])?.length) return null;
    const total = selectedDates.length * 60;
    const datesText = selectedDates.map((date, index) => `  ${index + 1}. ${date} · 18:30 – 20:30`).join("\n");
    return {
      name, email, message,
      internalSubject: `The Essence of Vinyasa Flow Workshop Registration — ${name}`,
      internalBody: `New Workshop Registration (The Essence of Vinyasa Flow)\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || "Not provided"}\n\nSelected Workshop:\n${datesText}\n\nTotal: CHF ${total}.– (${selectedDates.length} workshop${selectedDates.length === 1 ? "" : "s"})\nNewsletter Opt-in: ${optIn}\n\nMessage:\n${message || "None"}`,
      confirmationSubject: "Your Workshop Registration: The Essence of Vinyasa Flow — Susi Davies",
      confirmationBody: `Dear ${name},\n\nThank you for registering for "The Essence of Vinyasa Flow" workshop with Susi Davies! We have received your registration and our team will connect with you within 24 hours.\n\nWorkshop Details:\n${datesText}\n\nTime: 18:30 – 20:30\nVenue: BODYTALKS, Alte Landstrasse 32, Thalwil\nTotal: CHF ${total}.– (payable via TWINT)\n\nSusi will be in touch shortly to confirm your reservation and share payment details.\n\nWith warmth,\nSusi Davies & Team\nhttps://susidavies.com`,
      segment: subscribed ? "Workshop Registrant" : undefined,
    };
  }

  if (kind === "private-session") {
    const mode = fields.mode === "online" ? "online" : fields.mode === "in-person" ? "in-person" : "";
    const focus = cleanText(fields.focus, 100);
    const preferredDate = cleanText(fields.date, 10) || "Flexible";
    const preferredTime = cleanText(fields.time, 30) || "Flexible";
    const location = cleanText(fields.location, 300);
    const requestedDate = preferredDate === "Flexible" ? null : new Date(`${preferredDate}T00:00:00`);
    const earliestDate = new Date();
    earliestDate.setHours(0, 0, 0, 0);
    earliestDate.setDate(earliestDate.getDate() - 1);
    const phoneDigits = phone.replace(/\D/g, "");
    if (
      !name ||
      !mode ||
      !PRIVATE_SESSION_FOCUS.has(focus) ||
      !PRIVATE_SESSION_TIMES.has(preferredTime === "Flexible" ? "" : preferredTime) ||
      (phone && (phoneDigits.length < 7 || phoneDigits.length > 15)) ||
      (requestedDate && (!/^\d{4}-\d{2}-\d{2}$/.test(preferredDate) || Number.isNaN(requestedDate.getTime()) || requestedDate < earliestDate))
    ) return null;
    const modeLabel = mode === "in-person" ? "In-Person Session" : "Online Session (Video Call)";
    const locationLine = mode === "in-person" ? `Location: ${location || "Client's location / to be confirmed"}` : "Session Format: Online — Video Call";
    return {
      name, email, message,
      internalSubject: `Private Session Booking Request — ${name}`,
      internalBody: `New Private Session Booking Request\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || "Not provided"}\nSession Type: ${modeLabel}\nFocus Area: ${focus}\nPreferred Date: ${preferredDate}\nPreferred Time: ${preferredTime}\n${locationLine}\nNewsletter Opt-in: ${optIn}\n\nAdditional Notes:\n${message || "None"}`,
      confirmationSubject: "Your Private Session Request — Susi Davies",
      confirmationBody: `Dear ${name},\n\nThank you for reaching out! Your private session booking request (${focus}) has been received.\n\nSusi will personally get back to you within 24 hours to confirm your session details.\n\nSession Focus: ${focus}\nFormat: ${modeLabel}\n\nWith warmth,\nSusi Davies & Team\nhttps://susidavies.com`,
      segment: subscribed ? `Private Session (${focus})` : undefined,
    };
  }

  const inquiryConfig: Record<string, { label: string; subject: string; confirmation: string; segment: string }> = {
    contact: { label: "contact inquiry", subject: "New Contact Form Submission", confirmation: "Thank You for Contacting Susi Davies", segment: "Contact Us Form" },
    home: { label: "website inquiry", subject: "New Website Inquiry", confirmation: "Thank You for Contacting Susi Davies", segment: "Homepage Contact Inquiry" },
    app: { label: "Dynamic Yoga App inquiry", subject: "New App Inquiry", confirmation: "Thank You for Contacting Susi Davies Studio", segment: "Dynamic Yoga App Inquiry" },
    "blog-comment": { label: `comment on blog article (${cleanText(fields.slug, 160)})`, subject: "New Article Comment", confirmation: "Thank You for Your Feedback to Susi Davies", segment: "Blog Reader Feedback" },
  };
  const config = inquiryConfig[kind];
  if (config && name && message) {
    return {
      name, email, message,
      internalSubject: `${config.subject} from ${name}`,
      internalBody: `New ${config.label} received on susidavies.com:\n\nName: ${name}\nEmail: ${email}\nNewsletter Opt-in: ${optIn}\n\nMessage:\n${message}`,
      confirmationSubject: config.confirmation,
      confirmationBody: `Dear ${name},\n\nThank you for reaching out to Susi Davies! We have received your message and our team will get back to you within 24 hours.\n\nWarm regards,\nSusi Davies & Team\nhttps://susidavies.com`,
      segment: subscribed ? config.segment : undefined,
    };
  }

  if (kind === "journal-subscription") {
    return {
      name: email.split("@")[0], email, message: "",
      internalSubject: `New Journal Subscriber: ${email}`,
      internalBody: `New subscriber joined Susi's Journal on susidavies.com:\n\nEmail: ${email}\nStatus: Subscribed`,
      confirmationSubject: "Welcome to Susi Davies' Journal",
      confirmationBody: "Dear Subscriber,\n\nThank you for subscribing to Susi Davies' Journal! You will now receive Susi's practice notes, movement guidance, and retreat announcements directly in your inbox.\n\nWarm regards,\nSusi Davies & Team\nhttps://susidavies.com",
      segment: "Journal Subscriber",
    };
  }

  return null;
}

export async function POST(req: Request) {
  if (!isAllowedPublicOrigin(req)) return NextResponse.json({ error: "Request origin not allowed." }, { status: 403 });
  if (!req.headers.get("content-type")?.startsWith("application/json")) return NextResponse.json({ error: "Invalid content type." }, { status: 415 });
  if (Number(req.headers.get("content-length") || 0) > 20_000) return NextResponse.json({ error: "Request too large." }, { status: 413 });

  const ip = getClientIp(req);
  if (isRateLimited(ip)) return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });

  try {
    const payload = await req.json();
    if (cleanText(payload.website, 200)) return NextResponse.json({ success: true });
    if (!isPlausibleFormTiming(payload.startedAt)) return NextResponse.json({ error: "Please wait a moment and try again." }, { status: 400 });

    const submission = prepareSubmission(cleanText(payload.kind, 40), payload.fields || {});
    if (!submission) return NextResponse.json({ error: "Please check the form details." }, { status: 400 });
    if (looksLikeAutomatedJunk(submission.name, submission.email, submission.message)) return NextResponse.json({ success: true });

    const country = req.headers.get("x-vercel-ip-country") || "Unknown";
    await sendBrandedEmail({
      to: INTERNAL_EMAIL,
      subject: submission.internalSubject,
      body: `${submission.internalBody}\n\n----------------------------------------\nSubmission security details:\nIP Address: ${ip}\nCountry / Region: ${country}`,
      fromName: "Susi Davies Website",
    });
    await sendBrandedEmail({
      to: submission.email,
      subject: submission.confirmationSubject,
      body: submission.confirmationBody,
      fromName: "Susi Davies Studio",
      recipientName: submission.name,
    });

    if (submission.segment) {
      await insertSupabaseContact({ name: submission.name, email: submission.email, segment: submission.segment }).catch((error) => {
        console.error("Subscriber save failed:", error);
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Public form submission failed:", error);
    return NextResponse.json({ error: "Unable to submit the form right now." }, { status: 500 });
  }
}
