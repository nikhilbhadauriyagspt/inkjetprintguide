import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import Heart from 'lucide-react/dist/esm/icons/heart';
import Eye from 'lucide-react/dist/esm/icons/eye';
import ChevronLeft from 'lucide-react/dist/esm/icons/chevron-left';
import ChevronRight from 'lucide-react/dist/esm/icons/chevron-right';
import Printer from 'lucide-react/dist/esm/icons/printer';
import Grid2x2 from 'lucide-react/dist/esm/icons/grid-2x2';
import Shield from 'lucide-react/dist/esm/icons/shield';
import Truck from 'lucide-react/dist/esm/icons/truck';
import BadgeCheck from 'lucide-react/dist/esm/icons/badge-check';
import Headphones from 'lucide-react/dist/esm/icons/headphones';
import ScanLine from 'lucide-react/dist/esm/icons/scan-line';
import FileText from 'lucide-react/dist/esm/icons/file-text';
import ArrowLeftRight from 'lucide-react/dist/esm/icons/arrow-left-right';
import ShoppingCart from 'lucide-react/dist/esm/icons/shopping-cart';

import { useCart } from "../context/CartContext";

const formatPrice = (value) => {
  const num = parseFloat(value || 0);
  return Number.isNaN(num) ? 0 : num;
};

const staticImages = [
  "productsgrid/image_1_thumb.avif",
  "productsgrid/image_2_thumb.avif",
  "productsgrid/image_3_thumb.avif",
  "productsgrid/image_4_thumb.avif",
];

const getImagePath = (images, index) => {
  if (typeof index === "number" && index >= 0 && index < 4) {
    return "/" + staticImages[index];
  }

  try {
    const imgs = typeof images === "string" ? JSON.parse(images) : images;
    if (Array.isArray(imgs) && imgs.length > 0) {
      const cleanPath = String(imgs[0]).replace(/\\/g, "/").replace(/^public\//, "");
      const base = cleanPath.substring(0, cleanPath.lastIndexOf("."));
      return `/${base}_thumb.avif`;
    }
  } catch (e) { }
  return "/logo/fabicon.avif";
};

const ProductCard = ({
  product,
  index,
  addToCart,
  toggleWishlist,
  isInWishlist,
  toggleCompare,
}) => {
  const price = formatPrice(product.price);
  const salePrice = formatPrice(product.sale_price);
  const hasSale = salePrice > 0 && salePrice < price;
  const finalPrice = hasSale ? salePrice : price;
  const inWishlist = isInWishlist(product.id);

  const badge = index === 0 ? "TRENDING" : index === 1 ? "NEW" : index === 2 ? "SALE" : "HOT";

  const badgeConfig = {
    "TRENDING": { bg: "bg-[#4254e8]", triangle: "before:border-l-[#4254e8]" },
    "NEW": { bg: "bg-[#ec4899]", triangle: "before:border-l-[#ec4899]" },
    "SALE": { bg: "bg-[#10b981]", triangle: "before:border-l-[#10b981]" },
    "HOT": { bg: "bg-[#f97316]", triangle: "before:border-l-[#f97316]" },
    "DEFAULT": { bg: "bg-[#4254e8]", triangle: "before:border-l-[#4254e8]" }
  };
  const config = badgeConfig[badge] || badgeConfig["DEFAULT"];

  const imgPath = getImagePath(product.images, index);

  return (
    <div className="group/card rounded-[14px] border border-slate-200 bg-white p-[15px] transition-all duration-300 hover:shadow-md h-full flex flex-col">
      <div className="relative h-[280px] overflow-hidden rounded-[12px] bg-[#dfe3e8] shrink-0">
        <Link to={`/product/${product.slug}`} className="flex h-full w-full items-center justify-center p-6">
          <img
            src={imgPath}
            alt={product.name}
            className="max-h-full max-w-full object-contain transition duration-500 group-hover/card:scale-110 mix-blend-multiply"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = "/logo/fabicon.avif";
            }}
          />
        </Link>

        <div className="absolute bottom-0 left-1/2 z-20 flex -translate-x-1/2 translate-y-full items-center gap-3 rounded-t-[22px] bg-white px-5 py-2 opacity-0 transition-all duration-300 group-hover/card:translate-y-0 group-hover/card:opacity-100 shadow-sm border border-slate-100">
          <Link to={`/product/${product.slug}`} className="text-[#0f2742] hover:text-[#4254e8]">
            <Eye size={16} />
          </Link>

          <button
            onClick={() => toggleCompare(product)}
            className="text-[#0f2742] hover:text-[#4254e8]"
          >
            <ArrowLeftRight size={16} />
          </button>

          <button
            onClick={() => toggleWishlist(product)}
            className={`transition hover:text-red-400 ${inWishlist ? "text-red-400" : "text-[#0f2742]"}`}
          >
            <Heart size={16} fill={inWishlist ? "currentColor" : "none"} />
          </button>
        </div>
      </div>

      <div className="pt-4 flex flex-col flex-1">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[11px] font-medium uppercase text-slate-500">
            {product.category?.name || "Printer"}
          </span>
          <span className="text-[11px] font-medium text-slate-500">
            {product.stock ? `${product.stock} In Stock` : "Available"}
          </span>
        </div>

        <Link to={`/product/${product.slug}`}>
          <h3 className="line-clamp-2 text-[16px] font-semibold text-[#10142b] transition hover:text-[#4254e8] min-h-[44px] leading-tight">
            {product.name}
          </h3>
        </Link>

        <div className="mt-2 flex items-center gap-2">
          <span className="text-[17px] font-bold text-black">
            ${finalPrice.toFixed(0)}
          </span>

          {hasSale && (
            <span className="text-[15px] text-slate-400 line-through">
              ${price.toFixed(0)}
            </span>
          )}
        </div>

        <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-50">
          <div className={`inline-flex h-[22px] items-center ${config.bg} px-2 text-[9px] font-bold text-white before:absolute before:right-[-11px] before:top-0 before:h-0 before:w-0 before:border-y-[11px] before:border-l-[11px] before:border-y-transparent ${config.triangle} relative`}>
            {badge}
          </div>

          <button
            onClick={() => addToCart(product)}
            className="flex h-[30px] items-center gap-1.5 rounded-lg bg-[#4254e8] px-2.5 text-[10px] font-bold text-white transition hover:bg-[#045a6e]"
          >
            <ShoppingCart size={13} />
            ADD
          </button>
        </div>
      </div>
    </div>
  );
};

