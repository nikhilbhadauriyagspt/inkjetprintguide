import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [

  "/banner/new-banner/9.png",
  "/banner/new-banner/8.png",
  "/banner/new-banner/11.png",
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Auto-play logic
  useEffect(() => {
    if (!isAutoPlaying) {
      const timer = setTimeout(() => setIsAutoPlaying(true), 10000);
      return () => clearTimeout(timer);
    }
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const sliceVariants = {
    enter: (i) => ({
      y: i % 2 === 0 ? "-100%" : "100%",
    }),
    center: {
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    exit: (i) => ({
      y: i % 2 === 0 ? "100%" : "-100%",
      transition: {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  return (
    <div className="relative w-full h-[450px] md:h-[650px] lg:h-[800px] bg-black overflow-hidden group">

      {/* Unique Background Blur (Adds Depth) */}
      <div className="absolute inset-0 z-0">
        <img src={slides[current]} className="w-full h-full object-cover opacity-30 blur-2xl scale-110" alt="" />
      </div>

      <AnimatePresence initial={false}>
        <div key={current} className="absolute inset-0 z-10 flex">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`${current}-${i}`}
              custom={i}
              variants={sliceVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="relative h-full flex-1 overflow-hidden"
              style={{
                // Seamless fix: remove borders and add tiny overlap
                marginLeft: i > 0 ? '-1px' : 0,
                boxShadow: "none"
              }}
            >
              <motion.div
                className="absolute inset-0 h-full"
                style={{
                  width: '300.5%', // Slightly larger to cover gaps
                  left: `-${i * 100}%`,
                  backgroundImage: `url(${slides[current]})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
                animate={{ scale: [1.05, 1] }}
                transition={{ duration: 2 }}
              />
            </motion.div>
          ))}
        </div>
      </AnimatePresence>

      {/* Technical Frame Overlay */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="absolute top-8 left-8 w-12 h-12 border-t border-l border-white/20"></div>
        <div className="absolute top-8 right-8 w-12 h-12 border-t border-r border-white/20"></div>
        <div className="absolute bottom-8 left-8 w-12 h-12 border-b border-l border-white/20"></div>
        <div className="absolute bottom-8 right-8 w-12 h-12 border-b border-r border-white/20"></div>

        {/* Subtle Scanning Lines */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'repeating-linear-gradient(0deg, #fff, #fff 1px, transparent 1px, transparent 2px)', backgroundSize: '100% 4px' }}>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-6 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <button
          onClick={prevSlide}
          className="w-14 h-14 bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-[#991B1B] transition-all rounded-full"
        >
          <ChevronLeft size={28} />
        </button>
        <button
          onClick={() => { setIsAutoPlaying(false); nextSlide(); }}
          className="w-14 h-14 bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-[#991B1B] transition-all rounded-full"
        >
          <ChevronRight size={28} />
        </button>
      </div>

      {/* Modern Index Dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 z-30">
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => { setIsAutoPlaying(false); setCurrent(i); }}
              className={`h-1 rounded-full transition-all duration-500 ${current === i ? 'w-12 bg-[#991B1B]' : 'w-3 bg-white/20'}`}
            />
          ))}
        </div>
      </div>

      {/* Bottom Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-white/5 z-30">
        <motion.div
          key={current}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 5, ease: "linear" }}
          className="h-full bg-[#991B1B] origin-left shadow-[0_0_10px_rgba(153,27,27,0.8)]"
        />
      </div>

    </div>
  );
}
