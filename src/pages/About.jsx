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
  Shield,
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
    <div className="min-h-screen bg-white font-sans text-slate-900 pb-20">
      <SEO title="About | My Printer Land" />

      {/* --- MINIMAL TECHNICAL HEADER --- */}
      <section className="bg-slate-50 py-24 md:py-32 border-b border-slate-100 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }}
        />

        <div className="max-w-[1600px] mx-auto px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <Zap size={14} className="text-[#F54900]" fill="currentColor" />
              <span className="text-[10px] font-black text-[#F54900] uppercase tracking-[0.5em]">About.Manifest</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-slate-900 leading-tight tracking-tighter">
              Redefining <span className="text-slate-300">Printing Standards.</span>
            </h1>
            <p className="mt-8 text-slate-500 text-lg md:text-xl font-medium leading-relaxed max-w-xl border-l border-slate-200 pl-6">
              Engineering the bridge between advanced hardware and seamless user experience for the modern professional workspace.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-[1600px] mx-auto px-8 py-20 space-y-32">

        {/* --- OUR MISSION --- */}
        <section className="flex flex-col lg:flex-row items-center gap-20">
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 shadow-sm"
            >
              <img
                src="/banner/printer-promo-3.jpg"
                alt="Our Vision"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=2070&auto=format&fit=crop'}
              />
            </motion.div>
          </div>

          <div className="w-full lg:w-1/2 space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#F54900]" />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em]">Mission_Statement</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight tracking-tight uppercase">
              Simplicity through <br />
              <span className="text-slate-300">Advanced Engineering.</span>
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed font-medium">
              Our mission is to eliminate the operational complexity of acquiring high-tier printing hardware. We provide a streamlined registry of systems designed for reliability and professional output.
            </p>
            <div className="pt-6">
              <Link
                to="/shop"
                className="inline-flex items-center gap-4 text-xs font-black uppercase tracking-[0.3em] text-slate-900 group"
              >
                Explore Entire Registry
                <div className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-all">
                  <ArrowRight size={18} />
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* --- CORE CAPABILITIES --- */}
        <section className="space-y-16">
          <div className="text-center max-w-xl mx-auto space-y-4">
            <span className="text-[10px] font-black text-[#F54900] uppercase tracking-[0.5em]">System_Integrity</span>
            <h2 className="text-3xl font-bold text-slate-900 uppercase tracking-tighter">Core Capabilities.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-100 border border-slate-100 rounded-xl overflow-hidden">
            {capabilities.map((item, i) => (
              <div key={i} className="bg-white p-12 group hover:bg-slate-50 transition-colors duration-500">
                <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-300 mb-8 group-hover:text-[#F54900] transition-colors">
                  <item.icon size={24} strokeWidth={1} />
                </div>
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-4">{item.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-bold uppercase tracking-wider">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* --- GUIDED SELECTION --- */}
        <section className="bg-slate-900 rounded-2xl p-12 md:p-20 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#F54900]/10 rounded-full blur-[100px] -mr-32 -mt-32" />

          <div className="relative z-10 space-y-20">
            <div className="max-w-xl">
              <span className="text-[#F54900] text-[10px] font-black uppercase tracking-[0.5em] mb-6 block">Strategic.Path</span>
              <h2 className="text-4xl font-light leading-tight tracking-tighter">
                System Setup <br /> <span className="text-white/40">Protocol.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              {selectionSteps.map((step, idx) => (
                <div key={idx} className="space-y-6 group">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl font-light text-white/20 group-hover:text-[#F54900] transition-colors">0{idx + 1}</span>
                    <div className="h-px flex-1 bg-white/5 group-hover:bg-[#F54900]/20 transition-all" />
                  </div>
                  <h4 className="text-sm font-black uppercase tracking-widest text-white/90">{step.title}</h4>
                  <p className="text-xs text-white/30 leading-relaxed font-bold uppercase tracking-wider">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- ADVANTAGE SECTION --- */}
        <section className="space-y-12">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-[#F54900]" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em]">Advantage.Log</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {advantages.map((item, i) => (
              <div key={i} className="flex items-center gap-4 group p-4 border border-slate-50 rounded-xl hover:bg-slate-50 transition-all">
                <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-white border border-slate-100 text-slate-300 group-hover:text-[#F54900] group-hover:border-[#F54900]/20 rounded-lg transition-all">
                  <item.icon size={18} strokeWidth={1.5} />
                </div>
                <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">{item.title}</h4>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
