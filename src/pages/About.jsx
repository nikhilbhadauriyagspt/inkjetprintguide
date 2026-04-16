import React from 'react';
import SEO from '@/components/SEO';
import {
  ShieldCheck,
  Zap,
  Globe,
  Printer,
  Package,
  Headphones,
  Leaf,
  Wrench,
  Target,
  Users,
  ArrowRight,
  Cpu,
  Settings
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function About() {
  const capabilities = [
    {
      icon: Printer,
      title: "Quality Products",
      desc: "A curated selection of modern printing systems, including all-in-one units tailored for efficiency."
    },
    {
      icon: Package,
      title: "Logistics Excellence",
      desc: "Reliable access to ink and essential replacement parts with efficient nationwide delivery."
    },
    {
      icon: Headphones,
      title: "Professional Support",
      desc: "Experts providing setup guidance, troubleshooting, and long-term maintenance for your printer."
    }
  ];

  const selectionGuide = [
    {
      title: "Needs Assessment",
      desc: "Analyze your monthly print volume to choose between Inkjet precision or Laser speed.",
      icon: Target
    },
    {
      title: "Technology Choice",
      desc: "Determine if you need color precision or monochrome speed for your specific workflows.",
      icon: Cpu
    },
    {
      title: "Integration Setup",
      desc: "Ensure seamless compatibility with wireless cloud protocols or secure wired connections.",
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
      <SEO title="About Us | My Printing Buddy" />

      {/* --- MINIMAL BREADCRUMBS --- */}
      <div className="bg-white border-b border-slate-50 py-4">
        <div className="max-w-[1400px] mx-auto px-6">
          <nav className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
            <Link to="/" className="hover:text-[#991B1B]">Home</Link>
            <span className="opacity-30">/</span>
            <span className="text-slate-600">About Us</span>
          </nav>
        </div>
      </div>

      {/* --- HERO SECTION WITH BLACK OVERLAY --- */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/banner/banner-6.jpg"
            alt="Background"
            className="w-full h-full object-cover"
          />
          {/* Half-Black Overlay for better text visibility without coloring the whole image */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        </div>

        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 mb-4"
            >
              <div className="w-8 h-[2px] bg-[#991B1B]" />
              <span className="text-white font-bold text-[10px] tracking-[0.3em] uppercase">Professional Services</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6 "
            >
              Excellence in <br />Printing Solutions.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-sm md:text-base text-white/80 font-medium leading-relaxed max-w-xl border-l border-[#991B1B] pl-4"
            >
              Bridging the gap between advanced hardware and seamless user experience for a more productive workspace.
            </motion.p>
          </div>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-6 py-16 md:py-24 space-y-24">

        {/* --- OUR FOUNDATION --- */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 text-[#991B1B] text-[11px] font-bold uppercase tracking-widest">
              Our Foundation
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
              Built on Precision and Reliability
            </h2>
            <p className="text-slate-500 leading-relaxed text-[15px] font-medium">
              Established to simplify the acquisition of high-performance printing infrastructure. We believe technology should be accessible, reliable, and straightforward for every professional environment.
            </p>
            <div className="pt-2">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-3.5 text-[11px] font-bold uppercase tracking-widest rounded-xl hover:bg-[#991B1B] transition-all shadow-lg shadow-slate-200/50"
              >
                View Catalog <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div className="bg-slate-50 p-8 md:p-12 rounded-3xl border border-slate-100">
            <p className="text-lg text-slate-800 leading-relaxed  mb-6 font-semibold">
              "Providing a destination where professionals can find top-tier printers without operational complexity."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-[1px] bg-[#991B1B]" />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">The Engineering Team</span>
            </div>
          </div>
        </section>

        {/* --- CORE CAPABILITIES --- */}
        <section className="space-y-10">
          <h2 className="text-2xl font-bold text-slate-900 uppercase ">Core Capabilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {capabilities.map((item, i) => (
              <div
                key={i}
                className="flex flex-col gap-4 p-8 border border-slate-100 rounded-2xl hover:border-[#991B1B]/20 transition-all bg-white group"
              >
                <div className="w-10 h-10 flex items-center justify-center bg-slate-50 text-slate-400 rounded-xl group-hover:bg-[#991B1B] group-hover:text-white transition-all">
                  <item.icon size={20} strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-slate-900 mb-2 uppercase ">{item.title}</h3>
                  <p className="text-[13px] text-slate-400 leading-relaxed font-medium">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- SELECTION GUIDE --- */}
        <section className="bg-slate-900 rounded-3xl p-8 md:p-16 text-white relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <span className="text-[#991B1B] font-bold text-[10px] uppercase tracking-[0.3em] mb-3 block">Selection Guide</span>
              <h2 className="text-3xl font-bold leading-tight  uppercase mb-4">
                System Setup.
              </h2>
              <p className="text-white/40 font-medium text-xs uppercase leading-relaxed">
                Guidance to help you deploy the most efficient hardware for your workspace.
              </p>
            </div>

            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
              {selectionGuide.map((item, idx) => (
                <div key={idx} className="space-y-2">
                  <h4 className="text-[14px] font-bold uppercase tracking-wide text-[#991B1B]">{item.title}</h4>
                  <p className="text-white/50 text-[13px] leading-relaxed font-medium">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- ADVANTAGE SECTION --- */}
        <section className="bg-slate-50 p-8 md:p-12 rounded-3xl">
          <div className="mb-10">
            <h2 className="text-xl font-bold text-slate-900 uppercase ">The Advantage</h2>
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mt-1">Why industry professionals choose us</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10">
            {advantages.map((item, i) => (
              <div key={i} className="flex items-center gap-4 group">
                <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-white text-slate-300 group-hover:text-[#991B1B] rounded-lg transition-all">
                  <item.icon size={18} strokeWidth={2} />
                </div>
                <h4 className="text-[12px] font-bold text-slate-600 uppercase ">{item.title}</h4>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
