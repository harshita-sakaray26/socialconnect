import React, { useState, useEffect, useContext, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Search, Send, Phone, Video, MoreVertical, Paperclip, Smile, Image as ImageIcon, Check, CheckCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const DUMMY_CHATS = [
  { id: '1', name: 'Alice Johnson', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', lastMsg: 'See you at the coffee shop!', time: '10:42 AM', unread: 0, online: true },
  { id: '2', name: 'Bob Smith', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150', lastMsg: 'The hike was amazing, thanks for organizing!', time: 'Yesterday', unread: 2, online: false },
  { id: '3', name: 'Charlie Davis', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150', lastMsg: 'Are we still on for gaming tonight?', time: 'Tue', unread: 0, online: true },
  { id: '4', name: 'Diana Prince', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150', lastMsg: 'Check out this new museum exhibit!', time: 'Mon', unread: 0, online: true },
];

const DUMMY_MESSAGES = [
  { id: 1, senderId: '1', text: 'Hey there! Are you coming to the coffee meetup?', time: '10:30 AM', status: 'read' },
  { id: 2, senderId: 'me', text: 'Yes! I will be there in about 20 minutes.', time: '10:32 AM', status: 'read' },
  { id: 3, senderId: '1', text: 'Great! I just grabbed a table near the window.', time: '10:35 AM', status: 'read' },
  { id: 4, senderId: '1', text: 'See you at the coffee shop!', time: '10:42 AM', status: 'read' },
];

export default function ChatPage() {
  const { user } = useContext(AuthContext);
  const [activeChat, setActiveChat] = useState(DUMMY_CHATS[0]);
  const [messages, setMessages] = useState(DUMMY_MESSAGES);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMsg = {
      id: Date.now(),
      senderId: 'me',
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent'
    };

    setMessages([...messages, newMsg]);
    setInput('');
  };

  return (
    <div className="h-[calc(100-64px)] flex overflow-hidden bg-slate-50">
      {/* Sidebar */}
      <div className="w-full md:w-80 lg:w-96 border-r border-slate-200 bg-white flex flex-col shrink-0">
        <div className="p-4 border-b border-slate-100">
          <h1 className="text-xl font-bold text-slate-900 mb-4">Messages</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search conversations..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary-500 transition outline-none"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {DUMMY_CHATS.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setActiveChat(chat)}
              className={`w-full flex items-center gap-3 p-4 hover:bg-slate-50 transition-all border-l-4 ${
                activeChat.id === chat.id ? 'bg-primary-50 border-primary-500' : 'border-transparent'
              }`}
            >
              <div className="relative shrink-0">
                <img src={chat.avatar} alt={chat.name} className="w-12 h-12 rounded-2xl object-cover" />
                {chat.online && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-4 border-white rounded-full"></div>
                )}
              </div>
              <div className="flex-1 text-left min-w-0">
                <div className="flex justify-between items-center mb-0.5">
                  <h3 className="font-bold text-slate-900 text-sm truncate">{chat.name}</h3>
                  <span className="text-[10px] font-medium text-slate-400">{chat.time}</span>
                </div>
                <p className={`text-xs truncate ${chat.unread > 0 ? 'text-slate-900 font-bold' : 'text-slate-500'}`}>
                  {chat.lastMsg}
                </p>
              </div>
              {chat.unread > 0 && (
                <div className="w-5 h-5 bg-primary-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {chat.unread}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-slate-50 relative">
        {/* Header */}
        <div className="h-16 glass border-b border-slate-200/50 px-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img src={activeChat.avatar} alt={activeChat.name} className="w-10 h-10 rounded-xl object-cover" />
              {activeChat.online && (
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>
              )}
            </div>
            <div>
              <h2 className="font-bold text-slate-900 text-sm leading-none mb-1">{activeChat.name}</h2>
              <span className="text-[10px] font-medium text-emerald-500">{activeChat.online ? 'Online' : 'Offline'}</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <ChatAction icon={<Phone size={18} />} />
            <ChatAction icon={<Video size={18} />} />
            <ChatAction icon={<MoreVertical size={18} />} />
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 mesh-gradient">
          <div className="flex justify-center my-6">
            <span className="px-3 py-1 bg-white/80 glass text-[10px] font-bold text-slate-500 rounded-full uppercase tracking-widest">Today</span>
          </div>
          
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.senderId === 'me' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[75%] space-y-1 ${msg.senderId === 'me' ? 'items-end' : 'items-start'} flex flex-col`}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className={`p-3 rounded-2xl text-sm shadow-sm ${
                    msg.senderId === 'me'
                      ? 'bg-gradient-to-br from-primary-500 to-primary-600 text-white rounded-tr-none'
                      : 'bg-white text-slate-800 rounded-tl-none border border-slate-100'
                  }`}
                >
                  {msg.text}
                </motion.div>
                <div className="flex items-center gap-1 px-1">
                  <span className="text-[10px] text-slate-400 font-medium">{msg.time}</span>
                  {msg.senderId === 'me' && (
                    msg.status === 'read' ? <CheckCheck size={12} className="text-primary-500" /> : <Check size={12} className="text-slate-300" />
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-slate-200">
          <form onSubmit={handleSend} className="flex items-center gap-2">
            <div className="flex gap-1 shrink-0">
              <ChatAction icon={<Paperclip size={20} />} />
              <ChatAction icon={<ImageIcon size={20} />} />
              <ChatAction icon={<Smile size={20} />} />
            </div>
            <div className="flex-1 relative">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..." 
                className="w-full px-4 py-3 bg-slate-100 border-none rounded-2xl text-sm focus:ring-2 focus:ring-primary-500 transition outline-none"
              />
            </div>
            <button 
              type="submit"
              disabled={!input.trim()}
              className="w-11 h-11 bg-primary-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-primary-500/20 hover:bg-primary-600 transition-all disabled:opacity-50 disabled:shadow-none"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function ChatAction({ icon }) {
  return (
    <button className="p-2 text-slate-400 hover:text-primary-500 hover:bg-primary-50 rounded-xl transition-all">
      {icon}
    </button>
  );
}
