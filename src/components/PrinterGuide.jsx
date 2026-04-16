import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, Briefcase, Factory, ArrowRight, Zap, Search } from 'lucide-react';

export default function PrinterGuide() {
  const guides = [
    {
      title: "Home Operations",
      subtitle: "Personal systems",
      description: "Wireless inkjet technology engineered for vibrant photo output and student requirements.",
      points: ["High-DPI photo printing", "Economic ink usage", "Secure cloud connectivity"],
      icon: Home,
      link: "/shop?category=inkjet-printers",
      btnText: "Initialize Home"
    },
    {
      title: "Workplace Hub",
      subtitle: "Multi-function setups",
      description: "Integrated scan, copy, and print modules designed for consistent daily office throughput.",
      points: ["Automatic document feed", "Network ready protocol", "Multi-user management"],
      icon: Briefcase,
      link: "/shop?category=all-in-one-printers",
      btnText: "Deploy Office"
    },
    {
      title: "Industrial Core",
      subtitle: "High-volume laser",
      description: "Enterprise-grade laser engines built for maximum velocity and large-scale workloads.",
      points: ["45+ PPM output speed", "Encrypted document data", "Heavy-duty cycles"],
      icon: Factory,
      link: "/shop?category=laser-printers",
      btnText: "Execute Enterprise"
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-white font-sans border-t border-slate-50 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6">

        {/* Minimalist Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-24">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-[#991B1B]" />
              <span className="text-[11px] font-bold text-[#991B1B] uppercase tracking-[0.4em]">Procurement Guide</span>
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-light text-slate-900 leading-tight"
            >
              Strategic <span className="font-semibold text-[#991B1B]">hardware selection</span> <br className="hidden md:block" /> for your environment.
            </motion.h2>
          </div>
          <p className="text-slate-400 text-sm md:text-base font-medium max-w-[500px] leading-relaxed uppercase ">
            Identify the optimal printing engine based on your operational scale and output requirements.
          </p>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-16">
          {guides.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group flex flex-col h-full"
            >
              <div className="mb-8 relative flex items-center justify-between">
                <div className="w-14 h-14 rounded-3xl bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-red-50 group-hover:text-[#991B1B] transition-all duration-500">
                  <item.icon size={28} strokeWidth={1.5} />
                </div>
                <span className="text-[60px] font-black text-slate-50 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none group-hover:text-red-50/50 transition-colors">
                  0{index + 1}
                </span>
              </div>

              <div className="flex-1">
                <h3 className="text-2xl font-bold text-slate-900 mb-2  lowercase">
                  {item.title}.
                </h3>
                <p className="text-[#991B1B] text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                  {item.subtitle}
                </p>

                <p className="text-slate-500 text-[15px] leading-relaxed mb-8 font-medium">
                  {item.description}
                </p>

                <div className="space-y-4 mb-10">
                  {item.points.map((point, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-1 h-1 rounded-full bg-slate-200 group-hover:bg-[#991B1B] transition-colors" />
                      <span className="text-slate-400 text-xs font-bold uppercase tracking-wide group-hover:text-slate-600 transition-colors">{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                to={item.link}
                className="inline-flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] text-slate-900 group-hover:text-[#991B1B] transition-colors"
              >
                {item.btnText}
                <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-32 pt-16 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div>
            <h4 className="text-xl font-bold text-slate-900 lowercase ">Requirement not listed?</h4>
            <p className="text-slate-400 text-sm font-medium mt-1">Our technical team can provide customized hardware audits for your specific needs.</p>
          </div>
          <Link
            to="/shop"
            className="px-10 py-4 bg-slate-900 text-white font-black text-[11px] uppercase tracking-[0.3em] rounded-2xl hover:bg-[#991B1B] transition-all shadow-xl shadow-slate-200/50 hover:shadow-red-900/20"
          >
            Access Full Catalog
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
