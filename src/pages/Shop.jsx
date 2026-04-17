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
  Zap,
  Check,
  ShoppingCart
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../config';

export default function Shop() {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
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

  const currentCategoryObj = categories.find(c => c.slug === category);
  const heroTitle = currentCategoryObj ? currentCategoryObj.name : "All Hardware";

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
          filtered = filtered.filter(p => Number(p.price) >= minPrice && Number(p.price) <= maxPrice);
          if (activeBrand) {
            filtered = filtered.filter(p => p.name.toLowerCase().includes(activeBrand.toLowerCase()));
          }
          setProducts(filtered);
          setCurrentPage(1);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [searchParams, minPrice, maxPrice, activeBrand]);

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
      return Array.isArray(imgs) && imgs.length > 0 ? `/${imgs[0].replace(/\\/g, '/')}` : '/logo/fabicon.png';
    } catch { return '/logo/fabicon.png'; }
  };

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const currentProducts = products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const FilterSidebar = () => (
    <div className="space-y-10">
      <div>
        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-6">Categories</h4>
        <div className="flex flex-col gap-3">
          <button
            onClick={() => updateFilter('category', '')}
            className={`text-left text-[13px] transition-all ${!category ? 'text-[#F54900] font-bold' : 'text-slate-500 hover:text-slate-900'}`}
          >
            All Systems
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => updateFilter('category', c.slug)}
              className={`text-left text-[13px] transition-all capitalize ${category === c.slug ? 'text-[#F54900] font-bold' : 'text-slate-500 hover:text-slate-900'}`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-6">Brands</h4>
        <div className="flex flex-col gap-3">
          {brands.map((brand) => (
            <button
              key={brand}
              onClick={() => updateFilter('brand', activeBrand === brand ? '' : brand)}
              className={`text-left text-[13px] transition-all ${activeBrand === brand ? 'text-[#F54900] font-bold' : 'text-slate-500 hover:text-slate-900'}`}
            >
              {brand}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-6">Price Range</h4>
        <div className="space-y-4">
          <input
            type="range"
            min="0"
            max="5000"
            step="100"
            value={maxPrice}
            onChange={(e) => updateFilter('maxPrice', e.target.value)}
            className="w-full h-px bg-slate-200 appearance-none cursor-pointer accent-[#F54900]"
          />
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
            <span>$0</span>
            <span className="text-slate-900 font-bold">${maxPrice}</span>
          </div>
        </div>
      </div>

      <button
        onClick={clearFilters}
        className="text-[10px] font-bold text-slate-400 hover:text-[#F54900] transition-all uppercase tracking-widest"
      >
        Clear All
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <SEO title="Inventory | My Printer Land" />

      {/* --- MINIMAL HEADER --- */}
      <div className="max-w-[1600px] mx-auto px-6 pt-16 md:pt-24 pb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <Zap size={14} className="text-[#F54900]" fill="currentColor" />
              <span className="text-[11px] font-bold text-[#F54900] uppercase tracking-[0.4em]">Inventory</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-light text-slate-900 leading-tight">
              {heroTitle} <span className="text-slate-300">selection.</span>
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 py-12 border-t border-slate-50">
        <div className="flex flex-col lg:flex-row gap-16">

          <aside className="hidden lg:block w-52 shrink-0">
            <div className="sticky top-24">
              <FilterSidebar />
            </div>
          </aside>

          <main className="flex-1">
            {/* Minimal Toolbar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
              <div className="relative w-full md:w-80 group">
                <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => updateFilter('search', e.target.value)}
                  className="w-full h-10 pl-8 bg-transparent border-b border-slate-100 focus:border-[#F54900] outline-none text-sm transition-all"
                />
              </div>

              <div className="flex items-center gap-8 w-full md:w-auto">
                <button
                  onClick={() => setShowMobileFilters(true)}
                  className="lg:hidden flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-slate-900"
                >
                  <Filter size={14} /> Filters
                </button>

                <div className="relative group">
                  <select
                    value={sort}
                    onChange={(e) => updateFilter('sort', e.target.value)}
                    className="appearance-none bg-transparent pr-6 text-[11px] font-bold uppercase tracking-widest text-slate-500 outline-none cursor-pointer hover:text-slate-900 transition-colors"
                  >
                    <option value="newest">Newest</option>
                    <option value="price_low">Price Low</option>
                    <option value="price_high">Price High</option>
                  </select>
                  <ChevronDown size={12} className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" />
                </div>
              </div>
            </div>

            {loading ? (
              <div className="py-32 text-center">
                <Loader2 className="animate-spin text-slate-200 mx-auto" size={24} />
              </div>
            ) : products.length === 0 ? (
              <div className="py-32 text-center border border-dashed border-slate-100 rounded-xl">
                <p className="text-slate-400 text-sm font-medium">No results found for your filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
                {currentProducts.map((p, i) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: (i % 4) * 0.05 }}
                    className="group flex flex-col"
                  >
                    <div className="relative aspect-[4/5] mb-4 bg-[#f8f8f8] rounded-xl overflow-hidden flex items-center justify-center p-8 transition-all duration-500 group-hover:bg-white group-hover:shadow-xl group-hover:shadow-slate-100">
                      <Link to={`/product/${p.slug}`} className="w-full h-full flex items-center justify-center">
                        <img
                          src={getImagePath(p.images)}
                          alt={p.name}
                          className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-700"
                        />
                      </Link>
                      <button
                        onClick={() => toggleWishlist(p)}
                        className={`absolute top-4 right-4 w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 ${isInWishlist(p.id) ? 'text-[#F54900] opacity-100' : 'text-slate-300'}`}
                      >
                        <Heart size={14} fill={isInWishlist(p.id) ? 'currentColor' : 'none'} />
                      </button>

                      <div className="absolute bottom-4 left-4 right-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                        <button
                          onClick={() => handleAddToCart(p)}
                          disabled={addedItems[p.id]}
                          className={`w-full h-10 rounded-lg text-[10px] font-bold uppercase tracking-widest shadow-sm flex items-center justify-center gap-2 transition-all ${addedItems[p.id] ? "bg-emerald-500 text-white" : "bg-white text-slate-900 hover:bg-slate-900 hover:text-white"}`}
                        >
                          {addedItems[p.id] ? <Check size={14} /> : "Add to Cart"}
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col px-1">
                      <Link to={`/product/${p.slug}`}>
                        <h3 className="text-[13px] font-medium text-slate-700 leading-snug line-clamp-2 mb-1.5 hover:text-[#F54900] transition-colors">
                          {p.name}
                        </h3>
                      </Link>
                      <div className="flex items-center justify-between">
                        <span className="text-[14px] font-bold text-slate-900">${Number(p.price).toLocaleString()}</span>
                        <span className="text-[9px] font-medium text-slate-300 uppercase tracking-tighter">REF_{p.id}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {!loading && totalPages > 1 && (
              <div className="mt-20 flex items-center justify-center gap-6">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="w-8 h-8 border border-slate-100 flex items-center justify-center text-slate-300 hover:text-[#F54900] disabled:opacity-20 transition-all"
                >
                  <ChevronLeft size={16} />
                </button>
                <div className="flex items-center gap-4">
                  {[...Array(totalPages)].map((_, i) => {
                    const page = i + 1;
                    if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`text-[11px] font-bold transition-all ${currentPage === page ? 'text-[#F54900] underline' : 'text-slate-300 hover:text-slate-900'}`}
                        >
                          {page}
                        </button>
                      );
                    }
                    return null;
                  })}
                </div>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="w-8 h-8 border border-slate-100 flex items-center justify-center text-slate-300 hover:text-[#F54900] disabled:opacity-20 transition-all"
                >
                  <ChevronRight size={16} />
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
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowMobileFilters(false)} className="fixed inset-0 bg-black/30 z-[1001] backdrop-blur-sm" />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed top-0 right-0 bottom-0 w-full max-w-[280px] bg-white z-[1002] p-8 shadow-2xl overflow-y-auto">
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-xs font-bold uppercase tracking-widest">Filters</h2>
                <button onClick={() => setShowMobileFilters(false)} className="text-slate-300 hover:text-slate-900"><X size={20} /></button>
              </div>
              <FilterSidebar />
              <button onClick={() => setShowMobileFilters(false)} className="w-full mt-12 py-3 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg">Apply</button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
