import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Zap, ArrowRight } from "lucide-react";

export default function ShopByCategory({ categories = [], loading = false }) {
  if (loading) {
    return (
      <section className="w-full bg-[#111] py-20">
        <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-[400px] bg-white/5 animate-pulse rounded-3xl" />
          ))}
        </div>
      </section>
    );
  }

  const printerParent = categories.find(
    (c) => c.slug === "printers" || c.id === 46
  );

  const displayCategories = printerParent
    ? printerParent.children || []
    : categories;

  if (!displayCategories || displayCategories.length === 0) return null;

  const getLocalImagePath = (index) =>
    `/banner/category-imges/${(index % 9) + 1}.png`;

  const items = displayCategories.slice(0, 6);

  return (
    <section className="w-full bg-white py-24 md:py-32 overflow-hidden border-t border-slate-50">
      <div className="max-w-[1600px] mx-auto px-6">

        {/* Modern Minimal Heading matched with New Arrivals */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <Zap size={14} className="text-[#F54900]" fill="currentColor" />
              <span className="text-[11px] font-bold text-[#F54900] uppercase tracking-[0.4em]">Browse Collections</span>
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-light text-slate-900 leading-tight"
            >
              Explore our premium <span className="font-semibold text-[#F54900]">printer series.</span>
            </motion.h2>
          </div>

          <Link to="/shop" className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-300 hover:text-[#F54900] transition-colors flex items-center gap-3 group">
            All Categories <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        {/* Refined Unique Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-24 gap-x-16">
          {items.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: (index % 2) * 0.15 }}
              className={`group relative flex flex-col ${index % 2 !== 0 ? 'md:mt-24' : ''}`}
            >
              {/* Overlapping Image Container - No Border Radius, Minimal Shadow */}
              <div className="relative aspect-[21/9] w-full overflow-hidden rounded-none z-10 shadow-sm">
                <motion.img
                  src={getLocalImagePath(index)}
                  alt={cat.name}
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 1 }}
                  className="w-full h-full object-cover  transition-all duration-700"
                  onError={(e) => e.target.src = '/logo/fabicon.png'}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 via-transparent to-transparent opacity-40" />
              </div>

              {/* Offset Content Container - No Border Radius, Very Light Shadow */}
              <div className="absolute -bottom-10 -right-4 md:-right-8 bg-white p-7 md:p-9 rounded-none shadow-sm z-20 w-[85%] md:w-[75%] group-hover:-translate-y-2 transition-transform duration-500 border border-slate-100">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 leading-tight">
                    {cat.name}
                  </h3>
                  <div className="w-10 h-10 rounded-none border border-slate-200 flex items-center justify-center text-slate-900 group-hover:bg-[#F54900] group-hover:text-white group-hover:border-[#F54900] transition-all">
                    <ArrowUpRight size={20} />
                  </div>
                </div>

                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-5">
                  {cat.products_count || 0} HARDWARE UNITS
                </p>

                <Link
                  to={`/shop?category=${cat.slug}`}
                  className="inline-block text-[9px] font-black uppercase tracking-[0.3em] text-[#F54900] hover:text-[#F54900] transition-colors"
                >
                  Enter Collection
                </Link>
              </div>

              {/* Background Decorative Text - More Subtle */}
              <div className="absolute top-1/2 -left-8 -translate-y-1/2 -rotate-90 pointer-events-none opacity-[0.02] whitespace-nowrap">
                <span className="text-7xl font-bold text-slate-900 uppercase tracking-widest">{cat.name}</span>
              </div>
            </motion.div>
          ))}
        </div>


      </div>
    </section>
  );
}