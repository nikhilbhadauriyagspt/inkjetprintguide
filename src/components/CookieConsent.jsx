import React, { useState, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import X from 'lucide-react/dist/esm/icons/x';
import ShieldCheck from 'lucide-react/dist/esm/icons/shield-check';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleConsent = (choice) => {
    localStorage.setItem('cookieConsent', choice);
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <m.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-[6000] p-4 md:p-6"
        >
          <div className="max-w-[1600px] mx-auto">
            <div className="bg-white border border-slate-200 shadow-[0_-10px_40px_rgba(0,0,0,0.08)] rounded-2xl overflow-hidden">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 md:px-10 md:py-8">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-12 h-12 rounded-full bg-[#4254e8]/10 flex items-center justify-center shrink-0 text-[#4254e8]">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <h3 className="text-[17px] font-bold text-slate-900 mb-1">Cookies & Privacy</h3>
                    <p className="text-[14px] text-slate-500 leading-relaxed max-w-3xl">
                      We use cookies to enhance your experience, analyze site traffic, and serve personalized content. By clicking "Accept", you consent to our use of cookies. Read our <Link to="/cookie-policy" className="text-[#4254e8] font-semibold hover:underline">Cookie Policy</Link> for more details.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                  <button
                    onClick={() => handleConsent('rejected')}
                    className="flex-1 md:flex-none h-[48px] px-8 rounded-full border border-slate-200 text-slate-600 text-[14px] font-bold hover:bg-slate-50 transition-all"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleConsent('accepted')}
                    className="flex-1 md:flex-none h-[48px] px-8 rounded-full bg-[#4254e8] text-white text-[14px] font-bold hover:bg-[#045d72] transition-all shadow-lg shadow-[#4254e8]/20"
                  >
                    Accept All
                  </button>
                  <button
                    onClick={() => setIsVisible(false)}
                    className="hidden md:flex p-2 text-slate-400 hover:text-slate-600 transition-colors ml-2"
                    aria-label="Close"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
