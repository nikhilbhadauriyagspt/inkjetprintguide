import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '@/components/SEO';
import { ChevronDown, Search, HelpCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const faqData = [
  {
    category: "Orders & purchasing",
    questions: [
      { q: "How do I place an order?", a: "Simply browse our products, add your items to the cart, and complete the checkout using your preferred payment method." },
      { q: "Do I need an account to purchase?", a: "No. You can checkout as a guest. However, creating an account helps you track orders and access your purchase history." },
      { q: "How can I check my order status?", a: "Log into your account and visit My Orders to view real-time updates. You will also receive email notifications." },
      { q: "Can I modify or cancel my order?", a: "Orders can be modified or canceled before shipping. Once the item is dispatched, cancellations aren’t possible." },
      { q: "What payment methods do you accept?", a: "We accept major credit/debit cards (Visa, Mastercard), PayPal, and other secure digital payment options." },
      { q: "Is shopping here secure?", a: "Yes. All transactions are encrypted and processed through secure, PCI-compliant payment networks." }
    ]
  },
  {
    category: "Shipping & delivery",
    questions: [
      { q: "What are your shipping options?", a: "We offer standard and expedited shipping across the USA, depending on your location." },
      { q: "Do you deliver nationwide?", a: "Yes, we ship to all 50 states, including business addresses." },
      { q: "How long does delivery take?", a: "Delivery typically takes 3–7 business days, based on your region and order volume." },
      { q: "How much does shipping cost?", a: "Shipping charges vary by product weight, location, and delivery speed. Final charges appear at checkout." },
      { q: "Will I receive a tracking number?", a: "Yes. You’ll receive a tracking link via email as soon as your order ships." },
      { q: "What if my order is delayed?", a: "You can use your tracking link or contact our support team for an immediate update." }
    ]
  },
  {
    category: "Products & availability",
    questions: [
      { q: "Are your products covered under warranty?", a: "Yes. All products come with a manufacturer's warranty." },
      { q: "What brands do you sell?", a: "We sell printers and accessories from various trusted manufacturers." },
      { q: "How can I choose the right printer?", a: "You can contact our support for personalized buying recommendations based on your usage and budget." },
      { q: "What if an item is out of stock?", a: "You can join the Back in Stock alert on the product page, and we’ll notify you as soon as it becomes available." }
    ]
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState('0-0');
  const [searchQuery, setSearchQuery] = useState('');

  const toggleAccordion = (catIdx, qIdx) => {
    const id = `${catIdx}-${qIdx}`;
    setOpenIndex(openIndex === id ? null : id);
  };

  return (
    <div className="bg-white min-h-screen font-sans text-slate-900 pb-20">
      <SEO title="FAQ | My Printing Buddy" />

      {/* --- BREADCRUMBS --- */}
      <div className="bg-white border-b border-slate-50 py-4">
        <div className="max-w-[1400px] mx-auto px-6">
          <nav className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
            <Link to="/" className="hover:text-[#991B1B]">Home</Link>
            <span className="opacity-30">/</span>
            <span className="text-slate-600">Help Center</span>
          </nav>
        </div>
      </div>

      {/* --- HERO SECTION WITH BLACK OVERLAY --- */}
      <div className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/banner/banner-7.jpg"
            alt="FAQ Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        </div>

        <div className="max-w-[1400px] mx-auto px-6 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-bold text-white  mb-8"
          >
            How can we help you?
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto relative group"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#991B1B] transition-colors" size={20} />
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-14 pl-12 pr-6 bg-white border border-slate-100 rounded-xl outline-none focus:ring-4 focus:ring-red-500/5 text-slate-900 text-sm shadow-sm transition-all"
            />
          </motion.div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* --- SIDEBAR --- */}
          <div className="hidden lg:block lg:col-span-3 sticky top-24">
            <div className="space-y-6">
              <h3 className="text-[11px] font-bold text-[#991B1B] uppercase tracking-[0.3em] mb-4">Categories</h3>
              <ul className="space-y-3">
                {faqData.map((cat, idx) => (
                  <li key={idx}>
                    <a href={`#cat-${idx}`} className="text-[13px] font-semibold text-slate-400 hover:text-[#991B1B] transition-all flex items-center gap-2 group">
                      <div className="w-1 h-1 rounded-full bg-slate-200 group-hover:bg-[#991B1B] transition-colors" />
                      {cat.category}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* --- MAIN CONTENT --- */}
          <div className="lg:col-span-9 space-y-10">
            {faqData.map((cat, catIdx) => {
              const filteredQuestions = cat.questions.filter(q =>
                q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
                q.a.toLowerCase().includes(searchQuery.toLowerCase())
              );

              if (filteredQuestions.length === 0) return null;

              return (
                <div key={catIdx} id={`cat-${catIdx}`} className="bg-white border border-slate-50 rounded-2xl overflow-hidden scroll-mt-24">
                  <div className="bg-slate-50 px-8 py-4">
                    <h2 className="text-[11px] font-bold text-[#991B1B] uppercase tracking-[0.2em]">{cat.category}</h2>
                  </div>

                  <div className="divide-y divide-slate-50">
                    {filteredQuestions.map((faq, qIdx) => {
                      const id = `${catIdx}-${qIdx}`;
                      const isOpen = openIndex === id;

                      return (
                        <div key={qIdx} className="group">
                          <button
                            onClick={() => toggleAccordion(catIdx, qIdx)}
                            className="w-full px-8 py-5 flex items-center justify-between text-left hover:bg-slate-50/30 transition-all"
                          >
                            <span className={`text-[15px] font-bold ${isOpen ? 'text-[#991B1B]' : 'text-slate-700 group-hover:text-[#991B1B]'} transition-colors`}>{faq.q}</span>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isOpen ? 'bg-[#991B1B] text-white rotate-180' : 'bg-slate-100 text-slate-400 group-hover:text-[#991B1B]'}`}>
                              <ChevronDown size={16} />
                            </div>
                          </button>
                          <AnimatePresence>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                <div className="px-8 pb-8 text-slate-500 text-[14px] leading-relaxed font-medium">
                                  <div className="h-px bg-slate-50 mb-6" />
                                  {faq.a}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {/* CTA */}
            <div className="bg-slate-50 p-10 md:p-12 rounded-3xl text-center space-y-6">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto text-[#991B1B] shadow-sm">
                <HelpCircle size={24} />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-900 uppercase ">Still need assistance?</h3>
                <p className="text-slate-400 text-[14px] font-medium max-w-md mx-auto uppercase ">Our technical team is available for specialized unit inquiries.</p>
              </div>
              <Link to="/contact" className="inline-flex items-center gap-2 bg-slate-900 hover:bg-[#991B1B] text-white px-8 py-3.5 text-[11px] font-bold uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-slate-200/50">
                Contact Support <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
