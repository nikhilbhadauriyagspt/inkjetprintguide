import { Heart, ShoppingCart, Check, ArrowRight, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { motion as motionFramer } from "framer-motion";

export default function ProductGrid({ products = [] }) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [addedItems, setAddedItems] = useState({});

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedItems((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === "string" ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) {
        return `/${String(imgs[0]).replace(/\\/g, "/")}`;
      }
    } catch (e) {
      console.log("Image parse error:", e);
    }
    return "/logo/fabicon.png";
  };

  return (
    <section className="w-full bg-white py-24 md:py-32 font-sans overflow-hidden border-t border-slate-50">
      <div className="max-w-[1600px] mx-auto px-6">

        {/* Modern Minimal Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <Zap size={14} className="text-[#991B1B]" fill="currentColor" />
              <span className="text-[11px] font-bold text-[#991B1B] uppercase tracking-[0.4em]">New Arrivals</span>
            </div>
            <motionFramer
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-light text-slate-900 leading-tight"
            >
              Fresh picks for your <span className="font-semibold text-[#991B1B]">workspace.</span>
            </motionFramer>
          </div>

          <Link to="/shop" className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-300 hover:text-[#991B1B] transition-colors flex items-center gap-3 group">
            Inventory <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        {/* 5-Column Grid Layout */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-12">
          {products && products.length > 0 ? (
            products.slice(0, 10).map((p, i) => (
              <motionFramer
                key={p.id || i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group flex flex-col h-full bg-white border border-slate-100 rounded-[32px] p-4 hover:shadow-2xl hover:shadow-slate-200/50 hover:border-white transition-all duration-500"
              >
                {/* Image Area */}
                <div className="relative aspect-square mb-6 bg-[#FBFBFB] rounded-[24px] flex items-center justify-center p-6 overflow-hidden group-hover:bg-white transition-colors duration-500">
                  <Link to={`/product/${p.slug}`} className="w-full h-full flex items-center justify-center">
                    <img
                      src={getImagePath(p.images)}
                      alt={p.name}
                      className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => { e.currentTarget.src = "/logo/fabicon.png"; }}
                    />
                  </Link>

                  <button
                    onClick={() => toggleWishlist(p)}
                    className={`absolute top-4 right-4 w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 ${isInWishlist(p.id) ? "text-[#991B1B] opacity-100" : "text-slate-300 hover:text-[#991B1B]"}`}
                  >
                    <Heart size={16} fill={isInWishlist(p.id) ? "currentColor" : "none"} />
                  </button>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 px-1">
                  <Link to={`/product/${p.slug}`}>
                    <h3 className="text-[13px] font-bold text-slate-800 leading-snug line-clamp-2 mb-3 group-hover:text-[#991B1B] transition-colors">
                      {p.name}
                    </h3>
                  </Link>

                  <div className="mt-auto flex items-center justify-between gap-2 pt-2">
                    <span className="text-[16px] font-black text-slate-900">${p.price}</span>
                    <button
                      onClick={() => handleAddToCart(p)}
                      disabled={addedItems[p.id]}
                      className={`h-10 w-10 rounded-xl flex items-center justify-center transition-all duration-300 ${addedItems[p.id]
                        ? "bg-emerald-500 text-white"
                        : "bg-slate-900 text-white hover:bg-[#991B1B] active:scale-90"}`}
                    >
                      {addedItems[p.id] ? <Check size={18} /> : <ShoppingCart size={16} />}
                    </button>
                  </div>
                </div>
              </motionFramer>
            ))
          ) : (
            <div className="col-span-full py-20 text-center text-slate-300 font-medium tracking-widest text-[10px] uppercase">
              Updating System Manifest...
            </div>
          )}
        </div>


      </div>
    </section>
  );
}
