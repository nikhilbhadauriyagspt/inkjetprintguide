import React, { useMemo, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import Heart from "lucide-react/dist/esm/icons/heart";
import Eye from "lucide-react/dist/esm/icons/eye";
import ArrowLeftRight from "lucide-react/dist/esm/icons/arrow-left-right";
import ShoppingCart from "lucide-react/dist/esm/icons/shopping-cart";
import { useCart } from "../context/CartContext";
import { m, AnimatePresence } from "framer-motion";

export default function PremiumProductGrid({ products = [], loading = false }) {
  const { addToCart, toggleWishlist, isInWishlist, toggleCompare } = useCart();
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(0);

  const visibleProducts = useMemo(() => products.slice(0, 10), [products]);

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === "string" ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) {
        let path = String(imgs[0]).replace(/\\/g, "/").replace(/^public\//, "/");
        const base = path.substring(0, path.lastIndexOf("."));
        return `${base}_thumb.avif`;
      }
    } catch { }
    return "/logo/fabicon.avif";
  };

  const priceValue = (value) => {
    const num = parseFloat(value || 0);
    return Number.isNaN(num) ? 0 : num;
  };

  const nextSlide = useCallback(() => {
    setDirection(1);
    setActive((prev) => (prev === 0 ? 1 : 0));
  }, []);

  useEffect(() => {
    if (visibleProducts.length <= 5) return;
    const timer = setInterval(nextSlide, 7000);
    return () => clearInterval(timer);
  }, [nextSlide, visibleProducts.length]);

  const shownProducts = active === 0 ? visibleProducts.slice(0, 5) : visibleProducts.slice(5, 10);

  const ProductCard = ({ product, index }) => {
    const price = priceValue(product.price);
    const salePrice = priceValue(product.sale_price);
    const hasSale = salePrice > 0 && salePrice < price;
    const finalPrice = hasSale ? salePrice : price;
    const inWishlist = isInWishlist(product.id);

    const badge = index === 1 ? "TRENDING" : index === 2 ? "NEW" : index === 3 ? "SALE" : index === 4 ? "HOT" : "";

    const badgeConfig = {
      "TRENDING": { bg: "bg-[#4254e8]", triangle: "before:border-l-[#4254e8]" },
      "NEW": { bg: "bg-[#ec4899]", triangle: "before:border-l-[#ec4899]" },
      "SALE": { bg: "bg-[#10b981]", triangle: "before:border-l-[#10b981]" },
      "HOT": { bg: "bg-[#f97316]", triangle: "before:border-l-[#f97316]" },
      "DEFAULT": { bg: "bg-[#4254e8]", triangle: "before:border-l-[#4254e8]" }
    };
    const config = badgeConfig[badge] || badgeConfig["DEFAULT"];

    return (
      <div className="group rounded-[14px] border border-slate-200 bg-white p-[15px] transition-all duration-300 hover:shadow-md">
        <div className="relative h-[340px] overflow-hidden rounded-[12px] bg-[#dfe3e8]">
          <Link to={`/product/${product.slug}`} className="flex h-full w-full items-center justify-center p-6">
            <img
              src={getImagePath(product.images)}
              alt={product.name}
              className="max-h-full max-w-full object-contain transition duration-500 group-hover:scale-110 mix-blend-multiply"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = "/logo/fabicon.avif";
              }}
            />
          </Link>

          <div className="absolute bottom-0 left-1/2 z-20 flex -translate-x-1/2 translate-y-full items-center gap-3 rounded-t-[22px] bg-white px-5 py-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 shadow-sm border border-slate-100">
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

        <div className="pt-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[12px] font-medium uppercase text-slate-500">
              {product.category?.name || "Printer"}
            </span>
            <span className="text-[12px] font-medium text-slate-500">
              {product.stock ? `${product.stock} In Stock` : "Available"}
            </span>
          </div>

          <Link to={`/product/${product.slug}`}>
            <h3 className="line-clamp-1 text-[17px] font-semibold text-[#10142b] transition hover:text-[#4254e8]">
              {product.name}
            </h3>
          </Link>

          <div className="mt-2 flex items-center gap-2">
            <span className="text-[17px] font-bold text-black">
              ${finalPrice.toFixed(0)}
            </span>

            {hasSale && (
              <span className="text-[16px] text-slate-400 line-through">
                ${price.toFixed(0)}
              </span>
            )}
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-slate-50 pt-3">
            <div className={`inline-flex h-[24px] items-center ${config.bg} px-2 text-[10px] font-bold text-white before:absolute before:right-[-12px] before:top-0 before:h-0 before:w-0 before:border-y-[12px] before:border-l-[12px] before:border-y-transparent ${config.triangle} relative`}>
              {badge || "NEW"}
            </div>

            <button
              onClick={() => addToCart(product)}
              className="flex h-[32px] items-center gap-2 rounded-lg bg-[#4254e8] px-3 text-[11px] font-bold text-white transition hover:bg-[#045a6e]"
            >
              <ShoppingCart size={14} />
              ADD
            </button>
          </div>
        </div>
      </div>
    );
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  return (
    <section className="w-full bg-[#eef1f5] py-10 overflow-hidden">
      <div className="mx-auto max-w-[1700px] px-3 2xl:px-0">
        <div className="mb-8 flex items-center justify-between border-b border-slate-300/60 pb-4">
          <h2 className="text-[24px] font-bold text-[#10142b]">
            Printers & <span className="text-[#05718A]">All-in-One Solutions</span>
          </h2>

          <div className="flex items-center gap-2">
            {[0, 1].map((dot) => (
              <button
                key={dot}
                onClick={() => {
                  if (active === dot) return;
                  setDirection(dot > active ? 1 : -1);
                  setActive(dot);
                }}
                className={`h-[12px] rounded-full border border-[#0f2742] transition-all duration-300 ${active === dot ? "w-[28px] bg-[#05718A] border-[#05718A]" : "w-[12px] bg-white"
                  }`}
                aria-label={`Go to product slide ${dot + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="relative min-h-[520px]">
          {loading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4 2xl:grid-cols-5">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-[520px] animate-pulse rounded-[14px] bg-white shadow-sm" />
              ))}
            </div>
          ) : (
            <AnimatePresence initial={false} custom={direction}>
              <m.div
                key={active}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 200, damping: 30, mass: 1 },
                  opacity: { duration: 0.4 }
                }}
                className="absolute inset-0 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4 2xl:grid-cols-5"
              >
                {shownProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </m.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </section>
  );
}