import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import API_BASE_URL from '../config';
import {
  Search, User, ShoppingCart, Menu, X, ChevronDown, LayoutGrid, LogOut, Package, Heart
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const { cartCount, openCartDrawer } = useCart();
  const [categories, setCategories] = useState([]);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(true);
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
    const handleScroll = () => setIsSticky(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsCategoriesLoading(true);
    fetch(`${API_BASE_URL}/categories`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'success') {
          const printerParent = data.data.find(cat => cat.slug === 'printers' || cat.id === 46);
          if (printerParent && printerParent.children) setCategories(printerParent.children);
        }
        setIsCategoriesLoading(false);
      })
      .catch(err => {
        console.error(err);
        setIsCategoriesLoading(false);
      });

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

  const handleSearchTrigger = () => {
    if (searchValue.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchValue.trim())}`);
      setIsSearchFocused(false);
      setSearchValue('');
    }
  };

  return (
    <>


      {/* Brand Section with Logo in Middle */}
      <div className={`w-full bg-white transition-all duration-300 border-b border-slate-100 ${isSticky ? 'hidden' : 'block'}`}>
        <div className="max-w-[1800px] mx-auto px-8 py-8">
          <div className="flex items-center justify-around gap-10">

            {/* Left Categories */}
            <div className="hidden lg:flex items-center gap-10 flex-1 justify-start">
              {isCategoriesLoading ? (
                [...Array(4)].map((_, i) => (
                  <div key={i} className="flex flex-col items-center gap-3 animate-pulse">
                    <div className="w-16 h-14 bg-slate-50 rounded-lg" />
                    <div className="h-2 w-12 bg-slate-50 rounded" />
                  </div>
                ))
              ) : (
                categories.slice(0, 4).map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/shop?category=${cat.slug}`}
                    className="flex flex-col items-center gap-3 group"
                  >
                    <div className="w-18 flex items-center justify-center">
                      <img
                        src={`/category/${cat.slug}.png`}
                        alt={cat.name}
                        className="w-full h-16 object-contain"
                        onError={(e) => e.target.src = '/logo/fabicon.png'}
                      />
                    </div>
                    <span className="text-xs text-slate-600 group-hover:text-orange-600 font-medium text-center leading-tight">
                      {cat.name}
                    </span>
                  </Link>
                ))
              )}
            </div>

            {/* Center Logo */}
            <Link to="/" className="shrink-0 px-12">
              <img src="/logo/logo.png" alt="Logo" className="h-[90px] object-contain" />
            </Link>

            {/* Right Categories */}
            <div className="hidden lg:flex items-center gap-10 flex-1 justify-end">
              {isCategoriesLoading ? (
                [...Array(4)].map((_, i) => (
                  <div key={i} className="flex flex-col items-center gap-3 animate-pulse">
                    <div className="w-16 h-14 bg-slate-50 rounded-lg" />
                    <div className="h-2 w-12 bg-slate-50 rounded" />
                  </div>
                ))
              ) : (
                categories.slice(4, 8).map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/shop?category=${cat.slug}`}
                    className="flex flex-col items-center gap-3 group"
                  >
                    <div className="w-18 flex items-center justify-center">
                      <img
                        src={`/category/${cat.slug}.png`}
                        alt={cat.name}
                        className="w-full h-16 object-contain"
                        onError={(e) => e.target.src = '/logo/fabicon.png'}
                      />
                    </div>
                    <span className="text-xs text-slate-600 group-hover:text-orange-600 font-medium text-center leading-tight">
                      {cat.name}
                    </span>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Header Bar - Simple & Flat */}
      <header className={`sticky top-0 z-[1000] bg-white border-b border-slate-200 transition-all duration-300 ${isSticky ? 'shadow-sm' : ''}`}>
        <div className="max-w-[1800px] mx-auto px-8">
          <div className="h-16 flex items-center justify-between gap-8">

            {/* Categories Button */}
            <div
              className="relative hidden md:block"
              onMouseEnter={() => setIsCategoryOpen(true)}
              onMouseLeave={() => setIsCategoryOpen(false)}
            >
              <button className="flex items-center gap-2 text-sm font-medium text-slate-700 bg-slate-100 px-4 py-2 rounded-lg hover:bg-orange-600 hover:text-white transition-all duration-300">
                <LayoutGrid size={18} />
                All Categories
                <ChevronDown size={16} className={`transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isCategoryOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 mt-2 bg-white border border-slate-200 shadow-lg rounded-xl p-6 w-[620px] z-[1100]"
                  >
                    <div className="grid grid-cols-4 gap-6">
                      {categories.map(cat => (
                        <Link
                          key={cat.id}
                          to={`/shop?category=${cat.slug}`}
                          className="flex flex-col items-center gap-3 hover:bg-slate-50 p-3 rounded-lg transition-all"
                        >
                          <div className="w-14 h-14 flex items-center justify-center">
                            <img
                              src={`/category/${cat.slug}.png`}
                              alt={cat.name}
                              className="w-12 h-12 object-contain"
                              onError={(e) => e.target.src = '/logo/fabicon.png'}
                            />
                          </div>
                          <span className="text-xs text-slate-600 text-center font-medium">{cat.name}</span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Sticky Logo (visible only when sticky) */}
            <Link to="/" className={`transition-all ${isSticky ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
              <img src="/logo/logo.png" alt="Logo" className="h-14 object-contain" />
            </Link>

            {/* Main Navigation */}
            <nav className="hidden xl:flex items-center gap-8 text-sm font-medium text-slate-600">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`hover:text-orange-600 transition-colors ${location.pathname === link.path ? 'text-orange-600 font-semibold' : ''}`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Search Bar */}
            <div className="flex-1 max-w-md relative hidden lg:block" ref={searchRef}>
              <div className={`flex items-center bg-slate-50 border border-slate-200 rounded-full pl-5 pr-1 py-1 transition-all ${isSearchFocused ? 'bg-white border-orange-300' : ''}`}>
                <Search size={18} className="text-slate-400 mr-3" />
                <input
                  type="text"
                  placeholder="Search printers, accessories..."
                  className="flex-1 bg-transparent outline-none text-sm placeholder:text-slate-400"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearchTrigger()}
                />
                <button
                  onClick={handleSearchTrigger}
                  className="bg-orange-600 text-white px-5 py-2 rounded-full text-xs font-semibold hover:bg-orange-700 transition-colors"
                >
                  Search
                </button>
              </div>

              <AnimatePresence>
                {isSearchFocused && searchValue.length > 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 shadow-xl rounded-xl overflow-hidden z-[1200]"
                  >
                    {isLoading ? (
                      <div className="p-8 text-center text-slate-400">Searching...</div>
                    ) : searchResults.length > 0 ? (
                      <div className="max-h-80 overflow-auto p-2">
                        {searchResults.slice(0, 5).map(product => {
                          const images = JSON.parse(product.images || '[]');
                          const imgPath = images[0] ? `/${images[0].replace(/\\/g, '/')}` : '/logo/fabicon.png';
                          return (
                            <button
                              key={product.id}
                              onClick={() => { navigate(`/product/${product.slug}`); setIsSearchFocused(false); setSearchValue(''); }}
                              className="w-full flex gap-4 p-4 hover:bg-slate-50 rounded-lg text-left"
                            >
                              <img src={imgPath} alt="" className="w-12 h-12 object-contain bg-white border border-slate-100 rounded" />
                              <div>
                                <p className="text-sm font-medium text-slate-800">{product.name}</p>
                                <p className="text-orange-600 font-semibold">₹{product.price}</p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="p-8 text-center text-slate-400">No results found</div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              {/* Wishlist */}
              <Link to="/wishlist" className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-full text-slate-600 hover:text-orange-600 transition-colors">
                <Heart size={20} />
                <span className="text-sm font-medium hidden xl:block">Wishlist</span>
              </Link>

              {/* Account */}
              <div className="relative" ref={accountRef}>
                <button
                  onMouseEnter={() => setIsAccountOpen(true)}
                  className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-full text-slate-600 hover:text-orange-600 transition-colors"
                >
                  <User size={22} />
                  <span className="text-sm font-medium hidden xl:block">
                    {user ? user.name.split(' ')[0] : 'Account'}
                  </span>
                </button>

                <AnimatePresence>
                  {isAccountOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      onMouseLeave={() => setIsAccountOpen(false)}
                      className="absolute right-0 mt-3 w-64 bg-white border border-slate-200 rounded-xl shadow-lg p-4 z-[2000]"
                    >
                      {!user ? (
                        <div className="space-y-2">
                          <Link to="/login" className="block py-3 bg-orange-600 text-white text-center rounded-lg font-medium">Sign In</Link>
                          <Link to="/signup" className="block py-3 border border-slate-300 text-center rounded-lg">Create Account</Link>
                        </div>
                      ) : (
                        <div className="space-y-1 text-sm">
                          <Link to="/profile" className="flex gap-3 px-4 py-3 hover:bg-slate-50 rounded-lg"><User size={18} /> My Profile</Link>
                          <Link to="/orders" className="flex gap-3 px-4 py-3 hover:bg-slate-50 rounded-lg"><Package size={18} /> Orders</Link>
                          <button onClick={() => { localStorage.removeItem('user'); window.location.reload(); }} className="flex gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg w-full"><LogOut size={18} /> Logout</button>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Cart */}
              <button
                onClick={openCartDrawer}
                className="flex items-center gap-2 px-3 py-2 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition-colors relative"
              >
                <ShoppingCart size={22} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-white text-orange-600 text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-orange-600">
                    {cartCount}
                  </span>
                )}
                <span className="text-sm font-medium hidden xl:block">Cart</span>
              </button>

              <button onClick={() => setIsMobileMenuOpen(true)} className="xl:hidden text-slate-600">
                <Menu size={26} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 z-[2000]" onClick={() => setIsMobileMenuOpen(false)} />
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-xs bg-white z-[2100] shadow-2xl"
            >
              <div className="p-6 border-b flex justify-between items-center">
                <img src="/logo/logo.png" alt="Logo" className="h-9" />
                <button onClick={() => setIsMobileMenuOpen(false)}><X size={28} /></button>
              </div>
              <div className="p-6 flex flex-col gap-2">
                {navLinks.map(link => (
                  <Link key={link.name} to={link.path} onClick={() => setIsMobileMenuOpen(false)} className="py-4 px-6 text-lg font-medium hover:bg-slate-50 rounded-xl">
                    {link.name}
                  </Link>
                ))}
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
        .animate-marquee-fast { animation: marquee-fast 35s linear infinite; }
      `}</style>
    </>
  );
}