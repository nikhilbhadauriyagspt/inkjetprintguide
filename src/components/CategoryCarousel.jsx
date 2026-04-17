import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import API_BASE_URL from "../config";

export default function CategoryCarousel() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/categories`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'success') {
          const printerParent = data.data.find(cat => cat.slug === 'printers' || cat.id === 46);
          const items = printerParent && printerParent.children 
            ? printerParent.children 
            : data.data.filter(c => !c.name.toLowerCase().includes('laptop'));
          
          // Triple the items for a longer scroll before reset
          setCategories([...items, ...items, ...items]); 
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // SMOOTH AUTO SCROLL LOGIC
  useEffect(() => {
    if (categories.length === 0) return;

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        const maxScroll = scrollWidth - clientWidth;

        // Reset to start when nearing end for infinite feel
        if (scrollLeft >= maxScroll - 1) {
          scrollRef.current.scrollTo({ left: 1, behavior: "auto" });
        } else {
          scrollRef.current.scrollBy({ left: 1, behavior: "auto" });
        }
      }
    }, 25); 

    return () => clearInterval(interval);
  }, [categories]);

  if (loading || categories.length === 0) return null;

  return (
    <section className="w-full bg-white py-12 md:py-16 overflow-hidden border-b border-slate-50">
      <div className="max-w-[1800px] mx-auto relative px-4">
        
        {/* Carousel Container */}
        <div 
          ref={scrollRef}
          className="flex gap-12 md:gap-20 overflow-x-auto no-scrollbar whitespace-nowrap py-6 items-center"
        >
          {categories.map((cat, index) => (
            <motion.div
              key={`${cat.id}-${index}`}
              className="flex flex-col items-center group cursor-pointer shrink-0"
            >
              <Link 
                to={`/shop?category=${cat.slug}`}
                className="flex flex-col items-center"
              >
                {/* Perfect Circle with Dashed Border */}
                <div className="relative w-28 h-28 md:w-36 md:h-36 lg:w-44 lg:h-44 flex items-center justify-center mb-5">
                  
                  {/* Rotating Dashed Border */}
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-slate-200 group-hover:border-orange-500 group-hover:rotate-90 transition-all duration-[2000ms] ease-linear" />
                  
                  {/* Inner Icon Circle */}
                  <div className="w-[82%] h-[82%] rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-white group-hover:shadow-2xl group-hover:shadow-orange-100 transition-all duration-500 overflow-hidden border border-slate-100/50">
                    <img
                      src={`/category/${cat.slug}.png`}
                      alt={cat.name}
                      className="w-16 h-16 md:w-24 md:h-24 object-contain transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => e.target.src = '/logo/fabicon.png'}
                    />
                  </div>
                </div>

                {/* Text Content - Proper Case */}
                <h3 className="text-xs md:text-sm font-bold text-slate-500 group-hover:text-orange-600 transition-colors text-center tracking-wide">
                  {cat.name}
                </h3>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}
