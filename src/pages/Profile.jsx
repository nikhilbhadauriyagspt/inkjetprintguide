import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate, Link } from 'react-router-dom';
import { m, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../config';
import {
  User,
  Lock,
  ArrowRight,
  Package,
  ChevronRight,
  LogOut,
  ShieldCheck,
  Eye,
  EyeOff,
  Loader2,
  Settings,
  Shield,
  CreditCard,
  MapPin,
  Phone,
  Mail,
  Clock,
  ExternalLink
} from 'lucide-react';
import SEO from '@/components/SEO';

export default function Profile() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || 'null'));
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile'); // 'profile', 'orders', 'security'
  const [isUpdating, setIsUpdating] = useState(false);
  const { showToast } = useCart();
  const navigate = useNavigate();

  // Form states
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || '',
    zipCode: user?.zip_code || user?.zipCode || ''
  });
  const [securityForm, setSecurityForm] = useState({
    password: '',
    confirmPassword: ''
  });
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders?user_id=${user.id}`);
      const data = await response.json();
      if (data.status === 'success') setOrders(data.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const response = await fetch(`${API_BASE_URL}/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileForm)
      });
      const data = await response.json();
      if (data.status === 'success') {
        localStorage.setItem('user', JSON.stringify(data.data));
        setUser(data.data);
        showToast("Profile updated successfully.");
      }
    } catch (err) {
      showToast("Update failed", "error");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSecurityUpdate = async (e) => {
    e.preventDefault();
    if (securityForm.password !== securityForm.confirmPassword) {
      showToast("Passwords do not match", "error");
      return;
    }
    setIsUpdating(true);
    try {
      const response = await fetch(`${API_BASE_URL}/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: securityForm.password })
      });
      const data = await response.json();
      if (data.status === 'success') {
        showToast("Security updated.");
        setSecurityForm({ password: '', confirmPassword: '' });
      }
    } catch (err) {
      showToast("Sync failed", "error");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.dispatchEvent(new Event('storage'));
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="bg-white min-h-screen font-sans text-slate-900 pb-20">
      <SEO title="Your Account | Profile | Inkjet Print Guide" />

      {/* --- PAGE HEADER --- */}
      <div className="bg-white border-b border-slate-100 py-12 md:py-16 mb-12">
        <div className="max-w-[1700px] mx-auto px-6">
          <nav className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-6">
            <Link to="/" className="hover:text-[#0096d6] transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span className="text-[#0096d6]">Account Management</span>
          </nav>
          <div className="flex items-start gap-4">
            <div className="w-1.5 h-10 bg-[#0096d6] shrink-0 mt-1"></div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight uppercase">User Dashboard</h1>
          </div>
        </div>
      </div>

      <div className="max-w-[1700px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* --- SIDEBAR --- */}
          <aside className="lg:col-span-4 space-y-8">
            <div className="bg-white border border-slate-200 p-8">
              <div className="flex flex-col items-center text-center mb-10">
                <div className="h-20 w-20 bg-slate-900 text-white flex items-center justify-center text-2xl font-bold rounded-none mb-4">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <h2 className="text-xl font-bold uppercase tracking-tight">{user.name}</h2>
                <div className="flex items-center gap-2 text-slate-400 text-[12px] mt-1 font-bold uppercase tracking-widest">
                  <Mail size={14} />
                  <span>{user.email}</span>
                </div>
              </div>

              <div className="space-y-1">
                {[
                  { id: 'profile', label: 'Personal Information', icon: User },
                  { id: 'orders', label: 'Order Registry', icon: Package },
                  { id: 'security', label: 'System Security', icon: Shield }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-4 px-6 py-4 text-[13px] font-bold uppercase tracking-widest transition-all border cursor-pointer ${activeTab === tab.id
                      ? 'bg-[#0096d6] text-white border-[#0096d6]'
                      : 'text-slate-500 border-transparent hover:bg-slate-50 hover:text-[#0096d6]'
                      }`}
                  >
                    <tab.icon size={18} />
                    <span>{tab.label}</span>
                  </button>
                ))}

                <div className="pt-6 mt-6 border-t border-slate-100">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-4 px-6 py-4 text-[13px] font-bold text-red-500 hover:bg-red-50 transition-all uppercase tracking-widest"
                  >
                    <LogOut size={18} />
                    Disconnect Session
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-slate-950 text-white p-10 border-l-4 border-[#0096d6] space-y-6">
              <ShieldCheck className="text-blue-500" size={32} />
              <h4 className="text-xl font-bold tracking-tight uppercase">Technical Support</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                Need assistance with your equipment deployment? Our technical experts are ready to assist.
              </p>
              <Link to="/contact" className="inline-flex items-center gap-3 bg-[#0096d6] text-white px-8 py-4 font-bold text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                Request Help <ArrowRight size={16} />
              </Link>
            </div>
          </aside>

          {/* --- MAIN CONTENT --- */}
          <main className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {activeTab === 'profile' && (
                <m.div
                  key="profile" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="bg-white p-8 md:p-12 border border-slate-200"
                >
                  <div className="flex items-center gap-4 mb-12 pb-6 border-b border-slate-100">
                    <div className="h-10 w-1.5 bg-[#0096d6]"></div>
                    <div>
                      <h3 className="text-2xl font-bold uppercase tracking-tight">Personal Data Registry</h3>
                      <p className="text-[12px] font-bold text-slate-400 mt-1 uppercase tracking-widest">Maintain your contact and deployment coordinates</p>
                    </div>
                  </div>

                  <form onSubmit={handleProfileUpdate} className="space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-2">
                        <label className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">Full Legal Name</label>
                        <input
                          required value={profileForm.name}
                          onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                          className="w-full h-14 px-6 bg-[#F9FAFB] border border-slate-200 outline-none focus:border-[#0096d6] text-[15px] font-medium transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">Contact Number</label>
                        <input
                          value={profileForm.phone}
                          onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                          placeholder="+1 (000) 000-0000"
                          className="w-full h-14 px-6 bg-[#F9FAFB] border border-slate-200 outline-none focus:border-[#0096d6] text-[15px] font-medium transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">Default Deployment Station</label>
                      <textarea
                        rows="3" value={profileForm.address}
                        onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                        placeholder="Street address, building, suite..."
                        className="w-full p-6 bg-[#F9FAFB] border border-slate-200 outline-none focus:border-[#0096d6] text-[15px] font-medium transition-all resize-none"
                      ></textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-2">
                        <label className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">City Registry</label>
                        <input
                          value={profileForm.city}
                          onChange={(e) => setProfileForm({ ...profileForm, city: e.target.value })}
                          className="w-full h-14 px-6 bg-[#F9FAFB] border border-slate-200 outline-none focus:border-[#0096d6] text-[15px] font-medium transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">Postal Code</label>
                        <input
                          value={profileForm.zipCode}
                          onChange={(e) => setProfileForm({ ...profileForm, zipCode: e.target.value })}
                          className="w-full h-14 px-6 bg-[#F9FAFB] border border-slate-200 outline-none focus:border-[#0096d6] text-[15px] font-medium transition-all"
                        />
                      </div>
                    </div>

                    <button
                      disabled={isUpdating}
                      className="h-16 px-12 bg-slate-900 text-white font-bold text-sm uppercase tracking-[0.2em] hover:bg-[#0096d6] transition-all flex items-center gap-4"
                    >
                      {isUpdating ? <Loader2 className="animate-spin" size={20} /> : "Update Registry"}
                      <ArrowRight size={18} />
                    </button>
                  </form>
                </m.div>
              )}

              {activeTab === 'orders' && (
                <m.div
                  key="orders" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="space-y-8"
                >
                  <div className="bg-white p-8 border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-5">
                      <div className="w-1.5 h-10 bg-[#0096d6]"></div>
                      <div>
                        <h3 className="text-2xl font-bold uppercase tracking-tight">Recent Order Manifests</h3>
                        <p className="text-[12px] font-bold text-slate-400 mt-1 uppercase tracking-widest">{orders.length} units detected in registry</p>
                      </div>
                    </div>
                    <Link to="/shop" className="bg-black text-white px-6 py-3 text-[11px] font-bold uppercase tracking-widest hover:bg-[#0096d6] transition-all">
                      Browse Inventory
                    </Link>
                  </div>

                  {orders.length === 0 ? (
                    <div className="bg-[#F9FAFB] py-24 text-center border border-slate-200">
                      <Package size={48} className="text-slate-200 mx-auto mb-6" />
                      <p className="text-slate-400 font-bold text-[13px] uppercase tracking-[0.2em]">No order history detected in registry.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-6">
                      {orders.slice(0, 5).map((order) => (
                        <div key={order.id} className="bg-white border border-slate-200 p-8 flex flex-col md:flex-row items-center justify-between gap-8 group hover:border-blue-400 transition-all">
                          <div className="flex items-center gap-6 w-full md:w-auto">
                            <div className="h-16 w-16 bg-[#F9FAFB] border border-slate-100 flex items-center justify-center text-slate-900 group-hover:bg-[#0096d6] group-hover:text-white transition-all">
                              <Clock size={28} />
                            </div>
                            <div>
                              <p className="text-[12px] font-bold text-slate-400 uppercase tracking-widest mb-1">#RP-{order.id}</p>
                              <div className="flex items-center gap-3">
                                <span className={`w-2 h-2 ${order.status === 'delivered' ? 'bg-emerald-500' : 'bg-[#0096d6]'}`} />
                                <span className="text-[15px] font-bold uppercase tracking-tight">{order.status.replace(/_/g, ' ')}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between w-full md:w-auto md:gap-16">
                            <div className="text-right">
                              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">{new Date(order.created_at).toLocaleDateString()}</p>
                              <p className="text-xl font-bold text-slate-950">${parseFloat(order.total_amount).toLocaleString()}</p>
                            </div>
                            <Link to="/orders" className="h-12 w-12 border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-[#0096d6] hover:text-white hover:border-[#0096d6] transition-all">
                              <ExternalLink size={20} />
                            </Link>
                          </div>
                        </div>
                      ))}

                      <Link to="/orders" className="block text-center py-6 text-[13px] font-bold text-[#0096d6] uppercase tracking-[0.2em] hover:underline">
                        Access Full Order Registry
                      </Link>
                    </div>
                  )}
                </m.div>
              )}

              {activeTab === 'security' && (
                <m.div
                  key="security" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="bg-white p-8 md:p-12 border border-slate-200"
                >
                  <div className="flex items-center gap-4 mb-12 pb-6 border-b border-slate-100">
                    <div className="h-10 w-1.5 bg-[#0096d6]"></div>
                    <div>
                      <h3 className="text-2xl font-bold uppercase tracking-tight">Security Protocols</h3>
                      <p className="text-[12px] font-bold text-slate-400 mt-1 uppercase tracking-widest">Update your secure access credentials</p>
                    </div>
                  </div>

                  <form onSubmit={handleSecurityUpdate} className="space-y-10">
                    <div className="space-y-2">
                      <label className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">New Security Password</label>
                      <div className="relative group">
                        <input
                          type={showPass ? "text" : "password"} required
                          placeholder="••••••••"
                          value={securityForm.password} onChange={(e) => setSecurityForm({ ...securityForm, password: e.target.value })}
                          className="w-full h-14 pl-6 pr-14 bg-[#F9FAFB] border border-slate-200 outline-none focus:border-[#0096d6] text-[15px] font-medium transition-all"
                        />
                        <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#0096d6] cursor-pointer transition-colors">
                          {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">Verify New Password</label>
                      <input
                        type={showPass ? "text" : "password"} required
                        placeholder="••••••••"
                        value={securityForm.confirmPassword} onChange={(e) => setSecurityForm({ ...securityForm, confirmPassword: e.target.value })}
                        className="w-full h-14 px-6 bg-[#F9FAFB] border border-slate-200 outline-none focus:border-[#0096d6] text-[15px] font-medium transition-all"
                      />
                    </div>
                    <button
                      disabled={isUpdating}
                      className="h-16 px-12 bg-slate-900 text-white font-bold text-sm uppercase tracking-[0.2em] hover:bg-[#0096d6] transition-all flex items-center gap-4"
                    >
                      {isUpdating ? <Loader2 className="animate-spin" size={20} /> : "Finalize Password Protocol"}
                      <Shield size={18} />
                    </button>
                  </form>
                </m.div>
              )}
            </AnimatePresence>
          </main>

        </div>
      </div>
    </div>
  );
}
