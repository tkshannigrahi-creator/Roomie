import React, { useState } from 'react';
import { useAppData } from '../contexts/AppDataContext';
import { Search, Heart, User, Users, Home, MapPin, MessageSquare, Trash2, BedDouble } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';
import { Roommate, Listing } from '../types';

export const Favorites: React.FC = () => {
  const { roommates, listings } = useAppData();
  const favoriteRoommates = roommates.filter(r => r.isFavorite);
  // Default to property type listings marked as favorite (some data might be fake)
  const favoriteHouses = listings.filter(l => l.isFavorite && l.type === 'property');

  const [activeTab, setActiveTab] = useState<'roommates' | 'houses'>('roommates');

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto pb-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">My Favorites</h1>
        <p className="text-zinc-500 dark:text-zinc-400 mt-1">Keep track of roommates and places you're interested in</p>
      </div>

      {/* Tabs */}
      <div className="flex bg-zinc-100 dark:bg-zinc-800/50 p-1 rounded-xl w-fit">
        <button
          onClick={() => setActiveTab('roommates')}
          className={cn(
            "flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-colors",
            activeTab === 'roommates'
              ? "bg-zinc-900 text-white dark:bg-white dark:text-black shadow-sm"
              : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          )}
        >
          <Users className="w-4 h-4" />
          Roommates
          <span className={cn(
            "px-2 py-0.5 rounded-full text-xs",
            activeTab === 'roommates' 
              ? "bg-white text-black dark:bg-zinc-900 dark:text-white" 
              : "bg-zinc-200 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300"
          )}>
            {favoriteRoommates.length}
          </span>
        </button>
        <button
          onClick={() => setActiveTab('houses')}
          className={cn(
            "flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-colors",
            activeTab === 'houses'
              ? "bg-zinc-900 text-white dark:bg-white dark:text-black shadow-sm"
              : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          )}
        >
          <Home className="w-4 h-4" />
          Houses
          <span className={cn(
            "px-2 py-0.5 rounded-full text-xs",
            activeTab === 'houses' 
              ? "bg-white text-black dark:bg-zinc-900 dark:text-white" 
              : "bg-zinc-200 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300"
          )}>
            {favoriteHouses.length}
          </span>
        </button>
      </div>

      {/* Content */}
      {activeTab === 'roommates' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {favoriteRoommates.map(roommate => (
            <FavoriteRoommateCard key={roommate.id} roommate={roommate} />
          ))}
          {favoriteRoommates.length === 0 && (
            <EmptyState tab="roommates" />
          )}
        </div>
      )}

      {activeTab === 'houses' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {favoriteHouses.map(house => (
             <FavoriteHouseCard key={house.id} house={house} />
          ))}
          {favoriteHouses.length === 0 && (
             <EmptyState tab="houses" />
          )}
        </div>
      )}

      {/* Summary Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 mt-6">
        <div className="border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 bg-white dark:bg-zinc-900 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-semibold text-zinc-900 dark:text-white text-[15px]">Total Favorites</h3>
            <Heart className="w-5 h-5 text-zinc-400" />
          </div>
          <div className="text-3xl font-bold text-zinc-900 dark:text-white mb-1">
            {favoriteRoommates.length + favoriteHouses.length}
          </div>
          <p className="text-sm text-zinc-500">Across all categories</p>
        </div>

        <div className="border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 bg-white dark:bg-zinc-900 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-semibold text-zinc-900 dark:text-white text-[15px]">Roommate Matches</h3>
            <Users className="w-5 h-5 text-zinc-400" />
          </div>
          <div className="text-3xl font-bold text-zinc-900 dark:text-white mb-1">
            {favoriteRoommates.length}
          </div>
          <p className="text-sm text-zinc-500">Potential roommates</p>
        </div>

        <div className="border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 bg-white dark:bg-zinc-900 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-semibold text-zinc-900 dark:text-white text-[15px]">Housing Options</h3>
            <Home className="w-5 h-5 text-zinc-400" />
          </div>
          <div className="text-3xl font-bold text-zinc-900 dark:text-white mb-1">
            {favoriteHouses.length}
          </div>
          <p className="text-sm text-zinc-500">Saved properties</p>
        </div>
      </div>
    </div>
  );
};

const FavoriteRoommateCard = ({ roommate }: { roommate: Roommate }) => {
  const { toggleFavoriteRoommate } = useAppData();

  return (
    <div className="border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 bg-white dark:bg-zinc-900 shadow-sm flex flex-col relative group">
      {/* Action Buttons */}
      <div className="absolute top-6 right-6 flex gap-2 z-10">
        <Link to="/messages" className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 shadow-sm transition-colors flex items-center justify-center">
          <MessageSquare className="w-4 h-4" />
        </Link>
        <button 
          onClick={() => toggleFavoriteRoommate(roommate.id)}
          className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 hover:bg-red-50 hover:text-red-600 hover:border-red-200 dark:hover:bg-red-900/20 dark:hover:text-red-400 shadow-sm transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-start gap-4 mb-5 pr-24">
      <div className="w-14 h-14 rounded-full bg-zinc-900 dark:bg-zinc-800 flex items-center justify-center shrink-0">
        {roommate.avatar ? (
          <img src={roommate.avatar} alt={roommate.name} className="w-full h-full rounded-full object-cover" />
        ) : (
          <User className="w-6 h-6 text-white dark:text-zinc-400" />
        )}
      </div>
      <div>
        <h3 className="text-lg font-bold text-zinc-900 dark:text-white">{roommate.name}</h3>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm">Age {roommate.age}</p>
      </div>
    </div>

    <div className="flex gap-6 mb-5">
      <div className="flex items-center gap-1.5 text-zinc-900 dark:text-zinc-100 font-semibold w-1/2">
        <span className="text-lg">$</span>
        <span>${roommate.budget}/month</span>
      </div>
      <div className="flex items-start gap-2 text-zinc-500 dark:text-zinc-400 text-sm">
        <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
        <span className="leading-snug">{roommate.location.split(', ')[0]},<br/>{roommate.location.split(', ')[1] || ''}</span>
      </div>
    </div>

    <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed mb-6 line-clamp-3">
      {roommate.bio}
    </p>

    <div className="flex flex-wrap gap-2 mt-auto">
      {roommate.tags.map(tag => (
        <span key={tag} className="px-3 py-1 bg-zinc-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-medium rounded-full border border-zinc-100 dark:border-zinc-700">
          {tag}
        </span>
      ))}
    </div>
  </div>
  );
};

