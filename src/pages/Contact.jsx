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
  Phone,
  Clock,
  ChevronDown,
  ChevronRight,
  Headphones
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
    <div className="min-h-screen bg-[#eaeded] font-['Rubik'] text-[#0f1111]">
      <SEO title="Contact Us | Dashing Printers" />

      {/* --- BREADCRUMBS --- */}
      <div className="bg-white border-b border-gray-300 py-3 shadow-sm">
        <div className="max-w-[1500px] mx-auto px-4 md:px-8">
          <nav className="flex items-center gap-1 text-[12px] text-[#565959]">
            <Link to="/" className="hover:underline hover:text-[#c45500]">Home</Link>
            <ChevronRight size={12} className="mx-1" />
            <span className="text-[#0f1111] font-bold">Connect With Us</span>
          </nav>
        </div>
      </div>

      {/* --- PAGE HEADER --- */}
      <div className="bg-[#232f3e] text-white py-16 md:py-20">
        <div className="max-w-[1500px] mx-auto px-4 md:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold tracking-normal mb-4">
              Get in Touch with Our Experts.
            </h1>
            <p className="text-lg md:text-xl text-gray-300 font-normal leading-relaxed">
              Have specialized printer questions? Our team is here to provide expert guidance and support for your workspace.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-[1500px] mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* --- INFO COLUMN --- */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 border border-gray-300 rounded-md shadow-sm">
               <h2 className="text-xl font-bold text-[#0f1111] mb-2">Contact Information</h2>
               <p className="text-[#565959] text-sm">Reach out through any of our official channels.</p>
               
               <div className="mt-8 space-y-6">
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 bg-[#f0f2f2] rounded-full flex items-center justify-center text-[#232f3e] shrink-0">
                      <Mail size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-[13px] text-[#0f1111] mb-1 uppercase tracking-wider">Email Support</h4>
                      <p className="text-[#007185] text-sm font-bold hover:underline cursor-pointer">info@dashingprinters.shop</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 bg-[#f0f2f2] rounded-full flex items-center justify-center text-[#232f3e] shrink-0">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-[13px] text-[#0f1111] mb-1 uppercase tracking-wider">Our Location</h4>
                      <p className="text-[#565959] text-sm leading-relaxed">
                        3100 Folsom Blvd, <br /> Sacramento, CA 95816, USA
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 bg-[#f0f2f2] rounded-full flex items-center justify-center text-[#232f3e] shrink-0">
                      <Phone size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-[13px] text-[#0f1111] mb-1 uppercase tracking-wider">Call Support</h4>
                      <p className="text-[#565959] text-sm font-bold">+1 (555) 123-4567</p>
                    </div>
                  </div>
               </div>
            </div>

            <div className="bg-[#f7f8f8] p-6 border border-gray-300 rounded-md">
               <div className="flex items-center gap-3 text-[#c45500] mb-3">
                  <Clock size={18} />
                  <h4 className="font-bold text-[14px] uppercase tracking-wider">Support Hours</h4>
               </div>
               <p className="text-[#565959] text-[13px] leading-relaxed mb-4">Our average response time for technical inquiries is under 2 hours during business operations.</p>
               <div className="text-[#0f1111] font-bold text-[13px]">
                  Monday - Friday: 9AM - 6PM (PST)
               </div>
            </div>

            <div className="bg-[#fff9e6] p-6 border border-[#ffe1a6] rounded-md">
               <div className="flex items-center gap-3 text-[#856404] mb-3">
                  <Headphones size={18} />
                  <h4 className="font-bold text-[14px]">Technical Help</h4>
               </div>
               <p className="text-[#856404] text-[13px]">For urgent technical issues regarding your printer setup, please include your order number for faster assistance.</p>
            </div>
          </div>

          {/* --- FORM COLUMN --- */}
          <div className="lg:col-span-8">
            <div className="bg-white border border-gray-300 rounded-md p-6 md:p-10 shadow-sm">
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 bg-[#f0fcf1] text-[#2e7d32] rounded-full flex items-center justify-center mx-auto mb-6 border border-[#c8e6c9]">
                       <CheckCircle2 size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-[#0f1111] mb-2">Message Received!</h2>
                    <p className="text-[#565959] mb-8 font-normal">Thank you for reaching out. An expert from our team will <br /> get back to you shortly.</p>
                    <button
                      onClick={() => setStatus(null)}
                      className="bg-[#ffd814] border border-[#fcd200] hover:bg-[#f7ca00] text-[#0f1111] px-8 py-2 text-[14px] font-normal rounded-md shadow-sm transition-colors"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <h2 className="text-2xl font-bold text-[#0f1111] mb-6">Send us a Message</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <label className="text-[13px] font-bold text-[#0f1111] ml-0.5">Full Name</label>
                        <input
                          required
                          type="text"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full h-10 px-3 bg-white border border-gray-400 rounded-sm outline-none focus:border-[#e77600] focus:ring-1 focus:ring-[#e77600] transition-all text-sm"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[13px] font-bold text-[#0f1111] ml-0.5">Email Address</label>
                        <input
                          required
                          type="email"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full h-10 px-3 bg-white border border-gray-400 rounded-sm outline-none focus:border-[#e77600] focus:ring-1 focus:ring-[#e77600] transition-all text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <label className="text-[13px] font-bold text-[#0f1111] ml-0.5">Phone Number</label>
                        <input
                          type="tel"
                          placeholder="+1 (000) 000-0000"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full h-10 px-3 bg-white border border-gray-400 rounded-sm outline-none focus:border-[#e77600] focus:ring-1 focus:ring-[#e77600] transition-all text-sm"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[13px] font-bold text-[#0f1111] ml-0.5">Inquiry Subject</label>
                        <div className="relative">
                          <select
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            className="w-full h-10 px-3 bg-[#f0f2f2] border border-gray-400 rounded-sm outline-none focus:border-[#e77600] appearance-none cursor-pointer text-sm transition-all"
                          >
                            <option>General Inquiry</option>
                            <option>Technical Support</option>
                            <option>Order Status</option>
                            <option>Bulk/Business Order</option>
                          </select>
                          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[13px] font-bold text-[#0f1111] ml-0.5">Your Message</label>
                      <textarea
                        required
                        rows="6"
                        placeholder="How can our experts assist you today?"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full p-3 bg-white border border-gray-400 rounded-sm outline-none focus:border-[#e77600] focus:ring-1 focus:ring-[#e77600] transition-all resize-none text-sm"
                      ></textarea>
                    </div>

                    <div className="pt-2">
                      <button
                        disabled={loading}
                        className="w-full md:w-auto min-w-[200px] h-11 bg-[#ffd814] border border-[#fcd200] hover:bg-[#f7ca00] text-[#0f1111] rounded-md font-normal text-[14px] shadow-sm disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                      >
                        {loading ? <Loader2 className="animate-spin" size={20} /> : (
                          <>
                            <Send size={16} />
                            Send Message
                          </>
                        )}
                      </button>
                    </div>

                    {status === 'error' && (
                      <p className="text-[#c45500] text-[13px] font-bold mt-4 bg-[#fff4f4] p-3 rounded-sm border border-[#f5d7d7]">Error sending message. Please try again later.</p>
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
