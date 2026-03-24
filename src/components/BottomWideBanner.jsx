import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Import images
import bannerSide from "@/assets/bannerr/bootombaner-side.png";
import banner1 from "@/assets/bannerr/banner-1.png";
import banner2 from "@/assets/bannerr/banner-2.png";
import banner3 from "@/assets/bannerr/banner-3.png";

const slides = [banner1, banner2, banner3];

export default function BottomWideBanner() {
    const [index, setIndex] = useState(0);

    // Auto-play for the slider
    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="w-full pt-4 pb-12 bg-[#F1F3F6] font-['Rubik']">
            <div className="max-w-[1800px] mx-auto px-4 md:px-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-0 h-auto ">

                    {/* Left Side - Static Image (3/12 width) */}
                    <div className="md:col-span-3 h-[300px] md:h-full relative overflow-hidden ">
                        <Link to="/shop" className="block w-full h-full">
                            <img
                                src={bannerSide}
                                alt="Exclusive Offer"
                                className="w-full h-full object-contain "
                            />
                        </Link>
                    </div>

                    {/* Right Side - Slider (9/12 width) */}
                    <div className="md:col-span-9 h-[200px] md:h-full relative ">
                        <AnimatePresence initial={false} mode="wait">
                            <motion.div
                                key={index}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.8, ease: "easeInOut" }}
                                className="absolute inset-0 w-full h-full"
                            >
                                <Link to="/shop" className="block w-full h-full">
                                    <img
                                        src={slides[index]}
                                        alt={`Slide ${index + 1}`}
                                        className="w-full h-full object-contain"
                                    />
                                </Link>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                </div>
            </div>
        </section>
    );
}
