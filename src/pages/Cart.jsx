import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ChevronLeft, ShoppingCart } from 'lucide-react';
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
      <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-white text-center">
        <ShoppingCart size={64} className="text-slate-200 mb-6" />
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Your cart is empty</h2>
        <p className="text-slate-500 mb-8">Add some items to your cart to see them here.</p>
        <Link to="/shop" className="px-8 py-3 bg-slate-900 text-white font-bold rounded-lg hover:bg-[#F54900] transition-all">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 pb-20">
      <SEO title="Shopping Cart | My Printer Land" />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-12 uppercase  ">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Items */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <div key={item.id} className="flex gap-6 p-6 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <div className="w-24 h-24 bg-slate-50 rounded-xl flex items-center justify-center shrink-0 p-2">
                  <img
                    src={getImagePath(item.images)}
                    alt={item.name}
                    className="max-w-full max-h-full object-contain mix-blend-multiply"
                    onError={(e) => { e.target.src = "/logo/fabicon.png"; }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between gap-4 mb-4">
                    <Link to={`/product/${item.slug}`} className="font-bold text-slate-900 hover:text-[#F54900] line-clamp-1 uppercase ">{item.name}</Link>
                    <button onClick={() => removeFromCart(item.id)} className="text-slate-300 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 bg-slate-50 border border-slate-100 rounded-lg px-3 py-1">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-slate-400 hover:text-[#F54900]"><Minus size={14} strokeWidth={3} /></button>
                      <span className="font-bold text-sm text-slate-900">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-slate-400 hover:text-[#F54900]"><Plus size={14} strokeWidth={3} /></button>
                    </div>
                    <span className="font-bold text-lg text-slate-900">${Number(item.price).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}

            <Link to="/shop" className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-[#F54900] pt-4 transition-all">
              <ChevronLeft size={16} /> Continue Shopping
            </Link>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-8 sticky top-24">
              <h3 className="text-lg font-bold mb-6 uppercase ">Order Summary</h3>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-slate-500 font-medium">
                  <span>Subtotal</span>
                  <span className="font-bold text-slate-900">${total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-500 font-medium">
                  <span>Shipping</span>
                  <span className="text-emerald-600 font-bold uppercase ">Free</span>
                </div>
                <div className="pt-4 border-t border-slate-200 flex justify-between">
                  <span className="font-bold text-slate-900">Total</span>
                  <span className="font-bold text-2xl text-slate-900">${total.toLocaleString()}</span>
                </div>
              </div>
              <Link to="/checkout" className="w-full h-14 bg-slate-900 text-white flex items-center justify-center rounded-xl font-bold uppercase tracking-widest hover:bg-[#F54900] transition-all shadow-lg shadow-slate-200/50 hover:shadow-red-900/20">
                Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
