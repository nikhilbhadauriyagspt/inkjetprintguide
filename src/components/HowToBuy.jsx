import React from 'react';
import { Search, ShoppingCart, CreditCard, PackageCheck, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HowToBuy() {
  const steps = [
    {
      icon: Search,
      title: "Select Hardware",
      desc: "Browse our specialized catalog and select the hardware that fits your workflow."
    },
    {
      icon: ShoppingCart,
      title: "Add to Cart",
      desc: "Configure quantities and add your selected items to your professional procurement list."
    },
    {
      icon: CreditCard,
      title: "Secure Checkout",
      desc: "Proceed through our encrypted payment gateway for a safe and swift transaction."
    },
    {
      icon: PackageCheck,
      title: "Global Delivery",
      desc: "Track your shipment in real-time as it moves from our warehouse to your doorstep."
    }
  ];

  return (
    <section className="bg-[#fcfcfc] py-20 md:py-28 border-y border-slate-50">
      <div className="max-w-[1600px] mx-auto px-6">
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-[2px] bg-[#2f5cab]"></div>
            <span className="text-[11px] font-bold text-[#2f5cab] uppercase tracking-[0.4em]">Seamless Process</span>
            <div className="w-8 h-[2px] bg-[#2f5cab]"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold text-slate-900 leading-tight">
            How to procure your <span className="text-[#2f5cab]">equipment.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-12 left-0 w-full h-[1px] bg-slate-200 z-0" />

          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              <div className="w-24 h-24 rounded-full bg-white border border-slate-100 shadow-sm flex items-center justify-center mb-8 group-hover:border-[#2f5cab] group-hover:shadow-lg group-hover:shadow-[#2f5cab]/5 transition-all duration-500">
                <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-[#2f5cab] group-hover:text-white transition-all duration-500">
                  <step.icon size={28} strokeWidth={1.5} />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#ffd33d] text-black text-xs font-black flex items-center justify-center shadow-sm">
                  0{i + 1}
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
              <p className="text-slate-500 text-[14px] leading-relaxed max-w-[240px]">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
