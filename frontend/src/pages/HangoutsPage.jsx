import React, { useEffect, useState, useContext } from 'react';
import api from '../api';
import { AuthContext } from '../context/AuthContext';
import { Calendar, MapPin, Users, Plus, X, Clock, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES = ['All', 'Networking', 'Fitness', 'Coding', 'Coffee', 'Gaming', 'Study', 'Adventure', 'Music', 'Food'];
const CATEGORY_EMOJIS = { Networking: '💼', Fitness: '🏃', Coding: '💻', Coffee: '☕', Gaming: '🎮', Study: '📚', Adventure: '🏔️', Music: '🎵', Food: '🍕' };

export default function HangoutsPage() {
  const [hangouts, setHangouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [showCreate, setShowCreate] = useState(false);
  const [newHangout, setNewHangout] = useState({ title: '', description: '', category: 'Coffee', location: '', dateTime: '', seatLimit: 10 });
  const { user } = useContext(AuthContext);

  useEffect(() => { fetchHangouts(); }, []);

  const fetchHangouts = async () => {
    try {
      const res = await api.get('/hangouts');
      setHangouts(res.data);
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  const handleJoin = async (id) => {
    try {
      await api.post(`/hangouts/${id}/join`);
      fetchHangouts();
    } catch (err) { alert(err.response?.data?.msg || 'Failed to join'); }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post('/hangouts', newHangout);
      setShowCreate(false);
      setNewHangout({ title: '', description: '', category: 'Coffee', location: '', dateTime: '', seatLimit: 10 });
      fetchHangouts();
    } catch (err) { alert('Failed to create hangout'); }
  };

  const filtered = hangouts.filter(h => filter === 'All' || h.category === filter);

  return (
    <div className="min-h-screen mesh-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 font-[family-name:var(--font-display)] flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-500 to-pink-500 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              Hangouts
            </h1>
            <p className="text-slate-500 mt-1">Discover local meetups or create your own</p>
          </div>
          <button onClick={() => setShowCreate(true)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-primary-500 to-accent-500 text-white font-bold text-sm shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-all btn-shine">
            <Plus size={18} /> Create Hangout
          </button>
        </div>

        {/* Category Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide">
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${filter === cat
                  ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}>
              {cat !== 'All' && <span>{CATEGORY_EMOJIS[cat]}</span>} {cat}
            </button>
          ))}
        </div>

        {/* Hangout grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-3xl p-6 border border-slate-100">
                <div className="h-4 w-20 skeleton mb-3" />
                <div className="h-6 w-48 skeleton mb-4" />
                <div className="h-4 w-full skeleton mb-2" />
                <div className="h-4 w-3/4 skeleton mb-6" />
                <div className="h-10 skeleton rounded-xl" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-slate-100 flex items-center justify-center text-4xl">📅</div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No hangouts yet</h3>
            <p className="text-slate-500 mb-6">Be the first to create one!</p>
            <button onClick={() => setShowCreate(true)} className="px-6 py-2.5 rounded-full bg-primary-50 text-primary-700 font-semibold text-sm hover:bg-primary-100 transition">
              Create Hangout
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((hangout, i) => {
              const isJoined = hangout.participants?.some(p => p._id === user?.id || p._id === user?._id);
              const isFull = hangout.participants?.length >= hangout.seatLimit;
              const spotsLeft = hangout.seatLimit - (hangout.participants?.length || 0);
              const percentage = Math.round(((hangout.participants?.length || 0) / hangout.seatLimit) * 100);

              return (
                <motion.div key={hangout._id}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  className="bg-white rounded-3xl border border-slate-100 shadow-sm card-hover overflow-hidden">
                  {/* Category banner */}
                  <div className="px-6 pt-6 pb-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-50 text-accent-700 text-xs font-bold">
                        <span>{CATEGORY_EMOJIS[hangout.category] || '📌'}</span> {hangout.category}
                      </span>
                      {spotsLeft <= 3 && spotsLeft > 0 && (
                        <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full">
                          {spotsLeft} spots left!
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-2">{hangout.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-4">{hangout.description}</p>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2.5 text-slate-500">
                        <Calendar size={15} className="text-primary-400" />
                        <span className="font-medium">{new Date(hangout.dateTime).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                        <Clock size={15} className="text-primary-400 ml-2" />
                        <span className="font-medium">{new Date(hangout.dateTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-slate-500">
                        <MapPin size={15} className="text-accent-400" />
                        <span className="font-medium">{hangout.location}</span>
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="mt-5">
                      <div className="flex justify-between text-xs font-semibold text-slate-500 mb-1.5">
                        <span className="flex items-center gap-1"><Users size={12} /> {hangout.participants?.length || 0} / {hangout.seatLimit} joined</span>
                        <span>{percentage}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full transition-all ${percentage >= 80 ? 'bg-gradient-to-r from-orange-400 to-red-400' : 'bg-gradient-to-r from-primary-400 to-accent-400'}`}
                          style={{ width: `${percentage}%` }} />
                      </div>
                    </div>

                    {/* Participant avatars */}
                    {hangout.participants?.length > 0 && (
                      <div className="mt-4 flex items-center gap-2">
                        <div className="flex -space-x-2">
                          {hangout.participants.slice(0, 4).map((p, j) => (
                            <div key={j} className="w-7 h-7 rounded-full bg-gradient-to-br from-primary-200 to-accent-200 border-2 border-white flex items-center justify-center text-[10px] font-bold text-primary-700">
                              {p.fullName?.[0] || '?'}
                            </div>
                          ))}
                        </div>
                        <span className="text-xs text-slate-500 font-medium">
                          {hangout.participants.slice(0, 2).map(p => p.fullName?.split(' ')[0]).join(', ')}
                          {hangout.participants.length > 2 && ` +${hangout.participants.length - 2}`}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Action */}
                  <div className="px-6 pb-6 pt-2">
                    {isJoined ? (
                      <button disabled className="w-full py-3 bg-emerald-50 text-emerald-700 font-bold text-sm rounded-xl border border-emerald-200 flex items-center justify-center gap-2">
                        ✓ Joined
                      </button>
                    ) : isFull ? (
                      <button disabled className="w-full py-3 bg-slate-100 text-slate-400 font-bold text-sm rounded-xl cursor-not-allowed">
                        Full
                      </button>
                    ) : (
                      <button onClick={() => handleJoin(hangout._id)}
                        className="w-full py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-bold text-sm rounded-xl shadow-md shadow-primary-500/20 hover:shadow-primary-500/30 transition-all btn-shine">
                        Join Hangout
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Create Hangout Modal */}
      <AnimatePresence>
        {showCreate && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowCreate(false)}>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-extrabold text-slate-900 font-[family-name:var(--font-display)]">Create Hangout</h2>
                <button onClick={() => setShowCreate(false)} className="p-2 rounded-xl hover:bg-slate-100 transition">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleCreate} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Title</label>
                  <input required value={newHangout.title} onChange={e => setNewHangout({ ...newHangout, title: e.target.value })}
                    placeholder="e.g., Weekend Coffee Chat"
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
                  <textarea required value={newHangout.description} onChange={e => setNewHangout({ ...newHangout, description: e.target.value })}
                    rows={3} placeholder="What will you do?"
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition text-sm resize-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Category</label>
                    <select value={newHangout.category} onChange={e => setNewHangout({ ...newHangout, category: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition text-sm bg-white">
                      {CATEGORIES.filter(c => c !== 'All').map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Seat Limit</label>
                    <input type="number" min="2" max="100" value={newHangout.seatLimit} onChange={e => setNewHangout({ ...newHangout, seatLimit: parseInt(e.target.value) })}
                      className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition text-sm" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Location</label>
                  <input required value={newHangout.location} onChange={e => setNewHangout({ ...newHangout, location: e.target.value })}
                    placeholder="e.g., Central Park Cafe"
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Date & Time</label>
                  <input type="datetime-local" required value={newHangout.dateTime} onChange={e => setNewHangout({ ...newHangout, dateTime: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition text-sm" />
                </div>
                <button type="submit"
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-primary-500 to-accent-500 text-white font-bold text-sm shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-all btn-shine">
                  Create Hangout
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
