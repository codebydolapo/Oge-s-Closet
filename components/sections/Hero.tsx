"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Logo } from "../ui/Logo";

export default function Hero() {
  const container = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.to(".hero-bg", { scale: 1, duration: 2, ease: "power2.out" }) // Subtle zoom in effect
      .from(".shoe-logo", { y: -50, opacity: 0, duration: 1, ease: "bounce.out" }, 0)
      .from(".hero-text", {
        y: 30,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.5");
  }, { scope: container });

  return (
    <section ref={container} className="relative h-screen flex flex-col items-center justify-center overflow-hidden px-6">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2000"
          alt="Luxury Fashion"
          className="hero-bg w-full h-full object-cover brightness-50 scale-110 md:scale-125"
        />
      </div>

      <div className="relative z-10 text-center text-white w-full max-w-sm md:max-w-none">
        {/* <div className="shoe-logo mb-4 md:mb-6 filter invert scale-90 md:scale-110"> 
          <Logo /> 
        </div> */}
        
        {/* Font size scales from 4xl on mobile to 7xl on desktop */}
        <h1 className="hero-text text-4xl sm:text-5xl md:text-7xl font-serif leading-tight">
          Oge&apos;s Closet
        </h1>
        
        {/* Tracking (letter spacing) reduced on mobile so it fits on one line */}
        <p className="hero-text text-[10px] md:text-sm uppercase tracking-[0.2em] md:tracking-[0.5em] mt-4 opacity-80">
          Shoes • Bags • Timeless Pieces
        </p>
      </div>
    </section>
  );
}