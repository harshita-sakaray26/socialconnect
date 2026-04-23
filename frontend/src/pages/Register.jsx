import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, MapPin, Sparkles, ArrowRight, Eye, EyeOff } from 'lucide-react';

const INTEREST_OPTIONS = ['Coding', 'Coffee', 'Hiking', 'Photography', 'Music', 'Gaming', 'Art', 'Fitness', 'Travel', 'Reading', 'Cooking', 'Movies', 'Tech', 'Dance', 'Sports', 'Yoga'];

export default function Register() {
  const [form, setForm] = useState({ fullName: '', username: '', email: '', password: '', city: '', interests: [] });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const toggleInterest = (interest) => {
    setForm(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(form);
      navigate('/discover');
    } catch (err) {
      setError(err.response?.data?.msg || 'Registration failed. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex gradient-bg">
      {/* Left - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-600 via-primary-600 to-blue-600" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />

        <div className="relative z-10 text-center px-12">
          <div className="w-20 h-20 mx-auto mb-8 rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl font-extrabold text-white font-[family-name:var(--font-display)] mb-4">Join the Community</h2>
          <p className="text-lg text-white/70 max-w-sm mx-auto">Create your profile, discover amazing people, and start building real friendships today.</p>

          <div className="mt-12 space-y-4 max-w-xs mx-auto text-left">
            {[
              { emoji: '🔍', text: 'Smart matching based on interests' },
              { emoji: '☕', text: 'Local hangouts and meetups' },
              { emoji: '🛡️', text: 'Safe, moderated community' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10">
                <span className="text-2xl">{item.emoji}</span>
                <span className="text-white/90 text-sm font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right - Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-8 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg shadow-primary-500/25">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold font-[family-name:var(--font-display)]">
                <span className="text-slate-900">Social</span><span className="gradient-text">Connect</span>
              </span>
            </Link>
            <h1 className="text-3xl font-extrabold text-slate-900 font-[family-name:var(--font-display)]">Create Account</h1>
            <p className="text-slate-500 mt-2">Step {step} of 2 — {step === 1 ? 'Your details' : 'Pick your interests'}</p>
          </div>

          {/* Progress bar */}
          <div className="flex gap-2 mb-8">
            <div className={`h-1.5 flex-1 rounded-full transition-all ${step >= 1 ? 'bg-gradient-to-r from-primary-500 to-accent-500' : 'bg-slate-200'}`} />
            <div className={`h-1.5 flex-1 rounded-full transition-all ${step >= 2 ? 'bg-gradient-to-r from-primary-500 to-accent-500' : 'bg-slate-200'}`} />
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-100 text-red-700 text-sm font-medium">{error}</div>
          )}

          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input name="fullName" required value={form.fullName} onChange={handleChange} placeholder="John Doe"
                      className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition text-sm" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Username</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-bold">@</span>
                    <input name="username" required value={form.username} onChange={handleChange} placeholder="johndoe"
                      className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition text-sm" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input name="email" type="email" required value={form.email} onChange={handleChange} placeholder="you@example.com"
                      className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition text-sm" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input name="password" type={showPass ? 'text' : 'password'} required value={form.password} onChange={handleChange} placeholder="Min 6 characters"
                      className="w-full pl-12 pr-12 py-3.5 rounded-2xl border border-slate-200 bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition text-sm" />
                    <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                      {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">City</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input name="city" value={form.city} onChange={handleChange} placeholder="San Francisco"
                      className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition text-sm" />
                  </div>
                </div>
                <button type="button" onClick={() => setStep(2)}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white font-bold text-sm shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-all btn-shine flex items-center justify-center gap-2">
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-4">Choose your interests</label>
                  <div className="flex flex-wrap gap-2">
                    {INTEREST_OPTIONS.map(interest => (
                      <button type="button" key={interest} onClick={() => toggleInterest(interest)}
                        className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${form.interests.includes(interest)
                            ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-md shadow-primary-500/20'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}>
                        {interest}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-slate-500 mt-3">{form.interests.length} selected — pick at least 3 for better matches</p>
                </div>

                <div className="flex gap-3">
                  <button type="button" onClick={() => setStep(1)}
                    className="flex-1 py-3.5 rounded-2xl bg-slate-100 text-slate-700 font-bold text-sm hover:bg-slate-200 transition">
                    Back
                  </button>
                  <button type="submit" disabled={loading}
                    className="flex-[2] py-3.5 rounded-2xl bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white font-bold text-sm shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-all btn-shine disabled:opacity-60 flex items-center justify-center gap-2">
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>Create Account <ArrowRight className="w-4 h-4" /></>
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-500">
              Already have an account? <Link to="/login" className="font-bold text-primary-600 hover:text-primary-700">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
