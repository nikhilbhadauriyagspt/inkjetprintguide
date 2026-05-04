import React, { useState, useEffect, useCallback } from "react";
import { m, AnimatePresence } from 'framer-motion';
import ChevronLeft from 'lucide-react/dist/esm/icons/chevron-left';
import ChevronRight from 'lucide-react/dist/esm/icons/chevron-right';
import Award from 'lucide-react/dist/esm/icons/award';
import ShieldCheck from 'lucide-react/dist/esm/icons/shield-check';
import Globe from 'lucide-react/dist/esm/icons/globe';
import HeartHandshake from 'lucide-react/dist/esm/icons/heart-handshake';
import { Link } from "react-router-dom";

const slides = [
  {
    image: "/banner/new-banner/17.avif",
    title: "Premium Printing",
    description:
      "Reliable printing solutions designed for smooth performance, rich output, and everyday convenience.",
    primaryCta: "Shop Printers",
    secondaryCta: "Explore Collections",
  },
  {
    image: "/banner/new-banner/18.avif",
    title: "Smart Office Printing",
    description:
      "Modern printers built for homes, workspaces, and growing business environments.",
    primaryCta: "Discover Now",
    secondaryCta: "Browse Categories",
  },
];

const featureItems = [
  {
    icon: Award,
    title: "High Print Quality",
  },
  {
    icon: ShieldCheck,
    title: "Reliable Performance",
  },
  {
    icon: HeartHandshake,
    title: "Easy Care & Durable",
  },
  {
    icon: Globe,
    title: "Worldwide Shipping",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => clearInterval(timer);
  }, [isAutoPlaying, nextSlide]);

  const handleNext = () => {
    setIsAutoPlaying(false);
    nextSlide();
  };

  const handlePrev = () => {
    setIsAutoPlaying(false);
    prevSlide();
  };

  return (
    <section className="relative w-full font-sans bg-white overflow-hidden">
      <div className="relative h-[520px] sm:h-[580px] md:h-[650px] lg:h-[700px] xl:h-[720px]">
        {/* Background Slides */}
        <AnimatePresence mode="wait">
          <m.div
            key={current}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.01 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <img
              src={slides[current].image}
              alt={slides[current].title}
              className="w-full h-full object-cover object-center"
              fetchPriority={current === 0 ? "high" : "auto"}
              loading="eager"
            />
            <div className="absolute inset-0 bg-black/10" />
          </m.div>
        </AnimatePresence>

        {/* Left/Right Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-3 sm:left-5 md:left-7 top-1/2 -translate-y-1/2 z-30 w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/90 hover:bg-white text-slate-700 shadow-md flex items-center justify-center transition"
          aria-label="Previous slide"
        >
          <ChevronLeft size={22} />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-3 sm:right-5 md:right-7 top-1/2 -translate-y-1/2 z-30 w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/90 hover:bg-white text-slate-700 shadow-md flex items-center justify-center transition"
          aria-label="Next slide"
        >
          <ChevronRight size={22} />
        </button>

        {/* Content Box */}
        <div className="relative z-20 max-w-[1600px] mx-auto h-full px-4 sm:px-6 md:px-8 lg:px-10 flex items-center">
          <AnimatePresence mode="wait">
            <m.div
              key={`content-${current}`}
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="w-full max-w-[680px] bg-[#f5f4f4]/50 backdrop-blur-[8px] px-6 py-8 sm:px-10 sm:py-10 md:px-12 md:py-12 border border-white/20 shadow-sm"
            >
              <h1 className="text-[30px] sm:text-[42px] md:text-[52px] lg:text-[60px] leading-[1.1] font-bold text-black tracking-tight">
                {slides[current].title}
              </h1>

              <p className="mt-4 text-[15px] sm:text-[16px] md:text-[18px] text-slate-800 max-w-[520px] leading-relaxed font-medium">
                {slides[current].description}
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link
                  to="/shop"
                  className="inline-flex items-center justify-center sm:min-w-[200px] h-[52px] px-8 rounded-full bg-[#05718A] text-white text-[15px] font-bold uppercase tracking-wider hover:bg-[#045d72] transition shadow-lg shadow-blue-900/10"
                >
                  {slides[current].primaryCta}
                </Link>

                <Link
                  to="/shop"
                  className="inline-flex items-center justify-center sm:min-w-[200px] h-[52px] px-8 rounded-full border-2 border-[#05718A] text-[#05718A] text-[15px] font-bold uppercase tracking-wider hover:bg-[#05718A] hover:text-white transition"
                >
                  {slides[current].secondaryCta}
                </Link>
              </div>
            </m.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Feature Strip */}
      <div className="w-full bg-[#05718A]">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {featureItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className={`flex items-center gap-3 md:gap-4 px-4 md:px-8 py-5 md:py-6 text-white ${index !== featureItems.length - 1
                    ? "lg:border-r lg:border-white/20"
                    : ""
                    }`}
                >
                  <div className="shrink-0">
                    <Icon size={26} strokeWidth={1.9} />
                  </div>
                  <div>
                    <p className="text-[16px] md:text-[18px] font-semibold leading-tight">
                      {item.title}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
