import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link, useParams, useNavigate } from 'react-router-dom';
import SEO from '@/components/SEO';
import { useCart } from '../context/CartContext';
import {
  Search,
  ChevronDown,
  LayoutGrid,
  List,
  Heart,
  Loader2,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Plus,
  Filter,
  X,
  Star,
  SlidersHorizontal
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
  const itemsPerPage = 18;

  const category = searchParams.get('category') || pathCategory || '';
  const sort = searchParams.get('sort') || 'newest';
  const search = searchParams.get('search') || '';
  const minPrice = searchParams.get('minPrice') || 0;
  const maxPrice = searchParams.get('maxPrice') || 5000;
  const activeBrand = searchParams.get('brand') || '';

  const brands = ['HP', 'Canon', 'Epson', 'Brother', 'Lexmark', 'Xerox', 'Samsung', 'Ricoh'];

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
          setCurrentPage(1); // Reset to first page on filter change
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

  // Pagination Logic
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const currentProducts = products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const FilterSidebar = () => (
    <div className="space-y-8 pb-10">
      {/* Categories */}
      <div>
        <h3 className="text-[14px] font-bold text-foreground mb-4 flex items-center gap-2">
          <LayoutGrid size={16} className="text-blue-600" />
          Categories
        </h3>
        <div className="space-y-1">
          <button
            onClick={() => updateFilter('category', '')}
            className={`w-full text-left px-3 py-1.5 rounded-lg text-[13px] font-medium transition-all ${!category ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            All Categories
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => updateFilter('category', c.slug)}
              className={`w-full text-left px-3 py-1.5 rounded-lg text-[13px] font-medium transition-all capitalize ${category === c.slug ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div>
        <h3 className="text-[14px] font-bold text-foreground mb-4 flex items-center gap-2">
          <Star size={16} className="text-blue-600" />
          Brands
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {brands.map((brand) => (
            <button
              key={brand}
              onClick={() => updateFilter('brand', activeBrand === brand ? '' : brand)}
              className={`px-2 py-1.5 rounded-lg text-[11px] font-bold border transition-all ${activeBrand === brand ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-200 text-gray-600 hover:border-blue-600'}`}
            >
              {brand}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-[14px] font-bold text-foreground mb-4 flex items-center gap-2">
          <SlidersHorizontal size={16} className="text-blue-600" />
          Price Range
        </h3>
        <div className="space-y-4 px-2">
          <input
            type="range"
            min="0"
            max="5000"
            step="100"
            value={maxPrice}
            onChange={(e) => updateFilter('maxPrice', e.target.value)}
            className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex items-center justify-between text-[12px] font-bold text-gray-600">
            <span>$0</span>
            <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">${maxPrice}</span>
          </div>
        </div>
      </div>

      <button
        onClick={clearFilters}
        className="w-full py-2.5 border border-dashed border-gray-300 rounded-xl text-[11px] font-bold text-gray-500 hover:border-blue-600 hover:text-blue-600 transition-all uppercase tracking-widest"
      >
        Clear All Filters
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-['Rubik'] text-foreground">
      <SEO title="Shop | Printingmania" />

      {/* --- Breadcrumbs --- */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1800px] mx-auto px-4 md:px-10 py-3">
          <nav className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <ChevronRight size={10} />
            <span className="text-gray-900">Shop</span>
            {category && (
              <>
                <ChevronRight size={10} />
                <span className="text-blue-600 capitalize">{category.replace('-', ' ')}</span>
              </>
            )}
          </nav>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-4 md:px-10 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* --- LEFT SIDEBAR (Desktop) --- */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto scrollbar-hide">
              <FilterSidebar />
            </div>
          </aside>

          {/* --- MAIN CONTENT --- */}
          <main className="flex-1">
            
            {/* Toolbar */}
            <div className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="relative w-full md:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search in catalog..."
                  value={search}
                  onChange={(e) => updateFilter('search', e.target.value)}
                  className="w-full h-10 pl-11 pr-4 bg-gray-50 border border-gray-200 rounded-xl text-[13px] focus:bg-white focus:border-blue-600 outline-none transition-all"
                />
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto">
                <button 
                  onClick={() => setShowMobileFilters(true)}
                  className="lg:hidden flex-1 h-10 bg-white border border-gray-200 rounded-xl flex items-center justify-center gap-2 text-[13px] font-bold text-gray-700"
                >
                  <Filter size={16} /> Filters
                </button>
                
                <div className="relative flex-1 md:w-40">
                  <select
                    value={sort}
                    onChange={(e) => updateFilter('sort', e.target.value)}
                    className="w-full h-10 appearance-none bg-white border border-gray-200 rounded-xl px-4 text-[13px] font-bold text-gray-700 outline-none cursor-pointer focus:border-blue-600"
                  >
                    <option value="newest">Newest</option>
                    <option value="price_low">Price: Low</option>
                    <option value="price_high">Price: High</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Results Info */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">
                {category ? category.replace('-', ' ') : 'All Products'} 
                <span className="text-gray-400 text-[13px] font-medium ml-2">({products.length} items)</span>
              </h2>
            </div>

            {/* Grid - Denser for more products */}
            {loading ? (
              <div className="py-20 text-center">
                <Loader2 className="animate-spin text-blue-600 mx-auto mb-4" size={32} />
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Loading...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="py-20 text-center bg-white rounded-3xl border border-dashed border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-2">No products found</h3>
                <button onClick={clearFilters} className="text-blue-600 font-bold text-sm hover:underline">Reset All Filters</button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 md:gap-3">
                {currentProducts.map((p) => (
                  <div key={p.id} className="group bg-white rounded-xl p-2 md:p-3 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300">
                    {/* Image */}
                    <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden mb-2">
                      <Link to={`/product/${p.slug}`} className="w-full h-full flex items-center justify-center p-2">
                        <img
                          src={getImagePath(p.images)}
                          alt={p.name}
                          className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110"
                        />
                      </Link>
                      <button
                        onClick={() => toggleWishlist(p)}
                        className={`absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-white/80 shadow flex items-center justify-center transition-all ${isInWishlist(p.id) ? 'text-blue-600' : 'text-gray-400 hover:text-blue-600'}`}
                      >
                        <Heart size={12} fill={isInWishlist(p.id) ? 'currentColor' : 'none'} />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="space-y-1">
                      <Link to={`/product/${p.slug}`}>
                        <h3 className="text-[11px] font-bold text-gray-900 leading-tight line-clamp-2 min-h-[28px] group-hover:text-blue-600 transition-colors">
                          {p.name}
                        </h3>
                      </Link>
                      
                      <div className="pt-1 space-y-2">
                        <span className="text-[14px] font-bold text-gray-900 block">${Number(p.price).toLocaleString()}</span>
                        <button
                          onClick={() => addToCart(p)}
                          className="w-full h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-wider hover:bg-blue-700 transition-all active:scale-95"
                        >
                          <ShoppingCart size={12} />
                          Add To Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            {!loading && totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-white hover:border-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft size={18} />
                </button>
                
                <div className="flex items-center gap-1">
                  {[...Array(totalPages)].map((_, i) => {
                    const page = i + 1;
                    if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-10 h-10 rounded-xl font-bold text-sm transition-all ${currentPage === page ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'bg-white border border-gray-200 text-gray-600 hover:border-blue-600'}`}
                        >
                          {page}
                        </button>
                      );
                    } else if (page === currentPage - 2 || page === currentPage + 2) {
                      return <span key={page} className="px-1 text-gray-400">...</span>;
                    }
                    return null;
                  })}
                </div>

                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-white hover:border-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* --- MOBILE FILTERS OVERLAY --- */}
      <AnimatePresence>
        {showMobileFilters && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileFilters(false)}
              className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[280px] bg-white z-[70] p-6 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold">Filters</h2>
                <button onClick={() => setShowMobileFilters(false)} className="p-2">
                  <X size={20} />
                </button>
              </div>
              <FilterSidebar />
              <button
                onClick={() => setShowMobileFilters(false)}
                className="w-full mt-4 py-3 bg-blue-600 text-white rounded-xl font-bold"
              >
                Show Results
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
