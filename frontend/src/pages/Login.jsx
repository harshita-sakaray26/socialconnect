import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, Sparkles, ArrowRight } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/discover');
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex gradient-bg">
      {/* Left - Illustration panel */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-accent-600 to-pink-600" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />

        <div className="relative z-10 text-center px-12">
          <div className="w-20 h-20 mx-auto mb-8 rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl font-extrabold text-white font-[family-name:var(--font-display)] mb-4">Welcome Back!</h2>
          <p className="text-lg text-white/70 max-w-sm mx-auto">Your friends are waiting. Sign in to continue building meaningful connections.</p>

          <div className="mt-12 grid grid-cols-3 gap-4 max-w-xs mx-auto">
            {['🎯', '💬', '🤝', '☕', '🎮', '📚', '🏃', '🎨', '🌍'].map((emoji, i) => (
              <div key={i} className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center text-2xl">
                {emoji}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right - Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-8">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg shadow-primary-500/25">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold font-[family-name:var(--font-display)]">
                <span className="text-slate-900">Social</span><span className="gradient-text">Connect</span>
              </span>
            </Link>
            <h1 className="text-3xl font-extrabold text-slate-900 font-[family-name:var(--font-display)]">Sign In</h1>
            <p className="text-slate-500 mt-2">Enter your credentials to access your account</p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-100 text-red-700 text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition text-sm" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input type={showPass ? 'text' : 'password'} required value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3.5 rounded-2xl border border-slate-200 bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition text-sm" />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white font-bold text-sm shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-all btn-shine disabled:opacity-60 flex items-center justify-center gap-2">
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Sign In <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-500">
              Don't have an account? <Link to="/register" className="font-bold text-primary-600 hover:text-primary-700">Sign up for free</Link>
            </p>
          </div>

          {/* Demo credentials */}
          <div className="mt-8 p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Demo Credentials</p>
            <p className="text-sm text-slate-600">Email: <code className="px-2 py-0.5 bg-white rounded-md text-primary-600 font-mono text-xs">alice@test.com</code></p>
            <p className="text-sm text-slate-600">Pass: <code className="px-2 py-0.5 bg-white rounded-md text-primary-600 font-mono text-xs">password123</code></p>
          </div>
        </div>
      </div>
    </div>
  );
}
