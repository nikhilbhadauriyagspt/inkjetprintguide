import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Loader2, ShieldCheck, Sparkles } from 'lucide-react';
import API_BASE_URL from '../config';
import SEO from '@/components/SEO';

export default function UserSignup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'user',
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (data.status === 'success') {
        localStorage.setItem('user', JSON.stringify(data.data));
        window.dispatchEvent(new Event('storage'));
        navigate('/');
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Could not connect to server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8faff] font-sans px-4 py-12 md:py-20">
      <SEO title="Create Your Account | Print Mora" />

      <div className="w-full max-w-[520px] bg-white rounded-[32px] border border-blue-50 shadow-[0_20px_60px_rgba(47,92,171,0.08)] overflow-hidden">
        {/* Top Accent Bar */}
        <div className="h-2 bg-[#ffd33d]"></div>

        <div className="p-8 md:p-12">
          <div className="text-center mb-10">
            <Link to="/" className="inline-block mb-8">
              <img src="/logo/logo.png" alt="Logo" className="h-12 object-contain" />
            </Link>
            <div className="flex items-center justify-center gap-2 text-[#ffd33d] mb-3">
              <Sparkles size={18} fill="currentColor" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Join Print Mora</span>
            </div>
            <h1 className="text-3xl font-bold text-[#2f5cab]">Create Account</h1>
            <p className="text-slate-500 mt-3 font-medium">Join us for premium printing solutions.</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-50 text-red-600 text-[13px] font-semibold rounded-2xl border border-red-100 text-center">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[14px] font-bold text-slate-700 ml-1">Full Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#2f5cab] transition-colors" size={20} />
                <input
                  required
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full h-14 pl-12 pr-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-[#2f5cab] focus:bg-white focus:ring-4 focus:ring-[#2f5cab]/5 transition-all text-[15px] font-medium placeholder:text-slate-300"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[14px] font-bold text-slate-700 ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#2f5cab] transition-colors" size={20} />
                <input
                  required
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full h-14 pl-12 pr-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-[#2f5cab] focus:bg-white focus:ring-4 focus:ring-[#2f5cab]/5 transition-all text-[15px] font-medium placeholder:text-slate-300"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[14px] font-bold text-slate-700 ml-1">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#2f5cab] transition-colors" size={20} />
                  <input
                    required
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full h-14 pl-12 pr-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-[#2f5cab] focus:bg-white focus:ring-4 focus:ring-[#2f5cab]/5 transition-all text-[15px] font-medium placeholder:text-slate-300"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[14px] font-bold text-slate-700 ml-1">Confirm</label>
                <div className="relative group">
                  <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#2f5cab] transition-colors" size={20} />
                  <input
                    required
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full h-14 pl-12 pr-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-[#2f5cab] focus:bg-white focus:ring-4 focus:ring-[#2f5cab]/5 transition-all text-[15px] font-medium placeholder:text-slate-300"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 px-1 py-1">
              <input
                type="checkbox"
                id="showPass"
                onChange={(e) => setShowPassword(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-[#2f5cab] focus:ring-[#2f5cab] cursor-pointer"
              />
              <label htmlFor="showPass" className="text-[13px] font-semibold text-slate-500 cursor-pointer">Show Passwords</label>
            </div>

            <button
              disabled={loading}
              className="w-full h-16 bg-[#2f5cab] text-white rounded-2xl font-bold text-[16px] hover:bg-[#234d98] transition-all disabled:opacity-70 shadow-xl shadow-blue-600/10 cursor-pointer flex items-center justify-center gap-3 active:scale-[0.98] mt-2"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : (
                <>
                  Create Account
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-slate-100 text-center">
            <p className="text-[15px] text-slate-500 font-medium">
              Already have an account?{' '}
              <Link to="/login" className="text-[#2f5cab] font-bold hover:underline">Sign In Instead</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
