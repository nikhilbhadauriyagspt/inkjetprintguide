import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import API_BASE_URL from '../config';
import {
  Search,
  User,
  ShoppingCart,
  Menu,
  X,
  ChevronDown,
  LayoutGrid,
  LogOut,
  Package,
  Heart,
  Truck,
  Headphones,
  Mail,
  Sparkles,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const { cartCount, cartTotal, compareCount, openCartDrawer } = useCart();
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

  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef(null);
  const accountRef = useRef(null);
  const categoryRef = useRef(null);

  useEffect(() => {
    setIsCategoriesLoading(true);

    fetch(`${API_BASE_URL}/categories`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'success') {
          const printerParent = data.data.find(
            (cat) => cat.slug === 'printers' || cat.id === 46
          );
          if (printerParent && printerParent.children) {
            setCategories(printerParent.children);
          }
        }
        setIsCategoriesLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsCategoriesLoading(false);
      });

    const checkUser = () => {
      const savedUser = localStorage.getItem('user');
      setUser(savedUser ? JSON.parse(savedUser) : null);
    };

    checkUser();
    window.addEventListener('storage', checkUser);

    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchFocused(false);
      }
      if (accountRef.current && !accountRef.current.contains(e.target)) {
        setIsAccountOpen(false);
      }
      if (categoryRef.current && !categoryRef.current.contains(e.target)) {
        setIsCategoryOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('storage', checkUser);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchValue.trim().length > 1) {
        setIsLoading(true);

        fetch(`${API_BASE_URL}/products?search=${encodeURIComponent(searchValue)}`)
          .then((res) => res.json())
          .then((data) => {
            setSearchResults(data.status === 'success' ? data.data : []);
            setIsLoading(false);
          })
          .catch(() => {
            setSearchResults([]);
            setIsLoading(false);
          });
      } else {
        setSearchResults([]);
      }
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

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.reload();
  };

  return (
    <>
      <header className="w-full sticky top-0 z-[1000] shadow-sm">
        {/* TOP BAR */}
        <div className="bg-[#2f5cab]">
          <div className="max-w-[1800px] mx-auto px-4 lg:px-6">
            <div className="min-h-[90px] flex items-center justify-between gap-4">
              {/* Logo */}
              <div className="shrink-0 w-[170px] lg:w-[190px]">
                <Link to="/" className="flex items-center">
                  <img
                    src="/logo/logo.png"
                    alt="Logo"
                    className="h-12 lg:h-14 object-contain brightness-0 invert"
                  />
                </Link>
              </div>

              {/* Search */}
              <div
                ref={searchRef}
                className="hidden lg:block flex-1 max-w-[590px] relative"
              >
                <div className="flex items-center bg-white rounded-md overflow-hidden h-[42px]">
                  <input
                    type="text"
                    placeholder="Search The Store"
                    className="flex-1 h-full px-5 text-[15px] outline-none text-slate-700 placeholder:text-slate-400"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearchTrigger()}
                  />
                  <button
                    onClick={handleSearchTrigger}
                    className="w-[60px] h-full flex items-center justify-center text-black hover:bg-slate-50 transition-colors"
                    aria-label="Search"
                  >
                    <Search size={20} strokeWidth={2.4} />
                  </button>
                </div>

                <AnimatePresence>
                  {isSearchFocused && searchValue.length > 1 && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-white rounded-md shadow-xl border border-slate-200 overflow-hidden z-[1200]"
                    >
                      {isLoading ? (
                        <div className="p-5 text-center text-slate-500 text-sm">
                          Searching...
                        </div>
                      ) : searchResults.length > 0 ? (
                        <div className="max-h-80 overflow-y-auto">
                          {searchResults.slice(0, 6).map((product) => {
                            let images = [];
                            try {
                              images = JSON.parse(product.images || '[]');
                            } catch {
                              images = [];
                            }

                            const imgPath = images[0]
                              ? `/${images[0].replace(/\\/g, '/')}`
                              : '/logo/fabicon.png';

                            return (
                              <button
                                key={product.id}
                                onClick={() => {
                                  navigate(`/product/${product.slug}`);
                                  setSearchValue('');
                                  setIsSearchFocused(false);
                                }}
                                className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-b-0"
                              >
                                <img
                                  src={imgPath}
                                  alt={product.name}
                                  className="w-12 h-12 object-contain bg-white border border-slate-100 rounded"
                                />
                                <div className="min-w-0">
                                  <p className="text-sm font-medium text-slate-800 line-clamp-1">
                                    {product.name}
                                  </p>
                                  <p className="text-sm font-semibold text-[#2f5cab]">
                                    ₹{product.price}
                                  </p>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="p-5 text-center text-slate-500 text-sm">
                          No results found
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Right Top Info */}
              <div className="hidden xl:flex items-center gap-8 text-white shrink-0">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-3 cursor-default group"
                >
                  <div className="relative h-[26px] w-[26px] overflow-hidden">
                    <div className="flex flex-col transition-transform duration-300 group-hover:-translate-y-[26px]">
                      <Truck size={26} className="text-white" />
                      <Truck size={26} className="text-[#ffd33d]" />
                    </div>
                  </div>
                  <div className="leading-tight">
                    <p className="text-[13px] font-semibold">Free</p>
                    <p className="text-[13px] font-semibold">Shipping</p>
                  </div>
                </motion.div>

                <motion.a
                  href="mailto:info@printmora.shop"
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <div className="relative h-[26px] w-[26px] overflow-hidden">
                    <div className="flex flex-col transition-transform duration-300 group-hover:-translate-y-[26px]">
                      <Mail size={26} className="text-white" />
                      <Mail size={26} className="text-[#ffd33d]" />
                    </div>
                  </div>
                  <div className="leading-tight">
                    <p className="text-[13px] font-semibold">Email Us</p>
                    <p className="text-[13px] font-semibold">info@printmora.shop</p>
                  </div>
                </motion.a>

                <Link
                  to={user ? '/profile' : '/signup'}
                  className="bg-white text-black rounded-md px-4 py-3 flex items-center gap-3 min-w-[205px] hover:bg-slate-50 transition-colors shadow-lg shadow-black/10"
                >
                  <span className="w-9 h-9 rounded-sm bg-[#ffe36b] flex items-center justify-center shrink-0">
                    <Sparkles size={18} className="text-[#e16c00]" />
                  </span>
                  <span className="text-[14px] font-semibold">
                    {user ? user.name : 'New User Zone'}
                  </span>
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden text-white"
                aria-label="Open menu"
              >
                <Menu size={28} />
              </button>
            </div>

            {/* Mobile Search */}
            <div className="lg:hidden pb-4">
              <div className="flex items-center bg-white rounded-md overflow-hidden h-[42px]">
                <input
                  type="text"
                  placeholder="Search The Store"
                  className="flex-1 h-full px-4 text-sm outline-none"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearchTrigger()}
                />
                <button
                  onClick={handleSearchTrigger}
                  className="w-[56px] h-full flex items-center justify-center text-black"
                >
                  <Search size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="bg-[#234d98]">
          <div className="max-w-[1800px] mx-auto px-4 lg:px-6">
            <div className="min-h-[64px] flex items-center justify-between gap-4">
              {/* Left Side */}
              <div className="flex items-center gap-8">
                {/* Categories */}
                <div className="relative" ref={categoryRef}>
                  <button
                    onClick={() => setIsCategoryOpen((prev) => !prev)}
                    className="flex items-center gap-3 text-white font-semibold"
                  >
                    <span className="w-[40px] h-[40px] rounded bg-[#3d73d1] flex items-center justify-center">
                      <LayoutGrid size={18} />
                    </span>

                    <span className="hidden sm:flex flex-col leading-tight text-left">
                      <span className="text-[14px] font-semibold text-white">
                        Shop By
                      </span>
                      <span className="text-[14px] font-bold text-[#ffd33d] flex items-center gap-1">
                        Categories <ChevronDown size={15} />
                      </span>
                    </span>
                  </button>

                  <AnimatePresence>
                    {isCategoryOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        className="absolute top-full left-0 mt-3 w-[290px] bg-white rounded-md shadow-2xl border border-slate-200 overflow-hidden z-[1300]"
                      >
                        <div className="p-3 border-b border-slate-100 bg-slate-50 text-sm font-semibold text-slate-700">
                          Categories
                        </div>

                        {isCategoriesLoading ? (
                          <div className="p-4 text-sm text-slate-500">
                            Loading...
                          </div>
                        ) : categories.length > 0 ? (
                          <div className="max-h-[380px] overflow-y-auto py-2">
                            {categories.map((cat) => (
                              <Link
                                key={cat.id}
                                to={`/shop?category=${cat.slug}`}
                                onClick={() => setIsCategoryOpen(false)}
                                className="block px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#2f5cab] transition-colors"
                              >
                                {cat.name}
                              </Link>
                            ))}
                          </div>
                        ) : (
                          <div className="p-4 text-sm text-slate-500">
                            No categories found
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Nav */}
                <nav className="hidden lg:flex items-center gap-10">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      className={`text-[14px] font-medium transition-colors ${location.pathname === link.path
                        ? 'text-white'
                        : 'text-white hover:text-[#ffd33d]'
                        }`}
                    >
                      {link.name.charAt(0) + link.name.slice(1).toLowerCase()}
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Right Side */}
              <div className="flex items-center gap-3 lg:gap-5">
                {/* Wishlist */}
                <Link
                  to="/wishlist"
                  className="w-[40px] h-[40px] rounded bg-[#3d73d1] text-white overflow-hidden group relative flex items-center justify-center"
                >
                  <div className="flex flex-col transition-transform duration-300 group-hover:-translate-y-[40px] absolute top-0">
                    <div className="w-[40px] h-[40px] flex items-center justify-center">
                      <Heart size={19} />
                    </div>
                    <div className="w-[40px] h-[40px] flex items-center justify-center text-[#ffd33d]">
                      <Heart size={19} />
                    </div>
                  </div>
                </Link>

                {/* Compare */}
                <div className="relative">
                  <Link
                    to="/compare"
                    className="w-[40px] h-[40px] rounded bg-[#3d73d1] text-white overflow-hidden group relative flex items-center justify-center"
                  >
                    <div className="flex flex-col transition-transform duration-300 group-hover:-translate-y-[40px] absolute top-0">
                      <div className="w-[40px] h-[40px] flex items-center justify-center">
                        <Package size={18} />
                      </div>
                      <div className="w-[40px] h-[40px] flex items-center justify-center text-[#ffd33d]">
                        <Package size={18} />
                      </div>
                    </div>
                  </Link>
                  <span className="absolute -top-1 -right-1 w-[18px] h-[18px] rounded-full bg-[#ffcc00] text-[10px] font-bold text-black flex items-center justify-center pointer-events-none z-10">
                    {compareCount}
                  </span>
                </div>

                {/* Account */}
                <div className="relative" ref={accountRef}>
                  <button
                    onClick={() => setIsAccountOpen((prev) => !prev)}
                    className="text-left text-white hidden md:block"
                  >
                    <p className="text-[14px] leading-none">Sign In</p>
                    <p className="text-[14px] leading-none font-bold mt-2 text-[#ffd33d] flex items-center gap-1">
                      {user ? user.name.split(' ')[0] : 'Account'}
                      <ChevronDown size={14} />
                    </p>
                  </button>

                  <AnimatePresence>
                    {isAccountOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        className="absolute right-0 top-full mt-3 w-[240px] bg-white rounded-md shadow-2xl border border-slate-200 overflow-hidden z-[1400]"
                      >
                        {!user ? (
                          <div className="p-4 space-y-3">
                            <Link
                              to="/login"
                              onClick={() => setIsAccountOpen(false)}
                              className="block w-full text-center bg-[#2f5cab] text-white py-2.5 rounded-md text-sm font-semibold hover:bg-[#264f97]"
                            >
                              Sign In
                            </Link>
                            <Link
                              to="/signup"
                              onClick={() => setIsAccountOpen(false)}
                              className="block w-full text-center border border-slate-300 py-2.5 rounded-md text-sm font-semibold text-slate-700 hover:bg-slate-50"
                            >
                              Create Account
                            </Link>
                          </div>
                        ) : (
                          <div className="py-2">
                            <Link
                              to="/profile"
                              onClick={() => setIsAccountOpen(false)}
                              className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50"
                            >
                              <User size={16} />
                              My Profile
                            </Link>
                            <Link
                              to="/orders"
                              onClick={() => setIsAccountOpen(false)}
                              className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50"
                            >
                              <Package size={16} />
                              Orders
                            </Link>
                            <button
                              onClick={handleLogout}
                              className="flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                            >
                              <LogOut size={16} />
                              Logout
                            </button>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Cart */}
                <button
                  onClick={openCartDrawer}
                  className="flex items-center gap-3 text-white relative group"
                >
                  <div className="relative overflow-hidden h-[34px] w-[34px]">
                    <div className="flex flex-col transition-transform duration-300 group-hover:-translate-y-[34px]">
                      <div className="h-[34px] w-[34px] flex items-center justify-center">
                        <ShoppingCart size={34} strokeWidth={2.1} />
                      </div>
                      <div className="h-[34px] w-[34px] flex items-center justify-center text-[#ffd33d]">
                        <ShoppingCart size={34} strokeWidth={2.1} />
                      </div>
                    </div>
                    <span className="absolute -top-1 -right-1 w-[18px] h-[18px] rounded-full bg-[#ffcc00] text-[10px] font-bold text-black flex items-center justify-center">
                      {cartCount}
                    </span>
                  </div>

                  <div className="hidden md:block text-left leading-tight">
                    <p className="text-[14px] font-medium text-white group-hover:text-[#ffd33d] transition-colors">My Cart</p>
                    <p className="text-[14px] font-bold text-[#ffd33d] group-hover:text-white transition-colors">₹{cartTotal.toLocaleString()}</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-[2000]"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.25 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-[320px] bg-white z-[2100] shadow-2xl"
            >
              <div className="h-[70px] px-4 border-b border-slate-200 flex items-center justify-between">
                <img src="/logo/logo.png" alt="Logo" className="h-10 object-contain" />
                <button onClick={() => setIsMobileMenuOpen(false)}>
                  <X size={26} />
                </button>
              </div>

              <div className="p-4 space-y-2">
                <button
                  onClick={() => setIsCategoryOpen((prev) => !prev)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-md bg-slate-50 text-slate-700 font-medium"
                >
                  Categories
                  <ChevronDown size={18} />
                </button>

                {isCategoryOpen && (
                  <div className="bg-white border border-slate-200 rounded-md overflow-hidden">
                    {isCategoriesLoading ? (
                      <div className="p-4 text-sm text-slate-500">Loading...</div>
                    ) : (
                      categories.map((cat) => (
                        <Link
                          key={cat.id}
                          to={`/shop?category=${cat.slug}`}
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            setIsCategoryOpen(false);
                          }}
                          className="block px-4 py-3 text-sm border-b last:border-b-0 border-slate-100 text-slate-700 hover:bg-slate-50"
                        >
                          {cat.name}
                        </Link>
                      ))
                    )}
                  </div>
                )}

                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 rounded-md text-slate-700 font-medium hover:bg-slate-50"
                  >
                    {link.name}
                  </Link>
                ))}

                <div className="pt-3 border-t border-slate-200 mt-3 space-y-2">
                  <Link
                    to="/wishlist"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 rounded-md text-slate-700 hover:bg-slate-50"
                  >
                    Wishlist
                  </Link>
                  <Link
                    to={user ? '/profile' : '/login'}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 rounded-md text-slate-700 hover:bg-slate-50"
                  >
                    {user ? 'My Account' : 'Sign In'}
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}