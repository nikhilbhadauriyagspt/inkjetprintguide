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
      desc: "Worldwide delivery logistics."
    },
    {
      id: 2,
      icon: RefreshCcw,
      title: "Easy Returns",
      desc: "7-day seamless replacement."
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
      desc: "24/7 technical assistance."
    },
    {
      id: 5,
      icon: Zap,
      title: "Fast Dispatch",
      desc: "Same-day system deployment."
    },
  ];

  return (
    <div className="w-full bg-white border-b border-slate-50 py-12 md:py-16">
      <div className="max-w-[1600px] mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-12 gap-x-8">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center text-center group cursor-default"
            >
              <div className="mb-5 relative">
                <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-red-50 group-hover:text-[#991B1B] transition-colors duration-500">
                  <item.icon size={22} strokeWidth={1.5} />
                </div>
                {/* Minimalist dot indicator */}
                <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#991B1B] scale-0 group-hover:scale-100 transition-transform duration-500 shadow-[0_0_8px_#991B1B]" />
              </div>

              <h4 className="text-[14px] font-bold text-slate-900  mb-1 group-hover:text-[#991B1B] transition-colors">
                {item.title}
              </h4>
              <p className="text-[12px] text-slate-400 font-medium leading-relaxed">
                {item.desc}
              </p>

              <div className="mt-4 w-4 h-[2px] bg-slate-100 group-hover:w-8 group-hover:bg-[#991B1B] transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
