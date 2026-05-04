import React from 'react';
import { m, AnimatePresence } from 'framer-motion';
import X from 'lucide-react/dist/esm/icons/x';
import ShoppingBag from 'lucide-react/dist/esm/icons/shopping-bag';
import Plus from 'lucide-react/dist/esm/icons/plus';
import Minus from 'lucide-react/dist/esm/icons/minus';
import Trash2 from 'lucide-react/dist/esm/icons/trash-2';
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right';
import ShieldCheck from 'lucide-react/dist/esm/icons/shield-check';
import Truck from 'lucide-react/dist/esm/icons/truck';
import ChevronRight from 'lucide-react/dist/esm/icons/chevron-right';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function CartDrawer() {
  const { isCartDrawerOpen, closeCartDrawer, cart, removeFromCart, updateQuantity, cartCount } = useCart();

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) {
        return `/${imgs[0].replace(/\\/g, '/')}`.replace(/\.(png|jpg|jpeg)$/i, '.avif');
      }
      return '/logo/fabicon.avif';
    } catch {
      return '/logo/fabicon.avif';
    }
  };

  return (
    <AnimatePresence>
      {isCartDrawerOpen && (
        <>
          {/* Overlay */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCartDrawer}
            className="fixed inset-0 bg-slate-900/60 z-[6000]"
          />

          {/* Drawer */}
          <m.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: "easeOut" }}
            className="fixed top-0 right-0 h-full w-full max-w-[460px] bg-[#f5f5f5] z-[6001] flex flex-col font-sans border-l border-slate-100 shadow-2xl"
          >
            {/* Header */}
            <div className="bg-white px-8 py-10 flex items-center justify-between border-b border-slate-100 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#05718A]"></div>
              <div className="flex items-center gap-5 relative z-10">
                <div className="w-1.5 h-10 bg-[#05718A] rounded-full"></div>
                <div className="flex flex-col">
                  <h2 className="text-2xl font-bold tracking-tight text-slate-900">Your Cart</h2>
                  <p className="text-[11px] font-bold text-[#05718A] tracking-widest mt-1 uppercase">{cartCount} {cartCount === 1 ? 'Printer' : 'Printers'} Ready</p>
                </div>
              </div>
              <button
                onClick={closeCartDrawer}
                aria-label="Close cart"
                className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-[#05718A] hover:bg-blue-50 transition-all cursor-pointer relative z-10"
              >
                <X size={20} />
              </button>
            </div>

            {/* Sub-header Message */}
            {cart.length > 0 && (
              <div className="bg-[#05718A] px-8 py-3 flex items-center gap-3 text-white">
                <Truck size={16} />
                <p className="text-[11px] font-bold uppercase tracking-widest">Free Shipping active on your order</p>
              </div>
            )}

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-[#f5f5f5]">
              {cart.length > 0 ? (
                <>
                  {cart.map((item) => (
                    <div key={item.id} className="bg-white border border-slate-100 p-5 rounded-[24px] flex gap-5 group hover:shadow-xl hover:shadow-slate-200/50 transition-all border-b-4 border-b-transparent hover:border-b-[#05718A]">
                      <div className="h-24 w-24 flex-shrink-0 bg-slate-50 rounded-[18px] p-4 flex items-center justify-center border border-slate-50 group-hover:bg-white transition-colors">
                        <img
                          src={getImagePath(item.images)}
                          alt={item.name}
                          className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <Link
                            to={`/product/${item.slug}`}
                            onClick={closeCartDrawer}
                            className="text-[14px] font-bold text-slate-800 hover:text-[#05718A] transition-colors line-clamp-2 leading-snug mb-3"
                          >
                            {item.name}
                          </Link>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center bg-slate-50 border border-slate-200 p-1 rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              aria-label="Decrease quantity"
                              className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-md transition-all disabled:opacity-20"
                              disabled={item.quantity <= 1}
                            >
                              <Minus size={12} strokeWidth={3} />
                            </button>
                            <span className="px-3 text-[13px] font-bold text-slate-900">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              aria-label="Increase quantity"
                              className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-md transition-all"
                            >
                              <Plus size={12} strokeWidth={3} />
                            </button>
                          </div>

                          <div className="flex flex-col items-end">
                            <span className="text-[16px] font-bold text-slate-900 tracking-tight">${(Number(item.price || 0) * item.quantity).toLocaleString()}</span>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-[10px] font-bold text-slate-400 hover:text-red-500 transition-colors uppercase tracking-widest mt-1"
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
                <div className="h-full flex flex-col items-center justify-center text-center px-8 space-y-8">
                  <div className="w-24 h-24 bg-white shadow-xl shadow-slate-200/50 rounded-[32px] flex items-center justify-center text-slate-200 border border-slate-50">
                    <ShoppingBag size={40} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Your Cart is Empty</h3>
                    <p className="text-[14px] text-slate-500 font-medium leading-relaxed">Add some printers to your cart to see them here.</p>
                  </div>
                  <button
                    onClick={closeCartDrawer}
                    className="bg-slate-900 text-white px-10 py-4 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#05718A] transition-all shadow-lg shadow-slate-200"
                  >
                    Start Shopping
                  </button>
                </div>
              )}
            </div>

            {/* Footer Summary */}
            {cart.length > 0 && (
              <div className="bg-white p-8 space-y-6 border-t border-slate-100 shadow-[0_-20px_50px_rgba(0,0,0,0.04)] rounded-t-[32px]">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-slate-500 font-medium">
                    <span className="text-sm">Order Subtotal</span>
                    <span className="text-slate-900 font-bold">${total.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-900 text-3xl font-bold tracking-tight pt-2 border-t border-slate-50">
                    <span className="text-lg">Total</span>
                    <span className="text-[#05718A]">${total.toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link
                    to="/checkout"
                    onClick={closeCartDrawer}
                    className="w-full h-16 bg-slate-900 text-white flex items-center justify-center gap-4 rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-[#05718A] transition-all shadow-xl shadow-slate-200"
                  >
                    Checkout Now
                    <ArrowRight size={20} />
                  </Link>
                  <Link
                    to="/cart"
                    onClick={closeCartDrawer}
                    className="w-full h-14 bg-white border border-slate-200 text-slate-600 hover:text-[#05718A] hover:border-[#05718A] transition-all flex items-center justify-center rounded-2xl font-bold text-[12px] uppercase tracking-widest"
                  >
                    View Shopping Cart
                  </Link>
                </div>

                <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest pt-2">
                  <ShieldCheck size={14} className="text-emerald-500" />
                  Secure Verified Checkout
                </div>
              </div>
            )}
          </m.div>
        </>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #3b82f6; }
      `}</style>
    </AnimatePresence>
  );
}
