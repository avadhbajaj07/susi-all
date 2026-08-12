import { NextResponse } from "next/server";
import { deleteSupabasePost, fetchSupabasePosts, insertSupabasePost, updateSupabasePost } from "@/lib/supabase-api";

const fallbackPosts: any[] = [];

export async function GET() {
  const posts = await fetchSupabasePosts();
  if (Array.isArray(posts)) {
    return NextResponse.json({ posts });
  }
  return NextResponse.json({ posts: fallbackPosts });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, category, content, excerpt, image, date } = body;

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const savedPost = await insertSupabasePost({ title, category, content, excerpt, image, date });

    return NextResponse.json({ success: true, post: savedPost || body });
  } catch (err: any) {
    console.error("POST /api/posts error:", err);
    return NextResponse.json({ error: err.message || "Failed to save post" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, title, category, content, excerpt, image, date } = body;

    if (!id || !title) {
      return NextResponse.json({ error: "Post ID and title are required" }, { status: 400 });
    }

    await updateSupabasePost(id, { title, category, content, excerpt, image, date });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("PATCH /api/posts error:", err);
    return NextResponse.json({ error: err.message || "Failed to update post" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
    }

    await deleteSupabasePost(id);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("DELETE /api/posts error:", err);
    return NextResponse.json({ error: err.message || "Failed to delete post" }, { status: 500 });
  }
}
