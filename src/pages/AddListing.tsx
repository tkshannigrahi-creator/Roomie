import React, { useState } from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { ListingType } from '../types';
import { Loader2, Home, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AddListing: React.FC = () => {
  const [type, setType] = useState<ListingType>('property');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Mock API call
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/my-listings');
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create Listing</h1>
        <p className="text-zinc-500 dark:text-zinc-400 mt-1">Fill out the details to post your listing.</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          className={`p-6 border rounded-xl flex flex-col items-center justify-center gap-3 transition-all ${
            type === 'property' 
              ? 'border-black bg-zinc-50 text-black dark:border-white dark:bg-zinc-800 dark:text-white ring-1 ring-black dark:ring-white' 
              : 'border-zinc-200 hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700'
          }`}
          onClick={() => setType('property')}
        >
          <Home className="w-8 h-8" />
          <span className="font-semibold">I have a place</span>
        </button>
        <button
          className={`p-6 border rounded-xl flex flex-col items-center justify-center gap-3 transition-all ${
            type === 'roommate' 
              ? 'border-black bg-zinc-50 text-black dark:border-white dark:bg-zinc-800 dark:text-white ring-1 ring-black dark:ring-white' 
              : 'border-zinc-200 hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700'
          }`}
          onClick={() => setType('roommate')}
        >
          <UserPlus className="w-8 h-8" />
          <span className="font-semibold">I need a place</span>
        </button>
      </div>

      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Title</label>
                <Input placeholder={type === 'property' ? "Sunny bedroom in SF" : "Looking for a room in SF"} required />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Location</label>
                  <Input placeholder="City, Neighborhood" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">{type === 'property' ? 'Rent per month' : 'Max Budget'}</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">$</span>
                    <Input type="number" placeholder="1500" className="pl-7" required />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">Description</label>
                <textarea 
                  className="w-full min-h-[120px] rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white"
                  placeholder="Tell us about the place/yourself..."
                  required
                />
              </div>

              {type === 'property' && (
                <div>
                  <label className="block text-sm font-medium mb-3">Amenities</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {['In-unit W/D', 'Parking', 'Gym', 'Pool', 'Pet allowed', 'Furnished'].map(amenity => (
                      <label key={amenity} className="flex items-center space-x-2 text-sm">
                        <input type="checkbox" className="rounded text-black focus:ring-black dark:bg-zinc-800 border-zinc-300" />
                        <span>{amenity}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => navigate('/my-listings')}>Cancel</Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Post Listing
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
