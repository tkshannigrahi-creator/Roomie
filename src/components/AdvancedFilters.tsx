import React, { useState } from 'react';
import { Button } from './ui/Button';

interface AdvancedFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: any) => void;
  type: 'roommates' | 'houses';
}

const LOCATIONS = [
  'Koramangala', 'Indiranagar', 'HSR Layout', 'Whitefield',
  'Electronic City', 'Bandra West', 'Andheri', 'Powai',
  'Lower Parel', 'Worli', 'Connaught Place', 'Karol Bagh',
  'Lajpat Nagar', 'South Extension', 'Gachibowli', 'Hitech City',
  'Banjara Hills', 'Jubilee Hills', 'Madhapur'
];

const INTERESTS = [
  'Technology', 'Hiking', 'Cooking', 'Movies',
  'Fitness', 'Yoga', 'Design', 'Plants',
  'Meditation', 'Architecture', 'Books', 'Coffee',
  'Cycling', 'Marketing', 'Travel', 'Wine',
  'Music', 'Art', 'Concerts', 'Animals',
  'Veterinary', 'Cats', 'Gaming', 'Photography',
  'Reading', 'Dancing'
];

const AMENITIES = [
  'Gym', 'Rooftop', 'Parking', 'Laundry',
  'Walkable', 'Restaurants', 'Nightlife', 'Transit',
  'Yard', 'Quiet', 'Schools', 'Views',
  'Concierge', 'Pool', 'Studio', 'Light',
  'Artistic', 'Historic', 'Character', 'Central',
  'Updated', 'Balcony', 'Dishwasher', 'Air-Conditioning',
  'Heating', 'Elevator', 'Doorman'
];

