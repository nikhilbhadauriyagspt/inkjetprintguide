import { Link } from "react-router-dom";
import { ArrowRight, LayoutGrid } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export default function ShopByCategory({ categories = [], loading = false }) {
  if (loading) {
    return (
      <section className="w-full py-16 bg-white flex flex-col items-center">
        <div className="flex gap-6 justify-center w-full max-w-[1800px] px-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-full aspect-[4/5] bg-slate-50 rounded-[20px] animate-pulse" />
          ))}
        </div>
      </section>
    );
  }

  const printerParent = categories.find(
    (c) => c.slug === "printers" || c.id === 46
  );
  const displayCategories = printerParent ? (printerParent.children || []) : categories;

  const getImagePath = (image) => {
    if (!image) return "/logo/fabicon.png";
    let path = image.startsWith("/") ? image : `/${image}`;
    return path.replace(/\.(jpg|jpeg)$/i, '.png');
  };

  const softColors = [
    "bg-blue-50",
    "bg-rose-50",
    "bg-emerald-50",
    "bg-amber-50",
    "bg-indigo-50",
    "bg-cyan-50",
    "bg-violet-50",
    "bg-orange-50",
  ];

  if (!displayCategories || displayCategories.length === 0) return null;

  return (
    <section className="w-full py-12 md:py-20 bg-white font-['Rubik'] overflow-hidden relative group/section">
      <div className="max-w-[1800px] mx-auto px-4 md:px-10 overflow-hidden">

        {/* HEADER SECTION CENTERED WITH ICON */}
        <div className="flex flex-col items-center justify-center text-center mb-12 md:mb-16">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <LayoutGrid size={24} />
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-foreground tracking-tight">
              Browse Categories
            </h2>
          </div>
          <p className="text-secondary text-sm md:text-base font-medium max-w-2xl">
            Explore our curated collections of high-performance printing hardware and genuine supplies
          </p>
        </div>

        {/* SLIDER WITHOUT NAV ARROWS */}
        <div className="relative">
          <Swiper
            modules={[Autoplay]}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            spaceBetween={16}
            slidesPerView={2.4}
            breakpoints={{
              480: { slidesPerView: 3.2, spaceBetween: 16 },
              768: { slidesPerView: 4.2, spaceBetween: 20 },
              1024: { slidesPerView: 5.2, spaceBetween: 20 },
              1280: { slidesPerView: 7.2, spaceBetween: 24 },
              1536: { slidesPerView: 8.2, spaceBetween: 24 },
            }}
            className="!overflow-visible"
          >
            {displayCategories.map((cat, index) => (
              <SwiperSlide key={cat.id}>
                <Link
                  to={`/shop?category=${cat.slug}`}
                  className="group block bg-transparent p-0 transition-all duration-500"
                >
                  {/* IMAGE CONTAINER WITH CIRCULAR TOP AND NO BORDERS */}
                  <div className={`relative aspect-[4/5] ${softColors[index % softColors.length]} rounded-t-full rounded-b-none flex items-center justify-center overflow-hidden mb-4`}>
                    <img
                      src={getImagePath(cat.image)}
                      alt={cat.name}
                      className="w-[75%] h-[60%] object-contain transition-transform duration-700 group-hover:scale-110 mix-blend-multiply"
                      onError={(e) => {
                        e.currentTarget.src = "/logo/fabicon.png";
                      }}
                    />

                    {/* MINIMAL OVERLAY ICON */}
                    <div className="absolute bottom-4 right-1/2 translate-x-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm text-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <ArrowRight size={14} className="text-primary" />
                    </div>
                  </div>

                  {/* DETAILS CENTERED */}
                  <div className="px-2 pb-2 text-center">
                    <h3 className="text-[14px] md:text-[16px] font-bold text-foreground group-hover:text-primary transition-colors duration-300 capitalize truncate">
                      {cat.name}
                    </h3>
                    <p className="text-[10px] font-semibold text-secondary/60 uppercase tracking-[0.2em] mt-1">
                      Shop Now
                    </p>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
