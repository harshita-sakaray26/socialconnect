import React, { useState, useEffect, useContext, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Search, Send, Phone, Video, MoreVertical, Paperclip, Smile, Image as ImageIcon, Check, CheckCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { io } from 'socket.io-client';
import api from '../api';

const socket = io('http://localhost:5000');

export default function ChatPage() {
  const { user } = useContext(AuthContext);
  const [conversations, setConversations] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const fetchConversations = async () => {
    try {
      const res = await api.get('/messages/conversations');
      setConversations(res.data);
      if (res.data.length > 0 && !activeChat) {
        setActiveChat(res.data[0]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  useEffect(() => {
    if (activeChat) {
      // Fetch messages
      const fetchMessages = async () => {
        try {
          const res = await api.get(`/messages/${activeChat._id}`);
          setMessages(res.data);
          scrollToBottom();
        } catch (err) {
          console.error(err);
        }
      };
      fetchMessages();

      socket.emit('join_room', activeChat._id);
    }
  }, [activeChat]);

  useEffect(() => {
    const handleReceiveMessage = (data) => {
      if (activeChat && data.conversationId === activeChat._id) {
        setMessages((prev) => [...prev, data.message]);
        scrollToBottom();
      } else {
        fetchConversations(); // to update order
      }
    };
    
    socket.on('receive_message', handleReceiveMessage);
    return () => socket.off('receive_message', handleReceiveMessage);
  }, [activeChat]);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || !activeChat) return;

    try {
      const res = await api.post('/messages', {
        conversationId: activeChat._id,
        text: input
      });
      
      const newMsg = res.data;
      
      socket.emit('send_message', {
        roomId: activeChat._id,
        conversationId: activeChat._id,
        message: newMsg
      });

      setMessages((prev) => [...prev, newMsg]);
      setInput('');
      fetchConversations(); // update order
      scrollToBottom();
    } catch (err) {
      console.error(err);
    }
  };

  const getOtherUser = (chat) => {
    return chat.members.find(m => m._id !== user?.id && m._id !== user?._id) || chat.members[0];
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
          {conversations.map((chat) => {
            const otherUser = getOtherUser(chat);
            return (
              <button
                key={chat._id}
                onClick={() => setActiveChat(chat)}
                className={`w-full flex items-center gap-3 p-4 hover:bg-slate-50 transition-all border-l-4 ${
                  activeChat?._id === chat._id ? 'bg-primary-50 border-primary-500' : 'border-transparent'
                }`}
              >
                <div className="relative shrink-0">
                  <img src={otherUser?.profilePicture || 'https://via.placeholder.com/150'} alt={otherUser?.fullName} className="w-12 h-12 rounded-2xl object-cover" />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-4 border-white rounded-full"></div>
                </div>
                <div className="flex-1 text-left min-w-0">
                  <div className="flex justify-between items-center mb-0.5">
                    <h3 className="font-bold text-slate-900 text-sm truncate">{otherUser?.fullName || 'Unknown User'}</h3>
                  </div>
                  <p className="text-xs truncate text-slate-500">
                    Click to view messages
                  </p>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Chat Area */}
      {activeChat ? (
        <div className="flex-1 flex flex-col bg-slate-50 relative">
          {/* Header */}
          <div className="h-16 glass border-b border-slate-200/50 px-4 flex items-center justify-between z-10">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img src={getOtherUser(activeChat)?.profilePicture || 'https://via.placeholder.com/150'} alt="" className="w-10 h-10 rounded-xl object-cover" />
              </div>
              <div>
                <h2 className="font-bold text-slate-900 text-sm leading-none mb-1">{getOtherUser(activeChat)?.fullName}</h2>
                <span className="text-[10px] font-medium text-emerald-500">Online</span>
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
            {messages.map((msg) => {
              const isMe = msg.sender._id === user?.id || msg.sender._id === user?._id;
              return (
                <div key={msg._id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[75%] space-y-1 ${isMe ? 'items-end' : 'items-start'} flex flex-col`}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      className={`p-3 rounded-2xl text-sm shadow-sm ${
                        isMe
                          ? 'bg-gradient-to-br from-primary-500 to-primary-600 text-white rounded-tr-none'
                          : 'bg-white text-slate-800 rounded-tl-none border border-slate-100'
                      }`}
                    >
                      {msg.text}
                    </motion.div>
                    <div className="flex items-center gap-1 px-1">
                      <span className="text-[10px] text-slate-400 font-medium">
                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      {isMe && (
                        <CheckCheck size={12} className="text-primary-500" />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
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
      ) : (
        <div className="flex-1 flex items-center justify-center bg-slate-50">
          <p className="text-slate-400">Select a conversation to start chatting</p>
        </div>
      )}
    </div>
  );
}

function ChatAction({ icon }) {
  return (
    <button type="button" className="p-2 text-slate-400 hover:text-primary-500 hover:bg-primary-50 rounded-xl transition-all">
      {icon}
    </button>
  );
}
