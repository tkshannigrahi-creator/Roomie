import React, { createContext, useContext, useState, useEffect } from 'react';
import { Listing, Roommate, Notification } from '../types';
import { mockApi } from '../utils/api';
import { useAuth } from './AuthContext';

interface AppDataContextType {
  listings: Listing[];
  roommates: Roommate[];
  notifications: Notification[];
  isLoading: boolean;
  refreshData: () => Promise<void>;
  toggleFavoriteRoommate: (id: string) => void;
  toggleFavoriteListing: (id: string) => void;
}

const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

export const AppDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [listings, setListings] = useState<Listing[]>([]);
  const [roommates, setRoommates] = useState<Roommate[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const toggleFavoriteRoommate = (id: string) => {
    setRoommates(prev => prev.map(r => r.id === id ? { ...r, isFavorite: !r.isFavorite } : r));
  };

  const toggleFavoriteListing = (id: string) => {
    setListings(prev => prev.map(l => l.id === id ? { ...l, isFavorite: !l.isFavorite } : l));
  };

  const fetchAll = async () => {
    setIsLoading(true);
    try {
      const [listRes, roomRes, notifRes] = await Promise.all([
        mockApi.getListings(),
        mockApi.getRoommates(),
        mockApi.getNotifications()
      ]);
      setListings(listRes.data);
      setRoommates(roomRes.data);
      setNotifications(notifRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchAll();
    }
  }, [isAuthenticated]);

  return (
    <AppDataContext.Provider value={{
      listings, roommates, notifications, isLoading, refreshData: fetchAll,
      toggleFavoriteRoommate, toggleFavoriteListing
    }}>
      {children}
    </AppDataContext.Provider>
  );
};

export const useAppData = () => {
  const context = useContext(AppDataContext);
  if (context === undefined) {
    throw new Error('useAppData must be used within an AppDataProvider');
  }
  return context;
};
