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
      <SEO title="Contact | My Printer Land" />

      {/* --- MINIMAL TECHNICAL HEADER --- */}
      <section className="bg-slate-50 py-24 md:py-32 border-b border-slate-100 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }}
        />

        <div className="max-w-[1600px] mx-auto px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <Zap size={14} className="text-[#F54900]" fill="currentColor" />
              <span className="text-[10px] font-black text-[#F54900] uppercase tracking-[0.5em]">Support.Manifest</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-slate-900 leading-tight tracking-tighter">
              Get in touch with <span className="text-slate-300">our experts.</span>
            </h1>
            <p className="mt-8 text-slate-500 text-lg md:text-xl font-medium leading-relaxed max-w-xl border-l border-slate-200 pl-6">
              Have specialized unit questions? Our team is ready to provide operational guidance and support for your environment.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-[1600px] mx-auto px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">

          {/* --- INFO COLUMN --- */}
          <div className="lg:col-span-4 space-y-10">
            <div className="space-y-10">
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-8">Direct Registry</h4>
                <div className="space-y-10">
                  <div className="flex gap-6 items-start group">
                    <div className="w-12 h-12 bg-slate-50 text-slate-300 rounded-xl flex items-center justify-center shrink-0 group-hover:text-[#F54900] transition-all">
                      <Mail size={22} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="font-bold text-[10px] text-slate-300 mb-2 uppercase tracking-widest leading-none">Email Support</h4>
                      <p className="text-slate-900 text-base font-bold transition-colors">info@myprinterland.shop</p>
                    </div>
                  </div>

                  <div className="flex gap-6 items-start group">
                    <div className="w-12 h-12 bg-slate-50 text-slate-300 rounded-xl flex items-center justify-center shrink-0 group-hover:text-[#F54900] transition-all">
                      <MapPin size={22} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="font-bold text-[10px] text-slate-300 mb-2 uppercase tracking-widest leading-none">Headquarters</h4>
                      <p className="text-slate-900 text-[13px] font-medium leading-relaxed uppercase tracking-tight">
                        110 N Main St, Livingston, MT 59047, United States

                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-10 border-t border-slate-50 space-y-8">
                <div>
                  <div className="flex items-center gap-3 text-[#F54900] mb-4">
                    <Clock size={16} />
                    <h4 className="font-bold text-[10px] uppercase tracking-widest">OPS Hours</h4>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed font-bold uppercase tracking-wider">Mon - Fri: 9AM - 6PM (PST)</p>
                </div>

                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100/50">
                  <div className="flex items-center gap-3 mb-4 text-[#F54900]">
                    <Headphones size={16} />
                    <h4 className="font-bold text-[10px] uppercase tracking-widest">Priority Node</h4>
                  </div>
                  <p className="text-slate-500 text-[11px] leading-relaxed font-medium uppercase tracking-tight">For urgent issues, include your unit manifest ID for prioritized assistance.</p>
                </div>
              </div>
            </div>
          </div>

          {/* --- FORM COLUMN --- */}
          <div className="lg:col-span-8">
            <div className="bg-white">
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-20 bg-slate-50 rounded-[2.5rem] border border-slate-100"
                  >
                    <div className="w-16 h-16 bg-white text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
                      <CheckCircle2 size={32} strokeWidth={1.5} />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-3 uppercase tracking-tighter">Transmission complete.</h2>
                    <p className="text-slate-400 mb-10 font-medium uppercase tracking-widest text-xs">Thank you. A system expert will initiate contact shortly.</p>
                    <button
                      onClick={() => setStatus(null)}
                      className="text-[#F54900] font-black text-[10px] uppercase tracking-[0.4em] hover:underline"
                    >
                      New Transmission
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-12">
                    <div className="space-y-4">
                      <h2 className="text-3xl font-bold text-slate-900 uppercase tracking-tighter">Send Message.</h2>
                      <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em]">Expected response: 24 business hours.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-200 uppercase tracking-widest">Identity</label>
                        <input
                          required
                          type="text"
                          placeholder="Full Name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full h-12 px-0 bg-transparent border-b border-slate-100 outline-none focus:border-[#F54900] transition-all text-[13px] font-bold uppercase placeholder:text-slate-200"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-200 uppercase tracking-widest">Electronic Mail</label>
                        <input
                          required
                          type="email"
                          placeholder="Email Address"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full h-12 px-0 bg-transparent border-b border-slate-100 outline-none focus:border-[#F54900] transition-all text-[13px] font-bold uppercase placeholder:text-slate-200"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-200 uppercase tracking-widest">Contact Number</label>
                        <input
                          type="tel"
                          placeholder="+1 (000) 000-0000"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full h-12 px-0 bg-transparent border-b border-slate-100 outline-none focus:border-[#F54900] transition-all text-[13px] font-bold uppercase placeholder:text-slate-200"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-200 uppercase tracking-widest">Subject Protocol</label>
                        <div className="relative">
                          <select
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            className="w-full h-12 px-0 bg-transparent border-b border-slate-100 outline-none focus:border-[#F54900] appearance-none cursor-pointer text-[13px] font-bold uppercase transition-all"
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
                      <label className="text-[10px] font-black text-slate-200 uppercase tracking-widest">Communication Detail</label>
                      <textarea
                        required
                        rows="4"
                        placeholder="Inquiry Details..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full py-4 bg-transparent border-b border-slate-100 outline-none focus:border-[#F54900] transition-all resize-none text-[13px] font-bold uppercase placeholder:text-slate-200"
                      ></textarea>
                    </div>

                    <div className="pt-6">
                      <button
                        disabled={loading}
                        className="h-14 px-12 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.4em] transition-all active:scale-95 disabled:opacity-30 hover:bg-[#F54900] flex items-center gap-4"
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
                      <p className="text-red-600 text-[10px] font-black uppercase tracking-[0.2em]">Transmission Error. Please retry.</p>
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