const FavoriteHouseCard = ({ house }: { house: Listing }) => {
  const { toggleFavoriteListing } = useAppData();

  return (
    <div className="border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 bg-white dark:bg-zinc-900 shadow-sm flex flex-col relative group">
      {/* Action Buttons */}
      <div className="absolute top-6 right-6 flex gap-2 z-10">
        <Link to="/messages" className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 shadow-sm transition-colors flex items-center justify-center">
          <MessageSquare className="w-4 h-4" />
        </Link>
        <button 
          onClick={() => toggleFavoriteListing(house.id)}
          className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 hover:bg-red-50 hover:text-red-600 hover:border-red-200 dark:hover:bg-red-900/20 dark:hover:text-red-400 shadow-sm transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="w-full h-40 bg-zinc-50 dark:bg-zinc-950 rounded-xl mb-5 flex items-center justify-center border border-zinc-100 dark:border-zinc-800">
      <BedDouble className="w-10 h-10 text-zinc-800 dark:text-zinc-200" strokeWidth={1.5} />
    </div>

    <div className="flex justify-between items-start mb-2">
      <h3 className="text-lg font-bold text-zinc-900 dark:text-white line-clamp-1 pr-4">{house.title}</h3>
      <div className="flex items-center gap-1 text-zinc-900 dark:text-white font-medium">
        <Heart className="w-4 h-4 fill-transparent stroke-zinc-400 hidden" />
        <span className="flex items-center"><User className="w-3.5 h-3.5 mr-1 hidden"/>⭐ 4.8</span>
      </div>
    </div>

    <div className="flex items-center text-zinc-500 dark:text-zinc-400 text-sm mb-5">
      <MapPin className="w-4 h-4 mr-1.5 shrink-0" />
      <span className="truncate">{house.location}</span>
    </div>

    <div className="flex items-center justify-between mb-5">
      <div className="flex items-center gap-1.5 text-zinc-900 dark:text-white font-bold text-lg">
        <span className="text-xl">$</span>
        <span className="text-xl">{house.price}</span>
        <span className="text-sm font-normal text-zinc-500 dark:text-zinc-400">/month</span>
      </div>
      <div className="flex gap-4 text-sm text-zinc-600 dark:text-zinc-300">
        <span className="flex items-center gap-1"><BedDouble className="w-4 h-4 text-zinc-400"/> {house.title.includes('2-bed') || house.title.includes('3B2B') ? '2' : '1'} bed</span>
        <span className="flex items-center gap-1"><BedDouble className="w-4 h-4 text-zinc-400 hidden"/> {house.title.includes('2-bed') || house.title.includes('3B2B') ? '2' : '1'} bath</span>
      </div>
    </div>

    <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed mb-6 line-clamp-3">
      {house.description}
    </p>

    <div className="flex flex-wrap gap-2 mt-auto">
      {house.amenities?.map(tag => (
        <span key={tag} className="px-3 py-1 bg-zinc-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-medium rounded-full border border-zinc-100 dark:border-zinc-700">
          {tag}
        </span>
      ))}
    </div>
  </div>
  );
};

const EmptyState = ({ tab }: { tab: 'roommates' | 'houses' }) => (
  <div className="col-span-full py-16 text-center border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl flex flex-col items-center">
    <Search className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
    <h3 className="text-lg font-medium text-zinc-900 dark:text-white">No {tab} found</h3>
    <p className="text-zinc-500 mb-6">You haven't saved any {tab} yet.</p>
    <Link to="/">
      <Button className="bg-zinc-900 text-white dark:bg-white dark:text-black">Browse Now</Button>
    </Link>
  </div>
);
