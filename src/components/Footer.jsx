import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronUp,
  Mail,
  MapPin,
} from 'lucide-react';
import API_BASE_URL from '../config';

export default function Footer() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/categories`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          const printerParent = data.data.find(cat => cat.slug === 'printers' || cat.id === 46);
          if (printerParent && printerParent.children) {
            setCategories(printerParent.children.slice(0, 8));
          }
        }
      })
      .catch(err => console.error(err));
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#131921] text-white font-['Rubik'] mt-12">
      {/* Back to Top */}
      <button
        onClick={scrollToTop}
        className="w-full bg-[#37475a] hover:bg-[#485769] py-4 text-[13px] font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer"
      >
        <ChevronUp size={16} />
        Back to top
      </button>

      {/* Main Footer Content */}
      <div className="max-w-[1800px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 border-b border-gray-700 pb-12">

          {/* Column 1: Get to Know Us */}
          <div className="space-y-4">
            <h4 className="text-[16px] font-bold text-white mb-4">Get to Know Us</h4>
            <ul className="space-y-2 text-[14px] text-gray-300">
              <li><Link to="/about" className="hover:underline">About Us</Link></li>
              <li><Link to="/contact" className="hover:underline">Contact Us</Link></li>
              <li><Link to="/faq" className="hover:underline">FAQs</Link></li>
              <li><Link to="/" className="hover:underline">Home</Link></li>
            </ul>
          </div>

          {/* Column 2: Policy */}
          <div className="space-y-4">
            <h4 className="text-[16px] font-bold text-white mb-4">Policy</h4>
            <ul className="space-y-2 text-[14px] text-gray-300">
              <li><Link to="/return-policy" className="hover:underline">Return Policy</Link></li>
              <li><Link to="/terms-and-conditions" className="hover:underline">Terms of Use</Link></li>
              <li><Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link></li>
              <li><Link to="/shipping-policy" className="hover:underline">Shipping Policy</Link></li>
            </ul>
          </div>

          {/* Column 3: Categories */}
          <div className="space-y-4">
            <h4 className="text-[16px] font-bold text-white mb-4">Top Categories</h4>
            <ul className="space-y-2 text-[14px] text-gray-300">
              {categories.map(cat => (
                <li key={cat.id}>
                  <Link to={`/shop?category=${cat.slug}`} className="hover:underline capitalize">
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li><Link to="/shop" className="hover:underline">Shop All</Link></li>
            </ul>
          </div>
        </div>

        {/* Branding and Contact Section */}
        <div className="py-12 flex flex-col lg:flex-row items-center justify-between gap-8 border-b border-gray-700">
          <div className="flex flex-col items-center lg:items-start gap-4">
            <Link to="/">
              <img src="/logo/logo.png" alt="Logo" className="h-10 brightness-0 invert" />
            </Link>
            <p className="text-gray-400 text-sm max-w-md text-center lg:text-left">
              Dashing Printers is your one-stop shop for all your printing needs. We provide high-quality printers, accessories, and expert support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
                <Mail size={18} className="text-primary" />
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider">Email Us</p>
                <p className="text-sm font-medium">info@dashingprinters.shop</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
                <MapPin size={18} className="text-primary" />
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider">Location</p>
                <p className="text-sm font-medium">Sacramento, CA, USA</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-[12px] text-gray-400 space-y-2 text-center md:text-left">
            <p>© 2026, Dashing Printers Inc. or its affiliates</p>
            <p className="text-[13px] font-medium opacity-80 leading-relaxed">
              Disclaimer: All product names, logos, and brands are property of their respective owners. All company, product and service names used in this website are for identification purposes only. Use of these names, logos, and brands does not imply endorsement.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 items-center grayscale opacity-70">
            <img src="/logo/PayPal.svg.webp" alt="PayPal" className="h-4 invert" />
            <div className="flex items-center gap-2 border border-gray-700 px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest text-gray-400">
              <span className="text-primary">●</span> SSL SECURE
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
