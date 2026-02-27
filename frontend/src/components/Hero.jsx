import React, { useState, useEffect, useRef } from "react";
import { hero_img, hero_vdo } from "../assets/assets";
import { Link } from "react-router-dom";

function Hero() {
  const slides = [
    {
      type: "image",
      src: hero_img,
      title: "Timeless Elegance",
      subtitle:
        "Modern formal wear refined through precision tailoring and clean silhouettes.",
      link: "/collection",
      cta: "Shop Collection →",
    },
    {
      type: "video",
      src: hero_vdo,
      title: "Best Sellers",
      subtitle:
        "Discover our most loved styles, trusted by customers for quality and comfort.",
      link: "/bestseller",
      cta: "Shop Best Sellers →",
    },
  ];

  const [current, setCurrent] = useState(0);
  const videoRefs = useRef([]);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Control video play/pause
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (index === current) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [current]);

  return (
    <div className="relative min-h-[55vh] overflow-hidden flex items-center">

      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {slide.type === "image" ? (
            <img
              src={slide.src}
              alt="Hero"
              className="w-full h-full object-cover"
            />
          ) : (
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              src={slide.src}
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          )}
        </div>
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 z-10"></div>

      {/* Content */}
      <div className="relative z-20 px-6 md:px-20 max-w-md">
        <p className="text-[10px] tracking-[0.4em] uppercase text-white/70 mb-3">
          Established 2026
        </p>

        <h1 className="prata-regular text-3xl md:text-4xl text-white leading-tight mb-4 transition-all duration-700">
          {slides[current].title}
        </h1>

        <div className="w-10 h-px bg-white/60 mb-4"></div>

        <p className="text-xs text-white/70 leading-relaxed mb-6 transition-all duration-700">
          {slides[current].subtitle}
        </p>

        <Link to={slides[current].link} className="group inline-block">
          <span className="text-[10px] tracking-[0.35em] uppercase text-white/80 group-hover:text-white transition-colors">
            {slides[current].cta}
          </span>
        </Link>
      </div>

      {/* Dots Navigation */}
      <div className="absolute bottom-4 w-full flex justify-center gap-2 z-20">
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2 h-2 rounded-full cursor-pointer transition-all ${
              current === index ? "bg-white scale-110" : "bg-white/40"
            }`}
          ></div>
        ))}
      </div>

      {/* Arrows (Optional but pro 🔥) */}
      <button
        onClick={() =>
          setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
        }
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 text-white/70 hover:text-white text-xl"
      >
        ‹
      </button>

      <button
        onClick={() =>
          setCurrent((prev) => (prev + 1) % slides.length)
        }
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 text-white/70 hover:text-white text-xl"
      >
        ›
      </button>
    </div>
  );
}

export default Hero;