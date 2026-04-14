import { Link } from "react-router-dom";
import { ChevronRight, LayoutGrid } from "lucide-react";
import { motion } from "framer-motion";

export default function ShopByCategory({ categories = [], loading = false }) {
  if (loading) {
    return (
      <section className="w-full py-16 bg-white flex flex-col items-center">
        <div className="w-full max-w-[1800px] px-6 space-y-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-full h-[400px] bg-slate-50 animate-pulse" />
          ))}
        </div>
      </section>
    );
  }

  const printerParent = categories.find(
    (c) => c.slug === "printers" || c.id === 46
  );
  const displayCategories = printerParent ? (printerParent.children || []) : categories;

  // Updated to use local images from public/banner/category-imges/
  const getLocalImagePath = (index) => {
    return `/banner/category-imges/${index + 1}.png`;
  };

  if (!displayCategories || displayCategories.length === 0) return null;

  // Static relatable content mapping
  const categoryHeadings = {
    'inkjet-printers': "Inkjet Printers for Vibrant Creative Work",
    'laser-printers': "Laser Systems for High-Speed Business",
    'all-in-one-printers': "All-In-One Solutions for Multi-Tasking",
    'supertank-printers': "Supertank Series for Limitless Printing",
    'thermal-printers': "Thermal Technology for Reliable POS",
    'large-format-printers': "Large Format Units for Industrial Scale",
    'printer-accessories': "Genuine Supplies & Essential Accessories",
    'led-printers': "LED Technology for Energy-Efficient Printing",
    'photo-printers': "Professional Grade Photo Printing Systems",
    'dot-matrix-printers': "Impact Printing for Industrial Reliability"
  };

  const categoryDescs = {
    'inkjet-printers': "Perfect for home offices and creative studios needing photographic precision.",
    'laser-printers': "Engineered for speed and endurance to handle heavy professional workloads.",
    'all-in-one-printers': "Streamline your workflow with smart machines that scan, copy, and print.",
    'supertank-printers': "High-capacity reservoirs that deliver ultra-low cost per page.",
    'thermal-printers': "Compact and durable solutions for retail receipts and logistics labels.",
    'large-format-printers': "Industrial precision for blueprints, banners, and massive marketing materials.",
    'printer-accessories': "Keep your systems running smoothly with our range of ink, toner, and parts.",
    'led-printers': "Reliable and high-quality printing with fewer moving parts for longevity.",
    'photo-printers': "Capture every detail with systems designed for professional photographers.",
    'dot-matrix-printers': "Robust and reliable impact technology for multi-part forms and logs."
  };

  return (
    <section className="w-full py-16 bg-white font-['Rubik']">
      <div className="max-w-[1400px] mx-auto px-4 md:px-10">

        {/* SECTION HEADER */}
        <div className="flex flex-col  items-center justify-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-3"
          >
            <div className="inline-flex items-center gap-2 text-blue-600 text-[13px] font-bold uppercase tracking-[0.2em]">
              <LayoutGrid size={16} /> Catalogue
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 ">
              Browse <span className="text-blue-600 text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-500">Categories</span>
            </h2>
          </motion.div>
        </div>

        {/* ALTERNATING ROWS - NO RADIUS, MINIMAL SHADOW */}
        <div className="border-t flex flex-col gap-8 border-slate-100">
          {displayCategories.map((cat, index) => {
            const isEven = index % 2 === 0;
            const fullHeading = categoryHeadings[cat.slug] || `${cat.name} for Professional Use`;
            const desc = categoryDescs[cat.slug] || "Experience premium technology with our curated collection.";

            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-stretch border-b border-slate-100 group`}
              >
                {/* IMAGE COLUMN (65%) */}
                <div className="w-full md:w-[60%] h-[300px] md:h-[400px] relative overflow-hidden bg-slate-50">
                  <Link to={`/shop?category=${cat.slug}`} className="block w-full h-full">
                    <img
                      src={getLocalImagePath(index)}
                      alt={cat.name}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      onError={(e) => { e.currentTarget.src = "/logo/fabicon.png"; }}
                    />
                  </Link>
                </div>

                {/* CONTENT COLUMN (35%) */}
                <div
                  className="w-full md:w-[40%] p-8 md:p-14 flex flex-col justify-center text-white relative"
                  style={{ background: 'linear-gradient(135deg, rgb(30, 58, 138) 0%, rgb(29, 78, 216) 50%, rgb(37, 99, 235) 100%)' }}
                >
                  <div className="space-y-6">
                    <h3 className="text-2xl md:text-3xl font-bold leading-tight  capitalize">
                      {fullHeading}
                    </h3>
                    <div className="w-10 h-0.5 bg-white/40" />
                    <p className="text-blue-50/90 text-[16px] leading-relaxed font-normal">
                      {desc}
                    </p>
                    <Link
                      to={`/shop?category=${cat.slug}`}
                      className="inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-widest text-white hover:text-blue-200 transition-all group/btn"
                    >
                      Explore Collection <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
