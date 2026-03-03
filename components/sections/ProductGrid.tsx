"use client";
import { useRef, useState } from "react";
import { products } from "@/lib/products";
import RevealImage from "../ui/RevealImage";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Plus } from "lucide-react";

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

        {/* TAB NAVIGATION */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 md:mb-16 gap-6">
          <div className="flex gap-8 border-b border-stone-100 w-full overflow-x-auto pb-px scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`pb-4 text-[11px] uppercase tracking-[0.2em] transition-all whitespace-nowrap ${filter === cat
                    ? "border-b-2 border-stone-900 font-bold text-stone-900"
                    : "text-stone-400 hover:text-stone-600"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* PRODUCT GRID */}
        {/* PRODUCT GRID */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 md:gap-x-12 gap-y-12 md:gap-y-24">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group cursor-pointer flex flex-col">
              <div className="relative overflow-hidden aspect-[3/4] mb-4">
                <RevealImage src={product.image} alt={product.name} />

                {/* DESKTOP FLOATING BUTTON */}
                <button
                  onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                  className="absolute bottom-4 right-4 bg-white p-4 rounded-full shadow-xl
                     translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100
                     transition-all duration-500 hover:bg-stone-900 text-black hover:text-white z-10
                     hidden md:flex items-center justify-center"
                >
                  <ShoppingCart size={20} />
                </button>

                {/* MOBILE QUICK ADD - Minimalist pill */}
                <button
                  onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                  className="md:hidden absolute bottom-2 right-2 bg-white/80 backdrop-blur-md 
                     text-black p-2 rounded-full shadow-sm z-10 active:scale-90 transition-transform"
                >
                  <Plus size={16} />
                </button>
              </div>

              {/* TEXT CONTENT - Refined Hierarchy */}
              <div className="flex flex-col space-y-1">
                <div className="flex flex-col">
                  <span className="text-[9px] md:text-[10px] uppercase tracking-[0.15em] text-stone-400 font-medium">
                    {product.category}
                  </span>
                  <h3 className="text-sm md:text-lg font-normal text-stone-900 leading-tight tracking-tight">
                    {product.name}
                  </h3>
                </div>

                <p className="font-serif text-sm md:text-lg text-stone-800 italic pt-1">
                  {product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}