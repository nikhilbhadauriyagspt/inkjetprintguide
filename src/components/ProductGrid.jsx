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
import Wifi from 'lucide-react/dist/esm/icons/wifi';
import ScanLine from 'lucide-react/dist/esm/icons/scan-line';
import FileText from 'lucide-react/dist/esm/icons/file-text';
import Droplets from 'lucide-react/dist/esm/icons/droplets';
import ArrowLeftRight from 'lucide-react/dist/esm/icons/arrow-left-right';

import { useCart } from "../context/CartContext";

const formatPrice = (value) => {
  const num = parseFloat(value || 0);
  return Number.isNaN(num) ? 0 : num;
};

const getDiscountPercent = (price, salePrice) => {
  if (!price || !salePrice || salePrice >= price) return 0;
  return Math.round(((price - salePrice) / price) * 100);
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

const CircleFeatureIcon = ({ icon: Icon, bg = "bg-[#f4f4f4]" }) => (
  <div
    className={`w-[38px] h-[38px] rounded-full border border-[#d8d8d8] ${bg} flex items-center justify-center shrink-0`}
  >
    <Icon size={17} className="text-[#444]" strokeWidth={1.9} />
  </div>
);

const SideCategoryCard = ({ icon: Icon, iconBg, title, link }) => (
  <Link
    to={link}
    className="bg-white border border-slate-100 rounded-[10px] px-5 py-5 min-h-[102px] flex items-center justify-between hover:border-[#05718A] transition-all"
  >
    <div className="flex items-center gap-4">
      <div
        className={`w-[58px] h-[58px] rounded-full ${iconBg} flex items-center justify-center shrink-0`}
      >
        <Icon size={28} className="text-[#4d5670]" strokeWidth={1.7} />
      </div>

      <div>
        <h3 className="text-[15px] md:text-[17px] font-bold text-[#151515] uppercase leading-[1.2]">
          {title}
        </h3>
        <span className="mt-2 inline-block text-[14px] text-[#2563eb] font-medium">
          Shop now
        </span>
      </div>
    </div>

    <ChevronRight size={22} className="text-[#5c5c5c]" />
  </Link>
);

const ProductCard = ({
  product,
  index,
  addToCart,
  toggleWishlist,
  isInWishlist,
  toggleCompare,
  isInCompare,
}) => {
  const price = formatPrice(product.price);
  const salePrice = formatPrice(product.sale_price);
  const hasSale = salePrice > 0 && salePrice < price;
  const finalPrice = hasSale ? salePrice : price;
  const discount = getDiscountPercent(price, salePrice);

  const isWishlisted = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);

  const featureIcons = [
    Printer,
    Wifi,
    ScanLine,
    FileText,
    Droplets,
  ];

  const imgPath = getImagePath(product.images, index);

  return (
    <div className="relative bg-white rounded-none px-5 pt-4 pb-5 min-h-[530px] flex flex-col h-full border border-slate-100 group/card transition-all">
      {hasSale && (
        <div className="absolute left-4 top-4 z-20 bg-[#ffd8d4] text-[#ff4a3d] text-[13px] font-medium px-3 py-1 rounded-[4px]">
          Sale {discount}%
        </div>
      )}

      <div className="absolute right-4 top-4 z-20 flex flex-col gap-3">
        <button
          onClick={() => toggleWishlist(product)}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className={`w-9 h-9 rounded-full border border-[#ececec] flex items-center justify-center transition-colors ${isWishlisted ? 'bg-red-50' : 'bg-white'}`}
        >
          <Heart
            size={16}
            className={isWishlisted ? "text-red-500 fill-red-500" : "text-[#555]"}
          />
        </button>

        <Link
          to={`/product/${product.slug}`}
          aria-label={`View ${product.name} details`}
          className="w-9 h-9 rounded-full bg-white border border-[#ececec] flex items-center justify-center"
        >
          <Eye size={16} className="text-[#5c4d7d]" />
        </Link>
      </div>

      <div className="relative h-[220px] flex items-center justify-center overflow-hidden">
        <Link
          to={`/product/${product.slug}`}
          className="w-full h-full flex items-center justify-center px-5"
        >
          <img
            src={imgPath}
            alt={product.name}
            className="max-h-[180px] max-w-full object-contain transition-transform duration-500 group-hover/card:scale-105"
            key={imgPath}
            onError={(e) => {
              if (!e.currentTarget.src.includes('fabicon')) {
                e.currentTarget.src = "/logo/fabicon.avif";
              }
            }}
          />
        </Link>
      </div>

      <div className="mt-4 space-y-2">
        <button
          onClick={() => addToCart(product)}
          className="w-full h-[44px] rounded-full border border-[#05718A] bg-[#05718A] text-white text-[14px] font-bold uppercase tracking-wider hover:bg-black hover:border-black transition-all"
        >
          Quick Add
        </button>
        <button
          onClick={() => toggleCompare(product)}
          className={`w-full h-[44px] rounded-full border text-[14px] font-bold uppercase tracking-wider transition-all ${isCompared
            ? 'bg-blue-600 border-blue-600 text-white'
            : 'border-slate-200 text-slate-600 hover:border-[#05718A] hover:text-[#05718A]'
            }`}
        >
          {isCompared ? 'Compared' : 'Compare'}
        </button>
      </div>

      <div className="mt-7 text-center">
        <Link to={`/product/${product.slug}`}>
          <h3 className="mt-3 text-[19px] leading-[1.35] text-[#202020] font-semibold min-h-[52px] hover:text-[#05718A] transition line-clamp-2">
            {product.name}
          </h3>
        </Link>

        <div className="mt-4 flex items-center justify-center gap-3 flex-wrap">
          {hasSale && (
            <span className="text-[16px] text-[#747474] line-through">
              ${price.toFixed(2)}
            </span>
          )}
          <span className="text-[16px] text-[#575757]">From</span>
          <span className="text-[20px] font-bold text-[#ff3d2e]">
            ${finalPrice.toFixed(2)}
          </span>
        </div>

        <div className="mt-6 flex items-center justify-center gap-3 flex-wrap">
          {featureIcons.slice(0, 4).map((Icon, idx) => (
            <CircleFeatureIcon key={idx} icon={Icon} />
          ))}
          {featureIcons.length > 4 && (
            <div className="w-[38px] h-[38px] rounded-full border border-[#d8d8d8] bg-white flex items-center justify-center text-[16px] text-[#444] font-medium">
              +2
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const BottomPromo = ({
  title,
  desc,
  btnText,
  link,
  image,
  gradient,
}) => (
  <div className={`relative overflow-hidden rounded-[10px] min-h-[240px] ${gradient}`}>
    <div className="absolute top-4 right-4 grid grid-cols-4 gap-[6px] opacity-35">
      {Array.from({ length: 16 }).map((_, i) => (
        <span key={i} className="w-[4px] h-[4px] rounded-full bg-white" />
      ))}
    </div>

    <div className="relative z-10 h-full px-7 py-7 flex items-center justify-between gap-4">
      <div className=" max-w-[100%] md:max-w-[52%]">
        <h3 className="text-white text-[24px] md:text-[28px] font-extrabold leading-[1.15]">
          {title}
        </h3>
        <p className="mt-4 text-white/95 text-[15px] md:text-[16px] leading-[1.5]">
          {desc}
        </p>

        <Link
          to={link}
          className="mt-7 inline-flex items-center justify-center h-[42px] px-6 rounded-full bg-white text-[#335] text-[15px] font-semibold hover:opacity-95 transition"
        >
          {btnText}
        </Link>
      </div>

      <div className="hidden md:block md:w-[44%] flex items-end justify-end">
        <img
          src={image}
          alt={title}
          className="max-h-[175px] md:max-h-[190px] object-contain"
          onError={(e) => {
            e.currentTarget.src = "/logo/fabicon.avif";
          }}
        />
      </div>
    </div>
  </div>
);

const ServiceItem = ({ icon: Icon, title, desc }) => (
  <div className="flex items-center gap-4 px-8 py-6">
    <div className="w-[48px] h-[48px] rounded-full flex items-center justify-center">
      <Icon size={30} className="text-[#2e76a5]" strokeWidth={1.8} />
    </div>
    <div>
      <h4 className="text-[16px] font-bold text-[#161616]">{title}</h4>
      <p className="text-[14px] text-[#666] mt-1">{desc}</p>
    </div>
  </div>
);

export default function ProductShowcaseSection({
  products = [],
  loading = false,
}) {
  const { addToCart, toggleWishlist, isInWishlist, toggleCompare, isInCompare } = useCart();

  const displayProducts = products.slice(0, 10);

  if (loading) {
    return (
      <section className="w-full bg-white py-10">
        <div className="max-w-[1700px] mx-auto px-4 md:px-0 animate-pulse">
          <div className="h-8 w-80 bg-slate-200 rounded mb-8" />
          <div className="grid grid-cols-1 xl:grid-cols-[275px_minmax(0,1fr)_300px] gap-5">
            <div className="h-[540px] bg-slate-200 rounded-[10px]" />
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              <div className="h-[540px] bg-slate-200 rounded-[10px]" />
              <div className="h-[540px] bg-slate-200 rounded-[10px]" />
              <div className="h-[540px] bg-slate-200 rounded-[10px]" />
            </div>
            <div className="space-y-5">
              <div className="h-[102px] bg-slate-200 rounded-[10px]" />
              <div className="h-[102px] bg-slate-200 rounded-[10px]" />
              <div className="h-[102px] bg-slate-200 rounded-[10px]" />
              <div className="h-[102px] bg-slate-200 rounded-[10px]" />
              <div className="h-[102px] bg-slate-200 rounded-[10px]" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-white py-16">
      <div className="max-w-[1700px] mx-auto px-4 md:px-6">
        <h2 className="text-[30px] md:text-[38px] font-extrabold text-[#1a1a1a] mb-10 tracking-[-0.02em]">
          Printers & All-in-One Solutions
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-[300px_minmax(0,1fr)_320px] gap-8 items-stretch">
          {/* Left sale banner */}
          <div className="relative overflow-hidden rounded-[10px] min-h-[400px] md:min-h-[540px] bg-gradient-to-b from-[#1f67de] to-[#72c8ea] lg:col-span-2 xl:col-span-1">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_35%)]" />
            <div className="relative z-10 h-full px-8 py-10 md:pt-14 md:pb-4 flex flex-col md:flex-row xl:flex-col justify-between items-center md:items-start xl:items-stretch">
              <div className="text-center md:text-left xl:text-left">
                <p className="text-white text-[18px] font-bold uppercase tracking-wide">
                  SAVE UP TO
                </p>
                <h3 className="mt-4 text-[72px] md:text-[96px] leading-none font-extrabold text-white tracking-[-0.05em]">
                  40%
                </h3>
                <p className="mt-4 text-white/95 text-[18px]">
                  on selected printers*
                </p>

                <Link
                  to="/shop"
                  className="mt-10 inline-flex items-center justify-center h-[52px] px-10 rounded-full bg-white text-[#1f67de] text-[18px] font-semibold hover:opacity-95 transition"
                >
                  Shop Now
                </Link>
              </div>

              <div className="flex items-end justify-center mt-10 md:mt-0 xl:mt-auto">
                <img
                  src="productsgrid/image_1_thumb.avif"
                  alt="Sale Printer"
                  className="max-h-[240px] md:max-h-[300px] object-contain"
                  onError={(e) => {
                    e.currentTarget.src = "/logo/fabicon.avif";
                  }}
                />
              </div>
            </div>
          </div>

          {/* center products with slider */}
          <div className="relative group lg:col-span-1 xl:col-span-1 overflow-hidden">
            <Swiper
              modules={[Navigation, Autoplay]}
              navigation={{
                prevEl: ".product-prev",
                nextEl: ".product-next",
              }}
              autoplay={{ delay: 6000, disableOnInteraction: false }}
              spaceBetween={20}
              slidesPerView={1}
              breakpoints={{
                480: { slidesPerView: 1 },
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 2 },
                1536: { slidesPerView: 3 },
              }}
              className="h-full !overflow-visible md:!overflow-hidden"
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
                    isInCompare={isInCompare}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Slider Navigation - Hidden on small mobile */}
            <button
              aria-label="Previous products"
              className="product-prev absolute -left-5 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full border border-slate-200 bg-white hidden md:flex items-center justify-center text-slate-400 hover:text-[#05718A] hover:border-[#05718A] transition-all opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              aria-label="Next products"
              className="product-next absolute -right-5 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full border border-slate-200 bg-white hidden md:flex items-center justify-center text-slate-400 hover:text-[#05718A] hover:border-[#05718A] transition-all opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* right categories */}
          <div className="flex flex-col gap-6 lg:col-span-1 xl:col-span-1">
            <SideCategoryCard
              icon={Printer}
              iconBg="bg-[#e7f1ff]"
              title="INK TANK PRINTERS"
              link="/shop?category=supertank-printers"
            />

            <SideCategoryCard
              icon={Printer}
              iconBg="bg-[#dff5ea]"
              title="LASER PRINTERS"
              link="/shop?category=laser-printers"
            />

            <SideCategoryCard
              icon={ScanLine}
              iconBg="bg-[#ece7fa]"
              title="ALL-IN-ONE PRINTERS"
              link="/shop?category=all-in-one-printers"
            />

            <SideCategoryCard
              icon={FileText}
              iconBg="bg-[#f8ebdf]"
              title="PRINTER ACCESSORIES"
              link="/shop?category=printer-accessories"
            />

            <Link
              to="/shop"
              className="bg-white rounded-[10px] px-6 py-5 min-h-[102px] flex items-center justify-between border border-slate-100 hover:border-[#05718A] transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-[58px] h-[58px] rounded-full bg-slate-50 flex items-center justify-center border border-[#ececec]">
                  <Grid2x2 size={26} className="text-[#333]" />
                </div>
                <span className="text-[17px] text-[#202020] font-bold">
                  VIEW ALL DEPARTMENTS
                </span>
              </div>
              <ChevronRight size={22} className="text-[#5c5c5c]" />
            </Link>
          </div>
        </div>

        {/* bottom 3 banners */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
          <BottomPromo
            title="High Quality Prints for Every Day"
            desc="Crisp text, vibrant colors and reliable performance."
            btnText="Shop Ink Tank Printers"
            link="/shop?category=supertank-printers"
            image="/productsgrid/image_4_thumb.avif"
            gradient="bg-gradient-to-r from-[#246fe4] to-[#59c7e8]"
          />

          <BottomPromo
            title="Powerful Printing for Your Business"
            desc="Fast, efficient and cost-effective solutions for high productivity."
            btnText="Shop Laser Printers"
            link="/shop?category=laser-printers"
            image="/productsgrid/image_3_thumb.avif"
            gradient="bg-gradient-to-r from-[#3db8ae] to-[#79d5bf]"
          />

          <BottomPromo
            title="All-in-One Smart Solutions"
            desc="Print, scan, copy with maximum convenience."
            btnText="Shop All-in-One Printers"
            link="/shop?category=all-in-one-printers"
            image="/productsgrid/image_2_thumb.avif"
            gradient="bg-gradient-to-r from-[#8d87d8] to-[#a79ce7]"
          />
        </div>

        {/* bottom service strip */}
        <div className="mt-12 bg-white rounded-[10px] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 divide-y md:divide-y-0 xl:divide-x divide-[#ececec] border border-slate-100">
          <ServiceItem
            icon={Truck}
            title="Fast Global Shipping"
            desc="Reliable delivery to your doorstep worldwide"
          />
          <ServiceItem
            icon={BadgeCheck}
            title="Secure Payments"
            desc="Your transactions are 100% safe and encrypted"
          />
          <ServiceItem
            icon={Headphones}
            title="Expert Support"
            desc="Dedicated team to assist you at every step"
          />
          <ServiceItem
            icon={Shield}
            title="Genuine Quality"
            desc="High-performance products from trusted brands"
          />
        </div>
      </div>
    </section>
  );
}
