import React, { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
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
  ArrowRight,
  MessageSquare
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
      <SEO title="Contact Us | Support Registry | Inkjet Print Guide" />

      {/* Section 1: Hero Banner (Same as About/FAQ) */}
      <section className="relative h-[40vh] md:h-[50vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/banner/category-imges/11.avif"
            alt="Contact Us"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/60" />
        </div>

        <div className="max-w-[1700px] mx-auto px-6 relative z-10 w-full">
          <div className="max-w-3xl space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-[2px] bg-[#fff]"></div>
              <span className="text-[#fff] font-bold text-sm tracking-widest uppercase">Support Center</span>
            </div>
            <h1 className="text-4xl md:text-7xl font-bold text-white tracking-tight leading-tight">
              Get in <span >Touch.</span>
            </h1>
            <p className="text-slate-200 text-lg md:text-xl leading-relaxed max-w-2xl font-medium">
              Have questions about our printers or need technical assistance? Our dedicated team is here to help you.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-[1700px] mx-auto px-6 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          {/* Section 2: Info Column */}
          <div className="lg:col-span-4 space-y-12">
            <div className="space-y-10">
              <div className="flex items-center gap-4">
                <div className="w-1.5 h-10 bg-[#4254e8] shrink-0"></div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Our Office</h2>
              </div>

              <div className="space-y-8">
                <div className="flex gap-6 items-start group">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 text-[#4254e8] border border-slate-100 flex items-center justify-center shrink-0 group-hover:bg-[#4254e8] group-hover:text-white transition-all duration-500">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-400 text-[11px] uppercase tracking-widest mb-1">Email Us</h4>
                    <p className="text-slate-900 text-lg font-bold"> <a
                      href="mailto:info@inkjetprintguide.co" className="text-[#4254e8] hover:underline">
                      info@inkjetprintguide.co
                    </a></p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-12 border-t border-slate-100">
            </div>
          </div>

          {/* Section 3: Form Column */}
          <div className="lg:col-span-8">
            <div className="bg-white border border-slate-100 p-8 md:p-12 rounded-3xl shadow-xl shadow-slate-100/50">
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <m.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-20 space-y-8"
                  >
                    <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 size={40} />
                    </div>
                    <div className="space-y-3">
                      <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Message Sent Successfully!</h2>
                      <p className="text-slate-500 text-lg max-w-md mx-auto">
                        Thank you for reaching out. Our team will get back to you within 24 business hours.
                      </p>
                    </div>
                    <button
                      onClick={() => setStatus(null)}
                      className="px-10 py-4 bg-slate-900 text-white font-bold text-sm uppercase tracking-widest rounded-xl hover:bg-[#4254e8] transition-all"
                    >
                      Send Another Message
                    </button>
                  </m.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-10">
                    <div className="space-y-2">
                      <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Send a Message</h2>
                      <p className="text-slate-500 font-medium">Fill out the form below and we'll be in touch shortly.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
                        <input
                          required
                          type="text"
                          placeholder="Your name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full h-14 px-6 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#4254e8] focus:bg-white transition-all text-[15px] font-medium"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                        <input
                          required
                          type="email"
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full h-14 px-6 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#4254e8] focus:bg-white transition-all text-[15px] font-medium"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">Phone Number</label>
                        <input
                          type="tel"
                          placeholder="Your phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full h-14 px-6 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#4254e8] focus:bg-white transition-all text-[15px] font-medium"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">Subject</label>
                        <div className="relative">
                          <select
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            className="w-full h-14 px-6 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#4254e8] focus:bg-white appearance-none cursor-pointer text-[15px] font-medium transition-all"
                          >
                            <option>General Inquiry</option>
                            <option>Technical Support</option>
                            <option>Order Status</option>
                            <option>Bulk Orders</option>
                          </select>
                          <ChevronDown size={18} className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 ml-1">Your Message</label>
                      <textarea
                        required
                        rows="5"
                        placeholder="How can we help you?"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full py-5 px-6 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#4254e8] focus:bg-white transition-all resize-none text-[15px] font-medium"
                      ></textarea>
                    </div>

                    <div className="pt-2">
                      <button
                        disabled={loading}
                        className="h-16 px-12 bg-slate-900 text-white font-bold text-sm uppercase tracking-widest rounded-xl transition-all hover:bg-[#4254e8] disabled:opacity-50 flex items-center gap-4 group shadow-lg shadow-slate-200"
                      >
                        {loading ? <Loader2 className="animate-spin" size={20} /> : (
                          <>
                            <Send size={18} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                            Send Message
                          </>
                        )}
                      </button>
                    </div>

                    {status === 'error' && (
                      <p className="text-red-500 font-bold text-xs uppercase tracking-widest">Something went wrong. Please try again.</p>
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


