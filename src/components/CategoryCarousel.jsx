import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import ChevronLeft from "lucide-react/dist/esm/icons/chevron-left";
import ChevronRight from "lucide-react/dist/esm/icons/chevron-right";
import { useGlobalData } from "../context/DataContext";

export default function CategoryCarousel() {
  const { categories: globalCategories, loading } = useGlobalData();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (globalCategories.length > 0) {
      const printerParent = globalCategories.find(
        (cat) => cat.slug === "printers" || cat.id === 46
      );

      const items =
        printerParent && printerParent.children
          ? printerParent.children
          : globalCategories.filter(
            (c) => !c.name.toLowerCase().includes("laptop")
          );

      setCategories(items);
    }
  }, [globalCategories]);

  if (loading && categories.length === 0) {
    return (
      <section className="w-full bg-transparent py-4">
        <div className="mx-auto flex max-w-[1700px] gap-6 overflow-hidden px-4 md:px-0">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="h-[265px] min-w-[290px] animate-pulse rounded-[14px] bg-slate-200"
            />
          ))}
        </div>
      </section>
    );
  }

  if (categories.length === 0) return null;

  return (
    <section className="w-full bg-transparent py-4">
      <div className="relative mx-auto max-w-[1700px] px-3 2xl:px-0">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          spaceBetween={25}
          slidesPerView="auto"
          className="rounded-[14px]"
        >
          {categories.map((cat, index) => {
            return (
              <SwiperSlide key={cat.id} style={{ width: "auto" }}>
                <Link
                  to={`/shop?category=${cat.slug}`}
                  className="group relative block h-[265px] w-[290px] overflow-hidden rounded-[14px] bg-[#dfe4e9] p-4 transition duration-300 hover:-translate-y-1 hover:bg-[#d6dce2]"
                >
                  <div className="relative z-10 mb-4 inline-flex h-[32px] items-center bg-[#4254e8] px-3 text-[12px] font-bold text-white before:absolute before:right-[-16px] before:top-0 before:h-0 before:w-0 before:border-y-[16px] before:border-l-[16px] before:border-y-transparent before:border-l-[#4254e8]">
                    NEW
                  </div>

                  <div className="relative z-10">
                    <p className="text-[18px] font-semibold leading-tight text-[#293246]">
                      {cat.name.split(" ")[0] || "Printer"}
                    </p>

                    <h3 className="line-clamp-1 text-[26px] font-bold leading-tight text-[#293246]">
                      {cat.name.split(" ").slice(1).join(" ") || cat.name}
                    </h3>

                    <p className="mt-4 text-[16px] font-medium text-[#0f2742]">
                      Items ({cat.products_count || cat.product_count || 16})
                    </p>
                  </div>

                  <div className="absolute bottom-5 left-4 right-4 grid grid-cols-3 gap-3">
                    {[1, 2, 3].map((num) => (
                      <div
                        key={num}
                        className="h-[76px] overflow-hidden rounded-[13px] border-[5px] border-white bg-slate-100 shadow-sm"
                      >
                        <img
                          src={`/category/${cat.slug}_thumb.avif`}
                          alt={`${cat.name} ${num}`}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                          loading="lazy"
                          onError={(e) => {
                            e.target.src = "/logo/fabicon.avif";
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}