const SideCategoryCard = ({ icon: Icon, title, link }) => (
  <Link
    to={link}
    className="bg-white border border-white rounded-[20px] px-6 py-6 min-h-[102px] flex items-center justify-between hover:border-[#4254e8] transition-all shadow-sm group"
  >
    <div className="flex items-center gap-5">
      <div className="w-[52px] h-[52px] rounded-xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100 transition-colors group-hover:bg-[#4254e8]/5">
        <Icon size={24} className="text-[#10142b] group-hover:text-[#4254e8] transition-colors" />
      </div>
      <div>
        <h3 className="text-[15px] font-black text-[#10142b] uppercase tracking-tight leading-none">
          {title}
        </h3>
        <span className="mt-2 inline-block text-[12px] text-[#4254e8] font-bold opacity-0 group-hover:opacity-100 transition-opacity">
          SHOP COLLECTION
        </span>
      </div>
    </div>
    <ChevronRight size={20} className="text-slate-300 group-hover:text-[#4254e8] transition-colors" />
  </Link>
);

const BottomPromo = ({ title, desc, btnText, link, image }) => (
  <div className="relative overflow-hidden rounded-[24px] bg-white p-8 flex items-center justify-between group transition-all hover:shadow-xl border border-white shadow-sm">
    <div className="max-w-[65%] relative z-10">
      <h3 className="text-[#10142b] text-[22px] font-black leading-tight mb-3 tracking-tighter">
        {title}
      </h3>
      <p className="text-slate-500 text-[14px] leading-relaxed mb-6 font-medium">
        {desc}
      </p>
      <Link
        to={link}
        className="inline-flex items-center text-[13px] font-black text-[#4254e8] hover:underline uppercase tracking-wider"
      >
        {btnText} <ChevronRight size={14} className="ml-1" />
      </Link>
    </div>
    <div className="w-[35%] flex justify-end">
      <img
        src={image}
        alt={title}
        className="max-h-[140px] object-contain transition-transform duration-700 group-hover:scale-110 mix-blend-multiply"
      />
    </div>
  </div>
);

