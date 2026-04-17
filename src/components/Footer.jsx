import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  MapPin,
  ArrowRight,
  Zap,
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from 'lucide-react';
import API_BASE_URL from '../config';

export default function Footer() {
  const [categories, setCategories] = useState([]);
  const [email, setEmail] = useState('');

  useEffect(() => {
    fetch(`${API_BASE_URL}/categories`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          const printerParent = data.data.find(cat => cat.slug === 'printers' || cat.id === 46);
          if (printerParent && printerParent.children) {
            setCategories(printerParent.children.slice(0, 5));
          }
        }
      })
      .catch(err => console.error(err));
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert("Subscription Successful.");
    setEmail('');
  };

  return (
    <footer className="w-full bg-[#0F0F0F] text-white font-sans overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-8">

        {/* Newsletter Section */}
        <div className="py-16 md:py-24 border-b border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
            <div className="max-w-xl">
              <div className="flex items-center gap-3 mb-6">
                <Zap size={14} className="text-[#F54900]" fill="currentColor" />
                <span className="text-[10px] font-medium uppercase tracking-[0.5em] text-white/40">Communication.Manifest</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-light leading-tight tracking-tight">
                Subscribe for the <br />
                <span className="text-white/60">latest hardware updates.</span>
              </h3>
            </div>

            <div className="relative">
              <form onSubmit={handleSubscribe} className="relative group">
                <input
                  type="email"
                  placeholder="Registry Email Address"
                  className="w-full bg-transparent border-b border-white/10 py-5 text-lg font-light outline-none focus:border-[#F54900] transition-all placeholder:text-white/10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="absolute right-0 bottom-5 text-white/20 group-hover:text-[#F54900] transition-colors"
                >
                  <ArrowRight size={24} strokeWidth={1} />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="py-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 lg:gap-8">

          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-1 flex flex-col gap-6">
            <Link to="/">
              <img src="/logo/logo.png" alt="Logo" className="h-14 brightness-0 invert opacity-60" />
            </Link>
            <p className="text-white/30 text-xs font-medium leading-relaxed max-w-[200px]">
              High-quality printing solutions for professional home and business infrastructure.
            </p>

          </div>

          {/* Company Links */}
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[#F54900] mb-8 block">Company</span>
            <ul className="flex flex-col gap-4">
              {['Home', 'About Us', 'Contact', 'Full Shop'].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase().replace(' ', item === 'Full Shop' ? '' : '-')}`} className="text-white/40 hover:text-white transition-colors uppercase tracking-widest text-[10px] font-medium">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories Links */}
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[#F54900] mb-8 block">Categories</span>
            <ul className="flex flex-col gap-4">
              {categories.map(cat => (
                <li key={cat.id}>
                  <Link to={`/shop?category=${cat.slug}`} className="text-white/40 hover:text-white transition-colors uppercase tracking-widest text-[10px] font-medium">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support/Policies Links */}
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[#F54900] mb-8 block">Support</span>
            <ul className="flex flex-col gap-4">
              {[
                { name: 'Terms & Conditions', path: '/terms-and-conditions' },
                { name: 'Privacy Policy', path: '/privacy-policy' },
                { name: 'Shipping Policy', path: '/shipping-policy' },
                { name: 'Return Policy', path: '/return-policy' },
                { name: 'Cookie Policy', path: '/cookie-policy' }
              ].map((policy) => (
                <li key={policy.name}>
                  <Link to={policy.path} className="text-white/40 hover:text-white transition-colors uppercase tracking-widest text-[10px] font-medium">
                    {policy.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Registry/Contact Info */}
          <div className="col-span-2 lg:col-span-1">
            <span className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[#F54900] mb-8 block">Registry</span>
            <div className="flex flex-col gap-6">
              <div className="flex gap-4">
                <MapPin size={16} strokeWidth={1.5} className="text-[#F54900] shrink-0" />
                <div>
                  <p className="text-[10px] font-semibold text-white uppercase tracking-widest mb-1">Global HQ</p>
                  <p className="text-[11px] text-white/30 leading-relaxed font-medium">110 N Main St, Livingston, MT 59047, United States</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Mail size={16} strokeWidth={1.5} className="text-[#F54900] shrink-0" />
                <div>
                  <p className="text-[10px] font-semibold text-white uppercase tracking-widest mb-1">Direct Link</p>
                  <p className="text-[11px] text-white/30 leading-relaxed font-medium hover:text-white transition-colors cursor-pointer">info@myprinterland.shop</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* System Bar */}
        <div className="py-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col gap-1 items-center md:items-start">
            <p className="text-[9px] font-medium uppercase tracking-[0.3em] text-white/20">
              &copy; {new Date().getFullYear()} Republic Printing Core. All Rights Reserved.
            </p>
            <p className="text-[8px] uppercase tracking-widest text-white/10">Disclaimer - For Informational usage only.</p>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex gap-6 text-[9px] font-bold text-white/20 uppercase tracking-widest">
              <span>Quality</span>
              <span>Precision</span>
              <span>Service</span>
            </div>
            <div className="h-4 w-px bg-white/5 hidden md:block" />
            <div className="flex items-center gap-3">
              <div className="w-1 h-1 rounded-full bg-emerald-500/50 animate-pulse" />
              <span className="text-[9px] font-medium uppercase tracking-[0.4em] text-white/20">System.Online</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
