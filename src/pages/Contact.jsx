import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '@/components/SEO';
import {
  Mail,
  MapPin,
  Send,
  Loader2,
  CheckCircle2,
  Clock,
  ChevronDown,
  Headphones,
  Phone
} from 'lucide-react';
import API_BASE_URL from '../config';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch(`${API_BASE_URL}/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.status === 'success') {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: 'General Inquiry',
          message: '',
        });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 pb-20">
      <SEO title="Contact Us | Print Mora" />

      {/* --- HERO SECTION --- */}
      <section className="bg-[#f8faff] py-20 md:py-28 relative overflow-hidden">
        <div className="max-w-[1800px] mx-auto px-4 md:px-10 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#2f5cab] leading-tight">
              Get in Touch
            </h1>
            <p className="mt-6 text-slate-500 text-lg md:text-xl font-medium leading-relaxed max-w-2xl">
              Have questions about our products or need technical support? Our team of experts is here to help you find the perfect printing solution.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-[1800px] mx-auto px-4 md:px-10 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 items-start">

          {/* --- INFO COLUMN --- */}
          <div className="lg:col-span-4 space-y-12">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-8">Contact Information</h2>
              <div className="space-y-8">
                <div className="flex gap-6 items-start group">
                  <div className="w-14 h-14 bg-white border border-slate-100 shadow-sm text-[#2f5cab] rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-[#2f5cab] group-hover:text-white transition-all">
                    <Mail size={24} strokeWidth={2} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-400 text-[12px] uppercase tracking-widest mb-1">Email Us</h4>
                    <p className="text-slate-900 text-lg font-bold transition-colors">info@printmora.shop</p>
                  </div>
                </div>

                <div className="flex gap-6 items-start group">
                  <div className="w-14 h-14 bg-white border border-slate-100 shadow-sm text-[#2f5cab] rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-[#2f5cab] group-hover:text-white transition-all">
                    <MapPin size={24} strokeWidth={2} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-400 text-[12px] uppercase tracking-widest mb-1">Our Location</h4>
                    <p className="text-slate-900 text-[15px] font-semibold leading-relaxed">
                      302 E Washington St, Bloomington, IL 61701, United States
                    </p>
                  </div>
                </div>

                <div className="flex gap-6 items-start group">
                  <div className="w-14 h-14 bg-white border border-slate-100 shadow-sm text-[#2f5cab] rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-[#2f5cab] group-hover:text-white transition-all">
                    <Phone size={24} strokeWidth={2} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-400 text-[12px] uppercase tracking-widest mb-1">Call Us</h4>
                    <p className="text-slate-900 text-lg font-bold transition-colors">+1 (XXX) XXX-XXXX</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-10 border-t border-slate-100 space-y-8">
              <div>
                <div className="flex items-center gap-3 text-slate-900 mb-4">
                  <Clock size={20} className="text-[#2f5cab]" />
                  <h4 className="font-bold text-[14px] uppercase tracking-wider">Business Hours</h4>
                </div>
                <div className="space-y-2">
                  <p className="text-slate-500 text-[14px] font-medium flex justify-between">
                    <span>Monday - Friday:</span>
                    <span className="text-slate-900 font-bold">9AM - 6PM (PST)</span>
                  </p>
                  <p className="text-slate-500 text-[14px] font-medium flex justify-between">
                    <span>Saturday - Sunday:</span>
                    <span className="text-slate-900 font-bold">Closed</span>
                  </p>
                </div>
              </div>

              <div className="p-8 bg-blue-50/50 rounded-[30px] border border-blue-100">
                <div className="flex items-center gap-3 mb-4">
                  <Headphones size={24} className="text-[#2f5cab]" />
                  <h4 className="font-bold text-[16px]">Expert Support</h4>
                </div>
                <p className="text-slate-600 text-[14px] leading-relaxed font-medium">
                  Our technical team is ready to assist you with complex setups and bulk inquiries.
                </p>
              </div>
            </div>
          </div>

          {/* --- FORM COLUMN --- */}
          <div className="lg:col-span-8">
            <div className="bg-white border border-slate-100 rounded-[40px] p-8 md:p-12 shadow-sm">
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-20"
                  >
                    <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8">
                      <CheckCircle2 size={40} strokeWidth={1.5} />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Message Sent Successfully!</h2>
                    <p className="text-slate-500 mb-10 text-lg max-w-md mx-auto font-medium">
                      Thank you for contacting us. Our team will review your message and get back to you within 24 business hours.
                    </p>
                    <button
                      onClick={() => setStatus(null)}
                      className="px-8 py-4 bg-[#2f5cab] text-white font-bold rounded-full hover:bg-[#234d98] transition-all active:scale-95 shadow-lg shadow-blue-600/20"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-10">
                    <div className="mb-10">
                      <h2 className="text-3xl font-bold text-slate-900 mb-2">Send us a Message</h2>
                      <p className="text-slate-500 font-medium">Fields marked with * are required.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[14px] font-bold text-slate-700 ml-1">Full Name *</label>
                        <input
                          required
                          type="text"
                          placeholder="Enter your name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full h-14 px-6 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-[#2f5cab] focus:bg-white focus:ring-4 focus:ring-[#2f5cab]/5 transition-all text-[15px] font-medium placeholder:text-slate-300"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[14px] font-bold text-slate-700 ml-1">Email Address *</label>
                        <input
                          required
                          type="email"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full h-14 px-6 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-[#2f5cab] focus:bg-white focus:ring-4 focus:ring-[#2f5cab]/5 transition-all text-[15px] font-medium placeholder:text-slate-300"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[14px] font-bold text-slate-700 ml-1">Phone Number</label>
                        <input
                          type="tel"
                          placeholder="+1 (000) 000-0000"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full h-14 px-6 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-[#2f5cab] focus:bg-white focus:ring-4 focus:ring-[#2f5cab]/5 transition-all text-[15px] font-medium placeholder:text-slate-300"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[14px] font-bold text-slate-700 ml-1">Subject *</label>
                        <div className="relative">
                          <select
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            className="w-full h-14 px-6 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-[#2f5cab] focus:bg-white focus:ring-4 focus:ring-[#2f5cab]/5 appearance-none cursor-pointer text-[15px] font-medium transition-all"
                          >
                            <option>General Inquiry</option>
                            <option>Technical Support</option>
                            <option>Order Status</option>
                            <option>Bulk Order</option>
                          </select>
                          <ChevronDown size={18} className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[14px] font-bold text-slate-700 ml-1">Your Message *</label>
                      <textarea
                        required
                        rows="5"
                        placeholder="How can we help you?"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full py-5 px-6 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-[#2f5cab] focus:bg-white focus:ring-4 focus:ring-[#2f5cab]/5 transition-all resize-none text-[15px] font-medium placeholder:text-slate-300"
                      ></textarea>
                    </div>

                    <div className="pt-4">
                      <button
                        disabled={loading}
                        className="h-16 px-12 bg-slate-900 text-white rounded-full font-bold text-[16px] transition-all hover:bg-[#2f5cab] active:scale-95 disabled:opacity-50 flex items-center gap-4 shadow-xl shadow-slate-900/10"
                      >
                        {loading ? <Loader2 className="animate-spin" size={20} /> : (
                          <>
                            <Send size={18} />
                            Send Message
                          </>
                        )}
                      </button>
                    </div>

                    {status === 'error' && (
                      <p className="text-red-500 font-semibold text-sm">There was an error sending your message. Please try again later.</p>
                    )}
                  </form>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