const ServiceItem = ({ icon: Icon, title, desc }) => (
  <div className="flex items-center gap-5 px-10 py-8 group transition-colors hover:bg-slate-50/50">
    <div className="w-[52px] h-[52px] rounded-2xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100 group-hover:bg-white transition-colors shadow-sm">
      <Icon size={26} className="text-[#4254e8]" strokeWidth={2} />
    </div>
    <div>
      <h4 className="text-[15px] font-black text-[#10142b] uppercase tracking-tight">{title}</h4>
      <p className="text-[13px] text-slate-500 font-medium mt-1 leading-tight">{desc}</p>
    </div>
  </div>
);

export default function ProductShowcaseSection({
  products = [],
  loading = false,
}) {
  const { addToCart, toggleWishlist, isInWishlist, toggleCompare } = useCart();
  const displayProducts = products.slice(0, 10);

  if (loading) {
    return (
      <section className="w-full bg-[#eef1f5] py-20">
        <div className="max-w-[1700px] mx-auto px-5 animate-pulse">
          <div className="h-10 w-80 bg-slate-200 rounded-lg mb-10" />
          <div className="grid grid-cols-1 xl:grid-cols-[300px_minmax(0,1fr)_320px] gap-8">
            <div className="h-[600px] bg-white rounded-2xl shadow-sm" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => <div key={i} className="h-[500px] bg-white rounded-2xl shadow-sm" />)}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-[#eef1f5] py-20 overflow-hidden">
      <div className="max-w-[1700px] mx-auto px-5">
        <div className="mb-10 flex items-center justify-between border-b border-slate-300/40 pb-8">
          <h2 className="text-[28px] md:text-[34px] font-black text-[#10142b] tracking-tighter">
            Printers & <span className="text-[#4254e8]">All-in-One Solutions</span>
          </h2>
          <Link to="/shop" className="hidden md:flex items-center gap-2 text-[13px] font-black text-[#4254e8] hover:opacity-80 uppercase tracking-widest">
            View All Catalog <ChevronRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-[340px_minmax(0,1fr)_360px] gap-10 items-stretch">
          {/* Left Hero Banner */}
          <div className="relative overflow-hidden rounded-[24px] bg-[#10142b] shadow-2xl lg:col-span-2 xl:col-span-1 group">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#4254e8]/30" />
            <div className="relative z-10 h-full p-12 flex flex-col justify-between">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-[#4254e8] text-white text-[11px] font-black tracking-widest uppercase mb-6 shadow-lg shadow-[#4254e8]/20">
                  Exclusive Deal
                </span>
                <h3 className="text-white text-[56px] leading-[0.9] font-black tracking-tighter">
                  SAVE <br /><span className="text-[#4254e8]">40%</span>
                </h3>
                <p className="mt-5 text-slate-400 text-[18px] font-medium leading-relaxed">
                  The ultimate hub for <br /> professional printing.
                </p>

                <Link
                  to="/shop"
                  className="mt-12 inline-flex items-center justify-center h-[56px] px-10 rounded-2xl bg-white text-[#10142b] text-[17px] font-black hover:bg-[#4254e8] hover:text-white transition-all shadow-xl shadow-black/20"
                >
                  Shop Now
                </Link>
              </div>

              <div className="flex items-end justify-center mt-auto pt-10">
                <img
                  src="productsgrid/image_1_thumb.avif"
                  alt="Sale Printer"
                  className="max-h-[280px] object-contain transition-transform duration-1000 group-hover:scale-110 mix-blend-lighten"
                  onError={(e) => {
                    e.currentTarget.src = "/logo/fabicon.avif";
                  }}
                />
              </div>
            </div>
          </div>

          {/* Center Products Slider */}
          <div className="relative lg:col-span-1 xl:col-span-1">
            <Swiper
              modules={[Navigation, Autoplay]}
              navigation={{
                prevEl: ".product-prev",
                nextEl: ".product-next",
              }}
              autoplay={{ delay: 6000, disableOnInteraction: false }}
              spaceBetween={24}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                1280: { slidesPerView: 2 },
                1536: { slidesPerView: 2 },
              }}
              className="h-full !overflow-visible"
            >
              {displayProducts.map((product, idx) => (
                <SwiperSlide key={product.id}>
                  <ProductCard
                    product={product}
                    index={idx}
                    addToCart={addToCart}
                    toggleWishlist={toggleWishlist}
                    isInWishlist={isInWishlist}
                    toggleCompare={toggleCompare}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            <button className="product-prev absolute -left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-2xl bg-white shadow-2xl flex items-center justify-center text-slate-400 hover:text-[#4254e8] transition-all opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 border border-slate-100">
              <ChevronLeft size={24} />
            </button>
            <button className="product-next absolute -right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-2xl bg-white shadow-2xl flex items-center justify-center text-slate-400 hover:text-[#4254e8] transition-all opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 border border-slate-100">
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Right Sidebar Categories */}
          <div className="flex flex-col gap-6 lg:col-span-1 xl:col-span-1">
            <SideCategoryCard icon={Printer} title="INK TANK SERIES" link="/shop?category=supertank-printers" />
            <SideCategoryCard icon={ScanLine} title="ALL-IN-ONE SMART" link="/shop?category=all-in-one-printers" />
            <SideCategoryCard icon={Printer} title="PRO LASERJET" link="/shop?category=laser-printers" />
            <SideCategoryCard icon={FileText} title="GENUINE SUPPLIES" link="/shop?category=printer-accessories" />

            <Link
              to="/shop"
              className="bg-white rounded-[24px] px-8 py-7 min-h-[102px] flex items-center justify-between border border-white shadow-sm hover:border-[#4254e8] transition-all group"
            >
              <div className="flex items-center gap-5">
                <div className="w-[52px] h-[52px] rounded-xl bg-[#10142b] flex items-center justify-center shadow-lg">
                  <Grid2x2 size={24} className="text-white" />
                </div>
                <span className="text-[17px] text-[#10142b] font-black uppercase tracking-tighter">
                  ALL DEPARTMENTS
                </span>
              </div>
              <ChevronRight size={20} className="text-slate-300 group-hover:text-[#4254e8]" />
            </Link>
          </div>
        </div>

        {/* Bottom Three Promos */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-16">
          <BottomPromo
            title="Premium Ink Tank"
            desc="Consistent high-quality results for your daily creative tasks."
            btnText="Browse Models"
            link="/shop?category=supertank-printers"
            image="/productsgrid/image_4_thumb.avif"
          />
          <BottomPromo
            title="Pro Laser Series"
            desc="Boost your business productivity with industry-leading speed."
            btnText="Explore Series"
            link="/shop?category=laser-printers"
            image="/productsgrid/image_3_thumb.avif"
          />
          <BottomPromo
            title="Smart Solutions"
            desc="The perfect balance of power and convenience for modern offices."
            btnText="Shop Now"
            link="/shop?category=all-in-one-printers"
            image="/productsgrid/image_2_thumb.avif"
          />
        </div>

        {/* Bottom Service Strip */}
        <div className="mt-20 bg-white rounded-[32px] shadow-sm grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 divide-y md:divide-y-0 xl:divide-x divide-slate-100 border border-white overflow-hidden">
          <ServiceItem icon={Truck} title="Fast Delivery" desc="Reliable worldwide shipping" />
          <ServiceItem icon={BadgeCheck} title="Safe Payment" desc="100% secure checkout" />
          <ServiceItem icon={Headphones} title="Expert Help" desc="24/7 priority support" />
          <ServiceItem icon={Shield} title="Order Tracking" desc="Real-time delivery updates" />
        </div>
      </div>
    </section>
  );
}
