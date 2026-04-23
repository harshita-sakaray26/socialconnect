import React from 'react';
import { BarChart3, Users, Calendar, Activity, ArrowUpRight, ArrowDownRight, MoreHorizontal, UserPlus, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminPanel() {
  const stats = [
    { label: 'Total Users', value: '12,482', change: '+12%', icon: <Users />, color: 'bg-primary-500' },
    { label: 'Active Hangouts', value: '3,210', change: '+18%', icon: <Calendar />, color: 'bg-accent-500' },
    { label: 'Daily Activity', value: '85%', change: '-2%', icon: <Activity />, color: 'bg-emerald-500' },
    { label: 'Security Alerts', value: '4', change: '0%', icon: <ShieldAlert />, color: 'bg-rose-500' },
  ];

  const recentUsers = [
    { name: 'John Smith', email: 'john@example.com', status: 'Active', joined: '2h ago' },
    { name: 'Sarah Wilson', email: 'sarah@example.com', status: 'Pending', joined: '4h ago' },
    { name: 'Mike Ross', email: 'mike@example.com', status: 'Active', joined: '6h ago' },
    { name: 'Rachel Zane', email: 'rachel@example.com', status: 'Banned', joined: '1d ago' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 font-[family-name:var(--font-display)]">Admin Dashboard</h1>
            <p className="text-slate-500 font-medium">Platform analytics and user management</p>
          </div>
          <div className="flex gap-3">
            <button className="px-5 py-2.5 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-600 shadow-sm hover:bg-slate-50 transition">Download Report</button>
            <button className="px-5 py-2.5 bg-primary-500 text-white rounded-2xl text-sm font-bold shadow-lg shadow-primary-500/25 hover:bg-primary-600 transition btn-shine">Export Data</button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={i} 
              className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm card-hover"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 ${stat.color} text-white rounded-2xl flex items-center justify-center shadow-lg shadow-current/20`}>
                  {stat.icon}
                </div>
                <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold ${stat.change.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                  {stat.change.startsWith('+') ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                  {stat.change}
                </div>
              </div>
              <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">{stat.label}</h3>
              <p className="text-2xl font-black text-slate-900">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Signups */}
          <div className="lg:col-span-2 bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <UserPlus size={20} className="text-primary-500" /> Recent Signups
              </h2>
              <button className="text-slate-400 hover:text-slate-600 transition"><MoreHorizontal size={20} /></button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50">
                    <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">User</th>
                    <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                    <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Joined</th>
                    <th className="px-8 py-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {recentUsers.map((user, i) => (
                    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-8 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-400">{user.name[0]}</div>
                          <div>
                            <p className="text-sm font-bold text-slate-900">{user.name}</p>
                            <p className="text-xs text-slate-500">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                          user.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 
                          user.status === 'Pending' ? 'bg-amber-50 text-amber-600' : 'bg-rose-50 text-rose-600'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-8 py-4 text-xs font-semibold text-slate-500">{user.joined}</td>
                      <td className="px-8 py-4 text-right">
                        <button className="px-4 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition">Details</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Stats Chart Placeholder */}
          <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-8 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-primary-50 rounded-[2rem] flex items-center justify-center text-primary-500 mb-6">
              <BarChart3 size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Growth Analytics</h3>
            <p className="text-sm text-slate-500 mb-8 max-w-[200px]">Real-time tracking of platform engagement and user retention.</p>
            <div className="w-full space-y-4">
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden"><div className="w-[85%] h-full bg-primary-500 rounded-full"></div></div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden"><div className="w-[62%] h-full bg-accent-500 rounded-full"></div></div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden"><div className="w-[45%] h-full bg-emerald-500 rounded-full"></div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
