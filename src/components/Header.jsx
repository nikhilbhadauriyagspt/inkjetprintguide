import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useCart } from "../context/CartContext";
import { useGlobalData } from "../context/DataContext";
import API_BASE_URL from "../config";
import Search from 'lucide-react/dist/esm/icons/search';
import User from 'lucide-react/dist/esm/icons/user';
import ShoppingCart from 'lucide-react/dist/esm/icons/shopping-cart';
import Menu from 'lucide-react/dist/esm/icons/menu';
import X from 'lucide-react/dist/esm/icons/x';
import LogOut from 'lucide-react/dist/esm/icons/log-out';
import Package from 'lucide-react/dist/esm/icons/package';
import Heart from 'lucide-react/dist/esm/icons/heart';
import GitCompare from 'lucide-react/dist/esm/icons/git-compare';
import LayoutGrid from 'lucide-react/dist/esm/icons/layout-grid';
import ChevronDown from 'lucide-react/dist/esm/icons/chevron-down';
import Phone from 'lucide-react/dist/esm/icons/phone';
import MessageCircle from 'lucide-react/dist/esm/icons/message-circle';
import Mail from 'lucide-react/dist/esm/icons/mail';
import MapPin from 'lucide-react/dist/esm/icons/map-pin';
import Printer from 'lucide-react/dist/esm/icons/printer';
import ChevronRight from 'lucide-react/dist/esm/icons/chevron-right';
import { m, AnimatePresence } from 'framer-motion';

