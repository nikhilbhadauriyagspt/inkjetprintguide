import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Wishlist() {
  const { wishlist, toggleWishlist, addToCart, wishlistCount } = useCart();

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) {
        const path = imgs[0].replace(/\\/g, '/');
        return path.startsWith('/') ? path : `/${path}`;
      }
    } catch (e) { }
    return "/logo/fabicon.png";
  };

  if (wishlistCount === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-[#f8faff] font-sans text-center">
        <div className="w-24 h-24 bg-white rounded-[32px] flex items-center justify-center mb-8 border border-slate-100 shadow-sm">
          <Heart size={40} className="text-slate-200" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Your Wishlist is Empty</h2>
        <p className="text-slate-500 font-medium text-lg mb-12 max-w-md">Save your favorite printers and supplies here for quick access later.</p>
        <Link to="/shop" className="px-10 py-4 bg-[#2f5cab] text-white font-bold rounded-full shadow-xl shadow-blue-600/20 active:scale-95 hover:bg-[#234d98] transition-all">
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8faff] font-sans text-slate-900 pb-20">

      {/* --- PAGE HEADER --- */}
      <div className="bg-white py-12 md:py-16 border-b border-slate-100 mb-12">
        <div className="max-w-[1800px] mx-auto px-4 md:px-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <nav className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              <Link to="/" className="hover:text-[#2f5cab] transition-colors">Home</Link>
              <ChevronRight size={12} className="opacity-50" />
              <span className="text-[#2f5cab]">Wishlist</span>
            </nav>
            <h1 className="text-3xl md:text-5xl font-bold text-slate-900">
              Saved Items
            </h1>
          </div>
          <div className="text-slate-500 text-[14px] font-bold bg-white px-8 py-3 border border-slate-200 rounded-full shadow-sm">
            <span className="text-[#2f5cab] font-black">{wishlistCount}</span> {wishlistCount === 1 ? 'Product' : 'Products'} Saved
          </div>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-4 md:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
          <AnimatePresence>
            {wishlist.map((p) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="group flex flex-col bg-white rounded-[32px] p-4 border border-slate-100 hover:shadow-2xl hover:shadow-blue-600/5 transition-all duration-500"
              >
                {/* Image Container */}
                <div className="relative aspect-square bg-slate-50 rounded-[24px] flex items-center justify-center overflow-hidden mb-6 group-hover:bg-white transition-colors">
                  <Link to={`/product/${p.slug}`} className="w-full h-full flex items-center justify-center p-8">
                    <img
                      src={getImagePath(p.images)}
                      alt={p.name}
                      className="w-full h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => { e.currentTarget.src = "/logo/fabicon.png"; }}
                    />
                  </Link>

                  <button
                    onClick={() => toggleWishlist(p)}
                    className="absolute top-4 right-4 w-11 h-11 bg-white shadow-lg text-slate-300 rounded-full flex items-center justify-center z-10 hover:bg-red-50 hover:text-red-500 transition-all active:scale-90"
                    aria-label="Remove from wishlist"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>

                {/* Content */}
                <div className="px-2 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold text-[#2f5cab] uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">{p.brand_name || 'Printer'}</span>
                    <div className="h-2 w-2 rounded-full bg-emerald-500" />
                  </div>

                  <Link to={`/product/${p.slug}`}>
                    <h3 className="text-[16px] font-bold text-slate-800 group-hover:text-[#2f5cab] transition-colors leading-tight line-clamp-2 mb-4 min-h-[40px]">{p.name}</h3>
                  </Link>

                  <div className="mt-auto pt-4 flex flex-col gap-4">
                    <p className="text-2xl font-black text-slate-900">₹{parseFloat(p.price).toLocaleString()}</p>

                    <button
                      onClick={() => addToCart(p)}
                      className="w-full h-12 bg-[#2f5cab] text-white rounded-2xl flex items-center justify-center gap-3 text-[13px] font-bold uppercase tracking-widest hover:bg-[#234d98] transition-all shadow-lg shadow-blue-600/10 active:scale-95"
                    >
                      <ShoppingCart size={18} /> Add to cart
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-20 pt-10 border-t border-slate-100">
          <Link to="/shop" className="inline-flex items-center gap-3 text-[14px] font-bold text-slate-400 hover:text-[#2f5cab] transition-all group uppercase tracking-widest">
            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
