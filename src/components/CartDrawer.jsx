import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Truck, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function CartDrawer() {
  const { isCartDrawerOpen, closeCartDrawer, cart, removeFromCart, updateQuantity, cartCount } = useCart();

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) {
        return `/${imgs[0].replace(/\\/g, '/')}`;
      }
      return '/logo/fabicon.png';
    } catch {
      return '/logo/fabicon.png';
    }
  };

  return (
    <AnimatePresence>
      {isCartDrawerOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCartDrawer}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] z-[1500]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: "easeOut" }}
            className="fixed top-0 right-0 h-full w-full max-w-[420px] bg-white z-[1501] shadow-2xl flex flex-col font-sans"
          >
            {/* Header */}
            <div className="bg-[#991B1B] text-white px-6 py-6 flex items-center justify-between shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center border border-white/20">
                  <ShoppingBag size={20} className="text-white" />
                </div>
                <div className="flex flex-col">
                  <h2 className="text-[17px] font-bold leading-none uppercase ">Your Manifest</h2>
                  <p className="text-[10px] font-black text-white/60 uppercase tracking-[0.2em] mt-1">{cartCount} Units Selected</p>
                </div>
              </div>
              <button
                onClick={closeCartDrawer}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Sub-header Message */}
            {cart.length > 0 && (
              <div className="bg-red-50 px-6 py-3 border-b border-red-100 flex items-center gap-3">
                <div className="w-4 h-4 bg-[#991B1B] rounded-full flex items-center justify-center text-white">
                  <ShieldCheck size={10} strokeWidth={3} />
                </div>
                <p className="text-[11px] font-bold text-[#991B1B] uppercase ">System qualifies for Priority Logistics</p>
              </div>
            )}

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar bg-slate-50/30">
              {cart.length > 0 ? (
                <>
                  {cart.map((item) => (
                    <div key={item.id} className="bg-white border border-slate-100 rounded-3xl p-4 flex gap-4 shadow-sm group hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500">
                      <div className="h-24 w-24 flex-shrink-0 bg-[#FBFBFB] rounded-2xl p-2 flex items-center justify-center">
                        <img
                          src={getImagePath(item.images)}
                          alt={item.name}
                          className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700"
                        />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col">
                        <Link
                          to={`/product/${item.slug}`}
                          onClick={closeCartDrawer}
                          className="text-[13px] font-bold text-slate-800 hover:text-[#991B1B] transition-colors line-clamp-2 leading-tight mb-2 uppercase "
                        >
                          {item.name}
                        </Link>

                        <div className="mt-auto flex items-end justify-between">
                          <div className="flex items-center bg-slate-50 rounded-xl p-1 h-9">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white hover:text-[#991B1B] transition-all disabled:opacity-30"
                              disabled={item.quantity <= 1}
                            >
                              <Minus size={12} strokeWidth={3} />
                            </button>
                            <span className="px-3 text-[13px] font-black text-slate-900">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white hover:text-[#991B1B] transition-all"
                            >
                              <Plus size={12} strokeWidth={3} />
                            </button>
                          </div>

                          <div className="flex flex-col items-end">
                            <span className="text-[16px] font-black text-slate-900 er">${(Number(item.price || 0) * item.quantity).toLocaleString()}</span>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-[10px] font-black text-slate-300 hover:text-red-600 transition-colors uppercase tracking-[0.2em] mt-2"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center px-6">
                  <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mb-6">
                    <ShoppingBag size={32} className="text-slate-200" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 lowercase">manifest is empty.</h3>
                  <p className="text-xs text-slate-400 mb-8 font-medium uppercase tracking-widest">No hardware units detected.</p>
                  <button
                    onClick={closeCartDrawer}
                    className="bg-slate-900 text-white px-10 py-4 text-[11px] font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-[#991B1B] transition-all active:scale-95"
                  >
                    Return to Shop
                  </button>
                </div>
              )}
            </div>

            {/* Footer Summary */}
            {cart.length > 0 && (
              <div className="bg-white border-t border-slate-100 p-8 space-y-6 shadow-2xl rounded-t-[40px]">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-slate-300 text-[10px] font-black uppercase tracking-[0.3em]">
                    <span>Total Manifest Value</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-900 text-3xl font-black er">
                    <span>${total.toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link
                    to="/checkout"
                    onClick={closeCartDrawer}
                    className="w-full h-16 bg-slate-900 text-white flex items-center justify-center gap-3 font-black text-[11px] uppercase tracking-[0.3em] rounded-3xl hover:bg-[#991B1B] transition-all active:scale-95 shadow-xl shadow-slate-200/50 hover:shadow-red-900/20"
                  >
                    Execute Checkout <ArrowRight size={18} />
                  </Link>
                  <Link
                    to="/cart"
                    onClick={closeCartDrawer}
                    className="w-full h-14 border-2 border-slate-50 text-slate-400 hover:text-slate-900 hover:border-slate-100 flex items-center justify-center font-bold text-[11px] uppercase tracking-[0.2em] rounded-2xl transition-all"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #f1f5f9; border-radius: 20px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #e2e8f0; }
      `}</style>
    </AnimatePresence>
  );
}
