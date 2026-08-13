import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { apiKey } = await req.json();

    if (!apiKey || !apiKey.trim()) {
      return NextResponse.json({ error: "API key is required" }, { status: 400 });
    }

    const cleanKey = apiKey.trim();
    const vercelToken = process.env.VERCEL_TOKEN || process.env.VERCEL_BEARER_TOKEN;
    const vercelProjectId = process.env.VERCEL_PROJECT_ID || "prj_2sAwDEGzNGg5Ay3weYuECMEkgWJZ";

    if (vercelToken) {
      // 1. Fetch existing env vars to check if BLOTATO_API_KEY exists
      const listRes = await fetch(`https://api.vercel.com/v10/projects/${vercelProjectId}/env`, {
        headers: { Authorization: `Bearer ${vercelToken}` },
      });
      const listData = await listRes.json();
      const existingEnv = listData.envs?.find((e: any) => e.key === "BLOTATO_API_KEY");

      if (existingEnv) {
        // Edit existing key
        await fetch(`https://api.vercel.com/v9/projects/${vercelProjectId}/env/${existingEnv.id}`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${vercelToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ value: cleanKey }),
        });
      } else {
        // Create new key
        await fetch(`https://api.vercel.com/v10/projects/${vercelProjectId}/env`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${vercelToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            key: "BLOTATO_API_KEY",
            value: cleanKey,
            type: "plain",
            target: ["production", "preview", "development"],
          }),
        });
      }
    }

    return NextResponse.json({ success: true, message: "Blotato API key saved successfully!" });
  } catch (err: any) {
    console.error("POST /api/social/save-key error:", err);
    return NextResponse.json({ error: err.message || "Failed to save Blotato API key" }, { status: 500 });
  }
}