export default function Header() {
  const { cartCount, cartTotal, openCartDrawer } = useCart();
  const { categories: globalCategories } = useGlobalData();

  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isEmailOpen, setIsEmailOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const searchRef = useRef(null);
  const accountRef = useRef(null);
  const emailRef = useRef(null);
  const categoryRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (globalCategories.length > 0) {
      const printerParent = globalCategories.find(
        (cat) => cat.slug === "printers" || cat.id === 46
      );
      setCategories(
        printerParent?.children ||
        globalCategories.filter(
          (c) => !c.name.toLowerCase().includes("laptop")
        )
      );
    }
  }, [globalCategories]);

  useEffect(() => {
    const checkUser = () => {
      const savedUser = localStorage.getItem("user");
      setUser(savedUser ? JSON.parse(savedUser) : null);
    };

    checkUser();
    window.addEventListener("storage", checkUser);
    return () => window.removeEventListener("storage", checkUser);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchValue.trim().length > 1) {
        setIsLoading(true);

        fetch(`${API_BASE_URL}/products?search=${encodeURIComponent(searchValue)}`)
          .then((res) => res.json())
          .then((data) => {
            setSearchResults(data.status === "success" ? data.data : []);
            setIsLoading(false);
          })
          .catch(() => setIsLoading(false));
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchValue]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchActive(false);
      }

      if (accountRef.current && !accountRef.current.contains(e.target)) {
        setIsAccountOpen(false);
      }

      if (emailRef.current && !emailRef.current.contains(e.target)) {
        setIsEmailOpen(false);
      }

      if (categoryRef.current && !categoryRef.current.contains(e.target)) {
        setIsCategoryOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Inkjet Printers", path: "/shop?category=inkjet-printers" },
    { name: "Laser Printers", path: "/shop?category=laser-printers" },
    { name: "All In One", path: "/shop?category=all-in-one-printers" },
    { name: "Accessories", path: "/shop?category=printer-accessories" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  const getFirstImage = (images) => {
    try {
      const parsed = JSON.parse(images || "[]");
      if (parsed?.[0]) {
        return `/${parsed[0].replace(/\\/g, "/")}`;
      }
      return "/logo/fabicon.png";
    } catch {
      return "/logo/fabicon.png";
    }
  };

  const isActiveLink = (path) => {
    if (path === "/") return location.pathname === "/";
    if (path.includes("?")) return location.pathname + location.search === path;
    return location.pathname === path;
  };

  return (
    <>
      <header className={`w-full sticky top-0 z-[50] bg-white border-b border-slate-100 transition-all duration-300 ${isScrolled ? 'shadow-md py-0' : 'py-1 md:py-2'}`}>
        {/* Main Header */}
        <div className={`max-w-[1600px] mx-auto px-4 lg:px-8 flex items-center justify-between gap-4 transition-all duration-300 ${isScrolled ? 'h-[64px] md:h-[76px]' : 'h-[80px] md:h-[96px]'}`}>
          {/* Logo */}
          <Link to="/" className="shrink-0 flex items-center">
            <img
              src="/logo/logo.avif"
              alt="Inklivo"
              className={`w-auto object-contain transition-all duration-300 ${isScrolled ? 'h-7 md:h-9' : 'h-8 md:h-11'}`}
            />
          </Link>

          {/* Search */}
          <div
            className="hidden md:block flex-1 max-w-[800px] relative"
            ref={searchRef}
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search printers, toner, ink, accessories..."
                className="w-full h-[48px] rounded-full bg-[#f3f6f7] border border-slate-200 pl-6 pr-14 text-[15px] text-slate-700 outline-none transition focus:border-[#05718A] focus:bg-white"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onFocus={() => setIsSearchActive(true)}
              />
              <button
                type="submit"
                aria-label="Search"
                className="absolute right-1 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-slate-500 hover:text-[#05718A] transition"
              >
                <Search size={19} />
              </button>
            </div>

            <AnimatePresence>
              {isSearchActive && searchValue.length > 1 && (
                <m.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="absolute left-0 right-0 top-full mt-3 bg-white rounded-lg border border-slate-200 shadow-2xl p-2 z-[5200]"
                >
                  {isLoading ? (
                    <div className="py-6 text-center text-sm text-slate-500">
                      Searching...
                    </div>
                  ) : searchResults.length > 0 ? (
                    <div className="max-h-[380px] overflow-y-auto custom-scrollbar">
                      {searchResults.slice(0, 6).map((product) => (
                        <button
                          key={product.id}
                          aria-label={`View ${product.name}`}
                          onClick={() => {
                            navigate(`/product/${product.slug}`);
                            setIsSearchActive(false);
                            setSearchValue("");
                          }}
                          className="w-full flex items-center gap-3 p-3 rounded-md hover:bg-slate-50 text-left transition"
                        >
                          <div className="w-14 h-14 rounded-md bg-slate-50 border border-slate-200 p-2 shrink-0">
                            <img
                              src={getFirstImage(product.images)}
                              alt={product.name}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="text-[14px] font-semibold text-slate-800 truncate">
                              {product.name}
                            </p>
                            <p className="text-[14px] font-bold text-[#05718A]">
                              ${product.price}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="py-6 text-center text-sm text-slate-500">
                      No results found
                    </div>
                  )}
                </m.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-5 shrink-0">
            {/* Email dropdown block */}
            <div className="relative" ref={emailRef}>
              <button
                type="button"
                onClick={() => setIsEmailOpen((prev) => !prev)}
                className="flex items-start gap-3 text-left group"
              >
                <div className="pt-1 text-[#05718A]">
                  <Mail size={22} />
                </div>

                <div className="leading-tight">
                  <div className="flex items-center gap-2">
                    <span className="text-[16px] font-bold text-[#05718A]">
                      info@inklivo.shop
                    </span>
                    <ChevronDown
                      size={15}
                      className={`text-slate-500 transition duration-200 ${isEmailOpen ? "rotate-180 text-[#05718A]" : "group-hover:text-[#05718A]"
                        }`}
                    />
                  </div>
                  <p className="text-[12px] text-slate-500 mt-1">
                    Quality Printing Solutions
                  </p>
                </div>
              </button>

              <AnimatePresence>
                {isEmailOpen && (
                  <m.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-4 w-[360px] bg-white border border-slate-200 rounded-lg shadow-[0_20px_60px_rgba(15,23,42,0.14)] p-6 z-[5300]"
                  >
                    <div className="space-y-6">
                      <div>
                        <a
                          href="mailto:info@inklivo.shop"
                          className="mt-3 flex items-center gap-3 text-[#05718A]"
                        >
                          <Mail size={23} />
                          <span className="text-[18px] font-semibold">
                            info@inklivo.shop
                          </span>
                        </a>
                        <p className="mt-2 text-[13px] text-slate-500">
                          Response time: within 24 hours
                        </p>
                      </div>

                    <div className="border-t border-slate-200 pt-6 space-y-4">
                    </div>
                    </div>
                  </m.div>
                )}
              </AnimatePresence>
            </div>

            <div className="w-px h-10 bg-slate-200" />

            {/* Account */}
            <div className="relative" ref={accountRef}>
              <button
                onClick={() => setIsAccountOpen((prev) => !prev)}
                className="flex items-center gap-2 hover:text-[#05718A] transition text-slate-700"
              >
                <User size={20} />
                <span className="text-[14px] font-medium">Sign In</span>
              </button>

              <AnimatePresence>
                {isAccountOpen && (
                  <m.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute right-0 top-full mt-3 w-60 bg-white border border-slate-200 rounded-lg shadow-xl py-2 z-[5300]"
                  >
                    {!user ? (
                      <div className="p-3 space-y-2">
                        <Link
                          to="/login"
                          onClick={() => setIsAccountOpen(false)}
                          className="block w-full text-center py-2.5 rounded-md bg-[#05718A] text-white text-sm font-semibold"
                        >
                          Sign In
                        </Link>
                        <Link
                          to="/signup"
                          onClick={() => setIsAccountOpen(false)}
                          className="block w-full text-center py-2.5 rounded-md border border-slate-300 text-slate-700 text-sm font-semibold"
                        >
                          Register
                        </Link>
                      </div>
                    ) : (
                      <>
                        <div className="px-4 py-3 border-b border-slate-100">
                          <p className="text-xs text-slate-400 uppercase font-semibold">
                            Profile
                          </p>
                          <p className="text-sm font-bold text-slate-800 truncate">
                            {user.name}
                          </p>
                        </div>

                        <Link
                          to="/profile"
                          onClick={() => setIsAccountOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50"
                        >
                          <User size={16} />
                          My Account
                        </Link>

                        <Link
                          to="/orders"
                          onClick={() => setIsAccountOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50"
                        >
                          <Package size={16} />
                          My Orders
                        </Link>

                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-50 border-t border-slate-100"
                        >
                          <LogOut size={16} />
                          Logout
                        </button>
                      </>
                    )}
                  </m.div>
                )}
              </AnimatePresence>
            </div>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="flex items-center gap-2 hover:text-[#05718A] transition text-slate-700"
            >
              <Heart size={20} />
              <span className="text-[14px] font-medium">Wishlist</span>
            </Link>

            {/* Compare */}
            <Link
              to="/compare"
              className="flex items-center gap-2 hover:text-[#05718A] transition text-slate-700"
            >
              <GitCompare size={20} />
              <span className="text-[14px] font-medium">Compare</span>
            </Link>

            {/* Cart */}
            <button
              onClick={openCartDrawer}
              className="relative flex items-center gap-2 hover:text-[#05718A] transition text-slate-700"
            >
              <ShoppingCart size={20} />
              <span className="text-[14px] font-medium">Cart</span>

              {cartCount > 0 && (
                <span className="absolute -top-2 left-3 min-w-[18px] h-[18px] px-1 rounded-full bg-[#05718A] text-white text-[10px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile actions */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={openCartDrawer}
              aria-label="Open cart"
              className="relative p-2 text-slate-700"
            >
              <ShoppingCart size={23} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-[#05718A] text-white text-[10px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
              className="p-2 text-slate-700"
            >
              <Menu size={27} />
            </button>
          </div>
        </div>

        {/* Nav row */}
        <div className="border-t border-slate-100">
          <div className="max-w-[1600px] mx-auto px-4 lg:px-8 h-[56px] flex items-center justify-between">
            <div className="flex items-center gap-8 w-full">
              <div className="relative" ref={categoryRef}>
                <div
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                  className="hidden md:flex items-center gap-2 text-slate-800 font-medium cursor-pointer group"
                >
                  <LayoutGrid size={17} className="text-[#05718A]" />
                  <span className="text-[14px]">All Categories</span>
                  <ChevronDown
                    size={15}
                    className={`transition duration-200 ${isCategoryOpen ? "rotate-180 text-[#05718A]" : "group-hover:text-[#05718A]"
                      }`}
                  />
                </div>

                <AnimatePresence>
                  {isCategoryOpen && (
                    <m.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="absolute left-0 top-full mt-4 w-64 bg-white border border-slate-200 rounded-md shadow-xl py-3 z-[5300] overflow-hidden"
                    >
                      <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                        {categories.map((cat) => (
                          <Link
                            key={cat.id}
                            to={`/shop?category=${cat.slug}`}
                            onClick={() => setIsCategoryOpen(false)}
                            className="flex items-center justify-between px-5 py-3 hover:bg-slate-50 group/item transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-sm bg-slate-50 flex items-center justify-center group-hover/item:bg-white border border-transparent group-hover/item:border-slate-100 transition-all">
                                <Printer size={16} className="text-[#05718A]" />
                              </div>
                              <span className="text-sm font-semibold text-slate-700 group-hover/item:text-[#05718A]">
                                {cat.name}
                              </span>
                            </div>
                            <ChevronRight size={14} className="text-slate-300 group-hover/item:text-[#05718A] group-hover/item:translate-x-0.5 transition-all" />
                          </Link>
                        ))}
                      </div>
                    </m.div>
                  )}
                </AnimatePresence>
              </div>

              <nav className="flex items-center gap-7 overflow-x-auto no-scrollbar scroll-smooth">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`text-[15px] font-medium whitespace-nowrap transition ${isActiveLink(link.path)
                      ? "text-[#05718A]"
                      : "text-slate-700 hover:text-[#05718A]"
                      }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="hidden xl:flex items-center gap-3 text-sm text-slate-500">
              <span>Free Shipping on Selected Orders</span>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <m.div
              onClick={() => setIsMobileMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-[2000]"
            />

            <m.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 24 }}
              className="fixed top-0 left-0 bottom-0 w-[300px] bg-white z-[2100] flex flex-col"
            >
              <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                <img src="/logo/logo.png" alt="Logo" className="h-8" />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X size={24} className="text-slate-500" />
                </button>
              </div>

              <div className="p-4 border-b border-slate-100">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full h-12 rounded-full bg-slate-100 border border-slate-200 pl-5 pr-12 text-sm outline-none focus:border-[#05718A]"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                  <button
                    aria-label="Search"
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-slate-500"
                  >
                    <Search size={18} />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-6">
                <nav className="space-y-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block px-4 py-3 rounded-xl text-[15px] font-medium ${isActiveLink(link.path)
                        ? "bg-[#05718A] text-white"
                        : "text-slate-700 hover:bg-slate-50"
                        }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                  
                  <div className="pt-4 mt-4 border-t border-slate-100 space-y-1">
                    <Link
                      to="/wishlist"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block px-4 py-3 rounded-xl text-[15px] font-medium ${isActiveLink("/wishlist")
                        ? "bg-[#05718A] text-white"
                        : "text-slate-700 hover:bg-slate-50"
                        }`}
                    >
                      Wishlist
                    </Link>
                    <Link
                      to="/compare"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block px-4 py-3 rounded-xl text-[15px] font-medium ${isActiveLink("/compare")
                        ? "bg-[#05718A] text-white"
                        : "text-slate-700 hover:bg-slate-50"
                        }`}
                    >
                      Compare
                    </Link>
                  </div>
                </nav>

                <div className="pt-4 border-t border-slate-100">
                  <p className="text-xs font-semibold uppercase text-slate-400 mb-3">
                    Categories
                  </p>
                  <div className="space-y-1">
                    {categories.map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/shop?category=${cat.slug}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:text-[#05718A]"
                      >
                        <Printer size={14} className="text-slate-400" />
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 bg-slate-50 border-t border-slate-100">
                {!user ? (
                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      to="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="py-3 text-center rounded-xl bg-[#05718A] text-white text-sm font-semibold"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="py-3 text-center rounded-xl border border-slate-300 bg-white text-slate-700 text-sm font-semibold"
                    >
                      Join
                    </Link>
                  </div>
                ) : (
                  <div className="bg-white border border-slate-200 rounded-xl p-3 flex items-center justify-between">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-full bg-[#05718A] text-white flex items-center justify-center font-bold">
                        {user.name?.[0] || "U"}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-800 truncate">
                          {user.name}
                        </p>
                      </div>
                    </div>
                    <button onClick={handleLogout} className="text-red-500">
                      <LogOut size={18} />
                    </button>
                  </div>
                )}
              </div>
            </m.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
}