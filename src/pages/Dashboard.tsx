import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Heart, MessageSquare, Activity, TrendingUp, Users, Home as HomeIcon, User as UserIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Roommate } from '../types';
import { useAppData } from '../contexts/AppDataContext';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { roommates } = useAppData();

  const stats = [
    { label: 'Total Favorites', value: '8', subtext: '+2 from last week', icon: Heart },
    { label: 'Messages', value: '5', subtext: '3 unread', icon: MessageSquare },
    { label: 'Profile Views', value: '24', subtext: '+12 from last week', icon: Activity },
    { label: 'Listings Viewed', value: '156', subtext: '+45 from last week', icon: TrendingUp },
  ];

  const activities = [
    { text: 'New message from Maria Garcia', time: '2 hours ago' },
    { text: 'David Kim liked your profile', time: '1 day ago' },
    { text: 'New listing in Capitol Hill', time: '2 days ago' },
    { text: 'Sarah Williams viewed your profile', time: '3 days ago' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto pb-12">
      <div>
        {/* Name explicitly hardcoded to Jitu Shannigrahi as requested */}
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">Welcome back, Jitu Shannigrahi!</h1>
        <p className="text-zinc-500 dark:text-zinc-400 mt-2 text-[15px]">Here's what's happening with your roommate search.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 bg-white dark:bg-zinc-900 shadow-sm relative flex flex-col">
            <div className="flex justify-between items-start mb-2">
              <span className="text-[14px] font-medium text-zinc-900 dark:text-zinc-100">{stat.label}</span>
              <stat.icon className="w-4 h-4 text-zinc-400 stroke-[1.5]" />
            </div>
            <div className="text-3xl font-bold text-zinc-900 dark:text-white mb-1 tracking-tight">
              {stat.value}
            </div>
            <div className="text-sm text-zinc-500 dark:text-zinc-400 mt-auto">
              {stat.subtext}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">Recent Activity</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Your latest interactions and updates</p>
          </div>
          
          <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-900 shadow-sm flex flex-col h-[400px]">
            <div className="flex-1 p-6 space-y-8">
              {activities.map((activity, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="w-2 h-2 rounded-full bg-zinc-900 dark:bg-zinc-100 flex-shrink-0 mt-2" />
                  <div>
                    <p className="text-[15px] font-medium text-zinc-900 dark:text-white">{activity.text}</p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-zinc-100 dark:border-zinc-800">
              <Link to="/notifications" className="block text-center w-full py-2.5 px-4 rounded-lg border border-zinc-200 dark:border-zinc-700 font-medium text-sm text-zinc-900 dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                View All Activity
              </Link>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">Quick Actions</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Common tasks and shortcuts</p>
          </div>

          <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-900 shadow-sm p-6 space-y-3 flex flex-col h-[400px]">
            <Link to="/browse" className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-black rounded-lg font-medium text-sm hover:bg-zinc-900 dark:hover:bg-zinc-200 transition-colors">
              <Users className="w-4 h-4" />
              Browse Roommates
            </Link>
            <Link to="/add-listing" className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700 rounded-lg font-medium text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
              <HomeIcon className="w-4 h-4" />
              Add New Listing
            </Link>
            <Link to="/messages" className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700 rounded-lg font-medium text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
              <MessageSquare className="w-4 h-4" />
              Check Messages
            </Link>
            <Link to="/profile" className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700 rounded-lg font-medium text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
              <UserIcon className="w-4 h-4" />
              Edit Profile
            </Link>
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">Recommended for You</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Based on your preferences and activity</p>
        </div>

        <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-900 shadow-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {roommates.slice(0, 3).map((roommate) => (
              <div key={roommate.id} className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 flex flex-col">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-full bg-zinc-900 dark:bg-zinc-800 flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5 text-white dark:text-zinc-400" />
                  </div>
                  <div className="overflow-hidden">
                    <h3 className="font-semibold text-[15px] text-zinc-900 dark:text-white truncate">{roommate.name}</h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 truncate">{roommate.location}</p>
                  </div>
                </div>
                <div className="text-[15px] text-zinc-600 dark:text-zinc-400 mb-5">
                  ${roommate.budget}/month
                </div>
                <button className="w-full py-2.5 px-4 rounded-lg border border-zinc-200 dark:border-zinc-700 font-medium text-sm text-zinc-900 dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors mt-auto">
                  View Profile
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};
