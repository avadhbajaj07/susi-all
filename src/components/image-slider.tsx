"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageItem {
  src: string;
  alt: string;
  caption?: string;
}

interface ImageSliderProps {
  images: ImageItem[];
}

export function ImageSlider({ images }: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (!images || images.length === 0) return null;

  return (
    <div className="image-slider-wrapper">
      <div className="image-slider-main">
        <Image
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
          width={900}
          height={550}
          className="slider-image"
          priority
        />
        
        <button className="slider-arrow arrow-left" onClick={prevSlide} aria-label="Previous Image">
          <ChevronLeft size={24} />
        </button>
        <button className="slider-arrow arrow-right" onClick={nextSlide} aria-label="Next Image">
          <ChevronRight size={24} />
        </button>

        {images[currentIndex].caption && (
          <div className="slider-caption">{images[currentIndex].caption}</div>
        )}
      </div>

      <div className="slider-dots">
        {images.map((_, idx) => (
          <button
            key={idx}
            className={`slider-dot ${idx === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to image ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
