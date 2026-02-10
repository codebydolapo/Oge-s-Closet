import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Oge's Closet | Luxury Accessories",
  description: "Bags, Shoes, and Timeless Style",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth scrollbar-hide">
      <body className={`${playfair.variable} ${inter.variable} font-sans bg-stone-50 text-stone-900`}>
        <CartProvider>
        {children}
        </CartProvider>
      </body>
    </html>
  );
}