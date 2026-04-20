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
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-[4px] z-[1500]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: "easeOut" }}
            className="fixed top-0 right-0 h-full w-full max-w-[440px] bg-white z-[1501] shadow-2xl flex flex-col font-sans"
          >
            {/* Header */}
            <div className="bg-[#2f5cab] text-white px-8 py-8 flex items-center justify-between shadow-lg relative overflow-hidden">
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10">
                  <ShoppingBag size={24} className="text-white" />
                </div>
                <div className="flex flex-col">
                  <h2 className="text-xl font-bold leading-none">Your Cart</h2>
                  <p className="text-[12px] font-bold text-blue-100 uppercase tracking-widest mt-2">{cartCount} {cartCount === 1 ? 'Item' : 'Items'} Selected</p>
                </div>
              </div>
              <button
                onClick={closeCartDrawer}
                className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all cursor-pointer relative z-10 active:scale-95"
              >
                <X size={22} />
              </button>
              
              {/* Background Accent */}
              <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
            </div>

            {/* Sub-header Message */}
            {cart.length > 0 && (
              <div className="bg-blue-50 px-8 py-3 border-b border-blue-100 flex items-center gap-3">
                <Truck size={16} className="text-[#2f5cab]" />
                <p className="text-[11px] font-bold text-[#2f5cab] uppercase tracking-wider">Your order qualifies for Free Delivery</p>
              </div>
            )}

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar bg-slate-50/30">
              {cart.length > 0 ? (
                <>
                  {cart.map((item) => (
                    <div key={item.id} className="bg-white border border-slate-100 rounded-[28px] p-4 flex gap-5 shadow-sm group hover:shadow-xl hover:shadow-blue-600/5 transition-all duration-500">
                      <div className="h-24 w-24 flex-shrink-0 bg-slate-50 rounded-2xl p-2 flex items-center justify-center group-hover:bg-white transition-colors">
                        <img
                          src={getImagePath(item.images)}
                          alt={item.name}
                          className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700"
                        />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col justify-center">
                        <Link
                          to={`/product/${item.slug}`}
                          onClick={closeCartDrawer}
                          className="text-[14px] font-bold text-slate-800 hover:text-[#2f5cab] transition-colors line-clamp-2 leading-tight mb-3"
                        >
                          {item.name}
                        </Link>

                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex items-center bg-slate-50 rounded-xl p-1">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white hover:text-[#2f5cab] transition-all disabled:opacity-20"
                              disabled={item.quantity <= 1}
                            >
                              <Minus size={12} strokeWidth={3} />
                            </button>
                            <span className="px-3 text-[13px] font-bold text-slate-900">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white hover:text-[#2f5cab] transition-all"
                            >
                              <Plus size={12} strokeWidth={3} />
                            </button>
                          </div>

                          <div className="flex flex-col items-end">
                            <span className="text-[16px] font-black text-slate-900 er">₹{(Number(item.price || 0) * item.quantity).toLocaleString()}</span>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-[11px] font-bold text-slate-300 hover:text-red-500 transition-colors uppercase tracking-widest mt-1"
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
                <div className="h-full flex flex-col items-center justify-center text-center px-8">
                  <div className="w-24 h-24 bg-white rounded-[32px] flex items-center justify-center mb-8 border border-slate-100 shadow-sm">
                    <ShoppingBag size={40} className="text-slate-100" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">Your cart is empty</h3>
                  <p className="text-[14px] text-slate-500 mb-10 font-medium">Add some printers or supplies to start your order.</p>
                  <button
                    onClick={closeCartDrawer}
                    className="bg-slate-900 text-white px-10 py-4 text-[13px] font-bold uppercase tracking-widest rounded-full hover:bg-[#2f5cab] transition-all active:scale-95 shadow-lg shadow-slate-200"
                  >
                    Browse Catalog
                  </button>
                </div>
              )}
            </div>

            {/* Footer Summary */}
            {cart.length > 0 && (
              <div className="bg-white border-t border-slate-50 p-8 space-y-6 shadow-[0_-20px_50px_rgba(0,0,0,0.04)] rounded-t-[40px]">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-slate-400 text-[12px] font-bold uppercase tracking-widest">
                    <span>Subtotal Manifest</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-900 text-3xl font-black er">
                    <span>₹{total.toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <Link
                    to="/checkout"
                    onClick={closeCartDrawer}
                    className="w-full h-16 bg-[#2f5cab] text-white flex items-center justify-center gap-3 font-bold text-[15px] uppercase tracking-widest rounded-full hover:bg-[#234d98] transition-all active:scale-95 shadow-xl shadow-blue-600/10"
                  >
                    Proceed to Checkout
                    <ArrowRight size={20} />
                  </Link>
                  <Link
                    to="/cart"
                    onClick={closeCartDrawer}
                    className="w-full h-14 border border-slate-200 text-slate-500 hover:text-[#2f5cab] hover:border-blue-100 flex items-center justify-center font-bold text-[13px] uppercase tracking-widest rounded-full transition-all active:scale-95"
                  >
                    View Shopping Cart
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
