import Image from "next/image";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { TestimonialSlider } from "@/components/testimonial-slider";
import { ImageSlider } from "@/components/image-slider";
import { Check } from "lucide-react";

const coachingImages = [
  { src: "/images/coaching4.jpg", alt: "Susi Davies stretching posture", caption: "Movement Articulation & Flexibility" },
  { src: "/images/coaching5.jpg", alt: "Susi Davies yoga posture", caption: "Precision & Alignment Guidance" },
  { src: "/images/susi davies2.jpg", alt: "Susi Davies in snow", caption: "Resilience & Breathwork Training" },
  { src: "/images/susi davies3.jpg", alt: "Susi Davies on rocks by water", caption: "Mindfulness & Inner Calm" },
  { src: "/images/susi davies4.jpg", alt: "Susi Davies SUP partner yoga", caption: "Balance & Core Integration" },
];

export default function CoachingMentoringPage() {
  return (
    <main>
      <SiteHeader />

      {/* Hero Banner */}
      <section className="page-banner">
        <div>
          <h1>Coaching &amp; Mentoring</h1>
        </div>
        <span className="page-banner-arrow">⌄</span>
      </section>

      <div className="container">
        {/* Quote & Intro Section */}
        <section className="grid-2col-alt">
          <div className="col-media">
            <div className="image-card-rounded">
              <Image
                src="/images/coaching1.jpg"
                alt="Susi Davies riding camel"
                width={500}
                height={580}
                priority
              />
            </div>
          </div>
          <div className="col-content">
            <h2 className="section-heading" style={{ fontStyle: "italic" }}>
              &ldquo;The best teachers never stop being students.&rdquo; &mdash; Susi Davies
            </h2>
            <span className="eyebrow" style={{ color: "var(--blue)", fontSize: 14, marginTop: 15 }}>
              Coaching &amp; Mentoring with Susi Davies
            </span>
            <p className="body-text">
              Personal coaching and mentoring for people seeking refinement, clarity, and true depth in their teaching and practice.
            </p>
            <p className="body-text">
              This is not a certification course. It is a direct, personal path to more clarity, confidence, authenticity, and refinement in the way you teach and practise.
            </p>
          </div>
        </section>

        {/* Temple Photo + Susi Davies Way */}
        <section className="grid-2col">
          <div className="col-media">
            <div className="image-card-rounded">
              <Image
                src="/images/coaching2.jpg"
                alt="Susi Davies sitting on stone temple"
                width={500}
                height={480}
              />
            </div>
          </div>
          <div className="col-content">
            <span className="eyebrow">Personal evolution</span>
            <h2 className="section-heading">Teaching Yoga. The Susi Davies Way.</h2>
            <p className="body-text">
              Susi offers 1-on-1 mentoring designed to help teachers find their true voice, refine sequencing logic, master hands-on adjustments, and cultivate effortless presence in the room.
            </p>
            <p className="body-text">
              Whether you are an established teacher or a dedicated practitioner, Susi brings 30+ years of multi-disciplinary experience to guide your evolution.
            </p>
          </div>
        </section>

        {/* What You Will Explore Section */}
        <section className="grid-2col-alt">
          <div className="col-media">
            <div className="image-card-rounded">
              <Image
                src="/images/coaching3.jpg"
                alt="Buddha Head and You Are Amazing mug"
                width={500}
                height={480}
              />
            </div>
          </div>
          <div className="col-content">
            <span className="eyebrow">Deep dive learning</span>
            <h2 className="section-heading">What You Will Explore in Coaching &amp; Mentoring</h2>
            <ul className="bullet-list" style={{ listStyle: "none", padding: 0 }}>
              {[
                "Formulating sequence logic from foundation to peak posture",
                "Cueing logic & movement articulation",
                "Expressive cueing vs. prescriptive cueing",
                "Articulating class themes through intelligent language",
                "Refining body posture & hands-on adjustments",
                "Voice projection & presence guidance",
                "Personalised advice tailored to your goals",
              ].map((item, idx) => (
                <li key={idx} style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 14, paddingLeft: 0 }}>
                  <Check size={20} color="var(--blue)" />
                  <span style={{ fontSize: 17, color: "var(--ink-body)" }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Interactive Image Slider */}
        <section style={{ marginTop: 70, marginBottom: 70 }}>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <span className="eyebrow">Gallery</span>
            <h2 style={{ fontSize: 38 }}>Practice &amp; Mentoring Moments</h2>
          </div>
          <ImageSlider images={coachingImages} />
        </section>

        {/* Testimonials Slider */}
        <TestimonialSlider />
      </div>

      <SiteFooter />
    </main>
  );
}
