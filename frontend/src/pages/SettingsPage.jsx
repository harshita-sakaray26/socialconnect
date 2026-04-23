import React, { useState } from 'react';
import { Shield, Bell, Lock, User, Eye, Moon, Globe, Smartphone, HelpCircle, LogOut, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('Account');

  const SETTINGS_TABS = [
    { id: 'Account', icon: <User size={18} /> },
    { id: 'Privacy', icon: <Shield size={18} /> },
    { id: 'Notifications', icon: <Bell size={18} /> },
    { id: 'Appearance', icon: <Moon size={18} /> },
  ];

  return (
    <div className="min-h-screen mesh-gradient py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 font-[family-name:var(--font-display)]">Settings</h1>
          <p className="text-slate-500 mt-1">Manage your account preferences and privacy settings</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Tabs Sidebar */}
          <div className="w-full md:w-64 space-y-1 shrink-0">
            {SETTINGS_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/20'
                    : 'bg-white text-slate-600 hover:bg-slate-50 shadow-sm border border-slate-100'
                }`}
              >
                {tab.icon} {tab.id}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="flex-1 space-y-6">
            {activeTab === 'Account' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <SettingsCard title="Profile Information">
                  <div className="space-y-4">
                    <SettingItem icon={<Globe className="text-blue-500" />} title="Language" desc="English (US)" />
                    <SettingItem icon={<Smartphone className="text-emerald-500" />} title="Connected Devices" desc="2 active sessions" />
                  </div>
                </SettingsCard>

                <SettingsCard title="Security">
                  <div className="space-y-4">
                    <SettingItem icon={<Lock className="text-amber-500" />} title="Password" desc="Last changed 3 months ago" action />
                    <SettingItem icon={<Shield className="text-primary-500" />} title="Two-Factor Authentication" desc="Disabled" toggle />
                  </div>
                </SettingsCard>
              </motion.div>
            )}

            {activeTab === 'Privacy' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <SettingsCard title="Visibility">
                  <div className="space-y-4">
                    <SettingItem icon={<Eye className="text-indigo-500" />} title="Profile Visibility" desc="Everyone can see your profile" toggle />
                    <SettingItem icon={<User className="text-pink-500" />} title="Who can message you" desc="Friends only" />
                  </div>
                </SettingsCard>
              </motion.div>
            )}

            {activeTab === 'Notifications' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <SettingsCard title="Alerts">
                  <div className="space-y-4">
                    <SettingItem icon={<Bell className="text-primary-500" />} title="Push Notifications" desc="Enabled" toggle />
                    <SettingItem icon={<Mail className="text-blue-500" />} title="Email Updates" desc="Only critical alerts" toggle />
                  </div>
                </SettingsCard>
              </motion.div>
            )}

            {activeTab === 'Appearance' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <SettingsCard title="Theming">
                  <div className="space-y-4">
                    <SettingItem icon={<Moon className="text-slate-700" />} title="Dark Mode" desc="Automatic" toggle />
                  </div>
                </SettingsCard>
              </motion.div>
            )}

            {/* Danger Zone */}
            <div className="p-6 bg-red-50 rounded-3xl border border-red-100 mt-8">
              <h3 className="text-lg font-bold text-red-900 mb-2 flex items-center gap-2">
                <HelpCircle size={20} /> Support & Account
              </h3>
              <p className="text-sm text-red-700 mb-6">If you're having trouble or want to leave us, here are your options.</p>
              <div className="flex flex-wrap gap-3">
                <button className="px-5 py-2.5 bg-white text-red-600 font-bold text-sm rounded-xl border border-red-200 hover:bg-red-50 transition shadow-sm">
                  Deactivate Account
                </button>
                <button className="px-5 py-2.5 bg-red-600 text-white font-bold text-sm rounded-xl hover:bg-red-700 transition shadow-lg shadow-red-600/20">
                  Delete Data
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingsCard({ title, children }) {
  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-50 bg-slate-50/50">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">{title}</h2>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}

function SettingItem({ icon, title, desc, toggle, action }) {
  return (
    <div className="flex items-center justify-between group cursor-pointer py-2">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-800">{title}</h3>
          <p className="text-xs text-slate-500">{desc}</p>
        </div>
      </div>
      {toggle ? (
        <div className="w-10 h-5 bg-primary-500 rounded-full relative shadow-inner">
          <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm"></div>
        </div>
      ) : action ? (
        <ChevronRight size={18} className="text-slate-300" />
      ) : null}
    </div>
  );
}
