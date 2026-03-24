import { useMemo } from "react";
import { Heart, ShoppingCart, ArrowRight, ShoppingBag, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Grid, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/grid";

export default function FeaturedTabs({ printers = [], accessories = [], loading = false }) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();

  const allProducts = useMemo(() => {
    // Increased limit to 100 products for a massive slider
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
      <section className="w-full py-16 bg-[#f1f3f6]">
        <div className="max-w-[1800px] mx-auto px-10">
          <div className="grid grid-cols-6 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse bg-white rounded-xl aspect-[1/1.4]" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-[#f1f3f6] py-12 md:py-20 font-['Rubik'] overflow-hidden">
      <div className="max-w-[1800px] mx-auto px-4 md:px-10">
        
        {/* HEADER SECTION */}
        <div className="bg-white rounded-t-xl border-b border-gray-100 p-6 md:p-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
              <ShoppingBag size={24} />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
                New & Featured
              </h2>
              <p className="text-gray-500 text-sm font-medium mt-1">Explore our latest arrivals and top hardware</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
             <button className="featured-prev w-11 h-11 rounded-full border border-gray-200 bg-white text-gray-700 flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-sm active:scale-90">
                <ChevronLeft size={24} />
             </button>
             <button className="featured-next w-11 h-11 rounded-full border border-gray-200 bg-white text-gray-700 flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-sm active:scale-90">
                <ChevronRight size={24} />
             </button>
          </div>
        </div>

        {/* PRODUCTS SLIDER (2 ROWS GRID - 100 PRODUCTS) */}
        <div className="bg-white rounded-b-xl p-4 md:p-6">
          <Swiper
            modules={[Navigation, Grid, Autoplay]}
            navigation={{
              prevEl: ".featured-prev",
              nextEl: ".featured-next",
            }}
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
              1536: { slidesPerView: 6, grid: { rows: 2 } },
            }}
            className="featured-swiper !pb-10"
          >
            {allProducts.map((p, index) => (
              <SwiperSlide key={`${p.id}-${index}`}>
                <div className="group bg-white border border-gray-100 rounded-xl p-4 md:p-5 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:border-primary/20 relative h-full flex flex-col">
                  
                  {/* "NEW" BADGE */}
                  {index % 4 === 0 && (
                    <div className="absolute top-3 left-0 z-10 bg-primary text-white text-[9px] font-black px-3 py-1 rounded-r-md uppercase tracking-[0.15em] shadow-sm">
                      New
                    </div>
                  )}

                  {/* IMAGE */}
                  <div className="relative aspect-square mb-5 flex items-center justify-center">
                    <Link to={`/product/${p.slug}`} className="w-full h-full flex items-center justify-center p-2">
                      <img
                        src={getImagePath(p.images)}
                        alt={p.name}
                        className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => { e.currentTarget.src = "/logo/fabicon.png"; }}
                      />
                    </Link>
                    
                    <button 
                      onClick={() => toggleWishlist(p)}
                      className={`absolute top-0 right-0 w-8 h-8 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 ${isInWishlist(p.id) ? "text-red-500 opacity-100" : "text-gray-400 hover:text-red-500"}`}
                    >
                      <Heart size={16} fill={isInWishlist(p.id) ? "currentColor" : "none"} />
                    </button>
                  </div>

                  {/* CONTENT */}
                  <div className="flex flex-col flex-1">
                    <Link to={`/product/${p.slug}`}>
                      <h3 className="text-[13px] md:text-[14px] font-semibold text-gray-800 leading-snug line-clamp-2 hover:text-primary transition-colors mb-3 h-[36px]">
                        {p.name}
                      </h3>
                    </Link>

                    <div className="mt-auto">
                      <div className="flex items-baseline gap-2 mb-3">
                        <span className="text-[18px] font-bold text-gray-900">${p.price}</span>
                        {(p.compare_price || p.old_price) && (
                          <span className="text-[12px] text-gray-400 line-through font-medium">${p.compare_price || p.old_price}</span>
                        )}
                      </div>

                      <button
                        onClick={() => addToCart(p)}
                        className="w-full py-2 bg-[#febd69] hover:bg-[#f3a847] text-[#131921] rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all active:scale-[0.95] flex items-center justify-center gap-2 shadow-sm"
                      >
                        <ShoppingCart size={14} /> Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* VIEW ALL ACTION */}
        <div className="mt-8 flex justify-center">
           <Link to="/shop" className="flex items-center gap-2 text-gray-400 font-bold uppercase text-[11px] tracking-[0.2em] hover:text-primary transition-all">
              Discover all 100+ items <ArrowRight size={14} />
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
      `}</style>
    </section>
  );
}
