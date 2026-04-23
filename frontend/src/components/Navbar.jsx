import React, { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LogOut, Users, Map, User as UserIcon, Bell, Menu, X, Sparkles } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;
  const isLanding = location.pathname === '/';

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${isLanding ? 'bg-transparent' : 'glass shadow-sm'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg shadow-primary-500/25 group-hover:shadow-primary-500/40 transition-shadow">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold font-[family-name:var(--font-display)] tracking-tight">
              <span className="text-slate-900">Social</span>
              <span className="gradient-text">Connect</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {user ? (
              <>
                <NavLink to="/discover" active={isActive('/discover')} icon={<Users size={18} />} label="Discover" />
                <NavLink to="/hangouts" active={isActive('/hangouts')} icon={<Map size={18} />} label="Hangouts" />
                <NavLink to="/notifications" active={isActive('/notifications')} icon={<Bell size={18} />} label="Alerts" badge={3} />
                <NavLink to="/profile" active={isActive('/profile')} icon={<UserIcon size={18} />} label="Profile" />
                <div className="w-px h-6 bg-slate-200 mx-2" />
                <button onClick={handleLogout} className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-slate-500 hover:text-red-600 hover:bg-red-50 transition-all">
                  <LogOut size={18} /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="px-5 py-2 text-sm font-semibold text-slate-700 hover:text-primary-600 transition">
                  Sign In
                </Link>
                <Link to="/register" className="px-5 py-2.5 text-sm font-semibold rounded-full text-white bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-all btn-shine">
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 rounded-xl hover:bg-slate-100 transition">
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden glass border-t border-slate-200/50 px-4 pb-4 pt-2 space-y-1">
          {user ? (
            <>
              <MobileLink to="/discover" label="Discover" onClick={() => setMobileOpen(false)} />
              <MobileLink to="/hangouts" label="Hangouts" onClick={() => setMobileOpen(false)} />
              <MobileLink to="/notifications" label="Notifications" onClick={() => setMobileOpen(false)} />
              <MobileLink to="/profile" label="Profile" onClick={() => setMobileOpen(false)} />
              <button onClick={() => { handleLogout(); setMobileOpen(false); }} className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition">
                Logout
              </button>
            </>
          ) : (
            <>
              <MobileLink to="/login" label="Sign In" onClick={() => setMobileOpen(false)} />
              <MobileLink to="/register" label="Get Started" onClick={() => setMobileOpen(false)} />
            </>
          )}
        </div>
      )}
    </nav>
  );
}

function NavLink({ to, active, icon, label, badge }) {
  return (
    <Link to={to} className={`relative flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all ${active ? 'text-primary-600 bg-primary-50' : 'text-slate-600 hover:text-primary-600 hover:bg-slate-50'}`}>
      {icon} {label}
      {badge && (
        <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 text-[10px] font-bold bg-red-500 text-white rounded-full flex items-center justify-center">
          {badge}
        </span>
      )}
    </Link>
  );
}

function MobileLink({ to, label, onClick }) {
  return (
    <Link to={to} onClick={onClick} className="block px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-primary-50 hover:text-primary-600 transition">
      {label}
    </Link>
  );
}
