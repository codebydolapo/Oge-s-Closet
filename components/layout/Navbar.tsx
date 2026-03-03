"use client";
import { Logo } from "../ui/Logo";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useCart } from "@/context/CartContext";
import data from "@/config/data";
import { ShoppingBag } from "lucide-react"; // 1. Import the icon

export default function Navbar({ onCartClick }: { onCartClick: () => void }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const { cart } = useCart();
  const cartBtnRef = useRef(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (cart.length > 0) {
      const tl = gsap.timeline();
      tl.to(cartBtnRef.current, { scale: 1.1, duration: 0.1 })
        .to(cartBtnRef.current, { scale: 1, duration: 0.4, ease: "elastic.out(1, 0.3)" });
    }
  }, [cart.length]);

  return (
    <nav 
      className={`fixed top-0 w-full z-50 px-4 md:px-8 transition-all duration-500 ease-in-out border-b
        ${isScrolled 
          ? "py-3 bg-white/80 backdrop-blur-xl border-stone-100 text-black shadow-sm" 
          : "py-6 bg-transparent border-transparent text-white"
        }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center relative">
        
        {/* LEFT SECTION */}
        <div className="flex gap-6 items-center">
          <div className="text-lg md:text-xl font-serif font-bold capitalize hidden sm:block">
            {data.businessName}
          </div>
          <button className="uppercase text-[10px] tracking-[0.2em] font-bold md:hidden">
            Menu
          </button>
        </div>

        {/* CENTERED LOGO */}
        <div className={`absolute left-1/2 -translate-x-1/2 transition-all duration-500 scale-75 md:scale-90
          ${isScrolled ? "filter invert-0 brightness-0" : "filter invert brightness-0"}`}>
          <Logo />
        </div>

        {/* RIGHT SECTION: The Improved Cart Button */}
        <div className="flex items-center">
          <button
            ref={cartBtnRef}
            onClick={onCartClick}
            className={`group relative flex items-center gap-2 transition-all duration-300 px-3 py-2 rounded-full
              ${isScrolled ? "hover:bg-stone-100" : "hover:bg-white/10"}`}
          >
            {/* The Icon */}
            <ShoppingBag size={20} strokeWidth={1.5} />
            
            {/* Desktop Label */}
            <span className="hidden sm:inline uppercase tracking-[0.2em] text-[10px] font-bold">
              Bag
            </span>

            {/* The Badge: Positioned slightly offset to look like a notification */}
            <span className={`
              flex items-center justify-center rounded-full text-[9px] font-bold transition-all duration-300
              ${isScrolled 
                ? "bg-black text-white h-5 w-5" 
                : "bg-white text-black h-5 w-5"
              }
              ${cart.length === 0 ? "opacity-30" : "opacity-100"}
            `}>
              {cart.length}
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}