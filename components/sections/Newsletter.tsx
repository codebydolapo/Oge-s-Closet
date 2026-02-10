"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Newsletter() {
  const section = useRef(null);

  useGSAP(() => {
    gsap.from(".newsletter-content", {
      scrollTrigger: {
        trigger: section.current,
        start: "top 85%", // Slightly later trigger for mobile view
      },
      y: 30,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    });
  }, { scope: section });

  return (
    <section ref={section} className="py-20 md:py-32 bg-stone-900 text-stone-50 text-center">
      <div className="newsletter-content max-w-2xl mx-auto px-6">
        <h2 className="font-serif text-3xl md:text-4xl mb-6 italic">Join the Inner Circle</h2>
        <p className="text-stone-400 mb-8 uppercase tracking-[0.2em] md:tracking-widest text-[10px] md:text-sm">
          Be the first to know about new arrivals and private sales.
        </p>
        
        <form className="flex flex-col md:flex-row gap-6 md:gap-4">
          <input 
            type="email" 
            placeholder="Your Email Address" 
            className="flex-1 bg-transparent border-b border-stone-700 py-3 text-sm outline-none focus:border-stone-50 transition-colors text-center md:text-left"
          />
          <button className="bg-stone-50 text-stone-900 px-8 py-4 md:py-3 uppercase text-[10px] font-bold tracking-widest hover:bg-stone-200 transition-all active:scale-95">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}