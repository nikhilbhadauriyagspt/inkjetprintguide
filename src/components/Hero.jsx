import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [

  "/banner/new-banner/11.png",

  "/banner/new-banner/8.png",
  "/banner/new-banner/13.png",
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
      opacity: 0
    }),
    center: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    exit: (i) => ({
      y: i % 2 === 0 ? "100%" : "-100%",
      opacity: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  return (
    <div className="relative w-full h-[400px] md:h-[600px] lg:h-[800px] bg-black overflow-hidden group">

      {/* Background Blur for Depth */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={current}
            src={slides[current]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            className="w-full h-full object-cover blur-2xl scale-110"
            alt=""
          />
        </AnimatePresence>
      </div>

      <AnimatePresence initial={false}>
        <div key={current} className="absolute inset-0 z-10 flex">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`${current}-${i}`}
              custom={i}
              variants={sliceVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="relative h-full flex-1 overflow-hidden"
              style={{
                marginLeft: i > 0 ? '-1px' : 0
              }}
            >
              <motion.div
                className="absolute inset-0 h-full"
                style={{
                  width: '600.5%',
                  left: `-${i * 100}%`,
                  backgroundImage: `url(${slides[current]})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
            </motion.div>
          ))}
        </div>
      </AnimatePresence>

      {/* Modern Navigation Buttons */}
      <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-8 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={prevSlide}
          className="w-14 h-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-orange-600 hover:border-orange-600 transition-all shadow-xl"
        >
          <ChevronLeft size={30} />
        </button>
        <button
          onClick={() => { setIsAutoPlaying(false); nextSlide(); }}
          className="w-14 h-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-orange-600 hover:border-orange-600 transition-all shadow-xl"
        >
          <ChevronRight size={30} />
        </button>
      </div>

      {/* Minimalist Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 z-30">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => { setIsAutoPlaying(false); setCurrent(i); }}
            className="group relative h-1 flex items-center"
          >
            <div className={`h-full rounded-full transition-all duration-500 ${current === i ? 'w-12 bg-orange-600' : 'w-4 bg-white/30 group-hover:bg-white/50'}`} />
          </button>
        ))}
      </div>



    </div>
  );
}
