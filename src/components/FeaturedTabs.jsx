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
        <div className="w-full max-w-[1400px] px-6 space-y-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="w-full aspect-[1/1.4] bg-slate-50 animate-pulse rounded-lg" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-16 md:py-24 bg-white font-['Rubik'] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 md:px-10">
        
        {/* SECTION HEADER - MATCHING ShopByCategory EXACTLY */}
        <div className="flex flex-col items-center justify-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-3"
          >
            <div className="inline-flex items-center gap-2 text-blue-600 text-[13px] font-bold uppercase tracking-[0.2em]">
              <ShoppingBag size={16} /> New Arrivals
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">
              New & <span className="text-blue-600 text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-500">Featured</span>
            </h2>
          </motion.div>
        </div>

        {/* PRODUCTS SLIDER (2 ROWS GRID) */}
        <div className="relative group">
          <Swiper
            modules={[Navigation, Grid, Autoplay]}
            onSwiper={setSwiperInstance}
            grid={{
              rows: 2,
              fill: "row",
            }}
            spaceBetween={20}
            slidesPerView={2}
            breakpoints={{
              640: { slidesPerView: 2, grid: { rows: 2 } },
              768: { slidesPerView: 3, grid: { rows: 2 } },
              1024: { slidesPerView: 4, grid: { rows: 2 } },
              1280: { slidesPerView: 5, grid: { rows: 2 } },
            }}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            speed={800}
            className="featured-swiper !pb-12"
          >
            {allProducts.map((p, index) => (
              <SwiperSlide key={`${p.id}-${index}`} className="h-auto">
                <div className="group/card bg-white border border-slate-100 rounded-lg p-4 transition-all duration-500 hover:border-transparent relative h-full flex flex-col product-card-hover">
                  
                  {/* "NEW" BADGE */}
                  {index % 4 === 0 && (
                    <div className="absolute top-3 left-3 z-10 bg-blue-600 group-hover/card:bg-white group-hover/card:text-blue-700 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider transition-colors">
                      New
                    </div>
                  )}

                  {/* IMAGE */}
                  <div className="relative aspect-square mb-4 flex items-center justify-center overflow-hidden bg-slate-50/30 group-hover/card:bg-white/10 rounded-md transition-colors">
                    <Link to={`/product/${p.slug}`} className="w-full h-full flex items-center justify-center p-4">
                      <img
                        src={getImagePath(p.images)}
                        alt={p.name}
                        className="w-full h-full object-contain transition-transform duration-500 mix-blend-multiply group-hover/card:mix-blend-normal"
                        onError={(e) => { e.currentTarget.src = "/logo/fabicon.png"; }}
                      />
                    </Link>
                    
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleWishlist(p);
                      }}
                      className={`absolute top-2 right-2 w-8 h-8 flex items-center justify-center transition-all duration-300 opacity-0 group-hover/card:opacity-100 bg-white shadow-sm rounded-full z-20 ${isInWishlist(p.id) ? "text-red-500 opacity-100" : "text-slate-300 hover:text-red-500"}`}
                    >
                      <Heart size={18} fill={isInWishlist(p.id) ? "currentColor" : "none"} strokeWidth={1.5} />
                    </button>
                  </div>

                  {/* CONTENT */}
                  <div className="flex flex-col flex-1">
                    <Link to={`/product/${p.slug}`}>
                      <h3 className="text-[14px] font-bold text-slate-800 group-hover/card:text-white leading-snug line-clamp-2 transition-colors mb-2 h-[40px]">
                        {p.name}
                      </h3>
                    </Link>

                    <div className="mt-auto">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-[18px] font-bold text-slate-900 group-hover/card:text-white transition-colors">${p.price}</span>
                        {(p.compare_price || p.old_price) && (
                          <span className="text-[12px] text-slate-400 line-through group-hover/card:text-blue-200/70 transition-colors">${p.compare_price || p.old_price}</span>
                        )}
                      </div>

                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          addToCart(p);
                        }}
                        className="w-full py-2.5 bg-blue-600 group-hover/card:bg-white group-hover/card:text-blue-700 text-white rounded-md text-[11px] font-bold uppercase tracking-wider transition-all active:scale-[0.97] flex items-center justify-center gap-2 relative z-10"
                      >
                        <ShoppingCart size={14} strokeWidth={2.5} /> Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* MANUAL NAVIGATION CONTROLS */}
          <button 
            onClick={() => swiperInstance?.slidePrev()}
            className="absolute top-[40%] -left-4 md:-left-6 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-xl text-slate-900 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all z-30 pointer-events-auto opacity-0 group-hover:opacity-100 border border-slate-100 cursor-pointer active:scale-90"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={() => swiperInstance?.slideNext()}
            className="absolute top-[40%] -right-4 md:-right-6 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-xl text-slate-900 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all z-30 pointer-events-auto opacity-0 group-hover:opacity-100 border border-slate-100 cursor-pointer active:scale-90"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* VIEW ALL ACTION */}
        <div className="mt-12 flex justify-center">
           <Link to="/shop" className="group flex items-center gap-2 text-slate-400 font-bold uppercase text-[12px] tracking-widest hover:text-blue-600 transition-all">
              Discover All Items <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
           </Link>
        </div>
      </div>

      <style>{`
        .featured-swiper .swiper-grid-column > .swiper-slide {
          height: calc((100% - 20px) / 2) !important;
          margin-top: 20px !important;
        }
        .featured-swiper .swiper-grid-column > .swiper-slide:nth-child(odd) {
          margin-top: 0 !important;
        }
        .featured-swiper {
          height: auto !important;
          cursor: grab;
        }
        .featured-swiper:active {
          cursor: grabbing;
        }
        .product-card-hover:hover {
          background: linear-gradient(135deg, rgb(30, 58, 138) 0%, rgb(29, 78, 216) 50%, rgb(37, 99, 235) 100%);
          box-shadow: 0 10px 30px rgba(30, 58, 138, 0.15);
        }
      `}</style>
    </section>
  );
}
