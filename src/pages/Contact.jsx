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
  Zap
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
      <SEO title="Contact Us | My Printing Buddy" />

      {/* --- BREADCRUMBS --- */}
      <div className="bg-white border-b border-slate-50 py-4">
        <div className="max-w-[1400px] mx-auto px-6">
          <nav className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
            <Link to="/" className="hover:text-[#991B1B]">Home</Link>
            <span className="opacity-30">/</span>
            <span className="text-slate-600">Contact Node</span>
          </nav>
        </div>
      </div>

      {/* --- HERO SECTION WITH BLACK OVERLAY --- */}
      <div className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/banner/banner-8.jpg"
            alt="Contact Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        </div>

        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 mb-4"
            >
              <Zap size={14} className="text-[#991B1B]" fill="currentColor" />
              <span className="text-white font-bold text-[10px] tracking-[0.3em] uppercase">Support Node</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-5xl font-bold text-white  mb-6 uppercase"
            >
              Get in touch with <br />our experts.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-sm md:text-base text-white/80 font-medium leading-relaxed max-w-xl border-l border-[#991B1B] pl-4 uppercase "
            >
              Have specialized unit questions? Our team is ready to provide operational guidance and support for your environment.
            </motion.p>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* --- INFO COLUMN --- */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-8 border border-slate-50 rounded-2xl shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-6 uppercase ">System Info</h2>

              <div className="space-y-8">
                <div className="flex gap-4 items-start group">
                  <div className="w-10 h-10 bg-slate-50 text-slate-300 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-[#991B1B] group-hover:text-white transition-all">
                    <Mail size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[10px] text-slate-400 mb-1 uppercase tracking-widest">Email Support</h4>
                    <p className="text-slate-900 text-[14px] font-bold hover:text-[#991B1B] transition-colors cursor-pointer">info@myprintingbuddy.shop</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start group">
                  <div className="w-10 h-10 bg-slate-50 text-slate-300 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-[#991B1B] group-hover:text-white transition-all">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[10px] text-slate-400 mb-1 uppercase tracking-widest">Headquarters</h4>
                    <p className="text-slate-900 text-[14px] font-medium leading-relaxed uppercase ">
                      2241 W I 44 Service Rd, <br />Oklahoma City, OK 73112, USA
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-8 rounded-2xl">
              <div className="flex items-center gap-3 text-[#991B1B] mb-4">
                <Clock size={18} />
                <h4 className="font-bold text-[11px] uppercase tracking-widest">OPS Hours</h4>
              </div>
              <p className="text-slate-500 text-[13px] leading-relaxed mb-6 font-medium uppercase ">Technical inquiry response time is typically under 2 hours during operations.</p>
              <div className="text-slate-900 font-bold text-[12px] flex items-center gap-2 uppercase tracking-widest">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Mon - Fri: 9AM - 6PM (PST)
              </div>
            </div>

            <div className="bg-slate-900 p-8 rounded-2xl text-white shadow-xl shadow-slate-200/50">
              <div className="flex items-center gap-3 mb-4 text-[#991B1B]">
                <Headphones size={18} />
                <h4 className="font-bold text-[11px] uppercase tracking-widest text-white">Technical Node</h4>
              </div>
              <p className="text-white/60 text-[13px] leading-relaxed font-medium uppercase ">For urgent system issues, please include your unit manifest ID for prioritized assistance.</p>
            </div>
          </div>

          {/* --- FORM COLUMN --- */}
          <div className="lg:col-span-8">
            <div className="bg-white border border-slate-50 rounded-[32px] p-8 md:p-12 shadow-sm">
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2 uppercase ">Transmission complete.</h2>
                    <p className="text-slate-400 mb-10 font-medium uppercase  text-sm">Thank you. A system expert will initiate contact shortly.</p>
                    <button
                      onClick={() => setStatus(null)}
                      className="bg-slate-900 hover:bg-[#991B1B] text-white px-10 py-4 text-[11px] font-black uppercase tracking-[0.3em] rounded-2xl transition-all"
                    >
                      New Transmission
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-2">
                      <h2 className="text-2xl font-bold text-slate-900 uppercase er ">Send Message.</h2>
                      <p className="text-slate-400 text-[12px] font-bold uppercase tracking-widest">Expected response: 24 business hours.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-300 uppercase tracking-widest ml-1">Identity</label>
                        <input
                          required
                          type="text"
                          placeholder="Name..."
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full h-12 px-0 bg-transparent border-b border-slate-100 outline-none focus:border-[#991B1B] transition-all text-sm font-bold uppercase "
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-300 uppercase tracking-widest ml-1">Electronic Mail</label>
                        <input
                          required
                          type="email"
                          placeholder="Email Address..."
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full h-12 px-0 bg-transparent border-b border-slate-100 outline-none focus:border-[#991B1B] transition-all text-sm font-bold uppercase "
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-300 uppercase tracking-widest ml-1">Contact Number</label>
                        <input
                          type="tel"
                          placeholder="+1 (000) 000-0000"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full h-12 px-0 bg-transparent border-b border-slate-100 outline-none focus:border-[#991B1B] transition-all text-sm font-bold uppercase "
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-300 uppercase tracking-widest ml-1">Subject Protocol</label>
                        <div className="relative">
                          <select
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            className="w-full h-12 px-0 bg-transparent border-b border-slate-100 outline-none focus:border-[#991B1B] appearance-none cursor-pointer text-sm font-bold uppercase  transition-all"
                          >
                            <option>General Inquiry</option>
                            <option>Technical Support</option>
                            <option>Order Status</option>
                            <option>Bulk Order</option>
                          </select>
                          <ChevronDown size={14} className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-300 uppercase tracking-widest ml-1">Communication Detail</label>
                      <textarea
                        required
                        rows="4"
                        placeholder="Inquiry Details..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full py-4 bg-transparent border-b border-slate-100 outline-none focus:border-[#991B1B] transition-all resize-none text-sm font-bold uppercase "
                      ></textarea>
                    </div>

                    <div className="pt-4">
                      <button
                        disabled={loading}
                        className="w-full md:w-auto min-w-[240px] h-14 bg-slate-900 hover:bg-[#991B1B] text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] shadow-xl shadow-slate-200/50 disabled:opacity-50 transition-all active:scale-95 flex items-center justify-center gap-3"
                      >
                        {loading ? <Loader2 className="animate-spin" size={18} /> : (
                          <>
                            <Send size={16} />
                            Transmit Message
                          </>
                        )}
                      </button>
                    </div>

                    {status === 'error' && (
                      <div className="text-red-600 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-red-600" />
                        Transmission Error. Please retry.
                      </div>
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
