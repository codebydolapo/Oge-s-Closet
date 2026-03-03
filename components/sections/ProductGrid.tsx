"use client";
import { useRef, useState } from "react";
import { products } from "@/lib/products";
import RevealImage from "../ui/RevealImage";
import { useCart } from "@/context/CartContext";
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
        
        {/* TAB NAVIGATION */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 md:mb-16 gap-6">
          <div className="flex gap-8 border-b border-stone-100 w-full overflow-x-auto pb-px scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`pb-4 text-[11px] uppercase tracking-[0.2em] transition-all whitespace-nowrap ${
                  filter === cat 
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
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-8 md:gap-x-12 gap-y-16 md:gap-y-24">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              <div className="relative overflow-hidden aspect-[4/5]" onClick={() => addToCart(product)}>
                <RevealImage src={product.image} alt={product.name} />
                
                {/* FLOATING ACTION BUTTON */}
                <button 
                  onClick={() => addToCart(product)}
                  className="absolute bottom-4 right-4 bg-white p-4 rounded-full shadow-xl
                             translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100
                             transition-all duration-500 hover:bg-stone-900 text-black hover:text-white z-10
                             hidden md:flex items-center justify-center"
                >
                  <ShoppingCart size={20} />
                </button>
              </div>

              <div className="mt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-stone-400 mb-1">
                      {product.category}
                    </p>
                    <h3 className="text-base md:text-lg font-light text-stone-900 group-hover:underline decoration-stone-300 underline-offset-4 transition-all">
                      {product.name}
                    </h3>
                  </div>
                  
                  {/* PRICE TAG - Using a clean, bold Serif for contrast */}
                  <p className="font-serif text-lg md:text-xl text-stone-900 italic">
                    {product.price}
                  </p>
                </div>

                {/* MOBILE ADD BUTTON */}
                {/* <button 
                  onClick={() => addToCart(product)}
                  className="w-full mt-4 py-3 border border-stone-200 text-[10px] uppercase tracking-widest font-bold md:hidden active:bg-stone-900 active:text-white transition-colors"
                >
                  Add to Bag — {product.price}
                </button> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}