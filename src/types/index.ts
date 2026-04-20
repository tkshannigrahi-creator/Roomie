export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  location: string;
  occupation: string;
  bio: string;
  rating: number;
  verified: boolean;
  phone?: string;
  age?: number;
  budget?: number;
  preferredLocations?: string[];
  interests?: string[];
};

export type ListingType = 'property' | 'roommate';

export type Listing = {
  id: string;
  userId: string;
  type: ListingType;
  title: string;
  price: number;
  location: string;
  status: 'active' | 'inactive';
  views: number;
  inquiries: number;
  createdAt: string;
  image?: string;
  amenities?: string[];
  description?: string;
  isFavorite?: boolean;
};

export type Roommate = {
  id: string;
  name: string;
  age: number;
  budget: number;
  location: string;
  bio: string;
  tags: string[];
  avatar: string;
  isFavorite: boolean;
};

export type Message = {
  id: string;
  conversationId: string;
  senderId: string;
  text: string;
  timestamp: string;
  isRead: boolean;
};

export type Conversation = {
  id: string;
  participants: User[];
  lastMessage: Message;
  unreadCount?: number;
};

export type NotificationType = 'message' | 'like' | 'new_listing';

export type Notification = {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  link?: string;
};
