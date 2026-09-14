import "server-only";

const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;
const requestLog = new Map<string, number[]>();

export function getClientIp(req: Request) {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

export function isAllowedPublicOrigin(req: Request) {
  const origin = req.headers.get("origin");
  const host = req.headers.get("host")?.split(":")[0].toLowerCase();
  if (!origin || !host) return false;

  try {
    const originUrl = new URL(origin);
    if (originUrl.hostname === "localhost" || originUrl.hostname === "127.0.0.1") {
      return host === "localhost" || host === "127.0.0.1";
    }
    return (
      originUrl.protocol === "https:" &&
      originUrl.hostname === host &&
      (host === "susidavies.com" || host === "www.susidavies.com" || host.endsWith(".vercel.app"))
    );
  } catch {
    return false;
  }
}

export function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (requestLog.get(ip) || []).filter((timestamp) => now - timestamp < WINDOW_MS);
  recent.push(now);
  requestLog.set(ip, recent);

  if (requestLog.size > 2_000) {
    for (const [key, timestamps] of requestLog) {
      if (!timestamps.some((timestamp) => now - timestamp < WINDOW_MS)) requestLog.delete(key);
    }
  }

  return recent.length > MAX_REQUESTS_PER_WINDOW;
}

export function cleanText(value: unknown, maxLength: number) {
  return typeof value === "string"
    ? value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim().slice(0, maxLength)
    : "";
}

export function isValidEmail(value: string) {
  return value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(value);
}

export function looksLikeAutomatedJunk(name: string, email: string, message: string) {
  const compactMessage = message.replace(/\s/g, "");
  const noWordBreaks = message.length >= 12 && !/\s/.test(message);
  const mixedRandomCase = /[a-z]/.test(message) && /[A-Z]/.test(message);
  const longConsonantRun = /[bcdfghjklmnpqrstvwxyz]{6,}/i.test(compactMessage);
  const randomName = name
    .split(/\s+/)
    .filter(Boolean)
    .some((part) => part.length >= 5 && /[bcdfghjklmnpqrstvwxyz]{5,}/i.test(part));
  const emailParts = email.split("@")[0].split(".");
  const machineLikeEmail = emailParts.length >= 3 && emailParts.filter((part) => part.length <= 3).length >= 2;

  return Number(noWordBreaks) + Number(mixedRandomCase && longConsonantRun) + Number(randomName) + Number(machineLikeEmail) >= 2;
}

export function isPlausibleFormTiming(startedAt: unknown) {
  if (typeof startedAt !== "number" || !Number.isFinite(startedAt)) return false;
  const elapsed = Date.now() - startedAt;
  return elapsed >= 3_000 && elapsed <= 2 * 60 * 60 * 1000;
}
