import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import API_BASE_URL from "../config";

export default function CategoryCarousel() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    const autoScroll = setInterval(() => {
      if (!isPaused && scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
        }
      }
    }, 3000);

    return () => clearInterval(autoScroll);
  }, [isPaused, categories]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/categories`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          const printerParent = data.data.find(
            (cat) => cat.slug === "printers" || cat.id === 46
          );

          const items =
            printerParent && printerParent.children
              ? printerParent.children
              : data.data.filter(
                (c) => !c.name.toLowerCase().includes("laptop")
              );

          setCategories(items);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const scrollByAmount = (amount) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: amount,
      behavior: "smooth",
    });
  };

  if (loading || categories.length === 0) return null;

  return (
    <section className="w-full bg-white py-10 md:py-14 overflow-hidden">
      <div className="max-w-[1800px] mx-auto px-4 md:px-6">
        <div className="relative">
          {/* TOP HALF OFF-WHITE PANEL ONLY */}
          <div className="bg-[#f5f5f5] h-[165px] md:h-[185px] w-full px-5 md:px-8 pt-7 md:pt-8 rounded-t-[20px]">
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                <h2 className="text-[22px]  font-semibold text-black tracking-[0.2px]">
                  Shop By Department
                </h2>
                <p className="text-[14px] md:text-[18px] text-[#b5b5b5] font-medium">
                  Choose What You Looking For
                </p>
              </div>

              <div className="hidden md:flex items-center gap-3 shrink-0">
                <button
                  onClick={() => scrollByAmount(-320)}
                  className="w-9 h-9 flex items-center justify-center text-[#6f8197] hover:text-black transition-colors"
                  aria-label="Scroll left"
                >
                  <ChevronLeft size={22} strokeWidth={1.8} />
                </button>
                <button
                  onClick={() => scrollByAmount(320)}
                  className="w-9 h-9 flex items-center justify-center text-[#6f8197] hover:text-black transition-colors"
                  aria-label="Scroll right"
                >
                  <ChevronRight size={22} strokeWidth={1.8} />
                </button>
              </div>
            </div>
          </div>

          {/* OVERLAP CATEGORY ROW */}
          <div className="-mt-14 md:-mt-16 px-2 md:px-4">
            <div
              ref={scrollRef}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className="flex items-start gap-6 md:gap-8 overflow-x-auto no-scrollbar scroll-smooth pb-4"
            >
              {categories.map((cat, index) => (
                <Link
                  key={`${cat.id}-${index}`}
                  to={`/shop?category=${cat.slug}`}
                  className="group shrink-0 relative min-w-[200px] md:min-w-[250px] h-[240px] md:h-[250px] rounded-[10px] overflow-hidden "
                >
                  {/* Background Image Container */}
                  <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                    <img
                      src={`/category/${cat.slug}.png`}
                      alt={cat.name}
                      className="w-full h-full object-contain rounded-[10px]"
                      onError={(e) => {
                        e.target.src = "/logo/fabicon.png";
                      }}
                    />
                  </div>

                  {/* Text Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-1 flex flex-col items-center text-center">
                    <h3 className="text-[14px] md:text-[16px] font-semibold text-slate-800 leading-tight">
                      {cat.name}
                    </h3>
                    <p className="text-[11px] md:text-[12px] text-slate-500 mt-1 font-medium">
                      View All
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* MOBILE ARROWS */}
          <div className="flex md:hidden items-center justify-center gap-4 mt-8">
            <button
              onClick={() => scrollByAmount(-240)}
              className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-700"
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scrollByAmount(240)}
              className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-700"
              aria-label="Scroll right"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}