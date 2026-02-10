"use client"
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import ProductGrid from "@/components/sections/ProductGrid";
import Showcase from "@/components/sections/Showcase";
import Newsletter from "@/components/sections/Newsletter";
import CustomCursor from "@/components/ui/Cursor";
import CartDrawer from "@/components/ui/CartDrawer";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/ui/BackToTop";

export default function Home() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <CustomCursor />
      {/* 1. Pass the opener to the Navbar */}
      <Navbar onCartClick={() => setIsCartOpen(true)} />

      {/* 2. Pass the state and closer to the Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <main>
        <Hero />
        <ProductGrid />
        <Showcase />
        <Newsletter />
        <Footer />
        <BackToTop />
      </main>
    </>
  );
}