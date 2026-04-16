import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import {
  Lock,
  Loader2,
  CheckCircle2,
  Package,
  ShieldCheck,
  Truck
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
        source: 'myprintingbuddy.shop',
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
      <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-[#eaeded]">
        <div className="bg-white p-10 rounded-md border border-gray-300 shadow-sm text-center max-w-md">
          <Package size={48} className="text-gray-200 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Your cart is empty</h2>
          <Link to="/shop" className="inline-block bg-slate-900 text-white px-8 py-2 text-[14px] rounded-md shadow-sm transition-all font-bold hover:bg-[#991B1B] mt-6">
            Return to Shop
          </Link>
        </div>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-[#eaeded]">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-10 rounded-md border border-gray-300 shadow-sm text-center max-w-lg"
        >
          <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} />
          </div>
          <h1 className="text-2xl font-bold mb-2 text-[#0f1111] uppercase ">Order Confirmed!</h1>
          <p className="text-slate-500 mb-8 font-medium">
            Order ID: <span className="font-bold text-[#0f1111]">#RP-{orderId}</span>.
            Confirmation sent to <span className="font-bold text-[#0f1111]">{formData.email}</span>.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/orders" className="bg-slate-900 text-white px-8 py-2.5 rounded-md font-bold text-sm hover:bg-[#991B1B] transition-colors">
              Track Order
            </Link>
            <Link to="/" className="border border-gray-300 text-slate-900 px-8 py-2.5 rounded-md font-bold text-sm hover:bg-gray-50 transition-colors">
              Home
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#eaeded] font-sans text-[#0f1111] pb-20">
      <SEO title="Secure Checkout | My Printing Buddy" />

      {/* --- SIMPLE LOGO HEADER --- */}
      <div className="bg-white border-b border-gray-300 py-4 shadow-sm mb-8">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 flex items-center justify-between">
          <Link to="/">
            <img src="/logo/logo.png" alt="Logo" className="h-8 brightness-0" />
          </Link>
          <div className="flex items-center gap-2 text-slate-400">
            <Lock size={16} />
            <h1 className="text-xl md:text-2xl font-normal text-slate-900">Checkout</h1>
          </div>
          <div className="hidden md:block">
            <Link to="/cart" className="text-sm font-bold text-[#991B1B] hover:underline uppercase ">Back to Cart</Link>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* MAIN FORM AREA */}
          <div className="lg:col-span-8">
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* STEP 1: SHIPPING */}
              <div className={`bg-white border ${step === 1 ? 'border-[#991B1B] ring-1 ring-[#991B1B]' : 'border-gray-300'} rounded-md p-6 shadow-sm`}>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold ${step > 1 ? 'bg-emerald-500 text-white' : 'bg-[#991B1B] text-white'}`}>
                      {step > 1 ? <CheckCircle2 size={14} /> : '1'}
                    </span>
                    <h3 className="text-lg font-bold uppercase ">Shipping Information</h3>
                  </div>
                  {step > 1 && (
                    <button onClick={() => setStep(1)} type="button" className="text-[13px] font-bold text-[#991B1B] hover:underline cursor-pointer">Change</button>
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
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1 md:col-span-2">
                          <label className="text-[13px] font-bold uppercase ">Email Address</label>
                          <input required name="email" value={formData.email} onChange={handleInputChange} type="email" placeholder="name@email.com" className="w-full h-10 px-3 bg-white border border-gray-400 rounded-sm outline-none focus:border-[#991B1B] focus:ring-1 focus:ring-[#991B1B] text-sm" />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[13px] font-bold uppercase ">First Name</label>
                          <input required name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="John" className="w-full h-10 px-3 bg-white border border-gray-400 rounded-sm outline-none focus:border-[#991B1B] focus:ring-1 focus:ring-[#991B1B] text-sm" />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[13px] font-bold uppercase ">Last Name</label>
                          <input required name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Doe" className="w-full h-10 px-3 bg-white border border-gray-400 rounded-sm outline-none focus:border-[#991B1B] focus:ring-1 focus:ring-[#991B1B] text-sm" />
                        </div>

                        <div className="space-y-1 md:col-span-2">
                          <label className="text-[13px] font-bold uppercase ">Delivery Address</label>
                          <input required name="address" value={formData.address} onChange={handleInputChange} placeholder="Street address, apartment, suite" className="w-full h-10 px-3 bg-white border border-gray-400 rounded-sm outline-none focus:border-[#991B1B] focus:ring-1 focus:ring-[#991B1B] text-sm" />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[13px] font-bold uppercase ">City</label>
                          <input required name="city" value={formData.city} onChange={handleInputChange} placeholder="New York" className="w-full h-10 px-3 bg-white border border-gray-400 rounded-sm outline-none focus:border-[#991B1B] focus:ring-1 focus:ring-[#991B1B] text-sm" />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[13px] font-bold uppercase ">Zip Code</label>
                          <input required name="zipCode" value={formData.zipCode} onChange={handleInputChange} placeholder="10001" className="w-full h-10 px-3 bg-white border border-gray-400 rounded-sm outline-none focus:border-[#991B1B] focus:ring-1 focus:ring-[#991B1B] text-sm" />
                        </div>

                        <div className="space-y-1 md:col-span-2">
                          <label className="text-[13px] font-bold uppercase ">Phone Number</label>
                          <input required name="phone" value={formData.phone} onChange={handleInputChange} type="tel" placeholder="+1 (000) 000-0000" className="w-full h-10 px-3 bg-white border border-gray-400 rounded-sm outline-none focus:border-[#991B1B] focus:ring-1 focus:ring-[#991B1B] text-sm" />
                        </div>
                      </div>
                      <div className="pt-4">
                        <button type="submit" className="bg-slate-900 text-white px-10 py-2.5 text-[14px] rounded-md shadow-sm transition-all font-bold hover:bg-[#991B1B] cursor-pointer">
                          Deliver to this address
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="text-sm text-slate-500 space-y-1 uppercase ">
                      <p className="font-bold text-slate-900">{formData.firstName} {formData.lastName}</p>
                      <p>{formData.address}</p>
                      <p>{formData.city}, {formData.zipCode}</p>
                      <p className="text-[#991B1B] font-bold pt-1">Phone: {formData.phone}</p>
                    </div>
                  )}
                </AnimatePresence>
              </div>

              {/* STEP 2: PAYMENT */}
              <div className={`bg-white border ${step === 2 ? 'border-[#991B1B] ring-1 ring-[#991B1B]' : 'border-gray-300'} rounded-md p-6 shadow-sm`}>
                <div className="flex items-center gap-3 mb-6">
                  <span className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold ${step === 2 ? 'bg-[#991B1B] text-white' : 'bg-gray-100 text-gray-400'}`}>2</span>
                  <h3 className="text-lg font-bold uppercase ">Payment Method</h3>
                </div>

                <AnimatePresence>
                  {step === 2 && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div
                          onClick={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                          className={`p-4 border-2 rounded-md cursor-pointer flex items-start gap-3 transition-all ${formData.paymentMethod === 'cod' ? 'border-[#991B1B] bg-red-50/20' : 'border-gray-200 hover:border-gray-300'}`}
                        >
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center mt-1 ${formData.paymentMethod === 'cod' ? 'border-[#991B1B]' : 'border-gray-400'}`}>
                            {formData.paymentMethod === 'cod' && <div className="w-2 h-2 bg-[#991B1B] rounded-full" />}
                          </div>
                          <div>
                            <p className="font-bold text-[14px] uppercase ">Cash on Delivery</p>
                            <p className="text-[12px] text-slate-500">Pay when your system arrives.</p>
                          </div>
                        </div>

                        <div
                          onClick={() => setFormData({ ...formData, paymentMethod: 'paypal' })}
                          className={`p-4 border-2 rounded-md cursor-pointer flex items-start gap-3 transition-all ${formData.paymentMethod === 'paypal' ? 'border-[#991B1B] bg-red-50/20' : 'border-gray-200 hover:border-gray-300'}`}
                        >
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center mt-1 ${formData.paymentMethod === 'paypal' ? 'border-[#991B1B]' : 'border-gray-400'}`}>
                            {formData.paymentMethod === 'paypal' && <div className="w-2 h-2 bg-[#991B1B] rounded-full" />}
                          </div>
                          <div>
                            <p className="font-bold text-[14px] uppercase ">Digital Payment</p>
                            <p className="text-[12px] text-slate-500">Secure PayPal checkout.</p>
                          </div>
                        </div>
                      </div>

                      {formData.paymentMethod === 'paypal' ? (
                        <div className="p-6 bg-slate-50 border border-slate-200 rounded-md">
                          <PayPalButtons
                            style={{ layout: "vertical", shape: "rect", color: "black" }}
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
                            className="bg-slate-900 text-white px-10 py-2.5 text-[14px] rounded-md shadow-sm transition-all font-bold hover:bg-[#991B1B] cursor-pointer flex items-center justify-center gap-2"
                          >
                            {loading ? <Loader2 className="animate-spin" size={18} /> : 'Complete Order'}
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
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white border border-gray-300 rounded-md p-6 shadow-sm">
              <button
                disabled={loading || (step === 2 && formData.paymentMethod === 'paypal')}
                onClick={handleSubmit}
                className="w-full bg-slate-900 text-white py-2.5 rounded-md shadow-sm transition-all font-bold text-[14px] mb-4 cursor-pointer hover:bg-[#991B1B] disabled:opacity-50"
              >
                {step === 1 ? 'Use this address' : (formData.paymentMethod === 'cod' ? 'Place your order' : 'Continue to Payment')}
              </button>
              <p className="text-[11px] text-slate-400 text-center mb-6 uppercase ">
                Secure checkout with encrypted data transmission.
              </p>

              <div className="border-t border-gray-100 pt-4 space-y-3">
                <h3 className="text-[13px] font-bold mb-4 uppercase tracking-wider">Order Summary</h3>
                <div className="flex justify-between text-xs text-slate-500 font-medium">
                  <span>Items:</span>
                  <span>${total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs text-slate-500 font-medium">
                  <span>Shipping:</span>
                  <span className="text-emerald-600 font-bold uppercase">Free</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-[#991B1B] pt-2 border-t border-gray-50 mt-2">
                  <span>Order Total:</span>
                  <span>${total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="bg-[#f7f8f8] border border-gray-300 rounded-md p-4 space-y-4">
              <div className="flex items-center gap-3 text-slate-500">
                <ShieldCheck size={18} className="text-[#991B1B]" />
                <span className="text-[11px] font-bold uppercase ">Encrypted Security</span>
              </div>
              <div className="flex items-center gap-3 text-slate-500">
                <Truck size={18} className="text-[#991B1B]" />
                <span className="text-[11px] font-bold uppercase ">Priority Shipping</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
