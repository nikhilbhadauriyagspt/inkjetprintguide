import React from "react";
import { m, AnimatePresence } from "framer-motion";
import X from "lucide-react/dist/esm/icons/x";
import Plus from "lucide-react/dist/esm/icons/plus";
import Minus from "lucide-react/dist/esm/icons/minus";
import ChevronRight from "lucide-react/dist/esm/icons/chevron-right";
import ShoppingBag from "lucide-react/dist/esm/icons/shopping-bag";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function CartDrawer() {
  const {
    isCartDrawerOpen,
    closeCartDrawer,
    cart,
    removeFromCart,
    updateQuantity,
  } = useCart();

  const subTotal = cart.reduce(
    (sum, item) => sum + Number(item.price || 0) * item.quantity,
    0
  );

  const total = subTotal;

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
      {isCartDrawerOpen && (
        <>
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCartDrawer}
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
                My Cart
              </h2>
              <button
                onClick={closeCartDrawer}
                aria-label="Close cart"
                className="text-[#10142b]"
              >
                <X size={22} />
              </button>
            </div>

            <div className="custom-scrollbar flex-1 overflow-y-auto pr-1">
              {cart.length > 0 ? (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="relative flex gap-4 rounded-[14px] border border-slate-200 bg-white p-4"
                    >
                      <Link
                        to={`/product/${item.slug}`}
                        onClick={closeCartDrawer}
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
                          onClick={closeCartDrawer}
                          className="line-clamp-1 text-[16px] font-semibold text-[#10142b]"
                        >
                          {item.name}
                        </Link>

                        <p className="mt-1 text-[15px] font-bold text-slate-600">
                          ${Number(item.price || 0).toFixed(2)}
                          <span className="ml-1 text-[13px] font-medium text-slate-500">
                            x {item.quantity}
                          </span>
                        </p>

                        <div className="mt-3 inline-flex h-[35px] items-center rounded-[10px] border border-slate-200 bg-white">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                            className="flex h-full w-34px items-center justify-center px-3 text-slate-500 disabled:opacity-30"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={14} />
                          </button>

                          <span className="px-3 text-[14px] font-medium text-slate-600">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="flex h-full items-center justify-center px-3 text-slate-500"
                            aria-label="Increase quantity"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        aria-label="Remove item"
                        className="absolute right-4 top-4 text-slate-400 hover:text-red-500"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                    <ShoppingBag size={36} />
                  </div>
                  <h3 className="text-xl font-semibold text-[#10142b]">
                    Your Cart is Empty
                  </h3>
                  <p className="mt-2 text-sm text-slate-500">
                    Add products to see them here.
                  </p>
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-slate-200 bg-white pt-5">
                <div className="space-y-4 text-[15px]">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-[#10142b]">
                      Sub-Total :
                    </span>
                    <span className="font-bold text-[#10142b]">
                      ${subTotal.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-medium text-[#10142b]">
                      Shipping :
                    </span>
                    <span className="font-bold text-emerald-600">
                      Free
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-medium text-[#10142b]">Total :</span>
                    <span className="font-bold text-[#10142b]">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between gap-4">
                  <Link
                    to="/cart"
                    onClick={closeCartDrawer}
                    className="flex h-[40px] items-center justify-center gap-2 rounded-[9px] bg-[#4254e8] px-5 text-[14px] font-bold text-[#10142b]"
                  >
                    CART
                    <ChevronRight size={17} />
                  </Link>

                  <Link
                    to="/checkout"
                    onClick={closeCartDrawer}
                    className="flex h-[40px] items-center justify-center gap-2 rounded-[9px] bg-[#4254e8] px-5 text-[14px] font-bold text-white"
                  >
                    CHECKOUT
                    <ChevronRight size={17} />
                  </Link>
                </div>
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