import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ChevronLeft, ShoppingCart, ArrowRight, ShieldCheck } from 'lucide-react';
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
      return '/logo/fabicon.avif';
    } catch {
      return '/logo/fabicon.avif';
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-[#f5f5f5] text-center">
        <div className="w-24 h-24 bg-white shadow-xl shadow-slate-200/50 rounded-3xl flex items-center justify-center mb-8 border border-slate-100">
          <ShoppingCart size={40} className="text-slate-200" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">Your Cart is Empty</h2>
        <p className="text-slate-500 mb-10 font-medium">Add some amazing printers to your cart to get started.</p>
        <Link to="/shop" className="px-10 py-4 bg-slate-900 text-white font-bold text-sm uppercase tracking-widest rounded-xl hover:bg-[#05718A] transition-all flex items-center gap-3 shadow-lg shadow-slate-200">
          <ChevronLeft size={18} />
          Explore Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] font-sans text-slate-900 pb-20">
      <SEO title="Your Shopping Cart | Premium Printers & Ink | Inklivo" />

      <div className="max-w-[1700px] mx-auto px-6 py-16">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-1.5 h-10 bg-[#05718A] rounded-full"></div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Shopping Cart</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Items */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white border border-slate-100 rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden">
              <div className="p-8 md:p-10 space-y-10">
                {cart.map((item) => (
                  <div key={item.id} className="flex flex-col sm:flex-row gap-8 pb-10 border-b border-slate-50 last:border-0 last:pb-0">
                    <div className="w-full sm:w-40 h-40 bg-slate-50 rounded-2xl flex items-center justify-center shrink-0 p-6 border border-slate-100 group transition-all hover:bg-white hover:shadow-inner">
                      <img
                        src={getImagePath(item.images)}
                        alt={item.name}
                        className="max-w-full max-h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => { e.target.src = "/logo/fabicon.avif"; }}
                      />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col">
                      <div className="flex justify-between gap-4 mb-4">
                        <Link to={`/product/${item.slug}`} className="font-bold text-xl text-slate-900 hover:text-[#05718A] transition-colors line-clamp-2 leading-tight">{item.name}</Link>
                        <button onClick={() => removeFromCart(item.id)} className="text-slate-300 hover:text-red-500 transition-all p-2 bg-slate-50 hover:bg-red-50 rounded-xl" title="Remove item"><Trash2 size={20} /></button>
                      </div>

                      <div className="flex items-center justify-between mt-auto pt-6">
                        <div className="flex items-center bg-slate-50 border border-slate-200 p-1.5 rounded-xl">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-9 h-9 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-white rounded-lg transition-all disabled:opacity-20" disabled={item.quantity <= 1}><Minus size={14} strokeWidth={3} /></button>
                          <span className="w-12 text-center font-bold text-[16px] text-slate-900">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-9 h-9 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-white rounded-lg transition-all"><Plus size={14} strokeWidth={3} /></button>
                        </div>
                        <div className="text-right">
                          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Price</p>
                          <span className="font-bold text-2xl text-slate-900 tracking-tight">${parseFloat(item.price).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Link to="/shop" className="inline-flex items-center gap-3 text-sm font-bold text-slate-400 hover:text-[#05718A] transition-all uppercase tracking-widest ml-4">
              <ChevronLeft size={18} /> Continue Shopping
            </Link>
          </div>

          {/* Summary */}
          <div className="lg:col-span-4">
            <div className="bg-white p-10 sticky top-32 border border-slate-100 rounded-3xl shadow-2xl shadow-slate-200/60 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-2 bg-[#05718A]"></div>
              <h3 className="text-xl font-bold mb-10 text-slate-900">Order Summary</h3>

              <div className="space-y-6 mb-10">
                <div className="flex justify-between text-[15px] text-slate-500 font-medium">
                  <span>Subtotal</span>
                  <span className="text-slate-900 font-bold">${total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[15px] text-slate-500 font-medium">
                  <span>Shipping</span>
                  <span className="text-emerald-600 font-bold">FREE</span>
                </div>
                <div className="pt-8 border-t border-slate-100 flex justify-between items-center">
                  <span className="font-bold text-slate-900 text-lg">Total Amount</span>
                  <span className="font-bold text-3xl text-[#05718A] tracking-tight">${total.toLocaleString()}</span>
                </div>
              </div>

              <Link to="/checkout" className="w-full h-16 bg-slate-900 text-white flex items-center justify-center gap-4 font-bold text-sm uppercase tracking-widest rounded-2xl hover:bg-[#05718A] transition-all shadow-xl shadow-slate-200">
                Checkout Now
                <ArrowRight size={20} />
              </Link>

              <div className="mt-8 pt-8 border-t border-slate-50 text-center">
                <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <ShieldCheck size={14} className="text-emerald-500" />
                  Secure Verified Checkout
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

