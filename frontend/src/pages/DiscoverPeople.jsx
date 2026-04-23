import React, { useEffect, useState } from 'react';
import api from '../api';
import { motion } from 'framer-motion';
import { MapPin, Search, Filter, X, BadgeCheck, Users as UsersIcon } from 'lucide-react';

const INTEREST_FILTERS = ['All', 'Coding', 'Coffee', 'Hiking', 'Photography', 'Music', 'Gaming', 'Art', 'Fitness', 'Travel', 'Tech'];

export default function DiscoverPeople() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get('/users');
        setUsers(res.data);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchUsers();
  }, []);

  const filtered = users.filter(u => {
    const matchesSearch = u.fullName?.toLowerCase().includes(search.toLowerCase()) || u.city?.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = activeFilter === 'All' || u.interests?.includes(activeFilter);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen mesh-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 font-[family-name:var(--font-display)] flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
              <UsersIcon className="w-5 h-5 text-white" />
            </div>
            Discover People
          </h1>
          <p className="text-slate-500 mt-1">Find your next friend, study buddy, or adventure partner</p>
        </div>

        {/* Search & Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-lg">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search by name or city..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition text-sm shadow-sm" />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            )}
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {INTEREST_FILTERS.map(filter => (
              <button key={filter} onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${activeFilter === filter
                    ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-md shadow-primary-500/20'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}>
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-slate-500 mb-6 font-medium">{filtered.length} {filtered.length === 1 ? 'person' : 'people'} found</p>

        {/* Skeleton loading */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm">
                <div className="h-28 skeleton" />
                <div className="p-6 pt-12">
                  <div className="h-5 w-32 skeleton mb-2" />
                  <div className="h-4 w-24 skeleton mb-4" />
                  <div className="flex gap-2">
                    <div className="h-6 w-16 skeleton rounded-full" />
                    <div className="h-6 w-20 skeleton rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          /* Empty state */
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-slate-100 flex items-center justify-center text-4xl">🔍</div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No one found</h3>
            <p className="text-slate-500 mb-6">Try adjusting your search or filters</p>
            <button onClick={() => { setSearch(''); setActiveFilter('All'); }}
              className="px-6 py-2.5 rounded-full bg-primary-50 text-primary-700 font-semibold text-sm hover:bg-primary-100 transition">
              Clear Filters
            </button>
          </div>
        ) : (
          /* User Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((user, i) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                key={user._id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm card-hover group">
                {/* Cover gradient */}
                <div className="h-28 bg-gradient-to-r from-primary-400 via-accent-400 to-pink-400 relative">
                  <div className="absolute inset-0 bg-black/5" />
                  <img src={user.profilePicture} alt={user.fullName}
                    className="w-20 h-20 rounded-2xl border-4 border-white absolute -bottom-10 left-6 object-cover bg-white shadow-lg group-hover:scale-105 transition-transform" />
                  {user.isVerified && (
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-bold text-primary-700 flex items-center gap-1 shadow-sm">
                      <BadgeCheck size={12} className="text-blue-500" /> Verified
                    </div>
                  )}
                </div>

                <div className="pt-14 p-6">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    {user.fullName}
                    <span className="text-sm font-normal text-slate-400">{user.age || ''}</span>
                  </h3>
                  <p className="text-sm text-slate-500 flex items-center gap-1 mt-0.5">
                    <MapPin size={13} /> {user.city || 'Unknown'}
                  </p>

                  {user.bio && <p className="text-sm text-slate-600 mt-3 line-clamp-2">{user.bio}</p>}

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {user.interests?.slice(0, 4).map((interest, idx) => (
                      <span key={idx} className="px-2.5 py-1 bg-primary-50 text-primary-700 rounded-full text-xs font-semibold">
                        {interest}
                      </span>
                    ))}
                    {user.interests?.length > 4 && (
                      <span className="px-2.5 py-1 bg-slate-100 text-slate-500 rounded-full text-xs font-semibold">
                        +{user.interests.length - 4}
                      </span>
                    )}
                  </div>

                  <div className="mt-5 flex gap-2">
                    <button className="flex-1 py-2.5 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-bold text-sm rounded-xl shadow-md shadow-primary-500/20 hover:shadow-primary-500/30 transition-all btn-shine">
                      Connect
                    </button>
                    <button className="py-2.5 px-4 bg-slate-100 text-slate-600 font-semibold text-sm rounded-xl hover:bg-slate-200 transition">
                      View
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
