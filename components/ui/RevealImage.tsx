"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function RevealImage({ src, alt }: { src: string; alt: string }) {
  const container = useRef(null);
  const image = useRef(null);
  const curtain = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      }
    });

    tl.to(curtain.current, {
      yPercent: -100, // Slides the "curtain" up
      duration: 1.2,
      ease: "power4.inOut",
    })
    .from(image.current, {
      scale: 1.4, // Zoom out effect as it reveals
      duration: 1.5,
      delay: -1.2, // Overlaps with the curtain animation
      ease: "power2.out",
    });
  }, { scope: container });

  return (
    <div ref={container} className="relative aspect-[3/4] overflow-hidden bg-stone-200">
      {/* The Image */}
      <img ref={image} src={src} alt={alt} className="w-full h-full object-cover" />
      
      {/* The Curtain (Color Overlay) */}
      <div 
        ref={curtain} 
        className="absolute inset-0 bg-stone-900" 
      />
    </div>
  );
}