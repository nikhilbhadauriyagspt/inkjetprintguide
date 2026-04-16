import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function ShopByCategory({ categories = [], loading = false }) {
  if (loading) {
    return (
      <section className="w-full bg-[#f2f2f2] py-16 md:py-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className="h-[320px] rounded-sm bg-white animate-pulse border border-slate-200"
              />
            ))}
          </div>
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

  const contentMap = {
    "laser-printers": {
      title: "Laser printers",
      desc: "Speed, performance, and reliability.",
    },
    "inkjet-printers": {
      title: "Inkjet printers",
      desc: "Professional quality at affordable prices.",
    },
    "all-in-one-printers": {
      title: "All-in-One printers",
      desc: "Print, scan, and copy in one smart solution.",
    },
    "supertank-printers": {
      title: "Smart Tank printers",
      desc: "Long-running printing with refill-friendly tanks.",
    },
    "thermal-printers": {
      title: "Thermal printers",
      desc: "Compact printing for labels and receipts.",
    },
    "large-format-printers": {
      title: "Large Format printers",
      desc: "Perfect for banners, posters, and plans.",
    },
    "printer-accessories": {
      title: "Printer Accessories",
      desc: "Essential supplies for smooth daily printing.",
    },
    "led-printers": {
      title: "LED printers",
      desc: "Efficient printing for modern workspaces.",
    },
    "photo-printers": {
      title: "Photo printers",
      desc: "Sharp and vibrant prints for creative output.",
    },
    "dot-matrix-printers": {
      title: "Dot Matrix printers",
      desc: "Reliable printing for forms and billing tasks.",
    },
  };

  const items = displayCategories.slice(0, 9);

  const cardThemes = [
    "dark",
    "light",
    "light",
    "light",
    "light",
  ];

  return (
    <section className="w-full bg-[#f1f1f1] py-16 md:py-20">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading Style matched with About Section */}
        <div className="max-w-5xl mb-24 md:mb-32">
          <h2 className="text-3xl md:text-5xl font-light text-slate-900 leading-tight">
            Explore our <span className="font-semibold text-[#991B1B]">printer collections</span>
            <br className="hidden md:block" /> by category.
          </h2>
          <div className="h-1 w-12 bg-[#991B1B] mt-8 rounded-full" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {items.map((cat, index) => {
            const content = contentMap[cat.slug] || {
              title: cat.name,
              desc: "Explore our premium printer collection.",
            };

            const isDark = cardThemes[index] === "dark";

            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className={`group relative min-h-[420px] mb-16 w-[95%] ${isDark
                  ? "bg-[#34363b] text-white"
                  : "bg-[#e9e7e7] text-slate-900"
                  }`}
              >
                <div className="px-6 pt-3 pb-6 -mt-[50px] -mr-[60px]">
                  <div className="overflow-hidden">
                    <img
                      src={getLocalImagePath(index)}
                      alt={cat.name}
                      className="w-full h-[285px] object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                </div>
                <div className="p-6 pb-0">
                  <h3 className="text-[30px] leading-none font-semibold ">
                    {content.title}
                  </h3>

                  <p
                    className={`mt-2 text-sm ${isDark ? "text-white/85" : "text-slate-600"
                      }`}
                  >
                    {content.desc}
                  </p>

                  <Link
                    to={`/shop?category=${cat.slug}`}
                    className={`mt-4 inline-block text-[11px] font-bold uppercase tracking-wider ${isDark ? "text-white" : "text-slate-900"
                      }`}
                  >
                    Shop
                  </Link>

                  <div
                    className={`mt-1 h-[2px] w-8 ${isDark ? "bg-white" : "bg-slate-900"
                      }`}
                  />
                </div>


              </motion.div>
            );
          })}


        </div>
      </div>
    </section>
  );
}