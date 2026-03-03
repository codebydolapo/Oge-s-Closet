"use client";
import { Logo } from "../ui/Logo";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCart } from "@/context/CartContext";
import data from "@/config/data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Navbar({ onCartClick }: { onCartClick: () => void }) {
  const navRef = useRef(null);

  const { cart } = useCart();
  const cartBtnRef = useRef(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    // Prevent the bounce from happening on the first page load
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // The Success Animation
    if (cart.length > 0) {
      const tl = gsap.timeline();
      tl.to(cartBtnRef.current, { scale: 1.2, duration: 0.1, ease: "power2.out" })
        .to(cartBtnRef.current, { scale: 1, duration: 0.4, ease: "elastic.out(1, 0.3)" });
    }
  }, [cart.length]);

  return (
    <nav ref={navRef} className="fixed top-0 w-full z-50 px-4 md:px-8 py-4 md:py-6 flex justify-between items-center bg-black/50 backdrop-blur-md text-white border-b border-white/10">
      {/* Brand Name - Hidden on small mobile to save space, visible on tablet up */}
      <div className="flex gap-8 text-xs uppercase tracking-widest font-medium">
        <div className="hero-text text-lg md:text-2xl font-serif font-semibold capitalize hidden sm:block">
          {data.businessName}
        </div>
        {/* Mobile Menu Icon (Placeholder) */}
        <button className="sm:hidden interactive uppercase text-[10px] tracking-widest">Menu</button>
      </div>

      {/* Centered Logo - Scaled down for mobile */}
      <div className="absolute left-1/2 -translate-x-1/2 filter invert brightness-0 scale-75 md:scale-100">
        <Logo />
      </div>

      <div className="flex gap-4 md:gap-8 items-center">
        <button
          ref={cartBtnRef} // Attach the ref here
          onClick={onCartClick}
          className="interactive bg-white/10 p-2 rounded-full md:bg-transparent md:p-0 flex items-center gap-2 font-serif text-[12px]"
        >
          <span className="hidden xs:inline uppercase tracking-widest text-[10px]">Cart</span>
          <span className="bg-white text-black h-5 w-5 md:h-6 md:w-6 flex items-center justify-center rounded-full text-[10px] font-bold shadow-lg">
            {cart.length}
          </span>
        </button>
      </div>
    </nav>
  );
}