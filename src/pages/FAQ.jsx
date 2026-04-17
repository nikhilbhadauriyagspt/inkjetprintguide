import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '@/components/SEO';
import { ChevronDown, Search, HelpCircle, ArrowRight, Zap } from 'lucide-react';
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
      <SEO title="FAQ | My Printer Land" />

      {/* --- MINIMAL TECHNICAL HEADER --- */}
      <section className="bg-slate-50 py-24 md:py-32 border-b border-slate-100 relative overflow-hidden text-center">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }}
        />

        <div className="max-w-[1600px] mx-auto px-8 relative z-10 flex flex-col items-center">
          <div className="flex items-center gap-3 mb-6">
            <Zap size={14} className="text-[#F54900]" fill="currentColor" />
            <span className="text-[10px] font-black text-[#F54900] uppercase tracking-[0.5em]">Help.Center</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-light text-slate-900 leading-tight tracking-tighter">
            How can we <span className="text-slate-300">assist you?</span>
          </h1>

          <div className="mt-12 w-full max-w-xl relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#F54900] transition-colors" size={18} />
            <input
              type="text"
              placeholder="Search for solutions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-12 pr-6 bg-white border border-slate-100 rounded-xl outline-none focus:ring-4 focus:ring-[#F54900]/5 text-slate-900 text-sm shadow-sm transition-all"
            />
          </div>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">

          {/* --- SIDEBAR --- */}
          <div className="hidden lg:block lg:col-span-3 sticky top-32">
            <div className="space-y-10">
              <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] mb-8">Categories</h3>
              <ul className="space-y-4">
                {faqData.map((cat, idx) => (
                  <li key={idx}>
                    <a href={`#cat-${idx}`} className="text-[12px] font-bold text-slate-400 hover:text-[#F54900] transition-all flex items-center gap-3 group uppercase tracking-widest">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-100 group-hover:bg-[#F54900] transition-colors" />
                      {cat.category}
                    </a>
                  </li>
                ))}
              </ul>
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
                    <h2 className="text-[10px] font-black text-[#F54900] uppercase tracking-[0.5em]">{cat.category}</h2>
                    <div className="h-px flex-1 bg-slate-50" />
                  </div>

                  <div className="space-y-4">
                    {filteredQuestions.map((faq, qIdx) => {
                      const id = `${catIdx}-${qIdx}`;
                      const isOpen = openIndex === id;

                      return (
                        <div key={qIdx} className="bg-white border border-slate-50 rounded-2xl overflow-hidden group hover:border-slate-100 transition-all">
                          <button
                            onClick={() => toggleAccordion(catIdx, qIdx)}
                            className="w-full px-8 py-6 flex items-center justify-between text-left transition-all"
                          >
                            <span className={`text-[15px] font-bold ${isOpen ? 'text-[#F54900]' : 'text-slate-800 group-hover:text-[#F54900]'} transition-colors`}>{faq.q}</span>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isOpen ? 'bg-[#F54900] text-white rotate-180 shadow-lg shadow-[#F54900]/20' : 'bg-slate-50 text-slate-300 group-hover:text-[#F54900]'}`}>
                              <ChevronDown size={14} strokeWidth={3} />
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
            <div className="pt-20 border-t border-slate-50 text-center space-y-8">
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-slate-900 uppercase tracking-tighter">Still need assistance?</h3>
                <p className="text-slate-400 text-xs font-bold max-w-md mx-auto uppercase tracking-widest">Our technical team is available for specialized unit inquiries.</p>
              </div>
              <Link to="/contact" className="inline-flex items-center gap-4 text-xs font-black uppercase tracking-[0.4em] text-slate-900 group">
                Contact Support
                <div className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-all">
                  <ArrowRight size={18} />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
