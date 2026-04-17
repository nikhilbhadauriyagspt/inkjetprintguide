import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, Briefcase, Factory, ArrowRight, Zap } from 'lucide-react';

export default function PrinterGuide() {
  const guides = [
    {
      title: "Home Operations",
      subtitle: "Personal systems",
      description: "High-definition inkjet technology engineered for vibrant photo output and student requirements.",
      icon: Home,
      link: "/shop?category=inkjet-printers"
    },
    {
      title: "Workplace Hub",
      subtitle: "Multi-function setups",
      description: "Integrated scan, copy, and print modules designed for consistent daily office throughput.",
      icon: Briefcase,
      link: "/shop?category=all-in-one-printers"
    },
    {
      title: "Industrial Core",
      subtitle: "High-volume laser",
      description: "Enterprise-grade laser engines built for maximum velocity and large-scale workloads.",
      icon: Factory,
      link: "/shop?category=laser-printers"
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-white border-t border-slate-50 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6">

        {/* Minimalist Header matched with other sections */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-24">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <Zap size={14} className="text-[#F54900]" fill="currentColor" />
              <span className="text-[11px] font-bold text-[#F54900] uppercase tracking-[0.4em]">Hardware Guide</span>
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-light text-slate-900 leading-tight"
            >
              Identify the right <span className="font-semibold text-[#F54900]">printing engine</span> <br className="hidden md:block" /> for your workspace.
            </motion.h2>
          </div>
        </div>

        {/* Ultra-Minimal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24 relative">
          {guides.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group flex flex-col h-full"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 flex items-center justify-center text-slate-400 group-hover:text-[#F54900] transition-colors duration-500">
                  <item.icon size={24} strokeWidth={1} />
                </div>
                <div className="h-px flex-1 bg-slate-100" />
                <span className="text-[10px] font-black text-slate-200 uppercase tracking-widest">0{index + 1}</span>
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-900 mb-2 uppercase tracking-tight">
                  {item.title}
                </h3>
                <p className="text-[#F54900] text-[9px] font-black uppercase tracking-[0.2em] mb-6">
                  {item.subtitle}
                </p>

                <p className="text-slate-500 text-sm leading-relaxed mb-10 max-w-sm">
                  {item.description}
                </p>
              </div>

              <Link
                to={item.link}
                className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-[#F54900] transition-all duration-300"
              >
                Learn More
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Minimal Footer Link */}
        <div className="mt-32 flex justify-center">
          <Link
            to="/shop"
            className="group flex flex-col items-center gap-4"
          >
            <span className="text-xs font-bold text-slate-400 group-hover:text-slate-900 transition-colors uppercase tracking-[0.3em]">Browse Full Inventory</span>
            <div className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center text-slate-300 group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 transition-all duration-500">
              <ArrowRight size={16} />
            </div>
          </Link>
        </div>

      </div>
    </section>
  );
}
