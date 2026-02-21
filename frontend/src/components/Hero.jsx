import React from "react";
import { hero_img } from "../assets/assets";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="relative min-h-[55vh] overflow-hidden flex items-center">
      
      {/* Background */}
      <img
        className="absolute inset-0 w-full h-full object-cover object-center"
        src={hero_img}
        alt="Modern Formal Wear"
      />
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Content */}
      <div className="relative z-10 px-6 md:px-20 max-w-md">
        <p className="text-[10px] tracking-[0.4em] uppercase text-white/70 mb-3">
          Established 2024
        </p>

        <h1 className="prata-regular text-3xl md:text-4xl text-white leading-tight mb-4">
          Timeless <span className="italic opacity-80">Elegance</span>
        </h1>

        <div className="w-10 h-px bg-white/60 mb-4"></div>

        <p className="text-xs text-white/70 leading-relaxed mb-6">
          Modern formal wear refined through precision tailoring and clean silhouettes.
        </p>

        <Link to="/collection" className="group inline-block">
          <span className="text-[10px] tracking-[0.35em] uppercase text-white/80 group-hover:text-white transition-colors">
            Shop Collection →
          </span>
        </Link>
      </div>
    </div>
  );
}

export default Hero;
