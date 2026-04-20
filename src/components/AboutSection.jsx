import React from "react";
import { Link } from "react-router-dom";
import {
  Droplets,
  Zap,
  Layers,
  Waves,
  Tag,
  ArrowRight,
  ShieldCheck,
  Globe,
  Clock
} from "lucide-react";
import { motion } from "framer-motion";

export default function AboutSection() {
  const values = [
    { icon: ShieldCheck, title: "Genuine Quality", desc: "100% authentic hardware from global leading brands." },
    { icon: Globe, title: "Global Reach", desc: "Reliable international shipping for professional teams." },
    { icon: Clock, title: "Expert Support", desc: "Decade of expertise in complex printing architectures." }
  ];

  const categories = [
    { title: "Inkjet Systems", desc: "High-definition precision for creative documentation.", icon: Droplets, path: "/shop?category=inkjet-printers" },
    { title: "Laser Tech", desc: "High-velocity engines for heavy-duty office productivity.", icon: Zap, path: "/shop?category=laser-printers" },
    { title: "Multi-Function", desc: "All-in-one solutions for scanning and cloud faxing.", icon: Layers, path: "/shop?category=all-in-one-printers" },
    { title: "SuperTank", desc: "High-capacity reservoirs for ultra-low cost per page.", icon: Waves, path: "/shop?category=supertank-printers" },
    { title: "Industrial", desc: "Precision hardware for high-speed thermal labeling.", icon: Tag, path: "/shop?category=thermal-printers" }
  ];

  return (
    <section className="bg-white py-20 md:py-28 relative overflow-hidden">
      <div className="max-w-[1800px] mx-auto px-6 relative z-10">

        {/* About Us Intro Part */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24 pb-20 border-b border-slate-50">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-[2px] bg-[#2f5cab]"></div>
              <span className="text-[11px] font-bold text-[#2f5cab] uppercase tracking-[0.3em]">Who We Are</span>
            </div>
            <h2 className="text-4xl font-semibold text-slate-900 leading-[1.1] mb-8">
              Empowering your <span className="text-[#2f5cab]">productivity</span> through precision hardware.
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed max-w-xl mb-10">
              At Print Mora, we don't just sell equipment; we architect the ideal printing environment for your business. With over a decade of experience, we specialize in high-performance hardware that integrates seamlessly into professional workflows.
            </p>
            <Link to="/about" className="inline-flex items-center gap-2 bg-[#2f5cab] text-white px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-[#234d98] transition-all shadow-lg shadow-[#2f5cab]/10">
              Learn Our Story <ArrowRight size={16} />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 bg-slate-50/50 rounded-2xl border border-slate-100"
              >
                <v.icon size={28} className="text-[#2f5cab] mb-4" strokeWidth={1.5} />
                <h4 className="text-[16px] font-bold text-slate-800 mb-2">{v.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Ecosystem Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-[2px] bg-[#2f5cab]"></div>
              <span className="text-[11px] font-bold text-[#2f5cab] uppercase tracking-[0.3em]">Our Specialization</span>
            </div>
            <h3 className="text-2xl md:text-4xl font-semibold text-slate-900">
              The hardware ecosystem.
            </h3>
          </div>
          <Link to="/shop" className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-[#2f5cab] transition-colors flex items-center gap-2 group">
            Browse All <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Light Minimal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {categories.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group p-6 rounded-xl border border-slate-100 hover:border-[#2f5cab]/20 hover:bg-slate-50/50 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-slate-50 flex items-center justify-center mb-6 group-hover:bg-[#2f5cab] group-hover:text-white transition-all duration-300">
                <item.icon size={22} strokeWidth={1.5} className="text-[#2f5cab] group-hover:text-white" />
              </div>

              <h3 className="text-[15px] font-bold text-slate-800 mb-2">
                {item.title}
              </h3>
              <p className="text-slate-500 text-[12px] leading-relaxed mb-6">
                {item.desc}
              </p>

              <Link
                to={item.path}
                className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#2f5cab] opacity-0 group-hover:opacity-100 group-hover:gap-2 transition-all"
              >
                View <ArrowRight size={12} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
