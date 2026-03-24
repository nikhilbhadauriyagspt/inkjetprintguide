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
  Droplets,
  Layers,
  Cpu,
  ChevronRight,
  ShieldCheck,
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
  const [userLocation, setUserLocation] = useState('Noida, IN');

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
          } catch { setUserLocation('Noida, IN'); }
        },
        () => { setUserLocation('Noida, IN'); },
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
    <header className={`w-full font-['Rubik'] relative z-[1000] transition-all duration-300 ${isSticky ? 'fixed top-0 left-0 shadow-xl' : ''}`}>
      
      {/* 1. TOP BAR */}
      {!isSticky && (
        <div className="bg-[#0f172a] text-white py-1.5 text-[11px] font-normal w-full border-b border-white/5">
          <div className="w-full px-4 md:px-10 flex justify-between items-center opacity-80 font-medium">
            <div className="flex items-center gap-8">
               <span className="flex items-center gap-1.5"><Globe size={12} className="text-[#f59e0b]" /> Worldwide Shipping Hub</span>
               <span className="flex items-center gap-1.5 uppercase tracking-widest text-[9px]"><Truck size={12} className="text-[#f59e0b]" /> Express Global Delivery</span>
            </div>
            <div className="flex items-center gap-6">
               <Link to="/orders" className="hover:text-[#f59e0b] transition-colors">Track Order</Link>
               <Link to="/faq" className="hover:text-[#f59e0b] transition-colors">Support</Link>
            </div>
          </div>
        </div>
      )}

      {/* 2. MAIN HEADER */}
      <div className={`bg-[#1e1b4b] text-white py-2.5 w-full border-b border-white/5 transition-all ${isSearchFocused ? 'bg-[#16143a]' : ''}`}>
        <div className="w-full px-4 md:px-10 flex items-center gap-4 lg:gap-8">
          
          <button className="lg:hidden p-1.5 hover:bg-white/10 rounded-md transition-colors" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu size={28} />
          </button>

          <Link to="/" className="shrink-0 flex items-center p-1.5 hover:outline hover:outline-1 outline-white/30 rounded-sm transition-all">
            <img src="/logo/logo.png" alt="Logo" className="h-7 md:h-9 object-contain brightness-0 invert" />
          </Link>

          {/* DELIVER TO */}
          <div className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 hover:outline hover:outline-1 outline-white/30 rounded-sm cursor-pointer border border-transparent">
             <MapPin size={16} className="text-[#f59e0b]" />
             <div className="flex flex-col">
                <span className="text-[10px] font-light leading-none opacity-60">Deliver to</span>
                <span className="text-[13px] font-medium leading-none truncate max-w-[120px]">{userLocation}</span>
             </div>
          </div>

          {/* SEARCH BAR */}
          <div ref={searchRef} className="flex-1 max-w-[800px] relative hidden sm:block">
            <div className={`flex items-center h-[40px] bg-white rounded-[4px] overflow-hidden transition-all ${isSearchFocused ? 'ring-2 ring-[#f59e0b]' : ''}`}>
               <div className="hidden md:flex items-center gap-1 px-4 py-2 bg-gray-50 border-r border-gray-200 text-gray-600 text-[12px] font-semibold cursor-pointer hover:bg-gray-200">
                  All <ChevronDown size={14} className="opacity-50" />
               </div>
               <input
                 type="text"
                 placeholder="Search printers and accessories..."
                 className="flex-1 h-full px-4 text-[14px] text-gray-900 outline-none placeholder:text-gray-400 font-normal"
                 value={searchValue}
                 onChange={(e) => setSearchValue(e.target.value)}
                 onFocus={() => setIsSearchFocused(true)}
                 onKeyDown={(e) => e.key === 'Enter' && handleSearchTrigger()}
               />
               <button onClick={() => handleSearchTrigger()} className="bg-[#f59e0b] hover:bg-[#d97706] text-[#1e1b4b] h-full w-[50px] flex items-center justify-center">
                 <Search size={20} strokeWidth={2.5} />
               </button>
            </div>

            <AnimatePresence>
              {isSearchFocused && (
                <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }} className="absolute top-full left-0 w-full bg-white border border-gray-100 z-[2200] shadow-2xl rounded-b-sm overflow-hidden">
                  <div className="p-0">
                    {searchValue.length > 1 ? (
                      <div className="max-h-[450px] overflow-y-auto custom-scrollbar p-1">
                        {isLoading ? (
                           <div className="p-10 text-center"><div className="w-8 h-8 border-3 border-[#1e1b4b] border-t-transparent animate-spin mx-auto rounded-full"></div></div>
                        ) : searchResults.length > 0 ? (
                          searchResults.map((product) => (
                            <Link key={product.id} to={`/product/${product.slug}`} onClick={() => setIsSearchFocused(false)} className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50 border-b border-gray-50 last:border-0">
                              <div className="w-10 h-10 bg-white rounded border border-gray-100 p-0.5 shrink-0"><img src={getImagePath(product)} alt="" className="w-full h-full object-contain" /></div>
                              <div className="min-w-0"><p className="text-[13px] font-semibold text-gray-900 truncate">{product.name}</p><p className="text-[12px] text-[#1e1b4b] font-bold mt-0.5">${product.price}</p></div>
                            </Link>
                          ))
                        ) : <p className="text-[13px] text-gray-500 text-center py-10 font-medium">No matches found globally</p>}
                      </div>
                    ) : (
                      <div className="p-5 text-gray-800">
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">Trending Collections</p>
                        <div className="flex flex-wrap gap-2">{['LaserJet', 'Inkjet', 'Brother', 'Cartridge'].map(tag => (
                          <button key={tag} onClick={() => handleSearchTrigger(tag)} className="px-4 py-2 bg-gray-100 text-[12px] text-gray-700 font-medium hover:bg-[#1e1b4b] hover:text-white rounded-sm transition-all">{tag}</button>
                        ))}</div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-1 md:gap-4 ml-auto h-full">
            <div className="relative h-full flex items-center" ref={accountRef}>
               <button onMouseEnter={() => setIsAccountOpen(true)} className="flex flex-col items-start px-2 py-1 border border-transparent hover:border-white rounded-sm h-[80%] justify-center group transition-all">
                  <span className="text-[11px] font-light leading-none opacity-70 mb-0.5">Hello, {user ? user.name.split(' ')[0] : 'Sign In'}</span>
                  <span className="text-[13px] font-medium flex items-center gap-0.5">Account & Lists <ChevronDown size={14} className="opacity-50" /></span>
               </button>
               <AnimatePresence>
                {isAccountOpen && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} onMouseLeave={() => setIsAccountOpen(false)} className="absolute top-full right-0 w-[240px] bg-white text-gray-800 border border-gray-100 shadow-2xl z-[2200] mt-0.5 rounded-sm p-3">
                    {!user ? <Link to="/login" className="block w-full py-2 bg-[#f59e0b] hover:bg-[#d97706] rounded-[3px] text-[13px] text-center font-bold text-[#1e1b4b]">Sign In</Link> : <p className="text-[12px] font-bold border-b pb-2 mb-2 truncate">Hi, {user.name}!</p>}
                    <ul className="space-y-1 mt-2 font-medium">
                       <li><Link to="/profile" className="block text-[12px] py-1.5 px-2 hover:bg-gray-50 rounded transition-colors text-gray-600">Your Account</Link></li>
                       <li><Link to="/orders" className="block text-[12px] py-1.5 px-2 hover:bg-gray-50 rounded transition-colors text-gray-600">Your Orders</Link></li>
                       <li><Link to="/wishlist" className="block text-[12px] py-1.5 px-2 hover:bg-gray-50 rounded transition-colors text-gray-600">Your Wishlist ({wishlistCount})</Link></li>
                       {user && <li><button onClick={() => { localStorage.removeItem('user'); window.location.reload(); }} className="w-full text-left text-[12px] text-red-600 font-bold py-1.5 px-2 hover:bg-red-50 rounded transition-colors mt-2">Sign Out</button></li>}
                    </ul>
                  </motion.div>
                )}
               </AnimatePresence>
            </div>

            <Link to="/orders" className="hidden lg:flex flex-col items-start px-2 py-1 border border-transparent hover:border-white rounded-sm h-[80%] justify-center">
               <span className="text-[11px] font-light leading-none opacity-70 mb-0.5">Returns</span>
               <span className="text-[13px] font-medium">& Orders</span>
            </Link>

            <button onClick={openCartDrawer} className="flex items-end gap-1.5 px-2 py-1 border border-transparent hover:border-white rounded-sm relative group h-[80%] justify-center">
               <div className="relative"><ShoppingCart size={28} className="group-hover:scale-105 transition-transform" />
                  <span className="absolute -top-1 -right-1 bg-[#f59e0b] text-[#1e1b4b] text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border-2 border-[#1e1b4b]">{cartCount}</span>
               </div>
               <span className="text-[13px] font-bold mb-0.5 hidden lg:block">Cart</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. SUB NAVIGATION */}
      <div className="bg-[#4f46e5] text-white w-full shadow-md overflow-x-auto no-scrollbar">
        <div className="w-full px-4 md:px-10 h-[40px] flex items-center gap-1">
          
          <button 
            className="flex items-center gap-1.5 px-4 h-[40px] bg-white/10 hover:bg-white/20 transition-all font-bold text-[13px] whitespace-nowrap border-r border-white/10"
            onMouseEnter={() => setIsCategoryOpen(true)}
            onMouseLeave={() => setIsCategoryOpen(false)}
          >
            <Menu size={20} className="text-[#f59e0b]" />
            Departments
          </button>

          <div className="flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.name} to={link.path} className={`px-4 py-1.5 border border-transparent hover:border-white rounded-sm text-[12px] font-medium whitespace-nowrap transition-all nav-link-ltr ${location.pathname === link.path ? 'bg-white/20' : ''}`}>{link.name}</Link>
            ))}
          </div>

          <p className="ml-auto hidden xl:block text-[11px] font-medium text-[#f59e0b] uppercase tracking-wide"><Zap size={14} className="inline-block mr-1 mb-0.5" /> Premium Printing Solutions & Professional Support</p>
        </div>
      </div>

      {/* REFINED MEGA MENU OVERLAY */}
      <AnimatePresence>
        {isCategoryOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            onMouseEnter={() => setIsCategoryOpen(true)} onMouseLeave={() => setIsCategoryOpen(false)}
            className="absolute top-full left-0 w-full bg-white text-gray-800 shadow-[0_30px_60px_rgba(0,0,0,0.15)] z-[900] border-t border-gray-100 py-12 px-10 hidden lg:block"
          >
            <div className="w-full px-10 grid grid-cols-12 gap-12">
               
               {/* HARDWARE SECTION */}
               <div className="col-span-4">
                  <div className="flex items-center gap-2 mb-6 text-[#1e1b4b]"><Printer size={18} className="text-[#f59e0b]" /> <h3 className="text-[14px] font-bold uppercase tracking-widest">Printing Hardware</h3></div>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                    {categories.map(cat => (
                      <div key={cat.id} className="group">
                        <Link to={`/shop?category=${cat.slug}`} className="text-[13px] font-medium text-gray-600 hover:text-[#4f46e5] flex items-center justify-between group-hover:translate-x-1 transition-transform">
                          {cat.name} <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-all text-[#f59e0b]" />
                        </Link>
                      </div>
                    ))}
                  </div>
               </div>

               {/* RIGHT PROMO SECTION */}
               <div className="col-span-8 bg-indigo-50/50 rounded-2xl p-10 flex flex-col justify-center border border-indigo-100 relative overflow-hidden group">
                  <div className="relative z-10">
                     <span className="bg-[#f59e0b] text-[#1e1b4b] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4 inline-block">Support Hub</span>
                     <p className="text-[#1e1b4b] text-[26px] font-bold mb-3 leading-tight">Need Expert Setup Help?</p>
                     <p className="text-gray-600 text-[14px] mb-8 font-medium leading-relaxed">Our technical experts are available 24/7 to assist you with printer installation, driver setup, and troubleshooting.</p>
                     <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-3 bg-[#1e1b4b] text-white font-bold text-[13px] rounded-lg hover:bg-[#0f172a] transition-all shadow-lg shadow-indigo-100">
                        TALK TO EXPERT <ChevronRight size={16} />
                     </Link>
                  </div>
                  <ShieldCheck size={180} className="absolute -right-10 -bottom-10 text-indigo-500 opacity-[0.03] rotate-12 group-hover:scale-110 transition-transform duration-700" />
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 z-[2000] backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
            <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} className="fixed top-0 left-0 bottom-0 w-[80%] max-w-[320px] bg-white z-[2100] flex flex-col shadow-2xl">
              <div className="bg-[#1e1b4b] text-white p-6 flex items-center justify-between"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center border border-white/20"><User size={22} /></div><span className="font-bold text-[16px]">Hi, {user ? user.name.split(' ')[0] : 'Sign In'}</span></div><button onClick={() => setIsMobileMenuOpen(false)}><X size={26} /></button></div>
              <div className="flex-1 overflow-y-auto p-5 space-y-10">
                <div><h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2 mb-4">By Category</h3>{categories.map(cat => (<Link key={cat.id} to={`/shop?category=${cat.slug}`} onClick={() => setIsMobileMenuOpen(false)} className="block py-3 px-3 text-[14px] font-medium text-gray-700 hover:bg-gray-50 rounded-lg">{cat.name}</Link>))}</div>
                <div><h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2 mb-4">Quick Links</h3>{navLinks.map(link => (<Link key={link.name} to={link.path} onClick={() => setIsMobileMenuOpen(false)} className="block py-3 px-3 text-[14px] font-medium text-gray-700 hover:bg-gray-50 rounded-lg">{link.name}</Link>))}</div>
              </div>
              <div className="p-5 border-t border-gray-100 bg-gray-50/50"><Link to="/contact" className="flex items-center gap-4 w-full p-4 bg-white border border-gray-100 rounded-xl"><div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-[#1e1b4b]"><Headphones size={20} /></div><div><p className="text-[13px] font-bold text-gray-900">24/7 Support</p><p className="text-[11px] text-gray-500 font-semibold">Always here to help</p></div></Link></div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f8fafc; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
      `}</style>
    </header>
  );
}
