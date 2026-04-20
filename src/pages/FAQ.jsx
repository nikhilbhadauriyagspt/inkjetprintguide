import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '@/components/SEO';
import { ChevronDown, Search, ArrowRight, HelpCircle } from 'lucide-react';
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
      <SEO title="FAQ | Print Mora" />

      {/* --- HERO SECTION --- */}
      <section className="bg-[#f8faff] py-20 md:py-28 relative overflow-hidden">
        <div className="max-w-[1800px] mx-auto px-4 md:px-10 relative z-10 flex flex-col items-center text-center">
          <div className="mb-6">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#2f5cab] leading-tight">
              Frequently Asked Questions
            </h1>
            <p className="mt-4 text-slate-500 text-lg md:text-xl max-w-2xl mx-auto font-medium">
              Find answers to common questions about our products, shipping, and services.
            </p>
          </div>

          <div className="mt-10 w-full max-w-2xl relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#2f5cab] transition-colors" size={20} />
            <input
              type="text"
              placeholder="Search for solutions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-16 pl-14 pr-8 bg-white border border-slate-200 rounded-full outline-none focus:ring-4 focus:ring-[#2f5cab]/5 focus:border-[#2f5cab] text-slate-900 text-[16px] shadow-sm transition-all placeholder:text-slate-400 font-medium"
            />
          </div>
        </div>
      </section>

      <div className="max-w-[1800px] mx-auto px-4 md:px-10 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20 items-start">

          {/* --- SIDEBAR --- */}
          <div className="hidden lg:block lg:col-span-3 sticky top-32">
            <div className="space-y-8">
              <h3 className="text-[12px] font-bold text-slate-400 uppercase tracking-widest mb-6">Explore Categories</h3>
              <nav className="flex flex-col gap-2">
                {faqData.map((cat, idx) => (
                  <a 
                    key={idx}
                    href={`#cat-${idx}`} 
                    className="p-4 rounded-xl border border-transparent hover:border-blue-100 hover:bg-blue-50/50 transition-all flex items-center gap-3 group"
                  >
                    <div className="w-2 h-2 rounded-full bg-slate-200 group-hover:bg-[#2f5cab] transition-colors" />
                    <span className="text-[14px] font-semibold text-slate-700 group-hover:text-[#2f5cab] transition-colors">{cat.category}</span>
                  </a>
                ))}
              </nav>
              
              <div className="p-8 bg-blue-50 rounded-[20px] border border-blue-100 mt-10">
                <HelpCircle className="text-[#2f5cab] mb-4" size={28} />
                <h4 className="font-bold text-slate-800 mb-2">Need more help?</h4>
                <p className="text-[13px] text-slate-600 mb-6 leading-relaxed font-medium">
                  Our team of experts is ready to assist you with any questions.
                </p>
                <Link to="/contact" className="inline-flex items-center gap-2 text-[13px] font-bold text-[#2f5cab] hover:underline">
                  Contact Us <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>

          {/* --- MAIN CONTENT --- */}
          <div className="lg:col-span-9 space-y-16">
            {faqData.map((cat, catIdx) => {
              const filteredQuestions = cat.questions.filter(q =>
                q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
                q.a.toLowerCase().includes(searchQuery.toLowerCase())
              );

              if (filteredQuestions.length === 0) return null;

              return (
                <div key={catIdx} id={`cat-${catIdx}`} className="scroll-mt-32 space-y-8">
                  <div className="flex items-center gap-4">
                    <h2 className="text-xl font-bold text-slate-900">{cat.category}</h2>
                    <div className="h-px flex-1 bg-slate-100" />
                  </div>

                  <div className="space-y-4">
                    {filteredQuestions.map((faq, qIdx) => {
                      const id = `${catIdx}-${qIdx}`;
                      const isOpen = openIndex === id;

                      return (
                        <div key={qIdx} className="bg-white border border-slate-100 rounded-2xl overflow-hidden group hover:shadow-md transition-all">
                          <button
                            onClick={() => toggleAccordion(catIdx, qIdx)}
                            className="w-full px-6 md:px-8 py-5 md:py-6 flex items-center justify-between text-left transition-all"
                          >
                            <span className={`text-[15px] md:text-[16px] font-semibold ${isOpen ? 'text-[#2f5cab]' : 'text-slate-800 group-hover:text-[#2f5cab]'} transition-colors`}>
                              {faq.q}
                            </span>
                            <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all ${isOpen ? 'bg-[#2f5cab] text-white rotate-180 shadow-lg shadow-blue-600/20' : 'bg-slate-50 text-slate-400 group-hover:text-[#2f5cab]'}`}>
                              <ChevronDown size={16} strokeWidth={2.5} />
                            </div>
                          </button>
                          <AnimatePresence>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25, ease: "easeOut" }}
                              >
                                <div className="px-6 md:px-8 pb-6 md:pb-8 text-slate-600 text-[14px] md:text-[15px] leading-relaxed font-medium">
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
            <div className="pt-20 border-t border-slate-100 text-center">
              <div className="bg-[#fcfcfc] rounded-[30px] p-10 md:p-16 border border-slate-50">
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">Still have questions?</h3>
                <p className="text-slate-500 mb-10 max-w-xl mx-auto font-medium">
                  Can't find what you're looking for? Please chat to our friendly team.
                </p>
                <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                  <Link 
                    to="/contact" 
                    className="px-10 py-4 bg-[#2f5cab] text-white font-bold rounded-full hover:bg-[#234d98] transition-all shadow-lg shadow-blue-600/20 active:scale-95"
                  >
                    Get in Touch
                  </Link>
                  <Link 
                    to="/shop" 
                    className="px-10 py-4 bg-white text-slate-900 border border-slate-200 font-bold rounded-full hover:bg-slate-50 transition-all active:scale-95"
                  >
                    Return to Shop
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
