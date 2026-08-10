"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  quote: string;
  author: string;
  role?: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "I've known Susi now for 6 years, not long after when I lived in Switzerland, and highly recommend her as a practitioner and teacher. Her yoga classes are intensive and uplifting; she has a profound knowledge of the body and movement, and is relentless in her guidance to form and alignment.",
    author: "Ahmet Akyol",
    role: "Dedicated Student & Practitioner",
  },
  {
    quote:
      "Working 1-on-1 with Susi completely transformed my physical recovery and my daily movement habits. Her intuitive approach and deep understanding of remedial therapy gave me back strength I thought I had lost forever.",
    author: "Elena R.",
    role: "Private Client, Switzerland",
  },
  {
    quote:
      "The Peloponnese retreat was a turning point. Susi creates a space that is equal parts grounding, challenging, and deeply restorative. I left with clarity, renewed energy, and lifelong practices.",
    author: "Marcus & Sarah",
    role: "Retreat Participants, Greece",
  },
];

export function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 7000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const current = testimonials[currentIndex];

  return (
    <section className="testimonials-section">
      <span className="eyebrow">Testimonials</span>
      <h2 style={{ fontSize: 36, marginBottom: 28 }}>What People Say</h2>
      
      <div className="testimonial-slider-container">
        <button
          className="slider-arrow arrow-left desktop-arrow"
          onClick={prevSlide}
          aria-label="Previous Testimonial"
        >
          <ChevronLeft size={24} />
        </button>

        <div className="quote-box">
          <p className="quote-text">&ldquo;{current.quote}&rdquo;</p>
          <div className="quote-author">{current.author}</div>
          {current.role && <div className="quote-role">{current.role}</div>}
        </div>

        <button
          className="slider-arrow arrow-right desktop-arrow"
          onClick={nextSlide}
          aria-label="Next Testimonial"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Mobile-only Arrow Controls Row */}
      <div className="mobile-arrows-row">
        <button
          className="slider-arrow"
          onClick={prevSlide}
          aria-label="Previous Testimonial"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          className="slider-arrow"
          onClick={nextSlide}
          aria-label="Next Testimonial"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      <div className="slider-dots">
        {testimonials.map((_, idx) => (
          <button
            key={idx}
            className={`slider-dot ${idx === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
