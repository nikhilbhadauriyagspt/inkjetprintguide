import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, ArrowRight } from 'lucide-react';
import API_BASE_URL from '../config';

export default function Footer() {
  const [categories, setCategories] = useState([]);
  const [email, setEmail] = useState('');

  useEffect(() => {
    fetch(`${API_BASE_URL}/categories`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          const printerParent = data.data.find(
            cat => cat.slug === 'printers' || cat.id === 46
          );
          if (printerParent?.children) {
            setCategories(printerParent.children.slice(0, 5));
          }
        }
      });
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert("Subscribed");
    setEmail('');
  };

  return (
    <footer className="w-full bg-[#0B1220] text-white">

      {/* TOP BAR */}
      <div className="border-b border-white/10 py-8">
        <div className="max-w-[1800px] mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">

          <h3 className="text-lg md:text-2xl font-semibold">
            Stay Updated with Latest Printing Solutions
          </h3>

          <form onSubmit={handleSubscribe} className="flex w-full md:w-[420px] bg-white/5 rounded-md overflow-hidden">
            <input
              type="email"
              placeholder="Enter Email"
              className="flex-1 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-white/30"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button className="px-4 bg-[#2f5cab] hover:bg-[#244a8a] transition">
              <ArrowRight size={18} />
            </button>
          </form>

        </div>
      </div>

      {/* MAIN GRID (CARDS STYLE - DIFFERENT LOOK) */}
      <div className="max-w-[1800px] mx-auto px-4 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">

        {/* Brand */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-lg">
          <img src="/logo/logo.png" className="h-12 mb-4 brightness-0 invert opacity-80" />
          <p className="text-white/50 text-sm leading-6">
            High-quality printing solutions for professional home and business infrastructure.
          </p>
        </div>

        {/* Company */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-lg">
          <h4 className="text-[#2f5cab] font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-sm text-white/60">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/shop">Full Shop</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-lg">
          <h4 className="text-[#2f5cab] font-semibold mb-4">Categories</h4>
          <ul className="space-y-2 text-sm text-white/60">
            {categories.map(cat => (
              <li key={cat.id}>
                <Link to={`/shop?category=${cat.slug}`}>{cat.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-lg">
          <h4 className="text-[#2f5cab] font-semibold mb-4">Support</h4>
          <ul className="space-y-2 text-sm text-white/60">
            <li><Link to="/terms-and-conditions">Terms & Conditions</Link></li>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            <li><Link to="/shipping-policy">Shipping Policy</Link></li>
            <li><Link to="/return-policy">Return Policy</Link></li>
            <li><Link to="/cookie-policy">Cookie Policy</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-lg">
          <h4 className="text-[#2f5cab] font-semibold mb-4">Registry</h4>

          <div className="space-y-4 text-sm text-white/60">
            <div className="flex gap-2">
              <MapPin size={16} className="text-[#2f5cab]" />
              <p>302 E Washington St, Bloomington, IL 61701, United States</p>
            </div>

            <div className="flex gap-2">
              <Mail size={16} className="text-[#2f5cab]" />
              <p>info@printmora.shop</p>
            </div>
          </div>
        </div>

      </div>

      {/* BOTTOM STRIP */}
      <div className="border-t border-white/10 py-6">
        <div className="max-w-[1800px] mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/50">

          <p>
            © {new Date().getFullYear()} Republic Printing Core. All Rights Reserved.
          </p>

          {/* PayPal */}
          <div className="flex items-center gap-3">
            <span className="text-white/40">Secure Payments via</span>
            <img
              src="https://www.paypalobjects.com/webstatic/icon/pp258.png"
              alt="PayPal"
              className="h-5 object-contain"
            />
          </div>

        </div>

        {/* SAME DISCLAIMER */}
        <p className="text-center text-[11px] text-white/30 mt-0">
          Disclaimer - For Informational only. No software installation or distribution.
        </p>
      </div>

    </footer>
  );
}