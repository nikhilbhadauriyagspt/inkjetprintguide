import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import Heart from "lucide-react/dist/esm/icons/heart";
import Eye from "lucide-react/dist/esm/icons/eye";
import ArrowLeftRight from "lucide-react/dist/esm/icons/arrow-left-right";
import ShoppingCart from "lucide-react/dist/esm/icons/shopping-cart";
import { useCart } from "../context/CartContext";
import ChevronRight from "lucide-react/dist/esm/icons/chevron-right";

export default function PremiumGridSection({
  products = [],
  loading = false,
  title = "Our",
  subtitle = "Featured Products"
}) {
  const { addToCart, toggleWishlist, isInWishlist, toggleCompare } = useCart();

  const displayProducts = useMemo(() => products.slice(0, 12), [products]);

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

  const ProductCard = ({ product, index }) => {
    const price = priceValue(product.price);
    const salePrice = priceValue(product.sale_price);
    const hasSale = salePrice > 0 && salePrice < price;
    const finalPrice = hasSale ? salePrice : price;
    const inWishlist = isInWishlist(product.id);

    const badges = ["TRENDING", "NEW", "SALE", "HOT", "LIMITED"];
    const badge = badges[index % 5];

    const badgeConfig = {
      "TRENDING": { bg: "bg-[#4254e8]", triangle: "before:border-l-[#4254e8]" },
      "NEW": { bg: "bg-[#ec4899]", triangle: "before:border-l-[#ec4899]" },
      "SALE": { bg: "bg-[#10b981]", triangle: "before:border-l-[#10b981]" },
      "HOT": { bg: "bg-[#f97316]", triangle: "before:border-l-[#f97316]" },
      "LIMITED": { bg: "bg-[#4254e8]", triangle: "before:border-l-[#4254e8]" }
    };
    const config = badgeConfig[badge] || badgeConfig["LIMITED"];

    return (
      <div className="group rounded-[14px] border border-slate-200 bg-white p-[15px] transition-all duration-300 hover:shadow-md h-full flex flex-col">
        <div className="relative h-[300px] overflow-hidden rounded-[12px] bg-[#dfe3e8] shrink-0">
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
            <h3 className="line-clamp-1 text-[17px] font-semibold text-[#10142b] transition hover:text-[#4254e8]">
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

  if (loading) {
    return (
      <section className="w-full bg-[#eef1f5] py-16">
        <div className="mx-auto max-w-[1700px] px-5">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
              <div key={i} className="h-[460px] animate-pulse rounded-[14px] bg-white" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-[#eef1f5] py-16">
      <div className="mx-auto max-w-[1700px] px-3 2xl:px-0">
        <div className="mb-10 flex items-center justify-between border-b border-slate-300/60 pb-6">
          <h2 className="text-[26px] md:text-[32px] font-bold text-[#10142b]">
            {title} <span className="text-[#4254e8]">{subtitle}</span>
          </h2>
          <Link to="/shop" className="hidden md:flex items-center gap-2 text-[13px] font-black text-[#4254e8] hover:opacity-80 uppercase tracking-widest">
            Explore More <ChevronRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
          {displayProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
