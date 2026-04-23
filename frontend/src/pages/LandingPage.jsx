import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Globe, Shield, Calendar, Sparkles, ArrowRight, Heart, MessageCircle, MapPin, Star, Zap, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const fadeUp = { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 } };
const stagger = { animate: { transition: { staggerChildren: 0.1 } } };

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center gradient-bg">
        {/* Floating orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-300/20 rounded-full blur-3xl float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-400/15 rounded-full blur-3xl float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-200/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Text */}
            <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-primary-100 shadow-sm mb-8">
                <Sparkles className="w-4 h-4 text-primary-500" />
                <span className="text-sm font-semibold text-primary-700">Where friendships begin</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black font-[family-name:var(--font-display)] tracking-tight leading-[1.1] mb-6">
                Connect.<br />
                Belong.<br />
                <span className="gradient-text">Explore.</span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-lg mb-10">
                Discover like-minded people, join local hangouts, and build genuine friendships in a safe, welcoming community.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register" className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold rounded-2xl text-white bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 shadow-xl shadow-primary-500/25 hover:shadow-primary-500/40 transition-all btn-shine">
                  Start Connecting <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/login" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold rounded-2xl text-slate-700 bg-white border border-slate-200 hover:border-primary-200 hover:bg-primary-50 shadow-sm transition-all">
                  I have an account
                </Link>
              </div>

              {/* Social proof */}
              <div className="mt-12 flex items-center gap-4">
                <div className="flex -space-x-3">
                  {['🧑‍💻', '👩‍🎨', '🧑‍🔬', '👩‍💼', '🧑‍🎤'].map((emoji, i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-100 to-accent-100 border-2 border-white flex items-center justify-center text-lg shadow-sm">
                      {emoji}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">2,400+ members</p>
                  <p className="text-xs text-slate-500">joined this month</p>
                </div>
              </div>
            </motion.div>

            {/* Right - Floating cards */}
            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="hidden lg:block relative">
              {/* Main card */}
              <div className="relative z-10 glass rounded-3xl p-6 shadow-2xl shadow-primary-500/10 glow">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-400 to-accent-500 flex items-center justify-center text-2xl shadow-lg">
                    👩‍💻
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Sarah Chen</h3>
                    <p className="text-sm text-slate-500 flex items-center gap-1"><MapPin size={12} /> San Francisco</p>
                  </div>
                  <div className="ml-auto">
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" /> Online
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-5">
                  {['React', 'Design', 'Coffee', 'Hiking'].map(tag => (
                    <span key={tag} className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-xs font-semibold">{tag}</span>
                  ))}
                </div>
                <button className="w-full py-3 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 text-white font-bold text-sm shadow-md shadow-primary-500/20">
                  Connect
                </button>
              </div>

              {/* Floating notification card */}
              <div className="absolute -top-4 -right-4 glass rounded-2xl p-4 shadow-xl float z-20 min-w-[200px]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">New Connection!</p>
                    <p className="text-[11px] text-slate-500">Alex just accepted</p>
                  </div>
                </div>
              </div>

              {/* Floating chat card */}
              <div className="absolute -bottom-6 -left-6 glass rounded-2xl p-4 shadow-xl float-delayed z-20">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">Coffee meetup?</p>
                    <p className="text-[11px] text-slate-500">Saturday 10am ☕</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="py-8 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { num: '12K+', label: 'Active Users' },
              { num: '3.2K', label: 'Hangouts Created' },
              { num: '850+', label: 'Communities' },
              { num: '45+', label: 'Cities' },
            ].map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
                <p className="text-3xl font-extrabold font-[family-name:var(--font-display)] gradient-text">{stat.num}</p>
                <p className="text-sm text-slate-500 font-medium mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 mesh-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary-50 text-primary-700 text-sm font-bold mb-4">Features</span>
            <h2 className="text-4xl md:text-5xl font-extrabold font-[family-name:var(--font-display)] text-slate-900 mb-4">
              Everything you need to<br /><span className="gradient-text">find your tribe</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Built with safety, inclusivity, and genuine connection at its core.</p>
          </motion.div>

          <motion.div variants={stagger} initial="initial" whileInView="animate" viewport={{ once: true }} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard icon={<Users className="w-6 h-6" />} color="from-primary-500 to-primary-600" title="Smart Matching" description="Our algorithm suggests people based on shared interests, location, and social goals." />
            <FeatureCard icon={<Calendar className="w-6 h-6" />} color="from-accent-500 to-pink-500" title="Group Hangouts" description="Create or join local meetups — from coffee chats to coding sessions to weekend treks." />
            <FeatureCard icon={<Shield className="w-6 h-6" />} color="from-emerald-500 to-teal-500" title="Safe & Trusted" description="Robust privacy controls, verified profiles, and community-driven moderation." />
            <FeatureCard icon={<MessageCircle className="w-6 h-6" />} color="from-blue-500 to-cyan-500" title="Real-time Chat" description="Message friends instantly with typing indicators, read receipts, and group chats." />
            <FeatureCard icon={<Heart className="w-6 h-6" />} color="from-rose-500 to-orange-500" title="Communities" description="Join interest-based communities and connect with people who share your passions." />
            <FeatureCard icon={<Zap className="w-6 h-6" />} color="from-amber-500 to-yellow-500" title="Activity Feed" description="Stay updated with hangout invites, new connections, and community highlights." />
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent-500/10 text-accent-600 text-sm font-bold mb-4">How it works</span>
            <h2 className="text-4xl md:text-5xl font-extrabold font-[family-name:var(--font-display)] text-slate-900">
              Three steps to your <span className="gradient-text">new crew</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-primary-200 via-accent-200 to-pink-200" />

            {[
              { step: '01', title: 'Create your Profile', desc: 'Sign up and tell us about your interests, city, availability, and social goals.', emoji: '✨' },
              { step: '02', title: 'Discover & Connect', desc: 'Browse recommended profiles, send connection requests, and find your people.', emoji: '🤝' },
              { step: '03', title: 'Hang Out Together', desc: 'Join or create meetups in your area. Coffee chats, hikes, study groups — you name it.', emoji: '🎉' },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="text-center relative">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-3xl shadow-xl shadow-primary-500/20 relative z-10">
                  {item.emoji}
                </div>
                <span className="text-xs font-extrabold text-primary-400 tracking-widest uppercase mb-2 block">Step {item.step}</span>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed max-w-xs mx-auto">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 gradient-bg relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 right-20 w-64 h-64 bg-primary-300/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-20 w-80 h-80 bg-accent-300/10 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/80 text-primary-700 text-sm font-bold mb-4">Testimonials</span>
            <h2 className="text-4xl md:text-5xl font-extrabold font-[family-name:var(--font-display)] text-slate-900">
              Loved by <span className="gradient-text">thousands</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Priya Sharma', role: 'Software Engineer', text: 'I moved to a new city and had zero friends. SocialConnect helped me find my tribe within weeks! The hangout feature is amazing.', emoji: '👩‍💻' },
              { name: 'Alex Rivera', role: 'Photographer', text: 'Finally a platform focused on real friendships. I have joined 5 photography meetups and made genuine connections.', emoji: '📸' },
              { name: 'Jordan Lee', role: 'Student', text: 'The study group hangouts saved my semester. Met awesome people and we still hang out regularly. Highly recommend!', emoji: '🎓' },
            ].map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass rounded-3xl p-8 card-hover">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />)}
                </div>
                <p className="text-slate-700 leading-relaxed mb-6 text-sm">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary-200 to-accent-200 flex items-center justify-center text-xl">{t.emoji}</div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="rounded-[2rem] bg-gradient-to-br from-primary-600 via-accent-600 to-pink-600 p-12 md:p-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
            <h2 className="text-3xl md:text-5xl font-extrabold font-[family-name:var(--font-display)] text-white mb-4 relative">
              Ready to find your people?
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto relative">
              Join thousands of people building genuine connections every day.
            </p>
            <Link to="/register" className="relative inline-flex items-center gap-2 px-8 py-4 text-base font-bold rounded-2xl text-primary-700 bg-white hover:bg-primary-50 shadow-xl transition-all btn-shine">
              Join SocialConnect — It's Free <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-bold text-white font-[family-name:var(--font-display)]">SocialConnect</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">Connect. Belong. Explore.<br />Building genuine friendships.</p>
            </div>
            <FooterCol title="Product" links={['Features', 'Safety', 'Communities', 'Hangouts']} />
            <FooterCol title="Company" links={['About', 'Blog', 'Careers', 'Press']} />
            <FooterCol title="Legal" links={['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Guidelines']} />
          </div>
          <div className="border-t border-slate-800 mt-12 pt-8 text-center">
            <p className="text-slate-500 text-sm">&copy; 2026 SocialConnect. All rights reserved. Made with ❤️ for genuine connections.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, color, title, description }) {
  return (
    <motion.div variants={fadeUp} className="group bg-white rounded-3xl p-8 border border-slate-100 card-hover shadow-sm">
      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-white shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}>
        {icon}
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}

function FooterCol({ title, links }) {
  return (
    <div>
      <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">{title}</h4>
      <ul className="space-y-3">
        {links.map(link => (
          <li key={link}><a href="#" className="text-sm text-slate-400 hover:text-white transition">{link}</a></li>
        ))}
      </ul>
    </div>
  );
}
