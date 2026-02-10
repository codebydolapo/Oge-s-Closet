# 👠 Oge’s Closet | Premium Fashion E-Commerce

**Oge’s Closet** is a high-end, editorial-style boutique web application built to demonstrate the intersection of performant web architecture and luxury user experience. It features fluid GSAP animations, a custom state-managed cart system, and a responsive, data-driven product catalog.

## 🌟 Key Features

* **Cinematic Hero Experience:** An immersive, high-resolution entry point using GSAP-controlled scaling and staggered text reveals.
* **Dynamic Product Discovery:** A filterable catalog allowing users to browse by category (Shoes, Bags, Watches) with instantaneous state updates.
* **Boutique Animation Engine:** * **Scroll-Triggered Reveals:** Images slide out of "curtain" masks as the user scrolls.
* **Custom Cursor:** A sophisticated, lag-smoothed follower that responds to interactive elements.
* **Micro-interactions:** Smooth "Add to Cart" haptic-style UI feedback.


* **Context-Powered Cart:** A lightweight slide-in drawer managed via React Context API, featuring real-time subtotal calculations and item persistence.
* **Performance First:** Built on Next.js 15 for optimized image loading and zero-jank transitions.

## 🛠️ Tech Stack

* **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Animation:** [GSAP](https://greensock.com/gsap/) (GreenSock Animation Platform)
* **Icons/Graphics:** Custom SVG silhouettes
* **State Management:** React Context API
* **Deployment:** Vercel

## 🚀 Getting Started

1. **Clone the repository:**
```bash
git clone https://github.com/your-username/oges-closet.git

```


2. **Install dependencies:**
```bash
npm install

```


3. **Run the development server:**
```bash
npm run dev

```


4. **Open the site:**
Navigate to `http://localhost:3000` to view the luxury experience.

## 📐 Project Architecture

The project follows a modular component-based architecture to ensure scalability and ease of maintenance:

```text
src/
├── app/            # Next.js App Router (Layouts & Pages)
├── components/     
│   ├── layout/     # Navbar, Footer
│   ├── sections/   # Hero, ProductGrid, Showcase, Newsletter
│   └── ui/         # RevealImage, CustomCursor, CartDrawer
├── context/        # Global State (CartContext)
├── lib/            # Product Data & GSAP Helpers
└── styles/         # Global CSS & Tailwind Config

```

## 💎 Design Philosophy

The design of Oge’s Closet is inspired by modern fashion editorial layouts (e.g., *Vogue*, *Gucci*).

* **Typography:** A pairing of *Playfair Display* (Serif) for elegance and *Inter* (Sans-serif) for functional readability.
* **Motion:** Animations are designed with a `power4.out` easing to mimic the smooth, weighted movement of high-end mechanical objects.
* **Minimalism:** High use of whitespace and "Mix-Blend-Mode" navigation to keep the focus on the product imagery.

---

### 👨‍💻 Developed by [Dolapo]


