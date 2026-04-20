import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import {
  Lock,
  Loader2,
  CheckCircle2,
  Package,
  ShieldCheck,
  Truck,
  ChevronLeft,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PayPalButtons } from "@paypal/react-paypal-js";
import API_BASE_URL from '../config';
import SEO from '@/components/SEO';

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    phone: '',
    paymentMethod: 'cod',
  });

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        email: user.email || '',
        firstName: user.name?.split(' ')[0] || '',
        lastName: user.name?.split(' ').slice(1).join(' ') || '',
        phone: user.phone || '',
      }));
    }
  }, []);

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOrderSuccess = async (paymentDetails = null) => {
    setLoading(true);
    try {
      const orderData = {
        ...formData,
        user_id: user?.id,
        total: total,
        items: cart,
        payment_details: paymentDetails,
        source: 'printmora.shop',
      };

      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();
      if (data.status === 'success') {
        setOrderId(data.order_id);
        setStep(3);
        clearCart();
      }
    } catch (err) {
      alert('Error placing order.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === 1) {
      window.scrollTo(0, 0);
      setStep(2);
    }
    else if (formData.paymentMethod === 'cod') await handleOrderSuccess();
  };

  if (cart.length === 0 && step !== 3) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-[#f8faff]">
        <div className="bg-white p-12 rounded-[32px] border border-blue-50 shadow-sm text-center max-w-md">
          <div className="w-20 h-20 bg-blue-50 text-blue-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <Package size={40} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Your cart is empty</h2>
          <p className="text-slate-500 mb-8 font-medium">Please add some items to proceed to checkout.</p>
          <Link to="/shop" className="inline-flex items-center gap-2 bg-[#2f5cab] text-white px-8 py-4 rounded-full font-bold hover:bg-[#234d98] transition-all active:scale-95 shadow-lg shadow-blue-600/20">
            <ChevronLeft size={18} />
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-[#f8faff]">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-12 rounded-[40px] border border-blue-50 shadow-xl shadow-blue-600/5 text-center max-w-lg w-full"
        >
          <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 size={48} />
          </div>
          <h1 className="text-3xl font-bold mb-3 text-slate-900">Order Confirmed!</h1>
          <p className="text-slate-500 mb-10 font-medium">
            Your order <span className="text-[#2f5cab] font-bold">#RP-{orderId}</span> has been placed successfully. 
            A confirmation has been sent to your email.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/orders" className="bg-[#2f5cab] text-white px-10 py-4 rounded-full font-bold hover:bg-[#234d98] transition-all shadow-lg shadow-blue-600/20 active:scale-95">
              Track Order
            </Link>
            <Link to="/" className="bg-white border border-slate-200 text-slate-900 px-10 py-4 rounded-full font-bold hover:bg-slate-50 transition-all active:scale-95">
              Back Home
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8faff] font-sans text-slate-900 pb-20">
      <SEO title="Secure Checkout | Print Mora" />

      {/* --- HEADER --- */}
      <div className="bg-white border-b border-slate-100 py-6 sticky top-0 z-[100] shadow-sm">
        <div className="max-w-[1400px] mx-auto px-4 md:px-10 flex items-center justify-between">
          <Link to="/">
            <img src="/logo/logo.png" alt="Logo" className="h-10 object-contain" />
          </Link>
          <div className="flex items-center gap-3 text-[#2f5cab] font-bold">
            <Lock size={20} />
            <span className="text-lg md:text-xl font-bold text-slate-900">Secure Checkout</span>
          </div>
          <div className="hidden md:block">
            <Link to="/cart" className="text-[14px] font-bold text-[#2f5cab] hover:underline flex items-center gap-2 transition-colors">
              <ChevronLeft size={16} />
              Return to Cart
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-10 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* MAIN FORM AREA */}
          <div className="lg:col-span-8">
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* STEP 1: SHIPPING */}
              <div className={`bg-white border ${step === 1 ? 'border-[#2f5cab] ring-4 ring-blue-600/5' : 'border-slate-100'} rounded-[32px] p-8 shadow-sm transition-all`}>
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <span className={`w-8 h-8 flex items-center justify-center rounded-full text-[14px] font-bold ${step > 1 ? 'bg-emerald-500 text-white' : 'bg-[#2f5cab] text-white'}`}>
                      {step > 1 ? <CheckCircle2 size={18} /> : '1'}
                    </span>
                    <h3 className="text-xl font-bold">Shipping Information</h3>
                  </div>
                  {step > 1 && (
                    <button onClick={() => setStep(1)} type="button" className="text-[14px] font-bold text-[#2f5cab] hover:underline transition-colors">Change</button>
                  )}
                </div>

                <AnimatePresence>
                  {step === 1 ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2 md:col-span-2">
                          <label className="text-[14px] font-bold text-slate-700 ml-1">Email Address</label>
                          <input required name="email" value={formData.email} onChange={handleInputChange} type="email" placeholder="your@email.com" className="w-full h-14 px-6 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-[#2f5cab] focus:bg-white focus:ring-4 focus:ring-[#2f5cab]/5 transition-all text-[15px] font-medium placeholder:text-slate-300" />
                        </div>

                        <div className="space-y-2">
                          <label className="text-[14px] font-bold text-slate-700 ml-1">First Name</label>
                          <input required name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="First Name" className="w-full h-14 px-6 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-[#2f5cab] focus:bg-white focus:ring-4 focus:ring-[#2f5cab]/5 transition-all text-[15px] font-medium placeholder:text-slate-300" />
                        </div>

                        <div className="space-y-2">
                          <label className="text-[14px] font-bold text-slate-700 ml-1">Last Name</label>
                          <input required name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Last Name" className="w-full h-14 px-6 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-[#2f5cab] focus:bg-white focus:ring-4 focus:ring-[#2f5cab]/5 transition-all text-[15px] font-medium placeholder:text-slate-300" />
                        </div>

                        <div className="space-y-2 md:col-span-2">
                          <label className="text-[14px] font-bold text-slate-700 ml-1">Delivery Address</label>
                          <input required name="address" value={formData.address} onChange={handleInputChange} placeholder="Street address, apartment, suite" className="w-full h-14 px-6 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-[#2f5cab] focus:bg-white focus:ring-4 focus:ring-[#2f5cab]/5 transition-all text-[15px] font-medium placeholder:text-slate-300" />
                        </div>

                        <div className="space-y-2">
                          <label className="text-[14px] font-bold text-slate-700 ml-1">City</label>
                          <input required name="city" value={formData.city} onChange={handleInputChange} placeholder="City Name" className="w-full h-14 px-6 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-[#2f5cab] focus:bg-white focus:ring-4 focus:ring-[#2f5cab]/5 transition-all text-[15px] font-medium placeholder:text-slate-300" />
                        </div>

                        <div className="space-y-2">
                          <label className="text-[14px] font-bold text-slate-700 ml-1">Zip Code</label>
                          <input required name="zipCode" value={formData.zipCode} onChange={handleInputChange} placeholder="Zip Code" className="w-full h-14 px-6 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-[#2f5cab] focus:bg-white focus:ring-4 focus:ring-[#2f5cab]/5 transition-all text-[15px] font-medium placeholder:text-slate-300" />
                        </div>

                        <div className="space-y-2 md:col-span-2">
                          <label className="text-[14px] font-bold text-slate-700 ml-1">Phone Number</label>
                          <input required name="phone" value={formData.phone} onChange={handleInputChange} type="tel" placeholder="+1 (000) 000-0000" className="w-full h-14 px-6 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-[#2f5cab] focus:bg-white focus:ring-4 focus:ring-[#2f5cab]/5 transition-all text-[15px] font-medium placeholder:text-slate-300" />
                        </div>
                      </div>
                      <div className="pt-6">
                        <button type="submit" className="bg-[#2f5cab] text-white px-12 py-4 rounded-full font-bold hover:bg-[#234d98] transition-all shadow-lg shadow-blue-600/20 active:scale-95">
                          Continue to Payment
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="text-[15px] text-slate-600 bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-1">
                      <p className="font-bold text-slate-900 text-lg">{formData.firstName} {formData.lastName}</p>
                      <p className="font-medium">{formData.address}</p>
                      <p className="font-medium">{formData.city}, {formData.zipCode}</p>
                      <p className="text-[#2f5cab] font-bold pt-2">Phone: {formData.phone}</p>
                    </div>
                  )}
                </AnimatePresence>
              </div>

              {/* STEP 2: PAYMENT */}
              <div className={`bg-white border ${step === 2 ? 'border-[#2f5cab] ring-4 ring-blue-600/5' : 'border-slate-100'} rounded-[32px] p-8 shadow-sm transition-all`}>
                <div className="flex items-center gap-4 mb-8">
                  <span className={`w-8 h-8 flex items-center justify-center rounded-full text-[14px] font-bold ${step === 2 ? 'bg-[#2f5cab] text-white' : 'bg-slate-50 text-slate-300'}`}>2</span>
                  <h3 className="text-xl font-bold">Payment Method</h3>
                </div>

                <AnimatePresence>
                  {step === 2 && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      className="space-y-8"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div
                          onClick={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                          className={`p-6 border-2 rounded-[24px] cursor-pointer flex items-start gap-4 transition-all ${formData.paymentMethod === 'cod' ? 'border-[#2f5cab] bg-blue-50/30' : 'border-slate-100 bg-white hover:border-slate-200'}`}
                        >
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mt-0.5 shrink-0 ${formData.paymentMethod === 'cod' ? 'border-[#2f5cab]' : 'border-slate-200'}`}>
                            {formData.paymentMethod === 'cod' && <div className="w-3 h-3 bg-[#2f5cab] rounded-full" />}
                          </div>
                          <div>
                            <p className="font-bold text-[16px]">Cash on Delivery</p>
                            <p className="text-[13px] text-slate-500 font-medium mt-1">Pay with cash when your system is delivered.</p>
                          </div>
                        </div>

                        <div
                          onClick={() => setFormData({ ...formData, paymentMethod: 'paypal' })}
                          className={`p-6 border-2 rounded-[24px] cursor-pointer flex items-start gap-4 transition-all ${formData.paymentMethod === 'paypal' ? 'border-[#2f5cab] bg-blue-50/30' : 'border-slate-100 bg-white hover:border-slate-200'}`}
                        >
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mt-0.5 shrink-0 ${formData.paymentMethod === 'paypal' ? 'border-[#2f5cab]' : 'border-slate-200'}`}>
                            {formData.paymentMethod === 'paypal' && <div className="w-3 h-3 bg-[#2f5cab] rounded-full" />}
                          </div>
                          <div>
                            <p className="font-bold text-[16px]">PayPal Checkout</p>
                            <p className="text-[13px] text-slate-500 font-medium mt-1">Secure payment via PayPal or Credit Card.</p>
                          </div>
                        </div>
                      </div>

                      {formData.paymentMethod === 'paypal' ? (
                        <div className="p-8 bg-slate-50 border border-slate-100 rounded-[24px]">
                          <PayPalButtons
                            style={{ layout: "vertical", shape: "pill", color: "blue" }}
                            createOrder={(data, actions) => actions.order.create({ purchase_units: [{ amount: { value: total.toString() } }] })}
                            onApprove={async (data, actions) => {
                              const details = await actions.order.capture();
                              await handleOrderSuccess(details);
                            }}
                          />
                        </div>
                      ) : (
                        <div className="pt-2">
                          <button
                            disabled={loading}
                            onClick={handleOrderSuccess}
                            type="button"
                            className="bg-[#2f5cab] text-white px-12 py-4 rounded-full font-bold hover:bg-[#234d98] transition-all shadow-lg shadow-blue-600/20 active:scale-95 flex items-center gap-3"
                          >
                            {loading ? <Loader2 className="animate-spin" size={20} /> : (
                              <>
                                Complete Order
                                <ArrowRight size={20} />
                              </>
                            )}
                          </button>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </form>
          </div>

          {/* ORDER SUMMARY SIDEBAR */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-slate-100 rounded-[32px] p-8 shadow-sm sticky top-32">
              <h3 className="text-xl font-bold mb-6">Order Summary</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-[15px] text-slate-500 font-medium">
                  <span>Subtotal:</span>
                  <span className="text-slate-900 font-bold">₹{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[15px] text-slate-500 font-medium">
                  <span>Shipping:</span>
                  <span className="text-emerald-500 font-bold">FREE</span>
                </div>
                <div className="pt-4 border-t border-slate-50 flex justify-between items-center">
                  <span className="font-bold text-slate-900 text-lg">Order Total:</span>
                  <span className="font-black text-2xl text-[#2f5cab]">₹{total.toLocaleString()}</span>
                </div>
              </div>

              <button
                disabled={loading || (step === 2 && formData.paymentMethod === 'paypal')}
                onClick={handleSubmit}
                className="w-full bg-[#2f5cab] text-white py-4 rounded-full font-bold transition-all shadow-lg shadow-blue-600/20 active:scale-95 hover:bg-[#234d98] disabled:opacity-50"
              >
                {step === 1 ? 'Use this address' : 'Confirm Order'}
              </button>
              
              <div className="mt-8 pt-8 border-t border-slate-50 space-y-4">
                <div className="flex items-center gap-3 text-slate-400 font-bold text-[11px] uppercase tracking-widest">
                  <ShieldCheck size={18} className="text-emerald-500" />
                  <span>Secure Checkout</span>
                </div>
                <div className="flex items-center gap-3 text-slate-400 font-bold text-[11px] uppercase tracking-widest">
                  <Truck size={18} className="text-[#2f5cab]" />
                  <span>Free Delivery</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
