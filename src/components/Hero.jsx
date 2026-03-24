import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

// Main Banner Images (Left Side - 75%)
import banner1 from "@/assets/bannerr/banner-5.png";
import banner2 from "@/assets/bannerr/banner-7.png";
import banner3 from "@/assets/bannerr/banner-6.png";
const mainSlides = [banner3, banner2, banner1];

export default function Hero() {
  const [mainIndex, setMainIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Auto-play for main slider
  useEffect(() => {
    const mainTimer = setInterval(() => {
      moveSlide(1);
    }, 5000);
    return () => clearInterval(mainTimer);
  }, [mainIndex]);

  const moveSlide = (newDirection) => {
    setDirection(newDirection);
    setMainIndex((prev) => (prev + newDirection + mainSlides.length) % mainSlides.length);
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      zIndex: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      zIndex: 0,
    }),
  };

  return (
    <div className="w-full bg-white px-4 md:px-0 py-0 font-['Rubik'] overflow-hidden">
      <div className="max-w-full mx-auto flex flex-col md:flex-row gap-6 h-[250px] md:h-[400px] lg:h-[700px] relative">

        {/* LEFT SLIDER (Full Width as per user's previous manual change) */}
        <div className="w-full h-full relative overflow-visible">
          <div className="w-full h-full relative overflow-hidden">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={mainIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
                className="absolute inset-0 w-full h-full"
              >
                {/* Wrapped image in a Link to make it clickable */}
                <Link to="/shop" className="block w-full h-full cursor-pointer">
                  <img
                    src={mainSlides[mainIndex]}
                    alt=""
                    className="w-full h-full object-cover select-none"
                  />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
}
