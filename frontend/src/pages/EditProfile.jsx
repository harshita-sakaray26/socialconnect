import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Sparkles } from 'lucide-react';

const INTEREST_OPTIONS = ['Coding', 'Coffee', 'Hiking', 'Photography', 'Music', 'Gaming', 'Art', 'Fitness', 'Travel', 'Reading', 'Cooking', 'Movies', 'Tech', 'Dance', 'Sports', 'Yoga'];
const AVAILABILITY_OPTIONS = ['Weekday Mornings', 'Weekday Evenings', 'Weekends', 'Flexible', 'After Work'];
const SOCIAL_GOALS = ['Make Friends', 'Find Communities', 'Activity Partners', 'Networking', 'Study Buddies'];

export default function EditProfile() {
  const { user: authUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: '', username: '', bio: '', city: '', age: '', interests: [], languages: [], availability: [], socialGoals: [], isPrivate: false });
  const [langInput, setLangInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get('/auth/me');
        setForm({
          fullName: res.data.fullName || '',
          username: res.data.username || '',
          bio: res.data.bio || '',
          city: res.data.city || '',
          age: res.data.age || '',
          interests: res.data.interests || [],
          languages: res.data.languages || [],
          availability: res.data.availability || [],
          socialGoals: res.data.socialGoals || [],
          isPrivate: res.data.isPrivate || false,
        });
      } catch (err) { console.error(err); }
    };
    load();
  }, []);

  const toggleArray = (key, val) => {
    setForm(prev => ({
      ...prev,
      [key]: prev[key].includes(val) ? prev[key].filter(v => v !== val) : [...prev[key], val]
    }));
  };

  const addLanguage = () => {
    if (langInput.trim() && !form.languages.includes(langInput.trim())) {
      setForm({ ...form, languages: [...form.languages, langInput.trim()] });
      setLangInput('');
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put('/users/me', form);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) { alert('Failed to save'); }
    setSaving(false);
  };

  return (
    <div className="min-h-screen mesh-gradient">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate('/profile')} className="p-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 transition shadow-sm">
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 font-[family-name:var(--font-display)]">Edit Profile</h1>
            <p className="text-slate-500 text-sm">Update your information to get better matches</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          {/* Basic Info */}
          <Section title="Basic Information">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Full Name" value={form.fullName} onChange={v => setForm({ ...form, fullName: v })} />
              <Field label="Username" value={form.username} onChange={v => setForm({ ...form, username: v })} />
              <Field label="City" value={form.city} onChange={v => setForm({ ...form, city: v })} />
              <Field label="Age" value={form.age} onChange={v => setForm({ ...form, age: v })} type="number" />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Bio</label>
              <textarea value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} rows={3}
                placeholder="Tell people about yourself..."
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition text-sm resize-none" />
            </div>
          </Section>

          {/* Interests */}
          <Section title="Interests">
            <div className="flex flex-wrap gap-2">
              {INTEREST_OPTIONS.map(interest => (
                <button type="button" key={interest} onClick={() => toggleArray('interests', interest)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    form.interests.includes(interest)
                      ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-md shadow-primary-500/20'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}>
                  {interest}
                </button>
              ))}
            </div>
          </Section>

          {/* Languages */}
          <Section title="Languages">
            <div className="flex gap-2">
              <input value={langInput} onChange={e => setLangInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addLanguage())}
                placeholder="e.g. English, Hindi..." className="flex-1 px-4 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-sm" />
              <button type="button" onClick={addLanguage} className="px-4 py-3 rounded-2xl bg-primary-50 text-primary-700 font-semibold text-sm hover:bg-primary-100 transition">Add</button>
            </div>
            {form.languages.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {form.languages.map(lang => (
                  <span key={lang} className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm font-semibold flex items-center gap-1.5">
                    {lang}
                    <button type="button" onClick={() => setForm({ ...form, languages: form.languages.filter(l => l !== lang) })} className="text-primary-400 hover:text-primary-600">&times;</button>
                  </span>
                ))}
              </div>
            )}
          </Section>

          {/* Availability */}
          <Section title="Availability">
            <div className="flex flex-wrap gap-2">
              {AVAILABILITY_OPTIONS.map(opt => (
                <button type="button" key={opt} onClick={() => toggleArray('availability', opt)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    form.availability.includes(opt) ? 'bg-emerald-500 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}>
                  {opt}
                </button>
              ))}
            </div>
          </Section>

          {/* Social Goals */}
          <Section title="Social Goals">
            <div className="flex flex-wrap gap-2">
              {SOCIAL_GOALS.map(goal => (
                <button type="button" key={goal} onClick={() => toggleArray('socialGoals', goal)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    form.socialGoals.includes(goal) ? 'bg-accent-500 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}>
                  {goal}
                </button>
              ))}
            </div>
          </Section>

          {/* Privacy */}
          <Section title="Privacy">
            <label className="flex items-center gap-3 cursor-pointer">
              <div className="relative">
                <input type="checkbox" className="sr-only" checked={form.isPrivate} onChange={e => setForm({ ...form, isPrivate: e.target.checked })} />
                <div className={`w-11 h-6 rounded-full transition-all ${form.isPrivate ? 'bg-primary-500' : 'bg-slate-300'}`}>
                  <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform mt-0.5 ${form.isPrivate ? 'translate-x-5.5 ml-0.5' : 'translate-x-0.5'}`} />
                </div>
              </div>
              <span className="text-sm font-medium text-slate-700">Make profile private</span>
            </label>
          </Section>

          {/* Save Button */}
          <div className="sticky bottom-4">
            <button type="submit" disabled={saving}
              className={`w-full py-4 rounded-2xl font-bold text-sm shadow-lg transition-all btn-shine flex items-center justify-center gap-2 ${
                saved
                  ? 'bg-emerald-500 text-white shadow-emerald-500/25'
                  : 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-primary-500/25 hover:shadow-primary-500/40'
              }`}>
              {saving ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : saved ? (
                <>✓ Saved Successfully</>
              ) : (
                <><Save size={18} /> Save Changes</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
      <h3 className="text-lg font-bold text-slate-900 mb-4">{title}</h3>
      {children}
    </div>
  );
}

function Field({ label, value, onChange, type = 'text' }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-2">{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)}
        className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition text-sm" />
    </div>
  );
}
