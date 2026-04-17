import { Heart, Check, ArrowRight, Zap, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { motion } from "framer-motion";

export default function ProductGrid({ products = [] }) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [addedItems, setAddedItems] = useState({});

  const handleAddToCart = (p) => {
    addToCart(p);
    setAddedItems((prev) => ({ ...prev, [p.id]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [p.id]: false }));
    }, 1500);
  };

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === "string" ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) {
        return `/${String(imgs[0]).replace(/\\/g, "/")}`;
      }
    } catch (e) { console.log(e); }
    return "/logo/fabicon.png";
  };

  return (
    <section className="w-full bg-white py-20 md:py-28 font-sans overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6">

        {/* Minimal Header matched with AboutSection & ShopByCategory */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <Zap size={14} className="text-[#F54900]" fill="currentColor" />
              <span className="text-[11px] font-bold text-[#F54900] uppercase tracking-[0.4em]">New Arrivals</span>
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-light text-slate-900 leading-tight"
            >
              Fresh picks for your <span className="font-semibold text-[#F54900]">workspace.</span>
            </motion.h2>
          </div>

          <Link to="/shop" className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-300 hover:text-[#F54900] transition-colors flex items-center gap-3 group">
            All Products <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        {/* Ultra-Minimal Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-12">
          {products && products.slice(0, 10).map((p, i) => (
            <motion.div
              key={p.id || i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group flex flex-col"
            >
              {/* Minimal Image Container */}
              <div className="relative aspect-[4/5] mb-4 bg-[#f8f8f8] rounded-xl overflow-hidden flex items-center justify-center">
                <Link to={`/product/${p.slug}`} className="w-full h-full p-8 flex items-center justify-center">
                  <motion.img
                    src={getImagePath(p.images)}
                    alt={p.name}
                    className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { e.currentTarget.src = "/logo/fabicon.png"; }}
                  />
                </Link>

                {/* Minimal Wishlist */}
                <button
                  onClick={() => toggleWishlist(p)}
                  className={`absolute top-4 right-4 w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 ${isInWishlist(p.id) ? "text-[#F54900] opacity-100" : "text-slate-400 hover:text-[#F54900]"}`}
                >
                  <Heart size={14} fill={isInWishlist(p.id) ? "currentColor" : "none"} />
                </button>

                {/* Minimal Add to Cart Overlay */}
                <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <button
                    onClick={() => handleAddToCart(p)}
                    disabled={addedItems[p.id]}
                    className={`w-full py-2.5 rounded-lg text-xs font-bold transition-colors shadow-sm flex items-center justify-center gap-2 ${addedItems[p.id] ? "bg-emerald-500 text-white" : "bg-white text-slate-900 hover:bg-slate-900 hover:text-white"}`}
                  >
                    {addedItems[p.id] ? (
                      <><Check size={14} strokeWidth={3} /> Added</>
                    ) : (
                      "Add to Cart"
                    )}
                  </button>
                </div>
              </div>

              {/* Minimal Info Area */}
              <div className="flex flex-col px-1">
                <Link to={`/product/${p.slug}`}>
                  <h3 className="text-[13px] font-medium text-slate-800 leading-snug hover:text-[#F54900] transition-colors line-clamp-2 mb-1.5">
                    {p.name}
                  </h3>
                </Link>
                <div className="flex items-center gap-2">
                  <span className="text-[14px] font-bold text-slate-900">${p.price}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
