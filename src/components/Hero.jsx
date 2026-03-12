import React from "react";
import {
  ArrowRight,
  Truck,
  ShieldCheck,
  Headset,
  Package,
  RotateCcw,
  Zap
} from "lucide-react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import { motion } from "framer-motion";

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

// Import the banner images
import banner1 from "@/assets/bannerr/banner-left.png";
import banner5 from "@/assets/bannerr/banner-1.png";
import banner6 from "@/assets/bannerr/banner-2.png";
import banner8 from "@/assets/bannerr/banner-8.jpg";
import banner10 from "@/assets/bannerr/banner-10.jpg";

const mainBanners = [

  {
    image: banner6,

  },
  {
    image: banner5,

  },

];

export default function Hero() {
  return (
    <div className="w-full font-['Heebo'] bg-gray-50">
      {/* MAIN CONTAINER WITH SIDE PADDING */}
      <div className="max-w-full mx-auto px-6 lg:px-12 py-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* LEFT SIDE (25% FIXED) */}
          <div className="hidden lg:block w-[20%] shrink-0">
            <Link to="/shop" className="block w-full overflow-hidden border border-gray-400">
              <img
                src={banner1}
                alt="Banner Left"
                className="w-full h-full object-cover"
              />
            </Link>
          </div>

          {/* RIGHT SIDE (75% FLEXIBLE) */}
          <div className="flex-1 lg:w-[80%] flex flex-col gap-8">

            {/* TOP: BANNER SLIDER */}
            <div className="w-full h-[400px] md:h-[530px]  overflow-hidden border border-gray-400">
              <Swiper
                modules={[Pagination]}
                speed={500}
                pagination={{
                  clickable: true,
                  bulletClass: 'swiper-pagination-bullet !bg-white/50 !opacity-100',
                  bulletActiveClass: '!bg-white !w-8 !rounded-full transition-all duration-500'
                }}
                className="h-full w-full"
              >
                {mainBanners.map((item, index) => (
                  <SwiperSlide key={index}>
                    <Link to="/shop" className="relative block w-full h-full group overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title || "Promotion"}
                        className="w-full h-full object-cover"
                      />
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* BOTTOM: CLEAN SHOWCASE WITH VERTICAL DIVIDERS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  border-gray-400 py-6 mt-2">

              {/* Item 1 */}
              <div className="flex items-center justify-start gap-4 px-6 lg:border-r border-gray-400 py-4 lg:py-0">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-50 text-blue-500 shrink-0">
                  <Truck size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm capitalize">Free shipping</h4>
                  <p className="text-slate-500 text-[12px]">On all orders</p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="flex items-center justify-center gap-4 px-6 lg:border-r border-gray-400 py-4 lg:py-0">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-emerald-50 text-emerald-500 shrink-0">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm capitalize">Genuine item</h4>
                  <p className="text-slate-500 text-[12px]">100% manufacturer warranty</p>
                </div>
              </div>

              {/* Item 3 */}
              <div className="flex items-center justify-center gap-4 px-6 lg:border-r border-gray-400 py-4 lg:py-0">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-orange-50 text-orange-500 shrink-0">
                  <Zap size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm capitalize">7 days delivery</h4>
                  <p className="text-slate-500 text-[12px]">Fast & reliable service</p>
                </div>
              </div>

              {/* Item 4 */}
              <div className="flex items-center justify-end gap-4 px-6 py-4 lg:py-0">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-indigo-50 text-indigo-500 shrink-0">
                  <Package size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm capitalize">Secure payment</h4>
                  <p className="text-slate-500 text-[12px]">100% protected transactions</p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
