import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Heart, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { useCart } from "../context/CartContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function CategoryShowcase({ title, products = [], link, discount = 0 }) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();

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

  if (!products || products.length === 0) return null;

  const swiperId = title.replace(/\s+/g, '-').toLowerCase();

  return (
    <section className="w-full bg-white py-20 md:py-28 font-sans overflow-hidden border-t border-slate-50">
      <div className="max-w-[1600px] mx-auto px-6">

        {/* Minimalist Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-xl">
            <span className="text-[11px] font-bold text-[#991B1B] uppercase tracking-[0.3em] mb-3 block">Featured Series</span>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900  lowercase">
              {title}.
            </h2>
          </div>

          <div className="flex items-center gap-6">
            <Link to={link} className="text-[12px] font-bold uppercase tracking-widest text-slate-400 hover:text-[#991B1B] transition-colors flex items-center gap-2 group">
              View All <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <div className="flex items-center gap-2">
              <button className={`${swiperId}-prev w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-slate-50 hover:text-[#991B1B] transition-all`}>
                <ChevronLeft size={20} />
              </button>
              <button className={`${swiperId}-next w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-slate-50 hover:text-[#991B1B] transition-all`}>
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Clean Products Grid */}
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={{
            prevEl: `.${swiperId}-prev`,
            nextEl: `.${swiperId}-next`,
          }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 5 },
          }}
          className="!overflow-visible"
        >
          {products.map((p) => (
            <SwiperSlide key={p.id}>
              <div className="group bg-white flex flex-col h-full transition-all duration-500">

                {/* Image Area - Ultra Minimal */}
                <div className="relative aspect-square mb-6 bg-slate-50 rounded-3xl flex items-center justify-center p-8 overflow-hidden group-hover:bg-white group-hover:shadow-2xl group-hover:shadow-slate-200/50 transition-all duration-500">
                  <Link to={`/product/${p.slug}`} className="w-full h-full flex items-center justify-center">
                    <img
                      src={getImagePath(p.images)}
                      alt={p.name}
                      className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => { e.currentTarget.src = "/logo/fabicon.png"; }}
                    />
                  </Link>

                  {/* Heart Icon - Minimal */}
                  <button
                    onClick={() => toggleWishlist(p)}
                    className={`absolute top-4 right-4 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md shadow-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 ${isInWishlist(p.id) ? "text-[#991B1B] opacity-100" : "text-slate-300 hover:text-[#991B1B]"}`}
                  >
                    <Heart size={18} fill={isInWishlist(p.id) ? "currentColor" : "none"} />
                  </button>

                  {/* Discount Badge */}
                  {discount > 0 && (
                    <div className="absolute top-4 left-4 bg-[#991B1B] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase er">
                      -{discount}%
                    </div>
                  )}
                </div>

                {/* Content Area */}
                <div className="flex flex-col flex-1 px-2">
                  <Link to={`/product/${p.slug}`}>
                    <h4 className="text-[15px] font-bold text-slate-800 leading-snug line-clamp-2 hover:text-[#991B1B] transition-colors mb-2">
                      {p.name}
                    </h4>
                  </Link>

                  <div className="mt-auto pt-2">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xl font-black text-slate-900">${p.price}</span>
                      {discount > 0 && (
                        <span className="text-[13px] text-slate-300 line-through font-medium">
                          ${(p.price / (1 - discount / 100)).toFixed(0)}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => addToCart(p)}
                      className="w-full py-3 bg-slate-900 text-white rounded-xl text-[12px] font-bold uppercase tracking-widest hover:bg-[#991B1B] transition-all flex items-center justify-center gap-2 group/btn active:scale-95"
                    >
                      <ShoppingCart size={16} className="group-hover/btn:-translate-y-0.5 transition-transform" />
                      Add To Manifest
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
}
