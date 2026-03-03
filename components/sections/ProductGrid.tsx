"use client";
import { useRef, useState, useMemo } from "react";
import { products } from "@/lib/products";
import RevealImage from "../ui/RevealImage";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Plus, X, Search } from "lucide-react";

const CATEGORIES = ["All", "Shoes", "Bags", "Watches"];

type Product = typeof products[number];

export default function ProductGrid() {
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();
  const container = useRef(null);

  const filteredProducts = useMemo<Product[]>(() => {
    return products.filter((p) => {
      const matchesCategory = filter === "All" || p.category === filter;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [filter, searchQuery]);

  return (
    <section ref={container} className="py-16 md:py-24 px-4 md:px-8 bg-white" id="categories">
      <div className="max-w-7xl mx-auto">
        
        {/* TOP BAR: Title & Search */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.3em] text-stone-400 font-bold">Collections</span>
            <h2 className="text-3xl md:text-4xl font-serif italic text-stone-900">Browse the Shop</h2>
          </div>

          <div className="relative w-full md:w-72 group">
            <Search size={16} className="absolute left-0 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-black transition-colors" />
            <input 
              type="text"
              placeholder="SEARCH PIECES..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-b border-stone-200 py-3 pl-8 pr-4 text-[10px] tracking-[0.2em] uppercase focus:outline-none focus:border-black transition-all placeholder:text-stone-300 text-stone-900"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="absolute right-0 top-1/2 -translate-y-1/2 text-stone-400 hover:text-black">
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* TAB NAVIGATION */}
        <div className="flex gap-8 border-b border-stone-100 w-full overflow-x-auto pb-px mb-12 md:mb-16 scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`pb-4 text-[11px] uppercase tracking-[0.2em] transition-all whitespace-nowrap ${
                filter === cat ? "border-b-2 border-stone-900 font-bold text-stone-900" : "text-stone-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* PRODUCT GRID */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 md:gap-x-12 gap-y-12 md:gap-y-24">
            {filteredProducts.map((product) => (
              <div 
                key={product.id} 
                className="group cursor-pointer flex flex-col"
                onClick={() => setSelectedProduct(product)}
              >
                <div className="relative overflow-hidden aspect-[3/4] mb-4">
                  <RevealImage src={product.image} alt={product.name} />

                  <button
                    onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                    className="absolute bottom-4 right-4 bg-white p-4 rounded-full shadow-xl translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 hover:bg-stone-900 text-black hover:text-white z-10 hidden md:flex"
                  >
                    <ShoppingCart size={20} />
                  </button>

                  <button
                    onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                    className="md:hidden absolute bottom-2 right-2 bg-white/80 backdrop-blur-md text-black p-2 rounded-full shadow-sm z-10"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <div className="flex flex-col space-y-1">
                  <span className="text-[9px] uppercase tracking-[0.15em] text-stone-400 font-medium">{product.category}</span>
                  <h3 className="text-sm md:text-lg font-normal text-stone-900 leading-tight">{product.name}</h3>
                  <p className="font-serif text-sm md:text-lg text-stone-800 italic pt-1">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center border-y border-stone-50">
            <p className="text-stone-400 italic text-sm font-serif">No pieces found matching your search.</p>
          </div>
        )}
      </div>

      {/* QUICK VIEW POPUP - Re-integrated */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm" onClick={() => setSelectedProduct(null)} />
          <div className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col md:flex-row shadow-2xl rounded-sm">
            <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 z-20 p-2 bg-white/80 rounded-full hover:bg-black hover:text-white text-black transition-colors">
              <X size={20} />
            </button>
            <div className="w-full md:w-1/2 aspect-[3/4] md:aspect-auto">
              <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
            </div>
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <span className="text-[10px] uppercase tracking-[0.2em] text-stone-400 mb-2">{selectedProduct.category}</span>
              <h2 className="text-3xl md:text-4xl font-serif italic mb-4 text-black">{selectedProduct.name}</h2>
              <p className="text-xl font-light text-stone-900 mb-6">{selectedProduct.price}</p>
              <div className="h-px bg-stone-100 w-full mb-6" />
              <p className="text-sm text-stone-600 leading-relaxed mb-6">{selectedProduct.description}</p>
              <ul className="mb-8 space-y-2">
                {selectedProduct.details?.map((detail, i) => (
                  <li key={i} className="text-[11px] uppercase tracking-widest text-stone-500 flex items-center gap-2">
                    <span className="h-1 w-1 bg-stone-300 rounded-full" /> {detail}
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }}
                className="w-full bg-stone-900 text-white py-5 uppercase text-[10px] font-bold tracking-[0.2em] hover:bg-stone-800 transition-colors"
              >
                Add to Bag — {selectedProduct.price}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}