import { NextResponse } from "next/server";
import { deleteSupabasePost, fetchSupabasePosts, insertSupabasePost, updateSupabasePost } from "@/lib/supabase-api";

const fallbackPosts = [
  {
    id: "user-post-1",
    title: "Your Body Is Talking — Are You Listening?",
    category: "Mindful Living",
    date: "Aug 10, 2026",
    excerpt: "Listening to your body is the first step toward true somatic alignment and mental clarity.",
    content: "Listening to your body is the first step toward true somatic alignment, nervous system regulation, and mental clarity. When we slow down and pay attention to subtle physical signals—tightness in the shoulders, shallow breathing, or tension in the hips—we unlock the body's natural intelligence.\n\nOver thirty years of clinical remedial therapy and movement coaching have taught me that physical discomfort is rarely just a physical event. It is a communication. Your nervous system is constantly sending signals, asking for balance, rest, or intentional realignment.\n\nIn our practice, we cultivate deep somatic awareness to release accumulated stress and align movement with intention. Rather than forcing postures or pushing through pain, we learn to listen to the breath, stack the spine gracefully, and restore the natural intelligence of the body.\n\nHere are three daily steps to begin listening to your body:\n\n1. Pause and Observe Your Breath: Take three conscious exhalations through the mouth to signal safety to your autonomic nervous system.\n2. Check Your Postural Alignment: Feel your feet grounded on the earth and gently soften your jaw and neck muscles.\n3. Move with Intention: Choose mindful, restorative movement over forced intensity whenever your body asks for care.",
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
  const posts = await fetchSupabasePosts();
  if (posts && posts.length > 0) {
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
