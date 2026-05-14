import { useState, useEffect } from 'react';
import { useSearchParams, Link, useParams } from 'react-router-dom';
import SEO from '@/components/SEO';
import { useCart } from '../context/CartContext';
import Search from 'lucide-react/dist/esm/icons/search';
import ChevronDown from 'lucide-react/dist/esm/icons/chevron-down';
import Heart from 'lucide-react/dist/esm/icons/heart';
import Loader2 from 'lucide-react/dist/esm/icons/loader-2';
import ChevronLeft from 'lucide-react/dist/esm/icons/chevron-left';
import ChevronRight from 'lucide-react/dist/esm/icons/chevron-right';
import Filter from 'lucide-react/dist/esm/icons/filter';
import X from 'lucide-react/dist/esm/icons/x';
import Check from 'lucide-react/dist/esm/icons/check';
import ShoppingCart from 'lucide-react/dist/esm/icons/shopping-cart';
import ArrowLeftRight from 'lucide-react/dist/esm/icons/arrow-left-right';
import SlidersHorizontal from 'lucide-react/dist/esm/icons/sliders-horizontal';
import LayoutGrid from 'lucide-react/dist/esm/icons/layout-grid';
import Eye from 'lucide-react/dist/esm/icons/eye';
import { m, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../config';

import { useGlobalData } from '../context/DataContext';

const getImagePath = (images) => {
  try {
    const imgs = typeof images === 'string' ? JSON.parse(images) : images;
    if (Array.isArray(imgs) && imgs.length > 0) {
      let path = `/${imgs[0].replace(/\\/g, '/')}`;
      const lastDot = path.lastIndexOf('.');
      const basePath = path.substring(0, lastDot);
      return `${basePath}_thumb.avif`;
    }
    return '/logo/fabicon.avif';
  } catch {
    return '/logo/fabicon.avif';
  }
};

export default function Shop() {
  const { categories: globalCategories } = useGlobalData();
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    toggleCompare,
    isInCompare,
  } = useCart();

  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [addedItems, setAddedItems] = useState({});

  const itemsPerPage = 12;

  const category = searchParams.get('category') || '';
  const sort = searchParams.get('sort') || 'newest';
  const search = searchParams.get('search') || '';

  const currentCategoryObj = categories.find((c) => c.slug === category);
  const heroTitle = currentCategoryObj ? currentCategoryObj.name : 'Collections';

  useEffect(() => {
    if (globalCategories.length > 0) {
      const printers = globalCategories.find((c) => c.slug === 'printers' || c.id === 46);
      setCategories(printers ? printers.children : globalCategories.filter(c => !c.name.toLowerCase().includes('laptop')));
    }
  }, [globalCategories]);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams(searchParams);
    params.set('limit', '1000');

    fetch(`${API_BASE_URL}/products?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'success') {
          let filtered = data.data.filter(
            (p) =>
              !p.name.toLowerCase().includes('laptop') &&
              !p.name.toLowerCase().includes('macbook') &&
              !p.name.toLowerCase().includes('notebook')
          );

          if (sort === 'price_low') {
            filtered.sort((a, b) => Number(a.price) - Number(b.price));
          } else if (sort === 'price_high') {
            filtered.sort((a, b) => Number(b.price) - Number(a.price));
          }

          setProducts(filtered);
          setCurrentPage(1);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [searchParams, sort]);

  const updateFilter = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) newParams.set(key, value);
    else newParams.delete(key);
    setSearchParams(newParams);
  };

  const handleAddToCart = (p) => {
    addToCart(p);
    setAddedItems((prev) => ({ ...prev, [p.id]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [p.id]: false }));
    }, 1500);
  };

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const currentProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const FilterSidebar = () => (
    <div className="space-y-8">
      <div className="bg-white border border-white rounded-[20px] p-8 shadow-sm">
        <h4 className="text-[14px] font-black uppercase tracking-widest text-[#10142b] mb-6 border-b border-slate-50 pb-4">Categories</h4>
        <div className="space-y-1">
          <button
            onClick={() => updateFilter('category', '')}
            className={`w-full text-left px-4 py-3 text-[13px] font-bold rounded-xl transition-all ${!category
              ? 'bg-[#007aff] text-white shadow-lg shadow-[#007aff]/20'
              : 'text-slate-500 hover:bg-slate-50'
              }`}
          >
            All Products
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => updateFilter('category', c.slug)}
              className={`w-full text-left px-4 py-3 text-[13px] font-bold rounded-xl transition-all ${category === c.slug
                ? 'bg-[#007aff] text-white shadow-lg shadow-[#007aff]/20'
                : 'text-slate-500 hover:bg-slate-50'
                }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={() => setSearchParams({})}
        className="w-full bg-[#10142b] text-white py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] hover:bg-[#007aff] transition-all shadow-xl"
      >
        Reset Filters
      </button>
    </div>
  );

  const ProductCard = ({ p, index }) => {
    const isWishlisted = isInWishlist(p.id);
    const isCompared = isInCompare(p.id);
    const isAdded = addedItems[p.id];

    const badges = ["TRENDING", "NEW", "SALE", "HOT", "LIMITED"];
    const badge = badges[index % 5];

    const badgeConfig = {
      "TRENDING": { bg: "bg-[#4254e8]", triangle: "before:border-l-[#4254e8]" },
      "NEW": { bg: "bg-[#ec4899]", triangle: "before:border-l-[#ec4899]" },
      "SALE": { bg: "bg-[#10b981]", triangle: "before:border-l-[#10b981]" },
      "HOT": { bg: "bg-[#f97316]", triangle: "before:border-l-[#f97316]" },
      "LIMITED": { bg: "bg-[#007aff]", triangle: "before:border-l-[#007aff]" }
    };
    const config = badgeConfig[badge] || badgeConfig["LIMITED"];

    return (
      <div className="group rounded-[14px] border border-slate-200 bg-white p-[15px] transition-all duration-300 hover:shadow-md h-full flex flex-col">
        <div className="relative h-[280px] overflow-hidden rounded-[12px] bg-[#dfe3e8] shrink-0">
          <Link to={`/product/${p.slug}`} className="flex h-full w-full items-center justify-center p-6">
            <img
              src={getImagePath(p.images)}
              alt={p.name}
              className="max-h-full max-w-full object-contain transition duration-500 group-hover:scale-110 mix-blend-multiply"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = "/logo/fabicon.avif";
              }}
            />
          </Link>

          <div className="absolute bottom-0 left-1/2 z-20 flex -translate-x-1/2 translate-y-full items-center gap-3 rounded-t-[22px] bg-white px-5 py-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 shadow-sm border border-slate-100">
            <Link to={`/product/${p.slug}`} className="text-[#0f2742] hover:text-[#007aff]">
              <Eye size={16} />
            </Link>

            <button
              onClick={() => toggleCompare(p)}
              className={`transition-colors ${isCompared ? 'text-[#007aff]' : 'text-[#0f2742] hover:text-[#007aff]'}`}
            >
              <ArrowLeftRight size={16} />
            </button>

            <button
              onClick={() => toggleWishlist(p)}
              className={`transition hover:text-red-400 ${isWishlisted ? "text-red-400" : "text-[#0f2742]"}`}
            >
              <Heart size={16} fill={isWishlisted ? "currentColor" : "none"} />
            </button>
          </div>
        </div>

        <div className="pt-4 flex flex-col flex-1">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[11px] font-medium uppercase text-slate-500">
              {p.category?.name || "Printer"}
            </span>
          </div>

          <Link to={`/product/${p.slug}`}>
            <h3 className="line-clamp-2 text-[15px] font-bold text-[#10142b] transition hover:text-[#007aff] min-h-[40px] leading-tight">
              {p.name}
            </h3>
          </Link>

          <div className="mt-2 mb-4">
            <span className="text-lg font-black text-black tracking-tight">
              ${Number(p.price).toLocaleString()}
            </span>
          </div>

          <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-50">
            <div className={`inline-flex h-[22px] items-center ${config.bg} px-2 text-[9px] font-bold text-white before:absolute before:right-[-11px] before:top-0 before:h-0 before:w-0 before:border-y-[11px] before:border-l-[11px] before:border-y-transparent ${config.triangle} relative`}>
              {badge}
            </div>

            <button
              onClick={() => handleAddToCart(p)}
              disabled={isAdded}
              className={`flex h-[30px] items-center gap-1.5 rounded-lg px-2.5 text-[10px] font-bold text-white transition-all ${isAdded ? 'bg-emerald-500' : 'bg-[#007aff] hover:bg-[#045a6e]'}`}
            >
              {isAdded ? <Check size={13} /> : <ShoppingCart size={13} />}
              {isAdded ? 'ADDED' : 'ADD'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#eef1f5] text-slate-900 pb-20 font-sans">
      <SEO title="Shop All Printers, Ink & Accessories | Inkjet Print Guide Collections" />

      {/* Hero Header */}
      <div className="bg-white border-b border-slate-200 pt-16 pb-12 shadow-sm">
        <div className="max-w-[1700px] mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-[#10142b] leading-none">
                {heroTitle}
              </h1>
              <p className="text-slate-500 max-w-xl text-lg font-medium leading-relaxed">
                Precision hardware for next-gen productivity. <br className="hidden md:block" /> Shop our premium catalog of high-performance printers.
              </p>
            </div>
            <div className="bg-[#10142b] rounded-[24px] px-10 py-6 flex items-center gap-8 shadow-2xl">
              <div className="text-right">
                <p className="text-[10px] font-black text-[#007aff] uppercase tracking-widest mb-1">UNITS DISCOVERED</p>
                <p className="text-4xl font-black text-white leading-none tracking-tighter">{products.length}</p>
              </div>
              <LayoutGrid size={32} className="text-[#007aff]" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1700px] mx-auto px-4 md:px-8 mt-12">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12">

          {/* Left Sidebar */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-32">
              <FilterSidebar />
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-9">
            {/* Toolbar */}
            <div className="bg-white border border-white rounded-[24px] p-5 mb-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
              <div className="relative w-full md:w-[450px]">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="Search series, model or category..."
                  value={search}
                  onChange={(e) => updateFilter('search', e.target.value)}
                  className="w-full h-14 bg-slate-50 rounded-2xl border border-slate-100 pl-14 pr-6 text-sm font-bold outline-none focus:bg-white focus:border-[#007aff] transition-all"
                />
              </div>

              <div className="flex items-center gap-4 w-full md:w-auto">
                <button
                  onClick={() => setShowMobileFilters(true)}
                  className="lg:hidden flex-1 inline-flex items-center justify-center gap-2 bg-[#007aff] text-white h-14 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-lg shadow-[#007aff]/20"
                >
                  <SlidersHorizontal size={16} /> Filters
                </button>

                <div className="relative w-full md:w-64">
                  <select
                    value={sort}
                    onChange={(e) => updateFilter('sort', e.target.value)}
                    className="w-full appearance-none h-14 bg-white rounded-2xl border border-slate-200 pl-6 pr-12 text-[11px] font-black uppercase tracking-widest text-[#10142b] outline-none focus:border-[#007aff] transition-all"
                  >
                    <option value="newest">Sort: Latest Arrivals</option>
                    <option value="price_low">Price: Low to High</option>
                    <option value="price_high">Price: High to Low</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="aspect-[3/4] bg-white rounded-[24px] border border-white animate-pulse shadow-sm"></div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="py-40 text-center bg-white rounded-[32px] border border-dashed border-slate-200">
                <p className="text-sm font-black text-slate-300 uppercase tracking-[0.3em]">
                  No matching hardware units.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {currentProducts.map((p, idx) => (
                  <ProductCard key={p.id} p={p} index={idx} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {!loading && totalPages > 1 && (
              <div className="mt-24 flex items-center justify-center gap-3">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-[#007aff] disabled:opacity-30 transition-all border border-white hover:border-[#007aff]"
                >
                  <ChevronLeft size={22} />
                </button>
                {[...Array(totalPages)].map((_, i) => {
                  const page = i + 1;
                  if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-14 h-14 rounded-2xl text-[14px] font-black transition-all shadow-sm ${currentPage === page ? 'bg-[#007aff] text-white' : 'bg-white text-slate-500 hover:bg-slate-50 border border-white hover:border-slate-200'}`}
                      >
                        {page}
                      </button>
                    );
                  }
                  if (page === 2 || page === totalPages - 1) return <span key={i} className="text-slate-300 font-black">...</span>;
                  return null;
                })}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-[#007aff] disabled:opacity-30 transition-all border border-white hover:border-[#007aff]"
                >
                  <ChevronRight size={22} />
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filters */}
      <AnimatePresence>
        {showMobileFilters && (
          <>
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileFilters(false)}
              className="fixed inset-0 bg-[#10142b]/80 z-[2000] backdrop-blur-md"
            />
            <m.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-[340px] bg-[#eef1f5] z-[2001] p-8 shadow-2xl overflow-y-auto rounded-l-[40px]"
            >
              <div className="flex items-center justify-between mb-12">
                <h2 className="text-[12px] font-black uppercase tracking-[0.2em] text-[#10142b]">Refine Selection</h2>
                <button onClick={() => setShowMobileFilters(false)} className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#10142b]">
                  <X size={20} />
                </button>
              </div>
              <FilterSidebar />
              <button
                onClick={() => setShowMobileFilters(false)}
                className="w-full mt-12 h-16 rounded-[24px] bg-[#007aff] text-white text-[12px] font-black uppercase tracking-[0.2em] shadow-xl shadow-[#007aff]/30"
              >
                Apply Selection
              </button>
            </m.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
