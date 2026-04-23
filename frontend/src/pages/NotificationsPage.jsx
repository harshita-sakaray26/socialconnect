import React from 'react';
import { Bell, UserPlus, Calendar, MessageCircle, Heart, CheckCircle } from 'lucide-react';

const DUMMY_NOTIFICATIONS = [
  { id: 1, type: 'connection', icon: <UserPlus size={18} />, color: 'bg-primary-100 text-primary-600', title: 'New Connection Request', desc: 'Bob Smith wants to connect with you', time: '2 min ago', unread: true },
  { id: 2, type: 'hangout', icon: <Calendar size={18} />, color: 'bg-accent-100 text-accent-600', title: 'Hangout Reminder', desc: 'Weekend Coffee Chat starts tomorrow at 10am', time: '1 hour ago', unread: true },
  { id: 3, type: 'message', icon: <MessageCircle size={18} />, color: 'bg-blue-100 text-blue-600', title: 'New Message', desc: 'Charlie Davis sent you a message', time: '3 hours ago', unread: true },
  { id: 4, type: 'like', icon: <Heart size={18} />, color: 'bg-rose-100 text-rose-600', title: 'Profile Liked', desc: 'Diana Prince liked your profile', time: '5 hours ago', unread: false },
  { id: 5, type: 'hangout', icon: <Calendar size={18} />, color: 'bg-emerald-100 text-emerald-600', title: 'Hangout Joined', desc: 'Ethan Hunt joined your Morning Hike hangout', time: '1 day ago', unread: false },
  { id: 6, type: 'system', icon: <CheckCircle size={18} />, color: 'bg-amber-100 text-amber-600', title: 'Profile Verified', desc: 'Your profile has been verified successfully!', time: '2 days ago', unread: false },
];

export default function NotificationsPage() {
  return (
    <div className="min-h-screen mesh-gradient">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 font-[family-name:var(--font-display)] flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-primary-500 flex items-center justify-center">
              <Bell className="w-5 h-5 text-white" />
            </div>
            Notifications
          </h1>
          <button className="text-sm font-semibold text-primary-600 hover:text-primary-700 transition">
            Mark all read
          </button>
        </div>

        <div className="space-y-3">
          {DUMMY_NOTIFICATIONS.map(notif => (
            <div key={notif.id}
              className={`flex items-start gap-4 p-5 rounded-2xl border transition-all cursor-pointer hover:shadow-md ${
                notif.unread ? 'bg-white border-primary-100 shadow-sm' : 'bg-white/60 border-slate-100'
              }`}>
              <div className={`w-10 h-10 rounded-xl ${notif.color} flex items-center justify-center shrink-0`}>
                {notif.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className={`text-sm font-bold ${notif.unread ? 'text-slate-900' : 'text-slate-700'}`}>{notif.title}</h3>
                  {notif.unread && <div className="w-2 h-2 bg-primary-500 rounded-full shrink-0" />}
                </div>
                <p className="text-sm text-slate-500 mt-0.5">{notif.desc}</p>
                <p className="text-xs text-slate-400 mt-1.5 font-medium">{notif.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
