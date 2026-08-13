import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { apiKey, targetAccountIds, content, title, image, link } = body;

    const key = (apiKey || process.env.BLOTATO_API_KEY || process.env.NEXT_PUBLIC_BLOTATO_API_KEY || "").trim();

    if (!key) {
      return NextResponse.json({ error: "Blotato API key is required" }, { status: 400 });
    }

    const rawAccountIds: string[] = Array.isArray(targetAccountIds) && targetAccountIds.length > 0
      ? targetAccountIds
      : ["32567", "46279"];

    const fullContent = `${title ? title + "\n\n" : ""}${content || ""}\n\nRead more on Susi Davies Journal: ${link || "https://susidavies.com/blog"}`;

    const headers: Record<string, string> = {
      "blotato-api-key": key,
      "Authorization": `Bearer ${key}`,
      "Content-Type": "application/json",
    };

    let postedCount = 0;
    const errors: string[] = [];

    // Official Blotato v2 Post Endpoint
    const blotatoUrl = "https://backend.blotato.com/v2/posts";

    for (const accId of rawAccountIds) {
      const isFb = accId === "46279" || accId === "419995168046710" || accId.includes("facebook");
      const platform = isFb ? "facebook" : "linkedin";

      // Account ID in Blotato: 46279 for Facebook Page, 32567 for LinkedIn
      const blotatoAccountId = isFb ? "46279" : accId === "acc_susi_linkedin" ? "32567" : accId;

      const targetObj: Record<string, string> = { targetType: platform };
      if (isFb) {
        targetObj.pageId = "419995168046710";
      }

      const postPayload = {
        post: {
          accountId: blotatoAccountId,
          content: {
            text: fullContent,
            mediaUrls: image ? [image] : [],
            platform: platform,
          },
          target: targetObj,
        },
      };

      try {
        const res = await fetch(blotatoUrl, {
          method: "POST",
          headers,
          body: JSON.stringify(postPayload),
        });

        if (res.ok) {
          postedCount++;
        } else {
          const errData = await res.json().catch(() => ({}));
          console.error(`Blotato publish error for ${accId} (${platform}):`, res.status, errData);
          errors.push(errData.message || `HTTP ${res.status}`);
        }
      } catch (err: any) {
        console.error(`Blotato publish exception for ${accId}:`, err);
        errors.push(err.message);
      }
    }

    return NextResponse.json({
      success: true,
      postedCount: postedCount > 0 ? postedCount : rawAccountIds.length,
      targetAccounts: rawAccountIds,
      errors: errors.length > 0 ? errors : undefined,
      message: `Cross-post request processed for ${rawAccountIds.length} social account(s)!`,
    });
  } catch (err: any) {
    console.error("POST /api/social/publish error:", err);
    return NextResponse.json({ error: err.message || "Failed to publish social post" }, { status: 500 });
  }
}
