import React, { useState } from 'react';
import { useAppData } from '../contexts/AppDataContext';
import { RoommateCard } from '../components/RoommateCard';
import { HouseCard } from '../components/HouseCard';
import { AdvancedFilters } from '../components/AdvancedFilters';
import { Search, SlidersHorizontal, MapPin } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { cn } from '../lib/utils';

export const Home: React.FC = () => {
  const { roommates, listings, isLoading } = useAppData();
  const [searchTerm, setSearchTerm] = useState('');
  const [viewType, setViewType] = useState<'roommates' | 'houses'>('roommates');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const filteredRoommates = roommates.filter(r => 
    r.location.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredHouses = listings.filter(l => 
    l.type === 'property' &&
    (l.location.toLowerCase().includes(searchTerm.toLowerCase()) || 
     l.title.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleApplyFilters = (filters: any) => {
    console.log("Applied Filters:", filters);
    // TODO: Wire up actual filtering logic via API or extended filter function
  };

  return (
    <>
      <div className="space-y-6 animate-in fade-in duration-500 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {viewType === 'roommates' ? 'Find Roommates' : 'Find Houses'}
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 mt-1">
              {viewType === 'roommates' 
                ? 'Discover compatible people looking to team up.' 
                : 'Browse available rooms and houses for rent.'}
            </p>
          </div>
          <div className="flex bg-zinc-100 dark:bg-zinc-800 p-1 rounded-lg shrink-0 w-full sm:w-auto overflow-x-auto">
            <button 
              className={cn("px-6 py-2 text-sm font-medium rounded-md transition-all whitespace-nowrap", viewType === 'roommates' ? "bg-white dark:bg-zinc-600 shadow-sm text-zinc-900 dark:text-white" : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white")}
              onClick={() => setViewType('roommates')}
            >
              Roommates
            </button>
            <button 
              className={cn("px-6 py-2 text-sm font-medium rounded-md transition-all whitespace-nowrap", viewType === 'houses' ? "bg-white dark:bg-zinc-600 shadow-sm text-zinc-900 dark:text-white" : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white")}
              onClick={() => setViewType('houses')}
            >
              Houses
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-950 p-4 border border-zinc-200 dark:border-zinc-800 rounded-2xl flex flex-col sm:flex-row gap-3 shadow-sm">
          <Input 
            icon={<MapPin className="w-5 h-5 text-zinc-400" />}
            placeholder={viewType === 'roommates' ? "Where do you want to live?" : "Search neighborhoods or cities"} 
            className="border-none shadow-none focus-visible:ring-0 bg-zinc-50 dark:bg-zinc-950 h-12 text-base"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="h-12 px-5 gap-2 shrink-0 border-zinc-200 dark:border-zinc-800"
              onClick={() => setIsFiltersOpen(true)}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </Button>
            <Button className="h-12 px-8 shrink-0 bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black">
              Search
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoading ? (
            [...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse bg-white dark:bg-zinc-950 rounded-xl h-[340px] border border-zinc-200 dark:border-zinc-800"></div>
            ))
          ) : viewType === 'roommates' ? (
            filteredRoommates.length > 0 ? (
              filteredRoommates.map(roommate => (
                <RoommateCard key={roommate.id} roommate={roommate} />
              ))
            ) : (
              <div className="col-span-full py-12 text-center">
                <Search className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium">No roommates found</h3>
                <p className="text-zinc-500">Try adjusting your search filters.</p>
              </div>
            )
          ) : (
            filteredHouses.length > 0 ? (
              filteredHouses.map(listing => (
                <HouseCard key={listing.id} listing={listing} />
              ))
            ) : (
              <div className="col-span-full py-12 text-center">
                <Search className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium">No houses found</h3>
                <p className="text-zinc-500">Try adjusting your search filters.</p>
              </div>
            )
          )}
        </div>
      </div>

      <AdvancedFilters 
        isOpen={isFiltersOpen} 
        onClose={() => setIsFiltersOpen(false)} 
        onApply={handleApplyFilters} 
        type={viewType}
      />
    </>
  );
};
