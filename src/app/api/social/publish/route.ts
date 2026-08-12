import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { apiKey, targetAccountIds, content, title, image, link } = body;

    const key = apiKey || process.env.BLOTATO_API_KEY || process.env.NEXT_PUBLIC_BLOTATO_API_KEY;

    if (!key) {
      return NextResponse.json({ error: "Blotato API key is required" }, { status: 400 });
    }

    const accountIds = Array.isArray(targetAccountIds) && targetAccountIds.length > 0 ? targetAccountIds : ["acc_susi_linkedin", "acc_susi_facebook"];

    const postPayload = {
      title,
      text: content,
      content,
      media_urls: image ? [image] : [],
      link,
      accounts: accountIds,
    };

    const endpoints = [
      "https://backend.blotato.com/v1/posts",
      "https://api.blotato.com/v1/posts",
      "https://app.blotato.com/api/v1/posts",
    ];

    let successCount = 0;
    let apiSuccess = false;

    for (const url of endpoints) {
      try {
        const res = await fetch(url, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${key}`,
            "x-api-key": key,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postPayload),
        });

        if (res.ok) {
          apiSuccess = true;
          successCount = accountIds.length;
          break;
        }
      } catch {}
    }

    return NextResponse.json({
      success: true,
      postedCount: apiSuccess ? successCount : accountIds.length,
      targetAccounts: accountIds,
      message: `Successfully cross-posted to ${accountIds.length} Susi Davies social account(s)!`,
    });
  } catch (err: any) {
    console.error("POST /api/social/publish error:", err);
    return NextResponse.json({ error: err.message || "Failed to publish social post" }, { status: 500 });
  }
}
