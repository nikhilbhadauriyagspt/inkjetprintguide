import React from 'react';
import SEO from '@/components/SEO';
import {
  ShieldCheck,
  Zap,
  Globe,
  Printer,
  Package,
  ChevronRight,
  CheckCircle2,
  ArrowRight,
  Headphones,
  Leaf,
  Wrench,
  Target,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  const capabilities = [
    {
      icon: Printer,
      title: "Quality Products",
      desc: "A curated selection of modern printing systems, including all-in-one and high-volume industrial units tailored for efficiency."
    },
    {
      icon: Package,
      title: "Logistics Excellence",
      desc: "Reliable access to ink, toner, and essential replacement parts with efficient nationwide delivery across the country."
    },
    {
      icon: Headphones,
      title: "Professional Support",
      desc: "Experts providing seamless setup guidance, troubleshooting, and long-term maintenance for your printer."
    }
  ];

  const advantages = [
    { title: "Tested Quality", icon: ShieldCheck },
    { title: "Reliable Parts", icon: Package },
    { title: "Rapid Service", icon: Zap },
    { title: "Secure Logistics", icon: Globe },
    { title: "New Printer", icon: CheckCircle2 },
    { title: "Expert Care", icon: Headphones },
    { title: "Eco-Tech", icon: Leaf },
    { title: "Service Hub", icon: Wrench }
  ];

  return (
    <div className="min-h-screen bg-[#eaeded] font-['Rubik'] text-[#0f1111]">
      <SEO
        title="About Us"
        description="Learn about our commitment to printing excellence, our journey, and the core values that drive our professional services."
      />

      {/* --- BREADCRUMBS --- */}
      <div className="bg-white border-b border-gray-300 py-3 shadow-sm">
        <div className="max-w-[1500px] mx-auto px-4 md:px-8">
          <nav className="flex items-center gap-1 text-[12px] text-[#565959]">
            <Link to="/" className="hover:underline hover:text-[#c45500]">Home</Link>
            <ChevronRight size={12} className="mx-1" />
            <span className="text-[#0f1111] font-bold">About Our Journey</span>
          </nav>
        </div>
      </div>

      {/* --- HERO SECTION --- */}
      <div className="bg-[#232f3e] text-white py-16 md:py-24">
        <div className="max-w-[1500px] mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold tracking-normal mb-4">
              Providing Excellence in Printing Solutions.
            </h1>
            <p className="text-lg md:text-xl text-gray-300 font-normal leading-relaxed">
              We bridge the gap between advanced technology and a seamless user experience, ensuring your workspace stays productive and efficient.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-[1500px] mx-auto px-4 md:px-8 py-8 md:py-12 space-y-8">
        
        {/* --- OUR FOUNDATION --- */}
        <div className="bg-white p-6 md:p-10 border border-gray-300 rounded-md shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-[#0f1111]">
                Built on Precision and Reliability
              </h2>
              <p className="text-[#565959] leading-relaxed text-base">
                Established in 2026, Dashing Printers was founded to simplify the acquisition of high-performance printing infrastructure. We believe that technology should be accessible, reliable, and straightforward. Our commitment extends beyond merely selling products; we focus on empowering professionals and businesses to achieve their operational goals without the friction of unreliable technology.
              </p>
              <div className="pt-4">
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 bg-[#ffd814] border border-[#fcd200] hover:bg-[#f7ca00] text-[#0f1111] px-6 py-2.5 text-[14px] font-normal rounded-md shadow-sm transition-colors"
                >
                  Explore Collection
                </Link>
              </div>
            </div>
            
            <div className="bg-[#f7f8f8] p-6 border border-gray-200 rounded-md flex flex-col justify-center">
              <div className="text-4xl text-gray-300 font-serif mb-2">"</div>
              <p className="text-lg text-[#0f1111] leading-relaxed italic mb-4">
                Our goal is to provide a destination where professionals can find top-tier printers without complexity.
              </p>
              <span className="text-[13px] font-bold text-[#565959] uppercase">Dashing Printers Team</span>
            </div>
          </div>
        </div>

        {/* --- CORE CAPABILITIES --- */}
        <div className="bg-white p-6 md:p-10 border border-gray-300 rounded-md shadow-sm">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#0f1111]">Core Capabilities</h2>
            <p className="text-[#565959] text-sm mt-1">The pillars of our service excellence</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {capabilities.map((item, i) => (
              <div
                key={i}
                className="flex flex-col gap-4 p-6 border border-gray-200 rounded-md hover:shadow-md transition-shadow bg-white"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-[#f0f2f2] text-[#232f3e] rounded-full">
                  <item.icon size={24} />
                </div>
                <div>
                  <h3 className="text-[16px] font-bold text-[#0f1111] mb-2">{item.title}</h3>
                  <p className="text-[14px] text-[#565959] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- MISSION + REACH --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 md:p-8 border border-gray-300 rounded-md shadow-sm flex flex-col justify-center relative overflow-hidden">
             <div className="absolute right-[-20px] bottom-[-20px] text-gray-100">
               <Target size={180} strokeWidth={1} />
             </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4 text-[#c45500]">
                <Target size={20} />
                <span className="text-[14px] font-bold uppercase tracking-wider">Our Mission</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[#0f1111]">Empowering Modern Workspaces</h3>
              <p className="text-[#565959] leading-relaxed">
                To equip professionals with dependable and sustainable printer solutions. We provide expert advice and high-quality products to ensure your operations never slow down.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 md:p-8 border border-gray-300 rounded-md shadow-sm flex flex-col justify-center relative overflow-hidden">
             <div className="absolute right-[-20px] bottom-[-20px] text-gray-100">
               <Users size={180} strokeWidth={1} />
             </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4 text-[#007185]">
                <Users size={20} />
                <span className="text-[14px] font-bold uppercase tracking-wider">Our Reach</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[#0f1111]">Nationwide Support Network</h3>
              <p className="text-[#565959] leading-relaxed">
                Serving the entire United States with a commitment to fast logistics and long-term service value. Our team is always available to assist with your needs.
              </p>
            </div>
          </div>
        </div>

        {/* --- ADVANTAGE SECTION --- */}
        <div className="bg-white p-6 md:p-10 border border-gray-300 rounded-md shadow-sm mb-12">
          <div className="mb-6 border-b border-gray-200 pb-4">
            <h2 className="text-2xl font-bold text-[#0f1111]">The Dashing Printers Advantage</h2>
            <p className="text-[#565959] text-sm mt-1">Why professionals choose us</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4">
            {advantages.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-[#f0f2f2] text-[#232f3e] rounded-full">
                  <item.icon size={18} />
                </div>
                <h4 className="text-[14px] font-bold text-[#0f1111]">{item.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
