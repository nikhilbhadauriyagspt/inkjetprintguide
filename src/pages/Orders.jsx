import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Package, ChevronRight, ChevronDown, Search, Loader2, Calendar, CreditCard, Truck, X, CheckCircle2, Clock, MapPin, Info, ArrowRight, ExternalLink } from 'lucide-react';
import { m, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../config';
import SEO from '@/components/SEO';

export default function Orders() {
  const { addToCart } = useCart();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [guestEmail, setGuestEmail] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const statusMap = [
    { key: 'pending', label: 'Manifest Received', icon: Clock, desc: 'Your order request has been logged.' },
    { key: 'processing', label: 'Inventory Prep', icon: Package, desc: 'Hardware units are being configured.' },
    { key: 'shipped', label: 'In Transit', icon: Truck, desc: 'Package has been dispatched for logistics.' },
    { key: 'out_for_delivery', label: 'Local Deployment', icon: MapPin, desc: 'Final stage of delivery is active.' },
    { key: 'delivered', label: 'Delivered', icon: CheckCircle2, desc: 'Successful unit handover confirmed.' }
  ];

  const getStatusIndex = (status) => statusMap.findIndex(s => s.key === status);

  const fetchOrders = async (email = null) => {
    setLoading(true);
    setHasSearched(true);
    try {
      const identifier = user ? `user_id=${user.id}` : `email=${email}`;
      const response = await fetch(`${API_BASE_URL}/orders?${identifier}`);
      const data = await response.json();
      if (data.status === 'success') {
        setOrders(data.data);
      } else {
        setOrders([]);
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchOrders();
  }, []);

  const handleGuestSearch = (e) => {
    e.preventDefault();
    if (guestEmail) fetchOrders(guestEmail);
  };

  if (!user && !hasSearched) {
    return (
      <div className="min-h-screen bg-white font-sans text-slate-900 pb-20">
        <SEO title="Track Your Shipment | Registry | Inkjet Print Guide" />

        <div className="bg-white border-b border-slate-100 py-12 md:py-20 mb-12">
          <div className="max-w-[1700px] mx-auto px-6">
            <nav className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-6">
              <Link to="/" className="hover:text-[#0096d6] transition-colors">Home</Link>
              <ChevronRight size={12} />
              <span className="text-[#0096d6]">Shipment Tracking</span>
            </nav>
            <div className="flex items-start gap-4">
              <div className="w-1.5 h-10 bg-[#0096d6] shrink-0 mt-1"></div>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight uppercase">Track Your Registry</h1>
            </div>
          </div>
        </div>

        <div className="max-w-[1700px] mx-auto px-6 pt-12 text-center">
          <div className="bg-white p-12 border border-slate-200 max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-[#F9FAFB] border border-slate-100 text-slate-900 flex items-center justify-center mx-auto mb-10">
              <Package size={32} />
            </div>
            <h2 className="text-2xl font-bold mb-3 uppercase tracking-tight">Access Your Shipment Data</h2>
            <p className="text-slate-500 font-medium mb-12">Provide the professional email address used during procurement to view real-time status.</p>

            <form onSubmit={handleGuestSearch} className="space-y-6 text-left">
              <div className="space-y-2">
                <label className="text-[12px] font-bold text-slate-400 uppercase tracking-widest ml-1">Business Email</label>
                <input
                  required type="email"
                  placeholder="professional@company.com"
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  className="w-full h-14 px-6 bg-[#F9FAFB] border border-slate-200 outline-none focus:border-[#0096d6] text-[15px] font-medium transition-all"
                />
              </div>
              <button
                disabled={loading}
                className="w-full h-16 bg-slate-900 text-white font-bold text-sm uppercase tracking-[0.2em] hover:bg-[#0096d6] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : (
                  <>Execute Query <ArrowRight size={18} /></>
                )}
              </button>
            </form>

            <div className="mt-12 pt-8 border-t border-slate-100">
              <p className="text-sm font-medium text-slate-500">Already registered? <Link to="/login" className="text-[#0096d6] font-bold hover:underline">Access Registry</Link></p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 pb-20">
      <SEO title="Your Order Registry | Inkjet Print Guide" />

      {/* --- PAGE HEADER --- */}
      <div className="bg-white border-b border-slate-100 py-12 md:py-16 mb-12">
        <div className="max-w-[1700px] mx-auto px-6">
          <nav className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-6">
            <Link to="/" className="hover:text-[#0096d6] transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span className="text-[#0096d6]">Order History</span>
          </nav>
          <div className="flex items-start gap-4">
            <div className="w-1.5 h-10 bg-[#0096d6] shrink-0 mt-1"></div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight uppercase">Hardware Registry</h1>
          </div>
        </div>
      </div>

      <div className="max-w-[1700px] mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="flex items-center gap-3">
            <div className="bg-blue-50 border border-blue-100 text-[#0096d6] px-4 py-1.5 text-xs font-bold uppercase tracking-widest">
              {orders.length} Units Found
            </div>
            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">In the last 6 months</p>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 border border-slate-100">
            <Loader2 className="animate-spin h-10 w-10 text-[#0096d6] mb-6" />
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Accessing Registry Data...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-[#F9FAFB] border border-slate-100 p-20 text-center">
            <Package size={48} className="text-slate-200 mx-auto mb-6" />
            <h3 className="text-2xl font-bold mb-2 uppercase tracking-tight">No Units Found</h3>
            <p className="text-slate-500 mb-10 font-medium">No order manifests were detected for this email registry.</p>
            <Link to="/shop" className="bg-black text-white px-10 py-4 font-bold text-xs uppercase tracking-widest hover:bg-[#0096d6] transition-all inline-flex items-center gap-3">
              Browse Inventory <ArrowRight size={18} />
            </Link>
          </div>
        ) : (
          <div className="space-y-10">
            {orders.map((order) => (
              <div key={order.id} className="bg-white border border-slate-200 transition-all hover:border-blue-400">
                {/* Order Header Bar */}
                <div className="bg-[#F9FAFB] border-b border-slate-200 px-8 py-6 grid grid-cols-2 lg:grid-cols-4 gap-8 text-[11px] font-bold uppercase tracking-widest">
                  <div>
                    <p className="text-slate-400 mb-2">Registry Date</p>
                    <p className="text-slate-900">{new Date(order.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 mb-2">Total Amount</p>
                    <p className="text-slate-900 text-lg tracking-tight">${parseFloat(order.total_amount).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 mb-2">Logistic Destination</p>
                    <div className="group relative cursor-pointer">
                      <p className="text-[#0096d6] flex items-center gap-2 hover:text-slate-900 transition-colors">{order.firstName || 'Registry User'} <ChevronDown size={14} /></p>
                      <div className="absolute top-full left-0 mt-3 w-64 p-6 bg-slate-950 text-white shadow-2xl z-10 border-l-4 border-[#0096d6] hidden group-hover:block transition-all">
                        <p className="font-bold mb-2 text-blue-400 uppercase tracking-tight">{order.firstName} {order.lastName}</p>
                        <p className="text-[13px] font-medium text-slate-400 normal-case">{order.address}</p>
                        <p className="text-[13px] font-medium text-slate-400 normal-case">{order.city}, {order.zipCode}</p>
                      </div>
                    </div>
                  </div>
                  <div className="lg:text-right flex flex-col justify-center">
                    <p className="text-slate-400 mb-2">Registry ID: #RP-{order.id}</p>
                    <div className="flex lg:justify-end gap-4">
                      <button className="text-[#0096d6] hover:text-slate-900 transition-colors uppercase tracking-widest">Download Invoice</button>
                    </div>
                  </div>
                </div>

                {/* Order Body */}
                <div className="p-8">
                  <div className="flex flex-col lg:flex-row gap-12">
                    <div className="flex-1 space-y-8">
                      <div className="flex items-center gap-4">
                        <div className={`w-2 h-2 ${order.status === 'delivered' ? 'bg-emerald-500' : 'bg-[#0096d6]'}`} />
                        <h3 className="text-lg font-bold uppercase tracking-tight">Deployment Status: {order.status.replace(/_/g, ' ')}</h3>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {order.items && order.items.map((item, idx) => (
                          <div key={idx} className="flex gap-6 p-4 border border-slate-50 bg-[#F9FAFB]/50">
                            <div className="w-20 h-20 bg-white border border-slate-100 p-2 shrink-0">
                              <img src="/logo/fabicon.avif" alt="" className="w-full h-full object-contain mix-blend-multiply" />
                            </div>
                            <div className="flex-1 min-w-0 flex flex-col justify-center">
                              <Link to={`/product/${item.slug}`} className="text-[14px] font-bold text-slate-800 hover:text-[#0096d6] leading-tight line-clamp-1 uppercase tracking-tight">{item.product_name || 'Printer System'}</Link>
                              <p className="text-[12px] font-bold text-slate-400 uppercase mt-1">Qty: {item.quantity}</p>
                              <div className="mt-3 flex gap-4">
                                <button
                                  onClick={() => addToCart({ ...item, name: item.product_name, id: item.product_id })}
                                  className="text-[10px] font-bold text-[#0096d6] uppercase tracking-widest hover:text-slate-900 transition-colors"
                                >
                                  Procure Again
                                </button>
                                <Link
                                  to={`/product/${item.slug}`}
                                  className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors"
                                >
                                  View System
                                </Link>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="w-full lg:w-72">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="w-full h-14 bg-black text-white font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-[#0096d6] transition-all flex items-center justify-center gap-3"
                      >
                        Track Shipment <Truck size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tracking Modal */}
        <AnimatePresence>
          {selectedOrder && (
            <>
              <m.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setSelectedOrder(null)}
                className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-[1000]"
              />
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white z-[1001] shadow-2xl border-l-8 border-[#0096d6]"
              >
                <div className="bg-slate-950 text-white px-8 py-6 flex items-center justify-between">
                  <div className="space-y-1">
                    <h2 className="text-xl font-bold uppercase tracking-tight">Shipment Deployment Status</h2>
                    <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">Registry ID: #RP-{selectedOrder.id}</p>
                  </div>
                  <button onClick={() => setSelectedOrder(null)} className="w-10 h-10 border border-white/10 flex items-center justify-center hover:bg-red-600 transition-all">
                    <X size={20} />
                  </button>
                </div>

                <div className="p-12">
                  <div className="relative">
                    <div className="absolute left-6 top-2 bottom-2 w-0.5 bg-slate-100" />

                    {statusMap.map((step, idx) => {
                      const isCompleted = getStatusIndex(selectedOrder.status) >= idx;
                      const isActive = selectedOrder.status === step.key;
                      const Icon = step.icon;

                      return (
                        <div key={step.key} className="relative flex gap-10 pb-10 last:pb-0">
                          <div className={`h-12 w-12 border-2 flex items-center justify-center z-10 transition-all ${isCompleted ? 'bg-slate-900 border-slate-900 text-blue-500' : 'bg-white border-slate-100 text-slate-200'}`}>
                            <Icon size={20} />
                          </div>

                          <div className="flex-1 pt-1">
                            <h4 className={`text-[15px] font-bold uppercase tracking-widest ${isCompleted ? 'text-slate-900' : 'text-slate-300'}`}>
                              {step.label}
                            </h4>
                            <p className={`text-[13px] font-medium mt-1 ${isCompleted ? 'text-slate-500' : 'text-slate-200'}`}>{step.desc}</p>
                            {isActive && (
                              <div className="mt-4 inline-flex items-center gap-3 px-3 py-1 bg-[#0096d6] text-white text-[10px] font-bold uppercase tracking-widest">
                                <div className="w-1.5 h-1.5 bg-white animate-pulse" /> Current Log Location
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-[#F9FAFB] p-8 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-slate-900">
                    <div className="w-10 h-10 bg-white border border-slate-200 flex items-center justify-center text-[#0096d6]">
                      <Truck size={20} />
                    </div>
                    <span>Inkjet Print Guide Logistic Protocol</span>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">ETA Deployment</p>
                    <p className="text-sm font-bold text-slate-900 uppercase">2-3 Business Days</p>
                  </div>
                </div>
              </m.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
