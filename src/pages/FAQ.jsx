import React, { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import SEO from '@/components/SEO';
import { ChevronDown, Search, ArrowRight, HelpCircle, MessageCircle, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const faqData = [
  {
    category: "Orders & Purchasing",
    questions: [
      { q: "How do I place an order?", a: "Simply browse our products, add your items to the cart, and complete the checkout using your preferred payment method." },
      { q: "Do I need an account to purchase?", a: "No. You can checkout as a guest. However, creating an account helps you track orders and access your purchase history." },
      { q: "How can I check my order status?", a: "Log into your account and visit My Orders to view real-time updates. You will also receive email notifications." },
      { q: "Can I modify or cancel my order?", a: "Orders can be modified or canceled before shipping. Once the item is dispatched, cancellations aren’t possible." }
    ]
  },
  {
    category: "Shipping & Delivery",
    questions: [
      { q: "What are your shipping options?", a: "We offer standard and expedited shipping across the USA, depending on your location." },
      { q: "How long does delivery take?", a: "Delivery typically takes 3–7 business days, based on your region and order volume." },
      { q: "Will I receive a tracking number?", a: "Yes. You’ll receive a tracking link via email as soon as your order ships." }
    ]
  },
  {
    category: "Products & Support",
    questions: [
      { q: "Are your products covered under warranty?", a: "Yes. All products come with a manufacturer's warranty." },
      { q: "What brands do you sell?", a: "We sell printers and accessories from various trusted manufacturers." },
      { q: "How can I choose the right printer?", a: "You can contact our support for personalized buying recommendations based on your usage and budget." }
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
    <div className="bg-white min-h-screen font-sans text-slate-900">
      <SEO title="FAQ & Help Center | Printer Support & Information | Inklivo" />

      {/* Section 1: Full BG Hero (Same as About) */}
      <section className="relative h-[50vh] md:h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/banner/category-imges/14.avif"
            alt="Help Center"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/70" />
        </div>

        <div className="max-w-[1700px] mx-auto px-6 relative z-10 w-full text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-[2px] bg-blue-500"></div>
              <span className="text-blue-400 font-bold text-sm tracking-normal">Support Registry</span>
            </div>
            <h1 className="text-4xl md:text-7xl font-bold text-white tracking-normal leading-tight">
              Frequently Asked <span className="text-blue-400">Questions.</span>
            </h1>

            <div className="mt-10 w-full max-w-2xl mx-auto relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Search for solutions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-16 pl-16 pr-8 bg-white border-0 text-slate-900 text-[16px] outline-none tracking-normal"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1700px] mx-auto px-6 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          {/* Section 2: Sidebar Filters */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-32">
            <div className="space-y-10">
              <div className="bg-white border border-slate-200 p-8">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-1 h-6 bg-[#0096d6]"></div>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900">Explore Topics</h3>
                </div>
                <nav className="flex flex-col gap-2">
                  {faqData.map((cat, idx) => (
                    <a
                      key={idx}
                      href={`#cat-${idx}`}
                      className="px-4 py-3 border-l-2 border-transparent hover:border-[#0096d6] hover:bg-slate-50 text-[14px] font-semibold text-slate-500 hover:text-[#0096d6] transition-all"
                    >
                      {cat.category}
                    </a>
                  ))}
                </nav>
              </div>

              <div className="bg-slate-950 p-10 text-white space-y-6">
                <HelpCircle className="text-blue-500" size={32} />
                <h4 className="text-xl font-bold tracking-normal">Direct Support?</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Our technical team is available to assist you with specific hardware queries.
                </p>
                <Link to="/contact" className="inline-flex items-center gap-3 bg-[#0096d6] text-white px-6 py-3 font-bold text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                  Contact Us <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </aside>

          {/* Section 3: FAQ Accordion */}
          <main className="lg:col-span-9 space-y-20">
            {faqData.map((cat, catIdx) => {
              const filteredQuestions = cat.questions.filter(q =>
                q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
                q.a.toLowerCase().includes(searchQuery.toLowerCase())
              );

              if (filteredQuestions.length === 0) return null;

              return (
                <div key={catIdx} id={`cat-${catIdx}`} className="scroll-mt-32 space-y-10">
                  <div className="flex items-center gap-6">
                    <div className="w-1.5 h-10 bg-[#0096d6]"></div>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-normal uppercase">{cat.category}</h2>
                  </div>

                  <div className="space-y-4">
                    {filteredQuestions.map((faq, qIdx) => {
                      const id = `${catIdx}-${qIdx}`;
                      const isOpen = openIndex === id;

                      return (
                        <div key={qIdx} className="bg-white border border-slate-200 overflow-hidden">
                          <button
                            onClick={() => toggleAccordion(catIdx, qIdx)}
                            className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-slate-50 transition-all"
                          >
                            <span className={`text-[16px] md:text-[18px] font-bold tracking-normal ${isOpen ? 'text-[#0096d6]' : 'text-slate-800'}`}>
                              {faq.q}
                            </span>
                            <div className={`shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#0096d6]' : 'text-slate-400'}`}>
                              <ChevronDown size={20} />
                            </div>
                          </button>
                          <AnimatePresence>
                            {isOpen && (
                              <m.div
                                initial={{ height: 0 }}
                                animate={{ height: 'auto' }}
                                exit={{ height: 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                <div className="px-8 pb-8 text-slate-500 text-[15px] md:text-[16px] leading-relaxed tracking-normal">
                                  <div className="h-px bg-slate-100 mb-6" />
                                  {faq.a}
                                </div>
                              </m.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {/* Section 4: Final CTA */}
            <section className="py-24 bg-[#0096d6] text-white text-center space-y-10">
              <h2 className="text-3xl md:text-5xl font-bold tracking-normal uppercase leading-none">Still Need Assistance?</h2>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/contact" className="inline-flex items-center gap-4 bg-black text-white px-10 py-4 font-bold text-sm tracking-normal hover:bg-white hover:text-black transition-all">
                  <MessageCircle size={20} /> Get in Touch
                </Link>
                <Link to="/shop" className="inline-flex items-center gap-4 bg-white text-black px-10 py-4 font-bold text-sm tracking-normal hover:bg-black hover:text-white transition-all">
                  <ShoppingBag size={20} /> Return to Shop
                </Link>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}

