const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://bszyzttyashekzqmehxg.supabase.co";
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJzenl6dHR5YXNoZWt6cW1laHhnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NjAwNDI4NiwiZXhwIjoyMTAxNTgwMjg2fQ.XNR9JAKg6ZZubrMpH5lyN3A0_f8lpubWyJ8qTfrQDSM";

export async function fetchSupabasePosts() {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/posts?select=*&order=created_at.desc`, {
      headers: {
        "apikey": SUPABASE_KEY,
        "Authorization": `Bearer ${SUPABASE_KEY}`,
      },
      cache: "no-store",
    });

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return data.map((p: any) => ({
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
      }
    }
  } catch (err) {
    console.error("fetchSupabasePosts error:", err);
  }
  return null;
}

export async function insertSupabasePost(post: { title: string; category?: string; content?: string; excerpt?: string; image?: string; date?: string }) {
  try {
    const slug = post.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") + "-" + Date.now();
    const postDate = post.date || new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
    const postExcerpt = post.excerpt || (post.content ? post.content.slice(0, 160) : post.title);
    const postContent = post.content || post.title;
    const postImage = post.image || "/images/susi davies7.jpg";
    const postCategory = post.category || "Practice Notes";

    const res = await fetch(`${SUPABASE_URL}/rest/v1/posts`, {
      method: "POST",
      headers: {
        "apikey": SUPABASE_KEY,
        "Authorization": `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
        "Prefer": "return=representation",
      },
      body: JSON.stringify({
        title: post.title,
        slug,
        category: postCategory,
        date: postDate,
        excerpt: postExcerpt,
        content: postContent,
        image: postImage,
        status: "published",
      }),
    });

    if (res.ok) {
      const data = await res.json();
      return Array.isArray(data) ? data[0] : data;
    }
  } catch (err) {
    console.error("insertSupabasePost error:", err);
  }
  return null;
}
