"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    const onMouseMove = (e: MouseEvent) => {
      // Move the tiny dot instantly
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0 });
      // Move the follower ring with a slight lag for "elastic" feel
      gsap.to(follower, { x: e.clientX, y: e.clientY, duration: 0.3 });
    };

    window.addEventListener("mousemove", onMouseMove);

    // Interaction logic
    const onMouseEnter = () => {
      gsap.to(follower, { scale: 3, backgroundColor: "rgba(28, 25, 23, 0.1)", duration: 0.3 });
    };
    const onMouseLeave = () => {
      gsap.to(follower, { scale: 1, backgroundColor: "transparent", duration: 0.3 });
    };

    // Attach to all links and buttons
    const targets = document.querySelectorAll("a, button, .interactive");
    targets.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnter);
      el.addEventListener("mouseleave", onMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="fixed top-0 left-0 w-2 h-2 bg-stone-900 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2" />
      <div ref={followerRef} className="fixed top-0 left-0 w-8 h-8 border border-stone-900 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-transform ease-out" />
    </>
  );
}