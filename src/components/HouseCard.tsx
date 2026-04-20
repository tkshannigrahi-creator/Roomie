import React from 'react';
import { Listing } from '../types';
import { Card, CardContent } from './ui/Card';
import { MapPin, Heart } from 'lucide-react';
import { Badge } from './ui/Badge';
import { useAppData } from '../contexts/AppDataContext';

export const HouseCard: React.FC<{ listing: Listing }> = ({ listing }) => {
  const { toggleFavoriteListing } = useAppData();

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow border-zinc-100 dark:border-zinc-800 flex flex-col group">
      <div className="relative h-48 bg-zinc-100 dark:bg-zinc-800 shrink-0 overflow-hidden">
        {listing.image ? (
          <img src={listing.image} alt={listing.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/40 dark:to-purple-900/40">
            <span className="text-zinc-400 font-medium">No Image</span>
          </div>
        )}
        <button 
          onClick={(e) => {
            e.preventDefault();
            toggleFavoriteListing(listing.id);
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 dark:bg-black/50 hover:bg-white dark:hover:bg-black transition-colors backdrop-blur-sm z-10"
        >
          <Heart className={`w-5 h-5 ${listing.isFavorite ? 'fill-rose-500 text-rose-500' : 'text-zinc-600 dark:text-zinc-300'}`} />
        </button>
        <div className="absolute bottom-3 left-3 flex gap-2 z-10">
          <Badge className="bg-white/90 text-black shadow-sm backdrop-blur-md rounded-md hover:bg-white">
            ${listing.price}/mo
          </Badge>
        </div>
      </div>
      <CardContent className="p-5 flex-1 flex flex-col">
        <div className="mb-2">
          <h3 className="font-bold text-lg leading-tight line-clamp-1">{listing.title}</h3>
          <div className="flex items-center text-zinc-500 dark:text-zinc-400 text-sm mt-2">
            <MapPin className="w-4 h-4 mr-1 shrink-0" />
            <span className="truncate">{listing.location}</span>
          </div>
        </div>
        <p className="text-sm text-zinc-600 dark:text-zinc-300 line-clamp-2 mt-2 flex-1">
          {listing.description}
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          {listing.amenities?.slice(0, 3).map(amenity => (
            <Badge key={amenity} variant="secondary" className="bg-[#F5F5F5] hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-[#444] dark:text-zinc-300 font-normal px-2.5 py-0.5 rounded-full text-[12px]">
              {amenity}
            </Badge>
          ))}
          {listing.amenities && listing.amenities.length > 3 && (
            <Badge variant="secondary" className="bg-[#F5F5F5] dark:bg-zinc-800 text-[#444] dark:text-zinc-300 font-normal px-2.5 py-0.5 rounded-full text-[12px]">
              +{listing.amenities.length - 3} more
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
