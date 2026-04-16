import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link, useParams, useNavigate } from 'react-router-dom';
import SEO from '@/components/SEO';
import { useCart } from '../context/CartContext';
import {
  Search,
  ChevronDown,
  LayoutGrid,
  Heart,
  Loader2,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Filter,
  X,
  Zap,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../config';

export default function Shop() {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const { category: pathCategory } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16;

  const category = searchParams.get('category') || pathCategory || '';
  const sort = searchParams.get('sort') || 'newest';
  const search = searchParams.get('search') || '';
  const minPrice = searchParams.get('minPrice') || 0;
  const maxPrice = searchParams.get('maxPrice') || 5000;
  const activeBrand = searchParams.get('brand') || '';

  const brands = ['HP', 'Canon', 'Epson', 'Brother', 'Lexmark', 'Xerox', 'Samsung', 'Ricoh'];

  // Category to Image mapping for Hero
  const categoryHeroImages = {
    'laser-printers': '/banner/banner-6.jpg',
    'inkjet-printers': '/banner/banner-7.jpg',
    'all-in-one-printers': '/banner/banner-8.jpg',
    'default': '/banner/banner-2.jpg'
  };

  const currentCategoryObj = categories.find(c => c.slug === category);
  const heroTitle = currentCategoryObj ? currentCategoryObj.name : "Central Inventory";
  const heroImage = categoryHeroImages[category] || categoryHeroImages['default'];

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

  const clearFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) {
        return `/${imgs[0].replace(/\\/g, '/')}`;
      }
      return '/logo/fabicon.png';
    } catch {
      return '/logo/fabicon.png';
    }
  };

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const currentProducts = products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const FilterSidebar = () => (
    <div className="space-y-10">
      <div>
        <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#991B1B] mb-6">Categories</h4>
        <div className="space-y-1">
          <button
            onClick={() => updateFilter('category', '')}
            className={`w-full text-left px-4 py-2 rounded-xl text-[13px] font-bold transition-all uppercase  ${!category ? 'bg-red-50 text-[#991B1B]' : 'text-slate-400 hover:text-slate-900'}`}
          >
            All Systems
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => updateFilter('category', c.slug)}
              className={`w-full text-left px-4 py-2 rounded-xl text-[13px] font-bold transition-all capitalize  ${category === c.slug ? 'bg-red-50 text-[#991B1B]' : 'text-slate-400 hover:text-slate-900'}`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#991B1B] mb-6">Manufacturers</h4>
        <div className="grid grid-cols-2 gap-2">
          {brands.map((brand) => (
            <button
              key={brand}
              onClick={() => updateFilter('brand', activeBrand === brand ? '' : brand)}
              className={`px-3 py-2 rounded-xl text-[11px] font-bold border transition-all uppercase er ${activeBrand === brand ? 'bg-slate-900 border-slate-900 text-white' : 'border-slate-100 text-slate-400 hover:border-[#991B1B] hover:text-[#991B1B]'}`}
            >
              {brand}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#991B1B] mb-6">Budget Range</h4>
        <div className="space-y-4 px-2">
          <input
            type="range"
            min="0"
            max="5000"
            step="100"
            value={maxPrice}
            onChange={(e) => updateFilter('maxPrice', e.target.value)}
            className="w-full h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#991B1B]"
          />
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-widest">
            <span>$0</span>
            <span className="text-[#991B1B] font-bold">${maxPrice}</span>
          </div>
        </div>
      </div>

      <button
        onClick={clearFilters}
        className="w-full py-4 text-[11px] font-bold text-slate-300 hover:text-[#991B1B] transition-all uppercase tracking-widest border-t border-slate-50 pt-8"
      >
        Clear Filters
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <SEO title="Inventory | My Printing Buddy" />

      {/* --- DYNAMIC HERO SECTION --- */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-slate-900">
        <AnimatePresence mode="wait">
          <motion.div
            key={heroImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-0"
          >
            <img
              src={heroImage}
              alt={heroTitle}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          </motion.div>
        </AnimatePresence>

        <div className="max-w-[1600px] mx-auto px-6 relative z-10">
          <div className="max-w-2xl text-white">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 mb-4"
            >
              <div className="w-8 h-[2px] bg-[#991B1B]" />
              <span className="text-white font-bold text-[10px] tracking-[0.3em] uppercase">Hardware Manifest</span>
            </motion.div>
            <motion.h1
              key={heroTitle}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-5xl font-bold leading-tight  uppercase "
            >
              {heroTitle}.
            </motion.h1>
            <nav className="flex items-center gap-3 mt-8 text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span className="opacity-20">/</span>
              <Link to="/shop" className="hover:text-white transition-colors">Shop</Link>
              {category && (
                <>
                  <span className="opacity-20">/</span>
                  <span className="text-[#991B1B]">{category.replace('-', ' ')}</span>
                </>
              )}
            </nav>
          </div>
        </div>
      </section>

      <div className="max-w-[1600px] mx-auto px-6 py-12 md:py-16">
        <div className="flex flex-col lg:flex-row gap-16">

          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24">
              <FilterSidebar />
            </div>
          </aside>

          <main className="flex-1">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12 pb-8 border-b border-slate-50">
              <div className="relative w-full md:w-96 group">
                <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#991B1B] transition-colors" size={18} />
                <input
                  type="text"
                  placeholder="Search units..."
                  value={search}
                  onChange={(e) => updateFilter('search', e.target.value)}
                  className="w-full h-12 pl-8 pr-4 bg-transparent border-b border-slate-100 focus:border-[#991B1B] outline-none text-sm font-bold uppercase  transition-all"
                />
              </div>

              <div className="flex items-center gap-6 w-full md:w-auto">
                <button
                  onClick={() => setShowMobileFilters(true)}
                  className="lg:hidden flex-1 h-12 border border-slate-100 rounded-2xl flex items-center justify-center gap-3 text-[11px] font-bold uppercase tracking-widest text-slate-900"
                >
                  <Filter size={16} /> Filters
                </button>

                <div className="relative w-full md:w-56 group">
                  <select
                    value={sort}
                    onChange={(e) => updateFilter('sort', e.target.value)}
                    className="w-full h-12 appearance-none bg-transparent border-b border-slate-100 px-0 text-[11px] font-bold uppercase tracking-widest text-slate-900 outline-none cursor-pointer focus:border-[#991B1B]"
                  >
                    <option value="newest">Sort: Newest</option>
                    <option value="price_low">Sort: Price Low</option>
                    <option value="price_high">Sort: Price High</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none group-hover:text-[#991B1B]" />
                </div>
              </div>
            </div>

            {loading ? (
              <div className="py-32 text-center">
                <Loader2 className="animate-spin text-[#991B1B] mx-auto mb-6" size={32} />
                <p className="text-[11px] font-bold text-slate-300 uppercase tracking-widest">Updating Inventory...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="py-32 text-center border border-slate-50 rounded-[40px]">
                <h3 className="text-xl font-bold text-slate-900 mb-2 lowercase">no systems found.</h3>
                <p className="text-slate-400 text-sm font-medium mb-8">Adjust your parameters and retry.</p>
                <button onClick={clearFilters} className="text-[#991B1B] font-bold text-[11px] uppercase tracking-widest hover:underline transition-all">
                  Reset System
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
                {currentProducts.map((p, i) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (i % 4) * 0.05 }}
                    className="group flex flex-col h-full bg-white border border-slate-100 rounded-[32px] p-4 hover:shadow-2xl hover:shadow-slate-200/50 hover:border-white transition-all duration-500"
                  >
                    <div className="relative aspect-square mb-6 bg-[#FBFBFB] rounded-[24px] flex items-center justify-center p-6 overflow-hidden group-hover:bg-white transition-colors duration-500">
                      <Link to={`/product/${p.slug}`} className="w-full h-full flex items-center justify-center">
                        <img
                          src={getImagePath(p.images)}
                          alt={p.name}
                          className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700"
                        />
                      </Link>
                      <button
                        onClick={() => toggleWishlist(p)}
                        className={`absolute top-4 right-4 w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 ${isInWishlist(p.id) ? 'text-[#991B1B] opacity-100' : 'text-slate-300 hover:text-[#991B1B]'}`}
                      >
                        <Heart size={16} fill={isInWishlist(p.id) ? 'currentColor' : 'none'} />
                      </button>
                    </div>

                    <div className="flex flex-col flex-1 px-1">
                      <Link to={`/product/${p.slug}`}>
                        <h3 className="text-[13px] font-bold text-slate-800 leading-snug line-clamp-2 mb-3 group-hover:text-[#991B1B] transition-colors uppercase ">
                          {p.name}
                        </h3>
                      </Link>

                      <div className="mt-auto flex items-center justify-between gap-2 pt-2">
                        <span className="text-[16px] font-bold text-slate-900 er">${Number(p.price).toLocaleString()}</span>
                        <button
                          onClick={() => addToCart(p)}
                          className="h-10 w-10 rounded-xl bg-slate-900 text-white flex items-center justify-center hover:bg-[#991B1B] active:scale-90 transition-all shadow-sm"
                        >
                          <ShoppingCart size={16} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {!loading && totalPages > 1 && (
              <div className="mt-24 flex items-center justify-center gap-4">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="w-12 h-12 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:text-[#991B1B] hover:border-[#991B1B] disabled:opacity-20 transition-all"
                >
                  <ChevronLeft size={20} />
                </button>
                <div className="flex items-center gap-3">
                  {[...Array(totalPages)].map((_, i) => {
                    const page = i + 1;
                    if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`text-xs font-bold uppercase tracking-widest transition-all ${currentPage === page ? 'text-[#991B1B] scale-125 underline decoration-2' : 'text-slate-300 hover:text-slate-900'}`}
                        >
                          {page < 10 ? `0${page}` : page}
                        </button>
                      );
                    }
                    if (page === currentPage - 2 || page === currentPage + 2) return <span key={page} className="text-slate-100 text-[10px]">•••</span>;
                    return null;
                  })}
                </div>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="w-12 h-12 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:text-[#991B1B] hover:border-[#991B1B] disabled:opacity-20 transition-all"
                >
                  <ChevronRight size={20} />
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
              className="fixed top-0 right-0 bottom-0 w-full max-w-[320px] bg-white z-[1002] p-8 shadow-2xl overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-12">
                <h2 className="text-xl font-bold uppercase  ">Filters</h2>
                <button onClick={() => setShowMobileFilters(false)} className="text-slate-300 hover:text-[#991B1B]">
                  <X size={24} />
                </button>
              </div>
              <FilterSidebar />
              <button
                onClick={() => setShowMobileFilters(false)}
                className="w-full mt-12 py-4 bg-slate-900 text-white text-[11px] font-bold uppercase tracking-widest rounded-2xl hover:bg-[#991B1B] transition-all"
              >
                Apply Parameters
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
