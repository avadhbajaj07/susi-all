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
      if (Array.isArray(data)) {
        return data.map((p: any) => ({
          id: p.id,
          title: p.title,
          slug: p.slug || p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
          category: p.category || "Practice Notes",
          date: p.date || new Date(p.created_at).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
          excerpt: p.excerpt || (typeof p.content === "string" ? p.content.slice(0, 160) + "..." : p.title),
          content: typeof p.content === "string" ? p.content : p.excerpt || p.title,
          image: p.image || p.featured_image_path || "https://res.cloudinary.com/qtah71h2/image/upload/v1786527175/susi-davies15.jpg",
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

export async function fetchSupabasePostBySlug(slug: string) {
  try {
    // First try exact slug match
    let res = await fetch(`${SUPABASE_URL}/rest/v1/posts?slug=eq.${encodeURIComponent(slug)}&select=*`, {
      headers: {
        "apikey": SUPABASE_KEY,
        "Authorization": `Bearer ${SUPABASE_KEY}`,
      },
      cache: "no-store",
    });

    let data: any[] = [];
    if (res.ok) {
      data = await res.json();
    }

    // If exact match fails, try LIKE prefix match (handles timestamp-suffixed slugs like "my-title-1723456789")
    if (!Array.isArray(data) || data.length === 0) {
      res = await fetch(`${SUPABASE_URL}/rest/v1/posts?slug=like.${encodeURIComponent(slug + "%")}&select=*&limit=1`, {
        headers: {
          "apikey": SUPABASE_KEY,
          "Authorization": `Bearer ${SUPABASE_KEY}`,
        },
        cache: "no-store",
      });
      if (res.ok) {
        data = await res.json();
      }
    }

    if (Array.isArray(data) && data.length > 0) {
      const p = data[0];
      return {
        id: p.id,
        title: p.title,
        slug: p.slug,
        category: p.category || "Practice Notes",
        date: p.date || new Date(p.created_at).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
        excerpt: p.excerpt || (typeof p.content === "string" ? p.content.slice(0, 160) + "..." : p.title),
        content: typeof p.content === "string" ? p.content : p.excerpt || p.title,
        image: p.image || p.featured_image_path || "https://res.cloudinary.com/qtah71h2/image/upload/v1786527175/susi-davies15.jpg",
        status: p.status || "published",
        readTime: "5 min read",
      };
    }
  } catch (err) {
    console.error("fetchSupabasePostBySlug error:", err);
  }
  return null;
}

export async function insertSupabasePost(post: { title: string; category?: string; content?: string; excerpt?: string; image?: string; date?: string }) {
  try {
    const slug = post.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") + "-" + Date.now();
    const postDate = post.date || new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
    const postExcerpt = post.excerpt || (post.content ? post.content.slice(0, 160) : post.title);
    const postContent = post.content || post.title;
    const postImage = post.image || "https://res.cloudinary.com/qtah71h2/image/upload/v1786527175/susi-davies15.jpg";
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

export async function updateSupabasePost(id: string | number, data: { title: string; category?: string; content?: string; excerpt?: string; image?: string; date?: string }) {
  try {
    const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const postExcerpt = data.excerpt || (data.content ? data.content.slice(0, 160) : data.title);

    const res = await fetch(`${SUPABASE_URL}/rest/v1/posts?id=eq.${id}`, {
      method: "PATCH",
      headers: {
        "apikey": SUPABASE_KEY,
        "Authorization": `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
        "Prefer": "return=representation",
      },
      body: JSON.stringify({
        title: data.title,
        slug,
        category: data.category,
        content: data.content,
        excerpt: postExcerpt,
        image: data.image,
        date: data.date,
      }),
    });

    return res.ok;
  } catch (err) {
    console.error("updateSupabasePost error:", err);
    return false;
  }
}

export async function deleteSupabasePost(id: string | number) {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/posts?id=eq.${id}`, {
      method: "DELETE",
      headers: {
        "apikey": SUPABASE_KEY,
        "Authorization": `Bearer ${SUPABASE_KEY}`,
      },
    });
    return res.ok;
  } catch (err) {
    console.error("deleteSupabasePost error:", err);
    return false;
  }
}

// Comments API
export async function fetchPostComments(slug: string) {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/comments?post_slug=eq.${encodeURIComponent(slug)}&status=eq.approved&order=created_at.desc`, {
      headers: {
        "apikey": SUPABASE_KEY,
        "Authorization": `Bearer ${SUPABASE_KEY}`,
      },
      cache: "no-store",
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.error("fetchPostComments error:", err);
  }
  return [];
}

export async function fetchAllComments() {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/comments?select=*&order=created_at.desc`, {
      headers: {
        "apikey": SUPABASE_KEY,
        "Authorization": `Bearer ${SUPABASE_KEY}`,
      },
      cache: "no-store",
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.error("fetchAllComments error:", err);
  }
  return [];
}

export async function submitComment(data: { post_slug: string; author_name: string; author_email: string; content: string }) {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/comments`, {
      method: "POST",
      headers: {
        "apikey": SUPABASE_KEY,
        "Authorization": `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
        "Prefer": "return=representation",
      },
      body: JSON.stringify({
        post_slug: data.post_slug,
        author_name: data.author_name,
        author_email: data.author_email,
        content: data.content,
        status: "pending",
      }),
    });
    if (res.ok) {
      const resData = await res.json();
      return Array.isArray(resData) ? resData[0] : resData;
    }
  } catch (err) {
    console.error("submitComment error:", err);
  }
  return null;
}

export async function updateCommentStatus(id: number | string, status: "approved" | "rejected") {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/comments?id=eq.${id}`, {
      method: "PATCH",
      headers: {
        "apikey": SUPABASE_KEY,
        "Authorization": `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });
    return res.ok;
  } catch (err) {
    console.error("updateCommentStatus error:", err);
    return false;
  }
}
