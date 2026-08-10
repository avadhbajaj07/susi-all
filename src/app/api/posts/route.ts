import { NextResponse } from "next/server";
import { queryDb } from "@/lib/db";

const initialPosts = [
  {
    id: "user-post-1",
    title: "Your Body Is Talking — Are You Listening?",
    category: "Mindful Living",
    date: "Aug 10, 2026",
    excerpt: "Listening to your body is the first step toward true somatic alignment and mental clarity.",
    content: "Listening to your body is the first step toward true somatic alignment and mental clarity. When we slow down and pay attention to subtle physical signals—tightness in the shoulders, shallow breathing, or tension in the hips—we unlock the body's natural wisdom.\n\nIn our studio practices, we cultivate deep somatic awareness to release accumulated stress and align movement with intention.",
    image: "https://res.cloudinary.com/dm4jfxbcs/image/upload/v1786343531/susi2_v8c5c9.jpg",
    status: "published",
    readTime: "5 min read",
  },
  {
    id: "post-1",
    title: "Movement & Neural Alignment: Moving with Intention",
    category: "Practice Notes",
    date: "Aug 06, 2026",
    excerpt: "True movement intelligence begins when we listen to the body's natural alignment rather than forcing postures. Here are practice observations from 30+ years of teaching.",
    content: "True movement intelligence begins when we listen to the body's natural alignment rather than forcing postures. Over thirty years of clinical remedial therapy and movement coaching have taught me that alignment is not a static shape—it is a continuous conversation between your nervous system, your breath, and gravity.\n\nWhen we force the body into rigid poses without awareness, we trigger protective tension patterns. Conversely, when we cultivate neural alignment—attuning to breath rhythms and functional joint stacking—movement becomes effortless, fluid, and deeply restorative.",
    image: "/images/susi davies7.jpg",
    status: "published",
    readTime: "5 min read",
  },
  {
    id: "post-2",
    title: "Finding Calm in Motion: The Power of Breathwork",
    category: "Mindful Living",
    date: "Jul 28, 2026",
    excerpt: "Breath is the bridge between the nervous system and conscious awareness. Exploring pranayama techniques to regulate stress and cultivate presence.",
    content: "Breath is the most accessible gear shift for your autonomic nervous system. By consciously lengthening your exhalation, you activate the vagus nerve, signaling safety to every cell in your body.\n\nIn our studio sessions in Thalwil, we integrate subtle diaphragm releases before deeper movement. Whether you are recovering from injury or navigating daily stress, establishing a steady 4-count inhale and 6-count exhale creates an anchor of calm in motion.",
    image: "/images/susi davies3.jpg",
    status: "published",
    readTime: "4 min read",
  },
  {
    id: "post-3",
    title: "Reflections from the Peloponnese Sanctuary",
    category: "Retreat Insights",
    date: "Jun 15, 2026",
    excerpt: "Stepping away from daily noise allows us to reconnect with what matters. Thoughts on stillness, nourishing movement, and sea air in Leonidio, Greece.",
    content: "Stepping away from daily noise allows us to reconnect with what truly matters. Nestled between dramatic limestone cliffs and the Aegean coast, our Peloponnese sanctuary offers space to pause, breathe, and restore.\n\nDuring our autumn retreats, mornings begin with sunrise somatic movement and breathwork, followed by organic farm-to-table meals and quiet seaside reflection. Taking time to step away is not a luxury—it is an essential reset for body and soul.",
    image: "/images/retreat/susidavies_retreat4.jpg",
    status: "published",
    readTime: "6 min read",
  },
];

export async function GET() {
  try {
    const res = await queryDb(`SELECT * FROM posts ORDER BY created_at DESC;`);
    if (res && res.rows && res.rows.length > 0) {
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
    }
  } catch (err: any) {
    console.error("GET /api/posts database error:", err);
  }

  return NextResponse.json({ posts: initialPosts });
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

    const savedPost = res ? res.rows[0] : { title, category: postCategory, content: postContent, excerpt: postExcerpt, image: postImage, date: postDate };

    return NextResponse.json({ success: true, post: savedPost });
  } catch (err: any) {
    console.error("POST /api/posts error:", err);
    return NextResponse.json({ error: err.message || "Failed to save post to Supabase" }, { status: 500 });
  }
}
