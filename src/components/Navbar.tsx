import React from 'react';
import { Menu, Bell } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { useAuth } from '../contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from './ui/Avatar';
import { Link } from 'react-router-dom';
import { useAppData } from '../contexts/AppDataContext';

interface NavbarProps {
  toggleMobileMenu?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ toggleMobileMenu }) => {
  const { user } = useAuth();
  const { notifications } = useAppData();
  
  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <header className="h-16 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-10 w-full">
      <div className="flex items-center">
        <button 
          className="md:hidden p-2 -ml-2 mr-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
          onClick={toggleMobileMenu}
        >
          <Menu className="w-5 h-5" />
        </button>
        <span className="md:hidden text-lg font-bold tracking-tight">Roomie</span>
      </div>

      <div className="flex items-center space-x-4">
        <ThemeToggle />
        
        <Link to="/notifications" className="relative p-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
          <Bell className="w-5 h-5 text-zinc-600 dark:text-zinc-300" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
          )}
        </Link>
        
        {user && (
          <Link to="/profile" className="flex items-center space-x-3 group">
            <Avatar className="h-8 w-8 border border-zinc-200 dark:border-zinc-800">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="hidden sm:block">
              <p className="text-sm font-medium leading-none text-zinc-900 dark:text-white group-hover:text-zinc-600 dark:group-hover:text-zinc-300">{user.name}</p>
            </div>
          </Link>
        )}
      </div>
    </header>
  );
};
