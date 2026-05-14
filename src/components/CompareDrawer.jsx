import React from "react";
import { m, AnimatePresence } from "framer-motion";
import X from "lucide-react/dist/esm/icons/x";
import GitCompare from "lucide-react/dist/esm/icons/git-compare";
import ChevronRight from "lucide-react/dist/esm/icons/chevron-right";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function CompareDrawer() {
  const {
    isCompareDrawerOpen,
    closeCompareDrawer,
    compare,
    removeFromCompare,
  } = useCart();

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === "string" ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) {
        return `/${imgs[0].replace(/\\/g, "/")}`;
      }
      return "/logo/fabicon.avif";
    } catch {
      return "/logo/fabicon.avif";
    }
  };

  return (
    <AnimatePresence>
      {isCompareDrawerOpen && (
        <>
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCompareDrawer}
            className="fixed inset-0 z-[6000] bg-black/75"
          />

          <m.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="fixed right-0 top-0 z-[6001] flex h-screen w-full max-w-[430px] flex-col bg-white px-5 py-5 font-sans shadow-2xl sm:px-6"
          >
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-[17px] font-semibold text-[#10142b]">
                Compare Products
              </h2>
              <button
                onClick={closeCompareDrawer}
                aria-label="Close compare"
                className="text-[#10142b]"
              >
                <X size={22} />
              </button>
            </div>

            <div className="custom-scrollbar flex-1 overflow-y-auto pr-1">
              {compare.length > 0 ? (
                <div className="space-y-4">
                  {compare.map((item) => (
                    <div
                      key={item.id}
                      className="relative flex gap-4 rounded-[14px] border border-slate-200 bg-white p-4"
                    >
                      <Link
                        to={`/product/${item.slug}`}
                        onClick={closeCompareDrawer}
                        className="h-[78px] w-[86px] shrink-0 rounded-[14px] bg-slate-100 p-2"
                      >
                        <img
                          src={getImagePath(item.images)}
                          alt={item.name}
                          className="h-full w-full object-contain"
                        />
                      </Link>

                      <div className="min-w-0 flex-1">
                        <Link
                          to={`/product/${item.slug}`}
                          onClick={closeCompareDrawer}
                          className="line-clamp-1 text-[16px] font-semibold text-[#10142b]"
                        >
                          {item.name}
                        </Link>

                        <p className="mt-1 text-[14px] text-slate-500">
                          {item.category?.name || "Product"}
                        </p>

                        <p className="mt-2 text-[15px] font-bold text-[#4254e8]">
                          ${Number(item.price || 0).toFixed(2)}
                        </p>
                      </div>

                      <button
                        onClick={() => removeFromCompare(item.id)}
                        aria-label="Remove item"
                        className="absolute right-4 top-4 text-slate-400 hover:text-red-500"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}

                  {compare.length < 2 && (
                    <p className="py-4 text-center text-sm text-slate-500 italic">
                      Add at least 2 products to compare.
                    </p>
                  )}
                </div>
              ) : (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                    <GitCompare size={36} />
                  </div>
                  <h3 className="text-xl font-semibold text-[#10142b]">
                    Comparison List is Empty
                  </h3>
                  <p className="mt-2 text-sm text-slate-500">
                    Add products to compare their features.
                  </p>
                </div>
              )}
            </div>

            {compare.length > 0 && (
              <div className="mt-5 border-t border-slate-200 bg-white pt-5">
                <Link
                  to="/compare"
                  onClick={closeCompareDrawer}
                  className="flex h-[45px] w-full items-center justify-center gap-2 rounded-[12px] bg-[#4254e8] text-[15px] font-bold text-[#10142b]"
                >
                  COMPARE NOW
                  <ChevronRight size={18} />
                </Link>
              </div>
            )}
          </m.div>
        </>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #9ca3af;
          border-radius: 20px;
        }
      `}</style>
    </AnimatePresence>
  );
}
