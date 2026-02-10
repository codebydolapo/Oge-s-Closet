"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type CartItem = { id: number; name: string; price: string; image: string };

const CartContext = createContext<{
  cart: CartItem[];
  addToCart: (product: CartItem) => void;
} | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  
  const addToCart = (product: CartItem) => {
    setCart((prev) => [...prev, product]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};