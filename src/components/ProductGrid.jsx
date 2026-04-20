import {
  Heart,
  Check,
  ArrowRight,
  Zap,
  Package,
  ShoppingCart,
  Star,
  ChevronLeft,
  ChevronRight,
  Globe,
  RotateCcw,
  ShieldCheck,
  Headphones,
  Truck,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const ProductSlider = ({
  title,
  products,
  onAddToCart,
  addedItems,
  getImagePath,
  autoScrollSpeed = 4000,
}) => {
  const { toggleWishlist, isInWishlist, toggleCompare, isInCompare } = useCart();
  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused && scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
        }
      }
    }, autoScrollSpeed);
    return () => clearInterval(interval);
  }, [products, isPaused]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
        <h2 className="text-xl font-bold text-slate-800 relative">
          {title}
          <span className="absolute -bottom-4 left-0 w-full h-[2px] bg-[#F54900]"></span>
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="p-1.5 border border-slate-200 rounded hover:bg-slate-50 transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-1.5 border border-slate-200 rounded hover:bg-slate-50 transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-4"
      >
        {products.map((p, i) => (
          <div
            key={p.id || i}
            className="min-w-[240px] max-w-[240px] group flex flex-col bg-white border border-slate-100 rounded-lg p-3 hover:shadow-md transition-shadow relative"
          >
            <div className="relative aspect-square mb-3 bg-[#f8f8f8] rounded-md overflow-hidden flex items-center justify-center p-4">
              <Link
                to={`/product/${p.slug}`}
                className="w-full h-full flex items-center justify-center"
              >
                <img
                  src={getImagePath(p.images)}
                  alt={p.name}
                  className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.currentTarget.src = "/logo/fabicon.png";
                  }}
                />
              </Link>

              <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => toggleWishlist(p)}
                  className={`w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center transition-colors ${isInWishlist(p.id)
                    ? "text-[#F54900]"
                    : "text-slate-400 hover:text-[#F54900]"
                    }`}
                >
                  <Heart
                    size={14}
                    fill={isInWishlist(p.id) ? "currentColor" : "none"}
                  />
                </button>
                <button
                  onClick={() => toggleCompare(p)}
                  className={`w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center transition-colors ${isInCompare(p.id)
                    ? "text-[#F54900]"
                    : "text-slate-400 hover:text-[#F54900]"
                    }`}
                >
                  <Package size={14} />
                </button>
              </div>
            </div>

            <Link to={`/product/${p.slug}`}>
              <h3 className="text-[13px] font-medium text-slate-800 line-clamp-2 mb-2 hover:text-[#F54900] transition-colors h-10">
                {p.name}
              </h3>
            </Link>

            <div className="mt-auto">
              <div className="flex items-center justify-between">
                <span className="text-[15px] font-bold text-slate-900">
                  ₹{parseFloat(p.price).toLocaleString()}
                </span>
                <button
                  onClick={() => onAddToCart(p)}
                  className={`p-2 rounded-full transition-colors ${addedItems[p.id]
                    ? "bg-emerald-500 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-[#F54900] hover:text-white"
                    }`}
                >
                  {addedItems[p.id] ? (
                    <Check size={14} />
                  ) : (
                    <ShoppingCart size={14} />
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const FeatureItem = ({ icon: Icon, title, desc }) => {
  return (
    <div className="flex items-start gap-3 pb-4 border-b border-slate-100 last:border-b-0 last:pb-0">
      <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
        <Icon size={18} className="text-[#F54900]" />
      </div>
      <div>
        <h4 className="text-[14px] font-semibold text-slate-800">{title}</h4>
        <p className="text-[13px] text-slate-500 mt-1">{desc}</p>
      </div>
    </div>
  );
};

export default function ProductGrid({ products = [] }) {
  const { addToCart, toggleWishlist, isInWishlist, toggleCompare, isInCompare } =
    useCart();
  const [addedItems, setAddedItems] = useState({});
  const sidebarScrollRef = useRef(null);
  const [isSidebarPaused, setIsSidebarPaused] = useState(false);

  const handleAddToCart = (p) => {
    addToCart(p);
    setAddedItems((prev) => ({ ...prev, [p.id]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [p.id]: false }));
    }, 1500);
  };

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === "string" ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) {
        return `/${String(imgs[0]).replace(/\\/g, "/")}`;
      }
    } catch (e) { }
    return "/logo/fabicon.png";
  };

  const newProducts = products.slice(0, 15);
  const row1Products = products.slice(5, 20);
  const row2Products = products.slice(20, 35);
  const row3Products = products.slice(35, 50);

  useEffect(() => {
    if (products.length === 0) return;

    const interval = setInterval(() => {
      if (!isSidebarPaused && sidebarScrollRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = sidebarScrollRef.current;
        if (scrollTop + clientHeight >= scrollHeight - 20) {
          sidebarScrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          sidebarScrollRef.current.scrollBy({ top: 120, behavior: "smooth" });
        }
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [isSidebarPaused, products]);

  return (
    <section className="w-full bg-white py-12 md:py-16">
      <div className="max-w-[1800px] mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-8 items-stretch min-h-[800px]">
          {/* Sidebar - 25% */}
          <div className="lg:w-[25%] flex flex-col h-full gap-6">
            <div className="border border-slate-100 rounded-lg p-6 bg-white shadow-sm flex-1 flex flex-col overflow-hidden h-[1250px]">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100 shrink-0">
                <h2 className="text-xl font-bold text-slate-800 relative">
                  New Products
                  <span className="absolute -bottom-4 left-0 w-full h-[2px] bg-red-600"></span>
                </h2>
                <div className="flex gap-1">
                  <button
                    onClick={() =>
                      sidebarScrollRef.current?.scrollBy({
                        top: -120,
                        behavior: "smooth",
                      })
                    }
                    className="p-1 border border-slate-200 rounded text-slate-400 hover:text-slate-600"
                  >
                    <ChevronLeft size={14} className="rotate-90" />
                  </button>
                  <button
                    onClick={() =>
                      sidebarScrollRef.current?.scrollBy({
                        top: 120,
                        behavior: "smooth",
                      })
                    }
                    className="p-1 border border-slate-200 rounded text-slate-400 hover:text-slate-600"
                  >
                    <ChevronRight size={14} className="rotate-90" />
                  </button>
                </div>
              </div>

              <div
                ref={sidebarScrollRef}
                onMouseEnter={() => setIsSidebarPaused(true)}
                onMouseLeave={() => setIsSidebarPaused(false)}
                className="space-y-6 overflow-y-auto no-scrollbar scroll-smooth pr-2 h-[1230px]"
              >
                {newProducts.map((p) => (
                  <div
                    key={p.id}
                    className="flex gap-4 group cursor-pointer border-b border-slate-50 pb-4 last:border-0 relative"
                  >
                    <div className="w-24 h-24 shrink-0 bg-[#f8f8f8] rounded-md overflow-hidden p-2 relative">
                      <img
                        src={getImagePath(p.images)}
                        alt={p.name}
                        className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.src = "/logo/fabicon.png";
                        }}
                      />

                      <div className="absolute top-1 right-1 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity scale-75">
                        <button
                          onClick={() => toggleWishlist(p)}
                          className={`${isInWishlist(p.id) ? "text-red-500" : "text-slate-400"
                            }`}
                        >
                          <Heart
                            size={16}
                            fill={isInWishlist(p.id) ? "currentColor" : "none"}
                          />
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col justify-center">
                      <Link to={`/product/${p.slug}`}>
                        <h4 className="text-[14px] font-medium text-slate-800 line-clamp-2 group-hover:text-[#F54900] transition-colors mb-2">
                          {p.name}
                        </h4>
                      </Link>
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-[16px] font-bold text-slate-900">
                          ₹{parseFloat(p.price).toLocaleString()}
                        </span>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => toggleCompare(p)}
                            className={`${isInCompare(p.id) ? "text-[#F54900]" : "text-slate-400"
                              }`}
                          >
                            <Package size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* New Feature Box */}
            <div className="border border-slate-100 rounded-lg px-6 py-10 bg-white shadow-sm">
              <div className="space-y-4">
                <FeatureItem
                  icon={Globe}
                  title="Global Shipping"
                  desc="Fast worldwide logistics."
                />
                <FeatureItem
                  icon={RotateCcw}
                  title="Easy Returns"
                  desc="7-day seamless exchange."
                />
                <FeatureItem
                  icon={ShieldCheck}
                  title="Secure Pay"
                  desc="100% encrypted protocols."
                />
                <FeatureItem
                  icon={Headphones}
                  title="Expert Help"
                  desc="24/7 technical support."
                />
                <FeatureItem
                  icon={Truck}
                  title="Fast Dispatch"
                  desc="Same-day deployment."
                />
              </div>
            </div>
          </div>

          {/* Main Content - 75% */}
          <div className="lg:w-[75%] flex flex-col">
            <div className="flex-1">
              <ProductSlider
                title="Featured Products"
                products={row1Products}
                onAddToCart={handleAddToCart}
                addedItems={addedItems}
                getImagePath={getImagePath}
                autoScrollSpeed={3000}
              />

              <Link to="/shop" className="my-8 block rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                <img
                  src="/midbanner/images-4.png"
                  alt="Static Banner"
                  className="w-full h-auto object-cover min-h-[180px] transition-transform duration-500 group-hover:scale-105"
                />
              </Link>

              <ProductSlider
                title="Trending Now"
                products={row2Products}
                onAddToCart={handleAddToCart}
                addedItems={addedItems}
                getImagePath={getImagePath}
                autoScrollSpeed={4000}
              />

              <ProductSlider
                title="Best Selling"
                products={row3Products}
                onAddToCart={handleAddToCart}
                addedItems={addedItems}
                getImagePath={getImagePath}
                autoScrollSpeed={3500}
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}