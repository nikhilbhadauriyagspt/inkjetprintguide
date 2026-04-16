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
  LayoutGrid,
  MapPin,
  LogOut,
  Package,
  Headphones,
  Truck,
  Globe,
  Zap,
  Printer,
  ChevronRight,
  Settings,
  Droplets,
  TrendingUp,
  Sparkles,
  Layers,
  Cpu,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const { cartCount, wishlistCount, openCartDrawer, openSearch } = useCart();
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef(null);
  const accountRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    fetch(`${API_BASE_URL}/categories`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'success') {
          const printerParent = data.data.find(cat => cat.slug === 'printers' || cat.id === 46);
          if (printerParent && printerParent.children) setCategories(printerParent.children);
        }
      })
      .catch(err => console.error(err));

    const checkUser = () => setUser(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null);
    checkUser();
    window.addEventListener('storage', checkUser);

    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) setIsSearchFocused(false);
      if (accountRef.current && !accountRef.current.contains(e.target)) setIsAccountOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('storage', checkUser);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchValue.length > 1) {
        setIsLoading(true);
        fetch(`${API_BASE_URL}/products?search=${encodeURIComponent(searchValue)}`)
          .then(res => res.json())
          .then(data => {
            setSearchResults(data.status === 'success' ? data.data : []);
            setIsLoading(false);
          })
          .catch(() => { setSearchResults([]); setIsLoading(false); });
      } else setSearchResults([]);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchValue]);

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'SHOP', path: '/shop' },
    { name: 'ABOUT', path: '/about' },
    { name: 'FAQ', path: '/faq' },
    { name: 'CONTACT', path: '/contact' },
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
    <>
      {/* High-Speed Technical Marquee */}
      <div className="w-full bg-[#991B1B] text-white py-1.5 text-[10px] font-bold tracking-[0.2em] relative z-[1001] border-b border-black/30 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee-fast">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="flex items-center mx-6">
              <Zap size={12} fill="white" className="mr-2" />
              SYSTEM ONLINE • HIGH-PRECISION PRINTING ACTIVE • GLOBAL SHIPPING DEPLOYED •
            </span>
          ))}
        </div>
      </div>

      {/* Industrial Header Container */}
      <header
        className={`w-full z-[1000] transition-all duration-300 relative border-b border-white/5 ${isSticky
          ? 'fixed top-0 py-2 bg-[#0A0A0A]/95 backdrop-blur-xl shadow-2xl'
          : 'relative py-6 bg-[#0A0A0A]'
          }`}
      >
        {/* Visible Technical Diagonal Lines Pattern */}
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{ backgroundImage: 'linear-gradient(45deg, #ffffff 12.50%, #0a0a0a 12.50%, #0a0a0a 50%, #ffffff 50%, #ffffff 62.50%, #0a0a0a 62.50%, #0a0a0a 100%)', backgroundSize: '8px 8px' }}>
        </div>

        <div className="max-w-[1800px] mx-auto px-6 flex items-center justify-between gap-12 relative z-10">

          {/* Logo */}
          <Link to="/" className="shrink-0 group bg-white rounded-full py-1 px-2 flex items-center transition-all duration-300 hover:shadow-lg">
            <img
              src="/logo/logo.png"
              alt="Logo"
              className={`${isSticky ? 'h-9' : 'h-14'} object-contain`}
            />
          </Link>

          {/* Clean Navigation */}
          <nav className="hidden xl:flex items-center gap-2">
            <div
              className="relative"
              onMouseEnter={() => setIsCategoryOpen(true)}
              onMouseLeave={() => setIsCategoryOpen(false)}
            >
              <button className="flex items-center gap-2 py-3 px-6 text-white font-medium text-[13px] tracking-wider hover:text-[#991B1B] transition-all">
                <Layers size={18} className="text-[#991B1B]" />
                SOLUTIONS
                <ChevronDown size={14} className={`text-white/20 transition-transform duration-300 ${isCategoryOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isCategoryOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute top-full left-0 w-[650px] bg-[#111111] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-[1100] mt-1 overflow-hidden rounded-b-xl"
                  >
                    <div className="p-4 grid grid-cols-2 gap-4 bg-[#0A0A0A]">
                      <div className="col-span-2 px-2 py-2 border-b border-white/5 flex items-center justify-between">
                        <span className="text-[11px] font-bold text-[#991B1B] uppercase tracking-[0.2em]">Hardware Solutions</span>
                        <Link to="/shop" className="text-[10px] text-white/40 hover:text-white transition-colors">VIEW ALL SYSTEMS</Link>
                      </div>
                      {categories.map(cat => (
                        <Link
                          key={cat.id}
                          to={`/shop?category=${cat.slug}`}
                          className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-all group"
                        >
                          <div className="w-11 h-11 bg-white rounded-full flex-shrink-0 flex items-center justify-center p-1.5 border border-white/10 group-hover:scale-110 transition-transform">
                            <img
                              src={`/category/${cat.slug}.png`}
                              alt={cat.name}
                              className="w-full h-full object-contain mix-blend-multiply rounded-full"
                              onError={(e) => e.target.src = '/logo/fabicon.png'}
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-[12px] font-bold text-white/80 group-hover:text-white transition-colors uppercase tracking-wide">{cat.name}</h4>
                            <p className="text-[9px] text-white/30 font-medium  mt-0.5">Industrial Grade</p>
                          </div>
                          <ChevronRight size={12} className="text-white/10 group-hover:text-[#991B1B] transition-colors" />
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-6 py-2 text-[13px] font-medium tracking-widest transition-all relative group ${location.pathname === link.path ? 'text-white' : 'text-white/60 hover:text-white'
                  }`}
              >
                {link.name}
                <div className={`absolute -bottom-1 left-6 right-6 h-0.5 bg-[#991B1B] transition-transform duration-300 origin-center ${location.pathname === link.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></div>
                <div className="absolute -bottom-1 left-6 right-6 h-0.5 bg-[#991B1B] blur-sm opacity-0 group-hover:opacity-50 transition-opacity"></div>
              </Link>
            ))}
          </nav>

          {/* Refined Rounded Search */}
          <div className="flex-1 max-w-[450px] hidden lg:block" ref={searchRef}>
            <div className={`relative flex items-center h-11 bg-white/5 border transition-all duration-300 rounded-full overflow-hidden ${isSearchFocused ? 'border-[#991B1B] bg-white/10 ring-1 ring-[#991B1B]/20' : 'border-white/10 hover:border-white/20'
              }`}>
              <div className="pl-5">
                <Search size={18} className={isSearchFocused ? 'text-[#991B1B]' : 'text-white/30'} />
              </div>
              <input
                type="text"
                placeholder="Find industrial solutions..."
                className="flex-1 h-full bg-transparent px-4 text-[13px] text-white outline-none placeholder:text-white/20 font-medium tracking-wide"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearchTrigger()}
              />
              <button
                onClick={() => handleSearchTrigger()}
                className="h-full px-6 bg-[#991B1B] text-white text-[12px] font-bold tracking-widest hover:bg-[#B91C1C] transition-all"
              >
                RUN
              </button>
            </div>

            <AnimatePresence>
              {isSearchFocused && searchValue.length > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 right-0 mt-3 bg-[#111111] border border-white/10 shadow-2xl z-[1200] rounded-2xl overflow-hidden"
                >
                  {isLoading ? (
                    <div className="p-10 text-center text-white/30">
                      <div className="w-6 h-6 border-2 border-[#991B1B] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                      <span className="text-[11px] font-medium tracking-widest">QUERYING...</span>
                    </div>
                  ) : searchResults.length > 0 ? (
                    <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                      {searchResults.slice(0, 5).map(product => {
                        const images = JSON.parse(product.images);
                        const imagePath = images?.length > 0 ? `/${images[0].replace(/\\/g, '/')}` : '/logo/fabicon.png';
                        return (
                          <button
                            key={product.id}
                            onClick={() => {
                              navigate(`/product/${product.slug}`);
                              setIsSearchFocused(false);
                            }}
                            className="w-full flex items-center gap-4 p-4 border-b border-white/5 hover:bg-white/5 transition-all text-left group"
                          >
                            <div className="w-12 h-12 bg-white rounded-lg flex-shrink-0 flex items-center justify-center p-1">
                              <img src={imagePath} alt="" className="w-full h-full object-contain mix-blend-multiply" />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-[13px] font-medium text-white group-hover:text-[#991B1B] transition-colors">{product.name}</h4>
                              <p className="text-[14px] text-[#991B1B] font-bold">${product.price}</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="p-8 text-center text-white/30 font-medium tracking-widest">DATA NOT FOUND</div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Action Hub */}
          <div className="flex items-center gap-3">

            <div className="relative" ref={accountRef}>
              <button
                onMouseEnter={() => setIsAccountOpen(true)}
                className="flex items-center gap-3 p-1.5 hover:bg-white/5 rounded-xl transition-all"
              >
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60">
                  <User size={20} />
                </div>
                <div className="hidden xl:block text-left pr-2 leading-tight">
                  <p className="text-[9px] text-[#991B1B] font-bold uppercase tracking-widest">Operator</p>
                  <p className="text-[13px] font-medium text-white uppercase">{user ? user.name.split(' ')[0] : 'Guest'}</p>
                </div>
              </button>

              <AnimatePresence>
                {isAccountOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    onMouseLeave={() => setIsAccountOpen(false)}
                    className="absolute top-full right-0 w-[240px] bg-[#111111] border border-white/10 shadow-2xl rounded-2xl p-2 mt-2 z-[2200]"
                  >
                    {!user ? (
                      <div className="p-2 space-y-2">
                        <Link to="/login" className="block w-full py-3 bg-[#991B1B] text-white rounded-xl text-[12px] text-center font-bold tracking-widest hover:bg-[#B91C1C] transition-all">SIGN IN</Link>
                        <Link to="/signup" className="block w-full py-3 border border-white/10 text-white rounded-xl text-[12px] text-center font-bold tracking-widest hover:bg-white hover:text-black transition-all">REGISTRY</Link>
                      </div>
                    ) : (
                      <div className="px-4 py-3 border-b border-white/5 mb-1 text-white">
                        <p className="text-[14px] font-medium">{user.name}</p>
                        <p className="text-[11px] opacity-40 truncate">{user.email}</p>
                      </div>
                    )}
                    <div className="p-1 space-y-px text-white/60 font-medium text-[12px]">
                      <Link to="/profile" className="flex items-center gap-3 px-3 py-2 hover:bg-white/5 hover:text-white rounded-lg transition-all"><User size={16} /> DASHBOARD</Link>
                      <Link to="/orders" className="flex items-center gap-3 px-3 py-2 hover:bg-white/5 hover:text-white rounded-lg transition-all"><Package size={16} /> BATCH STATUS</Link>
                      <Link to="/wishlist" className="flex items-center gap-3 px-3 py-2 hover:bg-white/5 hover:text-white rounded-lg transition-all"><Heart size={16} /> SAVED DATA</Link>
                      {user && (
                        <button onClick={() => { localStorage.removeItem('user'); window.location.reload(); }} className="w-full flex items-center gap-3 px-3 py-2 text-red-500 hover:bg-red-500 hover:text-white rounded-lg mt-1 pt-3 border-t border-white/5"><LogOut size={16} /> TERMINATE</button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={openCartDrawer}
              className="relative flex items-center gap-3 p-1.5 hover:bg-white/5 rounded-xl transition-all"
            >
              <div className="w-10 h-10 rounded-full bg-[#991B1B] flex items-center justify-center text-white">
                <ShoppingCart size={20} strokeWidth={2} />
              </div>
              <div className="hidden xl:block text-left pr-2 leading-tight">
                <p className="text-[9px] text-white/40 font-bold uppercase tracking-widest">MANIFEST</p>
                <p className="text-[13px] font-medium text-white">${(cartCount * 299).toLocaleString()}</p>
              </div>
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-5 h-5 bg-white text-[#991B1B] text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-[#0A0A0A]">
                  {cartCount}
                </span>
              )}
            </button>

            <button className="xl:hidden p-2 text-white/60 hover:text-white" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/90 backdrop-blur-md z-[2000]" onClick={() => setIsMobileMenuOpen(false)} />
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-[300px] bg-[#0A0A0A] z-[2100] border-l border-white/10 flex flex-col shadow-2xl"
            >
              <div className="p-8 border-b border-white/5 flex justify-between items-center bg-[#111111]">
                <img src="/logo/logo.png" alt="Logo" className="h-8 brightness-0 invert" />
                <button onClick={() => setIsMobileMenuOpen(false)} className="bg-[#991B1B] text-white p-2 rounded-lg"><X size={20} /></button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 bg-[#0A0A0A] text-white/60 font-medium">
                <nav className="flex flex-col gap-1 mb-10">
                  {navLinks.map(link => (
                    <Link key={link.name} to={link.path} onClick={() => setIsMobileMenuOpen(false)} className="px-5 py-4 hover:bg-[#991B1B] hover:text-white rounded-xl transition-all">{link.name}</Link>
                  ))}
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes marquee-fast {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-fast {
          animation: marquee-fast 15s linear infinite;
        }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #0A0A0A; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #991B1B; border-radius: 10px; }
      `}</style>
    </>
  );
}