import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Mail from 'lucide-react/dist/esm/icons/mail';
import MapPin from 'lucide-react/dist/esm/icons/map-pin';
import Phone from 'lucide-react/dist/esm/icons/phone';
import API_BASE_URL from '../config';

export default function Footer() {
  const [categories, setCategories] = useState([]);

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

  return (
    <footer className="bg-white border-t border-slate-100 pt-20">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8">

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-20">

          {/* Brand Info */}
          <div className="space-y-8">
            <Link to="/">
              <img src="/logo/logo.png" alt="Print Sphere" className="h-10 w-auto" />
            </Link>
            <p className="text-slate-500 text-[14px] leading-relaxed">
              Providing professional-grade printing solutions worldwide. High-performance hardware for home, office, and enterprise environments.
            </p>
          </div>

          {/* Company Links */}
          <div className="space-y-6">
            <h4 className="text-[15px] font-bold uppercase tracking-wider text-slate-900">Company</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-slate-500 text-[14px] hover:text-[#05718A] transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-slate-500 text-[14px] hover:text-[#05718A] transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-slate-500 text-[14px] hover:text-[#05718A] transition-colors">Contact</Link></li>
              <li><Link to="/shop" className="text-slate-500 text-[14px] hover:text-[#05718A] transition-colors">Shop</Link></li>
            </ul>
          </div>

          {/* Product Links */}
          <div className="space-y-6">
            <h4 className="text-[15px] font-bold uppercase tracking-wider text-slate-900">Products</h4>
            <ul className="space-y-3">
              {categories.map(cat => (
                <li key={cat.id}>
                  <Link to={`/shop?category=${cat.slug}`} className="text-slate-500 text-[14px] hover:text-[#05718A] transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
              {categories.length === 0 && (
                <li><Link to="/shop" className="text-slate-500 text-[14px] hover:text-[#05718A]">All Printers</Link></li>
              )}
            </ul>
          </div>

          {/* Policy Links */}
          <div className="space-y-6">
            <h4 className="text-[15px] font-bold uppercase tracking-wider text-slate-900">Policies</h4>
            <ul className="space-y-3">
              <li><Link to="/shipping-policy" className="text-slate-500 text-[14px] hover:text-[#05718A] transition-colors">Shipping Policy</Link></li>
              <li><Link to="/return-policy" className="text-slate-500 text-[14px] hover:text-[#05718A] transition-colors">Return Policy</Link></li>
              <li><Link to="/privacy-policy" className="text-slate-500 text-[14px] hover:text-[#05718A] transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-and-conditions" className="text-slate-500 text-[14px] hover:text-[#05718A] transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-[15px] font-bold uppercase tracking-wider text-slate-900">Contact</h4>
            <div className="space-y-4">
              <div className="flex gap-3 text-slate-500">
                <Mail size={18} className="shrink-0 text-[#05718A]" />
                <a href="mailto:info@printsphere.co" className="text-[14px] hover:text-[#05718A]">info@printsphere.co</a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-100 py-10 flex flex-col lg:flex-row justify-between items-center gap-8">
          <div className="text-center lg:text-left space-y-2">
            <p className="text-slate-600 text-sm font-medium">
              © {new Date().getFullYear()} Print Sphere LLC. All Rights Reserved.
            </p>
          </div>

          <div className="bg-white px-4 py-2 border border-slate-200 shrink-0">
            <img src="https://www.paypalobjects.com/digitalassets/c/website/logo/full-text/pp_fc_hl.svg" alt="PayPal" className="h-4 opacity-40 grayscale" />
          </div>
        </div>

      </div>
    </footer>
  );
}
