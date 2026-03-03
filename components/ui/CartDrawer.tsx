"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from '@gsap/react';
import { useCart } from "@/context/CartContext";
import data from "@/config/data";
import { Plus, Minus, Trash2 } from "lucide-react";

export default function CartDrawer({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const drawerRef = useRef(null);
  const overlayRef = useRef(null);
  const { cart, removeFromCart, updateQuantity } = useCart();

  // STOPS NaN: Removes everything except numbers and decimals
  const parsePrice = (priceStr: string) => {
    const cleanStr = priceStr.replace(/[^0-9.]/g, "");
    return parseFloat(cleanStr) || 0;
  };

  const subtotal = cart.reduce((acc, item) => 
    acc + (parsePrice(item.price) * item.quantity), 0
  );

  const handleCheckout = () => {
    // 1. Sanitize the phone number: removes '+', spaces, and dashes
    // Result: "2348031234567"
    const sanitizedNumber = data.phoneNumber.replace(/[^0-9]/g, "");
    
    // 2. Format the items list
    const itemDetails = cart.map(item => 
      `• ${item.name} (x${item.quantity}) - ${item.price}`
    ).join('\n');

    // 3. Construct the message
    const message = encodeURIComponent(
      `*ORDER REQUEST - ${data.businessName}*\n\n` +
      `${itemDetails}\n\n` +
      `*Total: ₦${subtotal.toLocaleString()}*\n\n` +
      `Please confirm availability and delivery timeline.`
    );

    // 4. Use the sanitized number in the URL
    window.open(`https://wa.me/${sanitizedNumber}?text=${message}`, '_blank');
  };

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
      <div ref={drawerRef} className="fixed top-0 right-0 w-full sm:max-w-md h-[100dvh] bg-white z-[101] translate-x-full p-6 shadow-2xl flex flex-col">
        
        <div className="flex justify-between items-center mb-8 border-b pb-4">
          <h2 className="font-serif text-xl uppercase italic text-black">Your Bag</h2>
          <button onClick={onClose} className="text-[10px] tracking-widest uppercase border border-black px-4 py-1 rounded-full bg-black text-white">Close</button>
        </div>

        <div className="flex-1 overflow-y-auto pr-2">
          {cart.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <p className="text-black text-sm italic">Your bag is empty.</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-4 border-b border-stone-50 pb-6 mb-6 items-start">
                <div className="w-20 h-24 bg-stone-100 flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-1 flex flex-col justify-between h-24">
                  <div>
                    <h3 className="text-[11px] font-bold uppercase tracking-tight text-black leading-tight">{item.name}</h3>
                    <p className="text-sm font-serif text-stone-600">{item.price}</p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-stone-200 rounded-sm text-black">
                      <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:bg-stone-50">
                        <Minus size={12} />
                      </button>
                      <span className="text-xs px-2 font-medium min-w-[24px] text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:bg-stone-50">
                        <Plus size={12} />
                      </button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-black hover:text-red-500 transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="pt-6 border-t border-stone-100">
          <div className="flex justify-between mb-6">
            <span className="uppercase text-[10px] tracking-widest font-bold text-black">Total</span>
            <span className="font-serif text-xl text-black">₦{subtotal.toLocaleString()}</span>
          </div>
          <button 
            disabled={cart.length === 0}
            onClick={handleCheckout}
            className="w-full bg-stone-900 text-white py-5 uppercase text-[10px] font-bold tracking-[0.2em] active:scale-[0.98] transition-all disabled:opacity-30"
          >
            Send Order to WhatsApp
          </button>
        </div>
      </div>
    </>
  );
}