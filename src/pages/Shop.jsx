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
      <div className="bg-white border border-slate-100 p-8">
        <h4 className="text-[14px] font-bold uppercase tracking-widest text-slate-900 mb-6">Categories</h4>
        <div className="space-y-1">
          <button
            onClick={() => updateFilter('category', '')}
            className={`w-full text-left px-4 py-3 text-[13px] font-semibold transition-all ${!category
              ? 'bg-[#05718A] text-white'
              : 'text-slate-500 hover:bg-slate-50'
              }`}
          >
            All Products
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => updateFilter('category', c.slug)}
              className={`w-full text-left px-4 py-3 text-[13px] font-semibold transition-all ${category === c.slug
                ? 'bg-[#05718A] text-white'
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
        className="w-full bg-slate-900 text-white py-4 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-black transition-all"
      >
        Reset Filters
      </button>
    </div>
  );

  const ProductCard = ({ p }) => {
    const isWishlisted = isInWishlist(p.id);
    const isCompared = isInCompare(p.id);
    const isAdded = addedItems[p.id];

    return (
      <div className="group flex flex-col bg-white border border-slate-100 transition-all hover:border-[#05718A]/30">
        <div className="relative aspect-square bg-white flex items-center justify-center p-8 overflow-hidden">
          <Link to={`/product/${p.slug}`} className="w-full h-full flex items-center justify-center">
            <img
              src={getImagePath(p.images)}
              alt={p.name}
              className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
              onError={(e) => { e.currentTarget.src = "/logo/fabicon.avif"; }}
            />
          </Link>

          {/* Overlays */}
          <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
            <button
              onClick={() => toggleWishlist(p)}
              className={`w-9 h-9 rounded-full bg-white border border-slate-100 flex items-center justify-center transition-all shadow-sm ${isWishlisted ? 'text-red-500' : 'text-slate-400 hover:text-red-500'}`}
            >
              <Heart size={16} fill={isWishlisted ? 'currentColor' : 'none'} />
            </button>
            <Link
              to={`/product/${p.slug}`}
              className="w-9 h-9 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-[#05718A] transition-all shadow-sm"
            >
              <Eye size={16} />
            </Link>
          </div>
        </div>

        <div className="p-6 flex flex-col flex-1 border-t border-slate-50">
          <Link to={`/product/${p.slug}`} className="mb-2">
            <h3 className="text-[15px] font-bold text-slate-800 line-clamp-2 leading-tight h-10 hover:text-[#05718A] transition-colors">
              {p.name}
            </h3>
          </Link>

          <div className="mt-4 mb-6">
            <span className="text-xl font-black text-[#05718A] tracking-tighter">
              ${Number(p.price).toLocaleString()}
            </span>
          </div>

          <div className="space-y-2 mt-auto">
            <button
              onClick={() => handleAddToCart(p)}
              disabled={isAdded}
              className={`w-full h-11 rounded-full flex items-center justify-center gap-2 font-bold text-[12px] uppercase tracking-widest transition-all ${isAdded
                ? 'bg-emerald-500 text-white'
                : 'bg-[#05718A] text-white hover:bg-black'
                }`}
            >
              {isAdded ? <Check size={16} /> : <ShoppingCart size={16} />}
              {isAdded ? 'Added' : 'Quick Add'}
            </button>
            <button
              onClick={() => toggleCompare(p)}
              className={`w-full h-11 rounded-full border font-bold text-[12px] uppercase tracking-widest transition-all ${isCompared
                ? 'bg-blue-50 border-blue-200 text-[#05718A]'
                : 'border-slate-200 text-slate-600 hover:border-[#05718A] hover:text-[#05718A]'}`}
            >
              {isCompared ? 'Compared' : 'Compare'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-slate-900 pb-20">
      <SEO title="Shop Collections | Inklivo" />

      {/* Hero Header */}
      <div className="bg-white border-b border-slate-200 pt-16 pb-12">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-1 bg-[#05718A]"></div>
                <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#05718A]">Professional Gear</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 leading-none">
                {heroTitle}
              </h1>
              <p className="text-slate-500 max-w-xl text-lg tracking-tight">
                High-performance printing hardware curated for modern office environments and home workstations.
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-100 px-8 py-5 flex items-center gap-6">
              <div className="text-right">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Available</p>
                <p className="text-3xl font-black text-slate-900 leading-none tracking-tighter">{products.length} Units</p>
              </div>
              <LayoutGrid size={24} className="text-[#05718A]" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 md:px-8 mt-12">
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
            <div className="bg-white border border-slate-200 p-4 mb-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="relative w-full md:w-[400px]">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="Search by model or series..."
                  value={search}
                  onChange={(e) => updateFilter('search', e.target.value)}
                  className="w-full h-12 bg-slate-50 border border-slate-100 pl-12 pr-4 text-sm outline-none focus:bg-white focus:border-[#05718A] transition-all"
                />
              </div>

              <div className="flex items-center gap-4 w-full md:w-auto">
                <button
                  onClick={() => setShowMobileFilters(true)}
                  className="lg:hidden flex-1 inline-flex items-center justify-center gap-2 bg-[#05718A] text-white h-12 text-[11px] font-bold uppercase tracking-widest"
                >
                  <SlidersHorizontal size={16} /> Filters
                </button>

                <div className="relative w-full md:w-56">
                  <select
                    value={sort}
                    onChange={(e) => updateFilter('sort', e.target.value)}
                    className="w-full appearance-none h-12 bg-white border border-slate-200 pl-4 pr-10 text-[11px] font-bold uppercase tracking-widest text-slate-700 outline-none focus:border-[#05718A]"
                  >
                    <option value="newest">Sort: Latest Arrivals</option>
                    <option value="price_low">Price: Low to High</option>
                    <option value="price_high">Price: High to Low</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="aspect-[3/4] bg-white border border-slate-100 animate-pulse"></div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="py-32 text-center bg-white border border-dashed border-slate-200">
                <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em]">
                  No hardware units match your criteria.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {currentProducts.map((p) => (
                  <ProductCard key={p.id} p={p} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {!loading && totalPages > 1 && (
              <div className="mt-20 flex items-center justify-center gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="w-12 h-12 border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:text-[#05718A] disabled:opacity-30"
                >
                  <ChevronLeft size={20} />
                </button>
                {[...Array(totalPages)].map((_, i) => {
                  const page = i + 1;
                  if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-12 h-12 text-[13px] font-black transition-all ${currentPage === page ? 'bg-[#05718A] text-white' : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-50'}`}
                      >
                        {page}
                      </button>
                    );
                  }
                  return <span key={i} className="px-2">...</span>;
                })}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="w-12 h-12 border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:text-[#05718A] disabled:opacity-30"
                >
                  <ChevronRight size={20} />
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
              className="fixed inset-0 bg-black/60 z-[2000] backdrop-blur-sm"
            />
            <m.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-[320px] bg-white z-[2001] p-8 shadow-2xl overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-[14px] font-black uppercase tracking-widest text-slate-900">Refine Selection</h2>
                <button onClick={() => setShowMobileFilters(false)} className="w-10 h-10 flex items-center justify-center text-slate-500">
                  <X size={24} />
                </button>
              </div>
              <FilterSidebar />
              <button
                onClick={() => setShowMobileFilters(false)}
                className="w-full mt-12 h-14 bg-[#05718A] text-white text-[11px] font-black uppercase tracking-[0.2em]"
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
