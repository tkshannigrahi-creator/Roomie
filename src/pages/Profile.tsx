import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import { MapPin, Mail, Briefcase, Phone, Star, Check, Edit2, User as UserIcon, Camera, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { Input } from '../components/ui/Input';

const LOCATIONS = [
  'Koramangala', 'Indiranagar', 'HSR Layout', 'Whitefield',
  'Electronic City', 'Bandra West', 'Andheri', 'Powai',
  'Lower Parel', 'Worli', 'Connaught Place', 'Karol Bagh',
  'Lajpat Nagar', 'South Extension', 'Gachibowli', 'Hitech City',
  'Banjara Hills', 'Jubilee Hills', 'Madhapur', 'Bankura, West Bengal'
];

const INTERESTS = [
  'technology', 'hiking', 'cooking', 'movies',
  'fitness', 'yoga', 'design', 'plants',
  'meditation', 'architecture', 'books', 'coffee',
  'cycling', 'marketing', 'travel', 'wine',
  'music', 'art', 'concerts', 'animals',
  'veterinary', 'cats', 'gaming', 'photography',
  'reading', 'dancing'
];

export const Profile: React.FC = () => {
  const { user } = useAuth();
  
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // We normally map this back strictly to an API update, but since mock, we use local state wrapper
  const [formData, setFormData] = useState({
    name: user?.name || '',
    age: user?.age || 21,
    email: user?.email || '',
    phone: user?.phone || '',
    occupation: user?.occupation || '',
    bio: user?.bio || '',
    budget: user?.budget || 30000,
    location: user?.location || '',
    avatar: user?.avatar || '',
    preferredLocations: user?.preferredLocations || [],
    interests: user?.interests || [],
  });

  if (!user) return null;

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setIsEditing(false);
    }, 800);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleLocation = (loc: string) => {
    if (!isEditing) return;
    setFormData(prev => ({
      ...prev,
      preferredLocations: prev.preferredLocations.includes(loc)
        ? prev.preferredLocations.filter(l => l !== loc)
        : [...prev.preferredLocations, loc]
    }));
  };

  const toggleInterest = (interest: string) => {
    if (!isEditing) return;
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in duration-500 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">My Profile</h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1">Manage your profile information and preferences</p>
        </div>
        {!isEditing && (
          <Button 
            onClick={() => setIsEditing(true)}
            className="bg-zinc-900 text-white px-6 w-full sm:w-auto h-11 rounded-xl hover:bg-black/90 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 shadow-sm font-semibold"
          >
            <Edit2 className="w-4 h-4 mr-2" /> Edit Profile
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column - ID Card */}
        <div className="lg:col-span-1">
          <div className="border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 flex flex-col items-center bg-white dark:bg-zinc-900 shadow-sm">
            
            {/* Avatar Section */}
            <div className="relative w-32 h-32 rounded-full bg-zinc-900 dark:bg-zinc-800 flex items-center justify-center mb-6 overflow-hidden group">
              {formData.avatar ? (
                <img src={formData.avatar} alt={formData.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                <UserIcon className="w-14 h-14 text-white dark:text-zinc-300" />
              )}
              
              {isEditing && (
                <label className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="w-8 h-8 text-white mb-1" />
                  <span className="text-white text-xs font-semibold">Upload</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                </label>
              )}
            </div>

            {isEditing ? (
              <Input 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="font-bold text-center mb-3 h-10 bg-zinc-50 dark:bg-zinc-950"
              />
            ) : (
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white text-center">{formData.name}</h2>
            )}

            <div className="flex items-center text-zinc-500 dark:text-zinc-400 mt-1.5 text-[15px] w-full justify-center">
              <MapPin className="w-[18px] h-[18px] mr-1.5 shrink-0" />
              {isEditing ? (
                <Input 
                  value={formData.location}
                  onChange={e => setFormData({...formData, location: e.target.value})}
                  className="h-8 text-sm bg-zinc-50 dark:bg-zinc-950"
                />
              ) : (
                <span className="truncate">{formData.location}</span>
              )}
            </div>
            
            <div className="flex items-center mt-6">
              <Star className="w-[20px] h-[20px] fill-yellow-400 text-yellow-400 mr-2" />
              <span className="font-bold text-zinc-900 dark:text-white mr-1.5 text-[17px]">{user.rating}</span>
              <span className="text-zinc-500 dark:text-zinc-400 text-[15px]">(12 reviews)</span>
            </div>
            
            {user.verified && (
              <div className="w-full mt-5 bg-[#1a9a4b] text-white font-semibold py-2.5 rounded-lg flex items-center justify-center text-[15px]">
                <Check className="w-[18px] h-[18px] mr-1.5" /> Verified Profile
              </div>
            )}
            
            <div className="w-full border-t border-zinc-200 dark:border-zinc-800 mt-8 pt-6 flex flex-col items-center">
              <span className="text-zinc-500 dark:text-zinc-400 text-[15px]">Member since</span>
              <span className="font-bold text-zinc-900 dark:text-white text-[15px] mt-1.5">15/01/2024</span>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Card 1: Personal Information */}
          <div className="border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 bg-white dark:bg-zinc-900 shadow-sm">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-1">Personal Information</h3>
            <p className="text-zinc-500 dark:text-zinc-400 text-[15px] mb-8">Your basic personal details</p>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[15px] font-semibold text-zinc-900 dark:text-zinc-100 mb-2.5">Full Name</label>
                  {isEditing ? (
                    <Input 
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="h-12 bg-zinc-50 dark:bg-zinc-950"
                    />
                  ) : (
                    <div className="bg-zinc-100/70 dark:bg-zinc-900/50 rounded-xl px-4 py-3 text-[15px] text-zinc-800 dark:text-zinc-200">
                      {formData.name}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-[15px] font-semibold text-zinc-900 dark:text-zinc-100 mb-2.5">Age</label>
                  {isEditing ? (
                    <Input 
                      type="number"
                      value={formData.age}
                      onChange={e => setFormData({...formData, age: Number(e.target.value)})}
                      className="h-12 bg-zinc-50 dark:bg-zinc-950"
                    />
                  ) : (
                    <div className="bg-zinc-100/70 dark:bg-zinc-900/50 rounded-xl px-4 py-3 text-[15px] text-zinc-800 dark:text-zinc-200">
                      {formData.age} years old
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <label className="block text-[15px] font-semibold text-zinc-900 dark:text-zinc-100 mb-2.5">Email</label>
                {isEditing ? (
                  <Input 
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="h-12 bg-zinc-50 dark:bg-zinc-950"
                    icon={<Mail className="w-4 h-4 text-zinc-400" />}
                  />
                ) : (
                  <div className="bg-zinc-100/70 dark:bg-zinc-900/50 rounded-xl px-4 py-3 text-[15px] text-zinc-800 dark:text-zinc-200 flex items-center">
                    <Mail className="w-5 h-5 mr-3 text-zinc-500" />
                    {formData.email}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-[15px] font-semibold text-zinc-900 dark:text-zinc-100 mb-2.5">Phone Number</label>
                {isEditing ? (
                  <Input 
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    className="h-12 bg-zinc-50 dark:bg-zinc-950"
                    icon={<Phone className="w-4 h-4 text-zinc-400" />}
                  />
                ) : (
                  <div className="bg-zinc-100/70 dark:bg-zinc-900/50 rounded-xl px-4 py-3 text-[15px] text-zinc-800 dark:text-zinc-200 flex items-center">
                    <Phone className="w-5 h-5 mr-3 text-zinc-500" />
                    {formData.phone}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-[15px] font-semibold text-zinc-900 dark:text-zinc-100 mb-2.5">Occupation</label>
                {isEditing ? (
                  <Input 
                    value={formData.occupation}
                    onChange={e => setFormData({...formData, occupation: e.target.value})}
                    className="h-12 bg-zinc-50 dark:bg-zinc-950"
                    icon={<Briefcase className="w-4 h-4 text-zinc-400" />}
                  />
                ) : (
                  <div className="bg-zinc-100/70 dark:bg-zinc-900/50 rounded-xl px-4 py-3 text-[15px] text-zinc-800 dark:text-zinc-200 flex items-center">
                    <Briefcase className="w-5 h-5 mr-3 text-zinc-500" />
                    {formData.occupation}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-[15px] font-semibold text-zinc-900 dark:text-zinc-100 mb-2.5">Bio</label>
                {isEditing ? (
                  <textarea 
                    value={formData.bio}
                    onChange={e => setFormData({...formData, bio: e.target.value})}
                    rows={4}
                    className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-4 py-3 text-[14px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white transition-all"
                  />
                ) : (
                  <div className="bg-zinc-100/70 dark:bg-zinc-900/50 rounded-xl px-4 py-3 text-[15px] text-zinc-800 dark:text-zinc-200 min-h-[100px] leading-relaxed">
                    {formData.bio}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Card 2: Roommate Preferences */}
          <div className="border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 bg-white dark:bg-zinc-900 shadow-sm">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-1">Roommate Preferences</h3>
            <p className="text-zinc-500 dark:text-zinc-400 text-[15px] mb-8">Your housing and roommate preferences</p>

            <div className="space-y-8">
              <div>
                <label className="block text-[15px] font-semibold text-zinc-900 dark:text-zinc-100 mb-3">Budget (Monthly)</label>
                {isEditing ? (
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">₹</span>
                    <Input 
                      type="number"
                      value={formData.budget}
                      onChange={e => setFormData({...formData, budget: Number(e.target.value)})}
                      className="h-12 pl-8 bg-zinc-50 dark:bg-zinc-950"
                    />
                  </div>
                ) : (
                  <div className="bg-zinc-100/70 dark:bg-zinc-900/50 rounded-xl px-4 py-3 text-[15px] text-zinc-800 dark:text-zinc-200">
                    ₹{formData.budget.toLocaleString('en-IN')}/month
                  </div>
                )}
              </div>

              <div>
                <label className="block text-[15px] font-semibold text-zinc-900 dark:text-zinc-100 mb-3.5">
                  Preferred Areas {isEditing && <span className="text-sm font-normal text-zinc-500 ml-2">(Click to toggle)</span>}
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {LOCATIONS.map(loc => {
                    const isSelected = formData.preferredLocations.includes(loc);
                    return (
                      <button 
                        key={loc} 
                        type="button"
                        onClick={() => toggleLocation(loc)}
                        disabled={!isEditing}
                        className={cn(
                          "px-4 py-2 rounded-full text-[14px] font-medium border transition-colors focus:outline-none", 
                          isSelected 
                            ? "bg-zinc-900 text-white border-[#111] dark:bg-white dark:text-[#111] dark:border-white" 
                            : "bg-white text-zinc-700 border-zinc-200 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-700",
                          isEditing ? "cursor-pointer hover:border-black dark:hover:border-white" : "cursor-default"
                        )}
                      >
                         {loc}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-[15px] font-semibold text-zinc-900 dark:text-zinc-100 mb-3.5">
                  Interests {isEditing && <span className="text-sm font-normal text-zinc-500 ml-2">(Click to toggle)</span>}
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {INTERESTS.map(interest => {
                    const isSelected = formData.interests.includes(interest);
                    return (
                      <button 
                        key={interest} 
                        type="button"
                        onClick={() => toggleInterest(interest)}
                        disabled={!isEditing}
                        className={cn(
                          "px-4 py-2 rounded-full text-[14px] font-medium border transition-colors focus:outline-none", 
                           isSelected 
                             ? "bg-zinc-900 text-white border-[#111] dark:bg-white dark:text-[#111] dark:border-white" 
                             : "bg-white text-zinc-700 border-zinc-200 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-700",
                           isEditing ? "cursor-pointer hover:border-black dark:hover:border-white" : "cursor-default"
                        )}
                      >
                         {interest}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          
          {/* Action Buttons (Save/Cancel) */}
          {isEditing && (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 flex flex-col-reverse sm:flex-row justify-end items-center gap-4 sticky bottom-6 shadow-2xl animate-in slide-in-from-bottom-8">
              <Button 
                variant="outline" 
                className="w-full sm:w-auto h-12 px-8 font-semibold rounded-xl border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                onClick={() => setIsEditing(false)}
                disabled={isSaving}
              >
                Cancel
              </Button>
              <Button 
                className="w-full sm:w-auto h-12 px-10 font-semibold rounded-xl bg-zinc-900 text-white shadow-xl shadow-black/10 dark:bg-white dark:text-black dark:hover:bg-zinc-200 hover:bg-zinc-800"
                onClick={handleSave}
                disabled={isSaving}
              >
                {isSaving ? <><Loader2 className="w-5 h-5 mr-3 animate-spin"/> Saving...</> : 'Save Changes'}
              </Button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
