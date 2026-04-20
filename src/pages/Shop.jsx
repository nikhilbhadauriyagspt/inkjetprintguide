import { useState, useEffect } from 'react';
import { useSearchParams, Link, useParams } from 'react-router-dom';
import SEO from '@/components/SEO';
import { useCart } from '../context/CartContext';
import {
  Search,
  ChevronDown,
  Heart,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Filter,
  X,
  Check,
  ShoppingCart,
  Package,
  SlidersHorizontal,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../config';

export default function Shop() {
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    toggleCompare,
    isInCompare,
  } = useCart();

  const { category: pathCategory } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [addedItems, setAddedItems] = useState({});

  const itemsPerPage = 16;

  const category = searchParams.get('category') || pathCategory || '';
  const sort = searchParams.get('sort') || 'newest';
  const search = searchParams.get('search') || '';
  const minPrice = searchParams.get('minPrice') || 0;
  const maxPrice = searchParams.get('maxPrice') || 5000;
  const activeBrand = searchParams.get('brand') || '';

  const brands = ['HP', 'Canon', 'Epson', 'Brother', 'Lexmark', 'Xerox', 'Samsung', 'Ricoh'];

  const currentCategoryObj = categories.find((c) => c.slug === category);
  const heroTitle = currentCategoryObj ? currentCategoryObj.name : 'All Hardware';

  useEffect(() => {
    fetch(`${API_BASE_URL}/categories`)
      .then((res) => res.json())
      .then((d) => {
        if (d.status === 'success') {
          const printers = d.data.find((c) => c.slug === 'printers' || c.id === 46);
          setCategories(printers ? printers.children : []);
        }
      });
  }, []);

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

          filtered = filtered.filter(
            (p) => Number(p.price) >= minPrice && Number(p.price) <= maxPrice
          );

          if (activeBrand) {
            filtered = filtered.filter((p) =>
              p.name.toLowerCase().includes(activeBrand.toLowerCase())
            );
          }

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
  }, [searchParams, minPrice, maxPrice, activeBrand, sort]);

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

  const clearFilters = () => setSearchParams(new URLSearchParams());

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      return Array.isArray(imgs) && imgs.length > 0
        ? `/${imgs[0].replace(/\\/g, '/')}`
        : '/logo/fabicon.png';
    } catch {
      return '/logo/fabicon.png';
    }
  };

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const currentProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const FilterSidebar = () => (
    <div className="space-y-8">
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <h4 className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#2f5cab] mb-5">
          Categories
        </h4>

        <div className="flex flex-col gap-2">
          <button
            onClick={() => updateFilter('category', '')}
            className={`text-left px-3 py-2.5 rounded-xl text-[13px] transition-all ${!category
              ? 'bg-[#2f5cab]/10 text-[#2f5cab] font-semibold'
              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
          >
            All Systems
          </button>

          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => updateFilter('category', c.slug)}
              className={`text-left px-3 py-2.5 rounded-xl text-[13px] transition-all ${category === c.slug
                ? 'bg-[#2f5cab]/10 text-[#2f5cab] font-semibold'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <h4 className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#2f5cab] mb-5">
          Brands
        </h4>

        <div className="flex flex-col gap-2">
          {brands.map((brand) => (
            <button
              key={brand}
              onClick={() => updateFilter('brand', activeBrand === brand ? '' : brand)}
              className={`text-left px-3 py-2.5 rounded-xl text-[13px] transition-all ${activeBrand === brand
                ? 'bg-[#2f5cab]/10 text-[#2f5cab] font-semibold'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
            >
              {brand}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <h4 className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#2f5cab] mb-5">
          Price Range
        </h4>

        <div className="space-y-4">
          <input
            type="range"
            min="0"
            max="5000"
            step="100"
            value={maxPrice}
            onChange={(e) => updateFilter('maxPrice', e.target.value)}
            className="w-full accent-[#2f5cab]"
          />
          <div className="flex items-center justify-between text-[12px]">
            <span className="text-slate-400">$0</span>
            <span className="font-semibold text-slate-900">${maxPrice}</span>
          </div>
        </div>
      </div>

      <button
        onClick={clearFilters}
        className="w-full rounded-2xl border border-slate-200 bg-white py-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-slate-500 hover:text-[#2f5cab] hover:border-[#2f5cab]/30 transition-all"
      >
        Clear All
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f6f8fb] text-slate-900">
      <SEO title="Inventory | Print Mora" />

      <div className="max-w-[1800px] mx-auto px-4 md:px-6 pt-12 md:pt-16 pb-8">
        <div className="rounded-[28px] border border-slate-200 bg-white px-6 md:px-8 py-8 md:py-10 shadow-[0_10px_40px_rgba(15,23,42,0.04)]">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <span className="inline-flex items-center rounded-full bg-[#2f5cab]/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#2f5cab]">
                Shop Collection
              </span>
              <h1 className="mt-4 text-3xl md:text-5xl font-semibold leading-tight text-slate-900">
                {heroTitle}
              </h1>
              <p className="mt-3 text-sm md:text-base text-slate-500">
                Browse premium printers and accessories with a cleaner shopping experience.
              </p>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 self-start lg:self-auto">
              <span className="text-sm text-slate-500">Available Products</span>
              <span className="text-lg font-semibold text-slate-900">{products.length}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-4 md:px-6 pb-16">
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-10">
          <aside className="hidden lg:block w-[280px] shrink-0">
            <div className="sticky top-24">
              <FilterSidebar />
            </div>
          </aside>

          <main className="flex-1">
            <div className="mb-8 rounded-[24px] border border-slate-200 bg-white px-4 md:px-6 py-4 shadow-[0_8px_30px_rgba(15,23,42,0.03)]">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="relative w-full md:w-[340px]">
                  <Search
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    size={17}
                  />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => updateFilter('search', e.target.value)}
                    className="w-full h-12 rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none focus:border-[#2f5cab] focus:bg-white transition-all"
                  />
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                  <button
                    onClick={() => setShowMobileFilters(true)}
                    className="lg:hidden inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 h-11 text-[12px] font-semibold uppercase tracking-[0.14em] text-slate-700"
                  >
                    <SlidersHorizontal size={15} />
                    Filters
                  </button>

                  <div className="relative">
                    <select
                      value={sort}
                      onChange={(e) => updateFilter('sort', e.target.value)}
                      className="appearance-none h-11 rounded-2xl border border-slate-200 bg-white pl-4 pr-10 text-[12px] font-semibold uppercase tracking-[0.14em] text-slate-700 outline-none focus:border-[#2f5cab]"
                    >
                      <option value="newest">Newest</option>
                      <option value="price_low">Price Low</option>
                      <option value="price_high">Price High</option>
                    </select>
                    <ChevronDown
                      size={14}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="rounded-[28px] border border-slate-200 bg-white py-24 text-center">
                <Loader2 className="animate-spin text-slate-300 mx-auto" size={28} />
              </div>
            ) : products.length === 0 ? (
              <div className="rounded-[28px] border border-dashed border-slate-200 bg-white py-24 text-center">
                <p className="text-slate-400 text-sm font-medium">
                  No results found for your filters.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
                {currentProducts.map((p, i) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (i % 4) * 0.05 }}
                    className="group rounded-[24px] border border-slate-200 bg-white p-3 md:p-4 shadow-[0_10px_25px_rgba(15,23,42,0.03)] hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)] transition-all duration-300 flex flex-col"
                  >
                    <div className="relative aspect-[4/4.4] mb-4 rounded-[20px] bg-[#f8fafc] overflow-hidden flex items-center justify-center p-5">
                      <Link
                        to={`/product/${p.slug}`}
                        className="w-full h-full flex items-center justify-center"
                      >
                        <img
                          src={getImagePath(p.images)}
                          alt={p.name}
                          className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                        />
                      </Link>

                      <div className="absolute top-3 right-3 flex flex-col gap-2">
                        <button
                          onClick={() => toggleWishlist(p)}
                          className={`w-9 h-9 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center transition-all ${isInWishlist(p.id)
                            ? 'text-[#2f5cab]'
                            : 'text-slate-400 hover:text-[#2f5cab]'
                            }`}
                        >
                          <Heart
                            size={15}
                            fill={isInWishlist(p.id) ? 'currentColor' : 'none'}
                          />
                        </button>

                        <button
                          onClick={() => toggleCompare(p)}
                          className={`w-9 h-9 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center transition-all ${isInCompare(p.id)
                            ? 'text-[#2f5cab]'
                            : 'text-slate-400 hover:text-[#2f5cab]'
                            }`}
                          title="Add to Compare"
                        >
                          <Package size={15} />
                        </button>
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                        <button
                          onClick={() => handleAddToCart(p)}
                          disabled={addedItems[p.id]}
                          className={`w-full h-11 rounded-2xl text-[11px] font-semibold uppercase tracking-[0.14em] flex items-center justify-center gap-2 transition-all ${addedItems[p.id]
                            ? 'bg-emerald-500 text-white'
                            : 'bg-[#2f5cab] text-white hover:bg-[#264d93]'
                            }`}
                        >
                          {addedItems[p.id] ? <Check size={15} /> : <ShoppingCart size={15} />}
                          {addedItems[p.id] ? 'Added' : 'Add to Cart'}
                        </button>
                      </div>
                    </div>

                    <div className="px-1 flex flex-col flex-1">
                      <Link to={`/product/${p.slug}`}>
                        <h3 className="text-[13px] md:text-[14px] font-medium text-slate-700 leading-6 line-clamp-2 mb-2 hover:text-[#2f5cab] transition-colors min-h-[48px]">
                          {p.name}
                        </h3>
                      </Link>

                      <div className="mt-auto flex items-center justify-between gap-3">
                        <span className="text-[15px] md:text-[16px] font-semibold text-slate-900">
                          ₹{Number(p.price).toLocaleString()}
                        </span>
                        <span className="text-[10px] font-medium text-slate-300 uppercase tracking-[0.1em]">
                          REF_{p.id}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {!loading && totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-3 md:gap-4 flex-wrap">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="w-11 h-11 rounded-2xl border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:text-[#2f5cab] disabled:opacity-30 transition-all"
                >
                  <ChevronLeft size={18} />
                </button>

                {[...Array(totalPages)].map((_, i) => {
                  const page = i + 1;
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`min-w-[44px] h-11 px-3 rounded-2xl text-[12px] font-semibold transition-all ${currentPage === page
                          ? 'bg-[#2f5cab] text-white'
                          : 'bg-white border border-slate-200 text-slate-500 hover:text-slate-900'
                          }`}
                      >
                        {page}
                      </button>
                    );
                  }
                  return null;
                })}

                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="w-11 h-11 rounded-2xl border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:text-[#2f5cab] disabled:opacity-30 transition-all"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      <AnimatePresence>
        {showMobileFilters && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileFilters(false)}
              className="fixed inset-0 bg-black/40 z-[1001] backdrop-blur-sm"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-[320px] bg-[#f6f8fb] z-[1002] p-5 shadow-2xl overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-[13px] font-semibold uppercase tracking-[0.18em] text-slate-900">
                  Filters
                </h2>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500"
                >
                  <X size={18} />
                </button>
              </div>

              <FilterSidebar />

              <button
                onClick={() => setShowMobileFilters(false)}
                className="w-full mt-6 h-12 rounded-2xl bg-[#2f5cab] text-white text-[12px] font-semibold uppercase tracking-[0.16em]"
              >
                Apply
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}