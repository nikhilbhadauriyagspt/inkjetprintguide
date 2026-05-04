import React, { useMemo, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import ChevronLeft from 'lucide-react/dist/esm/icons/chevron-left';
import ChevronRight from 'lucide-react/dist/esm/icons/chevron-right';
import Heart from 'lucide-react/dist/esm/icons/heart';
import ArrowLeftRight from 'lucide-react/dist/esm/icons/arrow-left-right';
import { useCart } from "../context/CartContext";

export default function PremiumProductGrid({
  products = [],
  loading = false,
}) {
  const { addToCart, toggleWishlist, isInWishlist, toggleCompare, isInCompare } = useCart();

  const [newIndex, setNewIndex] = useState(0);
  const [featuredIndex, setFeaturedIndex] = useState(0);

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === "string" ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) {
        let path = String(imgs[0]).replace(/\\/g, "/").replace(/^public\//, "/");
        const base = path.substring(0, path.lastIndexOf("."));
        return `${base}_thumb.avif`;
      }
    } catch (e) { }
    return "/logo/fabicon.avif";
  };

  const normalizePrice = (value) => {
    const num = parseFloat(value || 0);
    return Number.isNaN(num) ? 0 : num;
  };

  const newProducts = useMemo(() => products.slice(0, 9), [products]);
  const featuredProducts = useMemo(() => products.slice(9, 18), [products]);

  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      let count = 3;
      if (width < 480) count = 1;
      else if (width < 768) count = 2;
      else if (width < 1280) count = 2;
      else if (width < 1536) count = 3;
      else count = 3;
      setVisibleCount(count);
    };

    handleResize();
    let timeoutId;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 150);
    };

    window.addEventListener("resize", debouncedResize, { passive: true });
    return () => {
      window.removeEventListener("resize", debouncedResize);
      clearTimeout(timeoutId);
    };
  }, []);

  const maxNewIndex = Math.max(0, newProducts.length - visibleCount);
  const maxFeaturedIndex = Math.max(0, featuredProducts.length - visibleCount);

  const nextNew = useCallback(() => {
    setNewIndex((prev) => (prev >= maxNewIndex ? 0 : prev + 1));
  }, [maxNewIndex]);

  const prevNew = () => setNewIndex((prev) => (prev <= 0 ? maxNewIndex : prev - 1));

  const nextFeatured = useCallback(() => {
    setFeaturedIndex((prev) => (prev >= maxFeaturedIndex ? 0 : prev + 1));
  }, [maxFeaturedIndex]);

  const prevFeatured = () => setFeaturedIndex((prev) => (prev <= 0 ? maxFeaturedIndex : prev - 1));

  useEffect(() => {
    if (loading || newProducts.length <= visibleCount) return;
    const timer = setInterval(nextNew, 5000);
    return () => clearInterval(timer);
  }, [nextNew, loading, newProducts.length, visibleCount]);

  useEffect(() => {
    if (loading || featuredProducts.length <= visibleCount) return;
    const timer = setInterval(nextFeatured, 6000);
    return () => clearInterval(timer);
  }, [nextFeatured, loading, featuredProducts.length, visibleCount]);

  const ProductCard = ({ product }) => {
    const price = normalizePrice(product.price);
    const salePrice = normalizePrice(product.sale_price);
    const hasSale = salePrice > 0 && salePrice < price;
    const finalPrice = hasSale ? salePrice : price;

    const inWishlist = isInWishlist(product.id);
    const inCompare = isInCompare(product.id);

    return (
      <div className="w-full shrink-0 px-[8px] h-full will-change-transform">
        <div className="bg-white p-0 h-full flex flex-col border border-slate-100 transition-shadow hover:shadow-lg rounded-none transform-gpu">
          <div className="relative bg-white h-[250px] md:h-[280px] flex items-center justify-center px-6 pt-8 pb-4">
            {hasSale && (
              <span className="absolute top-4 left-4 bg-red-50 text-red-600 text-[12px] font-bold px-3 py-1 uppercase tracking-wider z-10">
                Sale
              </span>
            )}

            <Link
              to={`/product/${product.slug}`}
              className="w-full h-full flex items-center justify-center"
            >
              <img
                src={getImagePath(product.images)}
                alt={product.name}
                className="max-h-[180px] md:max-h-[210px] max-w-full object-contain transition-transform duration-500 hover:scale-[1.05]"
                onError={(e) => {
                  e.currentTarget.src = "/logo/fabicon.avif";
                }}
                loading="lazy"
              />
            </Link>
          </div>

          <div className="px-5 pb-6 flex flex-col flex-1">
            <Link to={`/product/${product.slug}`}>
              <h3 className="text-[15px] md:text-[16px] leading-[1.4] text-[#1d1d1d] font-semibold line-clamp-2 min-h-[44px] hover:text-[#05718A] transition-colors mb-3">
                {product.name}
              </h3>
            </Link>

            <div className="mt-auto">
              <div className="flex items-center gap-2 mb-5">
                <span className="text-[18px] font-bold text-[#05718A]">
                  ${finalPrice.toFixed(2)}
                </span>
                {hasSale && (
                  <span className="text-[14px] text-slate-400 line-through">
                    ${price.toFixed(2)}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 mb-5">
                <span className="text-[14px] text-[#575757]">From</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => addToCart(product)}
                  className="flex-1 h-[40px] rounded-full border border-[#05718A] text-[#05718A] text-[14px] font-bold uppercase tracking-wider hover:bg-[#05718A] hover:text-white transition-all"
                >
                  Quick Add
                </button>
                <button
                  onClick={() => toggleWishlist(product)}
                  aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
                  className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${inWishlist ? 'bg-red-50' : 'bg-white'}`}
                  title="Wishlist"
                >
                  <Heart size={18} fill={inWishlist ? "currentColor" : "none"} />
                </button>
                <button
                  onClick={() => toggleCompare(product)}
                  aria-label={inCompare ? "Remove from compare" : "Add to compare"}
                  className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${inCompare ? 'bg-blue-50 text-[#05718A] border-blue-200' : 'bg-white text-slate-400 border-slate-200 hover:text-[#05718A] hover:border-blue-200'}`}
                  title="Compare"
                >
                  <ArrowLeftRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const SliderBlock = ({
    title,
    items,
    currentIndex,
    onPrev,
    onNext,
    maxIndex,
    isNew
  }) => {
    return (
      <div className="w-full">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-[22px] md:text-[28px] font-bold text-[#1d1d1d] flex items-center gap-3">
            <span className={`w-2 h-8 ${isNew ? 'bg-[#05718A]' : 'bg-red-500'}`}></span>
            {title}
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={onPrev}
              aria-label={`Previous ${title}`}
              className="w-10 h-10 border border-slate-200 bg-white flex items-center justify-center hover:bg-[#05718A] hover:text-white transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={onNext}
              aria-label={`Next ${title}`}
              className="w-10 h-10 border border-slate-200 bg-white flex items-center justify-center hover:bg-[#05718A] hover:text-white transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 cubic-bezier(0.4, 0, 0.2, 1) transform-gpu"
              style={{
                transform: `translate3d(-${currentIndex * (100 / visibleCount)}%, 0, 0)`,
                willChange: 'transform'
              }}
            >
              {items.map((product) => (
                <div
                  key={product.id}
                  className="shrink-0"
                  style={{ width: `${100 / visibleCount}%` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>

          {items.length > visibleCount && (
            <div className="flex items-center justify-center gap-2 mt-8">
              {Array.from({
                length: Math.max(1, items.length - visibleCount + 1),
              }).map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to ${title} slide ${i + 1}`}
                  onClick={() =>
                    isNew ? setNewIndex(i) : setFeaturedIndex(i)
                  }
                  className={`h-1 transition-all duration-300 ${i === currentIndex ? "w-8 bg-[#05718A]" : "w-4 bg-slate-200 hover:bg-slate-300"
                    }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <section className="w-full bg-[#f5f5f5] py-16">
        <div className="max-w-[1700px] mx-auto px-4 md:px-0">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
            {[1, 2].map((block) => (
              <div key={block}>
                <div className="h-10 w-64 bg-slate-200 mb-8 animate-pulse" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[1, 2, 3].map((card) => (
                    <div
                      key={card}
                      className="bg-white h-[450px] animate-pulse"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-[#f5f5f5] py-16">
      <div className="max-w-[1700px] mx-auto px-4 md:px-0">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 xl:gap-16">
          <SliderBlock
            title="Latest Arrivals"
            items={newProducts}
            currentIndex={newIndex}
            onPrev={prevNew}
            onNext={nextNew}
            maxIndex={maxNewIndex}
            isNew={true}
          />

          <SliderBlock
            title="Featured Collection"
            items={featuredProducts}
            currentIndex={featuredIndex}
            onPrev={prevFeatured}
            onNext={nextFeatured}
            maxIndex={maxFeaturedIndex}
            isNew={false}
          />
        </div>
      </div>
    </section>
  );
}
