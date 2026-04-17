import React from "react";
import {
  Truck,
  ShieldCheck,
  Headphones,
  Zap,
  RefreshCcw
} from "lucide-react";
import { motion } from "framer-motion";

export default function ServiceHighlights() {
  const items = [
    {
      id: 1,
      icon: Truck,
      title: "Global Shipping",
      desc: "Fast worldwide logistics."
    },
    {
      id: 2,
      icon: RefreshCcw,
      title: "Easy Returns",
      desc: "7-day seamless exchange."
    },
    {
      id: 3,
      icon: ShieldCheck,
      title: "Secure Pay",
      desc: "100% encrypted protocols."
    },
    {
      id: 4,
      icon: Headphones,
      title: "Expert Help",
      desc: "24/7 technical support."
    },
    {
      id: 5,
      icon: Zap,
      title: "Fast Dispatch",
      desc: "Same-day deployment."
    },
  ];

  return (
    <div className="w-full bg-white border-t border-slate-50 py-16 md:py-20">
      <div className="max-w-[1600px] mx-auto px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-slate-100 border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 md:p-10 flex flex-col items-center text-center group bg-white hover:bg-slate-50 transition-colors duration-500"
            >
              <div className="mb-6">
                <div className="w-10 h-10 flex items-center justify-center text-slate-300 group-hover:text-[#F54900] transition-colors duration-500">
                  <item.icon size={28} strokeWidth={1} />
                </div>
              </div>

              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-2 group-hover:text-[#F54900] transition-colors">
                {item.title}
              </h4>
              <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
