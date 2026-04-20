import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Compass, UserCircle, Heart, MessageSquare, ListPlus, Bell, Settings, LogOut, Home, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { cn } from '../lib/utils';

interface SidebarProps {
  isMobileMenuOpen?: boolean;
  setIsMobileMenuOpen?: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const { logout } = useAuth();
  
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Compass, label: 'Browse', path: '/browse' },
    { icon: UserCircle, label: 'My Profile', path: '/profile' },
    { icon: Heart, label: 'Favorites', path: '/favorites' },
    { icon: MessageSquare, label: 'Messages', path: '/messages' },
    { icon: Home, label: 'My Listings', path: '/my-listings' },
    { icon: ListPlus, label: 'Add Listing', path: '/add-listing' },
    { icon: Bell, label: 'Notifications', path: '/notifications' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  const SidebarContent = (
    <>
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-md bg-black dark:bg-white flex items-center justify-center">
            <Home className="w-5 h-5 text-white dark:text-black" />
          </div>
          <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">Roomie</span>
        </div>
        {setIsMobileMenuOpen && (
          <button 
            className="md:hidden p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
      
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto w-full">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => setIsMobileMenuOpen?.(false)}
            className={({ isActive }) => cn(
              "flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
              isActive 
                ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-white" 
                : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-white"
            )}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 w-full mt-auto">
        <button
          onClick={logout}
          className="flex items-center space-x-3 px-3 py-2 w-full rounded-md text-sm font-medium text-zinc-600 hover:bg-red-50 hover:text-red-600 dark:text-zinc-400 dark:hover:bg-red-900/20 dark:hover:text-red-500 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      <aside className="w-64 border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hidden md:flex flex-col h-full shrink-0">
        {SidebarContent}
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen?.(false)}
          />
          <aside className="relative flex flex-col w-[280px] max-w-full bg-white dark:bg-zinc-950 h-full shadow-2xl animate-in slide-in-from-left duration-300">
            {SidebarContent}
          </aside>
        </div>
      )}
    </>
  );
};
