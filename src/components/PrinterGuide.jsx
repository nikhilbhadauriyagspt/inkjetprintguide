import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, Briefcase, Factory, ArrowRight, CheckCircle2, Search } from 'lucide-react';

export default function PrinterGuide() {
  const guides = [
    {
      title: "Home Users",
      subtitle: "Portable & Wireless",
      description: "A home printer with wireless inkjet for vibrant colors and everyday reliability.",
      points: ["Print photos, documents and homework", "Low cost printing", "Simple Wi-Fi set-up"],
      icon: Home,
      link: "/shop?category=inkjet-printers",
      btnText: "Shop for Home"
    },
    {
      title: "Small Business",
      subtitle: "Multifunction & Connected",
      description: "Print, scan and copy in one office printer with advanced networking.",
      points: ["Auto duplex and document feeder", "Prepared for the network", "Consistent daily printing"],
      icon: Briefcase,
      link: "/shop?category=all-in-one-printers",
      btnText: "Shop for Office",
      featured: true
    },
    {
      title: "Enterprise",
      subtitle: "High Speed & High Volume",
      description: "Powerful laser printers designed for large workloads and continuous printing.",
      points: ["High page-per-minute output", "Secure document scanning", "Designed for scale"],
      icon: Factory,
      link: "/shop?category=laser-printers",
      btnText: "Shop Laser Printers"
    }
  ];

  return (
    <section className="py-20 bg-slate-50 font-['Rubik'] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 md:px-10">
        
        {/* HEADER */}
        <div className="flex flex-col items-center justify-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-3"
          >
            <div className="inline-flex items-center gap-2 text-blue-600 text-[13px] font-bold uppercase tracking-[0.2em]">
              <Search size={16} /> Assistance
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">
              Guide for <span className="text-blue-600">Buying a Printer</span>
            </h2>
            <p className="text-slate-500 text-sm md:text-lg max-w-2xl mx-auto mt-4">
              Find the Right Printer for Your Needs. Select the best inkjet, laser, or office printer for your workflow.
            </p>
          </motion.div>
        </div>

        {/* GUIDES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {guides.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-white p-8 md:p-10 rounded-2xl border transition-all duration-500 flex flex-col h-full ${
                item.featured 
                ? 'border-blue-600 shadow-[0_20px_50px_rgba(30,58,138,0.1)] scale-105 z-10' 
                : 'border-slate-100 hover:border-blue-200 hover:shadow-xl'
              }`}
            >
              {item.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full">
                  Most Popular
                </div>
              )}

              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-8 ${item.featured ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600'}`}>
                <item.icon size={28} />
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-1">{item.title}</h3>
                <p className="text-blue-600 text-sm font-semibold uppercase tracking-wider">{item.subtitle}</p>
              </div>

              <p className="text-slate-500 text-[15px] leading-relaxed mb-8">
                {item.description}
              </p>

              <ul className="space-y-4 mb-10 flex-1">
                {item.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-700 text-sm">
                    <CheckCircle2 size={18} className="text-blue-500 mt-0.5 shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <Link 
                to={item.link}
                className={`w-full py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                  item.featured 
                  ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/20' 
                  : 'bg-slate-900 text-white hover:bg-blue-600'
                }`}
              >
                {item.btnText} <ArrowRight size={16} />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* FOOTER CALL TO ACTION */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 p-8 md:p-12 rounded-3xl bg-white border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left"
          style={{ background: 'linear-gradient(135deg, #fff 0%, #f8fafc 100%)' }}
        >
          <div>
            <h4 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">Not sure which printer you need?</h4>
            <p className="text-slate-500">Browse all printers and compare features easily to make the best choice.</p>
          </div>
          <Link 
            to="/shop" 
            className="px-10 py-5 bg-white border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white transition-all rounded-2xl font-bold uppercase tracking-widest text-sm flex items-center gap-3"
          >
            Browse All Products <ArrowRight size={20} />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
