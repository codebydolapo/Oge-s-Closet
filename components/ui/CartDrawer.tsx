"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from '@gsap/react';
import { useCart } from "@/context/CartContext";

export default function CartDrawer({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const drawerRef = useRef(null);
  const overlayRef = useRef(null);

  const { cart } = useCart();

  // Calculate subtotal
  const subtotal = cart.reduce((acc, item) => acc + parseFloat(item.price.replace('$', '')), 0);

  useGSAP(() => {
    if (isOpen) {
      gsap.to(drawerRef.current, { x: 0, duration: 0.6, ease: "power4.out" });
      gsap.to(overlayRef.current, { opacity: 1, pointerEvents: "all" });
    } else {
      gsap.to(drawerRef.current, { x: "100%", duration: 0.6, ease: "power4.in" });
      gsap.to(overlayRef.current, { opacity: 0, pointerEvents: "none" });
    }
  }, [isOpen]);

  return (
    <>
      <div ref={overlayRef} onClick={onClose} className="fixed inset-0 bg-black/40 z-[100] opacity-0 pointer-events-none transition-opacity" />
      <div
        ref={drawerRef}
        className="fixed top-0 right-0 w-full sm:max-w-md h-[100dvh] bg-white z-[101] translate-x-full p-6 md:p-8 shadow-2xl flex flex-col"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-8 md:mb-12">
          <h2 className="font-serif text-xl md:text-2xl uppercase italic">Your Bag ({cart.length})</h2>
          <button onClick={onClose} className="uppercase text-[10px] tracking-widest p-2 bg-stone-100 rounded-full">Close</button>
        </div>

        {/* Items Area - Custom scrollbar for premium feel */}
        <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-stone-200">
          {cart.map((item, index) => (
            <div key={index} className="flex gap-4 border-b border-stone-50 pb-4 mb-4 items-center">
              <div className="w-16 h-20 bg-stone-100 overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h3 className="text-xs font-bold uppercase tracking-tight">{item.name}</h3>
                <p className="text-sm font-serif">{item.price}</p>
              </div>
              <button className="text-[10px] text-stone-300 hover:text-red-500 uppercase">Remove</button>
            </div>
          ))}
        </div>

        {/* Footer - Always at bottom */}
        <div className="pt-6 border-t border-stone-100">
          <div className="flex justify-between mb-6">
            <span className="uppercase text-[10px] tracking-widest text-stone-400">Total Estimate</span>
            <span className="font-serif text-xl">${subtotal.toFixed(2)}</span>
          </div>
          <button className="w-full bg-stone-900 text-white py-5 uppercase text-[10px] font-bold tracking-[0.2em] active:scale-[0.98] transition-transform">
            Checkout Now
          </button>
        </div>
      </div>
    </>
  );
}