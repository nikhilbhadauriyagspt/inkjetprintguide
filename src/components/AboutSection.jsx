import React from "react";
import { Link } from "react-router-dom";
import {
  Droplets,
  Zap,
  Layers,
  Waves,
  Tag,
  ArrowUpRight,
  ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";

export default function AboutSection() {
  const categories = [
    {
      title: "Inkjet Systems",
      desc: "Engineered for high-definition precision, delivering vibrant photo-realistic output and professional creative documentation.",
      icon: Droplets,
      color: "text-blue-500",
      bg: "bg-blue-50/50",
      path: "/shop?category=inkjet-printers"
    },
    {
      title: "Laser Technology",
      desc: "High-velocity printing engines designed for heavy-duty office productivity and crisp, professional-grade monochrome text.",
      icon: Zap,
      color: "text-orange-500",
      bg: "bg-orange-50/50",
      path: "/shop?category=laser-printers"
    },
    {
      title: "Multi-Function Hubs",
      desc: "Versatile all-in-one hardware solutions that seamlessly integrate high-speed printing, scanning, copying, and cloud faxing.",
      icon: Layers,
      color: "text-purple-500",
      bg: "bg-purple-50/50",
      path: "/shop?category=all-in-one-printers"
    },
    {
      title: "SuperTank Series",
      desc: "Innovative high-capacity reservoir systems engineered to provide an ultra-low cost per page for high-volume environments.",
      icon: Waves,
      color: "text-cyan-500",
      bg: "bg-cyan-50/50",
      path: "/shop?category=supertank-printers"
    },
    {
      title: "Label & Thermal",
      desc: "Specialized precision hardware optimized for industrial shipping, retail inventory management, and high-speed labeling.",
      icon: Tag,
      color: "text-emerald-500",
      bg: "bg-emerald-50/50",
      path: "/shop?category=thermal-printers"
    },
  ];

  return (
    <section className="bg-[#fffbf9] py-24 md:py-32 relative overflow-hidden border-t border-slate-50">
      <div className="max-w-[1600px] mx-auto px-6 relative z-10">

        {/* Modern Minimal Heading matched with New Arrivals */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <Zap size={14} className="text-[#F54900]" fill="currentColor" />
              <span className="text-[11px] font-bold text-[#F54900] uppercase tracking-[0.4em]">Our Ecosystem</span>
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-light text-slate-900 leading-tight"
            >
              Specialized hardware for <span className="font-semibold text-[#F54900]">every professional workflow.</span>
            </motion.h2>
          </div>

          <Link to="/shop" className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-300 hover:text-[#F54900] transition-colors flex items-center gap-3 group">
            Inventory <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        {/* Bento-Lite Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-100 border border-slate-100 rounded-xl overflow-hidden shadow-sm">
          {categories.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-10 group hover:bg-slate-50 transition-colors duration-500"
            >
              <div className="flex flex-col h-full">
                <div className={`w-12 h-12 rounded-xl ${item.bg} ${item.color} flex items-center justify-center mb-8 group-hover:scale-110 transition-all duration-500`}>
                  <item.icon size={22} strokeWidth={1.5} />
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 text-[15px] leading-relaxed max-w-[260px]">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-10">
                  <Link
                    to={item.path}
                    className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 group-hover:text-[#F54900] transition-all duration-500"
                  >
                    View Details
                    <ArrowUpRight size={14} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Custom Feature Card */}
          <div className="bg-slate-900 p-10 flex flex-col justify-between text-white lg:col-span-1 md:col-span-2 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#F54900]/10 rounded-full blur-3xl -mr-16 -mt-16" />

            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-5 leading-tight text-white/90">Expert Solution <br />Consultancy</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Connect with our product specialists to architect the ideal printing environment.
              </p>
            </div>
            <Link
              to="/contact"
              className="relative z-10 mt-10 py-4 px-6 bg-white text-slate-900 rounded-lg font-black text-[10px] uppercase tracking-widest hover:bg-[#F54900] hover:text-white transition-all text-center"
            >
              Contact Specialist
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}