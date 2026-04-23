import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../api';
import { MapPin, BadgeCheck, Calendar, Users, Edit3, Shield, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProfilePage() {
  const { user: authUser } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/auth/me');
        setProfile(res.data);
      } catch (err) { console.error(err); }
      setLoading(false);
    };
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen mesh-gradient">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="h-48 skeleton rounded-3xl mb-4" />
          <div className="bg-white rounded-3xl p-8 border border-slate-100">
            <div className="flex items-end gap-6 -mt-20">
              <div className="w-28 h-28 skeleton rounded-3xl" />
              <div className="flex-1">
                <div className="h-7 w-48 skeleton mb-2" />
                <div className="h-5 w-32 skeleton" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) return null;

  const completionItems = ['fullName', 'bio', 'city', 'interests', 'age', 'languages', 'profilePicture'];
  const completedCount = completionItems.filter(k => {
    const v = profile[k];
    if (Array.isArray(v)) return v.length > 0;
    return !!v;
  }).length;
  const completionPercent = Math.round((completedCount / completionItems.length) * 100);

  return (
    <div className="min-h-screen mesh-gradient">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Cover */}
        <div className="h-48 rounded-3xl bg-gradient-to-r from-primary-400 via-accent-400 to-pink-400 relative overflow-hidden shadow-lg">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wOCI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-60" />
        </div>

        {/* Profile card */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm -mt-16 relative z-10 overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-6">
              <img src={profile.profilePicture} alt={profile.fullName}
                className="w-28 h-28 rounded-3xl border-4 border-white shadow-xl object-cover -mt-20 bg-white" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-2xl font-extrabold text-slate-900 font-[family-name:var(--font-display)]">{profile.fullName}</h1>
                  {profile.isVerified && <BadgeCheck size={20} className="text-blue-500" />}
                </div>
                <p className="text-slate-500 text-sm font-medium">@{profile.username}</p>
                {profile.city && (
                  <p className="text-slate-500 text-sm flex items-center gap-1 mt-1">
                    <MapPin size={13} /> {profile.city}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <Link to="/settings" className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-600 font-semibold text-sm hover:bg-slate-200 transition flex items-center gap-2">
                  <Settings size={16} /> Settings
                </Link>
                <Link to="/edit-profile" className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold text-sm shadow-md shadow-primary-500/20 hover:shadow-primary-500/30 transition flex items-center gap-2 btn-shine">
                  <Edit3 size={16} /> Edit Profile
                </Link>
              </div>
            </div>

            {/* Bio */}
            {profile.bio && (
              <p className="mt-6 text-slate-600 leading-relaxed">{profile.bio}</p>
            )}

            {/* Profile completion */}
            <div className="mt-6 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="flex justify-between text-sm font-semibold mb-2">
                <span className="text-slate-700">Profile Completion</span>
                <span className={completionPercent === 100 ? 'text-emerald-600' : 'text-primary-600'}>{completionPercent}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all ${completionPercent === 100 ? 'bg-emerald-500' : 'bg-gradient-to-r from-primary-400 to-accent-400'}`}
                  style={{ width: `${completionPercent}%` }} />
              </div>
              {completionPercent < 100 && (
                <p className="text-xs text-slate-500 mt-2">Complete your profile for better recommendations</p>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 border-t border-slate-100">
            {[
              { label: 'Friends', value: profile.friends?.length || 0 },
              { label: 'Interests', value: profile.interests?.length || 0 },
              { label: 'Member since', value: new Date(profile.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) },
            ].map((stat, i) => (
              <div key={i} className={`py-5 text-center ${i < 2 ? 'border-r border-slate-100' : ''}`}>
                <p className="text-xl font-extrabold text-slate-900">{stat.value}</p>
                <p className="text-xs text-slate-500 font-medium mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Details grid */}
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {/* Interests */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Interests</h3>
            {profile.interests?.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {profile.interests.map((interest, i) => (
                  <span key={i} className="px-3 py-1.5 bg-primary-50 text-primary-700 rounded-full text-sm font-semibold">{interest}</span>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 text-sm">No interests added yet</p>
            )}
          </div>

          {/* Details */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Details</h3>
            <div className="space-y-3">
              <DetailRow label="Age" value={profile.age || 'Not set'} />
              <DetailRow label="Languages" value={profile.languages?.join(', ') || 'Not set'} />
              <DetailRow label="Availability" value={profile.availability?.join(', ') || 'Not set'} />
              <DetailRow label="Social Goals" value={profile.socialGoals?.join(', ') || 'Not set'} />
              <DetailRow label="Privacy" value={profile.isPrivate ? 'Private' : 'Public'} icon={<Shield size={14} className="text-slate-400" />} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value, icon }) {
  return (
    <div className="flex justify-between items-center text-sm">
      <span className="text-slate-500 font-medium flex items-center gap-1.5">{icon} {label}</span>
      <span className="text-slate-700 font-semibold">{value}</span>
    </div>
  );
}
