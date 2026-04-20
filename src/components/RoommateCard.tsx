import React from 'react';
import { Roommate } from '../types';
import { Card, CardContent } from './ui/Card';
import { Badge } from './ui/Badge';
import { MapPin, DollarSign, Heart, User } from 'lucide-react';
import { useAppData } from '../contexts/AppDataContext';

export const RoommateCard: React.FC<{ roommate: Roommate }> = ({ roommate }) => {
  const { toggleFavoriteRoommate } = useAppData();

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow border-zinc-100 dark:border-zinc-800">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-zinc-900 dark:bg-zinc-50 flex items-center justify-center shrink-0">
              <User className="w-6 h-6 text-white dark:text-zinc-900" />
            </div>
            <div>
              <h3 className="font-semibold text-lg leading-tight">{roommate.name}</h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-0.5">Age {roommate.age}</p>
            </div>
          </div>
          <button 
            onClick={() => toggleFavoriteRoommate(roommate.id)}
            className="w-10 h-10 rounded-xl border border-zinc-200 dark:border-zinc-700 flex items-center justify-center hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors shrink-0"
          >
            <Heart className={`w-5 h-5 ${roommate.isFavorite ? 'fill-rose-500 text-rose-500' : 'text-zinc-600 dark:text-zinc-400'}`} />
          </button>
        </div>
        
        <div className="flex items-start gap-4 sm:gap-6 mb-6 pt-2">
          <div className="flex flex-row items-center gap-1.5 font-medium shrink-0">
            <DollarSign className="w-4 h-4 text-black dark:text-white" />
            <span className="text-[15px]">${roommate.budget}/month</span>
          </div>
          <div className="flex flex-row items-start gap-1.5 text-zinc-500 dark:text-zinc-400 max-w-[55%]">
            <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
            <span className="text-sm leading-snug">{roommate.location}</span>
          </div>
        </div>
        
        <div className="min-h-[72px]">
          <p className="text-[14px] text-[#888] dark:text-zinc-400 mb-6 leading-relaxed line-clamp-3">
            {roommate.bio}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {roommate.tags.map(tag => (
            <Badge key={tag} variant="secondary" className="bg-[#F5F5F5] hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-[#444] dark:text-zinc-300 font-normal px-3 py-1 rounded-full text-[12px] transition-colors">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
