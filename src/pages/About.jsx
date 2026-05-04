import React from 'react';
import SEO from '@/components/SEO';
import ShieldCheck from 'lucide-react/dist/esm/icons/shield-check';
import Zap from 'lucide-react/dist/esm/icons/zap';
import Printer from 'lucide-react/dist/esm/icons/printer';
import MousePointer2 from 'lucide-react/dist/esm/icons/mouse-pointer-2';
import Target from 'lucide-react/dist/esm/icons/target';
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right';
import CheckCircle2 from 'lucide-react/dist/esm/icons/check-circle-2';
import Package from 'lucide-react/dist/esm/icons/package';
import Truck from 'lucide-react/dist/esm/icons/truck';
import Globe from 'lucide-react/dist/esm/icons/globe';
import Heart from 'lucide-react/dist/esm/icons/heart';
import Droplets from 'lucide-react/dist/esm/icons/droplets';
import Layers from 'lucide-react/dist/esm/icons/layers';
import Search from 'lucide-react/dist/esm/icons/search';
import CreditCard from 'lucide-react/dist/esm/icons/credit-card';
import { Link } from 'react-router-dom';
import { m } from 'framer-motion';

export default function About() {
  const categories = [
    {
      title: "Performance Printers",
      desc: "From compact home office setups to high-output enterprise machines, we select hardware built for durability and precision.",
      icon: <Printer size={24} className="text-[#05718A]" />
    },
    {
      title: "Genuine Consumables",
      desc: "We provide authentic ink and toner cartridges that ensure your hardware maintains its longevity and output quality.",
      icon: <Droplets size={24} className="text-[#05718A]" />
    },
    {
      title: "Essential Accessories",
      desc: "Everything from specialized paper to connection cables—curated to complete your professional printing ecosystem.",
      icon: <Layers size={24} className="text-[#05718A]" />
    }
  ];

  const steps = [
    {
      icon: <Search size={22} />,
      title: "Browse Catalog",
      text: "Find the tech you need."
    },
    {
      icon: <CreditCard size={22} />,
      title: "Secure Order",
      text: "Encrypted transactions."
    },
    {
      icon: <Package size={22} />,
      title: "Fast Prep",
      text: "Careful packaging."
    },
    {
      icon: <Truck size={22} />,
      title: "Global Track",
      text: "Real-time updates."
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <SEO title="About Inklivo | A New Vision for Printing" />

      {/* Hero Section with BG Image */}
      <section className="relative h-[50vh] md:h-[50vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/banner/banner-5.avif"
            alt="About Inklivo"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]" />
        </div>

        <div className="max-w-[1600px] mx-auto px-4 md:px-8 relative z-10 w-full text-center">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <span className="inline-block text-[#05718A] bg-white px-4 py-1.5 text-[10px] font-blac capitalizek tracking-[0.4em] mb-4">
              Our Identity
            </span>
            <h1 className="text-4xl md:text-7xl font-bold text-white  leading-none">
              About <span className="text-[#05718A]">Us.</span>
            </h1>
            <p className="text-slate-200 text-lg md:text-xl max-w-2xl mx-auto  font-medium">
              A fresh perspective on professional printing hardware distribution.
            </p>
          </m.div>
        </div>
      </section>

      {/* What We Provide Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold ">What We Provide</h2>
              <div className="w-12 h-1 bg-[#05718A]"></div>
            </div>
            <p className="text-slate-500 max-w-md  font-medium">
              We don't just sell boxes; we provide the tools that drive your productivity and creativity every single day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((item, i) => (
              <div key={i} className="group p-8 border border-slate-100 hover:border-[#05718A] transition-all duration-500">
                <div className="mb-6 w-12 h-12 bg-slate-50 flex items-center justify-center group-hover:bg-[#05718A] group-hover:text-white transition-colors duration-500">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 ">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed ">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work (Streamlined Process) */}
      <section className="py-20 bg-slate-50 border-t border-b border-slate-100">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold capitalize   mb-4">Our Simple Workflow</h2>
          <p className="text-slate-500">Direct. Transparent. Reliable.</p>
        </div>

        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {steps.map((step, i) => (
              <div key={i} className="bg-white p-6 md:p-10 border border-slate-200 text-center relative group">
                <div className="absolute top-4 right-4 text-xs font-black text-slate-100 group-hover:text-[#05718A]/10 transition-colors">0{i + 1}</div>
                <div className="inline-flex w-12 h-12 items-center justify-center text-[#05718A] mb-4">
                  {step.icon}
                </div>
                <h4 className="font-bold text-sm md:text-base mb-1 capitalize ">{step.title}</h4>
                <p className="text-slate-400 text-[11px] md:text-xs font-medium ">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Human Connection Note */}
      <section className="py-24 bg-white">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 ">
                A New Team, One Goal.
              </h2>
              <div className="space-y-6 text-slate-600 text-base md:text-lg leading-relaxed ">
                <p>
                  Inklivo started with a simple observation: finding the right printing hardware should be straightforward, not complicated. We are a new team with a fresh perspective on how professional tools should be delivered.
                </p>
                <p>
                  Every order matters to us. We are building this company one customer at a time, focusing on making sure you have exactly what you need to be productive.
                </p>
              </div>
              <div className="pt-4">
                <Link to="/contact" className="inline-flex items-center gap-3 text-[#05718A] font-bol capitalized text-xs tracking-widest hover:gap-5 transition-all">
                  Get in touch <ArrowRight size={14} />
                </Link>
              </div>
            </div>
            <div className="relative p-2 bg-white border border-slate-200">
              <img src="/banner/new-banner/8.avif" alt="Our Focus" className="w-full h-auto " />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-28 bg-slate-900 text-white overflow-hidden relative">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 relative z-10 text-center space-y-8">
          <h2 className="text-3xl md:text-5xl font-bold ">Ready to upgrade your workflow?</h2>
          <div className="pt-4">
            <Link to="/shop" className="inline-flex items-center gap-4 bg-[#05718A] text-white px-10 py-5 font-bol capitalized text-[11px] tracking-[0.3em] hover:bg-white hover:text-black transition-all">
              Explore Our Catalog <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
