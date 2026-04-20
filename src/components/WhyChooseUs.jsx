import React from 'react';
import { Award, Zap, Headphones, BarChart3, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WhyChooseUs() {
  const benefits = [
    {
      icon: Award,
      title: "Certified Hardware",
      desc: "Every product in our inventory undergoes rigorous quality verification to ensure peak performance."
    },
    {
      icon: Zap,
      title: "Rapid Integration",
      desc: "Our systems are designed for immediate deployment into your existing professional network."
    },
    {
      icon: Headphones,
      title: "Technical Support",
      desc: "Access our dedicated team of hardware specialists for architecting your ideal printing environment."
    },
    {
      icon: BarChart3,
      title: "Cost Optimization",
      desc: "We analyze your volume to provide hardware that offers the lowest total cost of ownership."
    }
  ];

  return (
    <section className="bg-white py-20 md:py-28 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Left Side: Text Content */}
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-[2px] bg-[#2f5cab]"></div>
                <span className="text-[11px] font-bold text-[#2f5cab] uppercase tracking-[0.3em]">Corporate Advantage</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-semibold text-slate-900 leading-[1.1] mb-8">
                Why professionals <span className="text-[#2f5cab]">trust</span> Print Mora.
              </h2>
              <p className="text-slate-500 text-lg leading-relaxed mb-10 max-w-xl">
                We specialize in high-velocity printing engines and specialized hardware optimized for heavy-duty office productivity and professional-grade output.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-10 gap-x-12 mt-12">
                {benefits.map((item, i) => (
                  <div key={i} className="flex flex-col gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 text-[#2f5cab] flex items-center justify-center border border-slate-100">
                      <item.icon size={24} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="text-[17px] font-bold text-slate-800 mb-2">{item.title}</h4>
                      <p className="text-slate-500 text-[13.5px] leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Side: Professional Image/Visual */}
          <div className="lg:w-1/2 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative rounded-3xl overflow-hidden shadow-2xl shadow-slate-200"
            >
              <img 
                src="/midbanner/images-2.png" 
                alt="Professional Workspace" 
                className="w-full h-full object-cover min-h-[500px]"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#2f5cab]/40 to-transparent" />
              
              {/* Floating Stat Badge */}
              <div className="absolute bottom-10 left-10 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 max-w-[220px]">
                <div className="text-3xl font-black text-[#2f5cab] mb-1">10k+</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-tight">
                  Deployments completed across professional hubs.
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
