"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Media query to detect a fine pointer (mouse/trackpad)
    const mediaQuery = window.matchMedia("(pointer: fine)");
    
    const handleCheck = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsDesktop(e.matches);
    };

    // Initial check
    handleCheck(mediaQuery);
    mediaQuery.addEventListener("change", handleCheck);

    if (!mediaQuery.matches) return;

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursorRef.current, { x: e.clientX, y: e.clientY, duration: 0 });
      gsap.to(followerRef.current, { x: e.clientX, y: e.clientY, duration: 0.3 });
    };

    const onMouseEnter = () => gsap.to(followerRef.current, { scale: 3, backgroundColor: "rgba(0,0,0,0.05)", duration: 0.3 });
    const onMouseLeave = () => gsap.to(followerRef.current, { scale: 1, backgroundColor: "transparent", duration: 0.3 });

    window.addEventListener("mousemove", onMouseMove);
    
    // Add listeners to interactive elements
    const targets = document.querySelectorAll("a, button, .interactive");
    targets.forEach(el => {
      el.addEventListener("mouseenter", onMouseEnter);
      el.addEventListener("mouseleave", onMouseLeave);
    });

    return () => {
      mediaQuery.removeEventListener("change", handleCheck);
      window.removeEventListener("mousemove", onMouseMove);
      targets.forEach(el => {
        el.removeEventListener("mouseenter", onMouseEnter);
        el.removeEventListener("mouseleave", onMouseLeave);
      });
    };
  }, []);

  if (!isDesktop) return null;

  return (
    <>
      <div ref={cursorRef} className="fixed top-0 left-0 w-1.5 h-1.5 bg-stone-900 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2" />
      <div ref={followerRef} className="fixed top-0 left-0 w-8 h-8 border border-stone-900 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2" />
    </>
  );
}