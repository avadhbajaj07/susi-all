import { NextResponse } from "next/server";
import { queryDb } from "@/lib/db";

export async function GET() {
  try {
    const res = await queryDb(`SELECT * FROM posts ORDER BY created_at DESC;`);
    const posts = res.rows.map((p: any) => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      category: p.category || "Practice Notes",
      date: p.date || new Date(p.created_at).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
      excerpt: p.excerpt || (typeof p.content === "string" ? p.content.slice(0, 160) + "..." : p.title),
      content: typeof p.content === "string" ? p.content : p.excerpt || p.title,
      image: p.image || p.featured_image_path || "/images/susi davies7.jpg",
      status: p.status || "published",
      readTime: "5 min read",
    }));

    return NextResponse.json({ posts });
  } catch (err: any) {
    console.error("GET /api/posts database error:", err);
    return NextResponse.json({ posts: [] }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, category, content, excerpt, image, date } = body;

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") + "-" + Date.now();
    const postDate = date || new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
    const postExcerpt = excerpt || (content ? content.slice(0, 160) : title);
    const postContent = content || title;
    const postImage = image || "/images/susi davies7.jpg";
    const postCategory = category || "Practice Notes";

    const res = await queryDb(
      `INSERT INTO posts (title, slug, category, date, excerpt, content, image, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;`,
      [title, slug, postCategory, postDate, postExcerpt, postContent, postImage, "published"]
    );

    const savedPost = res.rows[0];

    return NextResponse.json({ success: true, post: savedPost });
  } catch (err: any) {
    console.error("POST /api/posts error:", err);
    return NextResponse.json({ error: err.message || "Failed to save post to Supabase" }, { status: 500 });
  }
}
