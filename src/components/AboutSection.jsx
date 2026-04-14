import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Home,
  Briefcase,
  Tag,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';

export default function AboutSection() {
  const sections = [
    {
      title: "Home & Personal",
      description: "Discover wireless inkjet solutions designed for vivid color and everyday reliability in your home office.",
      icon: Home,
      path: "/shop?category=inkjet-printers"
    },
    {
      title: "Business & Office",
      description: "High-speed laser printers engineered for high-volume teams requiring precision and professional-grade output.",
      icon: Briefcase,
      path: "/shop?category=laser-printers"
    },
    {
      title: "Exclusive Value",
      description: "We curate the market's best printer deals, ensuring you receive premium technology within your budget.",
      icon: Tag,
      path: "/shop?category=all-in-one-printers"
    },
    {
      title: "Secure Checkout",
      description: "Shop with peace of mind featuring encrypted payments, fast shipping, and our 30-day quality guarantee.",
      icon: ShieldCheck,
      path: "/shop"
    }
  ];


  return (
    <section className="py-24 bg-white font-sans relative">
      <div className="max-w-[1400px] mx-auto px-6">

        {/* Refined Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-blue-600 text-[12px] font-bold uppercase mb-4 block">
              The Standard in Printing
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
              About <span className="text-blue-600">Printing Mania</span>
            </h2>
            <div className="w-16 h-1 bg-blue-600 mx-auto mt-8 rounded-full" />
          </motion.div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {sections.map((section, index) => (
            <Link key={index} to={section.path}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative h-full bg-white border border-slate-200 p-8 rounded-xl hover:border-blue-600 transition-all duration-300 hover:shadow-xl hover:shadow-blue-900/5 cursor-pointer"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-slate-50 rounded-lg text-slate-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 mb-8">
                  <section.icon size={24} strokeWidth={1.5} />
                </div>

                <div className="space-y-4">
                  <h4 className="text-[14px] font-bold text-slate-900 uppercase">
                    {section.title}
                  </h4>
                  <p className="text-slate-600 text-[14px] leading-relaxed font-normal min-h-[60px]">
                    {section.description}
                  </p>
                  <div className="flex items-center gap-2 text-[12px] font-bold text-blue-600 uppercase opacity-0 group-hover:opacity-100 transition-all duration-300 pt-2">
                    View Collection <ArrowRight size={14} />
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>


        {/* Narrative Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 text-center max-w-4xl mx-auto border-t border-slate-100 pt-16"
        >
          <p className="text-slate-600 text-lg font-normal leading-relaxed mb-12">
            Printing Mania is a specialized Pennsylvania-based retailer delivering professional printing infrastructure nationwide. From advanced laser systems to wireless inkjet solutions, we bridge the gap between complex technology and seamless operational performance for businesses and homes.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
