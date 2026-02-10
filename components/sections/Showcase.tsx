"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Showcase() {
  const container = useRef(null);
  const textRef = useRef(null);

  useGSAP(() => {
    // Only apply the parallax lift on desktop (screens > 768px)
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      gsap.to(textRef.current, {
        y: -150,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });
    });
  }, { scope: container });

  return (
    <section ref={container} className="relative py-20 md:h-[120vh] flex items-center justify-center px-6 md:px-10 overflow-hidden bg-stone-100">
      <div className="grid grid-cols-1 md:grid-cols-12 w-full max-w-7xl items-center gap-8 md:gap-0">
        
        {/* Large Parallax Image */}
        <div className="md:col-span-7 h-[50vh] md:h-[70vh] overflow-hidden rounded-sm shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?q=80&w=800" 
            alt="Luxury Watch" 
            className="w-full h-full object-cover scale-110"
          />
        </div>

        {/* Floating Text Content */}
        <div 
          ref={textRef} 
          className="md:col-span-5 md:-ml-20 z-10 bg-white p-8 md:p-12 shadow-xl border border-stone-200 text-center md:text-left"
        >
          <span className="text-stone-400 text-[10px] md:text-xs uppercase tracking-[0.3em] mb-4 block">New Arrival</span>
          <h2 className="font-serif text-3xl md:text-5xl mb-6 text-black">The Meridian Gold</h2>
          <p className="text-stone-600 text-sm md:text-base leading-relaxed mb-8">
            A statement of precision and poise. Designed for those who treat time as their most precious accessory.
          </p>
          <button className="text-stone-900 interactive border-b border-stone-900 pb-1 text-[10px] md:text-sm uppercase font-bold hover:tracking-widest transition-all">
            Explore Detail
          </button>
        </div>

      </div>
    </section>
  );
}