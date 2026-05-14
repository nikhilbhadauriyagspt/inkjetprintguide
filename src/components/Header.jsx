import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useCart } from "../context/CartContext";
import { useGlobalData } from "../context/DataContext";
import API_BASE_URL from "../config";
import Search from "lucide-react/dist/esm/icons/search";
import User from "lucide-react/dist/esm/icons/user";
import ShoppingCart from "lucide-react/dist/esm/icons/shopping-cart";
import Menu from "lucide-react/dist/esm/icons/menu";
import X from "lucide-react/dist/esm/icons/x";
import LogOut from "lucide-react/dist/esm/icons/log-out";
import Package from "lucide-react/dist/esm/icons/package";
import Heart from "lucide-react/dist/esm/icons/heart";
import GitCompare from "lucide-react/dist/esm/icons/git-compare";
import ChevronDown from "lucide-react/dist/esm/icons/chevron-down";
import Printer from "lucide-react/dist/esm/icons/printer";
import ChevronRight from "lucide-react/dist/esm/icons/chevron-right";
import { m, AnimatePresence } from "framer-motion";

export default function Header() {
  const {
    cartCount,
    openCartDrawer,
    wishlistCount,
    openWishlistDrawer,
    compareCount,
    openCompareDrawer
  } = useCart();
  const { categories: globalCategories } = useGlobalData();

  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchDrawerOpen, setIsSearchDrawerOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const accountRef = useRef(null);
  const categoryRef = useRef(null);

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
      if (accountRef.current && !accountRef.current.contains(e.target)) {
        setIsAccountOpen(false);
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
      if (parsed?.[0]) return `/${parsed[0].replace(/\\/g, "/")}`;
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
      <header className="fixed left-0 right-0 top-0 z-[1000] px-4 pt-0">
        <div className="mx-auto flex h-[70px] max-w-[1700px] items-center justify-between rounded-b-[10px] bg-white px-7">
          <Link to="/" className="flex shrink-0 items-center">
            <img
              src="/logo/logo.webp"
              alt="Inkjet Print Guide"
              className="h-[34px] w-auto object-contain"
            />
          </Link>

          <nav className="hidden items-center gap-9 lg:flex">
            <Link
              to="/"
              className={`text-[15px] font-[600] transition ${isActiveLink("/")
                ? "text-[#4254e8]"
                : "text-[#12162f] hover:text-[#4254e8]"
                }`}
            >
              Home
            </Link>

            <div className="relative" ref={categoryRef}>
              <button
                onClick={() => setIsCategoryOpen((prev) => !prev)}
                className="flex items-center gap-1 text-[15px] font-[600] text-[#12162f] transition hover:text-[#4254e8]"
              >
                Categories
                <ChevronDown
                  size={15}
                  className={`transition ${isCategoryOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {isCategoryOpen && (
                  <m.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute left-0 top-full mt-6 w-[270px] overflow-hidden rounded-[14px] border border-slate-100 bg-white py-3 shadow-2xl"
                  >
                    <div className="max-h-[420px] overflow-y-auto custom-scrollbar">
                      {categories.map((cat) => (
                        <Link
                          key={cat.id}
                          to={`/shop?category=${cat.slug}`}
                          onClick={() => setIsCategoryOpen(false)}
                          className="flex items-center justify-between px-5 py-3 text-[14px] font-medium text-slate-700 transition hover:bg-slate-50 hover:text-[#4254e8]"
                        >
                          <span className="flex items-center gap-3">
                            <Printer size={16} className="text-[#4254e8]" />
                            {cat.name}
                          </span>
                          <ChevronRight size={14} />
                        </Link>
                      ))}
                    </div>
                  </m.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              to="/shop"
              className={`text-[15px] font-medium transition ${location.pathname === "/shop"
                ? "text-[#4254e8]"
                : "text-[#12162f] hover:text-[#4254e8]"
                }`}
            >
              Products
            </Link>

            <Link
              to="/about"
              className={`text-[15px] font-medium transition ${isActiveLink("/about")
                ? "text-[#4254e8]"
                : "text-[#12162f] hover:text-[#4254e8]"
                }`}
            >
              About Us
            </Link>

            <Link
              to="/contact"
              className={`text-[15px] font-medium transition ${isActiveLink("/contact")
                ? "text-[#4254e8]"
                : "text-[#12162f] hover:text-[#4254e8]"
                }`}
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-5">
            <div className="relative hidden xl:block">
              <input
                type="text"
                placeholder="Search products..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onFocus={() => setIsSearchDrawerOpen(true)}
                className="h-[42px] w-[280px] rounded-full border border-slate-200 bg-slate-50 pl-11 pr-4 text-[14px] text-slate-700 outline-none transition-all focus:border-[#4254e8] focus:bg-white focus:ring-1 focus:ring-[#4254e8]"
              />
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
            </div>

            <button
              onClick={() => setIsSearchDrawerOpen(true)}
              aria-label="Open search"
              className="text-[#12162f] transition hover:text-[#4254e8] xl:hidden"
            >
              <Search size={21} />
            </button>

            <div className="relative hidden sm:block" ref={accountRef}>
              <button
                onClick={() => setIsAccountOpen((prev) => !prev)}
                aria-label="Account"
                className="text-[#12162f] transition hover:text-[#4254e8]"
              >
                <User size={21} />
              </button>

              <AnimatePresence>
                {isAccountOpen && (
                  <m.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute right-0 top-full mt-6 w-60 rounded-[14px] border border-slate-100 bg-white py-2 shadow-2xl"
                  >
                    {!user ? (
                      <div className="space-y-2 p-3">
                        <Link
                          to="/login"
                          onClick={() => setIsAccountOpen(false)}
                          className="block rounded-lg bg-[#4254e8] py-2.5 text-center text-sm font-semibold text-white"
                        >
                          Sign In
                        </Link>
                        <Link
                          to="/signup"
                          onClick={() => setIsAccountOpen(false)}
                          className="block rounded-lg border border-slate-200 py-2.5 text-center text-sm font-semibold text-slate-700"
                        >
                          Register
                        </Link>
                      </div>
                    ) : (
                      <>
                        <div className="border-b border-slate-100 px-4 py-3">
                          <p className="text-xs font-semibold uppercase text-slate-400">
                            Profile
                          </p>
                          <p className="truncate text-sm font-bold text-slate-800">
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
                          className="flex w-full items-center gap-3 border-t border-slate-100 px-4 py-3 text-sm text-red-500 hover:bg-red-50"
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

            <button
              onClick={openWishlistDrawer}
              className="relative hidden text-[#12162f] transition hover:text-[#4254e8] sm:block"
              aria-label="Wishlist"
            >
              <Heart size={21} />
              {wishlistCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-[#4254e8] px-1 text-[10px] font-bold text-white">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              onClick={openCompareDrawer}
              className="relative hidden text-[#12162f] transition hover:text-[#4254e8] md:block"
              aria-label="Compare"
            >
              <GitCompare size={21} />
              {compareCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-[#4254e8] px-1 text-[10px] font-bold text-white">
                  {compareCount}
                </span>
              )}
            </button>

            <button
              onClick={openCartDrawer}
              className="relative text-[#12162f] transition hover:text-[#4254e8]"
              aria-label="Open cart"
            >
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-[#4254e8] px-1 text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
              className="text-[#12162f] lg:hidden"
            >
              <Menu size={25} />
            </button>
          </div>
        </div>
      </header>

      {/* Search Right Drawer */}
      <AnimatePresence>
        {isSearchDrawerOpen && (
          <>
            <m.div
              onClick={() => setIsSearchDrawerOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[2000] bg-black/75"
            />

            <m.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="fixed right-0 top-0 z-[2100] flex h-screen w-full max-w-[510px] flex-col bg-white px-5 py-5 sm:px-6"
            >
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-[17px] font-semibold text-[#10142b]">
                  Search
                </h3>
                <button
                  onClick={() => setIsSearchDrawerOpen(false)}
                  aria-label="Close search"
                  className="text-[#10142b]"
                >
                  <X size={22} />
                </button>
              </div>

              <div className="relative mb-7">
                <input
                  type="text"
                  placeholder="Search here..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  autoFocus
                  className="h-[45px] w-full rounded-[15px] border border-[#0d1b3d] bg-white pl-4 pr-12 text-[14px] text-slate-700 outline-none"
                />
                <Search
                  size={21}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#0d1b3d]"
                />
              </div>

              <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar">
                {isLoading ? (
                  <div className="py-10 text-center text-sm text-slate-500">
                    Searching...
                  </div>
                ) : searchValue.length > 1 && searchResults.length === 0 ? (
                  <div className="py-10 text-center text-sm text-slate-500">
                    No results found
                  </div>
                ) : (
                  <div className="space-y-4">
                    {searchResults.slice(0, 6).map((product) => (
                      <div
                        key={product.id}
                        className="relative flex gap-4 rounded-[14px] border border-slate-200 bg-white p-4"
                      >
                        <button
                          onClick={() => {
                            navigate(`/product/${product.slug}`);
                            setIsSearchDrawerOpen(false);
                            setSearchValue("");
                          }}
                          className="flex flex-1 gap-4 text-left"
                        >
                          <div className="h-[96px] w-[86px] shrink-0 rounded-[14px] bg-slate-100 p-2">
                            <img
                              src={getFirstImage(product.images)}
                              alt={product.name}
                              className="h-full w-full object-contain"
                            />
                          </div>

                          <div className="pt-1">
                            <h4 className="text-[16px] font-semibold text-[#10142b]">
                              {product.name}
                            </h4>
                            <p className="mt-1 text-[14px] text-slate-500">
                              {product.category?.name || "Product"}
                            </p>
                            <p className="mt-2 text-[15px] font-bold text-slate-700">
                              ${product.price}
                              <span className="ml-2 text-[12px] font-medium text-blue-600">
                                - {product.stock || 0} in Stock
                              </span>
                            </p>
                          </div>
                        </button>

                        <button className="absolute right-4 top-4 text-slate-400">
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-8">
                  <h4 className="mb-4 text-[16px] font-semibold text-[#10142b]">
                    Recently searches
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {["Printers", "Ink", "Toner", "Accessories"].map((item) => (
                      <button
                        key={item}
                        onClick={() => setSearchValue(item)}
                        className="rounded-full border border-slate-200 px-3 py-1.5 text-[14px] text-[#10142b]"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </m.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <m.div
              onClick={() => setIsMobileMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[2000] bg-black/60"
            />

            <m.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 26 }}
              className="fixed bottom-0 left-0 top-0 z-[2100] flex w-[310px] flex-col bg-white"
            >
              <div className="flex items-center justify-between border-b border-slate-100 p-5">
                <img src="/logo/logo.webp" alt="Logo" className="h-8" />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X size={24} className="text-slate-500" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5">
                <nav className="space-y-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block rounded-xl px-4 py-3 text-[15px] font-medium ${isActiveLink(link.path)
                        ? "bg-[#4254e8] text-white"
                        : "text-slate-700 hover:bg-slate-50"
                        }`}
                    >
                      {link.name}
                    </Link>
                  ))}

                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      openWishlistDrawer();
                    }}
                    className="flex w-full items-center px-4 py-3 text-[15px] font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Wishlist
                  </button>

                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      openCompareDrawer();
                    }}
                    className="flex w-full items-center px-4 py-3 text-[15px] font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Compare
                  </button>
                </nav>

                <div className="mt-6 border-t border-slate-100 pt-5">
                  <p className="mb-3 text-xs font-semibold uppercase text-slate-400">
                    Categories
                  </p>
                  <div className="space-y-1">
                    {categories.map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/shop?category=${cat.slug}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:text-[#4254e8]"
                      >
                        <Printer size={14} className="text-slate-400" />
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-100 bg-slate-50 p-5">
                {!user ? (
                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      to="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="rounded-xl bg-[#4254e8] py-3 text-center text-sm font-semibold text-white"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="rounded-xl border border-slate-300 bg-white py-3 text-center text-sm font-semibold text-slate-700"
                    >
                      Join
                    </Link>
                  </div>
                ) : (
                  <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#4254e8] font-bold text-white">
                        {user.name?.[0] || "U"}
                      </div>
                      <p className="truncate text-sm font-semibold text-slate-800">
                        {user.name}
                      </p>
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
        body {
          padding-top: 86px;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #9ca3af;
          border-radius: 20px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }

        @media (max-width: 1024px) {
          body {
            padding-top: 84px;
          }
        }
      `}</style>
    </>
  );
}