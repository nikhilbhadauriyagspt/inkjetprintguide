import React, { useState, useEffect, useCallback } from "react";
import { m, AnimatePresence } from "framer-motion";
import ChevronLeft from "lucide-react/dist/esm/icons/chevron-left";
import ChevronRight from "lucide-react/dist/esm/icons/chevron-right";

const slides = [
  {
    image: "/banner/banner_02.webp",
    title: "Printer Banner 1",
  },
  {
    image: "/banner/banner_01.webp ",
    title: "Printer Banner 2",
  },
  {
    image: "/banner/banner_03.webp",
    title: "Printer Banner 3",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0); // 1 for next, -1 for prev
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

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

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0
    })
  };

  return (
    <section className="relative w-full overflow-hidden bg-transparent px-4 py-4 pt-0 md:px-8">
      <div className="relative mx-auto h-[360px] max-w-[1700px] overflow-visible bg-white sm:h-[430px] md:h-[500px]  2xl:h-[700px] rounded-[10px]">
        {/* Container for sliding images to keep them within the rounded box */}
        <div className="absolute inset-0 overflow-hidden rounded-[10px]">
          <AnimatePresence initial={false} custom={direction}>
            <m.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 200, damping: 30, mass: 1 },
                opacity: { duration: 0.4 }
              }}
              className="absolute inset-0"
            >
              <img
                src={slides[current].image}
                alt={slides[current].title}
                className="h-full w-full object-cover object-center"
                fetchPriority={current === 0 ? "high" : "auto"}
                loading={current === 0 ? "eager" : "lazy"}
              />
            </m.div>
          </AnimatePresence>
        </div>

        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          aria-label="Previous slide"
          className="absolute left-0 top-1/2 z-30 flex h-[52px] w-[34px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-r-full bg-[#eef1f5] text-[#111827]  cursor-pointer "
        >
          <ChevronLeft size={25} />
        </button>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          aria-label="Next slide"
          className="absolute right-0 top-1/2 z-30 flex h-[52px] w-[34px] translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-l-full bg-[#eef1f5] text-[#111827] cursor-pointer "
        >
          <ChevronRight size={25} />
        </button>

        {/* Bottom Dots */}
        <div className="absolute bottom-0 left-1/2 z-40 flex -translate-x-1/2 translate-y-1/2 items-center gap-2 rounded-t-[18px] bg-[#eef1f5] px-5 py-2 ">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                const newDirection = index > current ? 1 : -1;
                setDirection(newDirection);
                setCurrent(index);
                setIsAutoPlaying(false);
              }}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-[13px] rounded-full border transition-all duration-300 ${current === index
                ? "w-[28px] border-[#4254e8] bg-[#4254e8]"
                : "w-[13px] border-[#64748b] bg-white"
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}