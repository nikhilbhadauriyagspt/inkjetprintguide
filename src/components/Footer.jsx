import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  MapPin,
  ArrowRight,
  ShieldCheck,
  CreditCard,
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
            setCategories(printerParent.children.slice(0, 6));
          }
        }
      })
      .catch(err => console.error(err));
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Logic for subscription can be added here
    alert("Thank you for subscribing!");
    setEmail('');
  };

  return (
    <footer className="w-full relative font-['Rubik'] mt-20 overflow-hidden" style={{ background: 'linear-gradient(135deg, rgb(30, 58, 138) 0%, rgb(29, 78, 216) 50%, rgb(37, 99, 235) 100%)' }}>
      
      {/* DECORATIVE ELEMENTS */}
      <div className="absolute top-0 left-0 w-full h-1 bg-white/10" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

      {/* NEWSLETTER SECTION */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-10 pt-16 pb-12 border-b border-white/10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="max-w-xl text-center lg:text-left">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Subscribe to our Newsletter</h3>
            <p className="text-blue-100/70 text-sm md:text-base">Get the latest updates on new products and upcoming sales delivered to your inbox.</p>
          </div>
          <form onSubmit={handleSubscribe} className="w-full lg:max-w-md flex items-stretch gap-2 bg-white/10 p-1.5 rounded-2xl border border-white/20 backdrop-blur-sm">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 bg-transparent px-4 py-3 text-white placeholder:text-blue-100/50 outline-none text-sm font-medium"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button className="bg-white text-blue-700 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-blue-50 transition-all flex items-center gap-2 shrink-0">
              Join <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </div>

      {/* MAIN FOOTER CONTENT */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12">
          
          {/* COLUMN 1: BRANDING */}
          <div className="space-y-8 lg:col-span-1 md:col-span-3 lg:text-left text-center">
            <Link to="/" className="inline-block">
              <img src="/logo/logo.png" alt="Logo" className="h-16 brightness-0 invert mx-auto lg:mx-0" />
            </Link>
            <p className="text-blue-100/80 text-sm leading-relaxed font-normal max-w-sm mx-auto lg:mx-0">
              Printingmania is a specialized retailer delivering professional printing infrastructure nationwide. From advanced laser systems to wireless inkjet solutions.
            </p>
          </div>

          {/* COLUMN 2: QUICK LINKS */}
          <div className="lg:pl-4">
            <h4 className="text-white font-bold text-lg mb-8 relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-blue-400 rounded-full" />
            </h4>
            <ul className="space-y-4">
              <li><Link to="/" className="text-blue-100/70 hover:text-white text-sm transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-blue-100/70 hover:text-white text-sm transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-blue-100/70 hover:text-white text-sm transition-colors">Contact Us</Link></li>
              <li><Link to="/shop" className="text-blue-100/70 hover:text-white text-sm transition-colors">Shop All</Link></li>
              <li><Link to="/faq" className="text-blue-100/70 hover:text-white text-sm transition-colors">FAQs</Link></li>
            </ul>
          </div>

          {/* COLUMN 3: CATEGORIES */}
          <div>
            <h4 className="text-white font-bold text-lg mb-8 relative inline-block">
              Top Categories
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-blue-400 rounded-full" />
            </h4>
            <ul className="space-y-4">
              {categories.map(cat => (
                <li key={cat.id}>
                  <Link to={`/shop?category=${cat.slug}`} className="text-blue-100/70 hover:text-white text-sm transition-colors capitalize">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 4: POLICIES */}
          <div>
            <h4 className="text-white font-bold text-lg mb-8 relative inline-block">
              Our Policies
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-blue-400 rounded-full" />
            </h4>
            <ul className="space-y-4">
              <li><Link to="/terms-and-conditions" className="text-blue-100/70 hover:text-white text-sm transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/shipping-policy" className="text-blue-100/70 hover:text-white text-sm transition-colors">Shipping Policy</Link></li>
              <li><Link to="/return-policy" className="text-blue-100/70 hover:text-white text-sm transition-colors">Return Policy</Link></li>
              <li><Link to="/privacy-policy" className="text-blue-100/70 hover:text-white text-sm transition-colors">Privacy Policy</Link></li>
              <li><Link to="/cookie-policy" className="text-blue-100/70 hover:text-white text-sm transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>

          {/* COLUMN 5: CONTACT INFO */}
          <div>
            <h4 className="text-white font-bold text-lg mb-8 relative inline-block">
              Contact Info
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-blue-400 rounded-full" />
            </h4>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                  <Mail size={18} className="text-blue-300" />
                </div>
                <div>
                  <p className="text-[10px] text-blue-200/50 uppercase font-bold tracking-widest mb-1">Email Support</p>
                  <p className="text-white text-sm font-medium">info@printingmania.shop</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                  <MapPin size={18} className="text-blue-300" />
                </div>
                <div>
                  <p className="text-[10px] text-blue-200/50 uppercase font-bold tracking-widest mb-1">Headquarters</p>
                  <p className="text-white text-sm font-medium">Ashburn, VA, USA</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM STRIP */}
      <div className="w-full bg-black/10 py-8 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-4 md:px-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <p className="text-[13px] text-blue-100/60 leading-relaxed mb-1">© 2026 Printingmania Inc. All Rights Reserved.</p>
            <p className="text-[11px] text-blue-100/40 font-medium">Informational only. No software installation or distribution.</p>
          </div>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
              <img src="/logo/PayPal.svg.webp" alt="PayPal" className="h-4 invert" />
              <ShieldCheck size={20} className="text-white" />
              <CreditCard size={20} className="text-white" />
            </div>
            <div className="hidden lg:flex items-center gap-2 bg-white/5 px-4 py-1.5 rounded-full border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-bold text-white uppercase tracking-widest">SSL SECURE</span>
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
}
