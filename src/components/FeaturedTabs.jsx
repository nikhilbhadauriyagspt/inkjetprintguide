import { useMemo, useState } from "react";
import { Heart, ShoppingCart, ArrowRight, ShoppingBag, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Grid, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/grid";
import "swiper/css/autoplay";

export default function FeaturedTabs({ printers = [], accessories = [], loading = false }) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [swiperInstance, setSwiperInstance] = useState(null);

  const allProducts = useMemo(() => {
    return [...printers, ...accessories].slice(0, 100);
  }, [printers, accessories]);

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === "string" ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) {
        return `/${imgs[0].replace(/\\/g, "/")}`;
      }
      return "/logo/fabicon.png";
    } catch {
      return "/logo/fabicon.png";
    }
  };

  if (loading) {
    return (
      <section className="w-full py-16 bg-white flex flex-col items-center">
        <div className="w-full max-w-[1600px] px-6 space-y-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="w-full aspect-[1/1.4] bg-slate-50 animate-pulse rounded-3xl" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-20 md:py-28 bg-white font-sans overflow-hidden border-t border-slate-50">
      <div className="max-w-[1600px] mx-auto px-6">

        {/* Minimalist Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <span className="text-[11px] font-bold text-[#991B1B] uppercase tracking-[0.4em] mb-4 block">Current Inventory</span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 er">
              New & <span className="text-slate-300">Featured.</span>
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => swiperInstance?.slidePrev()}
                className="w-12 h-12 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-slate-50 hover:text-[#991B1B] transition-all active:scale-90"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                onClick={() => swiperInstance?.slideNext()}
                className="w-12 h-12 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-slate-50 hover:text-[#991B1B] transition-all active:scale-90"
              >
                <ChevronRight size={22} />
              </button>
            </div>
          </div>
        </div>

        {/* Clean Grid Slider */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Grid, Autoplay]}
            onSwiper={setSwiperInstance}
            grid={{ rows: 2, fill: "row" }}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2, grid: { rows: 2 } },
              1024: { slidesPerView: 3, grid: { rows: 2 } },
              1280: { slidesPerView: 5, grid: { rows: 2 } },
              1536: { slidesPerView: 6, grid: { rows: 2 } },
            }}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            speed={1000}
            className="featured-swiper !pb-12 !overflow-visible"
          >
            {allProducts.map((p, index) => (
              <SwiperSlide key={`${p.id}-${index}`} className="h-auto">
                <div className="group/card flex flex-col h-full relative">

                  {/* Image Container - Minimal Bubble Style */}
                  <div className="relative aspect-[4/5] mb-6 bg-slate-50 rounded-[32px] flex items-center justify-center p-8 overflow-hidden group-hover/card:bg-white group-hover/card:shadow-2xl group-hover/card:shadow-slate-200/60 transition-all duration-700">
                    <Link to={`/product/${p.slug}`} className="w-full h-full flex items-center justify-center">
                      <img
                        src={getImagePath(p.images)}
                        alt={p.name}
                        className="w-full h-full object-contain mix-blend-multiply group-hover/card:scale-110 transition-transform duration-700"
                        onError={(e) => { e.currentTarget.src = "/logo/fabicon.png"; }}
                      />
                    </Link>

                    {/* Quick Actions */}
                    <button
                      onClick={() => toggleWishlist(p)}
                      className={`absolute top-5 right-5 w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-all duration-300 ${isInWishlist(p.id) ? "text-[#991B1B] opacity-100" : "text-slate-300 hover:text-[#991B1B]"}`}
                    >
                      <Heart size={18} fill={isInWishlist(p.id) ? "currentColor" : "none"} />
                    </button>

                    {index % 6 === 0 && (
                      <div className="absolute top-5 left-5 bg-black text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                        New
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 px-2">
                    <Link to={`/product/${p.slug}`}>
                      <h3 className="text-[14px] font-bold text-slate-800 leading-tight line-clamp-2 mb-3 group-hover/card:text-[#991B1B] transition-colors">
                        {p.name}
                      </h3>
                    </Link>

                    <div className="mt-auto flex items-center justify-between gap-4 pt-2">
                      <span className="text-lg font-black text-slate-900">${p.price}</span>
                      <button
                        onClick={() => addToCart(p)}
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-900 text-white hover:bg-[#991B1B] transition-all active:scale-90"
                      >
                        <ShoppingCart size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* View All */}
        <div className="mt-20 flex justify-center">
          <Link to="/shop" className="group flex items-center gap-3 text-slate-400 font-bold uppercase text-[11px] tracking-[0.3em] hover:text-[#991B1B] transition-all">
            Browse Full Collection <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </div>

      <style>{`
        .featured-swiper .swiper-grid-column > .swiper-slide {
          height: calc((100% - 30px) / 2) !important;
          margin-top: 30px !important;
        }
        .featured-swiper .swiper-grid-column > .swiper-slide:nth-child(odd) {
          margin-top: 0 !important;
        }
      `}</style>
    </section>
  );
}
