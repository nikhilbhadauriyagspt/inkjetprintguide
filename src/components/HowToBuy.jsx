import React from 'react';
import Search from 'lucide-react/dist/esm/icons/search';
import ShoppingCart from 'lucide-react/dist/esm/icons/shopping-cart';
import CreditCard from 'lucide-react/dist/esm/icons/credit-card';
import PackageCheck from 'lucide-react/dist/esm/icons/package-check';

export default function HowToBuy() {
  const steps = [
    {
      icon: Search,
      title: "Find Your Printer",
      desc: "Browse our collection of high-performance printers and select the model that fits your needs."
    },
    {
      icon: ShoppingCart,
      title: "Add to Selection",
      desc: "Configure your quantity and add items to your cart with a single click."
    },
    {
      icon: CreditCard,
      title: "Secure Checkout",
      desc: "Pay safely using our encrypted payment gateway. We support all major payment methods."
    },
    {
      icon: PackageCheck,
      title: "Doorstep Delivery",
      desc: "Sit back while we ship your order globally with real-time tracking until arrival."
    }
  ];

  return (
    <section className="bg-[#f5f5f5] py-20 border-t border-slate-100">
      <div className="max-w-[1700px] mx-auto px-4 md:px-0">

        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            How to Purchase
          </h2>
          <p className="text-slate-600 text-lg">
            A simple 4-step process to get your professional hardware delivered.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border border-slate-100">
          {steps.map((step, i) => (
            <div key={i} className="p-10 border-r border-b bg-white border-slate-100 last:border-r-0 lg:[&:nth-child(n+1)]:border-b-0 group">
              <div className="w-14 h-14 bg-slate-50 flex items-center justify-center mb-8 border border-slate-100 group-hover:bg-[#05718A] transition-colors duration-300">
                <step.icon size={24} className="text-[#05718A] group-hover:text-white" />
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-[13px] font-bold text-[#05718A]">0{i + 1}</span>
                  <h3 className="text-xl font-bold text-slate-800">{step.title}</h3>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
