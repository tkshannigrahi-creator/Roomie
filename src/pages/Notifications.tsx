import React, { useState } from 'react';
import { useAppData } from '../contexts/AppDataContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { MessageSquare, Heart, Home, Trash2, Check, Bell } from 'lucide-react';
import { cn } from '../lib/utils';

export const Notifications: React.FC = () => {
  const { notifications } = useAppData();
  const [tab, setTab] = useState<'all' | 'unread'>('all');

  const filtered = notifications.filter(n => tab === 'all' || !n.isRead);

  const getIcon = (type: string) => {
    switch (type) {
      case 'message': return <MessageSquare className="w-5 h-5 text-blue-500" />;
      case 'like': return <Heart className="w-5 h-5 text-rose-500" />;
      case 'new_listing': return <Home className="w-5 h-5 text-purple-500" />;
      default: return <Bell className="w-5 h-5 text-zinc-500" />;
    }
  };

  const getBg = (type: string) => {
    switch (type) {
      case 'message': return "bg-blue-50 dark:bg-blue-500/10";
      case 'like': return "bg-rose-50 dark:bg-rose-500/10";
      case 'new_listing': return "bg-purple-50 dark:bg-purple-500/10";
      default: return "bg-zinc-50 dark:bg-zinc-800";
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1">Stay updated with your account activity.</p>
        </div>
        <div className="flex bg-zinc-100 dark:bg-zinc-800 p-1 rounded-lg shrink-0">
          <button 
            className={cn("px-4 py-1.5 text-sm font-medium rounded-md transition-all", tab === 'all' ? "bg-white dark:bg-zinc-600 shadow-sm" : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white")}
            onClick={() => setTab('all')}
          >
            All
          </button>
          <button 
            className={cn("px-4 py-1.5 text-sm font-medium rounded-md transition-all", tab === 'unread' ? "bg-white dark:bg-zinc-600 shadow-sm" : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white")}
            onClick={() => setTab('unread')}
          >
            Unread
          </button>
        </div>
      </div>

      <Card>
        <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
          {filtered.length === 0 ? (
             <div className="py-12 text-center text-zinc-500">
               <Bell className="w-8 h-8 text-zinc-300 mx-auto mb-3" />
               <p>No notifications to show.</p>
             </div>
          ) : (
            filtered.map((notif) => (
              <div key={notif.id} className={cn("p-4 sm:p-6 flex flex-col sm:flex-row gap-4 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors cursor-pointer", !notif.isRead && "bg-zinc-50 dark:bg-zinc-950/20")}>
                <div className={cn("w-12 h-12 rounded-full flex items-center justify-center shrink-0", getBg(notif.type))}>
                  {getIcon(notif.type)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className={cn("text-base", !notif.isRead ? "font-bold text-zinc-900 dark:text-zinc-100" : "font-medium text-zinc-700 dark:text-zinc-300")}>{notif.title}</h3>
                    <span className="text-xs text-zinc-500 shrink-0 ml-4">{new Date(notif.timestamp).toLocaleDateString()}</span>
                  </div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">{notif.message}</p>
                  
                  <div className="flex gap-2 mt-4 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                    {!notif.isRead && (
                      <Button variant="ghost" size="sm" className="h-8 text-xs text-zinc-500">
                        <Check className="w-3.5 h-3.5 mr-1" /> Mark as read
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" className="h-8 text-xs text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
                      <Trash2 className="w-3.5 h-3.5 mr-1" /> Delete
                    </Button>
                  </div>
                </div>
                {!notif.isRead && (
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500 mt-2 shrink-0 self-start sm:self-center" />
                )}
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
};
