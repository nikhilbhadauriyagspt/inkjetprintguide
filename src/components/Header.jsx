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
  ShieldCheck,
  HelpCircle,
  Monitor,
  Settings,
  Droplets,
  Layers,
  Cpu,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const { cartCount, wishlistCount, openCartDrawer } = useCart();
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
  const [userLocation, setUserLocation] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef(null);
  const accountRef = useRef(null);

  useEffect(() => {
    const processLocationName = (city, countryCode) => {
      let displayCity = city || '';
      const noidaRegion = ['Dadri', 'Greater Noida', 'Gautam Buddh Nagar', 'Ghaziabad'];
      if (noidaRegion.some(region => displayCity.includes(region))) displayCity = 'Noida';
      setUserLocation(`${displayCity || 'Global'}, ${countryCode || 'Store'}`);
    };

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`);
            const data = await res.json();
            processLocationName(data.city || data.locality, data.countryCode);
          } catch { setUserLocation(''); }
        },
        () => { setUserLocation(''); },
        { timeout: 5000 }
      );
    }
  }, []);

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
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/about' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleSearchTrigger = (term) => {
    const searchParam = term || searchValue;
    if (searchParam.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchParam.trim())}`);
      setIsSearchFocused(false);
      setSearchValue(searchParam);
    }
  };

  const getImagePath = (product) => {
    try {
      const images = JSON.parse(product.images);
      return images?.length > 0 ? `/${images[0].replace(/\\/g, '/')}` : '/logo/fabicon.png';
    } catch { return '/logo/fabicon.png'; }
  };

  return (
    <>
      {/* 1. TOP BAR - Scrolls away */}
      <div className="w-full bg-[#1d4ed8] text-white py-2 text-[12px] font-medium z-[1001] relative shadow-sm">
        <div className="w-full px-4 md:px-10 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 opacity-90"><Globe size={14} className="text-blue-100" /> Worldwide Shipping</span>
            <span className="hidden sm:flex items-center gap-1.5 opacity-90"><Truck size={14} className="text-blue-100" /> Express Global Delivery</span>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/orders" className="hover:text-blue-100 transition-colors flex items-center gap-1 opacity-90"><Package size={13} /> Track Order</Link>
            <Link to="/faq" className="hover:text-blue-100 transition-colors flex items-center gap-1 opacity-90"><HelpCircle size={13} /> Support</Link>
          </div>
        </div>
      </div>

      {/* 2 & 3. STICKY HEADER PART */}
      <header className={`w-full z-[1000] bg-white transition-all duration-300 ${isSticky ? 'fixed top-0 left-0 shadow-lg border-b border-slate-100' : 'relative'}`}>
        
        {/* 2. MAIN HEADER */}
        <div className={`bg-white text-slate-800 py-3 w-full border-b border-slate-100 transition-all ${isSticky ? 'py-2' : ''}`}>
          <div className="w-full px-4 md:px-10 flex items-center gap-4 lg:gap-10">

            <button className="lg:hidden p-2 hover:bg-slate-50 rounded-full transition-colors" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu size={24} className="text-[#1d4ed8]" />
            </button>

            <Link to="/" className="shrink-0 flex items-center transition-all hover:opacity-80">
              <img src="/logo/logo.png" alt="Logo" className={`${isSticky ? 'h-8 md:h-10' : 'h-10 md:h-14'} object-contain`} />
            </Link>

            {/* DELIVER TO */}
            {userLocation && (
              <div className="hidden xl:flex items-center gap-2 px-3 py-2 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors group">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                  <MapPin size={16} className="text-[#1d4ed8]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-500 font-medium leading-none mb-0.5">Ship to</span>
                  <span className="text-[13px] font-semibold text-slate-700 leading-none truncate max-w-[100px]">{userLocation}</span>
                </div>
              </div>
            )}

            {/* SEARCH BAR */}
            <div ref={searchRef} className="flex-1 max-w-[650px] relative hidden sm:block">
              <div className={`flex items-center h-[44px] bg-slate-50 rounded-full border border-slate-200 transition-all focus-within:bg-white focus-within:border-[#1d4ed8] focus-within:shadow-[0_0_0_4px_rgba(29,78,216,0.1)] group`}>
                <div className="pl-4 pr-2 text-slate-400">
                  <Search size={18} className="group-focus-within:text-[#1d4ed8] transition-colors" />
                </div>
                <input
                  type="text"
                  placeholder="What can we help you find?"
                  className="flex-1 h-full bg-transparent text-[14px] text-slate-800 outline-none placeholder:text-slate-400 font-medium"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearchTrigger()}
                />
                <button
                  onClick={() => handleSearchTrigger()}
                  className="mr-1.5 px-6 h-[36px] bg-[#1d4ed8] hover:bg-blue-700 text-white text-[13px] font-semibold rounded-full transition-all shadow-sm"
                >
                  Search
                </button>
              </div>

              <AnimatePresence>
                {isSearchFocused && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute top-[110%] left-0 w-full bg-white border border-slate-100 z-[2200] shadow-2xl rounded-2xl overflow-hidden">
                    <div className="p-0">
                      {searchValue.length > 1 ? (
                        <div className="max-h-[450px] overflow-y-auto custom-scrollbar p-2">
                          {isLoading ? (
                            <div className="p-10 text-center"><div className="w-8 h-8 border-3 border-[#1d4ed8] border-t-transparent animate-spin mx-auto rounded-full"></div></div>
                          ) : searchResults.length > 0 ? (
                            searchResults.map((product) => (
                              <Link key={product.id} to={`/product/${product.slug}`} onClick={() => setIsSearchFocused(false)} className="flex items-center gap-4 px-4 py-3 hover:bg-blue-50/50 rounded-xl transition-colors border-b border-slate-50 last:border-0">
                                <div className="w-12 h-12 bg-white rounded-lg border border-slate-100 p-1 shrink-0"><img src={getImagePath(product)} alt="" className="w-full h-full object-contain" /></div>
                                <div className="min-w-0 flex-1">
                                  <p className="text-[13px] font-semibold text-slate-900 truncate">{product.name}</p>
                                  <p className="text-[13px] text-[#1d4ed8] font-bold mt-0.5">${product.price}</p>
                                </div>
                                <ChevronRight size={14} className="text-slate-300" />
                              </Link>
                            ))
                          ) : <div className="p-10 text-center text-slate-400 font-medium"><p>No matching products found</p></div>}
                        </div>
                      ) : (
                        <div className="p-6">
                          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-4">Popular Searches</p>
                          <div className="flex flex-wrap gap-2">{['HP LaserJet', 'Canon Pixma', 'Epson Inkjet', 'Printer Cables'].map(tag => (
                            <button key={tag} onClick={() => handleSearchTrigger(tag)} className="px-4 py-2 bg-slate-50 text-[12px] text-slate-600 font-medium hover:bg-[#1d4ed8] hover:text-white rounded-full transition-all">{tag}</button>
                          ))}</div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ACTIONS */}
            <div className="flex items-center gap-2 md:gap-5 ml-auto">
              <div className="relative" ref={accountRef}>
                <button
                  onMouseEnter={() => setIsAccountOpen(true)}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-slate-50 rounded-full transition-colors group"
                >
                  <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                    <User size={18} className="text-[#1d4ed8]" />
                  </div>
                  <div className="hidden lg:flex flex-col items-start">
                    <span className="text-[11px] text-slate-500 font-medium leading-none mb-0.5">{user ? 'Account' : 'Sign In'}</span>
                    <span className="text-[13px] font-semibold text-slate-800 leading-none flex items-center gap-1">{user ? user.name.split(' ')[0] : 'Join Now'} <ChevronDown size={14} className="text-slate-400" /></span>
                  </div>
                </button>
                <AnimatePresence>
                  {isAccountOpen && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} onMouseLeave={() => setIsAccountOpen(false)} className="absolute top-[110%] right-0 w-[240px] bg-white text-slate-800 border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.15)] z-[2200] rounded-2xl p-4">
                      {!user ? (
                        <div className="space-y-3">
                          <Link to="/login" className="block w-full py-2.5 bg-[#1d4ed8] hover:bg-blue-700 rounded-xl text-[13px] text-center font-semibold text-white shadow-sm transition-all">Sign In</Link>
                          <p className="text-[11px] text-center text-slate-500 font-medium">New customer? <Link to="/signup" className="text-[#1d4ed8] font-semibold">Start here.</Link></p>
                        </div>
                      ) : (
                        <p className="text-[14px] font-semibold border-b border-slate-100 pb-3 mb-3 truncate text-[#1d4ed8]">Hi, {user.name}!</p>
                      )}
                      <ul className="space-y-1 font-medium text-slate-600">
                        <li><Link to="/profile" className="flex items-center gap-3 text-[13px] py-2 px-3 hover:bg-slate-50 rounded-xl transition-colors"><User size={16} /> Your Account</Link></li>
                        <li><Link to="/orders" className="flex items-center gap-3 text-[13px] py-2 px-3 hover:bg-slate-50 rounded-xl transition-colors"><Package size={16} /> Your Orders</Link></li>
                        <li><Link to="/wishlist" className="flex items-center gap-3 text-[13px] py-2 px-3 hover:bg-slate-50 rounded-xl transition-colors"><Heart size={16} /> Wishlist ({wishlistCount})</Link></li>
                        {user && <li><button onClick={() => { localStorage.removeItem('user'); window.location.reload(); }} className="w-full flex items-center gap-3 text-[13px] text-red-500 font-semibold py-2 px-3 hover:bg-red-50 rounded-xl transition-colors mt-2"><LogOut size={16} /> Sign Out</button></li>}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button onClick={openCartDrawer} className="flex items-center gap-2 px-3 py-2 hover:bg-slate-50 rounded-full transition-colors group relative">
                <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                  <ShoppingCart size={18} className="text-[#1d4ed8]" />
                  <span className="absolute top-1 right-1 bg-[#1d4ed8] text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">{cartCount}</span>
                </div>
                <span className="text-[14px] font-semibold text-slate-800 hidden lg:block">Cart</span>
              </button>
            </div>
          </div>
        </div>

        {/* 3. SUB NAVIGATION */}
        <div className={`bg-white text-slate-600 w-full border-b border-slate-100 transition-all ${isSticky ? 'hidden lg:block h-12' : ''}`}>
          <div className="w-full px-4 md:px-10 h-11 flex items-center justify-between">
            <div className="flex items-center h-full">
              <div 
                className="relative h-full"
                onMouseEnter={() => setIsCategoryOpen(true)}
                onMouseLeave={() => setIsCategoryOpen(false)}
              >
                <button
                  className={`flex items-center gap-2 px-5 h-full font-semibold text-[13px] transition-all border-r border-slate-100 mr-4 ${isCategoryOpen ? 'text-[#1d4ed8] bg-blue-50/50' : 'text-slate-700 hover:text-[#1d4ed8] hover:bg-slate-50'}`}
                >
                  <LayoutGrid size={18} />
                  Departments
                  <ChevronDown size={14} className={`transition-transform duration-300 ${isCategoryOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* REFINED MEGA MENU DROP DOWN */}
                <AnimatePresence>
                  {isCategoryOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 w-[700px] bg-white shadow-[0_20px_40px_rgba(0,0,0,0.1)] border border-slate-100 rounded-b-3xl overflow-hidden z-[1100]"
                    >
                      <div className="flex">
                        {/* Left Sidebar: Categories List */}
                        <div className="w-1/2 p-6 bg-white">
                          <h3 className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-6 px-2">Hardware & Supplies</h3>
                          <div className="grid grid-cols-1 gap-1">
                            {categories.map(cat => (
                              <Link 
                                key={cat.id} 
                                to={`/shop?category=${cat.slug}`} 
                                className="flex items-center justify-between py-2.5 px-3 rounded-xl text-[14px] font-medium text-slate-600 hover:text-[#1d4ed8] hover:bg-blue-50 transition-all group"
                              >
                                <div className="flex items-center gap-3">
                                  <div className="w-1.5 h-1.5 rounded-full bg-blue-100 group-hover:bg-[#1d4ed8] transition-colors" />
                                  {cat.name}
                                </div>
                                <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                              </Link>
                            ))}
                          </div>
                        </div>

                        {/* Right Sidebar: Featured/Promo Section */}
                        <div className="w-1/2 bg-slate-50/80 p-8 flex flex-col justify-center border-l border-slate-100">
                          <div className="space-y-6">
                            <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group cursor-pointer">
                              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-3 group-hover:bg-[#1d4ed8] group-hover:text-white transition-all">
                                <ShieldCheck size={20} className="text-[#1d4ed8] group-hover:text-white" />
                              </div>
                              <h4 className="text-[15px] font-semibold text-slate-900 mb-1">Premium Support</h4>
                              <p className="text-[12px] text-slate-500 leading-relaxed">Get 24/7 technical assistance for installation & drivers.</p>
                            </div>

                            <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group cursor-pointer">
                              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center mb-3 group-hover:bg-amber-500 group-hover:text-white transition-all">
                                <Zap size={20} className="text-amber-500 group-hover:text-white" />
                              </div>
                              <h4 className="text-[15px] font-semibold text-slate-900 mb-1">Fast Delivery</h4>
                              <p className="text-[12px] text-slate-500 leading-relaxed">Worldwide express shipping in 2-5 business days.</p>
                            </div>

                            <Link to="/contact" className="flex items-center justify-center gap-2 py-3 bg-[#1d4ed8] text-white rounded-xl text-[13px] font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 active:scale-95">
                              Talk to an Expert <ChevronRight size={16} />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="hidden lg:flex items-center gap-2 h-full">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`px-4 py-1.5 rounded-full text-[13px] font-medium transition-all ${location.pathname === link.path ? 'text-[#1d4ed8] bg-blue-50' : 'text-slate-600 hover:text-[#1d4ed8] hover:bg-slate-50'}`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="hidden xl:flex items-center gap-6">
              <Link to="/shop?category=all-in-one-printers" className="flex items-center gap-1.5 text-[12px] font-medium text-slate-500 hover:text-[#1d4ed8] transition-colors">
                <Monitor size={15} /> All-In-One
              </Link>
              <Link to="/shop?category=laser-printers" className="flex items-center gap-1.5 text-[12px] font-medium text-slate-500 hover:text-[#1d4ed8] transition-colors">
                <Printer size={15} /> Laser
              </Link>
              <Link to="/shop?category=inkjet-printers" className="flex items-center gap-1.5 text-[12px] font-medium text-slate-500 hover:text-[#1d4ed8] transition-colors">
                <Droplets size={15} /> Inkjet
              </Link>
              <Link to="/shop?category=supertank-printers" className="flex items-center gap-1.5 text-[12px] font-medium text-slate-500 hover:text-[#1d4ed8] transition-colors">
                <Cpu size={15} /> Supertank
              </Link>
              <Link to="/shop?category=printer-accessories" className="flex items-center gap-1.5 text-[12px] font-medium text-slate-500 hover:text-[#1d4ed8] transition-colors">
                <Settings size={15} /> Accessories
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Placeholder to prevent layout jump when header becomes fixed */}
      {isSticky && <div className="h-[120px] lg:h-[160px] w-full invisible"></div>}

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-slate-900/60 z-[2000] backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
            <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} className="fixed top-0 left-0 bottom-0 w-[85%] max-w-[340px] bg-white z-[2100] flex flex-col shadow-2xl">
              <div className="bg-[#1d4ed8] text-white p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center border border-white/20"><User size={22} /></div>
                  <div className="flex flex-col">
                    <span className="text-[11px] opacity-70 font-medium leading-none mb-1">Welcome</span>
                    <span className="font-semibold text-[17px] leading-none">{user ? user.name.split(' ')[0] : 'Sign In'}</span>
                  </div>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"><X size={24} /></button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-10">
                <div>
                  <h3 className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest px-2 mb-6">Explore Departments</h3>
                  <div className="grid grid-cols-1 gap-1">
                    {categories.map(cat => (<Link key={cat.id} to={`/shop?category=${cat.slug}`} onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-between py-3 px-4 text-[15px] font-medium text-slate-700 hover:bg-blue-50 hover:text-[#1d4ed8] rounded-2xl transition-all">{cat.name} <ChevronRight size={16} className="opacity-40" /></Link>))}
                  </div>
                </div>
                <div>
                  <h3 className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest px-2 mb-6">Quick Links</h3>
                  <div className="grid grid-cols-1 gap-1">
                    {navLinks.map(link => (<Link key={link.name} to={link.path} onClick={() => setIsMobileMenuOpen(false)} className="block py-3 px-4 text-[15px] font-medium text-slate-700 hover:bg-blue-50 hover:text-[#1d4ed8] rounded-2xl transition-all">{link.name}</Link>))}
                  </div>
                </div>
              </div>
              <div className="p-6 border-t border-slate-100 bg-slate-50/50">
                <Link to="/contact" className="flex items-center gap-4 w-full p-4 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-md transition-all">
                  <div className="w-12 h-12 rounded-2xl bg-[#1d4ed8] flex items-center justify-center text-white shadow-lg shadow-blue-100"><Headphones size={22} /></div>
                  <div><p className="text-[14px] font-semibold text-slate-900 leading-none mb-1">24/7 Support</p><p className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">Help Center</p></div>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f8fafc; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 20px; border: 2px solid #f8fafc; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
      `}</style>
    </>
  );
}
