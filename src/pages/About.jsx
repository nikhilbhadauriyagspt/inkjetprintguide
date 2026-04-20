import React from 'react';
import SEO from '@/components/SEO';
import {
  ShieldCheck,
  Zap,
  Printer,
  Package,
  Headphones,
  Target,
  ArrowRight,
  Cpu,
  Settings,
  Layers,
  Activity,
  Globe,
  Leaf,
  Wrench
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function About() {
  const capabilities = [
    {
      icon: Printer,
      title: "Engineered Precision",
      desc: "Curated selection of high-performance printing systems tailored for maximum operational efficiency."
    },
    {
      icon: Layers,
      title: "Supply Chain Mastery",
      desc: "Strategic logistics providing instant access to ink, toner, and critical infrastructure components."
    },
    {
      icon: Activity,
      title: "System Integrity",
      desc: "Expert technical guidance focused on the long-term maintenance and peak performance of your fleet."
    }
  ];

  const selectionSteps = [
    {
      title: "Workflow Audit",
      desc: "Precision analysis of your monthly output volume to determine the optimal engine architecture.",
      icon: Target
    },
    {
      title: "Tech Deployment",
      desc: "Strategic selection between high-fidelity inkjet or high-velocity laser configurations.",
      icon: Cpu
    },
    {
      title: "Full Integration",
      desc: "Seamless synchronization with wireless cloud protocols and enterprise security standards.",
      icon: Settings
    }
  ];

  const advantages = [
    { title: "Tested Quality", icon: ShieldCheck },
    { title: "Reliable Parts", icon: Package },
    { title: "Rapid Service", icon: Zap },
    { title: "Secure Logistics", icon: Globe },
    { title: "New Printer", icon: ShieldCheck },
    { title: "Expert Care", icon: Headphones },
    { title: "Eco-Tech", icon: Leaf },
    { title: "Service Hub", icon: Wrench }
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-900 pb-20">
      <SEO title="About | Print Mora" />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-[#f8fafc] py-24 md:py-32 lg:py-36">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(15,23,42,0.18) 1px, transparent 0)',
            backgroundSize: '36px 36px'
          }}
        />

        <div className="absolute inset-x-0 top-0 h-[420px] bg-gradient-to-b from-[#2f5cab]/[0.06] to-transparent pointer-events-none" />

        <div className="max-w-[1800px] mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-[#2f5cab]/15 bg-white/80 backdrop-blur-sm px-4 py-2 mb-7 shadow-sm">
              <Zap size={14} className="text-[#2f5cab]" fill="currentColor" />
              <span className="text-[11px] font-semibold text-[#2f5cab] uppercase tracking-[0.32em]">
                About Manifest
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold text-slate-900 leading-[0.95] tracking-tight">
              Redefining <span className="text-slate-300">Printing Standards.</span>
            </h1>

            <p className="mt-8 max-w-2xl text-slate-600 text-base md:text-xl leading-8 border-l-2 border-[#2f5cab]/20 pl-6">
              Engineering the bridge between advanced hardware and seamless user experience for the modern professional workspace.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-[1800px] mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-20 space-y-24 md:space-y-28">
        {/* Mission */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-20 items-center">
          <div className="w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 18 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              viewport={{ once: true }}
              className="aspect-[4/3] rounded-[28px] overflow-hidden bg-white border border-slate-200 shadow-[0_15px_50px_rgba(15,23,42,0.06)]"
            >
              <img
                src="/banner/printer-promo-3.jpg"
                alt="Our Vision"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                onError={(e) => {
                  e.target.src =
                    'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=2070&auto=format&fit=crop';
                }}
              />
            </motion.div>
          </div>

          <div className="w-full space-y-7">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#2f5cab]" />
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-[0.32em]">
                Mission Statement
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-slate-900 leading-tight tracking-tight">
              Simplicity through <br />
              <span className="text-slate-300">Advanced Engineering.</span>
            </h2>

            <p className="text-slate-600 text-base md:text-lg leading-8 max-w-xl">
              Our mission is to eliminate the operational complexity of acquiring high-tier printing hardware. We provide a streamlined registry of systems designed for reliability and professional output.
            </p>

            <div className="pt-2">
              <Link
                to="/shop"
                className="inline-flex items-center gap-4 text-[12px] font-semibold uppercase tracking-[0.22em] text-slate-900 group"
              >
                Explore Entire Registry
                <div className="w-11 h-11 rounded-full border border-slate-200 bg-white flex items-center justify-center group-hover:bg-[#2f5cab] group-hover:border-[#2f5cab] group-hover:text-white transition-all shadow-sm">
                  <ArrowRight size={18} />
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Core Capabilities */}
        <section className="space-y-12 md:space-y-14">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-[11px] font-semibold text-[#2f5cab] uppercase tracking-[0.32em]">
              System Integrity
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 tracking-tight">
              Core Capabilities.
            </h2>
            <p className="text-slate-500 text-sm md:text-base leading-7">
              Built around operational reliability, supply consistency, and long-term performance support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7">
            {capabilities.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.45 }}
                viewport={{ once: true }}
                className="rounded-[24px] border border-slate-200 bg-white p-8 md:p-10 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#2f5cab]/10 flex items-center justify-center text-[#2f5cab] mb-7">
                  <item.icon size={24} strokeWidth={1.8} />
                </div>

                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-600 leading-7">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Guided Selection */}
        <section className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-slate-900 p-8 md:p-12 lg:p-16 text-white shadow-[0_18px_55px_rgba(15,23,42,0.14)]">
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#2f5cab]/20 rounded-full blur-[110px] -mr-32 -mt-24 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/[0.04] rounded-full blur-[120px] -ml-24 -mb-24 pointer-events-none" />

          <div className="relative z-10 space-y-12 md:space-y-16">
            <div className="max-w-2xl">
              <span className="text-[#7ea4ea] text-[11px] font-semibold uppercase tracking-[0.32em] block mb-5">
                Strategic Path
              </span>
              <h2 className="text-3xl md:text-5xl font-semibold leading-tight tracking-tight">
                System Setup <br />
                <span className="text-white/35">Protocol.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
              {selectionSteps.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08, duration: 0.45 }}
                  viewport={{ once: true }}
                  className="rounded-[24px] border border-white/10 bg-white/[0.04] backdrop-blur-sm p-6 md:p-7"
                >
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-semibold text-white/20">
                      0{idx + 1}
                    </span>
                    <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center text-[#7ea4ea]">
                      <step.icon size={20} strokeWidth={1.8} />
                    </div>
                  </div>

                  <h4 className="text-lg font-semibold text-white mb-3">
                    {step.title}
                  </h4>

                  <p className="text-sm text-white/65 leading-7">
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Advantages */}
        <section className="space-y-10 md:space-y-12">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#2f5cab]" />
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-[0.32em]">
              Advantage Log
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {advantages.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04, duration: 0.35 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 rounded-[20px] border border-slate-200 bg-white px-4 py-4 md:px-5 md:py-5 hover:shadow-sm transition-all"
              >
                <div className="w-10 h-10 flex-shrink-0 rounded-xl bg-[#2f5cab]/10 text-[#2f5cab] flex items-center justify-center">
                  <item.icon size={18} strokeWidth={1.8} />
                </div>
                <h4 className="text-[13px] font-semibold text-slate-700 leading-5">
                  {item.title}
                </h4>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}