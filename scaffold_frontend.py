import os

base_dir = r"c:\Users\karut\Desktop\socialconnect\frontend\src"

files = {
    "api.js": """import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
""",

    "context/AuthContext.jsx": """import React, { createContext, useState, useEffect } from 'react';
import api from '../api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const res = await api.get('/auth/me');
          setUser(res.data);
        } catch (err) {
          console.error('Failed to load user', err);
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', res.data.token);
    setUser(res.data.user);
  };

  const register = async (userData) => {
    const res = await api.post('/auth/register', userData);
    localStorage.setItem('token', res.data.token);
    setUser(res.data.user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
""",

    "components/Navbar.jsx": """import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LogOut, Users, Map, User as UserIcon } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
                SocialConnect
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/discover" className="text-gray-700 hover:text-indigo-600 flex items-center gap-1 font-medium"><Users size={18} /> Discover</Link>
                <Link to="/hangouts" className="text-gray-700 hover:text-indigo-600 flex items-center gap-1 font-medium"><Map size={18} /> Hangouts</Link>
                <Link to="/profile" className="text-gray-700 hover:text-indigo-600 flex items-center gap-1 font-medium"><UserIcon size={18} /> Profile</Link>
                <button onClick={handleLogout} className="text-gray-700 hover:text-red-600 flex items-center gap-1 font-medium">
                  <LogOut size={18} /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-indigo-600 font-medium">Login</Link>
                <Link to="/register" className="bg-indigo-600 text-white px-4 py-2 rounded-full font-medium hover:bg-indigo-700 transition shadow-md shadow-indigo-200">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
""",

    "pages/LandingPage.jsx": """import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Globe, Shield, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Hero Section */}
      <section className="flex-grow flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-8">
            Connect. Belong. <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Explore.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto mb-10">
            A modern platform designed to help you build genuine social connections, discover like-minded people, and join amazing group hangouts.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center gap-4">
            <Link to="/register" className="px-8 py-4 text-lg font-semibold rounded-full text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all hover:scale-105">Get Started</Link>
            <Link to="/login" className="px-8 py-4 text-lg font-semibold rounded-full text-indigo-600 bg-white border border-indigo-100 hover:bg-indigo-50 shadow-sm transition-all hover:scale-105">Sign In</Link>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">Why SocialConnect?</h2>
            <p className="mt-4 text-lg text-slate-600">Everything you need to find your tribe.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard icon={<Users className="w-8 h-8 text-indigo-600" />} title="Smart Matching" description="Find people who share your interests and social goals through our smart recommendation engine." />
            <FeatureCard icon={<Calendar className="w-8 h-8 text-purple-600" />} title="Group Hangouts" description="Discover and join local meetups, from coffee chats to weekend treks." />
            <FeatureCard icon={<Shield className="w-8 h-8 text-green-600" />} title="Safe Space" description="A highly moderated community with robust privacy controls to keep you safe." />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-12 text-center text-slate-400">
        <p>&copy; 2026 SocialConnect. All rights reserved.</p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-300">
      <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </div>
  );
}
""",

    "pages/Login.jsx": """import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/discover');
    } catch (err) {
      alert('Login failed. Please check credentials.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
        <h2 className="text-3xl font-bold text-center text-slate-900 mb-8">Welcome Back</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)} 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
            <input type="password" required value={password} onChange={e => setPassword(e.target.value)} 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition" />
          </div>
          <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-indigo-700 transition shadow-md shadow-indigo-200">
            Sign In
          </button>
        </form>
        <p className="mt-6 text-center text-slate-600">
          Don't have an account? <Link to="/register" className="text-indigo-600 font-semibold hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
""",

    "pages/DiscoverPeople.jsx": """import React, { useEffect, useState } from 'react';
import api from '../api';
import { motion } from 'framer-motion';
import { MapPin, Briefcase } from 'lucide-react';

export default function DiscoverPeople() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get('/users');
        setUsers(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Discover People</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {users.map((user, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={user._id} className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-lg shadow-slate-200/50 hover:shadow-xl transition-all group">
            <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600 relative">
              <img src={user.profilePicture} alt="avatar" className="w-20 h-20 rounded-full border-4 border-white absolute -bottom-10 left-6 object-cover bg-white" />
            </div>
            <div className="pt-14 p-6">
              <h3 className="text-xl font-bold text-slate-900">{user.fullName} <span className="text-slate-500 font-normal text-base">, {user.age || 20}</span></h3>
              <p className="text-sm text-slate-500 flex items-center gap-1 mt-1"><MapPin size={14}/> {user.city || 'Unknown'}</p>
              
              <div className="mt-4 flex flex-wrap gap-2">
                {user.interests && user.interests.map((interest, idx) => (
                  <span key={idx} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-medium">
                    {interest}
                  </span>
                ))}
              </div>
              
              <button className="mt-6 w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold rounded-xl border border-slate-200 transition">
                View Profile
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
""",

    "pages/HangoutsPage.jsx": """import React, { useEffect, useState, useContext } from 'react';
import api from '../api';
import { AuthContext } from '../context/AuthContext';
import { Calendar, MapPin, Users } from 'lucide-react';

export default function HangoutsPage() {
  const [hangouts, setHangouts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchHangouts();
  }, []);

  const fetchHangouts = async () => {
    try {
      const res = await api.get('/hangouts');
      setHangouts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleJoin = async (id) => {
    try {
      await api.post(`/hangouts/${id}/join`);
      fetchHangouts();
      alert('Joined successfully!');
    } catch (err) {
      alert(err.response?.data?.msg || 'Failed to join');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Local Hangouts</h1>
        <button className="bg-indigo-600 text-white px-6 py-2 rounded-full font-medium hover:bg-indigo-700 transition shadow-md">
          Create Hangout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {hangouts.map(hangout => {
          const isJoined = hangout.participants.some(p => p._id === user?._id || p === user?.id);
          const isFull = hangout.participants.length >= hangout.seatLimit;

          return (
            <div key={hangout._id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-lg transition flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1 block">{hangout.category}</span>
                  <h3 className="text-2xl font-bold text-slate-900">{hangout.title}</h3>
                </div>
              </div>
              <p className="text-slate-600 mb-6 flex-grow">{hangout.description}</p>
              
              <div className="space-y-2 mb-6 text-sm text-slate-500 font-medium">
                <div className="flex items-center gap-2"><Calendar size={16} className="text-slate-400" /> {new Date(hangout.dateTime).toLocaleString()}</div>
                <div className="flex items-center gap-2"><MapPin size={16} className="text-slate-400" /> {hangout.location}</div>
                <div className="flex items-center gap-2"><Users size={16} className="text-slate-400" /> {hangout.participants.length} / {hangout.seatLimit} Spots Filled</div>
              </div>

              {isJoined ? (
                <button disabled className="w-full py-3 bg-green-50 text-green-700 font-bold rounded-xl border border-green-200">
                  Joined
                </button>
              ) : isFull ? (
                <button disabled className="w-full py-3 bg-slate-100 text-slate-400 font-bold rounded-xl cursor-not-allowed">
                  Full
                </button>
              ) : (
                <button onClick={() => handleJoin(hangout._id)} className="w-full py-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold rounded-xl transition">
                  Join Hangout
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
""",

    "App.jsx": """import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import DiscoverPeople from './pages/DiscoverPeople';
import HangoutsPage from './pages/HangoutsPage';
import { AuthProvider, AuthContext } from './context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user, loading } = React.useContext(AuthContext);
  if (loading) return <div>Loading...</div>;
  return user ? children : <Navigate to="/login" />;
};

function AppRoutes() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          {/* Register placeholder */}
          <Route path="/register" element={<Login />} />
          
          <Route path="/discover" element={<PrivateRoute><DiscoverPeople /></PrivateRoute>} />
          <Route path="/hangouts" element={<PrivateRoute><HangoutsPage /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><div className="p-8">Profile Coming Soon</div></PrivateRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
"""
}

# Create directories
for dir_path in ["context", "components", "pages"]:
    os.makedirs(os.path.join(base_dir, dir_path), exist_ok=True)

# Write files
for filename, content in files.items():
    with open(os.path.join(base_dir, filename), "w", encoding="utf-8") as f:
        f.write(content)

print("Frontend setup complete!")
