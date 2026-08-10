import { NextResponse } from "next/server";
import { fetchAllComments, fetchPostComments, submitComment, updateCommentStatus } from "@/lib/supabase-api";

// In-memory fallback comments store
let fallbackComments: any[] = [
  {
    id: 1,
    post_slug: "your-body-is-talking-are-you-listening",
    author_name: "Sophie Martin",
    author_email: "sophie.m@example.fr",
    content: "Such a beautiful reflection on somatic alignment! Thank you Susi for these inspiring practice notes.",
    status: "approved",
    created_at: new Date().toISOString(),
  },
];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  const all = searchParams.get("all");

  if (all === "true") {
    const comments = await fetchAllComments();
    return NextResponse.json({ comments: comments && comments.length > 0 ? comments : fallbackComments });
  }

  if (slug) {
    const comments = await fetchPostComments(slug);
    const filteredFallback = fallbackComments.filter((c) => c.post_slug === slug && c.status === "approved");
    return NextResponse.json({ comments: comments && comments.length > 0 ? comments : filteredFallback });
  }

  return NextResponse.json({ comments: fallbackComments });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { post_slug, author_name, author_email, content } = body;

    if (!post_slug || !author_name || !author_email || !content) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const comment = await submitComment({ post_slug, author_name, author_email, content });
    if (!comment) {
      const newFallback = {
        id: Date.now(),
        post_slug,
        author_name,
        author_email,
        content,
        status: "pending",
        created_at: new Date().toISOString(),
      };
      fallbackComments.unshift(newFallback);
      return NextResponse.json({ success: true, comment: newFallback });
    }

    return NextResponse.json({ success: true, comment });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to submit comment" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: "ID and status required" }, { status: 400 });
    }

    await updateCommentStatus(id, status);

    fallbackComments = fallbackComments.map((c) => (c.id === id ? { ...c, status } : c));

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to update comment" }, { status: 500 });
  }
}
