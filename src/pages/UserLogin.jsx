import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Loader2, ArrowRight, ShieldCheck } from 'lucide-react';
import API_BASE_URL from '../config';
import SEO from '@/components/SEO';

export default function UserLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type: 'user', identifier: email, password })
            });

            const data = await response.json();
            if (data.status === 'success') {
                localStorage.setItem('user', JSON.stringify(data.data));
                window.dispatchEvent(new Event('storage'));
                navigate('/');
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            setError('Could not connect to server.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f8faff] font-sans px-4 py-12">
            <SEO title="Sign In | Print Mora" />

            <div className="w-full max-w-[460px] bg-white rounded-[32px] border border-blue-50 shadow-[0_20px_50px_rgba(47,92,171,0.08)] overflow-hidden">
                {/* Top Accent Bar */}
                <div className="h-2 bg-[#ffd33d]"></div>

                <div className="p-8 md:p-12">
                    <div className="text-center mb-10">
                        <Link to="/" className="inline-block mb-8">
                            <img src="/logo/logo.png" alt="Logo" className="h-12 object-contain" />
                        </Link>
                        <h1 className="text-3xl font-bold text-[#2f5cab]">Welcome Back</h1>
                        <p className="text-slate-500 mt-3 font-medium">Please enter your details to sign in.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        {error && (
                            <div className="p-4 bg-red-50 text-red-600 text-[13px] font-semibold rounded-2xl border border-red-100 flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-[14px] font-bold text-slate-700 ml-1">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#2f5cab] transition-colors" size={20} />
                                <input
                                    required
                                    type="email"
                                    placeholder="your@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full h-14 pl-12 pr-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-[#2f5cab] focus:bg-white focus:ring-4 focus:ring-[#2f5cab]/5 transition-all text-[15px] font-medium placeholder:text-slate-300"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-[14px] font-bold text-slate-700">Password</label>
                                <Link to="#" className="text-[12px] font-bold text-[#2f5cab] hover:underline">Forgot password?</Link>
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#2f5cab] transition-colors" size={20} />
                                <input
                                    required
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full h-14 pl-12 pr-12 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-[#2f5cab] focus:bg-white focus:ring-4 focus:ring-[#2f5cab]/5 transition-all text-[15px] font-medium placeholder:text-slate-300"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#2f5cab] transition-colors cursor-pointer"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <button
                            disabled={loading}
                            className="w-full h-16 bg-[#2f5cab] text-white rounded-2xl font-bold text-[16px] hover:bg-[#234d98] transition-all disabled:opacity-70 shadow-xl shadow-blue-600/10 cursor-pointer flex items-center justify-center gap-3 active:scale-[0.98] mt-4"
                        >
                            {loading ? <Loader2 className="animate-spin" size={20} /> : (
                                <>
                                    Sign In
                                    <ArrowRight size={20} />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-10 pt-8 border-t border-slate-100 flex flex-col items-center gap-6">
                        <p className="text-[15px] text-slate-500 font-medium">
                            New here?{' '}
                            <Link to="/signup" className="text-[#2f5cab] font-bold hover:underline">Create an account</Link>
                        </p>

                        <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                            <ShieldCheck size={16} className="text-emerald-500" />
                            Secure & Encrypted Session
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
