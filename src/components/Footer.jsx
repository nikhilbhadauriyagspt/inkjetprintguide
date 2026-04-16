import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  MapPin,
  ArrowRight,
  Zap
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
    alert("Thank you for subscribing!");
    setEmail('');
  };

  return (
    <footer className="w-full bg-white text-slate-900 font-sans border-t border-slate-100">
      <div className="max-w-[1600px] mx-auto px-6">

        {/* Newsletter Section */}
        <div className="py-16 md:py-24 border-b border-slate-50">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Zap size={14} className="text-[#991B1B]" fill="currentColor" />
                <span className="text-[11px] font-bold text-[#991B1B] uppercase tracking-[0.3em]">Newsletter</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold ">
                Subscribe for the <br /> <span className="text-slate-400">latest updates.</span>
              </h3>
            </div>

            <form onSubmit={handleSubscribe} className="relative max-w-md w-full ml-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full px-0 py-4 bg-transparent border-b border-slate-200 focus:border-[#991B1B] outline-none text-base font-medium transition-all placeholder:text-slate-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="absolute right-0 bottom-4 text-[#991B1B] hover:translate-x-1 transition-transform"
              >
                <ArrowRight size={20} />
              </button>
            </form>
          </div>
        </div>

        {/* Main Links */}
        <div className="py-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 lg:gap-8">

          {/* Logo Column */}
          <div className="col-span-2 lg:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <img src="/logo/logo.png" alt="My Printing Buddy" className="h-20 w-auto " />
            </Link>
            <p className="text-slate-400 text-xs font-medium leading-relaxed max-w-[180px]">
              High-quality printing solutions for home and business needs.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#991B1B] mb-8">Company</h4>
            <ul className="space-y-4">
              <li><Link to="/" className="text-[13px] font-semibold text-slate-500 hover:text-[#991B1B] transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-[13px] font-semibold text-slate-500 hover:text-[#991B1B] transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-[13px] font-semibold text-slate-500 hover:text-[#991B1B] transition-colors">Contact Us</Link></li>
              <li><Link to="/shop" className="text-[13px] font-semibold text-slate-500 hover:text-[#991B1B] transition-colors">Shop All</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#991B1B] mb-8">Categories</h4>
            <ul className="space-y-4">
              {categories.map(cat => (
                <li key={cat.id}>
                  <Link to={`/shop?category=${cat.slug}`} className="text-[13px] font-semibold text-slate-500 hover:text-[#991B1B] transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#991B1B] mb-8">Support</h4>
            <ul className="space-y-4">
              <li><Link to="/terms-and-conditions" className="text-[13px] font-semibold text-slate-500 hover:text-[#991B1B] transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/shipping-policy" className="text-[13px] font-semibold text-slate-500 hover:text-[#991B1B] transition-colors">Shipping Policy</Link></li>
              <li><Link to="/return-policy" className="text-[13px] font-semibold text-slate-500 hover:text-[#991B1B] transition-colors">Return Policy</Link></li>
              <li><Link to="/privacy-policy" className="text-[13px] font-semibold text-slate-500 hover:text-[#991B1B] transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 lg:col-span-1">
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#991B1B] mb-8">Contact</h4>
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-slate-300 mt-0.5" />
                <div>
                  <p className="text-[13px] font-bold">Headquarters</p>
                  <p className="text-slate-400 text-xs font-medium mt-1">2241 W I 44 Service Rd,
                    Oklahoma City, OK 73112, USA</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={16} className="text-slate-300 mt-0.5" />
                <div>
                  <p className="text-[13px] font-bold">Email Us</p>
                  <p className="text-slate-400 text-xs font-medium mt-1">info@myprintingbuddy.shop</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-10 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] font-bold text-slate-300 uppercase tracking-widest">
          <div className="flex flex-col gap-2 items-center md:items-start text-center md:text-left">
            <p>&copy; {new Date().getFullYear()} Republic Printing. All Rights Reserved.</p>
            <p className="text-[10px] text-slate-400 normal-case tracking-normal">Disclaimer - For Informational only. No software installation or distribution.</p>
          </div>
          <div className="flex gap-8">
            <span className="hover:text-slate-400 cursor-default">Quality</span>
            <span className="hover:text-slate-400 cursor-default">Precision</span>
            <span className="hover:text-slate-400 cursor-default">Service</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
