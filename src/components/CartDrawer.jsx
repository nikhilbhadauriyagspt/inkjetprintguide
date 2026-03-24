import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function CartDrawer() {
  const { isCartDrawerOpen, closeCartDrawer, cart, removeFromCart, updateQuantity, cartCount } = useCart();

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === "string" ? JSON.parse(images) : images;
      const first = Array.isArray(imgs) && imgs.length ? imgs[0] : null;
      if (!first) return "/logo/fabicon.png";
      const cleaned = String(first).replaceAll("\\", "/");
      return cleaned.startsWith("/") ? cleaned : `/${cleaned}`;
    } catch {
      return "/logo/fabicon.png";
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
            className="fixed inset-0 bg-black/60 backdrop-blur-[2px] z-[1000]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: "easeOut" }}
            className="fixed top-0 right-0 h-full w-full max-w-[400px] bg-[#eaeded] z-[1001] shadow-2xl flex flex-col font-['Rubik']"
          >
            {/* Header */}
            <div className="bg-[#232f3e] text-white px-6 py-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} className="text-[#ffd814]" />
                <h2 className="text-lg font-bold">Shopping Cart ({cartCount})</h2>
              </div>
              <button
                onClick={closeCartDrawer}
                className="p-1 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
              >
                <X size={24} />
              </button>
            </div>

            {/* Sub-header Message */}
            {cart.length > 0 && (
                <div className="bg-white px-6 py-3 border-b border-gray-300 flex items-center gap-3">
                    <div className="w-5 h-5 bg-emerald-600 rounded-full flex items-center justify-center text-white">
                        <ShieldCheck size={12} strokeWidth={3} />
                    </div>
                    <p className="text-[12px] font-bold text-gray-700">Your order qualifies for FREE Shipping</p>
                </div>
            )}

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
              {cart.length > 0 ? (
                <>
                  {cart.map((item) => (
                    <div key={item.id} className="bg-white border border-gray-300 rounded-md p-4 flex gap-4 shadow-sm">
                      <div className="h-20 w-20 flex-shrink-0 border border-gray-100 rounded-sm p-1">
                        <img
                          src={getImagePath(item.images)}
                          alt={item.name}
                          className="w-full h-full object-contain mix-blend-multiply"
                          onError={(e) => { e.target.src = "/logo/fabicon.png"; }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <Link 
                            to={`/product/${item.slug}`} 
                            onClick={closeCartDrawer}
                            className="text-[13px] font-bold text-[#007185] hover:text-[#c45500] hover:underline line-clamp-2 leading-tight mb-2 block"
                        >
                            {item.name}
                        </Link>
                        
                        <div className="flex items-center justify-between mt-auto">
                            <div className="flex items-center bg-[#f0f2f2] border border-gray-300 rounded-md h-7 overflow-hidden shadow-sm">
                                <button
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="px-2 h-full hover:bg-gray-200 text-gray-600 cursor-pointer disabled:opacity-30"
                                    disabled={item.quantity <= 1}
                                >
                                    <Minus size={12} strokeWidth={3} />
                                </button>
                                <span className="px-3 text-[12px] font-bold text-gray-800">{item.quantity}</span>
                                <button
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="px-2 h-full hover:bg-gray-200 text-gray-600 cursor-pointer"
                                >
                                    <Plus size={12} strokeWidth={3} />
                                </button>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="text-[15px] font-bold text-[#0f1111]">${(Number(item.price || 0) * item.quantity).toLocaleString()}</span>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-[11px] font-medium text-[#007185] hover:text-[#c45500] hover:underline cursor-pointer"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center px-6">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm border border-gray-200">
                    <ShoppingBag size={40} className="text-gray-200" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0f1111] mb-2">Your Bag is empty</h3>
                  <p className="text-sm text-[#565959] mb-8">Items added to your cart will appear here.</p>
                  <button
                    onClick={closeCartDrawer}
                    className="bg-[#ffd814] border border-[#fcd200] hover:bg-[#f7ca00] text-[#0f1111] px-10 py-2.5 text-[14px] font-medium rounded-md shadow-sm transition-colors cursor-pointer"
                  >
                    Continue Shopping
                  </button>
                </div>
              )}
            </div>

            {/* Footer Summary */}
            {cart.length > 0 && (
              <div className="bg-white border-t border-gray-300 p-6 space-y-4 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
                <div className="flex items-center justify-between text-[#0f1111]">
                  <span className="text-lg font-normal">Subtotal</span>
                  <span className="text-2xl font-bold">${total.toLocaleString()}</span>
                </div>
                
                <div className="space-y-3 pt-2">
                    <Link
                        to="/checkout"
                        onClick={closeCartDrawer}
                        className="w-full h-12 bg-[#ffd814] border border-[#fcd200] hover:bg-[#f7ca00] text-[#0f1111] flex items-center justify-center font-normal text-[14px] rounded-md shadow-sm transition-colors cursor-pointer"
                    >
                        Proceed to Checkout
                    </Link>
                    <Link
                        to="/cart"
                        onClick={closeCartDrawer}
                        className="w-full h-12 bg-white border border-gray-300 hover:bg-gray-50 text-[#0f1111] flex items-center justify-center font-normal text-[14px] rounded-md shadow-sm transition-colors cursor-pointer"
                    >
                        Go to Cart
                    </Link>
                </div>

                <div className="flex flex-col gap-2 pt-2 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-[11px] text-[#565959]">
                        <Truck size={14} className="text-emerald-600" />
                        <span>Fast delivery on all printer systems</span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-[#565959]">
                        <ShieldCheck size={14} className="text-emerald-600" />
                        <span>Secure SSL encrypted transaction</span>
                    </div>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #eaeded; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}</style>
    </AnimatePresence>
  );
}
