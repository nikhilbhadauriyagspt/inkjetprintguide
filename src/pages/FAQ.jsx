import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '@/components/SEO';
import { ChevronDown, Search, HelpCircle, ChevronRight, ArrowRight } from 'lucide-react';
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
    <div className="bg-[#eaeded] min-h-screen font-['Rubik'] text-[#0f1111] pb-20">
      <SEO title="FAQ | Dashing Printers" />

      {/* --- BREADCRUMBS --- */}
      <div className="bg-white border-b border-gray-300 py-3 shadow-sm">
        <div className="max-w-[1500px] mx-auto px-4 md:px-8">
          <nav className="flex items-center gap-1 text-[12px] text-[#565959]">
            <Link to="/" className="hover:underline hover:text-[#c45500]">Home</Link>
            <ChevronRight size={12} className="mx-1" />
            <span className="text-[#0f1111] font-bold">Help Center</span>
          </nav>
        </div>
      </div>

      {/* --- PAGE HEADER --- */}
      <div className="bg-[#232f3e] text-white py-12 md:py-16">
        <div className="max-w-[1500px] mx-auto px-4 md:px-8 text-center">
          <h1 className="text-2xl md:text-4xl font-bold tracking-normal mb-8">
            How can we help you?
          </h1>

          <div className="max-w-2xl mx-auto relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search for answers about orders, shipping, or products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-12 pr-6 bg-white border border-gray-400 rounded-sm outline-none focus:border-[#e77600] focus:ring-1 focus:ring-[#e77600] text-[#0f1111] text-sm"
            />
          </div>
        </div>
      </div>

      <div className="max-w-[1500px] mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* --- SIDEBAR CATEGORIES (Amazon style) --- */}
            <div className="hidden lg:block lg:col-span-3 space-y-4">
                <div className="bg-white p-4 border border-gray-300 rounded-sm shadow-sm">
                    <h3 className="text-[14px] font-bold mb-4 border-b border-gray-200 pb-2">Help Categories</h3>
                    <ul className="space-y-3">
                        {faqData.map((cat, idx) => (
                            <li key={idx}>
                                <a href={`#cat-${idx}`} className="text-[13px] text-[#007185] hover:text-[#c45500] hover:underline flex items-center gap-2">
                                    <ChevronRight size={12} />
                                    {cat.category}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* --- MAIN CONTENT --- */}
            <div className="lg:col-span-9 space-y-8">
                {faqData.map((cat, catIdx) => {
                    const filteredQuestions = cat.questions.filter(q =>
                        q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        q.a.toLowerCase().includes(searchQuery.toLowerCase())
                    );

                    if (filteredQuestions.length === 0) return null;

                    return (
                        <div key={catIdx} id={`cat-${catIdx}`} className="bg-white border border-gray-300 rounded-sm shadow-sm overflow-hidden">
                            <div className="bg-[#f0f2f2] px-6 py-3 border-b border-gray-300">
                                <h2 className="text-[14px] font-bold text-[#0f1111] uppercase tracking-wider">{cat.category}</h2>
                            </div>

                            <div className="divide-y divide-gray-200">
                                {filteredQuestions.map((faq, qIdx) => {
                                    const id = `${catIdx}-${qIdx}`;
                                    const isOpen = openIndex === id;

                                    return (
                                        <div key={qIdx} className="transition-all duration-300">
                                            <button
                                                onClick={() => toggleAccordion(catIdx, qIdx)}
                                                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-all"
                                            >
                                                <span className={`text-[14px] font-bold ${isOpen ? 'text-[#c45500]' : 'text-[#0f1111]'}`}>{faq.q}</span>
                                                <ChevronDown size={16} className={`text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                                            </button>
                                            <AnimatePresence>
                                                {isOpen && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    <div className="px-6 pb-6 text-[#565959] text-[14px] leading-relaxed">
                                                        <div className="h-px bg-gray-100 mb-4" />
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

                {/* BOTTOM CALL TO ACTION */}
                <div className="bg-white p-8 border border-gray-300 rounded-sm shadow-sm text-center">
                    <div className="flex flex-col items-center">
                        <div className="w-12 h-12 bg-[#f0f2f2] rounded-full flex items-center justify-center mb-4 text-[#232f3e]">
                            <HelpCircle size={24} />
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-[#0f1111]">Still need assistance?</h3>
                        <p className="text-[#565959] text-sm mb-6 max-w-md">Our dedicated support team is ready to help you with any specialized printer questions.</p>
                        <Link to="/contact" className="bg-[#ffd814] border border-[#fcd200] hover:bg-[#f7ca00] text-[#0f1111] px-10 py-2 text-[14px] font-normal rounded-md shadow-sm transition-colors inline-flex items-center gap-2">
                            Contact Support Team <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
