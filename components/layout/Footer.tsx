import { Logo } from "../ui/Logo";

export default function Footer() {
  return (
    <footer className="bg-stone-50 pt-16 md:pt-24 pb-8 md:pb-12 px-6 md:px-12 border-t border-stone-200">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-16 md:mb-20 text-center sm:text-left">
          
          {/* Brand Info */}
          <div className="flex flex-col items-center sm:items-start order-last sm:order-first lg:col-span-1">
            <div className="scale-75 origin-center sm:origin-left mb-6 filter brightness-0 opacity-80">
              <Logo />
            </div>
            <p className="text-stone-400 text-[10px] leading-relaxed uppercase tracking-widest max-w-[250px]">
              Oge&apos;s Closet: A curated collection of timeless silhouettes and luxury essentials.
            </p>
          </div>

          {/* Links: Shop */}
          <div className="sm:pt-2">
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-5 md:mb-6 text-stone-900">Shop</h4>
            <ul className="space-y-3 md:space-y-4 text-[11px] text-stone-500 uppercase tracking-tighter font-medium">
              <li><a href="#" className="hover:text-black transition-colors">All Footwear</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Signature Bags</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Limited Watches</a></li>
            </ul>
          </div>

          {/* Links: Assistance */}
          <div className="sm:pt-2">
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-5 md:mb-6 text-stone-900">Assistance</h4>
            <ul className="space-y-3 md:space-y-4 text-[11px] text-stone-500 uppercase tracking-tighter font-medium">
              <li><a href="#" className="hover:text-black transition-colors">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Return Request</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Care Guide</a></li>
            </ul>
          </div>

          {/* Links: Socials */}
          <div className="sm:pt-2">
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-5 md:mb-6 text-stone-900">Social</h4>
            <ul className="space-y-3 md:space-y-4 text-[11px] text-stone-500 uppercase tracking-tighter font-medium">
              <li><a href="#" className="hover:text-black transition-colors italic">Instagram</a></li>
              <li><a href="#" className="hover:text-black transition-colors italic">Pinterest</a></li>
            </ul>
          </div>
        </div>

        {/* Legal Row */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-stone-200 gap-4">
          <p className="text-[9px] text-stone-400 uppercase tracking-[0.2em] text-center sm:text-left">
            &copy; 2026 Oge&apos;s Closet. Created for Portfolio.
          </p>
          <div className="flex gap-6 md:gap-8 text-[9px] text-stone-300 uppercase tracking-[0.2em]">
            <a href="#" className="hover:text-black transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-black transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}