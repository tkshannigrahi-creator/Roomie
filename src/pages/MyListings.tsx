import React from 'react';
import { useAppData } from '../contexts/AppDataContext';
import { useAuth } from '../contexts/AuthContext';
import { MoreVertical, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

export const MyListings: React.FC = () => {
  const { listings } = useAppData();
  const { user } = useAuth();
  
  const myListings = listings.filter(l => l.userId === user?.id);

  // Helper to format date cleanly as 15/8/2024
  const formatDate = (dateString: string) => {
    const d = new Date(dateString);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-7xl mx-auto pb-12">
      <div className="flex justify-between items-center bg-white dark:bg-zinc-950 sticky top-0 py-4 z-10">
        <div>
          <h1 className="text-[32px] font-bold tracking-tight text-zinc-900 dark:text-white leading-tight">My Listings</h1>
          <p className="text-[15px] text-zinc-500 dark:text-zinc-400">Manage your property and roommate listings</p>
        </div>
        <Link to="/add-listing">
          <button className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:text-black dark:hover:bg-zinc-200 px-5 py-2.5 rounded-xl font-medium text-sm transition-colors shadow-sm">
            <Plus className="w-4 h-4" />
            Add New Listing
          </button>
        </Link>
      </div>

      <div className="space-y-6">
        {myListings.map(listing => (
          <div key={listing.id} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm overflow-hidden flex flex-col">
            
            <div className="p-6 md:p-8 flex flex-col space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-[22px] font-medium text-zinc-900 dark:text-white tracking-tight">{listing.title}</h3>
                <div className="flex items-center gap-4">
                  <span className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-semibold px-4 py-1.5 rounded-full">
                    {listing.status === 'active' ? 'Active' : 'Inactive'}
                  </span>
                  <button className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex justify-between items-center text-[15px]">
                  <span className="text-zinc-500 dark:text-zinc-400">Type:</span>
                  <span className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs px-3 py-1 rounded-full font-medium shadow-sm">
                    {listing.type === 'property' ? 'Property' : 'Roommate Search'}
                  </span>
                </div>
                
                <div className="flex justify-between items-center text-[15px]">
                  <span className="text-zinc-500 dark:text-zinc-400">
                    {listing.type === 'property' ? 'Rent:' : 'Budget:'}
                  </span>
                  <span className="font-semibold text-zinc-900 dark:text-white">
                    ₹{listing.price.toLocaleString('en-IN')}/month
                  </span>
                </div>
                
                <div className="flex justify-between items-center text-[15px]">
                  <span className="text-zinc-500 dark:text-zinc-400">Location:</span>
                  <span className="text-zinc-900 dark:text-white">{listing.location}</span>
                </div>
                
                <div className="flex justify-between items-center text-[15px]">
                  <span className="text-zinc-500 dark:text-zinc-400">Posted:</span>
                  <span className="text-zinc-900 dark:text-zinc-300">{formatDate(listing.createdAt)}</span>
                </div>
              </div>
            </div>

            <div className="px-6 md:px-8 py-5 border-t border-zinc-100 dark:border-zinc-800">
              <div className="flex gap-8">
                <div className="flex flex-col items-center">
                  <span className="font-semibold text-zinc-900 dark:text-white text-lg leading-tight">{listing.views}</span>
                  <span className="text-[13px] text-zinc-500 dark:text-zinc-400 font-medium">Views</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-semibold text-zinc-900 dark:text-white text-lg leading-tight">{listing.inquiries}</span>
                  <span className="text-[13px] text-zinc-500 dark:text-zinc-400 font-medium">Inquiries</span>
                </div>
              </div>
            </div>

          </div>
        ))}
        {myListings.length === 0 && (
          <div className="text-center py-12 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl">
            <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-2">No listings yet</h3>
            <p className="text-zinc-500 mb-4">Create a listing to find a roommate or tenant.</p>
            <Link to="/add-listing">
               <button className="bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:text-black dark:hover:bg-zinc-200 px-5 py-2.5 rounded-xl font-medium text-sm transition-colors">
                  Create Listing
               </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
