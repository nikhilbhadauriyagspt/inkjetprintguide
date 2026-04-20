import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ChevronLeft, ShoppingCart, ArrowRight } from 'lucide-react';
import SEO from '@/components/SEO';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) {
        return `/${String(imgs[0]).replace(/\\/g, '/')}`;
      }
      return '/logo/fabicon.png';
    } catch {
      return '/logo/fabicon.png';
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-[#f8faff] text-center">
        <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center mb-8 border border-slate-100 shadow-sm">
          <ShoppingCart size={40} className="text-slate-200" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Your cart is empty</h2>
        <p className="text-slate-500 mb-10 font-medium">Looks like you haven't added any items to your cart yet.</p>
        <Link to="/shop" className="px-10 py-4 bg-[#2f5cab] text-white font-bold rounded-full hover:bg-[#234d98] transition-all shadow-lg shadow-blue-600/20 active:scale-95 flex items-center gap-2">
          <ChevronLeft size={18} />
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8faff] font-sans text-slate-900 pb-20">
      <SEO title="Shopping Cart | Print Mora" />

      <div className="max-w-[1400px] mx-auto px-4 md:px-10 py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-10">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Items */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white border border-slate-100 rounded-[32px] overflow-hidden shadow-sm">
              <div className="p-8 space-y-8">
                {cart.map((item) => (
                  <div key={item.id} className="flex flex-col sm:flex-row gap-6 pb-8 border-b border-slate-50 last:border-0 last:pb-0">
                    <div className="w-full sm:w-32 h-32 bg-slate-50 rounded-2xl flex items-center justify-center shrink-0 p-4">
                      <img
                        src={getImagePath(item.images)}
                        alt={item.name}
                        className="max-w-full max-h-full object-contain mix-blend-multiply"
                        onError={(e) => { e.target.src = "/logo/fabicon.png"; }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between gap-4 mb-4">
                        <Link to={`/product/${item.slug}`} className="font-bold text-lg text-slate-900 hover:text-[#2f5cab] transition-colors line-clamp-2">{item.name}</Link>
                        <button onClick={() => removeFromCart(item.id)} className="text-slate-300 hover:text-red-500 transition-colors p-1" title="Remove item"><Trash2 size={20} /></button>
                      </div>
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center bg-slate-50 border border-slate-100 rounded-xl p-1">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-[#2f5cab] hover:bg-white rounded-lg transition-all" disabled={item.quantity <= 1}><Minus size={14} strokeWidth={3} /></button>
                          <span className="w-10 text-center font-bold text-[15px] text-slate-900">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-[#2f5cab] hover:bg-white rounded-lg transition-all"><Plus size={14} strokeWidth={3} /></button>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Unit Price</p>
                          <span className="font-black text-xl text-slate-900">₹{parseFloat(item.price).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Link to="/shop" className="inline-flex items-center gap-2 text-[15px] font-bold text-[#2f5cab] hover:underline pt-4 transition-all">
              <ChevronLeft size={18} /> Continue Shopping
            </Link>
          </div>

          {/* Summary */}
          <div className="lg:col-span-4">
            <div className="bg-white border border-slate-100 rounded-[32px] p-8 sticky top-32 shadow-sm">
              <h3 className="text-xl font-bold mb-8">Order Summary</h3>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-[15px] text-slate-500 font-medium">
                  <span>Subtotal</span>
                  <span className="font-bold text-slate-900">₹{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[15px] text-slate-500 font-medium">
                  <span>Shipping</span>
                  <span className="text-emerald-500 font-bold">FREE</span>
                </div>
                <div className="pt-6 border-t border-slate-50 flex justify-between items-center">
                  <span className="font-bold text-slate-900 text-lg">Total</span>
                  <span className="font-black text-2xl text-[#2f5cab]">₹{total.toLocaleString()}</span>
                </div>
              </div>
              <Link to="/checkout" className="w-full h-16 bg-[#2f5cab] text-white flex items-center justify-center gap-3 rounded-full font-bold uppercase tracking-widest hover:bg-[#234d98] transition-all shadow-lg shadow-blue-600/20 active:scale-95">
                Proceed to Checkout
                <ArrowRight size={20} />
              </Link>
              
              <div className="mt-8 pt-8 border-t border-slate-50">
                <p className="text-[12px] text-slate-400 font-medium text-center uppercase tracking-widest">Secure & Encrypted Checkout</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
