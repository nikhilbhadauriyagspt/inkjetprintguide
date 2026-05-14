import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Home from 'lucide-react/dist/esm/icons/home';
import Search from 'lucide-react/dist/esm/icons/search';
import ShoppingBag from 'lucide-react/dist/esm/icons/shopping-bag';
import Heart from 'lucide-react/dist/esm/icons/heart';
import User from 'lucide-react/dist/esm/icons/user';
import { useCart } from '../context/CartContext';
import { m } from 'framer-motion';

export default function BottomNav() {
  const location = useLocation();
  const { cartCount, openCartDrawer, openSearch, wishlistCount, openWishlistDrawer } = useCart();

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Store', path: '/shop', icon: ShoppingBag },
    { name: 'Search', type: 'button', onClick: openSearch, icon: Search },
    { name: 'Wishlist', type: 'button', onClick: openWishlistDrawer, icon: Heart, count: wishlistCount },
    { name: 'Account', path: '/login', icon: User },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[100] bg-white/95 backdrop-blur-xl border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] pb-safe">
      <div className="flex items-center justify-around h-16 px-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          if (item.type === 'button') {
            return (
              <button
                key={item.name}
                onClick={item.onClick}
                className="flex flex-col items-center justify-center gap-1 w-full cursor-pointer"
              >
                <div className="relative text-slate-400">
                  <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                  {item.count > 0 && (
                    <span className="absolute -top-1.5 -right-2 h-4 w-4 bg-[#4254e8] text-white text-[9px] font-medium rounded-full flex items-center justify-center ring-2 ring-white">
                      {item.count}
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-medium  text-slate-400 er">
                  {item.name}
                </span>
              </button>
            );
          }

          return (
            <Link
              key={item.name}
              to={item.path}
              className="flex flex-col items-center justify-center gap-1 w-full relative"
            >
              <div className={`relative ${isActive ? 'text-[#4254e8]' : 'text-slate-400'}`}>
                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                {item.name === 'Store' && cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 h-4 w-4 bg-[#4254e8] text-white text-[9px] font-medium rounded-full flex items-center justify-center ring-2 ring-white">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className={`text-[10px] font-medium  er ${isActive ? 'text-[#4254e8]' : 'text-slate-400'}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