export const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({ isOpen, onClose, onApply, type }) => {
  const [budget, setBudget] = useState<number>(10000);
  const [age, setAge] = useState<number>(18);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  
  // House specific states
  const [selectedBedrooms, setSelectedBedrooms] = useState<string[]>([]);
  const [selectedBathrooms, setSelectedBathrooms] = useState<string[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  if (!isOpen) return null;

  const toggleSelection = (item: string, list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const handleClear = () => {
    setBudget(10000);
    setAge(18);
    setSelectedLocations([]);
    setSelectedInterests([]);
    setSelectedBedrooms([]);
    setSelectedBathrooms([]);
    setSelectedAmenities([]);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-5xl bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl my-auto animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 sm:p-8 max-h-[85vh] overflow-y-auto space-y-6 sm:space-y-8 custom-scrollbar">
          
          {/* Budget/Rent Range */}
          <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 sm:p-8">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-8">
              {type === 'roommates' ? 'Budget Range (₹)' : 'Rent Range (₹)'}
            </h3>
            <div className="relative pt-1">
              <input
                type="range"
                min="10000"
                max="100000"
                step="5000"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full h-2.5 bg-black dark:bg-white rounded-lg appearance-none cursor-pointer custom-range"
              />
              <div className="flex justify-between items-center mt-4 text-sm font-medium text-zinc-500 dark:text-zinc-400">
                <span>₹10,000</span>
                <span className="text-black dark:text-white font-bold">₹{budget.toLocaleString('en-IN')}</span>
                <span>₹1,00,000</span>
              </div>
            </div>
          </div>

          {/* Preferred Locations */}
          <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 sm:p-8">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-6">Preferred Locations</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-6">
              {LOCATIONS.map(loc => (
                <label key={loc} className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    className="hidden" 
                    checked={selectedLocations.includes(loc)}
                    onChange={() => toggleSelection(loc, selectedLocations, setSelectedLocations)}
                  />
                  <div className={`w-5 h-5 rounded-full border-[1.5px] flex items-center justify-center transition-colors ${selectedLocations.includes(loc) ? 'border-black bg-black dark:border-white dark:bg-white' : 'border-zinc-400 group-hover:border-black dark:border-zinc-600 dark:group-hover:border-white'}`}>
                    {selectedLocations.includes(loc) && <div className="w-2 h-2 rounded-full bg-white dark:bg-black" />}
                  </div>
                  <span className="text-[15px] text-zinc-800 dark:text-zinc-200 font-medium group-hover:text-black dark:group-hover:text-white transition-colors">{loc}</span>
                </label>
              ))}
            </div>
          </div>

          {type === 'roommates' ? (
            <>
              {/* Age Range */}
              <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 sm:p-8">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-8">Age Range</h3>
                <div className="relative pt-1">
                  <input
                    type="range"
                    min="18"
                    max="65"
                    step="1"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full h-2.5 bg-black dark:bg-white rounded-lg appearance-none cursor-pointer custom-range"
                  />
                  <div className="flex justify-between items-center mt-4 text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    <span>18 years</span>
                    <span className="text-black dark:text-white font-bold">{age} years</span>
                    <span>65 years</span>
                  </div>
                </div>
              </div>

              {/* Interests */}
              <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 sm:p-8">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-6">Interests</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-4 gap-x-6">
                  {INTERESTS.map(interest => (
                    <label key={interest} className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        className="hidden" 
                        checked={selectedInterests.includes(interest)}
                        onChange={() => toggleSelection(interest, selectedInterests, setSelectedInterests)}
                      />
                      <div className={`w-5 h-5 rounded-full border-[1.5px] flex items-center justify-center transition-colors ${selectedInterests.includes(interest) ? 'border-black bg-black dark:border-white dark:bg-white' : 'border-zinc-400 group-hover:border-black dark:border-zinc-600 dark:group-hover:border-white'}`}>
                        {selectedInterests.includes(interest) && <div className="w-2 h-2 rounded-full bg-white dark:bg-black" />}
                      </div>
                      <span className="text-[15px] text-zinc-800 dark:text-zinc-200 font-medium group-hover:text-black dark:group-hover:text-white transition-colors">{interest}</span>
                    </label>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Bedrooms */}
              <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 sm:p-8">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-6">Bedrooms</h3>
                <div className="flex flex-wrap gap-x-8 gap-y-4">
                  {['1 BHK', '2 BHK', '3 BHK', '4+ BHK'].map(bed => (
                    <label key={bed} className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        className="hidden" 
                        checked={selectedBedrooms.includes(bed)}
                        onChange={() => toggleSelection(bed, selectedBedrooms, setSelectedBedrooms)}
                      />
                      <div className={`w-5 h-5 rounded-full border-[1.5px] flex items-center justify-center transition-colors ${selectedBedrooms.includes(bed) ? 'border-black bg-black dark:border-white dark:bg-white' : 'border-zinc-400 group-hover:border-black dark:border-zinc-600 dark:group-hover:border-white'}`}>
                        {selectedBedrooms.includes(bed) && <div className="w-2 h-2 rounded-full bg-white dark:bg-black" />}
                      </div>
                      <span className="text-[15px] text-zinc-800 dark:text-zinc-200 font-medium group-hover:text-black dark:group-hover:text-white transition-colors">{bed}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Bathrooms */}
              <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 sm:p-8">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-6">Bathrooms</h3>
                <div className="flex flex-wrap gap-x-8 gap-y-4">
                  {['1', '2', '3+'].map(bath => (
                    <label key={bath} className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        className="hidden" 
                        checked={selectedBathrooms.includes(bath)}
                        onChange={() => toggleSelection(bath, selectedBathrooms, setSelectedBathrooms)}
                      />
                      <div className={`w-5 h-5 rounded-full border-[1.5px] flex items-center justify-center transition-colors ${selectedBathrooms.includes(bath) ? 'border-black bg-black dark:border-white dark:bg-white' : 'border-zinc-400 group-hover:border-black dark:border-zinc-600 dark:group-hover:border-white'}`}>
                        {selectedBathrooms.includes(bath) && <div className="w-2 h-2 rounded-full bg-white dark:bg-black" />}
                      </div>
                      <span className="text-[15px] text-zinc-800 dark:text-zinc-200 font-medium group-hover:text-black dark:group-hover:text-white transition-colors">{bath}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 sm:p-8">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-6">Amenities</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-6">
                  {AMENITIES.map(amenity => (
                    <label key={amenity} className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        className="hidden" 
                        checked={selectedAmenities.includes(amenity)}
                        onChange={() => toggleSelection(amenity, selectedAmenities, setSelectedAmenities)}
                      />
                      <div className={`w-5 h-5 rounded-full border-[1.5px] flex items-center justify-center transition-colors ${selectedAmenities.includes(amenity) ? 'border-black bg-black dark:border-white dark:bg-white' : 'border-zinc-400 group-hover:border-black dark:border-zinc-600 dark:group-hover:border-white'}`}>
                        {selectedAmenities.includes(amenity) && <div className="w-2 h-2 rounded-full bg-white dark:bg-black" />}
                      </div>
                      <span className="text-[15px] text-zinc-800 dark:text-zinc-200 font-medium group-hover:text-black dark:group-hover:text-white transition-colors">{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}

        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-white dark:bg-zinc-900 rounded-b-2xl">
          <Button variant="outline" className="h-12 px-8 rounded-xl font-semibold border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800" onClick={handleClear}>
            Clear All
          </Button>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="font-semibold" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              className="h-12 px-8 rounded-xl font-semibold bg-black text-white hover:bg-zinc-800 shadow-xl shadow-black/10 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
              onClick={() => {
                onApply({ 
                  budget, 
                  selectedLocations,
                  ...(type === 'roommates' ? { age, selectedInterests } : { selectedBedrooms, selectedBathrooms, selectedAmenities })
                });
                onClose();
              }}
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
      
      <style>{`
        .custom-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: #ffffff;
          border: 3px solid #000000;
          cursor: pointer;
          margin-top: -8px; /* Needed for Safari */
        }
        
        .dark .custom-range::-webkit-slider-thumb {
          background: #000000;
          border: 3px solid #ffffff;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(156, 163, 175, 0.5);
          border-radius: 20px;
        }
      `}</style>
    </div>
  );
};
