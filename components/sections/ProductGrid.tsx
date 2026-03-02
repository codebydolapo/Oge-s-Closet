"use client";
import { useRef, useState } from "react";
import { products } from "@/lib/products";
import RevealImage from "../ui/RevealImage";
import { useCart } from "@/context/CartContext";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ShoppingCart } from "lucide-react";

const CATEGORIES = ["All", "Shoes", "Bags", "Watches"];

export default function ProductGrid() {
  const [filter, setFilter] = useState("All");
  const { addToCart } = useCart();
  const container = useRef(null);

  const filteredProducts = filter === "All" 
    ? products 
    : products.filter(p => p.category === filter);

  return (
    <section ref={container} className="py-16 md:py-24 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* TAB NAVIGATION - Scrollable on mobile */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 md:mb-16 gap-6">
          <div className="flex gap-6 border-b border-stone-100 w-full overflow-x-auto pb-px scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`pb-4 text-[10px] md:text-xs uppercase tracking-widest transition-all whitespace-nowrap ${
                  filter === cat ? "border-b-2 border-stone-900 font-bold text-stone-900" : "text-stone-400"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* PRODUCT GRID - 2 columns on mobile for better browsing */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 md:gap-x-10 gap-y-12 md:gap-y-20">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group relative">
              <RevealImage src={product.image} alt={product.name} />
              
              {/* MOBILE-FRIENDLY ADD BUTTON */}
              {/* On mobile (opacity-100), on desktop (md:opacity-0 group-hover:opacity-100) */}
              <button 
                onClick={() => addToCart(product)}
                className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-3 rounded-full 
                           opacity-100 md:opacity-0 md:group-hover:opacity-100 
                           transition-all duration-300 hover:bg-stone-900 hover:text-white text-black z-10"
              >
                <ShoppingCart size={18} />
              </button>

              <div className="product-info mt-4 md:mt-6 flex flex-col sm:flex-row justify-between items-start gap-2">
                <div>
                  <h3 className="font-medium text-base md:text-lg text-stone-900 leading-tight">{product.name}</h3>
                  <p className="text-stone-400 text-xs md:text-sm">{product.category}</p>
                </div>
                <div className="flex w-full sm:w-auto justify-between items-center sm:block">
                   <p className="font-serif text-base md:text-lg">{product.price}</p>
                   {/* Mobile CTA: Optional text button for clarity */}
                   <button onClick={() => addToCart(product)} className="sm:hidden text-[10px] uppercase font-bold tracking-tighter border-b border-black pb-0.5">Add to Bag</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}