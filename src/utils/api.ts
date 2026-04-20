import axios from 'axios';
import { mockUser, mockListings, mockRoommates, mockNotifications } from '../data/mockData';

// Centralized Axios instance
export const api = axios.create({
  baseURL: 'https://api.roomie.app/v1',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized
      localStorage.removeItem('auth_token');
      window.dispatchEvent(new Event('auth_unauthorized'));
    }
    return Promise.reject(error);
  }
);

// Mock wrapper to simulate network requests with Axios
export const mockApi = {
  login: async (credentials: any) => {
    await new Promise(r => setTimeout(r, 800));
    if (credentials.email === 'roomie@gmail.com' && credentials.password === 'Roomie@123') {
      return { data: { token: 'mock-jwt-token', user: mockUser } };
    }
    throw new Error('Invalid credentials. Use roomie@gmail.com / Roomie@123');
  },
  getCurrentUser: async () => {
    await new Promise(r => setTimeout(r, 400));
    return { data: mockUser };
  },
  getListings: async () => {
    await new Promise(r => setTimeout(r, 500));
    return { data: mockListings };
  },
  getRoommates: async () => {
    await new Promise(r => setTimeout(r, 600));
    return { data: mockRoommates };
  },
  getNotifications: async () => {
    await new Promise(r => setTimeout(r, 300));
    return { data: mockNotifications };
  }
};
