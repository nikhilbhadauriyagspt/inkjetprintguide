import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Grid } from 'swiper/modules';
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Plus,
  ArrowRight
} from 'lucide-react';
import API_BASE_URL from '../config';
import { useCart } from '../context/CartContext';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/grid';

export default function CategorySpotlight({
  categorySlug = "laser-printers",
  title = "Accessories",
  bannerImage = "/banner/promo-bottom-right.jpg",
  imagePosition = "left"
}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_BASE_URL}/products?category=${categorySlug}&limit=20`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'success') {
          setProducts(data.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [categorySlug]);

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === "string" ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) {
        return `/${imgs[0].replace(/\\/g, '/')}`;
      }
      return "/logo/fabicon.png";
    } catch { return "/logo/fabicon.png"; }
  };

  if (loading || products.length === 0) return null;

  const prevClass = `prev-${categorySlug}`;
  const nextClass = `next-${categorySlug}`;

  return (
    <section className="w-full py-16 md:py-20 font-['Heebo'] bg-white">
      <div className="max-w-full mx-auto px-6 lg:px-12">

        {/* CLEAN HEADER */}
        <div className="flex items-center justify-between mb-12 border-b border-slate-100 pb-6">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl md:text-4xl font-black text-slate-900 capitalize tracking-tight">
              {title}
            </h2>
            <span className="hidden sm:inline-block px-3 py-1 bg-[#10b981]/10 text-[#10b981] text-[10px] font-black uppercase tracking-widest rounded-full">
              Handpicked items
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button className={`${prevClass} w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-slate-900 hover:text-white transition-all cursor-pointer`}>
              <ChevronLeft size={18} />
            </button>
            <button className={`${nextClass} w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-slate-900 hover:text-white transition-all cursor-pointer`}>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className={`flex flex-col lg:flex-row gap-8 ${imagePosition === 'right' ? 'lg:flex-row-reverse' : ''}`}>

          {/* LARGE STATIC BANNER (MATCHING HEIGHT) */}
          <div className="w-full lg:w-[22%] shrink-0">
            <Link
              to={`/shop?category=${categorySlug}`}
              className="relative block h-full min-h-[400px] lg:h-[720px] overflow-hidden group border border-slate-100"
            >
              <img
                src={bannerImage}
                alt={title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/20 to-transparent"></div>

              <div className="absolute bottom-0 left-0 p-10 w-full">
                <span className="text-[11px] font-black text-[#10b981] uppercase tracking-[4px] mb-3 block">Premium Selection</span>
                <h3 className="text-white text-3xl font-black leading-tight mb-6 capitalize ">
                  Professional <br /> {title}
                </h3>
                <div className="inline-flex items-center gap-3 text-white text-sm font-bold uppercase tracking-widest transition-all">
                  Shop collection <ArrowRight size={18} />
                </div>
              </div>
            </Link>
          </div>

          {/* 2-ROW PRODUCT SLIDER */}
          <div className="flex-1 min-w-0">
            <Swiper
              key={categorySlug}
              modules={[Navigation, Grid]}
              navigation={{
                nextEl: `.${nextClass}`,
                prevEl: `.${prevClass}`,
              }}
              grid={{
                rows: 2,
                fill: 'row'
              }}
              spaceBetween={24}
              slidesPerView={2}
              breakpoints={{
                480: { slidesPerView: 2, grid: { rows: 2 } },
                768: { slidesPerView: 3, grid: { rows: 2 } },
                1024: { slidesPerView: 4, grid: { rows: 2 } },
                1440: { slidesPerView: 5, grid: { rows: 2 } },
              }}
              className="category-spotlight-swiper h-[720px]"
            >
              {products.map((p) => (
                <SwiperSlide key={p.id} className="!h-[calc((100%-24px)/2)]">
                  <div className="group relative flex flex-col h-full bg-white border border-slate-100 rounded-3xl p-3 transition-all duration-500">

                    {/* Image Area */}
                    <div className="relative aspect-square mb-3 bg-slate-50/50 rounded-2xl flex items-center justify-center p-6 transition-all group-hover:bg-white h-[200px]">
                      <Link to={`/product/${p.slug}`} className="w-full h-[170px] flex items-center justify-center">
                        <img
                          src={getImagePath(p.images)}
                          alt={p.name}
                          className="w-full h-full object-contain mix-blend-multiply"
                          onError={(e) => { e.currentTarget.src = "/logo/fabicon.png"; }}
                        />
                      </Link>

                      <button
                        onClick={() => toggleWishlist(p)}
                        className={`absolute top-2 right-2 w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 ${isInWishlist(p.id) ? 'text-red-500' : 'text-slate-400 hover:text-red-500'}`}
                      >
                        <Heart size={14} className={isInWishlist(p.id) ? 'fill-red-500' : ''} />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col px-3 py-2">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{p.brand_name || 'Premium'}</span>
                      <Link to={`/product/${p.slug}`}>
                        <h3 className="text-[13px] font-bold text-slate-800 leading-snug line-clamp-2 mb-3 group-hover:text-[#10b981] transition-colors min-h-[32px]">
                          {p.name}
                        </h3>
                      </Link>
                      <div className="mt-auto flex items-center justify-between gap-2 pt-2 border-t border-slate-50">
                        <span className="text-[15px] font-black text-slate-900 ">${Number(p.price).toFixed(2)}</span>
                        <button
                          onClick={() => addToCart(p)}
                          className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center hover:bg-[#10b981] transition-all active:scale-90 shrink-0"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>

                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>

      <style>{`
        .category-spotlight-swiper .swiper-wrapper {
          flex-direction: row !important;
        }
        .category-spotlight-swiper .swiper-slide {
          margin-top: 0 !important;
        }
      `}</style>
    </section>
  );
}
