import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

let fallbackPosts = [
  {
    id: 1,
    title: "Movement & Neural Alignment: Moving with Intention",
    category: "Practice Notes",
    date: "Aug 06, 2026",
    excerpt: "True movement intelligence begins when we listen to the body's natural alignment rather than forcing postures. Here are practice observations from 30+ years of teaching.",
    content: "True movement intelligence begins when we listen to the body's natural alignment rather than forcing postures...",
    image: "/images/susi davies7.jpg",
    status: "Published",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "Finding Calm in Motion: The Power of Breathwork",
    category: "Mindful Living",
    date: "Jul 28, 2026",
    excerpt: "Breath is the bridge between the nervous system and conscious awareness. Exploring pranayama techniques to regulate stress and cultivate presence.",
    content: "Breath is the bridge between the nervous system and conscious awareness...",
    image: "/images/susi davies3.jpg",
    status: "Published",
    readTime: "4 min read",
  },
  {
    id: 3,
    title: "Reflections from the Peloponnese Sanctuary",
    category: "Retreat Insights",
    date: "Jun 15, 2026",
    excerpt: "Stepping away from daily noise allows us to reconnect with what matters. Thoughts on stillness, nourishing movement, and sea air in Leonidio, Greece.",
    content: "Stepping away from daily noise allows us to reconnect with what matters...",
    image: "/images/retreat/susidavies_retreat4.jpg",
    status: "Published",
    readTime: "6 min read",
  },
];

export async function GET() {
  try {
    const supabase = getSupabase();
    if (supabase) {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        const formatted = data.map((p: any) => ({
          id: p.id,
          title: p.title,
          category: p.category || "Practice Notes",
          date: p.date || new Date(p.created_at).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
          excerpt: p.excerpt || p.content?.slice(0, 160) + "...",
          content: p.content,
          image: p.image || "/images/susi davies7.jpg",
          status: p.status || "Published",
          readTime: "5 min read",
        }));
        return NextResponse.json({ posts: formatted });
      }
    }

    return NextResponse.json({ posts: fallbackPosts });
  } catch (err: any) {
    return NextResponse.json({ posts: fallbackPosts });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, category, content, excerpt, image, date } = body;

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const newPost = {
      id: Date.now(),
      title,
      category: category || "Practice Notes",
      date: date || new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
      excerpt: excerpt || content?.slice(0, 160) || title,
      content: content || title,
      image: image || "/images/susi davies7.jpg",
      status: "Published",
      readTime: "5 min read",
    };

    const supabase = getSupabase();
    if (supabase) {
      await supabase.from("posts").insert([
        {
          title: newPost.title,
          category: newPost.category,
          content: newPost.content,
          excerpt: newPost.excerpt,
          image: newPost.image,
          status: "Published",
        },
      ]);
    }

    fallbackPosts.unshift(newPost);

    return NextResponse.json({ success: true, post: newPost });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to save post" }, { status: 500 });
  }
}
