import React, { useState } from 'react';
import { useAppData } from '../contexts/AppDataContext';
import { useAuth } from '../contexts/AuthContext';
import { Search, Send, MessageSquare, Users } from 'lucide-react';
import { cn } from '../lib/utils';
import { mockRoommates } from '../data/mockData';

export const Messages: React.FC = () => {
  const { user } = useAuth();
  const [activeId, setActiveId] = useState<string>(mockRoommates[0].id);
  const [message, setMessage] = useState('');

  // Fake messages layout
  const fakeChat = [
    { sender: 'other', text: 'Hi! I saw your profile and think we might be a good match as roommates. Would you like to chat?', time: '20:00' },
    { sender: 'me', text: 'Hi Maria! Yes, I\'d love to chat. What area are you looking at?', time: '20:45' },
  ];

  const activeContact = mockRoommates.find(r => r.id === activeId) || mockRoommates[0];

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-7xl mx-auto pb-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">Messages</h1>
        <p className="text-zinc-500 dark:text-zinc-400 mt-2 text-[15px]">Connect with potential roommates and landlords</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[600px]">
        
        {/* Left Column - List */}
        <div className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-xl overflow-hidden flex flex-col shadow-sm">
          <div className="p-5 border-b border-zinc-100 dark:border-zinc-800">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="w-5 h-5 text-zinc-900 dark:text-white" />
              <h2 className="font-bold text-xl text-zinc-900 dark:text-white">Conversations</h2>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-zinc-400" />
              </div>
              <input 
                type="text" 
                placeholder="Search conversations..." 
                className="w-full pl-9 pr-4 py-2 border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 rounded-lg text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-white"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {mockRoommates.slice(0, 4).map((contact, i) => (
              <button
                key={contact.id}
                onClick={() => setActiveId(contact.id)}
                className={cn(
                  "w-full p-4 flex gap-3 text-left transition-colors",
                  activeId === contact.id ? "bg-zinc-900 dark:bg-zinc-800" : "hover:bg-zinc-50 dark:hover:bg-zinc-800/50 border-b border-zinc-100 dark:border-zinc-800/50"
                )}
              >
                <div className="w-12 h-12 rounded-full flex-shrink-0 bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center overflow-hidden">
                  {contact.avatar ? (
                    <img src={contact.avatar} alt={contact.name} className="w-full h-full object-cover" />
                  ) : (
                    <Users className="w-6 h-6 text-zinc-400" />
                  )}
                </div>
                <div className="flex-1 overflow-hidden pt-1">
                  <div className="flex justify-between items-center mb-0.5">
                    <span className={cn("font-bold text-[15px] truncate", activeId === contact.id ? "text-white" : "text-zinc-900 dark:text-white")}>{contact.name}</span>
                  </div>
                  <p className={cn("text-sm truncate mb-1", activeId === contact.id ? "text-zinc-300" : "text-zinc-500 dark:text-zinc-400")}>
                    {i === 0 ? "Hi Maria! Yes, I'd love to chat. What area are you looking at?" : `Will do! Thanks!`}
                  </p>
                  <p className={cn("text-xs", activeId === contact.id ? "text-zinc-400" : "text-zinc-400 dark:text-zinc-500")}>
                    {i === 0 ? "20:45" : "Yesterday"}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Column - Chat */}
        <div className="md:col-span-2 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-xl overflow-hidden flex flex-col shadow-sm">
          <div className="p-5 border-b border-zinc-100 dark:border-zinc-800 flex items-center gap-4 bg-white dark:bg-zinc-900 shrink-0">
            <div className="w-12 h-12 rounded-full flex-shrink-0 bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center overflow-hidden">
              {activeContact.avatar ? (
                <img src={activeContact.avatar} alt={activeContact.name} className="w-full h-full object-cover" />
              ) : (
                <Users className="w-6 h-6 text-zinc-500" />
              )}
            </div>
            <div>
              <h3 className="font-bold text-xl text-zinc-900 dark:text-white">{activeContact.name}</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">Active now</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-transparent">
             {fakeChat.map((msg, idx) => (
                <div key={idx} className={cn("flex w-full", msg.sender === 'me' ? "justify-end" : "justify-start")}>
                  <div className={cn(
                    "p-4 rounded-xl text-[15px] leading-relaxed max-w-[80%]", 
                    msg.sender === 'me' 
                      ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-black rounded-tr-sm" 
                      : "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100 rounded-tl-sm"
                  )}>
                    <p>{msg.text}</p>
                    <div className={cn("text-[11px] mt-2", msg.sender === 'me' ? "text-zinc-400 dark:text-zinc-500" : "text-zinc-400")}>
                      {msg.time}
                    </div>
                  </div>
                </div>
             ))}
          </div>

          <div className="p-5 border-t border-zinc-100 dark:border-zinc-800 shrink-0">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <input 
                  type="text"
                  placeholder="Type your message..." 
                  className="w-full px-4 py-3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-white h-11"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                />
              </div>
              <button 
                className={cn(
                  "h-11 w-11 rounded-lg flex flex-shrink-0 items-center justify-center transition-colors",
                  message.trim().length > 0 
                    ? "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200" 
                    : "bg-zinc-500 hover:bg-zinc-600 dark:bg-zinc-700 dark:hover:bg-zinc-600 text-white dark:text-zinc-400"
                )}
              >
                <Send className={cn("w-5 h-5", message.trim().length > 0 ? "text-current" : "text-white dark:text-zinc-400")} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
