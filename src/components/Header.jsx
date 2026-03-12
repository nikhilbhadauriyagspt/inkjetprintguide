import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import API_BASE_URL from '../config';
import {
  Search,
  User,
  Heart,
  ShoppingCart,
  Menu,
  X,
  ChevronDown,
  Mail,
  Truck,
  LayoutGrid,
  Zap,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Package
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const { cartCount, wishlistCount, openCartDrawer } = useCart();
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSearchCatOpen, setIsSearchCatOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef(null);
  const searchCatRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);

    fetch(`${API_BASE_URL}/categories`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          const printerParent = data.data.find(cat => cat.slug === 'printers' || cat.id === 46);
          if (printerParent && printerParent.children) {
            setCategories(printerParent.children);
          }
        }
      })
      .catch(err => console.error(err));

    const checkUser = () => {
      const storedUser = localStorage.getItem('user');
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    checkUser();
    window.addEventListener('storage', checkUser);

    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
      if (searchCatRef.current && !searchCatRef.current.contains(event.target)) {
        setIsSearchCatOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('storage', checkUser);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // LIVE SEARCH LOGIC
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchValue.length > 1) {
        setIsLoading(true);
        fetch(`${API_BASE_URL}/products?search=${searchValue}`)
          .then(res => res.json())
          .then(data => {
            if (data.status === 'success') {
              setSearchResults(data.data);
            }
            setIsLoading(false);
          })
          .catch(err => {
            console.error(err);
            setIsLoading(false);
          });
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchValue]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.dispatchEvent(new Event('storage'));
    navigate('/login');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop Products', path: '/shop' },
    { name: 'About Us', path: '/about' },
    { name: 'Support', path: '/contact' },
    { name: 'FAQ', path: '/faq' },
  ];


  const handleSearchTrigger = (term) => {
    const searchParam = term || searchValue;
    if (searchParam.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchParam.trim())}`);
      setIsSearchFocused(false);
      setSearchValue(searchParam);
    }
  };

  return (
    <header className="w-full z-[100] relative font-['Heebo']">

      {/* 1. TOP UTILITY BAR */}
      <div className="w-full bg-slate-950 text-white/80 py-2.5 px-4 sm:px-10 border-b border-white/5 hidden md:block relative z-[110]">
        <div className="w-full flex justify-between items-center text-[12px] font-medium tracking-wide capitalize">
          <div className="flex items-center gap-6 w-[25%] normal-case">
            <a href="mailto:info@optimumprints.shop" className="flex items-center gap-2 hover:text-white transition-colors">
              <Mail size={13} className="text-[#10b981]" />
              <span className="lowercase">info@optimumprints.shop</span>
            </a>
          </div>

          <div className="flex items-center justify-end gap-6 w-[25%]">
            <Link to="/track-order" className="flex items-center gap-2 hover:text-white transition-colors">
              <Truck size={14} className="text-[#10b981]" />
              <span>Track Order</span>
            </Link>
            <div className="h-3 w-[1px] bg-white/20"></div>
            <Link to={user ? '/profile' : '/login'} className="flex items-center gap-2 hover:text-white transition-colors">
              <User size={14} className="text-[#10b981]" />
              <span>{user ? 'My Account' : 'Login / Register'}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. MAIN HUB & SMART SEARCH */}
      <div className="w-full bg-white py-5 px-4 sm:px-10 border-b border-slate-100 relative z-[100]">
        <div className="w-full flex items-center justify-between gap-8 sm:gap-12">

          <Link to="/" className="shrink-0">
            <img src="/logo/logo.png" alt="Optimum Prints" className="h-10 md:h-14 object-contain" />
          </Link>

          {/* THE SMART SEARCH ENGINE */}
          <div className="hidden lg:flex flex-1 max-w-[850px] relative" ref={searchRef}>
            <div
              className={`w-full h-[54px] flex items-center bg-slate-50 rounded-2xl border-2 transition-all duration-300 ${isSearchFocused ? 'border-[#10b981] bg-white shadow-[0_10px_40px_-10px_rgba(16,185,129,0.2)]' : 'border-slate-100'
                }`}
            >
              {/* CATEGORY SELECTOR IN SEARCH */}
              <div
                ref={searchCatRef}
                className="relative h-full shrink-0"
              >
                <div
                  onClick={() => setIsSearchCatOpen(!isSearchCatOpen)}
                  className="px-6 border-r border-slate-200 hidden xl:flex items-center gap-2 text-slate-500 cursor-pointer hover:bg-slate-100 transition-colors h-full rounded-l-2xl"
                >
                  <LayoutGrid size={18} />
                  <span className="text-[13px] font-bold whitespace-nowrap capitalize">Categories</span>
                  <ChevronDown size={14} className={`transition-transform duration-300 ${isSearchCatOpen ? 'rotate-180' : ''}`} />
                </div>

                {/* SEARCH CATEGORY DROPDOWN */}
                <AnimatePresence>
                  {isSearchCatOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-[calc(100%+8px)] left-0 w-[260px] bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-100 py-3 z-[150]"
                    >
                      <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                        {categories.map(cat => (
                          <Link
                            key={cat.id}
                            to={`/shop?category=${cat.slug}`}
                            onClick={() => setIsSearchCatOpen(false)}
                            className="flex items-center gap-3 px-5 py-2.5 hover:bg-slate-50 text-sm font-bold text-slate-700 transition-colors capitalize group"
                          >
                            <span className="w-1.5 h-1.5 bg-slate-200 rounded-full group-hover:bg-[#10b981] transition-colors"></span>
                            {cat.name}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <input
                type="text"
                placeholder="Search for printers, genuine ink, or specialized solutions..."
                className="flex-1 bg-transparent px-6 outline-none text-slate-800 font-medium placeholder:text-slate-400 text-[15px]"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearchTrigger()}
              />
              <button
                onClick={() => handleSearchTrigger()}
                className="h-full px-12 bg-[#10b981] text-white font-bold hover:bg-[#059669] transition-all flex items-center gap-3 rounded-r-[14px]"
              >
                <Search size={20} strokeWidth={3} />
                <span>Search</span>
              </button>
            </div>

            {/* LIVE SUGGESTIONS & PRODUCT RESULTS */}
            <AnimatePresence>
              {isSearchFocused && !isSearchCatOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-[calc(100%+12px)] left-0 w-full bg-white rounded-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] border border-slate-100 overflow-hidden p-6 z-[120] max-h-[500px] overflow-y-auto custom-scrollbar"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      {searchValue.length > 1 ? (
                        <>
                          <h4 className="flex items-center gap-2 text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4">
                            <Package size={14} className="text-[#10b981]" /> Products Found
                          </h4>
                          <div className="space-y-3">
                            {isLoading ? (
                              [1, 2, 3].map(i => <div key={i} className="h-16 bg-slate-50 animate-pulse rounded-xl"></div>)
                            ) : searchResults.length > 0 ? (
                              searchResults.map(product => {
                                let imagePath = '/logo/fabicon.png';
                                try {
                                  const images = JSON.parse(product.images);
                                  if (images && images.length > 0) {
                                    imagePath = `/${images[0].replace(/\\/g, '/')}`;
                                  }
                                } catch (e) { }

                                return (
                                  <Link
                                    key={product.id}
                                    to={`/product/${product.slug}`}
                                    onClick={() => setIsSearchFocused(false)}
                                    className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-xl transition-all group"
                                  >
                                    <div className="w-12 h-12 bg-white rounded-lg border border-slate-100 overflow-hidden shrink-0">
                                      <img src={imagePath} alt={product.name} className="w-full h-full object-contain" onError={(e) => { e.target.src = '/logo/fabicon.png'; }} />
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                      <span className="text-sm font-bold text-slate-800 truncate group-hover:text-[#10b981]">{product.name}</span>
                                      <span className="text-xs font-black text-[#10b981]">${product.price}</span>
                                    </div>
                                  </Link>
                                );
                              })
                            ) : (
                              <p className="text-sm font-medium text-slate-400 p-4">No products found for "{searchValue}"</p>
                            )}
                          </div>
                        </>
                      ) : (
                        <>
                          <h4 className="flex items-center gap-2 text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4">
                            <TrendingUp size={14} className="text-[#10b981]" /> Trending Now
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {['Laser Printers', 'Inkjet', 'EcoTank', 'Scanner', 'Cartridges', 'Ribbons'].map(tag => (
                              <button key={tag} onClick={() => handleSearchTrigger(tag)} className="px-4 py-2 bg-slate-50 hover:bg-[#10b981] hover:text-white rounded-xl text-sm font-medium text-slate-600 transition-all capitalize">{tag}</button>
                            ))}
                          </div>
                        </>
                      )}
                    </div>

                    <div className="border-l border-slate-100 pl-8 hidden md:block">
                      <h4 className="flex items-center gap-2 text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4">
                        <LayoutGrid size={14} className="text-[#10b981]" /> Quick Categories
                      </h4>
                      <div className="space-y-1">
                        {categories.slice(0, 5).map(cat => (
                          <Link key={cat.id} to={`/shop?category=${cat.slug}`} onClick={() => setIsSearchFocused(false)} className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-xl group transition-all">
                            <span className="text-sm font-bold text-slate-700 capitalize group-hover:text-[#10b981]">{cat.name}</span>
                            <ArrowRight size={14} className="text-slate-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* USER ACTIONS */}
          <div className="flex items-center gap-4 sm:gap-8 capitalize">
            <Link to={user ? '/profile' : '/login'} className="hidden md:flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-xl bg-slate-50 flex items-center justify-center text-slate-700 group-hover:bg-[#10b981] group-hover:text-white transition-all shadow-sm">
                <User size={22} strokeWidth={1.5} />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-medium text-slate-400 leading-none">Account</span>
                <span className="text-[14px] font-bold text-slate-800 leading-tight">
                  {user ? user.name.split(' ')[0] : 'Log In'}
                </span>
              </div>
            </Link>

            <Link to="/wishlist" className="hidden sm:flex items-center gap-3 group relative">
              <div className="w-11 h-11 rounded-xl bg-slate-50 flex items-center justify-center text-slate-700 group-hover:bg-red-500 group-hover:text-white transition-all shadow-sm">
                <Heart size={22} strokeWidth={1.5} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                    {wishlistCount}
                  </span>
                )}
              </div>
              <div className="flex flex-col hidden xl:flex">
                <span className="text-[11px] font-medium text-slate-400 leading-none">Saved</span>
                <span className="text-[14px] font-bold text-slate-800 leading-tight">Wishlist</span>
              </div>
            </Link>

            <button onClick={openCartDrawer} className="flex items-center gap-4 group">
              <div className="relative w-11 h-11 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-xl shadow-slate-200 group-hover:bg-[#10b981] transition-all group-hover:scale-105">
                <ShoppingCart size={22} strokeWidth={2} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-[#10b981] text-white text-[11px] font-black rounded-full flex items-center justify-center border-2 border-slate-900">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="flex flex-col hidden md:flex items-start">
                <span className="text-[10px] font-bold text-slate-400 uppercase leading-none tracking-widest">My Cart</span>
                <span className="text-[15px] font-bold text-slate-900 leading-tight">$0.00</span>
              </div>
            </button>

            <button className="lg:hidden p-2 text-slate-900" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu size={32} />
            </button>
          </div>
        </div>
      </div>

      {/* SEARCH OVERLAY */}
      <AnimatePresence>
        {isSearchFocused && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] z-[90]"
            onClick={() => setIsSearchFocused(false)}
          />
        )}
      </AnimatePresence>

      {/* 3. NAVIGATION BAR */}
      <div className={`hidden lg:block w-full bg-slate-900 border-b border-white/5 transition-all duration-300 ${scrolled ? 'fixed top-0 left-0 shadow-2xl z-[150]' : 'relative'}`}>
        <div className="w-full px-4 sm:px-10 flex items-center justify-between capitalize">
          <div className="flex items-center">
            <div
              className="relative"
              onMouseEnter={() => setIsCategoryOpen(true)}
              onMouseLeave={() => setIsCategoryOpen(false)}
            >
              <button className="flex items-center gap-4 px-10 h-[64px] bg-[#10b981] text-white font-bold text-[14px] tracking-wide hover:bg-[#059669] transition-colors">
                <LayoutGrid size={20} />
                <span>Shop By Categories</span>
                <ChevronDown size={16} className={`transition-transform duration-300 ${isCategoryOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isCategoryOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    className="absolute top-full left-0 w-[300px] bg-white shadow-2xl border-x border-b border-slate-100 py-4 z-[200] normal-case"
                  >
                    {categories.map(cat => (
                      <Link
                        key={cat.id}
                        to={`/shop?category=${cat.slug}`}
                        className="flex items-center justify-between px-8 py-3.5 text-[15px] font-medium text-slate-700 hover:bg-slate-50 hover:text-[#10b981] transition-all group capitalize"
                      >
                        <span>{cat.name}</span>
                        <Zap size={14} className="opacity-0 group-hover:opacity-100 text-[#10b981]" />
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <nav className="flex items-center ml-4">
              {navLinks.map(link => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="px-8 h-[64px] flex items-center text-[14px] font-medium text-white/80 hover:text-white hover:bg-white/5 transition-all tracking-wide relative group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-8 right-8 h-[3px] bg-[#10b981] transition-all scale-x-0 group-hover:scale-x-100 origin-center"></span>
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-8 hidden xl:flex normal-case">
            <div className="flex items-center gap-3 text-white">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#10b981]">
                <Mail size={18} />
              </div>
              <div className="flex flex-col text-right">
                <span className="text-[10px] font-medium text-white/40 leading-none">Email Support</span>
                <span className="text-[14px] font-bold text-white leading-tight">info@optimumprints.shop</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE UI */}
      <div className={`lg:hidden w-full bg-[#10b981] px-4 py-3 flex gap-3 transition-all ${scrolled ? 'fixed top-0 left-0 shadow-lg z-[150]' : 'relative'}`}>
        <div className="flex-1 h-[48px] bg-white rounded-xl flex items-center px-4">
          <Search size={20} className="text-slate-300" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent border-none outline-none px-3 text-sm w-full font-bold text-slate-800"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearchTrigger()}
          />
        </div>
        <button onClick={openCartDrawer} className="w-[48px] h-[48px] bg-white/20 rounded-xl flex items-center justify-center text-white relative">
          <ShoppingCart size={22} />
        </button>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

    </header>
  );
}
