import React from "react";
import { Link } from "react-router-dom";
import {
  Droplets,
  Zap,
  Layers,
  Waves,
  Tag,
  Plus
} from "lucide-react";
import { motion } from "framer-motion";

export default function AboutSection() {
  const points = [
    {
      title: "Inkjet Systems",
      desc: "High-definition precision for vibrant photo and creative document output.",
      icon: Droplets,
      path: "/shop?category=inkjet-printers"
    },
    {
      title: "Laser Technology",
      desc: "High-velocity engines designed for professional-grade office productivity.",
      icon: Zap,
      path: "/shop?category=laser-printers"
    },
    {
      title: "Multi-Function Hub",
      desc: "Versatile all-in-one solutions integrating print, scan, and copy features.",
      icon: Layers,
      path: "/shop?category=all-in-one-printers"
    },
    {
      title: "SuperTank Series",
      desc: "High-capacity ink reservoir systems for ultra-low cost per page printing.",
      icon: Waves,
      path: "/shop?category=supertank-printers"
    },
    {
      title: "Label & Thermal",
      desc: "Specialized precision hardware for industrial shipping and retail labeling.",
      icon: Tag,
      path: "/shop?category=thermal-printers"
    },
  ];

  return (
    <section className="bg-white py-24 md:py-32 font-sans border-t border-slate-50 relative">
      <div className="max-w-[1600px] mx-auto px-6">

        {/* Ultra Minimal Header */}
        <div className="max-w-5xl mb-20 md:mb-28">
          <h2 className="text-3xl md:text-5xl font-light text-slate-900 leading-tight">
            Integrated <span className="font-semibold text-[#991B1B]">hardware categories</span>
            <br className="hidden md:block" /> for every workflow.
          </h2>
          <div className="h-1 w-12 bg-[#991B1B] mt-8 rounded-full" />
        </div>

        {/* Minimalist Grid (5 Columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-10 gap-y-16">
          {points.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={item.path} className="group block">
                <div className="mb-6 flex items-center justify-between">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-red-50 group-hover:text-[#991B1B] transition-colors duration-500">
                    <item.icon size={20} strokeWidth={1.5} />
                  </div>
                  <Plus size={14} className="text-slate-200 opacity-0 group-hover:opacity-100 group-hover:rotate-90 transition-all duration-500" />
                </div>

                <h3 className="text-[16px] font-semibold text-slate-900 mb-2  uppercase">
                  {item.title}
                </h3>

                <p className="text-slate-500 text-[13px] leading-relaxed font-medium">
                  {item.desc}
                </p>

                <div className="mt-4 h-[1px] w-0 bg-[#991B1B] group-hover:w-full transition-all duration-500" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Minimal Footer */}
        <div className="mt-32 flex flex-col md:flex-row items-center justify-between gap-8 text-[10px] font-bold uppercase tracking-[0.25em] text-slate-300">
          <span>My Printing Buddy • Ecosystem Overview</span>
          <div className="flex gap-10">
            <span className="hover:text-[#991B1B] cursor-default transition-colors">Precision</span>
            <span className="hover:text-[#991B1B] cursor-default transition-colors">Efficiency</span>
            <span className="hover:text-[#991B1B] cursor-default transition-colors">Versatility</span>
          </div>
        </div>

      </div>
    </section>
  );
}
